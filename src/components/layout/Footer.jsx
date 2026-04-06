import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Über EDEKA */}
          <div>
            <img src="/logo.webp" alt="EDEKA" className="h-10 w-auto mb-3" />
            <p className="text-sm text-gray-400 mt-2">
              EDEKA – Wir lieben Lebensmittel.<br />
              Ihr Abholservice für frische Produkte direkt aus dem Markt.
            </p>
          </div>

          {/* Service */}
          <div>
            <h3 className="text-white font-semibold mb-3">Abholservice</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">So funktioniert's</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Märkte in der Nähe</Link></li>
              <li><Link to="/warenkorb" className="hover:text-white transition-colors">Mein Warenkorb</Link></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Häufige Fragen</a></li>
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h3 className="text-white font-semibold mb-3">Rechtliches</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Impressum</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Datenschutz</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AGB</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kontakt</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© 2026 EDEKA ZENTRALE Stiftung & Co. KG – Demonstrationszwecke</p>
          <p>Alle Preise inkl. MwSt. | Preisänderungen vorbehalten</p>
        </div>
      </div>
    </footer>
  )
}
