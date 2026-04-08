/**
 * CartContext — Globaler Warenkorb-Zustand
 * ───────────────────────────────────────────────────────────────
 * WARUM Context statt lokalem State?
 *   Der Warenkorb wird auf VIELEN Seiten gleichzeitig gebraucht:
 *   Header (Badge-Zahl), Produktkarten (Menge), Checkout (Artikel).
 *   Mit Context muss man die Daten nicht mühsam von Seite zu Seite
 *   weitergeben — jede Komponente kann direkt zugreifen via useCart().
 *
 * WARUM useReducer statt useState?
 *   useReducer ist besser wenn mehrere Teile des State zusammengehören
 *   und sich gegenseitig beeinflussen (z.B. Markt wählen → Slot zurücksetzen).
 *   Alle Änderungen laufen durch eine einzige cartReducer-Funktion —
 *   das macht den Code vorhersehbar und leicht testbar.
 *
 * PERSISTENZ:
 *   Nur die Artikel werden in localStorage gespeichert (bleibt nach
 *   Browser-Refresh). Markt, Slot und Zahlungsart werden bewusst
 *   NICHT gespeichert — der Kunde soll diese bei jeder Bestellung
 *   frisch auswählen.
 *
 * VERWENDUNG in Komponenten:
 *   import { useCart } from '../context/CartContext'
 *   const { artikel, artikelHinzufuegen, gesamtPreis } = useCart()
 */

import { createContext, useContext, useReducer, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const CartContext = createContext(null)

// Action-Typen als Konstanten — verhindert Tippfehler
const ARTIKEL_HINZUFUEGEN = 'ARTIKEL_HINZUFUEGEN'
const ARTIKEL_ENTFERNEN   = 'ARTIKEL_ENTFERNEN'
const MENGE_AENDERN       = 'MENGE_AENDERN'
const WARENKORB_LEEREN    = 'WARENKORB_LEEREN'
const MARKT_WAEHLEN       = 'MARKT_WAEHLEN'
const SLOT_WAEHLEN        = 'SLOT_WAEHLEN'
const ZAHLUNGSART_SETZEN  = 'ZAHLUNGSART_SETZEN'

/**
 * Pure Funktion: nimmt alten State + Action → gibt neuen State zurück.
 * Niemals den State direkt mutieren (immer spread: { ...state, ... })!
 */
function cartReducer(state, action) {
  switch (action.type) {

    case ARTIKEL_HINZUFUEGEN: {
      // Schon im Warenkorb? → Menge erhöhen statt doppelt eintragen
      const vorhandener = state.artikel.find(a => a.produkt.id === action.produkt.id)
      if (vorhandener) {
        return {
          ...state,
          artikel: state.artikel.map(a =>
            a.produkt.id === action.produkt.id
              ? { ...a, menge: a.menge + 1 }
              : a
          ),
        }
      }
      return { ...state, artikel: [...state.artikel, { produkt: action.produkt, menge: 1 }] }
    }

    case ARTIKEL_ENTFERNEN:
      return { ...state, artikel: state.artikel.filter(a => a.produkt.id !== action.id) }

    case MENGE_AENDERN: {
      // Menge 0 oder weniger = Artikel entfernen (kein leerer Eintrag)
      if (action.menge <= 0) {
        return { ...state, artikel: state.artikel.filter(a => a.produkt.id !== action.id) }
      }
      return {
        ...state,
        artikel: state.artikel.map(a =>
          a.produkt.id === action.id ? { ...a, menge: action.menge } : a
        ),
      }
    }

    case WARENKORB_LEEREN:
      // Nach Bestellung alles zurücksetzen inkl. Markt/Slot/Zahlung
      return { ...state, artikel: [], gewaehlterMarkt: null, gewaehlterSlot: null, zahlungsart: null }

    case MARKT_WAEHLEN:
      // Neuer Markt → Slot zurücksetzen (Zeiten sind markt-spezifisch!)
      return { ...state, gewaehlterMarkt: action.markt, gewaehlterSlot: null }

    case SLOT_WAEHLEN:
      return { ...state, gewaehlterSlot: action.slot }

    case ZAHLUNGSART_SETZEN:
      return { ...state, zahlungsart: action.zahlungsart }

    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [gespeicherteArtikel, setGespeicherteArtikel] = useLocalStorage('edeka-warenkorb', [])

  const anfangsZustand = {
    artikel: gespeicherteArtikel,
    gewaehlterMarkt: (() => { try { return JSON.parse(localStorage.getItem('edeka-markt')) } catch { return null } })(),
    gewaehlterSlot: null,
    zahlungsart: null,
  }

  const [state, dispatch] = useReducer(cartReducer, anfangsZustand)

  // Jede Änderung der Artikel sofort in localStorage spiegeln
  useEffect(() => {
    setGespeicherteArtikel(state.artikel)
  }, [state.artikel])

  // Berechnete Werte (werden bei jedem Render neu berechnet)
  const gesamtArtikel = state.artikel.reduce((sum, a) => sum + a.menge, 0)
  const gesamtPreis   = state.artikel.reduce((sum, a) => sum + a.produkt.preis * a.menge, 0)
  const istLeer       = state.artikel.length === 0

  // Öffentliche API — nur über diese Funktionen den State ändern
  const artikelHinzufuegen = (produkt)          => dispatch({ type: ARTIKEL_HINZUFUEGEN, produkt })
  const artikelEntfernen   = (id)               => dispatch({ type: ARTIKEL_ENTFERNEN, id })
  const mengeAendern       = (id, menge)        => dispatch({ type: MENGE_AENDERN, id, menge })
  const warenkorbLeeren    = ()                 => dispatch({ type: WARENKORB_LEEREN })
  const marktWaehlen       = (markt)            => dispatch({ type: MARKT_WAEHLEN, markt })
  const slotWaehlen        = (slot)             => dispatch({ type: SLOT_WAEHLEN, slot })
  const zahlungsartSetzen  = (zahlungsart)      => dispatch({ type: ZAHLUNGSART_SETZEN, zahlungsart })

  return (
    <CartContext.Provider value={{
      ...state,
      gesamtArtikel,
      gesamtPreis,
      istLeer,
      artikelHinzufuegen,
      artikelEntfernen,
      mengeAendern,
      warenkorbLeeren,
      marktWaehlen,
      slotWaehlen,
      zahlungsartSetzen,
    }}>
      {children}
    </CartContext.Provider>
  )
}

/**
 * Hook für einfachen Zugriff auf den Warenkorb.
 * Wirft einen Fehler wenn außerhalb von CartProvider verwendet —
 * so findet man Integrationsfehler sofort beim Entwickeln.
 */
export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart muss innerhalb von CartProvider verwendet werden')
  return context
}
