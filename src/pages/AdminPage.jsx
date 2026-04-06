import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircleIcon, ClockIcon, ShoppingBagIcon, XCircleIcon, MagnifyingGlassIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { fetchBestellungenAdmin, bestellungStatusAktualisieren, fetchMaerkte } from '../services/api'
import { formatPreis } from '../utils/formatters'

const STATUS_CONFIG = {
  offen:      { label: 'Offen',      farbe: 'bg-yellow-100 text-yellow-800',  icon: ClockIcon },
  bezahlt:    { label: 'Bezahlt',    farbe: 'bg-blue-100 text-blue-800',      icon: CheckCircleIcon },
  bereit:     { label: 'Bereit',     farbe: 'bg-green-100 text-green-800',    icon: ShoppingBagIcon },
  abgeholt:   { label: 'Abgeholt',   farbe: 'bg-gray-100 text-gray-600',      icon: CheckCircleIcon },
  storniert:  { label: 'Storniert',  farbe: 'bg-red-100 text-red-700',        icon: XCircleIcon },
}

export default function AdminPage() {
  const [maerkte, setMaerkte] = useState([])
  const [gewaehltMarkt, setGewaehltMarkt] = useState(null)
  const [bestellungen, setBestellungen] = useState([])
  const [filterStatus, setFilterStatus] = useState(null)
  const [suche, setSuche] = useState('')
  const [loading, setLoading] = useState(false)
  const [pin, setPin] = useState('')
  const [authentifiziert, setAuthentifiziert] = useState(false)
  const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN || '1234'

  useEffect(() => {
    fetchMaerkte().then(data => {
      setMaerkte(data)
      if (data.length > 0) setGewaehltMarkt(data[0])
    })
  }, [])

  useEffect(() => {
    if (!gewaehltMarkt || !authentifiziert) return
    laden()
  }, [gewaehltMarkt, filterStatus, authentifiziert])

  const laden = async () => {
    setLoading(true)
    const data = await fetchBestellungenAdmin(gewaehltMarkt.id, filterStatus)
    setBestellungen(data)
    setLoading(false)
  }

  const statusAktualisieren = async (bestellId, neuerStatus) => {
    await bestellungStatusAktualisieren(bestellId, neuerStatus)
    setBestellungen(prev => prev.map(b =>
      b.id === bestellId ? { ...b, status: neuerStatus } : b
    ))
  }

  const gefilterteBestellungen = bestellungen.filter(b => {
    if (!suche) return true
    const s = suche.toLowerCase()
    return b.id?.toLowerCase().includes(s) ||
      b.kunde_name?.toLowerCase().includes(s) ||
      b.kunde_email?.toLowerCase().includes(s)
  })

  const stats = {
    offen: bestellungen.filter(b => b.status === 'offen').length,
    bezahlt: bestellungen.filter(b => b.status === 'bezahlt').length,
    bereit: bestellungen.filter(b => b.status === 'bereit').length,
    gesamt: bestellungen.reduce((s, b) => s + (b.gesamt_preis || 0), 0),
  }

  // PIN-Login
  if (!authentifiziert) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <ShoppingBagIcon className="w-7 h-7 text-brand-yellow" />
            </div>
            <h1 className="text-xl font-black text-text-dark">Admin-Bereich</h1>
            <p className="text-sm text-gray-500 mt-1">PIN eingeben</p>
          </div>
          <input
            type="password"
            value={pin}
            onChange={e => setPin(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && pin === ADMIN_PIN && setAuthentifiziert(true)}
            placeholder="PIN"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-center text-2xl tracking-widest font-bold focus:outline-none focus:border-gray-900 mb-3"
            maxLength={6}
          />
          {pin.length >= 4 && pin !== ADMIN_PIN && (
            <p className="text-xs text-brand-red text-center mb-3">Falscher PIN</p>
          )}
          <button
            onClick={() => pin === ADMIN_PIN && setAuthentifiziert(true)}
            disabled={pin.length < 4}
            className="w-full bg-brand-yellow hover:bg-brand-yellow-dark disabled:opacity-40 text-text-dark font-bold py-3 rounded-xl transition-all"
          >
            Einloggen
          </button>
          <p className="text-xs text-gray-400 text-center mt-4">
            Standard-PIN: 1234 · In .env.local ändern: VITE_ADMIN_PIN
          </p>
          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-gray-500 hover:text-brand-red">← Zurück zur Website</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingBagIcon className="w-6 h-6 text-brand-yellow" />
          <span className="font-bold">Admin-Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">Website →</Link>
          <button onClick={() => setAuthentifiziert(false)} className="text-sm text-gray-400 hover:text-white">Logout</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* Marktauswahl */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <span className="text-sm font-semibold text-gray-600">Markt:</span>
          {maerkte.map(m => (
            <button
              key={m.id}
              onClick={() => setGewaehltMarkt(m)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                gewaehltMarkt?.id === m.id
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-900'
              }`}
            >
              {m.name.replace('nah & gut ', '')}
            </button>
          ))}
          <button onClick={laden} className="ml-auto p-2 text-gray-400 hover:text-gray-900 transition-colors">
            <ArrowPathIcon className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Offen', wert: stats.offen, farbe: 'text-yellow-600', bg: 'bg-yellow-50' },
            { label: 'Bezahlt', wert: stats.bezahlt, farbe: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Bereit', wert: stats.bereit, farbe: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Umsatz', wert: formatPreis(stats.gesamt), farbe: 'text-gray-900', bg: 'bg-white' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-2xl p-4 border border-gray-100`}>
              <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              <p className={`text-2xl font-black mt-1 ${s.farbe}`}>{s.wert}</p>
            </div>
          ))}
        </div>

        {/* Filter + Suche */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={suche}
              onChange={e => setSuche(e.target.value)}
              placeholder="Name, E-Mail oder Bestellnummer..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {[null, 'offen', 'bezahlt', 'bereit', 'abgeholt'].map(s => (
              <button
                key={s || 'alle'}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  filterStatus === s
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-900'
                }`}
              >
                {s ? STATUS_CONFIG[s]?.label : 'Alle'}
              </button>
            ))}
          </div>
        </div>

        {/* Bestellungen */}
        <div className="space-y-3">
          {loading ? (
            <div className="bg-white rounded-2xl p-12 text-center text-gray-400">
              <ArrowPathIcon className="w-8 h-8 animate-spin mx-auto mb-3" />
              <p className="text-sm">Lade Bestellungen...</p>
            </div>
          ) : gefilterteBestellungen.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center text-gray-400">
              <ShoppingBagIcon className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-semibold">Keine Bestellungen</p>
              <p className="text-sm mt-1">Für diesen Filter gibt es keine Einträge.</p>
            </div>
          ) : (
            gefilterteBestellungen.map(b => {
              const cfg = STATUS_CONFIG[b.status] || STATUS_CONFIG.offen
              const StatusIcon = cfg.icon
              return (
                <div key={b.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="p-4 flex items-start gap-4">
                    {/* Status Icon */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.farbe}`}>
                      <StatusIcon className="w-5 h-5" />
                    </div>

                    {/* Infos */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-sm text-text-dark">{b.id}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${cfg.farbe}`}>
                          {cfg.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 font-semibold mt-0.5">{b.kunde_name}</p>
                      <p className="text-xs text-gray-400">{b.kunde_email}</p>
                      <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-500 flex-wrap">
                        <span>📅 {b.abhol_datum} – {b.abhol_uhrzeit}</span>
                        <span className="font-bold text-brand-red">{formatPreis(b.gesamt_preis)}</span>
                      </div>
                    </div>

                    {/* Aktionen */}
                    <div className="flex flex-col gap-1.5 flex-shrink-0">
                      {b.status === 'bezahlt' && (
                        <button
                          onClick={() => statusAktualisieren(b.id, 'bereit')}
                          className="text-xs bg-green-100 hover:bg-green-200 text-green-800 font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                        >
                          ✓ Bereit markieren
                        </button>
                      )}
                      {b.status === 'bereit' && (
                        <button
                          onClick={() => statusAktualisieren(b.id, 'abgeholt')}
                          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                        >
                          ✓ Abgeholt
                        </button>
                      )}
                      {(b.status === 'offen' || b.status === 'bezahlt') && (
                        <button
                          onClick={() => statusAktualisieren(b.id, 'storniert')}
                          className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                        >
                          Stornieren
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Artikel (aufklappbar) */}
                  {b.bestellpositionen?.length > 0 && (
                    <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
                      <p className="text-xs font-semibold text-gray-500 mb-2">
                        {b.bestellpositionen.length} Artikel
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {b.bestellpositionen.map((pos, i) => (
                          <span key={i} className="text-xs bg-white border border-gray-200 rounded-lg px-2 py-1 text-gray-700">
                            {pos.menge}× {pos.produkt_name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
