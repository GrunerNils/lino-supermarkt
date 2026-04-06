import { Link } from 'react-router-dom'

export default function HeroBanner() {
  return (
    <div className="relative bg-gradient-to-r from-gray-800 to-gray-600 overflow-hidden" style={{ minHeight: '300px' }}>
      {/* Hintergrundbild */}
      <img
        src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&q=80"
        alt="Frische Lebensmittel"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      {/* Inhalt */}
      <div className="relative max-w-7xl mx-auto px-4 py-16 flex flex-col items-center text-center text-white">
        <h1 className="text-4xl md:text-5xl font-black mb-3 drop-shadow-lg">
          Abholservice
        </h1>
        <p className="text-lg md:text-xl mb-6 opacity-90 drop-shadow">
          Dein Einkauf wartet schon – gekühlt und fertig gepackt.
        </p>
        <Link
          to="#so-funktionierts"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('so-funktionierts')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="text-brand-yellow font-semibold hover:underline text-lg flex items-center gap-1"
        >
          So funktioniert's ↓
        </Link>
      </div>
    </div>
  )
}
