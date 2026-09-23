import { LANGS, LANG_TO_URL, URL_TO_LANG, SITE_URL } from '../config/site.js'
import { activeOffers, OFFERS_AS_OF } from '../config/bankOffers.js'

// SEO pages with the current bank rates (/hy|ru|en/<slug>): one per product
// kind, built from src/config/bankOffers.js so the text, the table and the
// FAQ answers always match the data.

export var RATE_PAGES = [
  {
    key: 'deposit-rates', kind: 'deposit', icon: 'savings', calc: '/deposit',
    ruNoun: ['вклад', 'вклада', 'вкладов'],
    slug: { AM: 'avandneri-tokosadruyqner', RU: 'stavki-po-vkladam', EN: 'deposit-rates' },
    short: { AM: 'Ավանդների դրույքներ', RU: 'Ставки по вкладам', EN: 'Deposit rates' },
    title: {
      AM: 'Ավանդների տոկոսադրույքները Հայաստանում {Y} — բանկերի համեմատություն | ArmFinCredit',
      RU: 'Ставки по вкладам в Армении {Y} — сравнение банков | ArmFinCredit',
      EN: 'Deposit Rates in Armenia {Y} — Compare Banks | ArmFinCredit'
    },
    h1: { AM: 'Ավանդների տոկոսադրույքները Հայաստանի բանկերում', RU: 'Ставки по вкладам в банках Армении', EN: 'Deposit rates in Armenian banks' },
    intro: {
      AM: '{N} ավանդ {B} բանկից՝ AMD, USD և EUR։ Դրամային ավանդների առավելագույն դրույքը՝ մինչև {MAX} ({TOP})։ Յուրաքանչյուր դրույք՝ աղբյուրով և ամսաթվով։',
      RU: '{N} {NW} от {B} {BW} в AMD, USD и EUR. Максимальная ставка по вкладам в драмах — до {MAX} ({TOP}). У каждой ставки указаны источник и дата.',
      EN: '{N} deposits from {B} banks in AMD, USD and EUR. The top AMD deposit rate is up to {MAX} ({TOP}). Every rate comes with its source and date.'
    }
  },
  {
    key: 'mortgage-rates', kind: 'mortgage', icon: 'home', calc: '/',
    ruNoun: ['ипотечная программа', 'ипотечные программы', 'ипотечных программ'],
    slug: { AM: 'hipotekayi-tokosadruyqner', RU: 'stavki-po-ipoteke', EN: 'mortgage-rates' },
    short: { AM: 'Հիփոթեքի դրույքներ', RU: 'Ставки по ипотеке', EN: 'Mortgage rates' },
    title: {
      AM: 'Հիփոթեքի տոկոսադրույքները Հայաստանում {Y} — բանկերի համեմատություն | ArmFinCredit',
      RU: 'Ставки по ипотеке в Армении {Y} — сравнение банков | ArmFinCredit',
      EN: 'Mortgage Rates in Armenia {Y} — Compare Banks | ArmFinCredit'
    },
    h1: { AM: 'Հիփոթեքի տոկոսադրույքները Հայաստանի բանկերում', RU: 'Ставки по ипотеке в банках Армении', EN: 'Mortgage rates in Armenian banks' },
    intro: {
      AM: '{N} հիփոթեքային ծրագիր {B} բանկից։ Ստանդարտ ծրագրերի դրույքները՝ {MIN}-ից, պետական ծրագրերով՝ ավելի ցածր։ Հաշվեք վճարը ձեր գումարով։',
      RU: '{N} {NW} от {B} {BW}. Стандартные ставки — от {MIN}, по госпрограммам — ниже. Посчитайте платёж на свою сумму.',
      EN: '{N} mortgage programmes from {B} banks. Standard rates start at {MIN}; state programmes go lower. Calculate the payment for your amount.'
    }
  },
  {
    key: 'loan-rates', kind: 'loan', icon: 'payments', calc: '/',
    ruNoun: ['кредитное предложение', 'кредитных предложения', 'кредитных предложений'],
    slug: { AM: 'varkeri-tokosadruyqner', RU: 'stavki-po-kreditam', EN: 'loan-rates' },
    short: { AM: 'Վարկերի դրույքներ', RU: 'Ставки по кредитам', EN: 'Loan rates' },
    title: {
      AM: 'Սպառողական վարկերի տոկոսադրույքները Հայաստանում {Y} | ArmFinCredit',
      RU: 'Ставки по потребительским кредитам в Армении {Y} | ArmFinCredit',
      EN: 'Personal Loan Rates in Armenia {Y} — Compare Banks | ArmFinCredit'
    },
    h1: { AM: 'Սպառողական վարկերի տոկոսադրույքները', RU: 'Ставки по потребительским кредитам в Армении', EN: 'Personal loan rates in Armenia' },
    intro: {
      AM: '{N} վարկային առաջարկ {B} բանկից՝ գումարի և ժամկետի սահմաններով։ Դրույքները՝ {MIN}-ից։ Համեմատեք վճարը և գերավճարը ձեր հաշվարկով։',
      RU: '{N} {NW} от {B} {BW} с лимитами суммы и срока. Ставки — от {MIN}. Сравните платёж и переплату на свой расчёт.',
      EN: '{N} loan offers from {B} banks with amount and term limits. Rates from {MIN}. Compare the payment and overpayment for your own calculation.'
    }
  }
]

export var RATES_UI = {
  bank:    { AM: 'Բանկ', RU: 'Банк', EN: 'Bank' },
  product: { AM: 'Պրոդուկտ', RU: 'Продукт', EN: 'Product' },
  rate:    { AM: 'Դրույք', RU: 'Ставка', EN: 'Rate' },
  term:    { AM: 'Ժամկետ', RU: 'Срок', EN: 'Term' },
  asOf:    { AM: 'Տվյալները՝', RU: 'Данные на', EN: 'Data as of' },
  more:    { AM: 'Պայմաններ, սահմաններ և աղբյուրներ', RU: 'Условия, лимиты и источники', EN: 'Terms, limits and sources' },
  calc:    { AM: 'Հաշվել ձեր գումարով', RU: 'Посчитать на свою сумму', EN: 'Calculate for your amount' },
  compare: { AM: 'Համեմատել ձեր հաշվարկով', RU: 'Сравнить с вашим расчётом', EN: 'Compare with your calculation' },
  others:  { AM: 'Այլ դրույքներ', RU: 'Другие ставки', EN: 'Other rates' },
  warn:    { AM: 'Դրույքները ցուցադրական են և փոխվում են․ վերջնական պայմանները ճշտեք բանկում։', RU: 'Ставки ориентировочные и меняются — точные условия уточняйте в банке.', EN: 'Rates are indicative and change — confirm the final terms with the bank.' }
}

function fmtPct(n) { return String(n).replace(/\.0$/, '') + '%' }
function text(v, lang) { return !v ? '' : typeof v === 'string' ? v : (v[lang] || v.EN) }
// Rate used for ranking: `compare` when the headline range is not representative.
function cmpRate(o) { return o.compare || o.rate }

function year() { return OFFERS_AS_OF.slice(0, 4) }

export function rateLabel(o, lang) {
  var base = o.rate[0] === o.rate[1] ? fmtPct(o.rate[0]) : fmtPct(o.rate[0]) + '–' + fmtPct(o.rate[1])
  var pre = o.upTo ? { AM: 'մինչև ', RU: 'до ', EN: 'up to ' } : o.from ? { AM: 'սկսած ', RU: 'от ', EN: 'from ' } : null
  return (pre ? pre[lang] : '') + base
}

// Offers of one kind, best first: deposits by highest rate, loans by lowest.
export function rateRows(page) {
  return activeOffers().filter(function(o) { return o.kind === page.kind })
    .sort(function(a, b) {
      return page.kind === 'deposit'
        ? (a.currency === b.currency ? b.rate[1] - a.rate[1] : ['AMD', 'USD', 'EUR'].indexOf(a.currency) - ['AMD', 'USD', 'EUR'].indexOf(b.currency))
        : cmpRate(a)[0] - cmpRate(b)[0]
    })
}

function stats(page) {
  var rows = rateRows(page)
  var banks = {}; rows.forEach(function(o) { banks[o.bank] = 1 })
  var amd = rows.filter(function(o) { return o.currency === 'AMD' })
  var top = amd[0]
  // The lowest rate outside state programmes.
  var standard = amd.filter(function(o) { return !o.program })
  var min = cmpRate(standard[0] || amd[0] || { rate: [0] })[0]
  return { rows: rows, n: rows.length, b: Object.keys(banks).length, top: top, min: min }
}

// Russian noun form for a number: 1 вклад, 2 вклада, 5 вкладов.
function ruForm(n, forms) {
  var d = n % 10, h = n % 100
  return d === 1 && h !== 11 ? forms[0] : d >= 2 && d <= 4 && (h < 12 || h > 14) ? forms[1] : forms[2]
}

function fill(tpl, page) {
  var s = stats(page)
  return tpl.replace('{N}', s.n).replace('{NW}', ruForm(s.n, page.ruNoun))
    .replace('{BW}', s.b % 10 === 1 && s.b % 100 !== 11 ? 'банка' : 'банков').replace('{B}', s.b).replace('{Y}', year())
    .replace('{MAX}', s.top ? fmtPct(s.top.rate[1]) : '').replace('{TOP}', s.top ? s.top.bank : '')
    .replace('{MIN}', fmtPct(s.min))
}

export function ratePageText(page, lang) {
  return { title: fill(page.title[lang], page), h1: page.h1[lang], intro: fill(page.intro[lang], page) }
}

// FAQ answers computed from the data (also used for FAQPage JSON-LD).
export function rateFaq(page, lang) {
  var s = stats(page); var rows = s.rows
  function list(arr) { return arr.map(function(o) { return o.bank + ' — ' + rateLabel(o, lang) }).join('; ') }
  if (page.kind === 'deposit') {
    var amd = rows.filter(function(o) { return o.currency === 'AMD' }).slice(0, 5)
    var usd = rows.filter(function(o) { return o.currency === 'USD' }).slice(0, 3)
    return {
      AM: [
        ['Ո՞ր բանկն է առաջարկում ավանդի ամենաբարձր տոկոսը ' + year() + '-ին', 'Դրամային ավանդներ (' + OFFERS_AS_OF + ')՝ ' + list(amd) + '։'],
        ['Որքա՞ն են դոլարային ավանդների դրույքները', 'USD՝ ' + list(usd) + '։ Եվրոյով դրույքները սովորաբար ավելի ցածր են։'],
        ['Հարկվու՞մ է ավանդի եկամուտը', 'Այո, ավանդի տոկոսային եկամուտը հարկվում է 10% եկամտային հարկով։ Ավանդի հաշվիչը հաշվում է զուտ եկամուտը հարկից հետո։']
      ],
      RU: [
        ['Какой банк даёт самый высокий процент по вкладу в ' + year() + ' году?', 'Вклады в драмах (' + OFFERS_AS_OF + '): ' + list(amd) + '.'],
        ['Какие ставки по долларовым вкладам?', 'USD: ' + list(usd) + '. Ставки по вкладам в евро обычно ниже.'],
        ['Облагается ли доход по вкладу налогом?', 'Да, процентный доход по вкладам облагается подоходным налогом 10%. Калькулятор вкладов считает чистый доход после налога.']
      ],
      EN: [
        ['Which bank pays the highest deposit rate in ' + year() + '?', 'AMD deposits (' + OFFERS_AS_OF + '): ' + list(amd) + '.'],
        ['What are USD deposit rates?', 'USD: ' + list(usd) + '. EUR deposit rates are usually lower.'],
        ['Is deposit interest taxed?', 'Yes, deposit interest is subject to 10% income tax. The deposit calculator shows your net income after tax.']
      ]
    }[lang]
  }
  var best = rows.slice(0, 5)
  var isMortgage = page.kind === 'mortgage'
  return {
    AM: [
      [isMortgage ? 'Որքա՞ն է հիփոթեքի տոկոսը Հայաստանում' : 'Որքա՞ն է սպառողական վարկի տոկոսը Հայաստանում', OFFERS_AS_OF + '՝ ' + list(best) + '։ Վերջնական դրույքը կախված է եկամտից, վարկային պատմությունից և կանխավճարից։'],
      ['Ինչպե՞ս հաշվել ամսական վճարը', 'Բացեք հաշվիչը, նշեք գումարը, ժամկետը և բանկի դրույքը՝ կտեսնեք ամսական վճարը, գերավճարը և ամբողջական գրաֆիկը։'],
      ['Ի՞նչն է ավելի կարևոր՝ անվանական, թե՞ փաստացի դրույքը', 'Համեմատեք փաստացի (APR) դրույքը․ այն ներառում է միջնորդավճարներն ու ապահովագրությունը։']
    ],
    RU: [
      [isMortgage ? 'Какой процент по ипотеке в Армении?' : 'Какой процент по потребительскому кредиту в Армении?', OFFERS_AS_OF + ': ' + list(best) + '. Итоговая ставка зависит от дохода, кредитной истории и первого взноса.'],
      ['Как рассчитать ежемесячный платёж?', 'Откройте калькулятор, укажите сумму, срок и ставку банка — увидите платёж, переплату и полный график.'],
      ['Что важнее — номинальная или эффективная ставка?', 'Сравнивайте эффективную ставку (APR): она учитывает комиссии и страховку.']
    ],
    EN: [
      [isMortgage ? 'What is the mortgage rate in Armenia?' : 'What is the personal loan rate in Armenia?', OFFERS_AS_OF + ': ' + list(best) + '. Your final rate depends on income, credit history and down payment.'],
      ['How do I calculate the monthly payment?', 'Open the calculator, enter the amount, term and the bank’s rate to see the payment, the overpayment and the full schedule.'],
      ['Nominal or effective rate — which matters?', 'Compare the effective rate (APR): it includes fees and insurance.']
    ]
  }[lang]
}

export function ratePagePath(page, lang) {
  return '/' + LANG_TO_URL[lang] + '/' + page.slug[lang]
}

export function findRatePage(pathname) {
  var parts = String(pathname || '').split('/').filter(Boolean)
  if (parts.length !== 2) return null
  var lang = URL_TO_LANG[parts[0]]
  if (!lang) return null
  for (var i = 0; i < RATE_PAGES.length; i++) {
    if (RATE_PAGES[i].slug[lang] === parts[1]) return { page: RATE_PAGES[i], lang: lang }
  }
  return null
}

export function ratePageSeo(page, lang) {
  var tx = ratePageText(page, lang)
  var rows = rateRows(page)
  var alternates = LANGS.map(function(l) { return { hreflang: LANG_TO_URL[l], path: ratePagePath(page, l) } })
    .concat([{ hreflang: 'x-default', path: ratePagePath(page, 'EN') }])
  var type = page.kind === 'deposit' ? 'DepositAccount' : page.kind === 'mortgage' ? 'MortgageLoan' : 'LoanOrCredit'
  return {
    title: tx.title,
    description: tx.intro,
    path: ratePagePath(page, lang),
    lang: LANG_TO_URL[lang],
    alternates: alternates,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'ArmFinCredit', item: SITE_URL + '/' },
            { '@type': 'ListItem', position: 2, name: page.short[lang], item: SITE_URL + ratePagePath(page, lang) }
          ]
        },
        {
          '@type': 'ItemList',
          name: tx.h1,
          itemListElement: rows.map(function(o, i) {
            return {
              '@type': 'ListItem', position: i + 1,
              item: {
                '@type': type,
                name: o.bank + ' — ' + text(o.product, lang),
                provider: { '@type': 'BankOrCreditUnion', name: o.bank },
                interestRate: o.rate[0] === o.rate[1] ? o.rate[0] : { '@type': 'QuantitativeValue', minValue: o.rate[0], maxValue: o.rate[1] },
                currency: o.currency,
                url: o.url
              }
            }
          })
        },
        {
          '@type': 'FAQPage',
          mainEntity: rateFaq(page, lang).map(function(q) {
            return { '@type': 'Question', name: q[0], acceptedAnswer: { '@type': 'Answer', text: q[1] } }
          })
        }
      ]
    }
  }
}
