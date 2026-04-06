import { createContext, useContext, useReducer, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const CartContext = createContext(null)

const ARTIKEL_HINZUFUEGEN = 'ARTIKEL_HINZUFUEGEN'
const ARTIKEL_ENTFERNEN = 'ARTIKEL_ENTFERNEN'
const MENGE_AENDERN = 'MENGE_AENDERN'
const WARENKORB_LEEREN = 'WARENKORB_LEEREN'
const MARKT_WAEHLEN = 'MARKT_WAEHLEN'
const SLOT_WAEHLEN = 'SLOT_WAEHLEN'
const ZAHLUNGSART_SETZEN = 'ZAHLUNGSART_SETZEN'

function cartReducer(state, action) {
  switch (action.type) {
    case ARTIKEL_HINZUFUEGEN: {
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
      return { ...state, artikel: [], gewaehlterMarkt: null, gewaehlterSlot: null, zahlungsart: null }
    case MARKT_WAEHLEN:
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
    gewaehlterMarkt: null,
    gewaehlterSlot: null,
    zahlungsart: null,
  }

  const [state, dispatch] = useReducer(cartReducer, anfangsZustand)

  // Warenkorb in localStorage persistieren
  useEffect(() => {
    setGespeicherteArtikel(state.artikel)
  }, [state.artikel])

  // Derived values
  const gesamtArtikel = state.artikel.reduce((sum, a) => sum + a.menge, 0)
  const gesamtPreis = state.artikel.reduce((sum, a) => sum + a.produkt.preis * a.menge, 0)
  const istLeer = state.artikel.length === 0

  const artikelHinzufuegen = (produkt) => dispatch({ type: ARTIKEL_HINZUFUEGEN, produkt })
  const artikelEntfernen = (id) => dispatch({ type: ARTIKEL_ENTFERNEN, id })
  const mengeAendern = (id, menge) => dispatch({ type: MENGE_AENDERN, id, menge })
  const warenkorbLeeren = () => dispatch({ type: WARENKORB_LEEREN })
  const marktWaehlen = (markt) => dispatch({ type: MARKT_WAEHLEN, markt })
  const slotWaehlen = (slot) => dispatch({ type: SLOT_WAEHLEN, slot })
  const zahlungsartSetzen = (zahlungsart) => dispatch({ type: ZAHLUNGSART_SETZEN, zahlungsart })

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

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart muss innerhalb von CartProvider verwendet werden')
  return context
}
