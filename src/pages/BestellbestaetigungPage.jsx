import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { formatPreis } from '../utils/formatters'

export default function BestellbestaetigungPage() {
  const { id } = useParams()
  const [bestellung, setBestellung] = useState(null)

  useEffect(() => {
    const alle = JSON.parse(localStorage.getItem('edeka-bestellungen') || '[]')
    const gefunden = alle.find(b => b.id === id)
    setBestellung(gefunden || null)
  }, [id])

  return (
    <div className="bg-bg-page min-h-screen">
      <div className="bg-brand-yellow py-3">
        <div className="max-w-5xl mx-auto px-4">
          <Link to="/"><img src="/logo.webp" alt="EDEKA" className="h-9 w-auto" /></Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Erfolgs-Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircleIcon className="w-20 h-20 text-brand-green animate-bounce" />
          </div>
          <h1 className="text-3xl font-black text-text-dark mb-2">Vielen Dank für deine Bestellung!</h1>
          <p className="text-gray-600">Dein Einkauf wird für dich gepackt und liegt zum vereinbarten Termin bereit.</p>
        </div>

        {bestellung ? (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Bestellnummer */}
            <div className="bg-brand-yellow px-6 py-4">
              <p className="text-sm font-medium text-text-dark opacity-70">Bestellnummer</p>
              <p className="font-black text-lg text-text-dark">{bestellung.id}</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Abholinfo */}
              <div>
                <h3 className="font-bold text-text-dark mb-3">📍 Abholinfo</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm">
                  <p className="font-bold text-text-dark">{bestellung.markt?.name}</p>
                  <p className="text-gray-600">{bestellung.markt?.adresse}, {bestellung.markt?.plz} {bestellung.markt?.stadt}</p>
                  <p className="text-brand-green-dark font-semibold mt-2">
                    🕐 {bestellung.slot?.datum}, {bestellung.slot?.uhrzeit}
                  </p>
                </div>
              </div>

              {/* Artikel */}
              <div>
                <h3 className="font-bold text-text-dark mb-3">🛒 Bestellte Artikel</h3>
                <div className="space-y-2">
                  {bestellung.artikel?.map(({ produkt: p, menge }) => (
                    <div key={p.id} className="flex items-center gap-3 text-sm">
                      <img src={p.bild} alt={p.name} className="w-10 h-10 object-cover rounded flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium">{p.name}</p>
                        <p className="text-gray-500 text-xs">{menge}× {formatPreis(p.preis)}</p>
                      </div>
                      <span className="font-semibold">{formatPreis(p.preis * menge)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between font-bold">
                  <span>Gesamt</span>
                  <span>{formatPreis(bestellung.gesamtPreis)}</span>
                </div>
              </div>

              {/* Bestätigung an E-Mail */}
              {bestellung.kunde?.email && (
                <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                  📧 Eine Bestätigung wurde an <strong>{bestellung.kunde.email}</strong> gesendet.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">
            <p>Bestelldetails konnten nicht geladen werden.</p>
            <p className="text-xs mt-1">Bestellnummer: {id}</p>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Link
            to="/"
            className="flex-1 bg-brand-yellow hover:bg-brand-yellow-dark text-text-dark font-bold py-3 rounded-lg text-center transition-colors"
          >
            Weiter einkaufen
          </Link>
          <Link
            to="/"
            className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold py-3 rounded-lg text-center transition-colors"
          >
            Startseite
          </Link>
        </div>
      </div>
    </div>
  )
}
