import { validateLicense, readJson } from './_lib/license.js'

// POST /api/license  { licenseKey } → { valid, plan?, expiresAt?, error? }
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ valid: false, error: 'method_not_allowed' })
  }
  var body = await readJson(req)
  var out = await validateLicense(body.licenseKey)
  res.setHeader('Cache-Control', 'no-store')
  return res.status(200).json(out)
}
