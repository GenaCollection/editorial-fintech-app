import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { LoanProvider } from './context/LoanContext.jsx'
import { LanguageProvider, useLanguage } from './context/LanguageContext.jsx'
import { SavedProvider } from './context/SavedContext.jsx'
import { ProProvider } from './context/ProContext.jsx'
import Navigation from './components/Navigation.jsx'
import Footer from './components/Footer.jsx'
import AiAdvisor from './components/AiAdvisor.jsx'
import UpgradeModal from './components/UpgradeModal.jsx'
import { AdsLoader, AdRails } from './components/AdSlot.jsx'
import CalculatorPage from './pages/CalculatorPage.jsx'
import { URL_TO_LANG } from './config/site.js'
import { findLanding } from './seo/landings.js'
import { findRatePage } from './seo/rates.js'

// Code-split pages that can be preloaded before the first render, so a
// prerendered page is replaced by the same page instead of a spinner.
function lazyPage(factory) {
  var Loaded = null
  function load() { return factory().then(function(m) { Loaded = m.default; return m }) }
  var Lazy = lazy(load)
  function Page(props) { return Loaded ? React.createElement(Loaded, props) : React.createElement(Lazy, props) }
  Page.preload = load
  return Page
}

var SchedulePage = lazyPage(function() { return import('./pages/SchedulePage.jsx') })
var EarlyPage    = lazyPage(function() { return import('./pages/EarlyPage.jsx') })
var ComparePage  = lazyPage(function() { return import('./pages/ComparePage.jsx') })
var SavedPage    = lazyPage(function() { return import('./pages/SavedPage.jsx') })
var OffersPage   = lazyPage(function() { return import('./pages/OffersPage.jsx') })
var PricingPage  = lazyPage(function() { return import('./pages/PricingPage.jsx') })
var WidgetPage   = lazyPage(function() { return import('./pages/WidgetPage.jsx') })
var EmbedPage    = lazyPage(function() { return import('./pages/EmbedPage.jsx') })
var DepositPage  = lazyPage(function() { return import('./pages/DepositPage.jsx') })
var BanksPage    = lazyPage(function() { return import('./pages/BanksPage.jsx') })
var LandingPage  = lazyPage(function() { return import('./pages/LandingPage.jsx') })
var PrivacyPage  = lazyPage(function() { return import('./pages/PrivacyPage.jsx') })
var TermsPage    = lazyPage(function() { return import('./pages/TermsPage.jsx') })
var NotFoundPage = lazyPage(function() { return import('./pages/NotFoundPage.jsx') })

var PAGES = {
  '/schedule': SchedulePage, '/early': EarlyPage, '/compare': ComparePage,
  '/saved': SavedPage, '/offers': OffersPage, '/pro': PricingPage,
  '/widget': WidgetPage, '/deposit': DepositPage, '/banks': BanksPage, '/embed': EmbedPage, '/privacy': PrivacyPage, '/terms': TermsPage
}

function isLangHome(pathname) {
  var parts = pathname.split('/').filter(Boolean)
  return parts.length === 1 && !!URL_TO_LANG[parts[0]]
}

// Loads the code for the page at `pathname` (used before the first render).
export function preloadRoute(pathname) {
  var path = (pathname || '/').replace(/\/+$/, '') || '/'
  if (path === '/' || isLangHome(path)) return Promise.resolve()
  if (PAGES[path]) return PAGES[path].preload()
  if (findLanding(path) || findRatePage(path)) return LandingPage.preload()
  return NotFoundPage.preload()
}

export function preloadAll() {
  return Promise.all(Object.keys(PAGES).map(function(k) { return PAGES[k].preload() })
    .concat([LandingPage.preload(), NotFoundPage.preload()]))
}

function getInitialTheme() {
  try { var s = localStorage.getItem('afc_theme'); if (s === 'dark' || s === 'light') return s } catch(e) {}
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  return 'light'
}

export function AppProviders(props) {
  return (
    <LanguageProvider initialLanguage={props.initialLanguage}>
      <ProProvider>
        <SavedProvider>
          <LoanProvider>
            {props.children}
          </LoanProvider>
        </SavedProvider>
      </ProProvider>
    </LanguageProvider>
  )
}

export default function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <RootSwitch />
      </BrowserRouter>
    </AppProviders>
  )
}

// /embed renders the bare widget; everything else gets the full site chrome.
export function RootSwitch() {
  var path = useLocation().pathname
  if (path === '/embed' || path === '/embed/') {
    return <Suspense fallback={null}><EmbedPage /></Suspense>
  }
  return <AppInner />
}

function ScrollToTop() {
  var path = useLocation().pathname
  React.useEffect(function() { window.scrollTo(0, 0) }, [path])
  return null
}

// /hy, /ru, /en: the calculator in that language (own URL for search engines).
function LangHome() {
  var path = useLocation().pathname
  var lang = URL_TO_LANG[path.split('/').filter(Boolean)[0]]
  var langCtx = useLanguage()
  React.useEffect(function() {
    if (lang && langCtx.language !== lang) langCtx.setLanguage(lang)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])
  if (!lang) return <NotFoundPage />
  return <CalculatorPage />
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
      <AdRails />
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
          <Route path="/widget" element={<WidgetPage />} />
          <Route path="/deposit" element={<DepositPage />} />
          <Route path="/banks" element={<BanksPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/:lng" element={<LangHome />} />
          <Route path="/:lng/:slug" element={<LandingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
      <AiAdvisor />
      <UpgradeModal />
    </div>
  )
}
