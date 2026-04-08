import { useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { ShoppingCartIcon, MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { useCart } from '../../context/CartContext'
import { PRODUKTE } from '../../data/produkte'

export default function Header({ plz, markt, onMarktAendern }) {
  const { gesamtArtikel } = useCart()
  const [suche, setSuche] = useState('')
  const [sucheAktiv, setSucheAktiv] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const suchergebnisse = suche.length >= 2
    ? PRODUKTE.filter(p => p.name.toLowerCase().includes(suche.toLowerCase())).slice(0, 5)
    : []

  const handleSuche = (e) => {
    e.preventDefault()
    if (suche.trim()) {
      navigate(`/kategorie/suche?q=${encodeURIComponent(suche.trim())}`)
      setSuche('')
      setSucheAktiv(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 shadow-lg">
      {/* ── Obere Leiste: Stein-Textur mit dunklem Overlay ── */}
      <div
        className="relative"
        style={{ backgroundImage: 'url(/oben1.avif)', backgroundSize: 'cover', backgroundPosition: 'center 30%' }}
      >
        {/* Dunkles Overlay für Lesbarkeit */}
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src="/logo.webp" alt="EDEKA" className="h-10 w-auto" />
          </Link>

          {/* Haupt-Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: 'Markt & Angebote', to: '/kategorie/suesses-salziges' },
              { label: 'Abholservice',     to: '/', end: true },
              { label: 'Ernährung',        to: '/kategorie/obst-gemuese' },
            ].map(item => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-bold rounded transition-colors ${
                    isActive
                      ? 'bg-brand-yellow text-gray-900'
                      : 'text-gray-200 hover:text-white hover:bg-white/15'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Rechte Seite */}
          <div className="flex items-center gap-3">
            {/* Gewählter Markt */}
            {markt ? (
              <button
                onClick={onMarktAendern}
                className="hidden lg:flex items-center gap-1.5 hover:opacity-80 transition-opacity"
              >
                <MapPinIcon className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                <div className="text-left">
                  <div className="font-semibold text-white text-xs leading-tight">{markt.name}</div>
                  <div className="text-gray-400 text-xs">{markt.plz} · wechseln</div>
                </div>
              </button>
            ) : (
              <button
                onClick={onMarktAendern}
                className="hidden lg:flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"
              >
                <MapPinIcon className="w-4 h-4 text-brand-yellow" />
                <span className="text-xs font-medium">Markt wählen</span>
              </button>
            )}

            {/* Warenkorb */}
            <Link
              to="/warenkorb"
              className="relative flex items-center gap-1.5 bg-brand-yellow hover:bg-brand-yellow-dark text-gray-900 px-3 py-2 rounded font-bold text-sm transition-colors"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              {gesamtArtikel > 0 && (
                <>
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-red text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {gesamtArtikel > 99 ? '99+' : gesamtArtikel}
                  </span>
                  <span className="hidden sm:inline">{gesamtArtikel}</span>
                </>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* ── Untere Leiste: Suche + Sub-Nav ── */}
      <div
        className="relative border-b border-black/50"
        style={{ backgroundImage: 'url(/oben1.avif)', backgroundSize: 'cover', backgroundPosition: 'center 60%' }}
      >
        {/* Etwas dunkleres Overlay für untere Leiste */}
        <div className="absolute inset-0 bg-black/75" />

        <div className="relative max-w-7xl mx-auto px-4 py-2 flex items-center gap-4">
          {/* Suche */}
          <form onSubmit={handleSuche} className="relative flex-1 max-w-xl">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={suche}
                onChange={e => setSuche(e.target.value)}
                onFocus={() => setSucheAktiv(true)}
                onBlur={() => setTimeout(() => setSucheAktiv(false), 200)}
                placeholder="Suche nach Produkten..."
                className="w-full pl-9 pr-4 py-1.5 bg-white/10 border border-white/20 rounded text-sm text-white placeholder-gray-400 focus:outline-none focus:border-brand-yellow focus:bg-white/15"
              />
            </div>
            {sucheAktiv && suchergebnisse.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b shadow-lg z-50 mt-0.5">
                {suchergebnisse.map(p => (
                  <Link
                    key={p.id}
                    to={`/produkt/${p.id}`}
                    onClick={() => { setSuche(''); setSucheAktiv(false) }}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 text-sm"
                  >
                    <img src={p.bild} alt={p.name} className="w-8 h-8 object-cover rounded" />
                    <div>
                      <div className="font-medium text-text-dark">{p.name}</div>
                      <div className="text-gray-500 text-xs">{p.gewicht}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </form>

          {/* Sub-Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: 'Sortiment', to: '/',                                          end: true },
              { label: 'Bio',       to: '/kategorie/obst-gemuese?filter=Bio',         match: '/kategorie/obst-gemuese' },
              { label: 'Regional',  to: '/kategorie/obst-gemuese?filter=Regional',    match: '/kategorie/obst-gemuese' },
              { label: 'Angebote',  to: '/kategorie/suesses-salziges?filter=Angebot', match: '/kategorie/suesses-salziges', gelb: true },
              { label: 'Neu',       to: '/kategorie/kuchen-gebaeck',                  match: '/kategorie/kuchen-gebaeck' },
            ].map(item => {
              const istAktiv = item.end
                ? location.pathname === '/'
                : location.pathname === (item.match || item.to.split('?')[0])
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors border-b-2 ${
                    istAktiv
                      ? 'text-white border-brand-yellow'
                      : item.gelb
                        ? 'text-brand-yellow border-transparent hover:bg-white/10'
                        : 'text-gray-300 border-transparent hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
