import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { LoanProvider } from './context/LoanContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { SavedProvider } from './context/SavedContext.jsx'
import { ProProvider } from './context/ProContext.jsx'
import Navigation from './components/Navigation.jsx'
import Footer from './components/Footer.jsx'
import AiAdvisor from './components/AiAdvisor.jsx'
import UpgradeModal from './components/UpgradeModal.jsx'
import { AdsLoader } from './components/AdSlot.jsx'
import CalculatorPage from './pages/CalculatorPage.jsx'

// Secondary routes are code-split so the calculator loads first.
var SchedulePage = lazy(function() { return import('./pages/SchedulePage.jsx') })
var EarlyPage    = lazy(function() { return import('./pages/EarlyPage.jsx') })
var ComparePage  = lazy(function() { return import('./pages/ComparePage.jsx') })
var SavedPage    = lazy(function() { return import('./pages/SavedPage.jsx') })
var OffersPage   = lazy(function() { return import('./pages/OffersPage.jsx') })
var PricingPage  = lazy(function() { return import('./pages/PricingPage.jsx') })
var PrivacyPage  = lazy(function() { return import('./pages/PrivacyPage.jsx') })
var TermsPage    = lazy(function() { return import('./pages/TermsPage.jsx') })
var NotFoundPage = lazy(function() { return import('./pages/NotFoundPage.jsx') })

function getInitialTheme() {
  try { var s = localStorage.getItem('afc_theme'); if (s === 'dark' || s === 'light') return s } catch(e) {}
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  return 'light'
}

export default function App() {
  return (
    <LanguageProvider>
      <ProProvider>
        <SavedProvider>
          <LoanProvider>
            <BrowserRouter>
              <AppInner />
            </BrowserRouter>
          </LoanProvider>
        </SavedProvider>
      </ProProvider>
    </LanguageProvider>
  )
}

function ScrollToTop() {
  var path = useLocation().pathname
  React.useEffect(function() { window.scrollTo(0, 0) }, [path])
  return null
}

function PageFallback() {
  return (
    <main className="flex-1 pt-24 flex justify-center">
      <span className="material-symbols-outlined animate-spin text-blue-600">progress_activity</span>
    </main>
  )
}

function AppInner() {
  var themeArr = React.useState(getInitialTheme)
  var theme = themeArr[0]; var setTheme = themeArr[1]

  React.useEffect(function() {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  function toggleTheme() {
    setTheme(function(prev) {
      var next = prev === 'light' ? 'dark' : 'light'
      try { localStorage.setItem('afc_theme', next) } catch(e) {}
      return next
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-app transition-colors duration-300">
      <ScrollToTop />
      <AdsLoader />
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<CalculatorPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/early" element={<EarlyPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/pro" element={<PricingPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
      <AiAdvisor />
      <UpgradeModal />
    </div>
  )
}
