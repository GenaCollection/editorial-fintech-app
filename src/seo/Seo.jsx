import { createContext, useContext, useEffect } from 'react'
import { SITE_URL } from '../config/site.js'

// Per-page <head> management without extra dependencies.
//   • Server (prerender): useSeo() writes the page meta into SeoContext during
//     render, and renderSeoTags() turns it into HTML for the static file.
//   • Browser: useSeo() applies the same meta to document.head on navigation.
//
// meta = { title, description, path, lang, noindex?, alternates?: [{hreflang, path}], jsonLd? }

export var SeoContext = createContext(null)

export function absUrl(path) {
  return SITE_URL + (!path || path === '/' ? '/' : path)
}

export function useSeo(meta) {
  var collector = useContext(SeoContext)
  if (collector && meta) Object.assign(collector, meta)
  var key = meta ? JSON.stringify(meta) : ''
  useEffect(function() {
    if (meta) applySeo(meta)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
}

function esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

var OG_LOCALE = { hy: 'hy_AM', ru: 'ru_RU', en: 'en_US' }

export function renderSeoTags(m) {
  var url = absUrl(m.path)
  var out = [
    '<title>' + esc(m.title) + '</title>',
    '<meta name="description" content="' + esc(m.description) + '" />',
    m.noindex ? '<meta name="robots" content="noindex, follow" />' : '<link rel="canonical" href="' + esc(url) + '" />',
    '<meta property="og:title" content="' + esc(m.title) + '" />',
    '<meta property="og:description" content="' + esc(m.description) + '" />',
    '<meta property="og:url" content="' + esc(url) + '" />',
    '<meta property="og:locale" content="' + (OG_LOCALE[m.lang] || 'en_US') + '" />'
  ]
  ;(m.alternates || []).forEach(function(a) {
    out.push('<link rel="alternate" hreflang="' + esc(a.hreflang) + '" href="' + esc(absUrl(a.path)) + '" />')
  })
  if (m.jsonLd) {
    out.push('<script type="application/ld+json" id="seo-jsonld">' + JSON.stringify(m.jsonLd).replace(/</g, '\\u003c') + '</script>')
  }
  return out.filter(Boolean).join('\n    ')
}

function upsert(selector, create) {
  var el = document.head.querySelector(selector)
  if (!el) { el = create(); document.head.appendChild(el) }
  return el
}

function setMeta(attr, name, content) {
  upsert('meta[' + attr + '="' + name + '"]', function() {
    var el = document.createElement('meta'); el.setAttribute(attr, name); return el
  }).setAttribute('content', content)
}

export function applySeo(m) {
  if (typeof document === 'undefined') return
  var url = absUrl(m.path)
  document.title = m.title
  setMeta('name', 'description', m.description)
  setMeta('property', 'og:title', m.title)
  setMeta('property', 'og:description', m.description)
  setMeta('property', 'og:url', url)
  setMeta('property', 'og:locale', OG_LOCALE[m.lang] || 'en_US')
  if (m.lang) document.documentElement.lang = m.lang

  var robots = document.head.querySelector('meta[name="robots"]')
  if (m.noindex) setMeta('name', 'robots', 'noindex, follow')
  else if (robots) robots.remove()

  if (m.noindex) {
    var canon = document.head.querySelector('link[rel="canonical"]')
    if (canon) canon.remove()
  } else {
    upsert('link[rel="canonical"]', function() {
      var el = document.createElement('link'); el.rel = 'canonical'; return el
    }).href = url
  }

  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(function(el) { el.remove() })
  ;(m.alternates || []).forEach(function(a) {
    var el = document.createElement('link')
    el.rel = 'alternate'; el.hreflang = a.hreflang; el.href = absUrl(a.path)
    document.head.appendChild(el)
  })

  var ld = document.getElementById('seo-jsonld')
  if (ld) ld.remove()
  if (m.jsonLd) {
    var s = document.createElement('script')
    s.type = 'application/ld+json'; s.id = 'seo-jsonld'; s.text = JSON.stringify(m.jsonLd)
    document.head.appendChild(s)
  }
}
