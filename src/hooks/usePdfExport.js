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
      var dateLabel = lang === 'RU' ? '\u0414\u0430\u0442\u0430:' : lang === 'AM' ? '\u054�\u057f\u0565\u0572\u056e\u057e\u0561\u056e:' : 'Generated:'
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
      var paramLabel = lang === 'RU' ? '\u041f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u044b \u043a\u0440\u0435\u0434\u0438\u0442\u0430' : lang === 'AM' ? '\u054e\u0561\u0580\u056f\u056b \u0553\u0561\u0580\u0561\u0574\u0565\u057f\u0580\u0576\u0565\u0580' : 'Loan Parameters'
      sectionTitle(paramLabel)

      var cardW = (cw - 9) / 4
      var typeLabel = isDiff
        ? (lang === 'RU' ? '\u0414\u0438\u0444\u0444\u0435\u0440\u0435\u043d\u0446.' : lang === 'AM' ? '\u0531\u057a\u056f.' : 'Diff.')
        : (lang === 'RU' ? '\u0410\u043d\u043d\u0443\u0438\u0442\u0435\u0442' : lang === 'AM' ? '\u0531\u576c\u576c\u578578\u056b\u057f\u0565\u057f' : 'Annuity')

      var amountLbl  = lang === 'RU' ? '\u0421\u0443\u043c\u043c\u0430' : lang === 'AM' ? '\u0533\u578578\u0561\u0580' : 'Amount'
      var rateLbl    = lang === 'RU' ? '\u0421\u0442\u0430\u0432\u043a\u0430' : lang === 'AM' ? '\u054f\u0578\u056f\u0578\u057d' : 'Rate'
      var termLbl    = lang === 'RU' ? '\u0421\u0440\u043e\u043a' : lang === 'AM' ? '\u0531\u0574\u056b\u057d\u0576\u0561\u056f\u0576\u0565\u0580' : 'Term'
      var typeLbl    = lang === 'RU' ? '\u0422\u0438\u043f' : lang === 'AM' ? '\u054f\u0565\u057d\u0561\u056f' : 'Type'

      var cx0 = ml
      paramCard(cx0,            y, cardW, amountLbl,  SYM + fmt(loanState.amount))
      paramCard(cx0 + cardW + 3, y, cardW, rateLbl,    fmtR(loanState.rate) + '%')
      paramCard(cx0 + (cardW + 3)*2, y, cardW, termLbl, loanState.term + ' mo')
      paramCard(cx0 + (cardW + 3)*3, y, cardW, typeLbl,  typeLabel)
      y += 16

      if (loanState.fee > 0 || loanState.insurance > 0) {
        var feeLbl = lang === 'RU' ? '\u041a\u043e\u043c\u0438\u0441\u0441\u0438\u044f' : 'Fee'
        var insLbl = lang === 'RU' ? '\u0421\u0442\u0440\u0430\u0445\u043e\u0432\u043a\u0430' : 'Insurance'
        var cw2 = (cw - 3) / 2
        if (loanState.fee > 0) paramCard(ml, y, cw2, feeLbl, SYM + fmt(loanState.fee))
        if (loanState.insurance > 0) paramCard(ml + cw2 + 3, y, cw2, insLbl, SYM + fmt(loanState.insurance))
        y += 16
      }

      // ---- Summary ----
      var summaryLbl = lang === 'RU' ? '\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u044b' : lang === 'AM' ? '\u0531\u0580\u564564\u0575\u578578\u0582\u576576\u576576\u0565\u0580' : 'Summary'
      sectionTitle(summaryLbl)

      var sc = (cw - 9) / 4
      var monthlyLbl  = lang === 'RU' ? '\u0415\u0436\u043c\u0435\u0441\u044f\u0447\u043d\u044b\u0439' : lang === 'AM' ? '\u0531\u0574\u057d\u056f\u0561\u056f\u0561\u576' : 'Monthly'
      var totalIntLbl = lang === 'RU' ? '\u041f\u0440\u043e\u0446\u0435\u043d\u0442\u044b' : lang === 'AM' ? '\u054f\u0578\u056f\u0578\u057d' : 'Interest'
      var totalLbl    = lang === 'RU' ? '\u0418\u0442\u043e\u0433\u043e' : lang === 'AM' ? '\u0531\u0574\u0562\u0578\u572b\u057b' : 'Total'
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
        var earlyLbl = lang === 'RU' ? '\u0414\u043e\u0441\u0440\u043e\u0447\u043d\u044b\u0435 \u043f\u043b\u0430\u0442\u0435\u0436\u0438' : lang === 'AM' ? '\u0531\u0580\u057f\u0561\u0570\u0565\u0580\u0569 \u054e\u ՃՃ\u0561\u0580\u578578\u0582\u0574\u576576\u0565\u0580' : 'Early Payments'
        sectionTitle(earlyLbl)
        var epMoLbl  = lang === 'RU' ? '\u041c\u0435\u0441.' : 'Mo.'
        var epAmtLbl = lang === 'RU' ? '\u0421\u0443\u043c\u043c\u0430' : 'Amount'
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
      var amortLbl = lang === 'RU' ? '\u0413\u0440\u0430\u0444\u0438\u043a \u043f\u043b\u0430\u0442\u0435\u0436\u0435\u0439' : lang === 'AM' ? 'Amortization Schedule' : 'Amortization Schedule'
      sectionTitle(amortLbl)

      var hasExtra = extraPayments.length > 0
      var cols = hasExtra
        ? [
            { lbl: '#',        x: ml,       w: 10 },
            { lbl: lang==='RU'?'\u0414\u0430\u0442\u0430':lang==='AM'?'Date':'Date',    x: ml+10,    w: 22 },
            { lbl: lang==='RU'?'\u041f\u043b\u0430\u0442\u0451\u0436':lang==='AM'?'Payment':'Payment',  x: ml+32,    w: 30, r: true },
            { lbl: lang==='RU'?'\u041e\u0441\u043d.':lang==='AM'?'Princ.':'Princ.',   x: ml+62,    w: 28, r: true },
            { lbl: lang==='RU'?'\u041f\u0440\u043e\u0446.':'%',        x: ml+90,    w: 25, r: true },
            { lbl: lang==='RU'?'\u0414\u043e\u043f.':'Extra',     x: ml+115,   w: 25, r: true },
            { lbl: lang==='RU'?'\u041e\u0441\u0442.':'Balance',   x: ml+140,   w: cw-140, r: true }
          ]
        : [
            { lbl: '#',        x: ml,       w: 10 },
            { lbl: lang==='RU'?'\u0414\u0430\u0442\u0430':lang==='AM'?'Date':'Date',    x: ml+10,    w: 25 },
            { lbl: lang==='RU'?'\u041f\u043b\u0430\u0442\u0451\u0436':lang==='AM'?'Payment':'Payment',  x: ml+35,    w: 35, r: true },
            { lbl: lang==='RU'?'\u041e\u0441\u043d.':lang==='AM'?'Princ.':'Princ.',   x: ml+70,    w: 33, r: true },
            { lbl: lang==='RU'?'\u041f\u0440\u043e\u0446.':'%',        x: ml+103,   w: 30, r: true },
            { lbl: lang==='RU'?'\u041e\u0441\u0442.':'Balance',   x: ml+133,   w: cw-133, r: true }
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
          doc.text(row.extra > 0 ? SYM + fmt(row.extra) : '-', cols[5].x + cols[5].w - 1, y + tRowH - 1.2, { align: 'right' })
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
        ? '\u042d\u0442\u043e\u0442 \u0440\u0430\u0441\u0447\u0451\u0442 \u043d\u043e\u0441\u0438\u0442 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u043e\u043d\u043d\u044b\u0439 \u0445\u0430\u0440\u0430\u043a\u0442\u0435\u0440 \u0438 \u043d\u0435 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u0444\u0438\u043d\u0430\u043d\u0441\u043e\u0432\u044b\u043c \u0441\u043e\u0432\u0435\u0442\u043e\u043c.'
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
        lang === 'RU' ? '\u041e\u0448\u0438\u0431\u043a\u0430 \u0433\u0435\u043d\u0435\u0440\u0430\u0446\u0438\u0438 PDF: ' + err.message
        : 'PDF generation error: ' + err.message
      )
    } finally {
      setExporting(false)
    }
  }

  return { exportPdf: exportPdf, exporting: exporting }
}
