import { useState } from 'react'

/**
 * usePdfExport — generates PDF from #print-layout via clone strategy.
 *
 * ROOT CAUSE of blank PDF:
 *   html2canvas cannot capture elements positioned at left:-9999px or
 *   inside overflow:hidden parents — it snapshots what the browser
 *   actually renders in the visible layout pipeline.
 *
 * FIX — clone node approach:
 *   1. Clone #print-layout
 *   2. Append clone to document.body with position:fixed, visibility:hidden
 *      so it is part of the render tree but invisible to the user
 *   3. Run html2pdf on the clone
 *   4. Remove clone on success or error (finally)
 *
 * This guarantees html2canvas always gets a fully rendered DOM subtree.
 */
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

  function getErrorText() {
    if (lang === 'AM') return 'PDF \u0561\u0580\u057f\u0561\u570d\u0561\u576f\u0578\u582b\u0568 \u0579\u0570\u0561\u057b\u0578\u572[ \u056c\u0578\u582e\u056e\u057e\u0561\u056e \u056f\u0580\u056f\u056b\u576f \u0583\u0578\u0580\u056e\u0565\u056c:'
    if (lang === 'RU') return '\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u044d\u043a\u0441\u043f\u043e\u0440\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c PDF. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437.'
    return 'Failed to export PDF. Please try again.'
  }

  function exportPdf() {
    if (typeof window.html2pdf === 'undefined') {
      alert(
        lang === 'AM' ? 'html2pdf.js-\u056b \u0562\u0565\u057c\u0576\u057e\u0578\u0582\u0574\u0568 \u0564\u0587\u057c \u0579\u056b \u0561\u057e\u0561\u580f\u057e\u0561\u056e, \u056d\u576f\u564a\u580d\u0578\u0582\u0574 \u0565\u576e \u0574\u056b \u584b\u056b\u563a \u057d\u057a\u0561\u057d\u0587\u0584:'
        : lang === 'RU' ? 'html2pdf.js \u0435\u0449\u0451 \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442\u0441\u044f \u2014 \u043f\u043e\u0434\u043e\u0436\u0434\u0438\u0442\u0435 \u043d\u0435\u043c\u043d\u043e\u0433\u043e.'
        : 'html2pdf.js is not loaded yet \u2014 please wait a moment and try again.'
      )
      return
    }

    var sourceEl = document.getElementById('print-layout')
    if (!sourceEl) {
      console.error('[usePdfExport] #print-layout not found in DOM')
      return
    }

    setExporting(true)

    // --- Clone node and attach to body so html2canvas can render it ---
    var clone = sourceEl.cloneNode(true)
    clone.removeAttribute('id')
    clone.style.cssText = [
      'position:fixed',
      'left:0',
      'top:0',
      'width:900px',
      'z-index:-9999',
      'visibility:hidden',
      'pointer-events:none',
      'background:#ffffff',
      'overflow:visible',
      'display:block'
    ].join(';')
    document.body.appendChild(clone)

    var opt = {
      margin: [8, 8, 8, 8],
      filename: getFilename(),
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 900,
        width: 900,
        logging: false,
        allowTaint: false,
        backgroundColor: '#ffffff'
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      },
      pagebreak: {
        mode: ['css', 'legacy'],
        avoid: ['tr', '.print-no-break']
      }
    }

    function cleanup() {
      try { document.body.removeChild(clone) } catch (e) { /* already removed */ }
      setExporting(false)
    }

    window.html2pdf()
      .set(opt)
      .from(clone)
      .save()
      .then(function () { cleanup() })
      .catch(function (err) {
        console.error('[usePdfExport] export failed:', err)
        cleanup()
        alert(getErrorText())
      })
  }

  return { exportPdf: exportPdf, exporting: exporting }
}
