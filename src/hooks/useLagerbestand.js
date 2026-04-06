/**
 * useLagerbestand — Hook für marktspezifischen Lagerbestand
 * ───────────────────────────────────────────────────────────────
 * WARUM ein eigener Hook?
 *   Mehrere Komponenten brauchen den Lagerbestand (ProduktKarte,
 *   KategoriePage). Statt die Logik zu duplizieren, kapselt dieser
 *   Hook das Laden + Cachen + Loading-State an einem Ort.
 *
 * FUNKTIONSWEISE:
 *   - Hört auf den gewählten Markt aus dem CartContext
 *   - Lädt bei Marktwechsel automatisch den neuen Lagerbestand
 *   - Gibt getBestand(produktId) zurück: schnelle O(1) Abfrage
 *
 * FALLBACK von getBestand:
 *   { verfuegbar: true, menge: 99 } — wenn kein Lagerbestand
 *   geladen ist, wird das Produkt als verfügbar angezeigt.
 *   Das verhindert dass beim ersten Laden alle Produkte als
 *   "nicht verfügbar" erscheinen.
 *
 * VERWENDUNG:
 *   const { getBestand, loading } = useLagerbestand()
 *   const bestand = getBestand(produkt.id)
 *   // bestand.verfuegbar → boolean
 *   // bestand.menge → Anzahl auf Lager
 */

import { useState, useEffect } from 'react'
import { fetchLagerbestand } from '../services/api'
import { useCart } from '../context/CartContext'

export function useLagerbestand() {
  const { gewaehlterMarkt } = useCart()
  const [lagerbestand, setLagerbestand] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Kein Markt gewählt → nichts laden
    if (!gewaehlterMarkt) return

    setLoading(true)
    fetchLagerbestand(gewaehlterMarkt.id)
      .then(setLagerbestand)
      .finally(() => setLoading(false))

    // gewaehlterMarkt.id als Dependency: lädt neu wenn anderer Markt gewählt
  }, [gewaehlterMarkt?.id])

  /**
   * Lagerbestand für ein Produkt abrufen.
   * @param {number} produktId
   * @returns {{ verfuegbar: boolean, menge: number }}
   */
  const getBestand = (produktId) => lagerbestand[produktId] || { verfuegbar: true, menge: 99 }

  return { lagerbestand, loading, getBestand }
}
