// ── Monetization config ───────────────────────────────────────────────────────
// Everything that affects revenue lives here, so prices, ad slots and partner
// offers can be changed without touching components. Values prefixed with
// VITE_ can be overridden in Vercel → Project → Settings → Environment Variables.

var env = import.meta.env || {}

// ── Google AdSense ────────────────────────────────────────────────────────────
export var ADSENSE_CLIENT = env.VITE_ADSENSE_CLIENT || 'ca-pub-7094672848897049'

// Create "Display ad" units in AdSense → Ads → By ad unit, paste their slot IDs.
// A slot without an ID renders nothing in production (Auto ads still work).
export var AD_SLOTS = {
  calculator: env.VITE_AD_SLOT_CALCULATOR || '',
  schedule:   env.VITE_AD_SLOT_SCHEDULE   || '',
  offers:     env.VITE_AD_SLOT_OFFERS     || '',
  saved:      env.VITE_AD_SLOT_SAVED      || '',
  early:      env.VITE_AD_SLOT_EARLY      || '',
  landing:    env.VITE_AD_SLOT_LANDING    || ''
}

// ── Pro plan ──────────────────────────────────────────────────────────────────
export var TRIAL_DAYS = 7

// Checkout links from your payment provider (Lemon Squeezy / Gumroad / Paddle).
// After payment the buyer receives a license key and enters it on /pro.
export var PLANS = [
  {
    id: 'monthly',
    price: '$1.99',
    period: { AM: '/ամիս', RU: '/мес.', EN: '/mo' },
    checkoutUrl: env.VITE_CHECKOUT_URL_MONTHLY || ''
  },
  {
    id: 'lifetime',
    price: '$9.99',
    period: { AM: 'մեկ անգամ', RU: 'навсегда', EN: 'one-time' },
    checkoutUrl: env.VITE_CHECKOUT_URL_LIFETIME || '',
    best: true
  }
]

// Free-tier limits. Pro (and an active trial) removes them.
export var LIMITS = {
  free: { saves: 3, aiPerDay: 3,  compareSlots: 2 },
  pro:  { saves: 50, aiPerDay: 100, compareSlots: 4 }
}

// ── Partner offers (affiliate / CPA) ──────────────────────────────────────────
// Replace these examples with real partner offers and tracking links once you
// have an agreement with a bank, credit organisation or loan marketplace.
// `demo: true` offers show an "Example" badge and never link out.
export var PARTNER_OFFERS = [
  {
    id: 'partner-a',
    name: 'Partner Bank A',
    kind: { AM: 'Սպառողական վարկ', RU: 'Потребительский кредит', EN: 'Consumer loan' },
    rateFrom: 11.5,
    maxAmount: 15000000,
    maxTerm: 60,
    perks: {
      AM: ['Առանց գրավի', 'Որոշում 1 օրում'],
      RU: ['Без залога', 'Решение за 1 день'],
      EN: ['No collateral', 'Decision in 1 day']
    },
    url: '',
    demo: true
  },
  {
    id: 'partner-b',
    name: 'Partner Bank B',
    kind: { AM: 'Հիփոթեք', RU: 'Ипотека', EN: 'Mortgage' },
    rateFrom: 9.8,
    maxAmount: 100000000,
    maxTerm: 360,
    perks: {
      AM: ['Մինչև 30 տարի', 'Եկամտային հարկի վերադարձ'],
      RU: ['До 30 лет', 'Возврат подоходного налога'],
      EN: ['Up to 30 years', 'Income-tax refund eligible']
    },
    url: '',
    demo: true
  },
  {
    id: 'partner-c',
    name: 'Partner Credit C',
    kind: { AM: 'Ավտովարկ', RU: 'Автокредит', EN: 'Car loan' },
    rateFrom: 12.9,
    maxAmount: 30000000,
    maxTerm: 84,
    perks: {
      AM: ['Կանխավճար 10%-ից', 'Առցանց դիմում'],
      RU: ['Взнос от 10%', 'Онлайн-заявка'],
      EN: ['From 10% down', 'Online application']
    },
    url: '',
    demo: true
  }
]

export var PARTNER_CONTACT_EMAIL = 'partners@armfincredit.app'

// Appends UTM tags so partners can attribute (and pay for) the traffic.
export function withUtm(url, offerId) {
  if (!url) return ''
  var sep = url.indexOf('?') === -1 ? '?' : '&'
  return url + sep + 'utm_source=armfincredit&utm_medium=referral&utm_campaign=' + encodeURIComponent(offerId)
}
