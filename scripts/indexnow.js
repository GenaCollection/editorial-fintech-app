// IndexNow: tells Bing, Yandex and other participating search engines which
// URLs exist or changed, so they recrawl them quickly (Google does not use
// IndexNow; it reads sitemap.xml). The key below is public by design and is
// served from public/<key>.txt for ownership verification.
//
// Runs after the prerender on Vercel production builds only; set
// SKIP_INDEXNOW=1 to turn it off. It never fails the build.

export var INDEXNOW_KEY = '49e8f2d13ce814f4ea4ed6c415f168f0'

export async function submitIndexNow(siteUrl, urls, logger) {
  if (process.env.VERCEL_ENV !== 'production' || process.env.SKIP_INDEXNOW) return
  var host = new URL(siteUrl).host
  try {
    var r = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: host, key: INDEXNOW_KEY, keyLocation: siteUrl + '/' + INDEXNOW_KEY + '.txt', urlList: urls.slice(0, 10000) }),
      signal: AbortSignal.timeout(10000)
    })
    logger.info('IndexNow: submitted ' + urls.length + ' URLs (HTTP ' + r.status + ')')
  } catch (e) {
    logger.warn('IndexNow: not submitted (' + (e && e.message) + ')')
  }
}
