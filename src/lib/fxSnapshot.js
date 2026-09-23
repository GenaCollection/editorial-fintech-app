// Exchange rates known before the page loads: fetched at build time by the
// prerender (so the static HTML has real numbers for search engines) and
// passed to the browser as window.__FX__ for a matching first render.
var snapshot = null

export function setFxSnapshot(data) { snapshot = data || null }

export function initialFx() {
  if (typeof window !== 'undefined') return window.__FX__ || null
  return snapshot
}
