import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const FRAGEN = [
  {
    frage: 'Wie hoch sind die Servicekosten, wenn ich meinen Einkauf im Abholservice bestelle?',
    antwort: 'Der EDEKA Abholservice ist für dich kostenlos. Du zahlst nur für die Produkte, die du bestellt hast. Es gibt keine zusätzlichen Servicegebühren.',
  },
  {
    frage: 'Wie hole ich meinen Einkauf im Markt ab?',
    antwort: 'Begib dich zum gewählten Zeitpunkt zu deinem EDEKA-Markt. Zeige dort deine Bestellnummer vor (per E-Mail oder in der App) und das Team übergibt dir deinen fertig gepackten Einkauf.',
  },
  {
    frage: 'Wie kann ich meinen Einkauf bezahlen, wenn ich den Abholservice nutze?',
    antwort: 'Du kannst per Kreditkarte, PayPal, Lastschrift oder bar bei Abholung bezahlen. Die Zahlung erfolgt bequem online beim Bestellabschluss.',
  },
  {
    frage: 'Gibt es einen Mindestbestellwert?',
    antwort: 'Es gibt keinen Mindestbestellwert für den EDEKA Abholservice. Du kannst auch einzelne Produkte bestellen und abholen.',
  },
]

export default function FaqAccordion() {
  const [offen, setOffen] = useState(null)

  return (
    <section id="faq" className="bg-white py-10">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-xl font-bold text-text-dark mb-6">Fragen zum Abholservice</h2>
        <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
          {FRAGEN.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOffen(offen === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-sm text-text-dark pr-4">{item.frage}</span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${offen === i ? 'rotate-180' : ''}`}
                />
              </button>
              {offen === i && (
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                  {item.antwort}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
