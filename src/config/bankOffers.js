// Public offers of Armenian banks shown in the Pro "Bank offers" catalog.
//
// These are NOT partners and NOT ads: indicative public rates collected from
// open sources, each with its source and date. Rates change often — update
// this file when you refresh the data, and always link to the bank's page so
// the visitor can check the current terms.

export var OFFERS_AS_OF = '2026-02'
export var CBA_RATE = { value: 6.5, asOf: '2026-03', source: 'https://tradingeconomics.com/armenia/interest-rate' }

// kind: deposit | mortgage
// rate: [min, max] % per year (min === max when a single "up to" figure is known)
export var BANK_OFFERS = [
  {
    bank: 'Evocabank', kind: 'deposit', currency: 'AMD', rate: [10.75, 10.75], upTo: true,
    term: { AM: 'ըստ պայմանների', RU: 'по условиям банка', EN: 'per bank terms' },
    note: { AM: 'Ակցիա', RU: 'Акция банка', EN: 'Bank promotion' },
    url: 'https://www.evoca.am/en/news/products/evocabank-is-doubling-your-interest-rate',
    source: 'evoca.am'
  },
  {
    bank: 'Byblos Bank Armenia', kind: 'deposit', currency: 'AMD', rate: [10, 10], upTo: true,
    term: { AM: '12 ամիս', RU: '12 мес.', EN: '12 months' },
    note: { AM: 'Առանց համալրման', RU: 'Без пополнения', EN: 'No top-ups' },
    url: 'https://www.byblosbankarmenia.am/en/deposit/term-deposit',
    source: 'afm.am, 2026-01'
  },
  {
    bank: 'AMIO Bank', kind: 'deposit', currency: 'AMD', rate: [10, 10], upTo: true,
    term: { AM: '12 ամիս', RU: '12 мес.', EN: '12 months' },
    note: { AM: 'Առանց համալրման', RU: 'Без пополнения', EN: 'No top-ups' },
    url: 'https://amiobank.am',
    source: 'afm.am, 2026-01'
  },
  {
    bank: 'Artsakhbank', kind: 'deposit', currency: 'AMD', rate: [10, 10], upTo: true,
    term: { AM: '12 ամիս', RU: '12 мес.', EN: '12 months' },
    note: { AM: 'Առանց համալրման', RU: 'Без пополнения', EN: 'No top-ups' },
    url: 'https://www.artsakhbank.am',
    source: 'afm.am, 2026-01'
  },
  {
    bank: { AM: 'Շուկայի լավագույն', RU: 'Лучшее на рынке', EN: 'Market best' }, kind: 'deposit', currency: 'USD', rate: [5, 5], upTo: true,
    term: { AM: '12 ամիս', RU: '12 мес.', EN: '12 months' },
    url: 'https://afm.am/en/deposits', source: 'afm.am, 2026-01'
  },
  {
    bank: { AM: 'Շուկայի լավագույն', RU: 'Лучшее на рынке', EN: 'Market best' }, kind: 'deposit', currency: 'EUR', rate: [2.5, 2.5], upTo: true,
    term: { AM: '12 ամիս', RU: '12 мес.', EN: '12 months' },
    url: 'https://afm.am/en/deposits', source: 'afm.am, 2026-01'
  },
  {
    bank: 'ACBA Bank', kind: 'mortgage', currency: 'AMD', rate: [13.5, 14.5],
    term: { AM: 'Ֆիքսված տոկոսադրույք', RU: 'Фиксированная ставка', EN: 'Fixed rate' },
    note: { AM: 'USD 10.5–11.5%, EUR 9–10%', RU: 'USD 10,5–11,5%, EUR 9–10%', EN: 'USD 10.5–11.5%, EUR 9–10%' },
    url: 'https://www.acba.am/en/individuals/loans/mortgage/purchase-mortgage',
    source: 'acba.am'
  },
  {
    bank: 'IDBank', kind: 'mortgage', currency: 'AMD', rate: [13, 14.5],
    term: { AM: 'Սփյուռքի համար', RU: 'Для диаспоры', EN: 'For the diaspora' },
    note: { AM: 'USD 8.9–10.5%, EUR 7.9–9.5%', RU: 'USD 8,9–10,5%, EUR 7,9–9,5%', EN: 'USD 8.9–10.5%, EUR 7.9–9.5%' },
    url: 'https://idbank.am/en/credits/mortgage/mortgage-loans-for-the-diaspora/',
    source: 'idbank.am'
  }
]

// Full, frequently updated comparison tables (external).
export var MORE_SOURCES = [
  { name: 'afm.am — deposits', url: 'https://afm.am/en/deposits' },
  { name: 'afm.am — mortgage', url: 'https://afm.am/en/mortgage' },
  { name: 'rate.am', url: 'https://www.rate.am' }
]
