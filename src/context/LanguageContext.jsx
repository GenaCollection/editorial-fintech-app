import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react'
import { URL_TO_LANG } from '../config/site.js'

var LanguageContext = createContext({ language: 'EN', setLanguage: function(){} })

export function useLanguage() {
  return useContext(LanguageContext)
}

// Priority: explicit (prerender) → language prefix in the URL (/hy, /ru, /en)
// → saved preference → English.
function getInitialLang(initial) {
  if (initial) return initial
  if (typeof window !== 'undefined') {
    var seg = window.location.pathname.split('/')[1]
    if (URL_TO_LANG[seg]) return URL_TO_LANG[seg]
  }
  try { var s = localStorage.getItem('afc_lang'); if (s === 'AM' || s === 'RU' || s === 'EN') return s } catch(e) {}
  return 'EN'
}

export function LanguageProvider(props) {
  var arr = useState(function() { return getInitialLang(props.initialLanguage) })
  var language = arr[0]
  var setLanguage = arr[1]

  useEffect(function() {
    document.documentElement.lang = language === 'AM' ? 'hy' : language.toLowerCase()
  }, [language])

  var handleSetLanguage = useCallback(function(lang) {
    try { localStorage.setItem('afc_lang', lang) } catch(e) {}
    setLanguage(lang)
  }, [])

  var value = useMemo(function() {
    return { language: language, setLanguage: handleSetLanguage }
  }, [language, handleSetLanguage])

  return React.createElement(
    LanguageContext.Provider,
    { value: value },
    props.children
  )
}
