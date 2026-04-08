import { Toaster } from 'react-hot-toast'
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children, plz, markt, onMarktAendern }) {
  return (
    <div className="min-h-screen bg-bg-page flex flex-col">
      <Header plz={plz} markt={markt} onMarktAendern={onMarktAendern} />
      <main className="flex-1 pt-[104px]">
        {children}
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2500,
          style: { fontSize: '14px', maxWidth: '320px' },
          success: { iconTheme: { primary: '#4CAF50', secondary: '#fff' } },
        }}
      />
    </div>
  )
}
