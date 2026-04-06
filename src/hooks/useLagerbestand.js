import { useState, useEffect } from 'react'
import { fetchLagerbestand } from '../services/api'
import { useCart } from '../context/CartContext'

export function useLagerbestand() {
  const { gewaehlterMarkt } = useCart()
  const [lagerbestand, setLagerbestand] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!gewaehlterMarkt) return
    setLoading(true)
    fetchLagerbestand(gewaehlterMarkt.id)
      .then(setLagerbestand)
      .finally(() => setLoading(false))
  }, [gewaehlterMarkt?.id])

  const getBestand = (produktId) => lagerbestand[produktId] || { verfuegbar: true, menge: 99 }

  return { lagerbestand, loading, getBestand }
}
