import { useParams, useNavigate, Link } from 'react-router-dom'
import { PlusIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { PRODUKTE } from '../data/produkte'
import { useCart } from '../context/CartContext'
import { formatPreis } from '../utils/formatters'
import Badge from '../components/ui/Badge'
import MengenAuswahl from '../components/ui/MengenAuswahl'
import Breadcrumb from '../components/ui/Breadcrumb'
import ProduktGrid from '../components/catalog/ProduktGrid'
import { KATEGORIEN } from '../data/kategorien'

export default function ProduktDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { artikel, artikelHinzufuegen } = useCart()

  const produkt = PRODUKTE.find(p => p.id === Number(id))
  if (!produkt) { navigate('/'); return null }

  const imWarenkorb = artikel.find(a => a.produkt.id === produkt.id)
  const kategorie = KATEGORIEN.find(k => k.slug === produkt.kategorie)
  const aehnliche = PRODUKTE.filter(p => p.kategorie === produkt.kategorie && p.id !== produkt.id).slice(0, 5)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumb pfade={[
        { label: 'Shop Startseite', href: '/' },
        { label: kategorie?.label || produkt.kategorie, href: `/kategorie/${produkt.kategorie}` },
        { label: produkt.name },
      ]} />

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Bild */}
        <div className="bg-white rounded-xl p-6 flex items-center justify-center border border-gray-200">
          <img src={produkt.bild} alt={produkt.name} className="max-h-80 object-contain" />
        </div>

        {/* Details */}
        <div>
          <div className="flex gap-2 mb-2 flex-wrap">
            {produkt.badges?.map(b => <Badge key={b} typ={b} />)}
            {produkt.originalPreis && <Badge typ="Angebot" />}
          </div>

          <h1 className="text-2xl font-black text-text-dark mb-1">{produkt.name}</h1>
          <p className="text-gray-500 text-sm mb-4">{produkt.gewicht}</p>

          {/* Preis */}
          <div className="mb-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-text-dark">{formatPreis(produkt.preis)}</span>
              {produkt.originalPreis && (
                <span className="text-lg text-gray-400 line-through">{formatPreis(produkt.originalPreis)}</span>
              )}
            </div>
            <p className="text-sm text-gray-500">{produkt.grundpreis}</p>
          </div>

          {/* Warenkorb */}
          {imWarenkorb ? (
            <div className="flex items-center gap-4 mb-4">
              <MengenAuswahl produkt={produkt} menge={imWarenkorb.menge} />
              <span className="text-sm text-gray-600">im Warenkorb</span>
            </div>
          ) : (
            <button
              onClick={() => { artikelHinzufuegen(produkt); toast.success(`${produkt.name} hinzugefügt`) }}
              className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3 px-6 rounded-lg mb-4 transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              In den Warenkorb
            </button>
          )}

          <Link to="/warenkorb" className="block w-full text-center bg-brand-yellow hover:bg-brand-yellow-dark text-text-dark font-bold py-3 px-6 rounded-lg mb-6 transition-colors">
            Zur Kasse →
          </Link>

          {/* Beschreibung */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-semibold text-sm mb-2">Produktbeschreibung</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{produkt.beschreibung}</p>
          </div>
        </div>
      </div>

      {/* Ähnliche Produkte */}
      {aehnliche.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-text-dark mb-4">Ähnliche Produkte</h2>
          <ProduktGrid produkte={aehnliche} />
        </div>
      )}
    </div>
  )
}
