import { useState } from 'react'

/**
 * usePdfExport — generates a clean PDF from #print-layout
 * using html2pdf.js loaded globally via CDN in index.html.
 *
 * Fixes:
 * 1. finally block — element always restores position even on error
 * 2. windowWidth: 940 matches PrintLayout width (900px + 2×20px padding)
 * 3. pagebreak avoid on table rows for long schedules
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

  function exportPdf() {
    if (typeof window.html2pdf === 'undefined') {
      alert(
        lang === 'AM' ? 'html2pdf.js-ը դեռ բեռնված չէ, խնդրում ենք մի քիչ սպասեք:'
        : lang === 'RU' ? 'html2pdf.js ещё загружается — подождите немного.'
        : 'html2pdf.js is not loaded yet — please wait a moment and try again.'
      )
      return
    }

    var el = document.getElementById('print-layout')
    if (!el) {
      console.error('PrintLayout element #print-layout not found')
      return
    }

    setExporting(true)

    // Temporarily move into viewport so html2pdf renders correctly
    var prevLeft = el.style.left
    var prevZIndex = el.style.zIndex
    el.style.left = '0px'
    el.style.top = '0px'
    el.style.zIndex = '9999'

    var opt = {
      margin:      [8, 8, 8, 8],
      filename:    getFilename(),
      image:       { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollY: 0,
        // Match PrintLayout width (900px) + 2×20px safe padding
        windowWidth: 940,
        logging: false,
        allowTaint: false
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      },
      // avoid: table rows prevent mid-row page breaks on long schedules
      pagebreak: { mode: ['css', 'legacy'], avoid: ['tr', '.print-no-break'] }
    }

    function restoreEl() {
      el.style.left = prevLeft
      el.style.top = '0'
      el.style.zIndex = prevZIndex
      setExporting(false)
    }

    window.html2pdf()
      .set(opt)
      .from(el)
      .save()
      .then(function () {
        restoreEl()
      })
      .catch(function (err) {
        console.error('PDF export failed:', err)
        restoreEl()
      })
  }

  return { exportPdf: exportPdf, exporting: exporting }
}
