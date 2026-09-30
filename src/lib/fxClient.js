import { useState, useEffect } from 'react'
import { initialFx } from './fxSnapshot.js'

// CBA exchange rates in the browser: one /api/rates request per page load,
// shared by every component; starts from the prerender snapshot if any.
var cache = null
var pending = null

function load() {
  if (!pending) {
    pending = fetch('/api/rates')
      .then(function(r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json() })
      .then(function(j) { if (j && j.rates) cache = j; return cache })
      .catch(function() { pending = null; return cache })
  }
  return pending
}

export function useFxRates() {
  var arr = useState(function() { return cache || initialFx() })
  var fx = arr[0]; var setFx = arr[1]
  useEffect(function() {
    var alive = true
    load().then(function(d) { if (alive && d) setFx(d) })
    return function() { alive = false }
  }, [])
  return fx
}
