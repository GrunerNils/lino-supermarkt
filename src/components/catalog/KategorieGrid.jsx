import { Link } from 'react-router-dom'
import { KATEGORIEN } from '../../data/kategorien'

export default function KategorieGrid() {
  return (
    <section className="my-8">
      <h2 className="text-xl font-bold text-text-dark mb-4">Alle Produkte</h2>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-8 gap-2">
        {KATEGORIEN.map(kat => (
          <Link
            key={kat.slug}
            to={`/kategorie/${kat.slug}`}
            className="flex flex-col items-center group"
          >
            <div className="w-full rounded-lg overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-200" style={{ aspectRatio: '1/1' }}>
              <img
                src={kat.bild}
                alt={kat.label}
                className="w-full h-full object-cover object-bottom"
                loading="lazy"
              />
            </div>
            <span className="mt-1.5 text-xs font-semibold text-gray-700 leading-tight text-center line-clamp-2 group-hover:text-brand-red transition-colors px-1">
              {kat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
