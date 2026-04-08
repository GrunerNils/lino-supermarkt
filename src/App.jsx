import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider, useCart } from './context/CartContext'
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
import AdminPage from './pages/AdminPage'

// Innere Komponente — hat Zugriff auf CartContext
function AppInner() {
  const { marktWaehlen } = useCart()
  const [plz, setPlz] = useState(null)
  const [markt, setMarkt] = useState(null)
  const [modalOffen, setModalOffen] = useState(true)

  // Alte localStorage-Einträge aus früheren Versionen bereinigen
  useEffect(() => {
    localStorage.removeItem('edeka-plz')
    localStorage.removeItem('edeka-markt')
    localStorage.removeItem('edeka-warenkorb')
  }, [])

  const handleMarktGewaehlt = (neuePlz, neuerMarkt) => {
    setPlz(neuePlz)
    setMarkt(neuerMarkt)
    marktWaehlen(neuerMarkt) // Markt auch in CartContext speichern
    setModalOffen(false)
  }

  const handleMarktAendern = () => {
    setModalOffen(true)
  }

  return (
    <>
      {modalOffen && (
        <PlzModal onMarktGewaehlt={handleMarktGewaehlt} />
      )}

      <Routes>
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

        <Route path="/warenkorb" element={<WarenkorbPage />} />
        <Route path="/abholtermin" element={<AbholterminPage />} />
        <Route path="/zahlung" element={<ZahlungPage />} />
        <Route path="/bestellen" element={<BestellenPage />} />
        <Route path="/bestellbestaetigung/:id" element={<BestellbestaetigungPage />} />

        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppInner />
      </CartProvider>
    </BrowserRouter>
  )
}
