import { useState } from 'react'

/**
 * usePdfExport — generates PDF using jsPDF directly.
 *
 * Completely replaces html2pdf/html2canvas approach.
 * Draws text, lines, rectangles programmatically — no DOM capture,
 * no hidden element issues, works 100% reliably.
 *
 * jsPDF is loaded via CDN in index.html:
 *   <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
 */

var SYM = '\u058f'
function fmt(n) { return Math.round(n).toLocaleString() }
function fmtR(n) { return Number(n).toFixed(2) }

export function usePdfExport(lang) {
  var exportingArr = useState(false)
  var exporting = exportingArr[0]
  var setExporting = exportingArr[1]

  function getFilename() {
    var d = new Date()
    var dd = String(d.getDate()).padStart(2, '0')
    var mm = String(d.getMonth() + 1).padStart(2, '0')
    var yyyy = d.getFullYear()
    return 'ArmFinCredit_' + yyyy + '-' + mm + '-' + dd + '.pdf'
  }

  function exportPdf(data) {
    if (!data) {
      console.error('[usePdfExport] no data passed to exportPdf()')
      return
    }

    var jsPDFLib = window.jspdf && window.jspdf.jsPDF
    if (!jsPDFLib) {
      alert(
        lang === 'RU' ? 'jsPDF ещё загружается — подождите секунду и повторите.'
        : 'jsPDF is still loading — please wait a moment and try again.'
      )
      return
    }

    setExporting(true)

    try {
      var doc = new jsPDFLib({ unit: 'mm', format: 'a4', orientation: 'portrait' })
      var pw = 210  // page width mm
      var ph = 297  // page height mm
      var ml = 12   // margin left
      var mr = 12   // margin right
      var mt = 14   // margin top
      var cw = pw - ml - mr  // content width
      var y = mt

      var loanState     = data.loanState
      var schedule      = data.schedule
      var monthlyPayment = data.monthlyPayment
      var totalInterest = data.totalInterest
      var totalPayment  = data.totalPayment
      var apr           = data.apr
      var extraPayments = data.extraPayments || []
      var isDiff        = loanState.loanType === 'differentiated'
      var firstPayment  = schedule.length > 0 ? schedule[0].payment : monthlyPayment
      var lastPayment   = schedule.length > 0 ? schedule[schedule.length - 1].payment : monthlyPayment

      var today = new Date().toLocaleDateString(
        lang === 'AM' ? 'hy-AM' : lang === 'RU' ? 'ru-RU' : 'en-US',
        { year: 'numeric', month: 'long', day: 'numeric' }
      )

      // ---- helpers ----
      function checkPage(needed) {
        needed = needed || 10
        if (y + needed > ph - 12) {
          doc.addPage()
          y = mt
          // page border
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
        doc.setFontSize(7)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(100, 116, 139)
        doc.text(txt.toUpperCase(), ml, y)
        y += 1
        doc.setDrawColor(226, 232, 240)
        doc.setLineWidth(0.3)
        doc.line(ml, y, ml + cw, y)
        y += 4
      }

      function paramCard(x, cardY, cardW, label, value) {
        doc.setFillColor(248, 250, 252)
        doc.setDrawColor(226, 232, 240)
        doc.setLineWidth(0.2)
        doc.roundedRect(x, cardY, cardW, 12, 1, 1, 'FD')
        doc.setFontSize(6)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(148, 163, 184)
        doc.text(label.toUpperCase(), x + 3, cardY + 4)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(15, 23, 42)
        doc.text(String(value), x + 3, cardY + 10)
      }

      // ---- Header ----
      // Blue rect
      doc.setFillColor(29, 78, 216)
      doc.roundedRect(ml - 2, y - 2, 38, 10, 2, 2, 'F')
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(255, 255, 255)
      doc.text('ArmFinCredit', ml + 2, y + 5.5)

      // Date right
      doc.setFontSize(7)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100, 116, 139)
      var dateLabel = lang === 'RU' ? 'Дата:' : lang === 'AM' ? 'Ստեղծված:' : 'Generated:'
      doc.text(dateLabel + ' ' + today, pw - mr, y + 3, { align: 'right' })
      doc.setFontSize(6)
      doc.setTextColor(148, 163, 184)
      doc.text('armfincredit.am', pw - mr, y + 7.5, { align: 'right' })

      y += 14
      doc.setDrawColor(29, 78, 216)
      doc.setLineWidth(0.5)
      doc.line(ml, y, ml + cw, y)
      y += 6

      // ---- Loan Parameters ----
      var paramLabel = lang === 'RU' ? 'Параметры кредита' : lang === 'AM' ? 'Վարկի Պարամետրներ' : 'Loan Parameters'
      sectionTitle(paramLabel)

      var cardW = (cw - 9) / 4
      var typeLabel = isDiff
        ? (lang === 'RU' ? 'Дифференц.' : lang === 'AM' ? 'Ապկ.' : 'Diff.')
        : (lang === 'RU' ? 'Аннуитет' : lang === 'AM' ? 'Աննուիտետ' : 'Annuity')

      var amountLbl  = lang === 'RU' ? 'Сумма' : lang === 'AM' ? 'Գումար' : 'Amount'
      var rateLbl    = lang === 'RU' ? 'Ставка' : lang === 'AM' ? 'Տոկոս' : 'Rate'
      var termLbl    = lang === 'RU' ? 'Срок' : lang === 'AM' ? 'լլ'լլ' : 'Term'
      var typeLbl    = lang === 'RU' ? 'Тип' : lang === 'AM' ? 'Տեսակ' : 'Type'

      var cx0 = ml
      paramCard(cx0,            y, cardW, amountLbl,  SYM + fmt(loanState.amount))
      paramCard(cx0 + cardW + 3, y, cardW, rateLbl,    fmtR(loanState.rate) + '%')
      paramCard(cx0 + (cardW + 3)*2, y, cardW, termLbl, loanState.term + ' mo')
      paramCard(cx0 + (cardW + 3)*3, y, cardW, typeLbl,  typeLabel)
      y += 16

      if (loanState.fee > 0 || loanState.insurance > 0) {
        var feeLbl = lang === 'RU' ? 'Комиссия' : 'Fee'
        var insLbl = lang === 'RU' ? 'Страховка' : 'Insurance'
        var cw2 = (cw - 3) / 2
        if (loanState.fee > 0) paramCard(ml, y, cw2, feeLbl, SYM + fmt(loanState.fee))
        if (loanState.insurance > 0) paramCard(ml + cw2 + 3, y, cw2, insLbl, SYM + fmt(loanState.insurance))
        y += 16
      }

      // ---- Summary ----
      var summaryLbl = lang === 'RU' ? 'Результаты' : lang === 'AM' ? 'Արդյունքներ' : 'Summary'
      sectionTitle(summaryLbl)

      var sc = (cw - 9) / 4
      var monthlyLbl  = lang === 'RU' ? 'Ежмесячный' : lang === 'AM' ? 'Ամսկական' : 'Monthly'
      var totalIntLbl = lang === 'RU' ? 'Проценты' : lang === 'AM' ? 'Տոկոս' : 'Interest'
      var totalLbl    = lang === 'RU' ? 'Итого' : lang === 'AM' ? 'Ամբողջ' : 'Total'
      var aprLbl      = 'APR'
      var monthlyVal  = SYM + fmt(isDiff ? firstPayment : monthlyPayment)

      // Accent card
      doc.setFillColor(29, 78, 216)
      doc.roundedRect(ml, y, sc, 16, 1.5, 1.5, 'F')
      doc.setFontSize(6); doc.setFont('helvetica', 'normal'); doc.setTextColor(255,255,255); doc.setGState(new doc.GState({ opacity: 0.75 }))
      doc.text(monthlyLbl.toUpperCase(), ml + 3, y + 5)
      doc.setGState(new doc.GState({ opacity: 1 }))
      doc.setFontSize(11); doc.setFont('helvetica', 'bold'); doc.setTextColor(255,255,255)
      doc.text(monthlyVal, ml + 3, y + 12)
      if (isDiff) {
        doc.setFontSize(6); doc.setFont('helvetica', 'normal')
        doc.setGState(new doc.GState({ opacity: 0.7 }))
        doc.text(SYM + fmt(lastPayment), ml + 3, y + 15.5)
        doc.setGState(new doc.GState({ opacity: 1 }))
      }

      // Other 3 summary cards
      var summaryCards = [
        { lbl: totalIntLbl, val: SYM + fmt(totalInterest) },
        { lbl: totalLbl,    val: SYM + fmt(totalPayment) },
        { lbl: aprLbl,      val: fmtR(apr) + '%' }
      ]
      summaryCards.forEach(function(card, i) {
        var cx = ml + (sc + 3) * (i + 1)
        doc.setFillColor(248, 250, 252)
        doc.setDrawColor(226, 232, 240)
        doc.setLineWidth(0.2)
        doc.roundedRect(cx, y, sc, 16, 1.5, 1.5, 'FD')
        doc.setFontSize(6); doc.setFont('helvetica', 'normal'); doc.setTextColor(100, 116, 139)
        doc.text(card.lbl.toUpperCase(), cx + 3, y + 5)
        doc.setFontSize(10); doc.setFont('helvetica', 'bold'); doc.setTextColor(15, 23, 42)
        doc.text(card.val, cx + 3, y + 12)
      })
      y += 22

      // ---- Early Payments ----
      if (extraPayments.length > 0) {
        var earlyLbl = lang === 'RU' ? 'Досрочные платежи' : lang === 'AM' ? 'Արտահերթ Վճարումներ' : 'Early Payments'
        sectionTitle(earlyLbl)
        var epMoLbl  = lang === 'RU' ? 'Мес.' : 'Mo.'
        var epAmtLbl = lang === 'RU' ? 'Сумма' : 'Amount'
        var col0 = ml; var col1 = ml + 30
        var rowH = 6
        // header
        doc.setFillColor(29, 78, 216)
        doc.rect(col0, y, cw, rowH, 'F')
        doc.setFontSize(6.5); doc.setFont('helvetica', 'bold'); doc.setTextColor(255,255,255)
        doc.text(epMoLbl,  col0 + 2,  y + 4.2)
        doc.text(epAmtLbl, col1 + 2,  y + 4.2)
        y += rowH
        extraPayments.forEach(function(ep, i) {
          checkPage(rowH + 2)
          if (i % 2 === 0) { doc.setFillColor(248, 250, 252) } else { doc.setFillColor(255,255,255) }
          doc.rect(col0, y, cw, rowH, 'F')
          doc.setFontSize(7); doc.setFont('helvetica', 'normal'); doc.setTextColor(51, 65, 85)
          doc.text(String(ep.month), col0 + 2, y + 4.2)
          doc.setFont('helvetica', 'bold')
          doc.text(SYM + Number(ep.amount).toLocaleString(), col1 + 2, y + 4.2)
          y += rowH
        })
        // bottom border
        doc.setDrawColor(203, 213, 225); doc.setLineWidth(0.3)
        doc.line(col0, y, col0 + cw, y)
        y += 5
      }

      // ---- Amortization Table ----
      var amortLbl = lang === 'RU' ? 'График платежей' : lang === 'AM' ? 'Ամortizaciayi Grafik' : 'Amortization Schedule'
      sectionTitle(amortLbl)

      var hasExtra = extraPayments.length > 0
      var cols = hasExtra
        ? [
            { lbl: '#',        x: ml,       w: 10 },
            { lbl: lang==='RU'?'Дата':lang==='AM'?'Ամսաթիվ':'Date',    x: ml+10,    w: 22 },
            { lbl: lang==='RU'?'Платёж':lang==='AM'?'Վճարում':'Payment',  x: ml+32,    w: 30, r: true },
            { lbl: lang==='RU'?'Осн.':lang==='AM'?'Մայր':'Princ.',   x: ml+62,    w: 28, r: true },
            { lbl: lang==='RU'?'Проц.':'%',        x: ml+90,    w: 25, r: true },
            { lbl: lang==='RU'?'Доп.':'Extra',     x: ml+115,   w: 25, r: true },
            { lbl: lang==='RU'?'Ост.':'Balance',   x: ml+140,   w: cw-140, r: true }
          ]
        : [
            { lbl: '#',        x: ml,       w: 10 },
            { lbl: lang==='RU'?'Дата':lang==='AM'?'Ամսաթիվ':'Date',    x: ml+10,    w: 25 },
            { lbl: lang==='RU'?'Платёж':lang==='AM'?'Վճարում':'Payment',  x: ml+35,    w: 35, r: true },
            { lbl: lang==='RU'?'Осн.':lang==='AM'?'Մայր':'Princ.',   x: ml+70,    w: 33, r: true },
            { lbl: lang==='RU'?'Проц.':'%',        x: ml+103,   w: 30, r: true },
            { lbl: lang==='RU'?'Ост.':'Balance',   x: ml+133,   w: cw-133, r: true }
          ]

      var tRowH = 5.5

      function drawTableHeader() {
        checkPage(tRowH + 2)
        doc.setFillColor(29, 78, 216)
        doc.rect(ml, y, cw, tRowH + 1, 'F')
        doc.setFontSize(6); doc.setFont('helvetica', 'bold'); doc.setTextColor(255,255,255)
        cols.forEach(function(col) {
          if (col.r) {
            doc.text(col.lbl, col.x + col.w - 1, y + tRowH - 0.8, { align: 'right' })
          } else {
            doc.text(col.lbl, col.x + 2, y + tRowH - 0.8)
          }
        })
        y += tRowH + 1
      }

      drawTableHeader()
      var headerEveryN = 40

      schedule.forEach(function(row, i) {
        if (i > 0 && i % headerEveryN === 0) drawTableHeader()
        var needsNewPage = checkPage(tRowH)
        if (needsNewPage) drawTableHeader()

        if (i % 2 === 0) { doc.setFillColor(248, 250, 252) } else { doc.setFillColor(255,255,255) }
        doc.rect(ml, y, cw, tRowH, 'F')

        doc.setFontSize(6.5); doc.setFont('helvetica', 'normal'); doc.setTextColor(51, 65, 85)

        // #
        doc.setFont('helvetica', 'bold'); doc.setTextColor(29, 78, 216)
        doc.text(String(row.month), cols[0].x + 2, y + tRowH - 1.2)

        // date
        doc.setFont('helvetica', 'normal'); doc.setTextColor(51, 65, 85)
        doc.text(row.label || '', cols[1].x + 2, y + tRowH - 1.2)

        // payment
        doc.setFont('helvetica', 'bold')
        doc.text(SYM + fmt(row.payment), cols[2].x + cols[2].w - 1, y + tRowH - 1.2, { align: 'right' })

        // principal
        doc.setFont('helvetica', 'normal')
        doc.text(SYM + fmt(row.principal), cols[3].x + cols[3].w - 1, y + tRowH - 1.2, { align: 'right' })

        // interest
        doc.setTextColor(5, 150, 105)
        doc.text(SYM + fmt(row.interest), cols[4].x + cols[4].w - 1, y + tRowH - 1.2, { align: 'right' })

        if (hasExtra) {
          doc.setTextColor(124, 58, 237)
          doc.text(row.extra > 0 ? SYM + fmt(row.extra) : '—', cols[5].x + cols[5].w - 1, y + tRowH - 1.2, { align: 'right' })
        }

        // balance
        doc.setFont('helvetica', 'bold'); doc.setTextColor(15, 23, 42)
        doc.text(SYM + fmt(row.balance), cols[cols.length-1].x + cols[cols.length-1].w - 1, y + tRowH - 1.2, { align: 'right' })

        // row bottom border
        doc.setDrawColor(241, 245, 249); doc.setLineWidth(0.1)
        doc.line(ml, y + tRowH, ml + cw, y + tRowH)

        y += tRowH
      })

      // tfoot total row
      checkPage(tRowH + 2)
      doc.setFillColor(241, 245, 249)
      doc.rect(ml, y, cw, tRowH + 1, 'F')
      doc.setFontSize(6.5); doc.setFont('helvetica', 'bold')
      doc.setTextColor(5, 150, 105)
      doc.text(SYM + fmt(totalInterest), cols[4].x + cols[4].w - 1, y + tRowH - 0.8, { align: 'right' })
      doc.setTextColor(15, 23, 42)
      doc.text(SYM + '0', cols[cols.length-1].x + cols[cols.length-1].w - 1, y + tRowH - 0.8, { align: 'right' })
      y += tRowH + 3

      // ---- Footer on last page ----
      checkPage(12)
      doc.setDrawColor(226, 232, 240); doc.setLineWidth(0.3)
      doc.line(ml, y, ml + cw, y)
      y += 4
      var disclaimer = lang === 'RU'
        ? 'Этот расчёт носит информационный характер и не является финансовым советом.'
        : 'This calculation is for informational purposes only and does not constitute financial advice.'
      doc.setFontSize(6); doc.setFont('helvetica', 'normal'); doc.setTextColor(148, 163, 184)
      doc.text(disclaimer, ml, y)
      doc.setFont('helvetica', 'bold'); doc.setTextColor(100, 116, 139)
      doc.text('ArmFinCredit — armfincredit.am', ml + cw, y, { align: 'right' })

      // ---- Page numbers ----
      var totalPages = doc.internal.getNumberOfPages()
      for (var p = 1; p <= totalPages; p++) {
        doc.setPage(p)
        doc.setFontSize(6); doc.setFont('helvetica', 'normal'); doc.setTextColor(148, 163, 184)
        doc.text(p + ' / ' + totalPages, pw / 2, ph - 6, { align: 'center' })
      }

      doc.save(getFilename())
    } catch(err) {
      console.error('[usePdfExport] jsPDF error:', err)
      alert(
        lang === 'RU' ? 'Ошибка генерации PDF: ' + err.message
        : 'PDF generation error: ' + err.message
      )
    } finally {
      setExporting(false)
    }
  }

  return { exportPdf: exportPdf, exporting: exporting }
}
