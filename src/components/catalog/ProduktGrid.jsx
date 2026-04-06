import ProduktKarte from './ProduktKarte'

export default function ProduktGrid({ produkte }) {
  if (!produkte || produkte.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <div className="text-5xl mb-4">🔍</div>
        <p className="text-lg font-medium">Keine Produkte gefunden</p>
        <p className="text-sm mt-1">Versuche einen anderen Filter oder Suchbegriff</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {produkte.map(p => (
        <ProduktKarte key={p.id} produkt={p} />
      ))}
    </div>
  )
}
