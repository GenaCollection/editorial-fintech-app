import { useState } from 'react'

/**
 * usePdfExport — generates a PDF from the #print-layout element
 * using html2pdf.js loaded via CDN in index.html.
 *
 * Usage:
 *   var { exportPdf, exporting } = usePdfExport(lang)
 *   <button onClick={exportPdf} disabled={exporting}>PDF</button>
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
    // html2pdf is loaded globally via CDN script in index.html
    if (typeof window.html2pdf === 'undefined') {
      console.error('html2pdf.js not loaded yet')
      return
    }

    var el = document.getElementById('print-layout')
    if (!el) {
      console.error('PrintLayout element #print-layout not found')
      return
    }

    setExporting(true)

    // Temporarily show the element so html2pdf can render it
    var prevDisplay = el.style.display
    el.style.display = 'block'

    var opt = {
      margin:      [10, 10, 10, 10],       // mm: top, left, bottom, right
      filename:    getFilename(),
      image:       { type: 'jpeg', quality: 0.97 },
      html2canvas: {
        scale: 2,                            // retina quality
        useCORS: true,
        scrollY: 0,
        windowWidth: 900
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    }

    window.html2pdf()
      .set(opt)
      .from(el)
      .save()
      .then(function() {
        el.style.display = prevDisplay
        setExporting(false)
      })
      .catch(function(err) {
        console.error('PDF export failed:', err)
        el.style.display = prevDisplay
        setExporting(false)
      })
  }

  return { exportPdf: exportPdf, exporting: exporting }
}
