/**
 * Vercel Serverless Function: Stripe Checkout Session erstellen
 * ───────────────────────────────────────────────────────────────
 * Endpunkt: POST /api/checkout
 *
 * WARUM eine serverseitige Funktion statt direkt im Browser?
 *   Der STRIPE_SECRET_KEY darf NIEMALS im Frontend-Code stehen —
 *   er wäre sonst für jeden sichtbar (Browser DevTools).
 *   Diese Funktion läuft auf Vercel's Servern, der Key bleibt sicher.
 *
 * ABLAUF:
 *   1. Frontend sendet Warenkorb + Kundendaten hierher (POST)
 *   2. Diese Funktion erstellt eine Stripe Checkout Session
 *   3. Stripe gibt eine URL zurück → Kunde wird dorthin weitergeleitet
 *   4. Kunde bezahlt auf Stripe's gehosteter Seite
 *   5. Stripe ruft api/webhook.js auf → Bestellung wird gespeichert
 *
 * AKTIVIEREN:
 *   STRIPE_SECRET_KEY in Vercel Dashboard → Environment Variables setzen.
 *   Ohne den Key läuft die App im Demo-Modus (keine echte Zahlung).
 *
 * STRIPE DASHBOARD:
 *   https://dashboard.stripe.com/apikeys
 */

export default async function handler(req, res) {
  // CORS-Header: nur eigene Domain erlaubt (nicht * in Produktion!)
  res.setHeader('Access-Control-Allow-Origin', process.env.VITE_APP_URL || '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // OPTIONS-Request kommt vom Browser als "Preflight" vor dem echten POST
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ fehler: 'Methode nicht erlaubt' })

  const { artikel, markt, slot, kunde } = req.body

  if (!artikel?.length) {
    return res.status(400).json({ fehler: 'Warenkorb ist leer' })
  }

  // ── STRIPE AKTIV (wenn STRIPE_SECRET_KEY gesetzt) ─────────────
  if (process.env.STRIPE_SECRET_KEY) {
    try {
      // Dynamischer Import — Stripe wird nur geladen wenn wirklich gebraucht
      const Stripe = (await import('stripe')).default
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'sepa_debit', 'paypal'],
        mode: 'payment',
        locale: 'de',

        // Jeder Artikel wird als eigene Zeile in Stripe angezeigt
        line_items: artikel.map(({ produkt, menge }) => ({
          price_data: {
            currency: 'eur',
            product_data: {
              name: produkt.name,
              description: produkt.gewicht,
              metadata: { produktId: String(produkt.id) },
            },
            unit_amount: Math.round(produkt.preis * 100), // Stripe arbeitet mit Cents!
          },
          quantity: menge,
        })),

        // Metadata wird im Webhook wieder ausgelesen um die Bestellung zu speichern
        // WICHTIG: nur Strings erlaubt, max. 500 Zeichen pro Feld
        metadata: {
          marktId:       String(markt?.id || ''),
          marktName:     markt?.name || '',
          abholDatum:    slot?.datum || '',
          abholUhrzeit:  slot?.uhrzeit || '',
          kundeName:     kunde?.name || '',
          kundeEmail:    kunde?.email || '',
          kundeTelefon:  kunde?.telefon || '',
        },

        customer_email: kunde?.email, // Stripe füllt E-Mail-Feld vor

        // {CHECKOUT_SESSION_ID} wird von Stripe automatisch ersetzt
        success_url: `${process.env.VITE_APP_URL}/bestellbestaetigung/{CHECKOUT_SESSION_ID}`,
        cancel_url:  `${process.env.VITE_APP_URL}/warenkorb`,

        payment_intent_data: {
          description: `Abholservice ${markt?.name || ''} – ${slot?.datum || ''}`,
        },
      })

      return res.status(200).json({ url: session.url, sessionId: session.id })
    } catch (fehler) {
      console.error('Stripe Fehler:', fehler)
      return res.status(500).json({ fehler: 'Stripe Fehler: ' + fehler.message })
    }
  }

  // ── DEMO-MODUS (kein STRIPE_SECRET_KEY gesetzt) ───────────────
  // Simuliert eine erfolgreiche Bestellung ohne echte Zahlung.
  // Im Frontend wird demo:true erkannt und direkt zur Bestätigungsseite navigiert.
  const gesamtPreis = artikel.reduce(
    (sum, { produkt, menge }) => sum + produkt.preis * menge, 0
  )
  const bestellId = `ORD-${Date.now()}`
  return res.status(200).json({
    demo: true,
    bestellId,
    gesamtPreis: gesamtPreis.toFixed(2),
    nachricht: 'Demo-Modus aktiv – STRIPE_SECRET_KEY nicht gesetzt',
  })
}
