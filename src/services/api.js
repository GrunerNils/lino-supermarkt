/**
 * API Service Layer
 *
 * Aktuell: gibt Mock-Daten zurück (aus produkte.js / maerkte.js)
 * Später:  einfach die Funktionen auf echte API-Calls umstellen,
 *          der Rest der App bleibt unverändert.
 *
 * Beispiel für echte API:
 *   const res = await fetch(`${import.meta.env.VITE_API_URL}/produkte`)
 *   return res.json()
 */

import { PRODUKTE } from '../data/produkte'
import { MAERKTE } from '../data/maerkte'

// ── Produkte ──────────────────────────────────────────────────────

export async function fetchProdukte() {
  // TODO: ersetzen durch echten API-Call
  // const res = await fetch(`${import.meta.env.VITE_API_URL}/produkte`)
  // return res.json()
  return PRODUKTE
}

export async function fetchProduktById(id) {
  // TODO: ersetzen durch echten API-Call
  // const res = await fetch(`${import.meta.env.VITE_API_URL}/produkte/${id}`)
  // return res.json()
  return PRODUKTE.find(p => p.id === Number(id)) || null
}

export async function fetchProdukteByKategorie(slug, marktId = null) {
  // TODO: ersetzen durch echten API-Call mit marktId Filter
  // const res = await fetch(`${import.meta.env.VITE_API_URL}/produkte?kategorie=${slug}&markt=${marktId}`)
  // return res.json()
  let produkte = PRODUKTE.filter(p => p.kategorie === slug)
  if (marktId) {
    produkte = produkte.filter(p =>
      !p.verfuegbarIn || p.verfuegbarIn.includes(Number(marktId))
    )
  }
  return produkte
}

export async function fetchProdukteByMarkt(marktId) {
  // Alle Produkte die in diesem Markt verfügbar sind
  return PRODUKTE.filter(p =>
    !p.verfuegbarIn || p.verfuegbarIn.includes(Number(marktId))
  )
}

export async function sucheProdukte(query, marktId = null) {
  // TODO: ersetzen durch echten API-Call
  // const res = await fetch(`${import.meta.env.VITE_API_URL}/produkte/suche?q=${query}&markt=${marktId}`)
  // return res.json()
  let produkte = PRODUKTE.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )
  if (marktId) {
    produkte = produkte.filter(p =>
      !p.verfuegbarIn || p.verfuegbarIn.includes(Number(marktId))
    )
  }
  return produkte.slice(0, 5)
}

// ── Märkte ────────────────────────────────────────────────────────

export async function fetchMaerkte() {
  // TODO: ersetzen durch echten API-Call
  // const res = await fetch(`${import.meta.env.VITE_API_URL}/maerkte`)
  // return res.json()
  return MAERKTE
}

export async function fetchMarktById(id) {
  // TODO: ersetzen durch echten API-Call
  return MAERKTE.find(m => m.id === Number(id)) || null
}

export async function fetchMaerkteByPlz(plz) {
  // TODO: echte PLZ-basierte Suche (z.B. Umkreissuche via Google Maps API)
  // const res = await fetch(`${import.meta.env.VITE_API_URL}/maerkte?plz=${plz}`)
  // return res.json()
  return MAERKTE
}

// ── Bestellungen ──────────────────────────────────────────────────

export async function bestellungSpeichern(bestellung) {
  // TODO: ersetzen durch echten API-Call
  // const res = await fetch(`${import.meta.env.VITE_API_URL}/bestellungen`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(bestellung),
  // })
  // return res.json()

  // Mock: in localStorage speichern
  const id = `ORD-${Date.now()}`
  const bestellungen = JSON.parse(localStorage.getItem('bestellungen') || '[]')
  bestellungen.push({ ...bestellung, id, erstelltAm: new Date().toISOString() })
  localStorage.setItem('bestellungen', JSON.stringify(bestellungen))
  return { id, erfolg: true }
}

export async function fetchBestellungById(id) {
  // TODO: ersetzen durch echten API-Call
  const bestellungen = JSON.parse(localStorage.getItem('bestellungen') || '[]')
  return bestellungen.find(b => b.id === id) || null
}

// ── Lagerbestand ──────────────────────────────────────────────────

export async function fetchLagerbestand(marktId) {
  // TODO: echte Warenwirtschafts-Anbindung
  // const res = await fetch(`${import.meta.env.VITE_API_WARENWIRTSCHAFT_URL}/lagerbestand?markt=${marktId}`, {
  //   headers: { 'X-API-Key': import.meta.env.VITE_API_WARENWIRTSCHAFT_KEY }
  // })
  // return res.json()

  // Mock: alle Produkte als verfügbar markieren
  return PRODUKTE.reduce((acc, p) => {
    acc[p.id] = { verfuegbar: true, menge: Math.floor(Math.random() * 50) + 5 }
    return acc
  }, {})
}
