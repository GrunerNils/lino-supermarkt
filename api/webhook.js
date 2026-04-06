/**
 * Vercel Serverless Function: Stripe Webhook
 *
 * Wird von Stripe aufgerufen nach erfolgreicher Zahlung.
 * Hier: Bestellung in Datenbank speichern + E-Mail senden
 *
 * Endpoint: POST /api/webhook
 * In Stripe Dashboard eintragen: https://deine-domain.de/api/webhook
 */

// import Stripe from 'stripe'
// import { createClient } from '@supabase/supabase-js'
// import { Resend } from 'resend'

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
// const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  // ── ECHTE WEBHOOK VERARBEITUNG (auskommentiert) ───────────────
  //
  // const sig = req.headers['stripe-signature']
  // let event
  // try {
  //   event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  // } catch (err) {
  //   return res.status(400).json({ fehler: `Webhook Fehler: ${err.message}` })
  // }
  //
  // if (event.type === 'checkout.session.completed') {
  //   const session = event.data.object
  //
  //   // 1. Bestellung in Supabase speichern
  //   await supabase.from('bestellungen').insert({
  //     stripe_session_id: session.id,
  //     markt_id: session.metadata.marktId,
  //     abhol_datum: session.metadata.abholDatum,
  //     abhol_zeit: session.metadata.abholZeit,
  //     kunde_name: session.metadata.kundeName,
  //     kunde_email: session.customer_email,
  //     gesamt_preis: session.amount_total / 100,
  //     status: 'bezahlt',
  //   })
  //
  //   // 2. Bestätigungs-E-Mail senden
  //   await resend.emails.send({
  //     from: 'bestellung@deine-domain.de',
  //     to: session.customer_email,
  //     subject: `Bestellbestätigung ${session.id}`,
  //     html: `<h1>Danke für deine Bestellung!</h1>
  //            <p>Abholung: ${session.metadata.abholDatum} ${session.metadata.abholZeit}</p>
  //            <p>Markt: ${session.metadata.marktName}</p>`
  //   })
  //
  //   // 3. Warenwirtschaft informieren (optional)
  //   await fetch(`${process.env.API_WARENWIRTSCHAFT_URL}/bestellung`, {
  //     method: 'POST',
  //     headers: { 'X-API-Key': process.env.API_WARENWIRTSCHAFT_KEY },
  //     body: JSON.stringify({ sessionId: session.id })
  //   })
  // }
  // ─────────────────────────────────────────────────────────────

  return res.status(200).json({ empfangen: true })
}
