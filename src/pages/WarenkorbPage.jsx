import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TrashIcon, MagnifyingGlassIcon, MapPinIcon, ClockIcon, ShoppingCartIcon, ArrowRightIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useCart } from '../context/CartContext'
import { formatPreis } from '../utils/formatters'
import MengenAuswahl from '../components/ui/MengenAuswahl'
import CheckoutStepper from '../components/checkout/CheckoutStepper'
import { PRODUKTE } from '../data/produkte'

export default function WarenkorbPage() {
  const { artikel, artikelEntfernen, gesamtPreis, gesamtArtikel, istLeer, gewaehlterMarkt, gewaehlterSlot, artikelHinzufuegen } = useCart()
  const navigate = useNavigate()
  const [suche, setSuche] = useState('')

  const suchergebnisse = suche.length >= 2
    ? PRODUKTE.filter(p => p.name.toLowerCase().includes(suche.toLowerCase()) && !artikel.find(a => a.produkt.id === p.id)).slice(0, 4)
    : []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
          <Link to="/"><img src="/logo.webp" alt="EDEKA" className="h-9 w-auto" /></Link>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <LockClosedIcon className="w-3.5 h-3.5 text-brand-green" />
            <span>Sicherer Checkout</span>
          </div>
        </div>
      </div>

      <CheckoutStepper aktiv={1} />

      <div className="max-w-5xl mx-auto px-4 pb-16">

        {/* Titel */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-brand-red/10 rounded-xl flex items-center justify-center">
            <ShoppingCartIcon className="w-5 h-5 text-brand-red" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-text-dark leading-tight">Warenkorb</h1>
            <p className="text-sm text-gray-500">{gesamtArtikel > 0 ? `${gesamtArtikel} Artikel` : 'Noch keine Artikel'}</p>
          </div>
          <Link to="/" className="ml-auto text-sm text-gray-500 hover:text-brand-red transition-colors flex items-center gap-1">
            ← Weiter einkaufen
          </Link>
        </div>

        {/* Suchleiste */}
        <div className="relative mb-6">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={suche}
              onChange={e => setSuche(e.target.value)}
              placeholder="Noch etwas vergessen? Produkt suchen..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
            />
          </div>
          {suchergebnisse.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl z-10 mt-1 overflow-hidden">
              {suchergebnisse.map(p => (
                <button
                  key={p.id}
                  onClick={() => { artikelHinzufuegen(p); setSuche('') }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-left border-b last:border-0 transition-colors"
                >
                  <img src={p.bild} alt={p.name} className="w-10 h-10 object-cover rounded-lg" />
                  <div className="flex-1">
                    <div className="font-semibold text-text-dark">{p.name}</div>
                    <div className="text-gray-400 text-xs">{p.gewicht} · {formatPreis(p.preis)}</div>
                  </div>
                  <span className="w-7 h-7 bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">+</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Artikelliste */}
          <div className="lg:col-span-2 space-y-4">

            {/* Markt-Info */}
            <div className={`rounded-xl p-4 flex items-center gap-3 ${gewaehlterMarkt ? 'bg-green-50 border border-green-100' : 'bg-amber-50 border border-amber-100'}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${gewaehlterMarkt ? 'bg-green-100' : 'bg-amber-100'}`}>
                <MapPinIcon className={`w-4 h-4 ${gewaehlterMarkt ? 'text-green-600' : 'text-amber-600'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm ${gewaehlterMarkt ? 'text-green-800' : 'text-amber-800'}`}>
                  {gewaehlterMarkt ? gewaehlterMarkt.name : 'Noch kein Markt gewählt'}
                </p>
                {gewaehlterMarkt && <p className="text-xs text-green-600">{gewaehlterMarkt.adresse}, {gewaehlterMarkt.plz} {gewaehlterMarkt.stadt}</p>}
              </div>
              <div className="flex items-center gap-1.5 text-xs flex-shrink-0">
                <ClockIcon className={`w-3.5 h-3.5 ${gewaehlterSlot ? 'text-green-500' : 'text-amber-500'}`} />
                <span className={gewaehlterSlot ? 'text-green-700' : 'text-amber-700'}>
                  {gewaehlterSlot ? `${gewaehlterSlot.datum}, ${gewaehlterSlot.uhrzeit}` : 'Termin nicht gewählt'}
                </span>
              </div>
            </div>

            {/* Artikel */}
            {istLeer ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCartIcon className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="font-bold text-lg text-text-dark mb-2">Dein Warenkorb ist leer</h3>
                <p className="text-sm text-gray-400 mb-6">Lege Produkte aus dem Sortiment in deinen Warenkorb.</p>
                <Link to="/" className="inline-flex items-center gap-2 bg-brand-yellow hover:bg-brand-yellow-dark text-text-dark font-bold py-2.5 px-6 rounded-xl transition-colors">
                  Zum Sortiment
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center text-xs text-gray-400 font-semibold px-5 py-3 bg-gray-50 border-b border-gray-100 uppercase tracking-wide">
                  <span className="flex-1">Produkt</span>
                  <span className="w-32 text-center">Menge</span>
                  <span className="w-20 text-right">Preis</span>
                  <span className="w-8" />
                </div>
                {artikel.map(({ produkt: p, menge }, idx) => (
                  <div
                    key={p.id}
                    className={`flex items-center gap-4 px-5 py-4 transition-colors hover:bg-gray-50 ${idx < artikel.length - 1 ? 'border-b border-gray-100' : ''}`}
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                      <img src={p.bild} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link to={`/produkt/${p.id}`} className="text-sm font-bold text-text-dark hover:text-brand-red line-clamp-1 transition-colors">{p.name}</Link>
                      <p className="text-xs text-gray-400 mt-0.5">{p.gewicht}</p>
                      <p className="text-xs font-semibold text-brand-red mt-0.5">{formatPreis(p.preis)} / Stück</p>
                    </div>
                    <div className="w-32 flex justify-center">
                      <MengenAuswahl produkt={p} menge={menge} kompakt />
                    </div>
                    <div className="w-20 text-right">
                      <p className="font-black text-base text-text-dark">{formatPreis(p.preis * menge)}</p>
                    </div>
                    <button
                      onClick={() => artikelEntfernen(p.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-brand-red hover:bg-red-50 transition-all"
                      aria-label="Entfernen"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-6">

              {/* Header der Sidebar */}
              <div className="bg-gradient-to-br from-text-dark to-gray-700 px-5 py-4">
                <h3 className="font-black text-white text-base">Bestellübersicht</h3>
                <p className="text-gray-400 text-xs mt-0.5">{gesamtArtikel} Artikel · inkl. MwSt.</p>
              </div>

              <div className="p-5 space-y-3">
                {/* Preiszeilen */}
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Artikel ({gesamtArtikel})</span>
                    <span className="font-semibold text-text-dark">{formatPreis(gesamtPreis)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Einkauf packen</span>
                    <span className="font-semibold text-brand-green flex items-center gap-1">
                      <CheckCircleIcon className="w-3.5 h-3.5" />
                      Kostenlos
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Abholung</span>
                    <span className="font-semibold text-brand-green flex items-center gap-1">
                      <CheckCircleIcon className="w-3.5 h-3.5" />
                      Kostenlos
                    </span>
                  </div>
                </div>

                {/* Gesamtsumme */}
                <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                  <span className="font-black text-text-dark">Gesamt</span>
                  <span className="font-black text-2xl text-brand-red">{formatPreis(gesamtPreis)}</span>
                </div>

                {/* Kasse Button */}
                <button
                  onClick={() => navigate('/abholtermin')}
                  disabled={istLeer}
                  className="w-full bg-brand-yellow hover:bg-brand-yellow-dark disabled:opacity-40 disabled:cursor-not-allowed text-text-dark font-black py-3.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm hover:shadow-md text-base"
                >
                  Zur Kasse
                  <ArrowRightIcon className="w-4 h-4" />
                </button>

                {/* Sicherheit */}
                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
                  <LockClosedIcon className="w-3 h-3" />
                  <span>Sichere & verschlüsselte Übertragung</span>
                </div>

                {/* Hinweise */}
                <div className="border-t border-gray-100 pt-3 space-y-2.5">
                  <div className="flex gap-2.5 items-start text-xs text-gray-500">
                    <span className="text-base leading-none mt-0.5">♻️</span>
                    <p>Nicht verfügbare Artikel werden durch ähnliche Produkte ersetzt.</p>
                  </div>
                  <div className="flex gap-2.5 items-start text-xs text-gray-500">
                    <span className="text-base leading-none mt-0.5">🛍️</span>
                    <p>Pfand-Transportboxen für deinen Einkauf verfügbar.</p>
                  </div>
                </div>

                {/* Zahlungsicons */}
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-xs text-gray-400 text-center mb-2">Akzeptierte Zahlungsarten</p>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {[
                      { label: 'VISA', color: 'bg-blue-600' },
                      { label: 'MC', color: 'bg-red-500' },
                      { label: 'PayPal', color: 'bg-blue-400' },
                      { label: 'SEPA', color: 'bg-gray-500' },
                    ].map(m => (
                      <span key={m.label} className={`text-xs ${m.color} text-white rounded-md px-2.5 py-1 font-bold`}>{m.label}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
