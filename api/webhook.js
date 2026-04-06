/**
 * Vercel Serverless Function: Stripe Webhook
 * POST /api/webhook
 *
 * In Stripe Dashboard eintragen: https://deine-domain.de/api/webhook
 * Benötigte Keys: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET,
 *                 SUPABASE_URL, SUPABASE_SERVICE_KEY, RESEND_API_KEY
 */

export const config = { api: { bodyParser: false } }

async function buffer(readable) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(200).json({ nachricht: 'Demo-Modus – Stripe nicht aktiv' })
  }

  const Stripe = (await import('stripe')).default
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  const buf = await buffer(req)
  const sig = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook Signatur ungültig:', err.message)
    return res.status(400).json({ fehler: `Webhook Fehler: ${err.message}` })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    console.log('Zahlung erfolgreich:', session.id)

    try {
      // ── 1. Bestellung in Supabase speichern ──────────────────
      if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
        const { createClient } = await import('@supabase/supabase-js')
        const supabase = createClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_SERVICE_KEY
        )

        const bestellId = session.metadata.bestellId || `ORD-${session.id}`

        await supabase.from('bestellungen').upsert({
          id: bestellId,
          stripe_session_id: session.id,
          markt_id: parseInt(session.metadata.marktId) || null,
          abhol_datum: session.metadata.abholDatum || null,
          abhol_uhrzeit: session.metadata.abholUhrzeit || null,
          kunde_name: session.metadata.kundeName,
          kunde_email: session.customer_email,
          kunde_telefon: session.metadata.kundeTelefon || null,
          gesamt_preis: session.amount_total / 100,
          zahlungsart: 'stripe',
          status: 'bezahlt',
        })
      }

      // ── 2. Bestätigungs-E-Mail an Kunden senden ──────────────
      if (process.env.RESEND_API_KEY && session.customer_email) {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)

        const bestellId = session.metadata.bestellId || session.id
        const gesamtPreis = (session.amount_total / 100).toFixed(2).replace('.', ',')

        await resend.emails.send({
          from: `Abholservice <bestellung@${process.env.VITE_APP_URL?.replace('https://', '') || 'nahundgut.de'}>`,
          to: session.customer_email,
          subject: `✅ Bestellbestätigung ${bestellId}`,
          html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; color: #1a1a1a; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { background: #1a1a1a; padding: 24px; text-align: center; }
    .header img { height: 40px; }
    .hero { background: #FFED00; padding: 32px 24px; text-align: center; }
    .hero h1 { margin: 0; font-size: 24px; color: #1a1a1a; }
    .content { padding: 32px 24px; background: #fff; }
    .info-box { background: #f5f5f5; border-radius: 12px; padding: 20px; margin: 16px 0; }
    .info-row { display: flex; justify-content: space-between; margin: 8px 0; font-size: 14px; }
    .label { color: #666; }
    .value { font-weight: bold; }
    .total { background: #1a1a1a; color: #fff; border-radius: 12px; padding: 16px 20px; display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; margin-top: 16px; }
    .footer { background: #f5f5f5; padding: 24px; text-align: center; font-size: 12px; color: #666; }
    .btn { display: inline-block; background: #FFED00; color: #1a1a1a; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 16px; }
  </style>
</head>
<body>
<div class="container">
  <div class="header">
    <span style="color: white; font-size: 20px; font-weight: bold;">nah &amp; gut Abholservice</span>
  </div>

  <div class="hero">
    <div style="font-size: 48px;">✅</div>
    <h1>Vielen Dank für deine Bestellung!</h1>
    <p style="margin: 8px 0 0; color: #555;">Dein Einkauf wird für dich zusammengestellt.</p>
  </div>

  <div class="content">
    <div class="info-box">
      <div class="info-row">
        <span class="label">Bestellnummer</span>
        <span class="value">${bestellId}</span>
      </div>
      <div class="info-row">
        <span class="label">Abholmarkt</span>
        <span class="value">${session.metadata.marktName || '–'}</span>
      </div>
      <div class="info-row">
        <span class="label">Abholdatum</span>
        <span class="value">${session.metadata.abholDatum || '–'}</span>
      </div>
      <div class="info-row">
        <span class="label">Uhrzeit</span>
        <span class="value">${session.metadata.abholUhrzeit || '–'}</span>
      </div>
    </div>

    <div class="total">
      <span>Gesamtbetrag</span>
      <span>${gesamtPreis} €</span>
    </div>

    <p style="margin-top: 24px; font-size: 14px; color: #555; line-height: 1.6;">
      Dein Einkauf liegt zum vereinbarten Zeitpunkt fertig verpackt im Markt bereit.
      Bitte bringe diese Bestellbestätigung (oder die Bestellnummer) mit.
    </p>

    <div style="text-align: center; margin-top: 24px;">
      <a href="${process.env.VITE_APP_URL || '#'}/bestellbestaetigung/${bestellId}" class="btn">
        Bestellung ansehen →
      </a>
    </div>
  </div>

  <div class="footer">
    <p>Fragen? Ruf uns an oder besuche uns im Markt.</p>
    <p style="margin-top: 8px; color: #999;">nah &amp; gut Abholservice · ${new Date().getFullYear()}</p>
  </div>
</div>
</body>
</html>
          `,
        })

        // ── 3. Benachrichtigung an den Laden ──────────────────
        const ladenEmail = process.env.LADEN_EMAIL
        if (ladenEmail) {
          await resend.emails.send({
            from: `Abholservice <bestellung@${process.env.VITE_APP_URL?.replace('https://', '') || 'nahundgut.de'}>`,
            to: ladenEmail,
            subject: `🛒 Neue Bestellung ${bestellId} – ${session.metadata.abholDatum} ${session.metadata.abholUhrzeit}`,
            html: `
              <h2>Neue Bestellung eingegangen</h2>
              <p><strong>Bestellnummer:</strong> ${bestellId}</p>
              <p><strong>Kunde:</strong> ${session.metadata.kundeName} (${session.customer_email})</p>
              <p><strong>Abholdatum:</strong> ${session.metadata.abholDatum} – ${session.metadata.abholUhrzeit}</p>
              <p><strong>Betrag:</strong> ${gesamtPreis} €</p>
              <p><a href="${process.env.VITE_APP_URL}/admin">→ Im Admin-Dashboard ansehen</a></p>
            `,
          })
        }
      }

      // ── 4. Warenwirtschaft informieren (optional) ─────────────
      if (process.env.API_WARENWIRTSCHAFT_URL) {
        await fetch(`${process.env.API_WARENWIRTSCHAFT_URL}/bestellung`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': process.env.API_WARENWIRTSCHAFT_KEY || '',
          },
          body: JSON.stringify({
            bestellId: session.metadata.bestellId,
            stripeSessionId: session.id,
            marktId: session.metadata.marktId,
            abholDatum: session.metadata.abholDatum,
          }),
        }).catch(e => console.error('Warenwirtschaft Fehler:', e))
      }

    } catch (err) {
      console.error('Webhook Verarbeitungsfehler:', err)
      return res.status(500).json({ fehler: 'Verarbeitungsfehler' })
    }
  }

  return res.status(200).json({ empfangen: true })
}
