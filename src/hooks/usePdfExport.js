import { useState } from 'react'

var SYM = '\u058f'
function fmt(n) { return Math.round(n).toLocaleString() }
function fmtR(n) { return Number(n).toFixed(2) }

function L(lang, ru, en) { return lang === 'RU' ? ru : en }

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
    if (!data) { console.error('[usePdfExport] no data'); return }

    var jsPDFLib = window.jspdf && window.jspdf.jsPDF
    if (!jsPDFLib) {
      alert(L(lang, 'jsPDF ещё загружается — подождите и повторите.', 'jsPDF is still loading — please try again.'))
      return
    }

    setExporting(true)
    try {
      var doc = new jsPDFLib({ unit: 'mm', format: 'a4', orientation: 'portrait' })
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

      var today = new Date().toLocaleDateString(
        lang === 'RU' ? 'ru-RU' : 'en-US',
        { year: 'numeric', month: 'long', day: 'numeric' }
      )

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
        doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.setTextColor(100, 116, 139)
        doc.text(txt.toUpperCase(), ml, y)
        y += 1
        doc.setDrawColor(226, 232, 240); doc.setLineWidth(0.3)
        doc.line(ml, y, ml + cw, y)
        y += 4
      }

      function paramCard(x, cy, cardW, label, value) {
        doc.setFillColor(248, 250, 252); doc.setDrawColor(226, 232, 240); doc.setLineWidth(0.2)
        doc.roundedRect(x, cy, cardW, 12, 1, 1, 'FD')
        doc.setFontSize(6); doc.setFont('helvetica', 'normal'); doc.setTextColor(148, 163, 184)
        doc.text(label.toUpperCase(), x + 3, cy + 4)
        doc.setFontSize(9); doc.setFont('helvetica', 'bold'); doc.setTextColor(15, 23, 42)
        doc.text(String(value), x + 3, cy + 10)
      }

      // ---- HEADER ----
      doc.setFillColor(29, 78, 216)
      doc.roundedRect(ml - 2, y - 2, 38, 10, 2, 2, 'F')
      doc.setFontSize(12); doc.setFont('helvetica', 'bold'); doc.setTextColor(255, 255, 255)
      doc.text('ArmFinCredit', ml + 2, y + 5.5)

      doc.setFontSize(7); doc.setFont('helvetica', 'normal'); doc.setTextColor(100, 116, 139)
      doc.text(L(lang, 'Дата:', 'Generated:') + ' ' + today, pw - mr, y + 3, { align: 'right' })
      doc.setFontSize(6); doc.setTextColor(148, 163, 184)
      doc.text('armfincredit.am', pw - mr, y + 7.5, { align: 'right' })

      y += 14
      doc.setDrawColor(29, 78, 216); doc.setLineWidth(0.5)
      doc.line(ml, y, ml + cw, y)
      y += 6

      // ---- LOAN PARAMETERS ----
      sectionTitle(L(lang, 'Параметры кредита', 'Loan Parameters'))

      var cardW = (cw - 9) / 4
      var typeLabel = isDiff
        ? L(lang, 'Дифференц.', 'Diff.')
        : L(lang, 'Аннуитет', 'Annuity')

      paramCard(ml,                   y, cardW, L(lang, 'Сумма',  'Amount'),   SYM + fmt(loanState.amount))
      paramCard(ml + (cardW+3),       y, cardW, L(lang, 'Ставка', 'Rate'),     fmtR(loanState.rate) + '%')
      paramCard(ml + (cardW+3)*2,     y, cardW, L(lang, 'Срок',   'Term'),     loanState.term + ' mo')
      paramCard(ml + (cardW+3)*3,     y, cardW, L(lang, 'Тип',    'Type'),     typeLabel)
      y += 16

      if (loanState.fee > 0 || loanState.insurance > 0) {
        var cw2 = (cw - 3) / 2
        if (loanState.fee > 0)       paramCard(ml,        y, cw2, L(lang, 'Комиссия',  'Fee'),       SYM + fmt(loanState.fee))
        if (loanState.insurance > 0) paramCard(ml+cw2+3,  y, cw2, L(lang, 'Страховка', 'Insurance'), SYM + fmt(loanState.insurance))
        y += 16
      }

      // ---- SUMMARY ----
      sectionTitle(L(lang, 'Результаты', 'Summary'))

      var sc = (cw - 9) / 4
      var monthlyVal = SYM + fmt(isDiff ? firstPayment : monthlyPayment)

      doc.setFillColor(29, 78, 216)
      doc.roundedRect(ml, y, sc, 16, 1.5, 1.5, 'F')
      doc.setFontSize(6); doc.setFont('helvetica', 'normal'); doc.setTextColor(255,255,255)
      doc.setGState(new doc.GState({ opacity: 0.75 }))
      doc.text(L(lang, 'Ежемесячный', 'Monthly').toUpperCase(), ml + 3, y + 5)
      doc.setGState(new doc.GState({ opacity: 1 }))
      doc.setFontSize(11); doc.setFont('helvetica', 'bold'); doc.setTextColor(255,255,255)
      doc.text(monthlyVal, ml + 3, y + 12)
      if (isDiff) {
        doc.setFontSize(6); doc.setFont('helvetica', 'normal')
        doc.setGState(new doc.GState({ opacity: 0.7 }))
        doc.text(SYM + fmt(lastPayment), ml + 3, y + 15.5)
        doc.setGState(new doc.GState({ opacity: 1 }))
      }

      var summaryCards = [
        { lbl: L(lang, 'Проценты', 'Interest'), val: SYM + fmt(totalInterest) },
        { lbl: L(lang, 'Итого',    'Total'),    val: SYM + fmt(totalPayment) },
        { lbl: 'APR',                            val: fmtR(apr) + '%' }
      ]
      summaryCards.forEach(function(card, i) {
        var cx = ml + (sc + 3) * (i + 1)
        doc.setFillColor(248, 250, 252); doc.setDrawColor(226, 232, 240); doc.setLineWidth(0.2)
        doc.roundedRect(cx, y, sc, 16, 1.5, 1.5, 'FD')
        doc.setFontSize(6); doc.setFont('helvetica', 'normal'); doc.setTextColor(100, 116, 139)
        doc.text(card.lbl.toUpperCase(), cx + 3, y + 5)
        doc.setFontSize(10); doc.setFont('helvetica', 'bold'); doc.setTextColor(15, 23, 42)
        doc.text(card.val, cx + 3, y + 12)
      })
      y += 22

      // ---- EARLY PAYMENTS ----
      if (extraPayments.length > 0) {
        sectionTitle(L(lang, 'Досрочные платежи', 'Early Payments'))
        var col0 = ml, col1 = ml + 30, rowH = 6
        doc.setFillColor(29, 78, 216)
        doc.rect(col0, y, cw, rowH, 'F')
        doc.setFontSize(6.5); doc.setFont('helvetica', 'bold'); doc.setTextColor(255,255,255)
        doc.text(L(lang, 'Мес.', 'Mo.'),    col0 + 2, y + 4.2)
        doc.text(L(lang, 'Сумма', 'Amount'), col1 + 2, y + 4.2)
        y += rowH
        extraPayments.forEach(function(ep, i) {
          checkPage(rowH + 2)
          doc.setFillColor(i % 2 === 0 ? 248 : 255, i % 2 === 0 ? 250 : 255, i % 2 === 0 ? 252 : 255)
          doc.rect(col0, y, cw, rowH, 'F')
          doc.setFontSize(7); doc.setFont('helvetica', 'normal'); doc.setTextColor(51, 65, 85)
          doc.text(String(ep.month), col0 + 2, y + 4.2)
          doc.setFont('helvetica', 'bold')
          doc.text(SYM + Number(ep.amount).toLocaleString(), col1 + 2, y + 4.2)
          y += rowH
        })
        doc.setDrawColor(203, 213, 225); doc.setLineWidth(0.3)
        doc.line(col0, y, col0 + cw, y)
        y += 5
      }

      // ---- AMORTIZATION TABLE ----
      sectionTitle(L(lang, 'График платежей', 'Amortization Schedule'))

      var hasExtra = extraPayments.length > 0
      var cols = hasExtra ? [
        { lbl: '#',                            x: ml,      w: 10 },
        { lbl: L(lang, 'Дата',    'Date'),     x: ml+10,   w: 22 },
        { lbl: L(lang, 'Платёж',  'Payment'),  x: ml+32,   w: 30, r: true },
        { lbl: L(lang, 'Осн.',    'Princ.'),   x: ml+62,   w: 28, r: true },
        { lbl: L(lang, 'Проц.',   '%'),         x: ml+90,   w: 25, r: true },
        { lbl: L(lang, 'Доп.',    'Extra'),    x: ml+115,  w: 25, r: true },
        { lbl: L(lang, 'Ост.',    'Balance'),  x: ml+140,  w: cw-140, r: true }
      ] : [
        { lbl: '#',                            x: ml,      w: 10 },
        { lbl: L(lang, 'Дата',    'Date'),     x: ml+10,   w: 25 },
        { lbl: L(lang, 'Платёж',  'Payment'),  x: ml+35,   w: 35, r: true },
        { lbl: L(lang, 'Осн.',    'Princ.'),   x: ml+70,   w: 33, r: true },
        { lbl: L(lang, 'Проц.',   '%'),         x: ml+103,  w: 30, r: true },
        { lbl: L(lang, 'Ост.',    'Balance'),  x: ml+133,  w: cw-133, r: true }
      ]

      var tRowH = 5.5

      function drawTableHeader() {
        checkPage(tRowH + 2)
        doc.setFillColor(29, 78, 216)
        doc.rect(ml, y, cw, tRowH + 1, 'F')
        doc.setFontSize(6); doc.setFont('helvetica', 'bold'); doc.setTextColor(255,255,255)
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

        doc.setFont('helvetica', 'bold'); doc.setTextColor(29, 78, 216)
        doc.text(String(row.month), cols[0].x + 2, y + tRowH - 1.2)

        doc.setFont('helvetica', 'normal'); doc.setTextColor(51, 65, 85)
        doc.text(row.label || '', cols[1].x + 2, y + tRowH - 1.2)

        doc.setFont('helvetica', 'bold')
        doc.text(SYM + fmt(row.payment),    cols[2].x + cols[2].w - 1, y + tRowH - 1.2, { align: 'right' })

        doc.setFont('helvetica', 'normal')
        doc.text(SYM + fmt(row.principal),  cols[3].x + cols[3].w - 1, y + tRowH - 1.2, { align: 'right' })

        doc.setTextColor(5, 150, 105)
        doc.text(SYM + fmt(row.interest),   cols[4].x + cols[4].w - 1, y + tRowH - 1.2, { align: 'right' })

        if (hasExtra) {
          doc.setTextColor(124, 58, 237)
          doc.text(row.extra > 0 ? SYM + fmt(row.extra) : '-', cols[5].x + cols[5].w - 1, y + tRowH - 1.2, { align: 'right' })
        }

        doc.setFont('helvetica', 'bold'); doc.setTextColor(15, 23, 42)
        doc.text(SYM + fmt(row.balance), cols[cols.length-1].x + cols[cols.length-1].w - 1, y + tRowH - 1.2, { align: 'right' })

        doc.setDrawColor(241, 245, 249); doc.setLineWidth(0.1)
        doc.line(ml, y + tRowH, ml + cw, y + tRowH)
        y += tRowH
      })

      // total row
      checkPage(tRowH + 2)
      doc.setFillColor(241, 245, 249)
      doc.rect(ml, y, cw, tRowH + 1, 'F')
      doc.setFontSize(6.5); doc.setFont('helvetica', 'bold')
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
      doc.setFontSize(6); doc.setFont('helvetica', 'normal'); doc.setTextColor(148, 163, 184)
      doc.text(
        L(lang,
          'Этот расчёт носит информационный характер и не является финансовым советом.',
          'This calculation is for informational purposes only and does not constitute financial advice.'
        ), ml, y
      )
      doc.setFont('helvetica', 'bold'); doc.setTextColor(100, 116, 139)
      doc.text('ArmFinCredit — armfincredit.am', ml + cw, y, { align: 'right' })

      // page numbers
      var total = doc.internal.getNumberOfPages()
      for (var p = 1; p <= total; p++) {
        doc.setPage(p)
        doc.setFontSize(6); doc.setFont('helvetica', 'normal'); doc.setTextColor(148, 163, 184)
        doc.text(p + ' / ' + total, pw / 2, ph - 6, { align: 'center' })
      }

      doc.save(getFilename())
    } catch(err) {
      console.error('[usePdfExport]', err)
      alert(L(lang, 'Ошибка PDF: ' + err.message, 'PDF error: ' + err.message))
    } finally {
      setExporting(false)
    }
  }

  return { exportPdf: exportPdf, exporting: exporting }
}
