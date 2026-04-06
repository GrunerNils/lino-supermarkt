import { useState, useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { PRODUKTE } from '../data/produkte'
import { KATEGORIEN } from '../data/kategorien'
import ProduktGrid from '../components/catalog/ProduktGrid'
import Breadcrumb from '../components/ui/Breadcrumb'

const FILTER_OPTIONEN = ['Bio', 'Regional', 'Angebot', 'Vegan']

export default function KategoriePage() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const sucheQ = searchParams.get('q') || ''

  // Filter kann auch über URL vorbelegt werden (z.B. ?filter=Bio vom Header)
  const filterAusUrl = searchParams.get('filter')
  const [aktiveFilter, setAktiveFilter] = useState(filterAusUrl ? [filterAusUrl] : [])
  const [aktiveSub, setAktiveSub] = useState(null)
  const [sortierung, setSortierung] = useState('relevanz')

  const kategorie = KATEGORIEN.find(k => k.slug === slug)

  const gefilterteProd = useMemo(() => {
    let liste = PRODUKTE

    // Suche (wenn über Header gesucht)
    if (sucheQ) {
      liste = liste.filter(p =>
        p.name.toLowerCase().includes(sucheQ.toLowerCase()) ||
        p.beschreibung.toLowerCase().includes(sucheQ.toLowerCase())
      )
    } else if (slug !== 'suche') {
      liste = liste.filter(p => p.kategorie === slug)
    }

    // Unterkategorie
    if (aktiveSub) {
      liste = liste.filter(p => p.unterkategorie === aktiveSub)
    }

    // Badges-Filter
    if (aktiveFilter.includes('Bio')) liste = liste.filter(p => p.badges?.includes('Bio'))
    if (aktiveFilter.includes('Regional')) liste = liste.filter(p => p.badges?.includes('Regional'))
    if (aktiveFilter.includes('Angebot')) liste = liste.filter(p => p.originalPreis !== null)
    if (aktiveFilter.includes('Vegan')) liste = liste.filter(p => p.badges?.includes('Vegan'))

    // Sortierung
    if (sortierung === 'preis-auf') liste = [...liste].sort((a, b) => a.preis - b.preis)
    if (sortierung === 'preis-ab') liste = [...liste].sort((a, b) => b.preis - a.preis)
    if (sortierung === 'name') liste = [...liste].sort((a, b) => a.name.localeCompare(b.name))

    return liste
  }, [slug, sucheQ, aktiveFilter, aktiveSub, sortierung])

  const toggleFilter = (f) => {
    setAktiveFilter(prev =>
      prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
    )
  }

  const titel = sucheQ ? `Suchergebnisse für "${sucheQ}"` : (kategorie?.label || 'Produkte')

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumb pfade={[
        { label: 'Shop Startseite', href: '/' },
        { label: titel },
      ]} />

      <h1 className="text-2xl font-black text-text-dark mb-4">{titel}</h1>

      {/* Unterkategorien */}
      {kategorie?.unterkategorien && !sucheQ && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          <button
            onClick={() => setAktiveSub(null)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-sm font-medium whitespace-nowrap flex-shrink-0 transition-colors ${
              !aktiveSub ? 'bg-text-dark text-white border-text-dark' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
            }`}
          >
            {kategorie.icon} Alle
          </button>
          {kategorie.unterkategorien.map(sub => (
            <button
              key={sub}
              onClick={() => setAktiveSub(aktiveSub === sub ? null : sub)}
              className={`px-4 py-1.5 rounded-full border text-sm font-medium whitespace-nowrap flex-shrink-0 transition-colors ${
                aktiveSub === sub ? 'bg-text-dark text-white border-text-dark' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Filterleiste */}
      <div className="flex flex-wrap items-center gap-2 mb-6 py-3 border-y border-gray-200">
        <span className="text-sm text-gray-500 font-medium mr-2">{gefilterteProd.length} Produkte</span>
        {FILTER_OPTIONEN.map(f => (
          <button
            key={f}
            onClick={() => toggleFilter(f)}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
              aktiveFilter.includes(f)
                ? 'bg-brand-red text-white border-brand-red'
                : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
            }`}
          >
            {f}
          </button>
        ))}

        {/* Sortierung */}
        <div className="ml-auto">
          <select
            value={sortierung}
            onChange={e => setSortierung(e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-brand-red"
          >
            <option value="relevanz">Relevanz</option>
            <option value="preis-auf">Preis aufsteigend</option>
            <option value="preis-ab">Preis absteigend</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
      </div>

      <ProduktGrid produkte={gefilterteProd} />
    </div>
  )
}
