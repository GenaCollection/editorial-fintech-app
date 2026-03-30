import { useState } from 'react'

/**
 * usePdfExport — generates a clean PDF from #print-layout
 * using html2pdf.js loaded globally via CDN in index.html.
 *
 * Key fix: element is positioned off-screen (not display:none)
 * so html2pdf can measure and render it correctly.
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
      alert('html2pdf.js is not loaded yet — please wait a moment and try again.')
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
    el.style.left = '0px'
    el.style.zIndex = '9999'

    var opt = {
      margin:      [8, 8, 8, 8],
      filename:    getFilename(),
      image:       { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollY: 0,
        windowWidth: 960,
        logging: false
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      },
      pagebreak: { mode: ['css', 'legacy'] }
    }

    window.html2pdf()
      .set(opt)
      .from(el)
      .save()
      .then(function () {
        el.style.left = prevLeft
        el.style.zIndex = '-1'
        setExporting(false)
      })
      .catch(function (err) {
        console.error('PDF export failed:', err)
        el.style.left = prevLeft
        el.style.zIndex = '-1'
        setExporting(false)
      })
  }

  return { exportPdf: exportPdf, exporting: exporting }
}
