import React, { createContext, useContext, useState, useMemo, useCallback } from 'react'

var LanguageContext = createContext({ language: 'EN', setLanguage: function(){} })

export function useLanguage() {
  return useContext(LanguageContext)
}

export function LanguageProvider(props) {
  var arr = useState('EN')
  var language = arr[0]
  var setLanguage = arr[1]

  var handleSetLanguage = useCallback(function(lang) {
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
