const SCHRITTE = [
  {
    nr: 1,
    titel: 'Reserviere deinen Abholtermin',
    icon: '📅',
    beschreibung: 'Wähle einen freien Zeitslot in deinem EDEKA-Markt.',
  },
  {
    nr: 2,
    titel: 'Such dir einen EDEKA-Markt in deiner Nähe aus',
    icon: '📍',
    beschreibung: 'Finde deinen nächsten EDEKA-Markt mit Abholservice.',
  },
  {
    nr: 3,
    titel: 'Pack in deinen Warenkorb, was du brauchst',
    icon: '📱',
    beschreibung: 'Stöbere im Sortiment und füge Produkte hinzu.',
  },
  {
    nr: 4,
    titel: 'Hol deinen Einkauf fertig gepackt ab',
    icon: '🛍️',
    beschreibung: 'Dein Einkauf liegt bereit – einfach abholen und bezahlen.',
  },
]

export default function SoFunktionierts() {
  return (
    <section id="so-funktionierts" className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-black text-text-dark text-center mb-10">So funktioniert's</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {SCHRITTE.map((schritt) => (
            <div key={schritt.nr} className="flex flex-col items-center text-center">
              {/* Nummer + Icon */}
              <div className="relative mb-4">
                <div className="w-16 h-16 rounded-full bg-brand-yellow flex items-center justify-center text-3xl shadow-md">
                  {schritt.icon}
                </div>
                <span className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-text-dark text-white text-xs font-black flex items-center justify-center">
                  {schritt.nr}
                </span>
              </div>
              <h3 className="font-bold text-text-dark text-sm mb-2 leading-snug">{schritt.titel}</h3>
              <p className="text-xs text-gray-500">{schritt.beschreibung}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
