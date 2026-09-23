/*!
 * ArmFinCredit loan calculator widget.
 *
 *   <div data-armfincredit data-lang="ru" data-amount="5000000" data-rate="12"
 *        data-term="60" data-theme="light" data-accent="1d4ed8"></div>
 *   <script src="https://www.armfincredit.site/embed.js" async></script>
 *
 * Every element with a data-armfincredit attribute becomes a responsive
 * iframe that resizes itself to its content.
 */
(function () {
  'use strict'
  var script = document.currentScript
  var ORIGIN = 'https://www.armfincredit.site'
  try { if (script && script.src) ORIGIN = new URL(script.src).origin } catch (e) {}

  var KEYS = ['lang', 'amount', 'rate', 'term', 'type', 'theme', 'accent', 'ref']
  var counter = 0

  function mount(el) {
    if (el.getAttribute('data-armfincredit-mounted')) return
    el.setAttribute('data-armfincredit-mounted', '1')
    var id = 'armfincredit-' + (++counter) + '-' + Math.random().toString(36).slice(2, 7)
    var params = ['id=' + id]
    KEYS.forEach(function (k) {
      var v = el.getAttribute('data-' + k)
      if (v) params.push(k + '=' + encodeURIComponent(v))
    })
    var iframe = document.createElement('iframe')
    iframe.id = id
    iframe.src = ORIGIN + '/embed?' + params.join('&')
    iframe.title = 'Loan calculator — ArmFinCredit'
    iframe.loading = 'lazy'
    iframe.setAttribute('scrolling', 'no')
    iframe.style.cssText = 'width:100%;max-width:560px;min-height:640px;border:0;display:block;margin:0 auto;background:transparent;overflow:hidden'
    el.appendChild(iframe)
  }

  function mountAll() {
    var nodes = document.querySelectorAll('[data-armfincredit]')
    for (var i = 0; i < nodes.length; i++) mount(nodes[i])
  }

  window.addEventListener('message', function (e) {
    if (e.origin !== ORIGIN || !e.data || e.data.type !== 'armfincredit:height') return
    var frame = e.data.id && document.getElementById(e.data.id)
    var h = Number(e.data.height)
    if (frame && frame.tagName === 'IFRAME' && h > 0 && h < 5000) {
      frame.style.height = h + 'px'
      frame.style.minHeight = '0'
    }
  })

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountAll)
  else mountAll()
})()
