import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

// Vite plugin: after the client build, builds src/entry-server.jsx for Node,
// renders every public route to static HTML (dist/<route>.html, served by
// Vercel thanks to "cleanUrls") and writes dist/sitemap.xml.

export default function prerender() {
  var config
  return {
    name: 'armfincredit-prerender',
    apply: 'build',
    configResolved(c) { config = c },
    async closeBundle() {
      if (config.build.ssr || process.env.SKIP_PRERENDER) return
      var root = config.root
      var outDir = path.resolve(root, config.build.outDir)
      var ssrDir = path.resolve(root, 'dist-ssr')
      var vite = await import('vite')

      await vite.build({
        configFile: config.configFile,
        mode: config.mode,
        logLevel: 'warn',
        build: { ssr: 'src/entry-server.jsx', outDir: ssrDir, emptyOutDir: true, copyPublicDir: false }
      })

      try {
        var mod = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
        var template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8')
        var routes = mod.prerenderRoutes()
        var sitemap = []

        for (var i = 0; i < routes.length; i++) {
          var r = routes[i]
          var res = await mod.render(r.path, r.lang)
          var html = template
            .replace(/<html lang="[^"]*">/, '<html lang="' + (res.seo.lang || 'en') + '">')
            .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, '<!--seo-->\n    ' + mod.renderSeoTags(res.seo) + '\n    <!--/seo-->')
            .replace('<div id="root"></div>', '<div id="root">' + res.html + '</div>')
          var file = r.path === '/' ? path.join(outDir, 'index.html') : path.join(outDir, r.path.slice(1) + '.html')
          fs.mkdirSync(path.dirname(file), { recursive: true })
          fs.writeFileSync(file, html)

          if (r.sitemap !== false) {
            var alts = (r.alternates || []).map(function(a) {
              return '\n    <xhtml:link rel="alternate" hreflang="' + a.hreflang + '" href="' + mod.SITE_URL + (a.path === '/' ? '/' : a.path) + '" />'
            }).join('')
            sitemap.push('  <url>\n    <loc>' + mod.SITE_URL + (r.path === '/' ? '/' : r.path) + '</loc>' + alts +
              '\n    <priority>' + (r.priority || '0.5') + '</priority>\n  </url>')
          }
        }

        fs.writeFileSync(path.join(outDir, 'sitemap.xml'),
          '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
          sitemap.join('\n') + '\n</urlset>\n')
        config.logger.info('\n✓ prerendered ' + routes.length + ' pages + sitemap.xml')
      } finally {
        fs.rmSync(ssrDir, { recursive: true, force: true })
      }
    }
  }
}
