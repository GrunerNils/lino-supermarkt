import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CheckoutStepper from '../components/checkout/CheckoutStepper'
import { formatPreis, generiereBestellId } from '../utils/formatters'

const ZAHLUNGSART_LABELS = {
  kreditkarte: '💳 Kreditkarte',
  paypal: '🅿️ PayPal',
  lastschrift: '🏦 Lastschrift (SEPA)',
  bar: '💶 Bar bei Abholung',
}

export default function BestellenPage() {
  const { artikel, gesamtPreis, istLeer, gewaehlterMarkt, gewaehlterSlot, zahlungsart, warenkorbLeeren } = useCart()
  const navigate = useNavigate()

  const [formular, setFormular] = useState({ vorname: '', nachname: '', email: '', telefon: '' })
  const [fehler, setFehler] = useState({})
  const [laedt, setLaedt] = useState(false)

  useEffect(() => {
    if (istLeer) navigate('/warenkorb')
  }, [istLeer])

  const validiere = () => {
    const f = {}
    if (!formular.vorname.trim()) f.vorname = 'Pflichtfeld'
    if (!formular.nachname.trim()) f.nachname = 'Pflichtfeld'
    if (!formular.email.trim() || !/\S+@\S+\.\S+/.test(formular.email)) f.email = 'Ungültige E-Mail'
    setFehler(f)
    return Object.keys(f).length === 0
  }

  const bestellen = async () => {
    if (!validiere()) return
    setLaedt(true)

    const bestellId = generiereBestellId()
    const bestellung = {
      id: bestellId,
      datum: new Date().toISOString(),
      kunde: formular,
      markt: gewaehlterMarkt,
      slot: gewaehlterSlot,
      zahlungsart,
      artikel,
      gesamtPreis,
    }

    // Demo: in localStorage speichern
    const bisherige = JSON.parse(localStorage.getItem('edeka-bestellungen') || '[]')
    localStorage.setItem('edeka-bestellungen', JSON.stringify([...bisherige, bestellung]))

    await new Promise(r => setTimeout(r, 800)) // Demo-Delay
    warenkorbLeeren()
    navigate(`/bestellbestaetigung/${bestellId}`)
  }

  const feld = (key, label, typ = 'text', placeholder = '') => (
    <div>
      <label className="text-xs text-gray-500 mb-1 block">{label}</label>
      <input
        type={typ}
        placeholder={placeholder}
        value={formular[key]}
        onChange={e => setFormular({...formular, [key]: e.target.value})}
        className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-green ${
          fehler[key] ? 'border-brand-red bg-red-50' : 'border-gray-300'
        }`}
      />
      {fehler[key] && <p className="text-xs text-brand-red mt-0.5">{fehler[key]}</p>}
    </div>
  )

  return (
    <div className="bg-bg-page min-h-screen">
      <div className="bg-brand-yellow py-3">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <Link to="/"><img src="/logo.webp" alt="EDEKA" className="h-9 w-auto" /></Link>
          <span className="text-sm font-medium text-text-dark opacity-70">Abholservice</span>
        </div>
      </div>

      <CheckoutStepper aktiv={4} />

      <div className="max-w-5xl mx-auto px-4 pb-12">
        <Link to="/zahlung" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-brand-red mb-4 transition-colors">
          ← Zurück
        </Link>
        <h1 className="text-2xl font-black text-text-dark mb-6">Bestellübersicht</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Persönliche Daten */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h2 className="font-bold text-text-dark mb-4">Persönliche Daten</h2>
              <div className="grid grid-cols-2 gap-4">
                {feld('vorname', 'Vorname*', 'text', 'Max')}
                {feld('nachname', 'Nachname*', 'text', 'Mustermann')}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {feld('email', 'E-Mail*', 'email', 'max@example.de')}
                {feld('telefon', 'Telefon (optional)', 'tel', '+49 123 456789')}
              </div>
            </div>

            {/* Abholtermin-Zusammenfassung */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h2 className="font-bold text-text-dark mb-4">Abholung & Zahlung</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Markt:</span>
                  <span className="font-medium">{gewaehlterMarkt?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Adresse:</span>
                  <span className="font-medium text-right">{gewaehlterMarkt?.adresse}, {gewaehlterMarkt?.plz} {gewaehlterMarkt?.stadt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Abholtermin:</span>
                  <span className="font-medium">{gewaehlterSlot?.datum}, {gewaehlterSlot?.uhrzeit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Zahlung:</span>
                  <span className="font-medium">{ZAHLUNGSART_LABELS[zahlungsart] || zahlungsart}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bestellübersicht Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-5 sticky top-24">
              <h2 className="font-bold text-text-dark mb-3">Deine Artikel ({artikel.length})</h2>
              <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
                {artikel.map(({ produkt: p, menge }) => (
                  <div key={p.id} className="flex items-center gap-2 text-sm">
                    <img src={p.bild} alt={p.name} className="w-10 h-10 object-cover rounded flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium line-clamp-1">{p.name}</p>
                      <p className="text-gray-500 text-xs">{menge}× {formatPreis(p.preis)}</p>
                    </div>
                    <span className="font-semibold flex-shrink-0">{formatPreis(p.preis * menge)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Zwischensumme</span>
                  <span>{formatPreis(gesamtPreis)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Einkauf packen</span>
                  <span className="text-brand-green font-medium">Kostenlos</span>
                </div>
                <div className="flex justify-between font-bold text-base border-t pt-2">
                  <span>Gesamt</span>
                  <span>{formatPreis(gesamtPreis)}</span>
                </div>
              </div>

              <button
                onClick={bestellen}
                disabled={laedt}
                className="w-full bg-brand-yellow hover:bg-brand-yellow-dark disabled:opacity-50 text-text-dark font-bold py-3 rounded-lg mt-4 transition-colors"
              >
                {laedt ? '⏳ Wird bearbeitet...' : 'Jetzt kostenpflichtig bestellen'}
              </button>

              <p className="text-xs text-gray-400 text-center mt-2">
                Mit der Bestellung akzeptierst du unsere <a href="#" className="text-brand-red">AGB</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
