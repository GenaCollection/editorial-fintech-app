import React, { createContext, useContext, useState } from 'react'

var LanguageContext = createContext('EN')

export function useLanguage() {
  return useContext(LanguageContext)
}

export function LanguageProvider(props) {
  var arr = useState('EN')
  var language = arr[0]
  var setLanguage = arr[1]
  return React.createElement(
    LanguageContext.Provider,
    { value: { language: language, setLanguage: setLanguage } },
    props.children
  )
}
