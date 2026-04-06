import { Link } from 'react-router-dom'
import { CheckIcon } from '@heroicons/react/24/solid'

const SCHRITTE = [
  { nr: 1, label: 'Warenkorb', href: '/warenkorb' },
  { nr: 2, label: 'Abholtermin', href: '/abholtermin' },
  { nr: 3, label: 'Zahlung', href: '/zahlung' },
  { nr: 4, label: 'Bestellen', href: '/bestellen' },
]

export default function CheckoutStepper({ aktiv }) {
  return (
    <div className="bg-white border-b border-gray-100 py-5 mb-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-center gap-0">
          {SCHRITTE.map((schritt, i) => {
            const istAbgeschlossen = schritt.nr < aktiv
            const istAktiv = schritt.nr === aktiv
            return (
              <div key={schritt.nr} className="flex items-center">
                <div className="flex flex-col items-center">
                  {istAbgeschlossen ? (
                    <Link to={schritt.href} className="w-9 h-9 rounded-full bg-brand-green text-white flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                      <CheckIcon className="w-4 h-4" />
                    </Link>
                  ) : (
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      istAktiv
                        ? 'bg-brand-red text-white shadow-md ring-4 ring-red-100'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {schritt.nr}
                    </div>
                  )}
                  <span className={`text-xs mt-1.5 font-semibold hidden sm:block whitespace-nowrap ${
                    istAktiv ? 'text-brand-red' : istAbgeschlossen ? 'text-brand-green' : 'text-gray-400'
                  }`}>
                    {schritt.label}
                  </span>
                </div>
                {i < SCHRITTE.length - 1 && (
                  <div className={`w-16 sm:w-24 h-0.5 mx-2 mb-4 rounded-full transition-colors ${
                    schritt.nr < aktiv ? 'bg-brand-green' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
