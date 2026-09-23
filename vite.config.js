import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from './scripts/prerender.js'
import { scanIcons } from './scripts/icons.js'

// Serves the Vercel functions in /api during `npm run dev`, so the AI advisor
// and license checks work locally without the Vercel CLI.
function vercelApiDev() {
  return {
    name: 'vercel-api-dev',
    configureServer(server) {
      server.middlewares.use(async function(req, res, next) {
        var m = req.url && req.url.match(/^\/api\/([a-z0-9-]+)(?:\?|$)/i)
        if (!m) return next()
        try {
          var mod = await server.ssrLoadModule('/api/' + m[1] + '.js')
          res.status = function(code) { res.statusCode = code; return res }
          res.json = function(obj) { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(obj)); return res }
          await mod.default(req, res)
        } catch (e) {
          if (/Failed to load|does not exist/i.test(String(e && e.message))) return next()
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'dev_api_error', message: String(e && e.message) }))
        }
      })
    }
  }
}

// Loads only the Material Symbols glyphs the app uses (icon_names=…, sorted),
// a few KB instead of the whole icon font.
function iconSubset() {
  return {
    name: 'icon-subset',
    transformIndexHtml(html) {
      var names = scanIcons(new URL('./src', import.meta.url).pathname)
      if (!names.length) throw new Error('icon-subset: no icons found in src/')
      return html.replace('__ICON_NAMES__', names.join(','))
    }
  }
}

export default defineConfig(function(ctx) {
  // Expose non-VITE_ vars (AI_API_KEY, …) to the dev API handlers only.
  Object.assign(process.env, loadEnv(ctx.mode, process.cwd(), ''))
  return {
    plugins: [react(), iconSubset(), vercelApiDev(), prerender()],
    base: '/',
    build: ctx.isSsrBuild ? {} : {
      rollupOptions: {
        output: {
          manualChunks: { react: ['react', 'react-dom', 'react-router-dom'] }
        }
      }
    }
  }
})
