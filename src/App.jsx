import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Layout from './components/layout/Layout'
import PlzModal from './components/modal/PlzModal'

import AbholservicePage from './pages/AbholservicePage'
import KategoriePage from './pages/KategoriePage'
import ProduktDetailPage from './pages/ProduktDetailPage'
import WarenkorbPage from './pages/WarenkorbPage'
import AbholterminPage from './pages/AbholterminPage'
import ZahlungPage from './pages/ZahlungPage'
import BestellenPage from './pages/BestellenPage'
import BestellbestaetigungPage from './pages/BestellbestaetigungPage'

export default function App() {
  const [plz, setPlz] = useState(() => localStorage.getItem('edeka-plz') || null)
  const [markt, setMarkt] = useState(() => {
    try { return JSON.parse(localStorage.getItem('edeka-markt')) } catch { return null }
  })
  const [modalOffen, setModalOffen] = useState(false)

  // Modal beim ersten Besuch zeigen (kein Markt gewählt)
  useEffect(() => {
    if (!markt) setModalOffen(true)
  }, [])

  const handleMarktGewaehlt = (neuePlz, neuerMarkt) => {
    setPlz(neuePlz)
    setMarkt(neuerMarkt)
    setModalOffen(false)
  }

  const handleMarktAendern = () => {
    setModalOffen(true)
  }

  return (
    <BrowserRouter>
      <CartProvider>
        {/* PLZ-Modal */}
        {modalOffen && (
          <PlzModal onMarktGewaehlt={handleMarktGewaehlt} />
        )}

        <Routes>
          {/* Seiten mit normalem Layout */}
          <Route path="/" element={
            <Layout plz={plz} markt={markt} onMarktAendern={handleMarktAendern}>
              <AbholservicePage />
            </Layout>
          } />
          <Route path="/kategorie/:slug" element={
            <Layout plz={plz} markt={markt} onMarktAendern={handleMarktAendern}>
              <KategoriePage />
            </Layout>
          } />
          <Route path="/produkt/:id" element={
            <Layout plz={plz} markt={markt} onMarktAendern={handleMarktAendern}>
              <ProduktDetailPage />
            </Layout>
          } />

          {/* Checkout – eigenes Layout */}
          <Route path="/warenkorb" element={<WarenkorbPage />} />
          <Route path="/abholtermin" element={<AbholterminPage />} />
          <Route path="/zahlung" element={<ZahlungPage />} />
          <Route path="/bestellen" element={<BestellenPage />} />
          <Route path="/bestellbestaetigung/:id" element={<BestellbestaetigungPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
