import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EMPFEHLUNGS_PILLS } from '../../data/kategorien'

export default function EmpfehlungsPills() {
  const [aktiv, setAktiv] = useState(0)
  const navigate = useNavigate()

  const handleKlick = (pill, i) => {
    setAktiv(i)
    if (pill.to) navigate(pill.to)
  }

  return (
    <section className="my-6">
      <h2 className="text-xl font-bold text-text-dark mb-3">Unsere Empfehlungen</h2>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {EMPFEHLUNGS_PILLS.map((pill, i) => (
          <button
            key={i}
            onClick={() => handleKlick(pill, i)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
              aktiv === i
                ? 'bg-text-dark text-white border-text-dark'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
            }`}
          >
            <span>{pill.icon}</span>
            <span>{pill.label}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
