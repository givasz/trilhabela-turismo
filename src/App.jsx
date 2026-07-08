import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'
import LanguageSwitcher from './components/LanguageSwitcher.jsx'
import Home from './pages/Home.jsx'
import TourPage from './pages/TourPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/passeio/:slug" element={<TourPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <div className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] left-[calc(1.25rem+env(safe-area-inset-left))] z-[60]">
        <LanguageSwitcher variant="float" />
      </div>
      <WhatsAppFloat />
    </BrowserRouter>
  )
}
