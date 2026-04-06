/**
 * Warenwirtschaft Mock-API
 * GET /api/warenwirtschaft/produkte  → Produktliste
 * GET /api/warenwirtschaft/lagerbestand?markt=1 → Lagerbestand
 * POST /api/warenwirtschaft/bestellung → Bestellung übermitteln
 *
 * Diese Datei zeigt den Programmierern EXAKT welches Format
 * das echte Warenwirtschaftssystem liefern muss.
 */

import { PRODUKTE } from '../src/data/produkte.js'
import { MAERKTE } from '../src/data/maerkte.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json')

  const { url, method } = req
  const pfad = url.replace('/api/warenwirtschaft', '').split('?')[0]
  const params = new URLSearchParams(url.split('?')[1] || '')

  // ── Authentifizierung ──────────────────────────────────────────
  const apiKey = req.headers['x-api-key']
  if (process.env.API_WARENWIRTSCHAFT_KEY && apiKey !== process.env.API_WARENWIRTSCHAFT_KEY) {
    return res.status(401).json({ fehler: 'Ungültiger API-Key' })
  }

  // ── GET /api/warenwirtschaft/produkte ──────────────────────────
  if (pfad === '/produkte' && method === 'GET') {
    const marktId = params.get('markt')
    let produkte = PRODUKTE
    if (marktId) {
      produkte = produkte.filter(p =>
        !p.verfuegbarIn || p.verfuegbarIn.includes(Number(marktId))
      )
    }
    return res.status(200).json({
      produkte: produkte.map(p => ({
        id: p.id,
        name: p.name,
        ean: `${4000000000000 + p.id}`,   // Demo EAN
        preis: p.preis,
        einheit: p.einheit,
        gewicht: p.gewicht,
        kategorie: p.kategorie,
        bild: p.bild,
        aktiv: p.inStock,
      })),
      gesamt: produkte.length,
      zeitstempel: new Date().toISOString(),
    })
  }

  // ── GET /api/warenwirtschaft/lagerbestand ──────────────────────
  if (pfad === '/lagerbestand' && method === 'GET') {
    const marktId = params.get('markt')
    if (!marktId) return res.status(400).json({ fehler: 'markt Parameter fehlt' })

    const markt = MAERKTE.find(m => m.id === Number(marktId))
    if (!markt) return res.status(404).json({ fehler: 'Markt nicht gefunden' })

    const lagerbestand = PRODUKTE
      .filter(p => !p.verfuegbarIn || p.verfuegbarIn.includes(Number(marktId)))
      .map(p => ({
        produktId: p.id,
        ean: `${4000000000000 + p.id}`,
        verfuegbar: p.inStock,
        menge: Math.floor(Math.random() * 50) + 1,
        mindestbestand: 5,
        zuletzt_aktualisiert: new Date().toISOString(),
      }))

    return res.status(200).json({
      marktId: Number(marktId),
      marktName: markt.name,
      lagerbestand,
      zeitstempel: new Date().toISOString(),
    })
  }

  // ── GET /api/warenwirtschaft/maerkte ───────────────────────────
  if (pfad === '/maerkte' && method === 'GET') {
    return res.status(200).json({
      maerkte: MAERKTE.map(m => ({
        id: m.id,
        name: m.name,
        adresse: m.adresse,
        plz: m.plz,
        stadt: m.stadt,
        oeffnungszeiten: m.oeffnungszeiten,
        aktiv: true,
      })),
    })
  }

  // ── POST /api/warenwirtschaft/bestellung ───────────────────────
  if (pfad === '/bestellung' && method === 'POST') {
    const { bestellId, marktId, abholDatum, artikel } = req.body
    if (!bestellId) return res.status(400).json({ fehler: 'bestellId fehlt' })

    console.log(`Neue Bestellung für Warenwirtschaft: ${bestellId}, Markt: ${marktId}, Datum: ${abholDatum}`)

    // Hier würde das echte Warenwirtschaftssystem:
    // 1. Lagerbestand reservieren
    // 2. Kommissionierauftrag erstellen
    // 3. Bestätigung zurückgeben

    return res.status(200).json({
      erfolg: true,
      bestellId,
      kommissionierNr: `KOM-${Date.now()}`,
      nachricht: 'Bestellung erfolgreich an Warenwirtschaft übermittelt',
      zeitstempel: new Date().toISOString(),
    })
  }

  return res.status(404).json({ fehler: 'Endpoint nicht gefunden' })
}
