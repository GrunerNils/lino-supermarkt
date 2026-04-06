import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CreditCardIcon, LockClosedIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { useCart } from '../context/CartContext'
import CheckoutStepper from '../components/checkout/CheckoutStepper'
import { formatPreis } from '../utils/formatters'

const ZAHLUNGSARTEN = [
  { id: 'kreditkarte', label: 'Kreditkarte', icon: '💳', beschreibung: 'Visa, Mastercard, American Express' },
  { id: 'paypal', label: 'PayPal', icon: '🅿️', beschreibung: 'Schnell und sicher mit PayPal bezahlen' },
  { id: 'lastschrift', label: 'Lastschrift (SEPA)', icon: '🏦', beschreibung: 'Direkt vom Girokonto abbuchen' },
  { id: 'bar', label: 'Bar bei Abholung', icon: '💶', beschreibung: 'Zahle beim Abholen im Markt' },
]

export default function ZahlungPage() {
  const { istLeer, zahlungsartSetzen, zahlungsart: gespeicherteZahlungsart, gesamtPreis, artikel, gewaehlterMarkt, gewaehlterSlot } = useCart()
  const navigate = useNavigate()
  const [gewaehlt, setGewaehlt] = useState(gespeicherteZahlungsart || null)
  const [karte, setKarte] = useState({ nummer: '', ablauf: '', cvv: '', name: '' })
  const [stripeLoading, setStripeLoading] = useState(false)

  useEffect(() => {
    if (istLeer) navigate('/warenkorb')
  }, [istLeer])

  const weiter = () => {
    if (!gewaehlt) return
    zahlungsartSetzen(gewaehlt)
    navigate('/bestellen')
  }

  // Stripe Checkout — wird aktiv sobald VITE_STRIPE_PUBLISHABLE_KEY gesetzt ist
  const stripeAktiv = !!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

  const handleStripeCheckout = async () => {
    setStripeLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artikel, markt: gewaehlterMarkt, slot: gewaehlterSlot }),
      })
      const data = await res.json()
      if (data.url) {
        // Echte Stripe-Weiterleitung
        window.location.href = data.url
      } else {
        // Demo-Modus
        zahlungsartSetzen('kreditkarte')
        navigate('/bestellen')
      }
    } catch (e) {
      console.error(e)
    } finally {
      setStripeLoading(false)
    }
  }

  return (
    <div className="bg-bg-page min-h-screen">
      <div className="bg-brand-yellow py-3">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <Link to="/"><img src="/logo.webp" alt="EDEKA" className="h-9 w-auto" /></Link>
          <span className="text-sm font-medium text-text-dark opacity-70">Abholservice</span>
        </div>
      </div>

      <CheckoutStepper aktiv={3} />

      <div className="max-w-xl mx-auto px-4 pb-12">
        <Link to="/abholtermin" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-brand-red mb-4 transition-colors">
          ← Zurück
        </Link>
        <h1 className="text-2xl font-black text-text-dark mb-6">Zahlungsart wählen</h1>

        <div className="space-y-3 mb-6">
          {ZAHLUNGSARTEN.map(z => (
            <button
              key={z.id}
              onClick={() => setGewaehlt(z.id)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all flex items-center gap-4 ${
                gewaehlt === z.id
                  ? 'border-brand-green bg-green-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">{z.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-sm text-text-dark">{z.label}</p>
                <p className="text-xs text-gray-500">{z.beschreibung}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                gewaehlt === z.id ? 'border-brand-green' : 'border-gray-300'
              }`}>
                {gewaehlt === z.id && <div className="w-2.5 h-2.5 rounded-full bg-brand-green" />}
              </div>
            </button>
          ))}
        </div>

        {/* Kreditkarten-Formular (Demo) */}
        {gewaehlt === 'kreditkarte' && (
          <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6 space-y-4">
            <h3 className="font-bold text-sm text-text-dark">Kartendaten</h3>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Karteninhaber</label>
              <input
                type="text"
                placeholder="Max Mustermann"
                value={karte.name}
                onChange={e => setKarte({...karte, name: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-green"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Kartennummer</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={karte.nummer}
                onChange={e => setKarte({...karte, nummer: e.target.value})}
                maxLength={19}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-green"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Ablaufdatum</label>
                <input
                  type="text"
                  placeholder="MM/JJ"
                  value={karte.ablauf}
                  onChange={e => setKarte({...karte, ablauf: e.target.value})}
                  maxLength={5}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-green"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  value={karte.cvv}
                  onChange={e => setKarte({...karte, cvv: e.target.value})}
                  maxLength={3}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-green"
                />
              </div>
            </div>
            <p className="text-xs text-gray-400">🔒 Demo-Formular – keine echten Daten eingeben</p>
          </div>
        )}

        {/* Stripe-Button (aktiv wenn API-Key gesetzt) */}
        {stripeAktiv ? (
          <button
            onClick={handleStripeCheckout}
            disabled={stripeLoading}
            className="w-full bg-brand-yellow hover:bg-brand-yellow-dark disabled:opacity-40 text-text-dark font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm text-base"
          >
            <LockClosedIcon className="w-4 h-4" />
            {stripeLoading ? 'Weiterleitung zu Stripe...' : `Jetzt bezahlen – ${formatPreis(gesamtPreis)}`}
          </button>
        ) : (
          <button
            onClick={weiter}
            disabled={!gewaehlt}
            className="w-full bg-brand-yellow hover:bg-brand-yellow-dark disabled:opacity-40 disabled:cursor-not-allowed text-text-dark font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            Weiter zur Bestellübersicht →
          </button>
        )}

        {/* Stripe Hinweis */}
        <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
          <ShieldCheckIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-blue-800">Bereit für echte Zahlungen</p>
            <p className="text-xs text-blue-600 mt-0.5">
              Stripe-Integration ist vorbereitet. Sobald der <code className="bg-blue-100 px-1 rounded">STRIPE_SECRET_KEY</code> in Vercel gesetzt wird, sind echte Zahlungen aktiv.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
