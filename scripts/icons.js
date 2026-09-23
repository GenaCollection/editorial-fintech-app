import fs from 'node:fs'
import path from 'node:path'

// Material Symbols used by the app, found by scanning the source, so the
// Google Fonts request can ask for just these glyphs (icon_names=…) instead
// of the whole icon font. tests/icons.test.js checks that every icon in the
// prerendered pages is in this list.
//
// Recognised forms:
//   <span className="material-symbols-outlined" …>home</span>
//   <span className="material-symbols-outlined" …>{open ? 'close' : 'menu'}</span>
//   { icon: 'savings', … }   (data rendered into an icon span)

var NAME = /^[a-z][a-z0-9_]*$/

function walk(dir, out) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(function(e) {
    var p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (/\.(jsx?|mjs)$/.test(e.name)) out.push(p)
  })
  return out
}

export function scanIcons(srcDir) {
  var names = new Set()
  walk(srcDir, []).forEach(function(file) {
    var s = fs.readFileSync(file, 'utf8')
    var re = /material-symbols-outlined[^>]*?>([^<]*)<\//g, m
    while ((m = re.exec(s))) {
      var body = m[1].trim()
      if (NAME.test(body)) names.add(body)
      else if (body.charAt(0) === '{') {
        // Skip literals used in comparisons (theme === 'light' ? … : …).
        body = body.replace(/[!=]==?\s*('[^']*'|"[^"]*")/g, '')
        ;(body.match(/'([a-z][a-z0-9_]*)'|"([a-z][a-z0-9_]*)"/g) || []).forEach(function(q) { names.add(q.slice(1, -1)) })
      }
    }
    var ire = /\bicon:\s*'([a-z][a-z0-9_]*)'/g
    while ((m = ire.exec(s))) names.add(m[1])
  })
  return Array.from(names).sort()
}
