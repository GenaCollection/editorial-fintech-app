// Public offers of Armenian banks shown in the Pro "Bank offers" catalog.
//
// These are NOT partners and NOT ads: indicative public rates collected from
// open sources (bank websites, bank news, afm.am reviews), each with its own
// source and date. Rates change often — update this file when you refresh the
// data, drop offers whose `validUntil` has passed, and always link to the
// bank's page so the visitor can check the current terms.
//
// Banks we could not find a verified public rate for are listed in
// BANKS_NO_DATA instead of guessing a number.

export var OFFERS_AS_OF = '2026-09'
export var CBA_RATE = { value: 6.5, asOf: '2026-02', source: 'https://tradingeconomics.com/armenia/interest-rate' }

function L(am, ru, en) { return { AM: am, RU: ru, EN: en } }

var NO_TOPUP   = L('Առանց համալրման', 'Без пополнения', 'No top-ups')
var TAX_10     = L('Եկամտահարկ՝ 10%', 'Налог на доход 10%', 'Income tax 10%')
var Y1         = L('1 տարի', '1 год', '1 year')

// kind: deposit | mortgage | loan
// rate: [min, max] % per year; upTo: the figure is a maximum ("up to")
// term, minAmount: free text per language (or plain string)
// conditions: list of per-language strings
// validUntil: 'YYYY-MM-DD' for promotions (hidden automatically after that date)
// limits: { amount: [min, max] AMD, term: [min, max] months } — known product
//         limits, used to check a user's calculation against the offer
// compare: [min, max] rates used for the loan comparison when `rate` is not
//          representative for a cash loan (defaults to `rate`)
export var BANK_OFFERS = [
  // ── Deposits: AMD ──────────────────────────────────────────────────────────
  {
    bank: 'Evocabank', product: 'Evoca deposit', kind: 'deposit', currency: 'AMD', rate: [10.75, 10.75], upTo: true,
    term: L('31–1095 օր', '31–1095 дней', '31–1095 days'),
    conditions: [
      L('+0.25%՝ EvocaTOUCH հավելվածով բացելիս', '+0,25% при открытии в приложении EvocaTOUCH', '+0.25% when opened in the EvocaTOUCH app'),
      L('Համալրում՝ 200 000 ֏-ից, յուրաքանչյուրը −0.5% դրույքից, վերջին 3 ամսում՝ ոչ', 'Пополнение от 200 000 ֏, каждое −0,5% к ставке; в последние 3 месяца — нельзя', 'Top-ups from AMD 200,000, each −0.5% to the rate; none in the last 3 months'),
      L('Վաղաժամ դադարեցում՝ 0.5% (≤365 օր) կամ 8.75% (366–1095 օր)', 'Досрочное закрытие: 0,5% (≤365 дн.) или 8,75% (366–1095 дн.)', 'Early closure: 0.5% (≤365 days) or 8.75% (366–1095 days)'),
      TAX_10
    ],
    url: 'https://www.evoca.am/en/news/products/more-favorable-deposit-terms', source: 'evoca.am', asOf: '2026'
  },
  {
    bank: 'AMIO Bank', product: 'AMIO deposit', kind: 'deposit', currency: 'AMD', rate: [10.5, 10.5], upTo: true,
    term: Y1,
    conditions: [
      L('10%՝ 1 տարով, առանց համալրման', '10% — на 1 год без пополнения', '10% for 1 year without top-ups'),
      L('«Շահավետ»՝ +0.25%, եթե ունեք AMD հաշիվ AMIO-ում', '«Выгодный»: +0,25% при наличии счёта в AMD в AMIO', '"Beneficial": +0.25% with an AMD account at AMIO'),
      L('Բացվում է առցանց', 'Можно открыть онлайн', 'Can be opened online')
    ],
    url: 'https://amiobank.am/en/news/291', source: 'amiobank.am, afm.am', asOf: '2026-01'
  },
  {
    bank: 'Fast Bank', product: 'Term deposit', kind: 'deposit', currency: 'AMD', rate: [10.5, 10.5], upTo: true,
    term: L('367–550 օր', '367–550 дней', '367–550 days'),
    conditions: [L('Կա նաև համալրվող ավանդ՝ այլ դրույքով', 'Есть и пополняемый вклад — по другой ставке', 'A replenishable deposit is also offered at a different rate')],
    url: 'https://www.fastbank.am/en/individual/deposits', source: 'fastbank.am', asOf: '2026'
  },
  {
    bank: 'Unibank', product: 'Classic', kind: 'deposit', currency: 'AMD', rate: [10.25, 10.25], upTo: true,
    term: L('մինչև 730 օր', 'до 730 дней', 'up to 730 days'),
    minAmount: '100 000 ֏',
    conditions: [L('Տոկոսները՝ ամսական կամ ժամկետի վերջում', 'Проценты ежемесячно или в конце срока', 'Interest monthly or at maturity')],
    url: 'https://www.unibank.am/en/deposit/5979/', source: 'unibank.am, hetq.am', asOf: '2026'
  },
  {
    bank: 'Unibank', product: 'Flexible', kind: 'deposit', currency: 'AMD', rate: [9.25, 9.25], upTo: true,
    term: L('ըստ պայմանների', 'по условиям банка', 'per bank terms'),
    conditions: [L('Ճկուն պայմաններ (համալրում/մասնակի ելք)՝ ավելի ցածր դրույքով', 'Гибкие условия (пополнение/частичное снятие) — ставка ниже', 'Flexible terms (top-ups/partial withdrawals) at a lower rate')],
    url: 'https://www.unibank.am/en/deposit/5979/', source: 'unibank.am, hetq.am', asOf: '2026'
  },
  {
    bank: 'VTB Bank (Armenia)', product: 'Stable', kind: 'deposit', currency: 'AMD', rate: [10, 10], upTo: true,
    term: Y1, minAmount: '4 000 000 ֏',
    conditions: [
      L('Արդյունավետ տոկոսադրույք՝ 9.97%', 'Эффективная ставка 9,97%', 'Effective rate 9.97%'),
      L('Բացվում է հավելվածով', 'Открывается через приложение', 'Opened via the mobile app'),
      L('«Privilege» փաթեթի հաճախորդների համար', 'Для клиентов пакета «Privilege»', 'For "Privilege" package clients')
    ],
    url: 'https://armbanks.am/en/2026/07/30/277260/', source: 'armbanks.am', asOf: '2026-07'
  },
  {
    bank: 'Byblos Bank Armenia', product: 'Term deposit', kind: 'deposit', currency: 'AMD', rate: [10, 10], upTo: true,
    term: Y1,
    conditions: [
      NO_TOPUP,
      L('Տոկոսներ՝ ամսական, եռամսյակային, կիսամյակային, տարեկան կամ վերջում', 'Проценты: ежемесячно, ежеквартально, раз в полгода, ежегодно или в конце', 'Interest monthly, quarterly, semi-annually, annually or at maturity'),
      L('Հավելվածով կամ մասնաճյուղում', 'В приложении или в отделении', 'In the app or at a branch')
    ],
    url: 'https://www.byblosbankarmenia.am/en/deposit/term-deposit', source: 'byblosbankarmenia.am, afm.am', asOf: '2026-01'
  },
  {
    bank: 'Artsakhbank', product: 'Term deposit', kind: 'deposit', currency: 'AMD', rate: [10, 10], upTo: true,
    term: Y1,
    conditions: [NO_TOPUP, L('Բանկի կայքում՝ 3.5–9% տարբեր ժամկետներով (մինչև 10 տարի)', 'На сайте банка: 3,5–9% на разные сроки (до 10 лет)', 'Bank site lists 3.5–9% for other terms (up to 10 years)')],
    url: 'https://www.artsakhbank.am/en/deposit', source: 'afm.am, artsakhbank.am', asOf: '2026-01'
  },
  {
    bank: 'IDBank', product: 'Safe', kind: 'deposit', currency: 'AMD', rate: [9.75, 9.75], upTo: true,
    term: L('մինչև 1096 օր', 'до 1096 дней', 'up to 1096 days'),
    minAmount: L('10 000 ֏ առցանց / 100 000 ֏ մասնաճյուղում', '10 000 ֏ онлайн / 100 000 ֏ в отделении', 'AMD 10,000 online / 100,000 at a branch'),
    conditions: [NO_TOPUP],
    url: 'https://idbank.am/en/deposits/deposit_safe/noreplenish/', source: 'idbank.am', asOf: '2026'
  },
  {
    bank: 'Araratbank', product: 'Term', kind: 'deposit', currency: 'AMD', rate: [9.5, 9.5], upTo: true,
    term: L('45–1095 օր', '45–1095 дней', '45–1095 days'),
    conditions: [L('100 մլն ֏-ից ավելի՝ պայմանավորվածությամբ', 'Свыше 100 млн ֏ — по договорённости', 'Over AMD 100M — by agreement')],
    url: 'https://www.araratbank.am/en/deposits/46/', source: 'araratbank.am', asOf: '2026'
  },
  {
    bank: 'Ardshinbank', product: 'Avand', kind: 'deposit', currency: 'AMD', rate: [6, 9.5],
    term: L('ըստ ժամկետի', 'зависит от срока', 'depends on term'),
    conditions: [L('Դրույքը կախված է ժամկետից և գումարից', 'Ставка зависит от срока и суммы', 'Rate depends on term and amount')],
    url: 'https://ardshinbank.am/for-you/avand?lang=en', source: 'ardshinbank.am', asOf: '2026-02'
  },
  {
    bank: 'Inecobank', product: 'Accumulative', kind: 'deposit', currency: 'AMD', rate: [9, 9],
    term: L('ըստ պայմանների', 'по условиям банка', 'per bank terms'),
    conditions: [L('Տարեկան եկամտաբերություն (APY)', 'Годовая доходность (APY)', 'Annual percentage yield (APY)'), L('Կուտակային՝ համալրմամբ', 'Накопительный, с пополнением', 'Accumulative, with top-ups')],
    url: 'https://www.inecobank.am/en/Individual/deposits/accumulative/terms', source: 'inecobank.am', asOf: '2026'
  },
  {
    bank: 'Inecobank', product: 'Flexible', kind: 'deposit', currency: 'AMD', rate: [6.25, 6.25],
    term: L('ըստ պայմանների', 'по условиям банка', 'per bank terms'),
    conditions: [L('Տարեկան եկամտաբերություն (APY)', 'Годовая доходность (APY)', 'Annual percentage yield (APY)'), L('Ճկուն՝ գումարի հասանելիությամբ', 'Гибкий, с доступом к деньгам', 'Flexible access to funds'), L('200 մլն ֏-ից ավելի՝ անհատական պայմաններ', 'Свыше 200 млн ֏ — индивидуальные условия', 'Over AMD 200M — individual terms')],
    url: 'https://www.inecobank.am/en/Individual/deposits/flexible/terms', source: 'inecobank.am', asOf: '2026'
  },
  {
    bank: 'ACBA Bank', product: 'Child', kind: 'deposit', currency: 'AMD', rate: [8.63, 8.63], upTo: true,
    term: L('մինչև երեխայի 18 տարին', 'до 18 лет ребёнка', 'until the child turns 18'),
    conditions: [L('Երեխայի անունով', 'Открывается на имя ребёнка', 'Opened in the child\'s name')],
    url: 'https://www.acba.am/en/individuals/save-and-invest/deposits/accumulative', source: 'acba.am, afm.am', asOf: '2026-01'
  },
  {
    bank: 'ACBA Bank', product: 'Classic', kind: 'deposit', currency: 'AMD', rate: [7.87, 7.87], upTo: true,
    term: L('6–24 ամիս', '6–24 мес.', '6–24 months'),
    url: 'https://www.acba.am/en/individuals/save-and-invest/deposits/classic', source: 'acba.am, afm.am', asOf: '2026-01'
  },
  {
    bank: 'ACBA Bank', product: 'Family', kind: 'deposit', currency: 'AMD', rate: [7.83, 7.83], upTo: true,
    term: L('1–24 ամիս', '1–24 мес.', '1–24 months'),
    url: 'https://www.acba.am/en/individuals/save-and-invest/deposits/family', source: 'acba.am, afm.am', asOf: '2026-01'
  },
  {
    bank: 'IDBank', product: L('Խնայողական հաշիվ', 'Сберегательный счёт', 'Savings account'), kind: 'deposit', currency: 'AMD', rate: [5, 5], upTo: true,
    term: L('առանց ժամկետի', 'бессрочно', 'no fixed term'),
    conditions: [L('Գումարը՝ ցանկացած պահի', 'Деньги доступны в любой момент', 'Money available at any time')],
    url: 'https://idbank.am/en/', source: 'idbank.am', asOf: '2026'
  },

  // ── Deposits: USD / EUR ───────────────────────────────────────────────────
  {
    bank: 'Fast Bank', product: 'Term deposit', kind: 'deposit', currency: 'USD', rate: [6, 6], upTo: true,
    term: L('367–550 օր', '367–550 дней', '367–550 days'),
    url: 'https://www.fastbank.am/en/individual/deposits', source: 'fastbank.am', asOf: '2026'
  },
  {
    bank: 'Evocabank', product: 'Evoca deposit', kind: 'deposit', currency: 'USD', rate: [5.75, 5.75], upTo: true,
    term: L('31–1095 օր', '31–1095 дней', '31–1095 days'),
    conditions: [L('Համալրում՝ $500-ից, յուրաքանչյուրը −0.5% դրույքից', 'Пополнение от $500, каждое −0,5% к ставке', 'Top-ups from $500, each −0.5% to the rate'), TAX_10],
    url: 'https://www.evoca.am/en/news/products/more-favorable-deposit-terms', source: 'evoca.am', asOf: '2026'
  },
  {
    bank: 'AMIO Bank', product: 'AMIO deposit', kind: 'deposit', currency: 'USD', rate: [5, 5], upTo: true,
    term: Y1, conditions: [NO_TOPUP],
    url: 'https://amiobank.am/en', source: 'afm.am', asOf: '2026-01'
  },
  {
    bank: 'Unibank', product: 'Term deposit', kind: 'deposit', currency: 'USD', rate: [4.25, 4.25], upTo: true,
    term: L('ըստ պայմանների', 'по условиям банка', 'per bank terms'),
    url: 'https://www.unibank.am/en/deposit/5979/', source: 'unibank.am, hetq.am', asOf: '2026'
  },
  {
    bank: 'Fast Bank', product: 'Term deposit', kind: 'deposit', currency: 'EUR', rate: [5, 5], upTo: true,
    term: L('367–550 օր', '367–550 дней', '367–550 days'),
    url: 'https://www.fastbank.am/en/individual/deposits', source: 'fastbank.am', asOf: '2026'
  },
  {
    bank: 'Araratbank', product: 'Term', kind: 'deposit', currency: 'EUR', rate: [2.5, 2.5], upTo: true,
    term: L('~1 տարի', '~1 год', '~1 year'),
    url: 'https://www.araratbank.am/en/deposits/46/', source: 'araratbank.am, afm.am', asOf: '2026-01'
  },

  // ── Mortgage ──────────────────────────────────────────────────────────────
  {
    bank: 'Evocabank', product: L('Հիփոթեք ԱՀԸ ծրագրով', 'Ипотека по программе НИК', 'National Mortgage Company program'), kind: 'mortgage', currency: 'AMD', rate: [8, 8],
    term: L('Պետական աջակցությամբ', 'С господдержкой', 'State-supported'),
    conditions: [L('Միայն ծրագրի մասնակիցների համար (պայմանները՝ բանկում)', 'Только для участников госпрограммы (критерии — в банке)', 'Only for eligible programme participants (criteria at the bank)'), L('Սուբսիդավորում՝ 2% Երևանում, 4% մարզերում', 'Субсидия: 2% в Ереване, 4% в регионах', 'Subsidy: 2% in Yerevan, 4% in the regions')],
    url: 'https://www.evoca.am/en/news/products/new-mortgage-loan-offer', source: 'evoca.am', asOf: '2026'
  },
  {
    bank: 'Evocabank', product: L('Հիփոթեք՝ երկրորդային շուկա', 'Ипотека: вторичный рынок', 'Mortgage: secondary market'), kind: 'mortgage', currency: 'AMD', rate: [12.5, 12.5],
    limits: { term: [1, 240] },
    term: L('մինչև 20 տարի', 'до 20 лет', 'up to 20 years'),
    conditions: [L('Կանխավճար՝ 10%-ից', 'Первый взнос от 10%', 'Down payment from 10%'), L('Ակցիա՝ ստուգեք ժամկետը', 'Акция — уточняйте срок действия', 'Promotion — check validity')],
    url: 'https://www.evoca.am/en/news/products/evoca-mortgage-loan-special-offer', source: 'evoca.am', asOf: '2026'
  },
  {
    bank: 'Inecobank', product: L('Լողացող հիփոթեք՝ ձեռքբերում', 'Плавающая ипотека: покупка', 'Floating mortgage: acquisition'), kind: 'mortgage', currency: 'AMD', rate: [12.5, 13],
    term: L('Առաջին 3 տարին ֆիքսված', 'Первые 3 года — фикс.', 'Fixed for the first 3 years'),
    conditions: [L('12.5%՝ առաջին 3 տարին, հետո լողացող', '12,5% первые 3 года, затем плавающая', '12.5% for the first 3 years, then floating'), L('13%՝ կառուցում և վերանորոգում', '13% — строительство и ремонт', '13% for construction and renovation')],
    url: 'https://www.inecobank.am/en/Individual/mortgage-loans/personal-resources-acquisition-floating', source: 'inecobank.am', asOf: '2026'
  },
  {
    bank: 'IDBank', product: L('Հիփոթեք սփյուռքի համար', 'Ипотека для диаспоры', 'Mortgage for the diaspora'), kind: 'mortgage', currency: 'AMD', rate: [13, 14.5],
    term: L('Ֆիքսված դրույք', 'Фиксированная ставка', 'Fixed rate'),
    conditions: [L('USD՝ 8.9–10.5%, EUR՝ 7.9–9.5%', 'USD: 8,9–10,5%, EUR: 7,9–9,5%', 'USD: 8.9–10.5%, EUR: 7.9–9.5%')],
    url: 'https://idbank.am/en/credits/mortgage/mortgage-loans-for-the-diaspora/', source: 'idbank.am', asOf: '2026'
  },
  {
    bank: 'ACBA Bank', product: L('Հիփոթեք՝ ձեռքբերում', 'Ипотека: покупка', 'Purchase mortgage'), kind: 'mortgage', currency: 'AMD', rate: [13.5, 14.5],
    term: L('Ֆիքսված դրույք', 'Фиксированная ставка', 'Fixed rate'),
    conditions: [L('USD՝ 10.5–11.5%, EUR՝ 9–10%', 'USD: 10,5–11,5%, EUR: 9–10%', 'USD: 10.5–11.5%, EUR: 9–10%')],
    url: 'https://www.acba.am/en/individuals/loans/mortgage/purchase-mortgage', source: 'acba.am', asOf: '2026'
  },

  // ── Consumer loans ────────────────────────────────────────────────────────
  {
    bank: 'Ameriabank', product: L('Անգրավ սպառողական վարկ', 'Потребкредит без залога', 'Unsecured consumer loan'), kind: 'loan', currency: 'AMD', rate: [0, 21.5],
    limits: { amount: [50000, 5000000], term: [6, 60] },
    // 0% applies only to merchant installments, so cash loans are compared at the published maximum.
    compare: [21.5, 21.5],
    term: L('6–60 ամիս', '6–60 мес.', '6–60 months'),
    conditions: [L('Գումար՝ 50 000 – 5 000 000 ֏', 'Сумма: 50 000 – 5 000 000 ֏', 'Amount: AMD 50,000 – 5,000,000'), L('Ամբողջովին առցանց', 'Полностью онлайн', 'Fully online'), L('0%՝ գործընկեր խանութներում', '0% — у партнёров-продавцов', '0% at partner merchants')],
    url: 'https://ameriabank.am/Portals/0/files/Personal/Loans/Consumer_loan_unsecured_eng.pdf', source: 'ameriabank.am, afm.am', asOf: '2026'
  },
  {
    bank: 'Evocabank', product: L('Անշարժ գույքով ապահովված վարկ', 'Кредит под залог недвижимости', 'Property-secured loan'), kind: 'loan', currency: 'AMD', rate: [15, 15], from: true,
    limits: { amount: [0, 100000000], term: [24, 120] },
    term: L('24–120 ամիս', '24–120 мес.', '24–120 months'),
    conditions: [L('Գումար՝ մինչև 100 000 000 ֏', 'Сумма до 100 000 000 ֏', 'Amount up to AMD 100,000,000')],
    url: 'https://www.evoca.am/en/loans', source: 'evoca.am, afm.am', asOf: '2026'
  }
]

// Banks without a verified public rate in our sources — linked, not guessed.
export var BANKS_NO_DATA = [
  { bank: 'Ameriabank', note: L('Ավանդ՝ 50 000 ֏-ից', 'Вклад от 50 000 ֏', 'Deposit from AMD 50,000'), url: 'https://ameriabank.am/en/personal/saving/deposits/ameria-deposit' },
  { bank: 'Converse Bank', note: L('Karas/Progress՝ +0.25% առցանց (>1 տարի)', 'Karas/Progress: +0,25% онлайн (>1 года)', 'Karas/Progress: +0.25% online (>1 year)'), url: 'https://www.conversebank.am/en/deposits/' },
  { bank: 'Armeconombank', note: L('Classic+, Flexible, Child', 'Classic+, Flexible, «Детский»', 'Classic+, Flexible, Child'), url: 'https://www.aeb.am/en/individual/deposit/classic-deposit' },
  { bank: 'Armswissbank', note: L('33 օրից, $20 000 / 10 մլն ֏-ից', 'от 33 дней, от $20 000 / 10 млн ֏', 'from 33 days, from $20,000 / AMD 10M'), url: 'https://www.armswissbank.am/en/individuals/fiz-deposits/' },
  { bank: 'Mellat Bank', note: L('AMD, USD, EUR', 'AMD, USD, EUR', 'AMD, USD, EUR'), url: 'https://www.rate.am/en/bank/mellat-bank' },
  { bank: 'HSBC Armenia', note: L('Անհատական պայմաններ', 'Индивидуальные условия', 'Individual terms'), url: 'https://www.hsbc.am' }
]

// Full, frequently updated comparison tables (external).
export var MORE_SOURCES = [
  { name: 'afm.am — deposits', url: 'https://afm.am/en/deposits' },
  { name: 'afm.am — mortgage', url: 'https://afm.am/en/mortgage' },
  { name: 'afm.am — loans', url: 'https://afm.am/en/loans/consumer-loans' },
  { name: 'rate.am', url: 'https://www.rate.am' }
]

// Offers still valid today (promotions past `validUntil` are dropped).
export function activeOffers(today) {
  var d = today || new Date().toISOString().slice(0, 10)
  return BANK_OFFERS.filter(function(o) { return !o.validUntil || o.validUntil >= d })
}
