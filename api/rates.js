import { fetchRates } from './_lib/fx.js'

// GET /api/rates → official CBA exchange rates (see ./_lib/fx.js).
// Cached at the Vercel edge for an hour; the CBA publishes once a day.
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'method_not_allowed' })
  }
  try {
    var data = await fetchRates()
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    return res.status(200).json(data)
  } catch (e) {
    res.setHeader('Cache-Control', 'no-store')
    return res.status(502).json({ error: 'unavailable', detail: String(e && e.message).slice(0, 200) })
  }
}
