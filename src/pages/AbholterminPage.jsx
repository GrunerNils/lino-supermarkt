import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'
import { useCart } from '../context/CartContext'
import CheckoutStepper from '../components/checkout/CheckoutStepper'

export default function AbholterminPage() {
  const { istLeer, marktWaehlen, slotWaehlen, gewaehlterMarkt } = useCart()
  const navigate = useNavigate()

  const [gewaehltesDatum, setGewaehltesDatum] = useState(null)
  const [gewaehlteUhrzeit, setGewaehlteUhrzeit] = useState(null)

  useEffect(() => {
    if (istLeer) navigate('/warenkorb')
  }, [istLeer])

  const aktuellerMarkt = gewaehlterMarkt

  const datumOptionen = aktuellerMarkt?.abholzeiten || []
  const aktiverTag = datumOptionen.find(t => t.datum === gewaehltesDatum)

  const weiter = () => {
    if (!aktuellerMarkt || !gewaehltesDatum || !gewaehlteUhrzeit) return
    marktWaehlen(aktuellerMarkt)
    slotWaehlen({ datum: aktiverTag?.anzeige, uhrzeit: gewaehlteUhrzeit })
    navigate('/zahlung')
  }

  return (
    <div className="bg-bg-page min-h-screen">
      <div className="bg-brand-yellow py-3">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <Link to="/"><img src="/logo.webp" alt="EDEKA" className="h-9 w-auto" /></Link>
          <span className="text-sm font-medium text-text-dark opacity-70">Abholservice</span>
        </div>
      </div>

      <CheckoutStepper aktiv={2} />

      <div className="max-w-3xl mx-auto px-4 pb-12">
        <Link to="/warenkorb" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-brand-red mb-4 transition-colors">
          ← Zurück
        </Link>
        <h1 className="text-2xl font-black text-text-dark mb-6">Abholtermin wählen</h1>

        {/* Gewählter Markt (read-only) */}
        {aktuellerMarkt && (
          <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-100 flex items-start gap-3">
            <MapPinIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm text-green-800">{aktuellerMarkt.name}</p>
              <p className="text-xs text-green-600">{aktuellerMarkt.adresse}, {aktuellerMarkt.plz} {aktuellerMarkt.stadt}</p>
            </div>
          </div>
        )}

        {/* Schritt 1: Datum wählen */}
        <div className="mb-6">
          <h2 className="font-bold text-text-dark mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-yellow flex items-center justify-center text-xs font-black">1</span>
            Abholtermin wählen
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {datumOptionen.map(tag => (
              <button
                key={tag.datum}
                onClick={() => { setGewaehltesDatum(tag.datum); setGewaehlteUhrzeit(null) }}
                className={`flex-shrink-0 px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-colors ${
                  gewaehltesDatum === tag.datum
                    ? 'border-brand-green bg-green-50 text-brand-green-dark'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                {tag.anzeige}
              </button>
            ))}
          </div>
        </div>

        {/* Schritt 2: Uhrzeit wählen */}
        {gewaehltesDatum && aktiverTag && (
          <div className="mb-8">
            <h2 className="font-bold text-text-dark mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-yellow flex items-center justify-center text-xs font-black">2</span>
              Uhrzeit wählen
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {aktiverTag.zeiten.map(zeit => (
                <button
                  key={zeit}
                  onClick={() => setGewaehlteUhrzeit(zeit)}
                  className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg border-2 text-sm font-medium transition-colors ${
                    gewaehlteUhrzeit === zeit
                      ? 'border-brand-green bg-green-50 text-brand-green-dark'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <ClockIcon className="w-4 h-4" />
                  {zeit}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Weiter-Button */}
        <button
          onClick={weiter}
          disabled={!aktuellerMarkt || !gewaehltesDatum || !gewaehlteUhrzeit}
          className="w-full bg-brand-yellow hover:bg-brand-yellow-dark disabled:opacity-40 disabled:cursor-not-allowed text-text-dark font-bold py-3 rounded-lg transition-colors"
        >
          Weiter zur Zahlung →
        </button>
      </div>
    </div>
  )
}
