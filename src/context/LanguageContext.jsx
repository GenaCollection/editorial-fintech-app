import React, { createContext, useContext, useState, useMemo, useCallback } from 'react'

var LanguageContext = createContext({ language: 'EN', setLanguage: function(){} })

export function useLanguage() {
  return useContext(LanguageContext)
}

function getInitialLang() {
  try { var s = localStorage.getItem('afc_lang'); if (s === 'AM' || s === 'RU' || s === 'EN') return s } catch(e) {}
  return 'EN'
}

export function LanguageProvider(props) {
  var arr = useState(getInitialLang)
  var language = arr[0]
  var setLanguage = arr[1]

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
