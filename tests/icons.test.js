import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { scanIcons } from '../scripts/icons.js'

// The build also checks the prerendered pages against this list
// (scripts/prerender.js), so a missing icon fails the deploy.

test('icon scan finds static, conditional and data-driven icons', function() {
  var icons = scanIcons(fileURLToPath(new URL('../src', import.meta.url)))
  ;['home', 'calculate', 'dark_mode', 'light_mode', 'menu', 'close', 'savings', 'payments'].forEach(function(n) {
    assert.ok(icons.indexOf(n) >= 0, 'missing ' + n)
  })
  assert.ok(icons.indexOf('light') < 0, 'comparison literal picked up as an icon')
  assert.deepEqual(icons, icons.slice().sort(), 'Google Fonts needs icon_names sorted')
  icons.forEach(function(n) { assert.match(n, /^[a-z][a-z0-9_]*$/) })
})

// Icons chosen at runtime must come from an `icon: '…'` property (or a
// literal ternary) so the scan can see them; anything else could be missing
// from the font subset without the build noticing (e.g. inside a modal).
test('dynamic icons use the scannable `x.icon` form', function() {
  var src = fileURLToPath(new URL('../src', import.meta.url))
  var bad = []
  ;(function walk(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(function(e) {
      var p = path.join(dir, e.name)
      if (e.isDirectory()) return walk(p)
      if (!/\.jsx?$/.test(e.name)) return
      var s = fs.readFileSync(p, 'utf8'), re = /material-symbols-outlined[^>]*?>\{([^}]*)\}</g, m
      while ((m = re.exec(s))) {
        var expr = m[1].trim()
        var ok = /^[A-Za-z_$][\w$]*\.icon$/.test(expr) || /^'[a-z_0-9]+'$/.test(expr) ||
          /\?\s*'[a-z_0-9]+'\s*:\s*'[a-z_0-9]+'$/.test(expr)
        if (!ok) bad.push(path.relative(src, p) + ': {' + expr + '}')
      }
    })
  })(src)
  assert.deepEqual(bad, [])
})
