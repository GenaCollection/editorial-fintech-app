import React, { createContext, useContext, useState, useCallback } from 'react'

var SavedContext = createContext({ saves: [], saveCalc: function(){}, loadCalc: function(){}, deleteSave: function(){} })

export function useSaved() { return useContext(SavedContext) }

var LS_KEY = 'afc_saved_calcs'

function readLS() {
  try {
    var raw = localStorage.getItem(LS_KEY)
    if (raw) return JSON.parse(raw)
  } catch(e) {}
  return []
}

function writeLS(arr) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(arr)) } catch(e) {}
}

export function SavedProvider(props) {
  var arr = useState(readLS)
  var saves = arr[0]
  var setSaves = arr[1]

  var saveCalc = useCallback(function(loanState, extraPayments, meta) {
    setSaves(function(prev) {
      var entry = {
        id: Date.now(),
        name: meta.name || ('Calc #' + (prev.length + 1)),
        savedAt: new Date().toISOString(),
        loanState: loanState,
        extraPayments: extraPayments,
        monthlyPayment: meta.monthlyPayment,
        totalInterest: meta.totalInterest,
        apr: meta.apr
      }
      var next = [entry].concat(prev).slice(0, 20)
      writeLS(next)
      return next
    })
  }, [])

  var deleteSave = useCallback(function(id) {
    setSaves(function(prev) {
      var next = prev.filter(function(s) { return s.id !== id })
      writeLS(next)
      return next
    })
  }, [])

  var clearAll = useCallback(function() {
    setSaves([])
    writeLS([])
  }, [])

  return React.createElement(
    SavedContext.Provider,
    { value: { saves: saves, saveCalc: saveCalc, deleteSave: deleteSave, clearAll: clearAll } },
    props.children
  )
}
