import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppProviders, RootSwitch, preloadAll } from './App.jsx'
import { SeoContext, renderSeoTags } from './seo/Seo.jsx'
import { prerenderRoutes } from './seo/meta.js'
import { SITE_URL } from './config/site.js'

// Used only at build time by scripts/prerender.js: renders each public URL to
// static HTML so search engines (and link previews) get real content.

export { prerenderRoutes, renderSeoTags, SITE_URL }

export async function render(url, lang) {
  await preloadAll()
  var seo = {}
  var html = renderToString(
    <SeoContext.Provider value={seo}>
      <AppProviders initialLanguage={lang}>
        <StaticRouter location={url}>
          <RootSwitch />
        </StaticRouter>
      </AppProviders>
    </SeoContext.Provider>
  )
  return { html: html, seo: seo }
}
