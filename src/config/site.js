// Public site origin, used for canonical URLs, sitemap and the widget snippet.
// Override with VITE_SITE_URL when the site moves to its own domain.
export var SITE_URL = ((import.meta.env && import.meta.env.VITE_SITE_URL) || 'https://armfincredit-app.vercel.app').replace(/\/+$/, '')

// Internal language codes (AM/RU/EN) ↔ URL / ISO codes (hy/ru/en).
export var LANG_TO_URL = { AM: 'hy', RU: 'ru', EN: 'en' }
export var URL_TO_LANG = { hy: 'AM', ru: 'RU', en: 'EN' }
export var LANGS = ['AM', 'RU', 'EN']
