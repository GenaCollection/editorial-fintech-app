import { useState } from 'react'

/**
 * usePdfExport — generates PDF from #print-layout via clone strategy.
 *
 * ROOT CAUSE of blank PDF:
 *   html2canvas cannot capture elements that are:
 *   - positioned off-screen (left: -9999px) but inside overflow:hidden
 *   - have height:0 or height:1px on any ancestor
 *   The clone must be rendered with full natural dimensions.
 *
 * FIX — clone + position:fixed + visibility:hidden:
 *   Clone is appended to document.body with fixed positioning and
 *   visibility:hidden. It is in the render tree (html2canvas can capture it)
 *   but invisible to the user. No overflow:hidden ancestor clips it.
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
    if (lang === 'AM') return 'PDF արտահանումը ձախողվեց: Խնդրում ենք կրկին փորձել:'
    if (lang === 'RU') return 'Не удалось экспортировать PDF. Попробуйте ещё раз.'
    return 'Failed to export PDF. Please try again.'
  }

  function exportPdf() {
    if (typeof window.html2pdf === 'undefined') {
      alert(
        lang === 'AM' ? 'html2pdf.js-ի բեռնումը դեռ չի ավարտվել, խնդրում ենք մի քիչ սպասել:'
        : lang === 'RU' ? 'html2pdf.js ещё загружается — подождите немного.'
        : 'html2pdf.js is not loaded yet — please wait a moment and try again.'
      )
      return
    }

    var sourceEl = document.getElementById('print-layout')
    if (!sourceEl) {
      console.error('[usePdfExport] #print-layout not found in DOM')
      return
    }

    setExporting(true)

    // Deep-clone the print layout node
    var clone = sourceEl.cloneNode(true)
    clone.removeAttribute('id')

    // Position clone in the render tree but hidden:
    // position:fixed keeps it out of normal flow,
    // visibility:hidden makes it invisible but still rendered by browser & html2canvas.
    // No overflow:hidden ancestor — full natural height is captured.
    clone.style.cssText = [
      'position:fixed',
      'left:0',
      'top:0',
      'width:900px',
      'z-index:-9999',
      'visibility:hidden',
      'pointer-events:none',
      'background:#ffffff',
      'overflow:visible'
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
        backgroundColor: '#ffffff',
        // Tell html2canvas to ignore visibility:hidden so it captures the clone
        ignoreElements: function(el) {
          return false
        }
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
      .then(function() { cleanup() })
      .catch(function(err) {
        console.error('[usePdfExport] export failed:', err)
        cleanup()
        alert(getErrorText())
      })
  }

  return { exportPdf: exportPdf, exporting: exporting }
}
