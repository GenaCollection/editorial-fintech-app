import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { LoanProvider } from './context/LoanContext'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import CalculatorPage from './pages/CalculatorPage'
import SchedulePage from './pages/SchedulePage'
import EarlyPage from './pages/EarlyPage'

export default function App() {
  const [language, setLanguage] = useState('EN')
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light'
      document.documentElement.className = next
      return next
    })
  }

  return (
    <LoanProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
          <Navigation
            language={language}
            setLanguage={setLanguage}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          <Routes>
            <Route path="/" element={<CalculatorPage language={language} />} />
            <Route path="/schedule" element={<SchedulePage language={language} />} />
            <Route path="/early" element={<EarlyPage language={language} />} />
          </Routes>
          <Footer language={language} />
          <Link
            to="/schedule"
            className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform z-40"
          >
            <span className="material-symbols-outlined">calendar_month</span>
          </Link>
        </div>
      </BrowserRouter>
    </LoanProvider>
  )
}
