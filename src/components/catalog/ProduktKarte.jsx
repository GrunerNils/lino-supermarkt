import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HeartIcon, PlusIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'
import { useCart } from '../../context/CartContext'
import MengenAuswahl from '../ui/MengenAuswahl'
import { useLagerbestand } from '../../hooks/useLagerbestand'

export default function ProduktKarte({ produkt }) {
  const { artikel, artikelHinzufuegen } = useCart()
  const { getBestand } = useLagerbestand()
  const [favorit, setFavorit] = useState(false)

  const imWarenkorb = artikel.find(a => a.produkt.id === produkt.id)
  const bestand = getBestand(produkt.id)
  const nichtVerfuegbar = !bestand.verfuegbar
  const wenigAufLager = bestand.verfuegbar && bestand.menge <= 5

  const hinzufuegen = (e) => {
    e.preventDefault()
    if (nichtVerfuegbar) return
    artikelHinzufuegen(produkt)
    toast.success(`${produkt.name} hinzugefügt`)
  }

  const rabatt = produkt.originalPreis
    ? Math.round((1 - produkt.preis / produkt.originalPreis) * 100)
    : null

  const preisGanz = Math.floor(produkt.preis)
  const preisDez = (produkt.preis % 1).toFixed(2).slice(1)

  return (
    <div className={`bg-white border hover:shadow-lg transition-shadow group relative flex flex-col ${nichtVerfuegbar ? 'opacity-60 border-gray-100' : 'border-gray-100'}`}>

      {/* Ausverkauft-Overlay */}
      {nichtVerfuegbar && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 rounded">
          <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            Nicht verfügbar
          </span>
        </div>
      )}

      {/* Rabatt-Badge */}
      {rabatt && !nichtVerfuegbar && (
        <div className="absolute top-7 left-2 z-10 bg-brand-red text-white font-black text-sm px-2 py-0.5 rounded">
          -{rabatt}%
        </div>
      )}

      {/* Wenig auf Lager Badge */}
      {wenigAufLager && !nichtVerfuegbar && (
        <div className="absolute top-2 left-2 z-10 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded">
          Nur noch {bestand.menge}
        </div>
      )}

      {/* Favoriten-Icon */}
      <button
        onClick={(e) => { e.preventDefault(); setFavorit(!favorit) }}
        className="absolute top-8 right-2 z-10 p-1"
        aria-label="Favorit"
      >
        {favorit
          ? <HeartSolid className="w-4 h-4 text-brand-red" />
          : <HeartIcon className="w-4 h-4 text-gray-300 hover:text-brand-red" />
        }
      </button>

      {/* Produktbild */}
      <Link to={`/produkt/${produkt.id}`} className="block bg-white pt-4 px-3 pb-2">
        <div className="h-32 flex items-center justify-center overflow-hidden">
          <img
            src={produkt.bild}
            alt={produkt.name}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Preis */}
      <div className="px-3 pb-1 flex items-end justify-end">
        {produkt.originalPreis && (
          <span className="text-xs text-gray-400 line-through mr-2 mb-1">{produkt.originalPreis.toFixed(2)}</span>
        )}
        <div className="flex items-start leading-none">
          <span className="text-3xl font-black text-brand-red leading-none">{preisGanz}</span>
          <span className="text-lg font-black text-brand-red leading-none mt-0.5">{preisDez}</span>
        </div>
      </div>

      {/* Produktinfos */}
      <div className="px-3 pb-3 flex-1 flex flex-col">
        <Link to={`/produkt/${produkt.id}`}>
          <h3 className="text-sm font-bold text-gray-900 leading-tight hover:text-brand-red transition-colors line-clamp-2 mb-0.5">
            {produkt.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-400 line-clamp-2 mb-1 leading-snug">{produkt.beschreibung}</p>

        <div className="flex items-center justify-between mt-auto pt-1 border-t border-gray-100">
          <div>
            {produkt.badges?.length > 0 && (
              <div className="flex gap-1 mb-1">
                {produkt.badges.slice(0, 2).map(b => (
                  <span key={b} className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">{b}</span>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-400">{produkt.grundpreis}</p>
          </div>

          {/* Warenkorb-Button */}
          {imWarenkorb ? (
            <MengenAuswahl produkt={produkt} menge={imWarenkorb.menge} kompakt />
          ) : (
            <button
              onClick={hinzufuegen}
              disabled={nichtVerfuegbar}
              className="relative flex items-center justify-center w-9 h-9 bg-brand-green hover:bg-brand-green-dark active:scale-95 text-white rounded-full shadow-md hover:shadow-lg transition-all flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="In den Warenkorb"
            >
              <ShoppingCartIcon className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                <PlusIcon className="w-2.5 h-2.5 text-brand-green" />
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
