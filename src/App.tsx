import { AnimatePresence, MotionConfig } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Customizer from './components/Customizer'
import Home from './pages/Home'
import CasePage from './pages/CasePage'
import NotFound from './pages/NotFound'

function ScrollManager() {
  const { pathname, state } = useLocation()
  const section = (state as { section?: string } | null)?.section
  useEffect(() => {
    if (section) {
      // wait for the page transition to mount the section
      const t = window.setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 420)
      return () => window.clearTimeout(t)
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, section])
  return null
}

export default function App() {
  const location = useLocation()
  return (
    <MotionConfig reducedMotion="user">
      <div className="grain relative min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-brass focus:px-4 focus:py-2 focus:text-brass-ink"
        >
          Skip to content
        </a>
        <ScrollManager />
        <Nav />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/work/:slug" element={<CasePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
        <Footer />
        {import.meta.env.VITE_HASH_ROUTER === '1' && <Customizer />}
      </div>
    </MotionConfig>
  )
}
