/**
 * Vercel Serverless Function: Stripe Checkout Session
 * POST /api/checkout
 *
 * Aktivieren: STRIPE_SECRET_KEY in Vercel Environment Variables setzen
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.VITE_APP_URL || '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ fehler: 'Methode nicht erlaubt' })

  const { artikel, markt, slot, kunde } = req.body

  if (!artikel?.length) {
    return res.status(400).json({ fehler: 'Warenkorb ist leer' })
  }

  // ── STRIPE AKTIV wenn STRIPE_SECRET_KEY gesetzt ───────────────
  if (process.env.STRIPE_SECRET_KEY) {
    try {
      const Stripe = (await import('stripe')).default
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'sepa_debit', 'paypal'],
        mode: 'payment',
        locale: 'de',
        line_items: artikel.map(({ produkt, menge }) => ({
          price_data: {
            currency: 'eur',
            product_data: {
              name: produkt.name,
              description: produkt.gewicht,
              metadata: { produktId: String(produkt.id) },
            },
            unit_amount: Math.round(produkt.preis * 100),
          },
          quantity: menge,
        })),
        metadata: {
          marktId: String(markt?.id || ''),
          marktName: markt?.name || '',
          abholDatum: slot?.datum || '',
          abholUhrzeit: slot?.uhrzeit || '',
          kundeName: kunde?.name || '',
          kundeEmail: kunde?.email || '',
          kundeTelefon: kunde?.telefon || '',
        },
        customer_email: kunde?.email,
        success_url: `${process.env.VITE_APP_URL}/bestellbestaetigung/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.VITE_APP_URL}/warenkorb`,
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

  // ── DEMO-MODUS (kein Stripe Key) ──────────────────────────────
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
