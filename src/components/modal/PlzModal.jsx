import { useState, useRef, useEffect } from 'react'
import { MapPinIcon, ClockIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { fetchMaerkteByPlz } from '../../services/api'
import { plzZuKoordinaten, maerkteNachEntfernungSortieren } from '../../utils/entfernung'

export default function PlzModal({ onMarktGewaehlt }) {
  const [schritt, setSchritt] = useState('plz') // 'plz' | 'markt'
  const [ziffern, setZiffern] = useState(['', '', '', '', ''])
  const [fehler, setFehler] = useState('')
  const inputRefs = useRef([])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const plz = ziffern.join('')
  const plzVollstaendig = plz.length === 5

  const handleZiffer = (i, wert) => {
    // Nur Ziffern erlauben
    const ziffer = wert.replace(/\D/g, '').slice(-1)
    const neu = [...ziffern]
    neu[i] = ziffer
    setZiffern(neu)
    setFehler('')
    // Automatisch zum nächsten Feld
    if (ziffer && i < 4) {
      inputRefs.current[i + 1]?.focus()
    }
  }

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !ziffern[i] && i > 0) {
      inputRefs.current[i - 1]?.focus()
    }
    if (e.key === 'Enter' && plzVollstaendig) suchen()
  }

  const handlePaste = (e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 5)
    if (text.length === 5) {
      setZiffern(text.split(''))
      inputRefs.current[4]?.focus()
    }
    e.preventDefault()
  }

  const [maerkte, setMaerkte] = useState([])
  const [ladeMarkte, setLadeMarkte] = useState(false)

  const suchen = async () => {
    if (!plzVollstaendig) { setFehler('Bitte gib eine vollständige Postleitzahl ein.'); return }
    setLadeMarkte(true)
    try {
      const alleMaerkte = await fetchMaerkteByPlz(plz)
      // Koordinaten der PLZ ermitteln und Märkte sortieren
      const koordinaten = await plzZuKoordinaten(plz)
      if (koordinaten) {
        const sortiert = maerkteNachEntfernungSortieren(alleMaerkte, koordinaten.lat, koordinaten.lon)
        setMaerkte(sortiert)
      } else {
        setMaerkte(alleMaerkte)
      }
    } catch (e) {
      console.error(e)
      setMaerkte([])
    } finally {
      setLadeMarkte(false)
      setSchritt('markt')
    }
  }

  const marktWaehlen = (markt) => {
    onMarktGewaehlt(plz, markt)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">

        {/* Schritt 1: PLZ eingeben */}
        {schritt === 'plz' && (
          <>
            {/* Header */}
            <div className="bg-gray-900 px-5 py-4 flex items-center justify-between">
              <span className="text-white font-bold text-sm">Deine Postleitzahl</span>
              <img src="/logo.webp" alt="EDEKA" className="h-7 w-auto" />
            </div>

            {/* Login-Hinweis */}
            <div className="flex items-center justify-between px-5 py-2.5 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>👤</span>
                <span>Du hast ein EDEKA Konto?</span>
              </div>
              <button className="text-sm font-semibold text-brand-red hover:underline">Anmelden</button>
            </div>

            {/* Inhalt */}
            <div className="px-5 py-6">
              <h2 className="text-xl font-black text-gray-900 mb-2">Gib deine Postleitzahl ein</h2>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                So findest du heraus, ob wir den Abhol- und Lieferservice schon bei dir anbieten.
              </p>

              {/* PLZ Eingabe – 5 einzelne Boxen */}
              <div className="flex gap-2 justify-center mb-2" onPaste={handlePaste}>
                {ziffern.map((z, i) => (
                  <input
                    key={i}
                    ref={el => inputRefs.current[i] = el}
                    type="text"
                    inputMode="numeric"
                    value={z}
                    onChange={e => handleZiffer(i, e.target.value)}
                    onKeyDown={e => handleKeyDown(i, e)}
                    maxLength={1}
                    className={`w-12 h-14 text-center text-2xl font-bold border-2 rounded-lg outline-none transition-colors
                      ${z ? 'border-gray-900 bg-gray-50 text-gray-900' : 'border-gray-200 bg-white text-gray-400'}
                      focus:border-gray-900`}
                    placeholder="·"
                  />
                ))}
              </div>

              {fehler && <p className="text-xs text-brand-red text-center mb-3">{fehler}</p>}

              {/* Button */}
              <button
                onClick={suchen}
                disabled={!plzVollstaendig || ladeMarkte}
                className={`w-full py-3.5 rounded-xl font-bold text-sm mt-4 transition-colors ${
                  plzVollstaendig
                    ? 'bg-brand-yellow hover:bg-brand-yellow-dark text-gray-900 cursor-pointer'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {ladeMarkte ? '🔍 Suche Märkte...' : 'Abhol- und Lieferservice finden'}
              </button>

              {/* Marktangebote Link */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🛒</span>
                <div>
                  <p className="text-xs text-gray-500">Möchtest du lieber im Markt einkaufen?</p>
                  <button className="text-xs font-semibold text-gray-800 hover:text-brand-red flex items-center gap-1 mt-0.5">
                    → Zu den Marktangeboten
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Schritt 2: Markt wählen */}
        {schritt === 'markt' && (
          <>
            {/* Header */}
            <div className="bg-gray-900 px-5 py-4 flex items-center gap-3">
              <button onClick={() => setSchritt('plz')} className="text-white hover:text-gray-300">
                <ArrowLeftIcon className="w-5 h-5" />
              </button>
              <span className="text-white font-bold text-sm flex-1">Abholmöglichkeit wählen</span>
              <img src="/logo.webp" alt="EDEKA" className="h-7 w-auto" />
            </div>

            <div className="px-5 py-4">
              <h2 className="text-lg font-black text-gray-900 mb-1">Wo willst du deinen Einkauf abholen?</h2>
              <p className="text-xs text-gray-500 mb-4">EDEKA-Märkte in der Nähe von {plz}</p>
            </div>

            {/* Markt-Liste */}
            <div className="max-h-96 overflow-y-auto divide-y divide-gray-100">
              {maerkte.map((markt) => (
                <div key={markt.id} className="px-5 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-2 mb-2">
                    <MapPinIcon className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-bold text-sm text-gray-900">{markt.name}</p>
                      <p className="text-xs text-gray-500">{markt.adresse}, {markt.plz} {markt.stadt}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <ClockIcon className="w-3 h-3 text-brand-green" />
                        <span className="text-xs text-brand-green font-medium">{markt.oeffnungszeiten}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">{markt.entfernung}</span>
                  </div>
                  <button
                    onClick={() => marktWaehlen(markt)}
                    className="w-full py-2 border-2 border-gray-900 text-gray-900 font-bold text-sm rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
                  >
                    Abholmarkt wählen
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
