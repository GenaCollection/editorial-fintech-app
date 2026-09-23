import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { preloadRoute } from './App.jsx'
import './index.css'

// Load the current page's code first: the prerendered HTML is then replaced
// by the same page right away instead of a loading spinner.
preloadRoute(window.location.pathname).catch(function() {}).then(function() {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
})

// PWA: installable + works offline (production only).
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').catch(function() {})
  })
}
