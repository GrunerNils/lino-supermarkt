import { useState } from 'react'

export function useLocalStorage(schluessel, anfangsWert) {
  const [gespeicherterWert, setGespeicherterWert] = useState(() => {
    try {
      const item = window.localStorage.getItem(schluessel)
      return item ? JSON.parse(item) : anfangsWert
    } catch {
      return anfangsWert
    }
  })

  const setValue = (wert) => {
    try {
      const zuSpeichern = wert instanceof Function ? wert(gespeicherterWert) : wert
      setGespeicherterWert(zuSpeichern)
      window.localStorage.setItem(schluessel, JSON.stringify(zuSpeichern))
    } catch (error) {
      console.error('localStorage Fehler:', error)
    }
  }

  return [gespeicherterWert, setValue]
}
