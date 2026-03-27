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

  return (
    <LoanProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-background dark:bg-slate-950 transition-colors duration-300">
          <Navigation language={language} setLanguage={setLanguage} />
          <Routes>
            <Route path="/" element={<CalculatorPage language={language} />} />
            <Route path="/schedule" element={<SchedulePage language={language} />} />
            <Route path="/early" element={<EarlyPage language={language} />} />
          </Routes>
          <Footer language={language} />
          <Link to="/schedule"
            className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform z-40">
            <span className="material-symbols-outlined">calendar_month</span>
          </Link>
        </div>
      </BrowserRouter>
    </LoanProvider>
  )
}
