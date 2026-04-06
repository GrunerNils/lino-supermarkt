/**
 * API Service Layer — HAUPTINTEGRATIONSPUNKT
 * ───────────────────────────────────────────────────────────────
 * ALLE Datenbankzugriffe der App laufen durch diese Datei.
 * Keine Komponente greift direkt auf Supabase oder localStorage zu.
 *
 * WARUM dieses Muster?
 *   Wenn ihr das Warenwirtschaftssystem anbindet oder die DB wechselt,
 *   ändert ihr NUR diese Datei — der Rest der App bleibt unberührt.
 *
 * AUTOMATISCHES SWITCHING:
 *   supabaseAktiv = true  → echte Supabase-Abfragen
 *   supabaseAktiv = false → Mock-Daten aus src/data/ (Demo-Modus)
 *
 * FÜR PROGRAMMIERER:
 *   1. Supabase-Keys in .env.local setzen → supabaseAktiv wird true
 *   2. Die DB-Abfragen laufen dann automatisch
 *   3. Für Warenwirtschafts-Anbindung: fetchProdukte() + fetchLagerbestand()
 *      durch eigene API-Calls ersetzen
 */

import { supabase, supabaseAktiv } from './supabase'
import { PRODUKTE } from '../data/produkte'
import { MAERKTE } from '../data/maerkte'

// ── Produkte ──────────────────────────────────────────────────

/**
 * Alle aktiven Produkte laden.
 * Im echten Betrieb: kommt aus Supabase "produkte" Tabelle.
 * Warenwirtschaft: kann hier auch direkt die externe API aufgerufen werden.
 */
export async function fetchProdukte() {
  if (supabaseAktiv) {
    const { data, error } = await supabase
      .from('produkte')
      .select('*, kategorien(label, slug)')
      .eq('aktiv', true)
      .order('name')
    if (error) console.error('fetchProdukte:', error)
    return data || []
  }
  return PRODUKTE
}

/**
 * Ein Produkt anhand der ID laden (für Detailseite).
 */
export async function fetchProduktById(id) {
  if (supabaseAktiv) {
    const { data, error } = await supabase
      .from('produkte')
      .select('*')
      .eq('id', id)
      .eq('aktiv', true)
      .single()
    if (error) console.error('fetchProduktById:', error)
    return data || null
  }
  return PRODUKTE.find(p => p.id === Number(id)) || null
}

/**
 * Produkte einer Kategorie laden — optional gefiltert nach Markt.
 *
 * WARUM marktId optional? Auf der Startseite gibt es noch keinen
 * gewählten Markt. Erst wenn ein Markt gewählt ist, wird das
 * markt-spezifische Sortiment gefiltert.
 */
export async function fetchProdukteByKategorie(slug, marktId = null) {
  if (supabaseAktiv) {
    let query = supabase
      .from('produkte')
      .select('*, markt_produkte!inner(markt_id, verfuegbar, lagerbestand)')
      .eq('kategorie_slug', slug)
      .eq('aktiv', true)
    if (marktId) {
      query = query
        .eq('markt_produkte.markt_id', marktId)
        .eq('markt_produkte.verfuegbar', true)
    }
    const { data, error } = await query.order('name')
    if (error) console.error('fetchProdukteByKategorie:', error)
    return data || []
  }
  let produkte = PRODUKTE.filter(p => p.kategorie === slug)
  if (marktId) {
    produkte = produkte.filter(p =>
      !p.verfuegbarIn || p.verfuegbarIn.includes(Number(marktId))
    )
  }
  return produkte
}

/**
 * Alle Produkte die ein bestimmter Markt führt.
 * Nutzt die Verbindungstabelle markt_produkte (Markt ↔ Produkt ↔ Lagerbestand).
 */
export async function fetchProdukteByMarkt(marktId) {
  if (supabaseAktiv) {
    const { data, error } = await supabase
      .from('produkte')
      .select('*, markt_produkte!inner(markt_id, verfuegbar, lagerbestand)')
      .eq('markt_produkte.markt_id', marktId)
      .eq('markt_produkte.verfuegbar', true)
      .eq('aktiv', true)
    if (error) console.error('fetchProdukteByMarkt:', error)
    return data || []
  }
  return PRODUKTE.filter(p =>
    !p.verfuegbarIn || p.verfuegbarIn.includes(Number(marktId))
  )
}

/**
 * Live-Suche im Header (max. 5 Ergebnisse).
 * ilike = case-insensitive LIKE in Postgres.
 */
export async function sucheProdukte(query, marktId = null) {
  if (supabaseAktiv) {
    let dbQuery = supabase
      .from('produkte')
      .select('*')
      .ilike('name', `%${query}%`)
      .eq('aktiv', true)
      .limit(5)
    const { data, error } = await dbQuery
    if (error) console.error('sucheProdukte:', error)
    return data || []
  }
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

// ── Märkte ────────────────────────────────────────────────────

/**
 * Alle aktiven Märkte laden.
 * Im Mock: 9 echte nah&gut Filialen mit echten Adressen (src/data/maerkte.js).
 */
export async function fetchMaerkte() {
  if (supabaseAktiv) {
    const { data, error } = await supabase
      .from('maerkte')
      .select('*')
      .eq('aktiv', true)
      .order('name')
    if (error) console.error('fetchMaerkte:', error)
    return data || []
  }
  return MAERKTE
}

export async function fetchMarktById(id) {
  if (supabaseAktiv) {
    const { data, error } = await supabase
      .from('maerkte')
      .select('*')
      .eq('id', id)
      .single()
    if (error) console.error('fetchMarktById:', error)
    return data || null
  }
  return MAERKTE.find(m => m.id === Number(id)) || null
}

/**
 * Märkte für die PLZ-Suche laden.
 * Die Entfernungssortierung passiert im Frontend (src/utils/entfernung.js)
 * mit OpenStreetMap Nominatim für PLZ → GPS-Koordinaten.
 *
 * WARUM im Frontend sortieren? Nominatim ist eine externe API —
 * wäre im Backend eine unnötige zusätzliche Abhängigkeit.
 */
export async function fetchMaerkteByPlz(plz) {
  if (supabaseAktiv) {
    // Alle aktiven Märkte laden → Frontend sortiert nach Entfernung
    const { data, error } = await supabase
      .from('maerkte')
      .select('*')
      .eq('aktiv', true)
    if (error) console.error('fetchMaerkteByPlz:', error)
    return data || []
  }
  return MAERKTE
}

// ── Lagerbestand ──────────────────────────────────────────────

/**
 * Lagerbestand eines Markts laden — gibt ein Objekt zurück:
 *   { [produktId]: { verfuegbar: boolean, menge: number } }
 *
 * WARUM dieses Format? Damit Komponenten per getBestand(produktId)
 * blitzschnell nachschlagen können ohne durch ein Array zu loopen.
 *
 * Warenwirtschaft-Anbindung: Diese Funktion gegen die echte
 * Warenwirtschafts-API ersetzen (GET /lagerbestand?markt=X).
 * Das Format muss gleich bleiben damit ProduktKarte.jsx funktioniert.
 */
export async function fetchLagerbestand(marktId) {
  if (supabaseAktiv) {
    const { data, error } = await supabase
      .from('markt_produkte')
      .select('produkt_id, verfuegbar, lagerbestand')
      .eq('markt_id', marktId)
    if (error) console.error('fetchLagerbestand:', error)
    return (data || []).reduce((acc, row) => {
      acc[row.produkt_id] = {
        verfuegbar: row.verfuegbar,
        menge: row.lagerbestand,
      }
      return acc
    }, {})
  }
  // Mock: zufälliger Lagerbestand damit die UI-Zustände sichtbar sind
  return PRODUKTE.reduce((acc, p) => {
    const menge = Math.floor(Math.random() * 20) + 1
    acc[p.id] = { verfuegbar: menge > 0, menge }
    return acc
  }, {})
}

// ── Abholslots ────────────────────────────────────────────────

/**
 * Verfügbare Abholtermine eines Markts laden.
 *
 * Im echten Betrieb kommen die Slots aus der DB (Tabelle: abholslots).
 * Admins können dort Kapazitäten und Zeiten verwalten.
 * kapazitaet - gebucht = noch freie Plätze (nur freie werden zurückgegeben).
 *
 * Im Mock: automatisch die nächsten 7 Tage mit fixen Stunden-Slots.
 */
export async function fetchAbholslots(marktId) {
  if (supabaseAktiv) {
    const heute = new Date().toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('abholslots')
      .select('*')
      .eq('markt_id', marktId)
      .eq('aktiv', true)
      .gte('datum', heute)
      .lt('gebucht', supabase.raw('kapazitaet'))
      .order('datum')
      .order('uhrzeit')
    if (error) console.error('fetchAbholslots:', error)
    return data || []
  }
  // Mock: nächste 7 Tage mit je 8 Zeitslots
  const slots = []
  const heute = new Date()
  for (let i = 1; i <= 7; i++) {
    const datum = new Date(heute)
    datum.setDate(heute.getDate() + i)
    const datumStr = datum.toISOString().split('T')[0]
    const wochentag = datum.toLocaleDateString('de-DE', { weekday: 'long' })
    const tag = datum.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })
    slots.push({
      datum: datumStr,
      anzeige: `${wochentag}, ${tag}`,
      zeiten: ['08:00–09:00', '09:00–10:00', '10:00–11:00', '11:00–12:00',
               '13:00–14:00', '14:00–15:00', '15:00–16:00', '16:00–17:00'],
    })
  }
  return slots
}

// ── Bestellungen ──────────────────────────────────────────────

/**
 * Bestellung speichern — wird vom BestellenPage aufgerufen.
 *
 * WICHTIG: Bei Stripe-Integration wird dieser Pfad NICHT mehr genutzt!
 * Stripe → Webhook (api/webhook.js) → speichert die Bestellung nach
 * erfolgreicher Zahlung direkt in Supabase.
 *
 * Diese Funktion ist für Bar-Zahlung oder wenn Stripe nicht aktiv ist.
 */
export async function bestellungSpeichern(bestellung) {
  if (supabaseAktiv) {
    const bestellId = `ORD-${Date.now()}`
    // Hauptbestellung anlegen
    const { error: bestellFehler } = await supabase
      .from('bestellungen')
      .insert({
        id: bestellId,
        markt_id: bestellung.markt.id,
        abhol_datum: bestellung.slot.datum,
        abhol_uhrzeit: bestellung.slot.uhrzeit,
        kunde_name: bestellung.kunde.name,
        kunde_email: bestellung.kunde.email,
        kunde_telefon: bestellung.kunde.telefon || null,
        gesamt_preis: bestellung.gesamtPreis,
        zahlungsart: bestellung.zahlungsart,
        status: 'offen',
      })
    if (bestellFehler) throw bestellFehler

    // Einzelne Artikel als Bestellpositionen speichern
    const positionen = bestellung.artikel.map(({ produkt, menge }) => ({
      bestellung_id: bestellId,
      produkt_id: produkt.id,
      produkt_name: produkt.name,  // Snapshot des Namens zum Bestellzeitpunkt
      menge,
      einzelpreis: produkt.preis,
      gesamt: produkt.preis * menge,
    }))
    const { error: posFehler } = await supabase
      .from('bestellpositionen')
      .insert(positionen)
    if (posFehler) throw posFehler

    return { id: bestellId, erfolg: true }
  }

  // Mock: in localStorage speichern (Demo-Modus)
  const id = `ORD-${Date.now()}`
  const bestellungen = JSON.parse(localStorage.getItem('bestellungen') || '[]')
  bestellungen.push({ ...bestellung, id, erstelltAm: new Date().toISOString() })
  localStorage.setItem('bestellungen', JSON.stringify(bestellungen))
  return { id, erfolg: true }
}

/**
 * Eine Bestellung anhand ID laden (für Bestätigungsseite nach Checkout).
 */
export async function fetchBestellungById(id) {
  if (supabaseAktiv) {
    const { data, error } = await supabase
      .from('bestellungen')
      .select('*, bestellpositionen(*), maerkte(*)')
      .eq('id', id)
      .single()
    if (error) console.error('fetchBestellungById:', error)
    return data || null
  }
  const bestellungen = JSON.parse(localStorage.getItem('bestellungen') || '[]')
  return bestellungen.find(b => b.id === id) || null
}

// ── Admin ──────────────────────────────────────────────────────

/**
 * Alle Bestellungen eines Markts für das Admin-Dashboard.
 * Sortiert nach Erstelldatum absteigend (neueste zuerst).
 * Optional nach Status filtern (offen/bezahlt/bereit/abgeholt).
 */
export async function fetchBestellungenAdmin(marktId, status = null) {
  if (supabaseAktiv) {
    let query = supabase
      .from('bestellungen')
      .select('*, bestellpositionen(*)')
      .eq('markt_id', marktId)
      .order('erstellt_am', { ascending: false })
    if (status) query = query.eq('status', status)
    const { data, error } = await query
    if (error) console.error('fetchBestellungenAdmin:', error)
    return data || []
  }
  return JSON.parse(localStorage.getItem('bestellungen') || '[]')
}

/**
 * Status einer Bestellung aktualisieren.
 * Mögliche Status: offen → bezahlt → bereit → abgeholt | storniert
 *
 * WARUM aktualisiert_am setzen? Damit Admins sehen wann zuletzt
 * etwas geändert wurde (Audit-Trail light).
 */
export async function bestellungStatusAktualisieren(bestellId, status) {
  if (supabaseAktiv) {
    const { error } = await supabase
      .from('bestellungen')
      .update({ status, aktualisiert_am: new Date().toISOString() })
      .eq('id', bestellId)
    if (error) throw error
    return { erfolg: true }
  }
  return { erfolg: true }
}
