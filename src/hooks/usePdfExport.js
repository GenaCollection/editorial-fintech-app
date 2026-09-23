import { useState } from 'react'
import { t } from '../i18n/labels.js'

var SYM = '\u058f'
var SITE = 'armfincredit-app.vercel.app'
function fmt(n) { return Math.round(n).toLocaleString('en-US') }
function fmtR(n) { return Number(n).toFixed(2) }

// jsPDF's built-in Helvetica has no Armenian, Cyrillic or dram (֏) glyphs, so we
// embed a small subset of Noto Sans (Latin + Cyrillic + Armenian, SIL OFL,
// public/fonts/). Both jsPDF and the fonts are loaded only on first export.
var FONT = 'AFCSans'
var fontsPromise = null

function toBase64(buf) {
  var bytes = new Uint8Array(buf)
  var bin = ''
  for (var i = 0; i < bytes.length; i += 0x8000) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000))
  }
  return btoa(bin)
}

function loadFonts() {
  if (!fontsPromise) {
    fontsPromise = Promise.all(['/fonts/AFCSans-Regular.ttf', '/fonts/AFCSans-Bold.ttf'].map(function(url) {
      return fetch(url).then(function(r) {
        if (!r.ok) throw new Error('font ' + r.status)
        return r.arrayBuffer()
      }).then(toBase64)
    })).catch(function(err) { fontsPromise = null; throw err })
  }
  return fontsPromise
}

function registerFonts(doc, fonts) {
  doc.addFileToVFS('AFCSans-Regular.ttf', fonts[0])
  doc.addFont('AFCSans-Regular.ttf', FONT, 'normal')
  doc.addFileToVFS('AFCSans-Bold.ttf', fonts[1])
  doc.addFont('AFCSans-Bold.ttf', FONT, 'bold')
}

// Month names are hard-coded because browsers without full ICU data (and
// some Chromium builds) fall back to English for 'hy-AM'.
var MONTHS_SHORT = {
  AM: ['Հնվ', 'Փտր', 'Մրտ', 'Ապր', 'Մյս', 'Հնս', 'Հլս', 'Օգս', 'Սեպ', 'Հոկ', 'Նոյ', 'Դեկ'],
  RU: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
  EN: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
}
var MONTHS_GENITIVE = {
  AM: ['հունվարի', 'փետրվարի', 'մարտի', 'ապրիլի', 'մայիսի', 'հունիսի', 'հուլիսի', 'օգոստոսի', 'սեպտեմբերի', 'հոկտեմբերի', 'նոյեմբերի', 'դեկտեմբերի'],
  RU: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
  EN: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
}

function formatToday(lang) {
  var d = new Date(); var m = d.getMonth()
  if (lang === 'AM') return d.getDate() + ' ' + MONTHS_GENITIVE.AM[m] + ' ' + d.getFullYear() + ' թ.'
  if (lang === 'RU') return d.getDate() + ' ' + MONTHS_GENITIVE.RU[m] + ' ' + d.getFullYear() + ' г.'
  return MONTHS_GENITIVE.EN[m] + ' ' + d.getDate() + ', ' + d.getFullYear()
}

function rowMonthLabel(row, lang) {
  if (row.year === undefined) return row.label || ''
  return (MONTHS_SHORT[lang] || MONTHS_SHORT.EN)[row.monthIndex] + ' ' + row.year
}

var WATERMARK_NOTE = {
  AM: 'Հեռացնել ջրանիշը՝ ' + SITE + '/pro',
  RU: 'Убрать водяной знак: ' + SITE + '/pro',
  EN: 'Remove watermark: ' + SITE + '/pro'
}

export function usePdfExport(lang) {
  var arr = useState(false)
  var exporting = arr[0]
  var setExporting = arr[1]

  function getFilename() {
    var d = new Date()
    var dd = String(d.getDate()).padStart(2, '0')
    var mm = String(d.getMonth() + 1).padStart(2, '0')
    return 'ArmFinCredit_' + d.getFullYear() + '-' + mm + '-' + dd + '.pdf'
  }

  function exportPdf(data) {
    if (!data) { console.error('[usePdfExport] no data'); return Promise.resolve() }
    setExporting(true)
    return Promise.all([import('jspdf'), loadFonts()]).then(function(res) {
      var doc = new res[0].jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })
      registerFonts(doc, res[1])
      buildPdf(doc, data)
      doc.save(getFilename())
    }).catch(function(err) {
      console.error('[usePdfExport]', err)
      alert('PDF error: ' + (err && err.message))
    }).then(function() {
      setExporting(false)
    })
  }

  function buildPdf(doc, data) {
      var pw = 210, ph = 297, ml = 12, mr = 12, mt = 14
      var cw = pw - ml - mr
      var y = mt

      var loanState      = data.loanState
      var schedule       = data.schedule
      var monthlyPayment = data.monthlyPayment
      var totalInterest  = data.totalInterest
      var totalPayment   = data.totalPayment
      var apr            = data.apr
      var extraPayments  = data.extraPayments || []
      var isDiff         = loanState.loanType === 'differentiated'
      var firstPayment   = schedule.length > 0 ? schedule[0].payment : monthlyPayment
      var lastPayment    = schedule.length > 0 ? schedule[schedule.length - 1].payment : monthlyPayment

      var today = formatToday(lang)

      // Translate shorthand
      var T = function(section, key) { return t(lang, section, key) }

      function checkPage(needed) {
        if (y + (needed || 10) > ph - 12) {
          doc.addPage()
          y = mt
          doc.setDrawColor(226, 232, 240)
          doc.setLineWidth(0.2)
          doc.rect(ml - 2, mt - 4, cw + 4, ph - mt - 8)
          return true
        }
        return false
      }

      function sectionTitle(txt) {
        checkPage(12)
        y += 4
        doc.setFontSize(7); doc.setFont(FONT, 'bold'); doc.setTextColor(100, 116, 139)
        doc.text(txt.toUpperCase(), ml, y)
        y += 1
        doc.setDrawColor(226, 232, 240); doc.setLineWidth(0.3)
        doc.line(ml, y, ml + cw, y)
        y += 4
      }

      function paramCard(x, cy, cardW, label, value) {
        doc.setFillColor(248, 250, 252); doc.setDrawColor(226, 232, 240); doc.setLineWidth(0.2)
        doc.roundedRect(x, cy, cardW, 12, 1, 1, 'FD')
        doc.setFontSize(6); doc.setFont(FONT, 'normal'); doc.setTextColor(148, 163, 184)
        doc.text(label.toUpperCase(), x + 3, cy + 4)
        doc.setFontSize(9); doc.setFont(FONT, 'bold'); doc.setTextColor(15, 23, 42)
        doc.text(String(value), x + 3, cy + 10)
      }

      // ---- HEADER ----
      doc.setFillColor(29, 78, 216)
      doc.roundedRect(ml - 2, y - 2, 38, 10, 2, 2, 'F')
      doc.setFontSize(12); doc.setFont(FONT, 'bold'); doc.setTextColor(255, 255, 255)
      doc.text('ArmFinCredit', ml + 2, y + 5.5)

      doc.setFontSize(7); doc.setFont(FONT, 'normal'); doc.setTextColor(100, 116, 139)
      var genLabel = lang === 'RU' ? 'Дата:' : lang === 'AM' ? 'Ամսաթիվ՝' : 'Generated:'
      doc.text(genLabel + ' ' + today, pw - mr, y + 3, { align: 'right' })
      doc.setFontSize(6); doc.setTextColor(148, 163, 184)
      doc.text(SITE, pw - mr, y + 7.5, { align: 'right' })

      y += 14
      doc.setDrawColor(29, 78, 216); doc.setLineWidth(0.5)
      doc.line(ml, y, ml + cw, y)
      y += 6

      // ---- LOAN PARAMETERS ----
      sectionTitle(T('calc', 'params'))

      var cardW = (cw - 9) / 4
      var typeLabel = isDiff ? T('calc', 'diff') : T('calc', 'annuity')

      paramCard(ml,               y, cardW, T('calc', 'amount'),  SYM + fmt(loanState.amount))
      paramCard(ml + (cardW+3),   y, cardW, T('calc', 'rate'),    fmtR(loanState.rate) + '%')
      paramCard(ml + (cardW+3)*2, y, cardW, T('calc', 'term'),    loanState.term + ' ' + T('calc', 'months'))
      paramCard(ml + (cardW+3)*3, y, cardW, T('calc', 'type'),    typeLabel)
      y += 16

      if (loanState.fee > 0 || loanState.insurance > 0) {
        var cw2 = (cw - 3) / 2
        if (loanState.fee > 0)       paramCard(ml,       y, cw2, T('adv', 'fee'),       SYM + fmt(loanState.fee))
        if (loanState.insurance > 0) paramCard(ml+cw2+3, y, cw2, T('adv', 'insurance'), SYM + fmt(loanState.insurance))
        y += 16
      }

      // ---- SUMMARY ----
      sectionTitle(T('calc', 'breakd'))

      var sc = (cw - 9) / 4
      var monthlyVal = SYM + fmt(isDiff ? firstPayment : monthlyPayment)

      doc.setFillColor(29, 78, 216)
      doc.roundedRect(ml, y, sc, 16, 1.5, 1.5, 'F')
      doc.setFontSize(6); doc.setFont(FONT, 'normal'); doc.setTextColor(255,255,255)
      doc.setGState(new doc.GState({ opacity: 0.75 }))
      doc.text(T('calc', 'monthly').toUpperCase(), ml + 3, y + 5)
      doc.setGState(new doc.GState({ opacity: 1 }))
      doc.setFontSize(11); doc.setFont(FONT, 'bold'); doc.setTextColor(255,255,255)
      doc.text(monthlyVal, ml + 3, y + 12)
      if (isDiff) {
        doc.setFontSize(6); doc.setFont(FONT, 'normal')
        doc.setGState(new doc.GState({ opacity: 0.7 }))
        doc.text(SYM + fmt(lastPayment), ml + 3, y + 15.5)
        doc.setGState(new doc.GState({ opacity: 1 }))
      }

      var summaryCards = [
        { lbl: T('calc', 'totalInt'), val: SYM + fmt(totalInterest) },
        { lbl: T('calc', 'total'),    val: SYM + fmt(totalPayment) },
        { lbl: 'APR',                  val: fmtR(apr) + '%' }
      ]
      summaryCards.forEach(function(card, i) {
        var cx = ml + (sc + 3) * (i + 1)
        doc.setFillColor(248, 250, 252); doc.setDrawColor(226, 232, 240); doc.setLineWidth(0.2)
        doc.roundedRect(cx, y, sc, 16, 1.5, 1.5, 'FD')
        doc.setFontSize(6); doc.setFont(FONT, 'normal'); doc.setTextColor(100, 116, 139)
        doc.text(card.lbl.toUpperCase(), cx + 3, y + 5)
        doc.setFontSize(10); doc.setFont(FONT, 'bold'); doc.setTextColor(15, 23, 42)
        doc.text(card.val, cx + 3, y + 12)
      })
      y += 22

      // ---- EARLY PAYMENTS ----
      if (extraPayments.length > 0) {
        sectionTitle(T('early', 'title'))
        var col0 = ml, col1 = ml + 30, rowH = 6
        doc.setFillColor(29, 78, 216)
        doc.rect(col0, y, cw, rowH, 'F')
        doc.setFontSize(6.5); doc.setFont(FONT, 'bold'); doc.setTextColor(255,255,255)
        doc.text(T('sched', 'mo'),     col0 + 2, y + 4.2)
        doc.text(T('sched', 'amount'), col1 + 2, y + 4.2)
        y += rowH
        extraPayments.forEach(function(ep, i) {
          checkPage(rowH + 2)
          doc.setFillColor(i % 2 === 0 ? 248 : 255, i % 2 === 0 ? 250 : 255, i % 2 === 0 ? 252 : 255)
          doc.rect(col0, y, cw, rowH, 'F')
          doc.setFontSize(7); doc.setFont(FONT, 'normal'); doc.setTextColor(51, 65, 85)
          doc.text(String(ep.month), col0 + 2, y + 4.2)
          doc.setFont(FONT, 'bold')
          doc.text(SYM + fmt(ep.amount), col1 + 2, y + 4.2)
          y += rowH
        })
        doc.setDrawColor(203, 213, 225); doc.setLineWidth(0.3)
        doc.line(col0, y, col0 + cw, y)
        y += 5
      }

      // ---- AMORTIZATION TABLE ----
      sectionTitle(T('sched', 'title'))

      var hasExtra = extraPayments.length > 0
      var cols = hasExtra ? [
        { lbl: '#',                    x: ml,     w: 10 },
        { lbl: T('sched','month'),     x: ml+10,  w: 22 },
        { lbl: T('sched','payment'),   x: ml+32,  w: 30, r: true },
        { lbl: T('sched','principal'), x: ml+62,  w: 28, r: true },
        { lbl: T('sched','interest'),  x: ml+90,  w: 25, r: true },
        { lbl: T('early','extraCol'),  x: ml+115, w: 25, r: true },
        { lbl: T('sched','balance'),   x: ml+140, w: cw-140, r: true }
      ] : [
        { lbl: '#',                    x: ml,     w: 10 },
        { lbl: T('sched','month'),     x: ml+10,  w: 25 },
        { lbl: T('sched','payment'),   x: ml+35,  w: 35, r: true },
        { lbl: T('sched','principal'), x: ml+70,  w: 33, r: true },
        { lbl: T('sched','interest'),  x: ml+103, w: 30, r: true },
        { lbl: T('sched','balance'),   x: ml+133, w: cw-133, r: true }
      ]

      var tRowH = 5.5

      function drawTableHeader() {
        checkPage(tRowH + 2)
        doc.setFillColor(29, 78, 216)
        doc.rect(ml, y, cw, tRowH + 1, 'F')
        doc.setFontSize(6); doc.setFont(FONT, 'bold'); doc.setTextColor(255,255,255)
        cols.forEach(function(col) {
          col.r
            ? doc.text(col.lbl, col.x + col.w - 1, y + tRowH - 0.8, { align: 'right' })
            : doc.text(col.lbl, col.x + 2,          y + tRowH - 0.8)
        })
        y += tRowH + 1
      }

      drawTableHeader()

      schedule.forEach(function(row, i) {
        if (i > 0 && i % 40 === 0) drawTableHeader()
        if (checkPage(tRowH)) drawTableHeader()

        doc.setFillColor(i % 2 === 0 ? 248 : 255, i % 2 === 0 ? 250 : 255, i % 2 === 0 ? 252 : 255)
        doc.rect(ml, y, cw, tRowH, 'F')
        doc.setFontSize(6.5)

        doc.setFont(FONT, 'bold'); doc.setTextColor(29, 78, 216)
        doc.text(String(row.month), cols[0].x + 2, y + tRowH - 1.2)

        doc.setFont(FONT, 'normal'); doc.setTextColor(51, 65, 85)
        doc.text(rowMonthLabel(row, lang), cols[1].x + 2, y + tRowH - 1.2)

        doc.setFont(FONT, 'bold')
        doc.text(SYM + fmt(row.payment),   cols[2].x + cols[2].w - 1, y + tRowH - 1.2, { align: 'right' })

        doc.setFont(FONT, 'normal')
        doc.text(SYM + fmt(row.principal), cols[3].x + cols[3].w - 1, y + tRowH - 1.2, { align: 'right' })

        doc.setTextColor(5, 150, 105)
        doc.text(SYM + fmt(row.interest),  cols[4].x + cols[4].w - 1, y + tRowH - 1.2, { align: 'right' })

        if (hasExtra) {
          doc.setTextColor(124, 58, 237)
          doc.text(row.extra > 0 ? SYM + fmt(row.extra) : '-', cols[5].x + cols[5].w - 1, y + tRowH - 1.2, { align: 'right' })
        }

        doc.setFont(FONT, 'bold'); doc.setTextColor(15, 23, 42)
        doc.text(SYM + fmt(row.balance), cols[cols.length-1].x + cols[cols.length-1].w - 1, y + tRowH - 1.2, { align: 'right' })

        doc.setDrawColor(241, 245, 249); doc.setLineWidth(0.1)
        doc.line(ml, y + tRowH, ml + cw, y + tRowH)
        y += tRowH
      })

      // total row
      checkPage(tRowH + 2)
      doc.setFillColor(241, 245, 249)
      doc.rect(ml, y, cw, tRowH + 1, 'F')
      doc.setFontSize(6.5); doc.setFont(FONT, 'bold')
      doc.setTextColor(5, 150, 105)
      doc.text(SYM + fmt(totalInterest), cols[4].x + cols[4].w - 1, y + tRowH - 0.8, { align: 'right' })
      doc.setTextColor(15, 23, 42)
      doc.text(SYM + '0', cols[cols.length-1].x + cols[cols.length-1].w - 1, y + tRowH - 0.8, { align: 'right' })
      y += tRowH + 3

      // ---- FOOTER ----
      checkPage(12)
      doc.setDrawColor(226, 232, 240); doc.setLineWidth(0.3)
      doc.line(ml, y, ml + cw, y)
      y += 4
      doc.setFontSize(6); doc.setFont(FONT, 'normal'); doc.setTextColor(148, 163, 184)
      doc.text(t(lang, 'footer', 'disclaimer'), ml, y)
      doc.setFont(FONT, 'bold'); doc.setTextColor(100, 116, 139)
      doc.text('ArmFinCredit — ' + SITE, ml + cw, y, { align: 'right' })

      // page numbers
      var total = doc.internal.getNumberOfPages()
      for (var p = 1; p <= total; p++) {
        doc.setPage(p)
        doc.setFontSize(6); doc.setFont(FONT, 'normal'); doc.setTextColor(148, 163, 184)
        doc.text(p + ' / ' + total, pw / 2, ph - 6, { align: 'center' })
        // Free plan: light diagonal watermark (removed with Pro)
        if (data.watermark) {
          doc.saveGraphicsState && doc.saveGraphicsState()
          if (doc.GState) doc.setGState(new doc.GState({ opacity: 0.08 }))
          doc.setFontSize(46); doc.setFont(FONT, 'bold'); doc.setTextColor(29, 78, 216)
          doc.text('ArmFinCredit Free', pw / 2, ph / 2, { align: 'center', angle: 35 })
          doc.restoreGraphicsState && doc.restoreGraphicsState()
          doc.setFontSize(6); doc.setFont(FONT, 'bold'); doc.setTextColor(37, 99, 235)
          doc.text(WATERMARK_NOTE[lang] || WATERMARK_NOTE.EN, ml, ph - 6)
        }
      }

  }

  return { exportPdf: exportPdf, exporting: exporting }
}
