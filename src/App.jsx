import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { LoanProvider } from './context/LoanContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import Navigation from './components/Navigation.jsx'
import Footer from './components/Footer.jsx'
import CalculatorPage from './pages/CalculatorPage.jsx'
import SchedulePage from './pages/SchedulePage.jsx'
import EarlyPage from './pages/EarlyPage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import TermsPage from './pages/TermsPage.jsx'

export default function App() {
  return (
    <LanguageProvider>
      <LoanProvider>
        <BrowserRouter>
          <AppInner />
        </BrowserRouter>
      </LoanProvider>
    </LanguageProvider>
  )
}

function AppInner() {
  var themeArr = React.useState('light')
  var theme = themeArr[0]
  var setTheme = themeArr[1]

  function toggleTheme() {
    setTheme(function(prev) {
      var next = prev === 'light' ? 'dark' : 'light'
      document.documentElement.classList.toggle('dark', next === 'dark')
      return next
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<CalculatorPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/early" element={<EarlyPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
      <Footer />
      <Link
        to="/schedule"
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center z-40"
      >
        <span className="material-symbols-outlined">calendar_month</span>
      </Link>
    </div>
  )
}
