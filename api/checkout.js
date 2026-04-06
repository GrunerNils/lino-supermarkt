/**
 * Vercel Serverless Function: Stripe Checkout Session erstellen
 *
 * Endpoint: POST /api/checkout
 *
 * Aktivieren wenn Stripe eingerichtet:
 * 1. npm install stripe
 * 2. In Vercel Dashboard: STRIPE_SECRET_KEY setzen
 * 3. Den auskommentierten Code aktivieren
 */

// import Stripe from 'stripe'
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  // CORS Header
  res.setHeader('Access-Control-Allow-Origin', process.env.VITE_APP_URL || '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ fehler: 'Methode nicht erlaubt' })

  try {
    const { artikel, markt, slot, kunde } = req.body

    if (!artikel?.length) {
      return res.status(400).json({ fehler: 'Warenkorb ist leer' })
    }

    // ── ECHTE STRIPE INTEGRATION (auskommentiert) ─────────────────
    //
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card', 'sepa_debit', 'paypal'],
    //   mode: 'payment',
    //   locale: 'de',
    //   line_items: artikel.map(({ produkt, menge }) => ({
    //     price_data: {
    //       currency: 'eur',
    //       product_data: {
    //         name: produkt.name,
    //         images: [`${process.env.VITE_APP_URL}${produkt.bild}`],
    //         metadata: { produktId: produkt.id },
    //       },
    //       unit_amount: Math.round(produkt.preis * 100), // Cent
    //     },
    //     quantity: menge,
    //   })),
    //   metadata: {
    //     marktId: markt.id,
    //     marktName: markt.name,
    //     abholDatum: slot.datum,
    //     abholZeit: slot.uhrzeit,
    //     kundeName: kunde?.name || '',
    //     kundeEmail: kunde?.email || '',
    //   },
    //   customer_email: kunde?.email,
    //   success_url: `${process.env.VITE_APP_URL}/bestellbestaetigung/{CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${process.env.VITE_APP_URL}/warenkorb`,
    // })
    //
    // return res.status(200).json({ url: session.url, sessionId: session.id })
    // ─────────────────────────────────────────────────────────────

    // MOCK-Response (solange Stripe nicht aktiv)
    const gesamtPreis = artikel.reduce((sum, { produkt, menge }) => sum + produkt.preis * menge, 0)
    const bestellId = `ORD-${Date.now()}`

    return res.status(200).json({
      mock: true,
      bestellId,
      gesamtPreis: gesamtPreis.toFixed(2),
      nachricht: 'Stripe noch nicht aktiviert – dies ist eine Demo-Antwort',
      // Wenn Stripe aktiv: url: 'https://checkout.stripe.com/...'
    })

  } catch (fehler) {
    console.error('Checkout Fehler:', fehler)
    return res.status(500).json({ fehler: 'Interner Serverfehler' })
  }
}
