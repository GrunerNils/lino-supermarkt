import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

export default function Breadcrumb({ pfade }) {
  // pfade: [{ label, href }, { label }]  – letztes ohne href (aktiv)
  return (
    <nav className="flex items-center gap-1 text-sm text-gray-500 mb-4">
      {pfade.map((pfad, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRightIcon className="w-3 h-3 text-gray-400" />}
          {pfad.href ? (
            <Link to={pfad.href} className="hover:text-brand-red hover:underline transition-colors">
              {pfad.label}
            </Link>
          ) : (
            <span className="text-gray-800 font-medium">{pfad.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
