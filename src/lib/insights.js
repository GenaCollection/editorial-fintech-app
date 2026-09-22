import { generateAmortization } from '../context/LoanContext.jsx'

// Rule-based loan analysis. Used as the AI advisor's offline fallback when no
// AI provider is configured or the free quota of the provider is exhausted.

var SYM = '֏'
function money(n) { return SYM + Math.round(n).toLocaleString() }
function sumInterest(s) { var x = 0; for (var i = 0; i < s.length; i++) x += s[i].interest; return x }

export function buildLoanSnapshot(ctx) {
  var ls = ctx.loanState
  return {
    amount: ls.amount, rate: ls.rate, term: ls.term, loanType: ls.loanType,
    fee: ls.fee || 0, insurance: ls.insurance || 0,
    monthlyPayment: Math.round(ctx.monthlyPayment),
    totalInterest: Math.round(ctx.totalInterest),
    totalPayment: Math.round(ctx.totalPayment),
    apr: Number(ctx.apr.toFixed(2)),
    payments: ctx.schedule.length,
    extraPayments: ctx.extraPayments || []
  }
}

var TXT = {
  EN: {
    summary: function(d) {
      return 'You borrow ' + money(d.amount) + ' at ' + d.rate + '% for ' + d.term + ' months. ' +
        'The monthly payment is ' + money(d.monthlyPayment) + (d.loanType === 'differentiated' ? ' at the start, then it decreases' : '') + '. ' +
        'Over the whole term you pay ' + money(d.totalInterest) + ' of interest — that is ' + d.overpayPct + '% on top of the loan. ' +
        (d.aprGap > 0.3 ? 'Fees and insurance push the real rate (APR) to ' + d.apr + '%, ' + d.aprGap.toFixed(1) + ' points above the nominal rate.' : 'The real rate (APR) is ' + d.apr + '%.')
    },
    save: function(d) {
      return 'Paying an extra ' + money(d.extra) + ' per month (+10%) would close the loan ' + d.monthsSaved + ' months earlier and save about ' + money(d.extraSaved) + ' in interest. ' +
        (d.rateDownSaved > 0 ? 'Refinancing 2 points lower (' + d.rateDown + '%) would save about ' + money(d.rateDownSaved) + '. ' : '') +
        'Early payments are most effective in the first years, when the interest share is highest.'
    },
    type: function(d) {
      return 'Annuity: equal payments of ' + money(d.annMonthly) + ', total interest ' + money(d.annInterest) + '. ' +
        'Differentiated: starts at ' + money(d.diffFirst) + ' and falls, total interest ' + money(d.diffInterest) + '. ' +
        'Differentiated saves ' + money(Math.max(0, d.annInterest - d.diffInterest)) + ' but needs a higher budget at the start.'
    },
    rate: function(d) {
      var lvl = d.rate < 10 ? 'relatively low' : d.rate <= 16 ? 'moderate' : 'high'
      return 'As a rough guide, ' + d.rate + '% is ' + lvl + ' for a loan in drams. Every 1 point of rate costs you about ' + money(d.perPoint) + ' over this term. ' +
        'Compare at least 3 offers by APR, not only by the nominal rate.'
    }
  },
  RU: {
    summary: function(d) {
      return 'Вы берёте ' + money(d.amount) + ' под ' + d.rate + '% на ' + d.term + ' мес. ' +
        'Платёж — ' + money(d.monthlyPayment) + (d.loanType === 'differentiated' ? ' в начале, дальше он уменьшается' : ' в месяц') + '. ' +
        'За весь срок переплата составит ' + money(d.totalInterest) + ' — это ' + d.overpayPct + '% сверх суммы кредита. ' +
        (d.aprGap > 0.3 ? 'Комиссии и страховка поднимают реальную ставку (APR) до ' + d.apr + '% — на ' + d.aprGap.toFixed(1) + ' п.п. выше номинальной.' : 'Реальная ставка (APR) — ' + d.apr + '%.')
    },
    save: function(d) {
      return 'Если доплачивать ' + money(d.extra) + ' в месяц (+10%), кредит закроется на ' + d.monthsSaved + ' мес. раньше, а экономия на процентах составит около ' + money(d.extraSaved) + '. ' +
        (d.rateDownSaved > 0 ? 'Рефинансирование на 2 п.п. ниже (' + d.rateDown + '%) сэкономит около ' + money(d.rateDownSaved) + '. ' : '') +
        'Досрочные платежи выгоднее всего в первые годы, когда доля процентов максимальна.'
    },
    type: function(d) {
      return 'Аннуитет: равные платежи по ' + money(d.annMonthly) + ', переплата ' + money(d.annInterest) + '. ' +
        'Дифференцированный: первый платёж ' + money(d.diffFirst) + ', дальше меньше, переплата ' + money(d.diffInterest) + '. ' +
        'Дифференцированный экономит ' + money(Math.max(0, d.annInterest - d.diffInterest)) + ', но требует большего бюджета в начале.'
    },
    rate: function(d) {
      var lvl = d.rate < 10 ? 'относительно низкая' : d.rate <= 16 ? 'средняя' : 'высокая'
      return 'Ориентировочно ставка ' + d.rate + '% для кредита в драмах — ' + lvl + '. Каждый 1 п.п. ставки стоит вам примерно ' + money(d.perPoint) + ' за этот срок. ' +
        'Сравните минимум 3 предложения по APR, а не только по номинальной ставке.'
    }
  },
  AM: {
    summary: function(d) {
      return 'Դուք վերցնում եք ' + money(d.amount) + ' ' + d.rate + '% տոկոսադրույքով, ' + d.term + ' ամսով։ ' +
        'Ամսական վճարը ' + money(d.monthlyPayment) + ' է' + (d.loanType === 'differentiated' ? ' սկզբում, հետո նվազում է' : '') + '։ ' +
        'Ամբողջ ժամկետում տոկոսների գերավճարը ' + money(d.totalInterest) + ' է՝ վարկի գումարից ' + d.overpayPct + '% ավելի։ ' +
        (d.aprGap > 0.3 ? 'Միջնորդավճարներն ու ապահովագրությունը իրական տոկոսադրույքը (APR) բարձրացնում են մինչև ' + d.apr + '%։' : 'Իրական տոկոսադրույքը (APR) ' + d.apr + '% է։')
    },
    save: function(d) {
      return 'Եթե ամսական ավելացնեք ' + money(d.extra) + ' (+10%), վարկը կմարվի ' + d.monthsSaved + ' ամիս շուտ, իսկ տոկոսների խնայողությունը կլինի մոտ ' + money(d.extraSaved) + '։ ' +
        (d.rateDownSaved > 0 ? '2 կետով ցածր վերաֆինանսավորումը (' + d.rateDown + '%) կխնայի մոտ ' + money(d.rateDownSaved) + '։ ' : '') +
        'Վաղաժամկետ վճարումներն ամենաարդյունավետն են առաջին տարիներին։'
    },
    type: function(d) {
      return 'Անուիտետ՝ հավասար վճարներ ' + money(d.annMonthly) + ', տոկոսներ՝ ' + money(d.annInterest) + '։ ' +
        'Դիֆերենցված՝ առաջին վճարը ' + money(d.diffFirst) + ', հետո նվազում է, տոկոսներ՝ ' + money(d.diffInterest) + '։ ' +
        'Դիֆերենցվածը խնայում է ' + money(Math.max(0, d.annInterest - d.diffInterest)) + ', բայց սկզբում ավելի մեծ բյուջե է պահանջում։'
    },
    rate: function(d) {
      var lvl = d.rate < 10 ? 'համեմատաբար ցածր' : d.rate <= 16 ? 'միջին' : 'բարձր'
      return 'Մոտավոր գնահատմամբ՝ ' + d.rate + '%-ը դրամային վարկի համար ' + lvl + ' է։ Տոկոսադրույքի յուրաքանչյուր 1 կետը արժե մոտ ' + money(d.perPoint) + '։ ' +
        'Համեմատեք առնվազն 3 առաջարկ ըստ APR-ի։'
    }
  }
}

export function analyzeLoan(snap, topic, lang) {
  var L = TXT[lang] || TXT.EN
  var a = snap.amount, r = snap.rate, n = snap.term
  var d = Object.assign({}, snap)
  d.overpayPct = Math.round(snap.totalInterest / a * 100)
  d.aprGap = snap.apr - r

  if (topic === 'save' || topic === 'all') {
    d.extra = Math.round(snap.monthlyPayment * 0.1)
    var eps = []; for (var i = 1; i <= n; i++) eps.push({ month: i, amount: d.extra })
    var withExtra = generateAmortization(a, r, n, eps, snap.loanType).schedule
    d.monthsSaved = Math.max(0, snap.payments - withExtra.length)
    d.extraSaved = Math.max(0, snap.totalInterest - sumInterest(withExtra))
    d.rateDown = Math.max(0.1, r - 2)
    d.rateDownSaved = Math.max(0, snap.totalInterest - sumInterest(generateAmortization(a, d.rateDown, n, [], snap.loanType).schedule))
  }
  if (topic === 'type') {
    var ann = generateAmortization(a, r, n, [], 'annuity')
    var dif = generateAmortization(a, r, n, [], 'differentiated')
    d.annMonthly = ann.monthlyPayment; d.annInterest = sumInterest(ann.schedule)
    d.diffFirst = dif.monthlyPayment; d.diffInterest = sumInterest(dif.schedule)
  }
  if (topic === 'rate') {
    d.perPoint = Math.max(0, sumInterest(generateAmortization(a, r + 1, n, [], snap.loanType).schedule) - snap.totalInterest)
  }

  if (topic === 'all') return L.summary(d) + '\n\n' + L.save(d)
  return (L[topic] || L.summary)(d)
}
