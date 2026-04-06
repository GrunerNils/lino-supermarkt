const BADGE_STILE = {
  Bio: 'bg-green-100 text-green-800 border border-green-300',
  Regional: 'bg-orange-100 text-orange-800 border border-orange-300',
  Angebot: 'bg-red-100 text-brand-red border border-red-300',
  Vegan: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
  Saisonal: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
  Neu: 'bg-blue-100 text-blue-800 border border-blue-300',
}

export default function Badge({ typ, className = '' }) {
  if (!typ || !BADGE_STILE[typ]) return null
  return (
    <span className={`inline-block text-xs font-semibold px-1.5 py-0.5 rounded ${BADGE_STILE[typ]} ${className}`}>
      {typ}
    </span>
  )
}
