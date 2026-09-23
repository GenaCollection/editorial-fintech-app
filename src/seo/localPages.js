import { LANGS, LANG_TO_URL, URL_TO_LANG } from '../config/site.js'

// Language-specific URLs for the app's main tools (/ru/kalkulyator-vkladov, …),
// so each language version can be indexed on its own. The plain paths
// (/deposit, …) keep working and point search engines here via canonical.

export var LOCAL_PAGES = {
  schedule: { path: '/schedule', slug: { AM: 'varki-marman-grafik', RU: 'grafik-platezhej', EN: 'loan-schedule' } },
  compare:  { path: '/compare',  slug: { AM: 'varkeri-hamematutyun', RU: 'sravnenie-kreditov', EN: 'compare-loans' } },
  offers:   { path: '/offers',   slug: { AM: 'varkayin-arajarkner', RU: 'kreditnye-predlozheniya', EN: 'loan-offers' } },
  deposit:  { path: '/deposit',  slug: { AM: 'avandi-hashvich', RU: 'kalkulyator-vkladov', EN: 'deposit-calculator' } },
  banks:    { path: '/banks',    slug: { AM: 'hayastani-banker', RU: 'banki-armenii', EN: 'armenian-banks' } }
}

var KEY_BY_PATH = {}
Object.keys(LOCAL_PAGES).forEach(function(k) { KEY_BY_PATH[LOCAL_PAGES[k].path] = k })

export function localPath(key, lang) {
  return '/' + LANG_TO_URL[lang] + '/' + LOCAL_PAGES[key].slug[lang]
}

// '/deposit' → '/ru/kalkulyator-vkladov' for RU; other paths are returned as is.
export function localPathFor(path, lang) {
  var key = KEY_BY_PATH[path]
  return key && LANG_TO_URL[lang] ? localPath(key, lang) : path
}

// Resolves /<lang>/<slug> to { key, lang, path } or null.
export function findLocalPage(pathname) {
  var parts = String(pathname || '').split('/').filter(Boolean)
  if (parts.length !== 2) return null
  var lang = URL_TO_LANG[parts[0]]
  if (!lang) return null
  for (var key in LOCAL_PAGES) {
    if (LOCAL_PAGES[key].slug[lang] === parts[1]) return { key: key, lang: lang, path: LOCAL_PAGES[key].path }
  }
  return null
}

// Key of a local page for either its plain path (/deposit) or a localized URL.
export function localKeyOf(pathname) {
  var p = String(pathname || '').replace(/\/+$/, '') || '/'
  if (KEY_BY_PATH[p]) return KEY_BY_PATH[p]
  var found = findLocalPage(p)
  return found ? found.key : null
}

export function localAlternates(key) {
  return LANGS.map(function(l) { return { hreflang: LANG_TO_URL[l], path: localPath(key, l) } })
    .concat([{ hreflang: 'x-default', path: localPath(key, 'EN') }])
}
