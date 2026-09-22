import { validateLicense, readJson, clientIp } from './_lib/license.js'

// POST /api/ai — proxies the AI loan advisor to any OpenAI-compatible
// chat-completions endpoint, so the API key never reaches the browser.
//
// Free options (pick one, set in Vercel env):
//   Google Gemini (default)  AI_API_KEY from aistudio.google.com — free tier
//   Groq                     AI_BASE_URL=https://api.groq.com/openai/v1  AI_MODEL=llama-3.3-70b-versatile
//   OpenRouter               AI_BASE_URL=https://openrouter.ai/api/v1   AI_MODEL=<any ":free" model>
//
// Env: AI_API_KEY (required), AI_BASE_URL, AI_MODEL,
//      AI_FREE_PER_DAY (default 5), AI_PRO_PER_DAY (default 120)

var DEFAULT_BASE = 'https://generativelanguage.googleapis.com/v1beta/openai'
var DEFAULT_MODEL = 'gemini-2.5-flash'
var LANG_NAME = { AM: 'Armenian', RU: 'Russian', EN: 'English' }

// Best-effort per-instance quota. Serverless instances are short-lived, so this
// only stops casual abuse; the client-side counter drives the upsell UX.
var usage = new Map()

function overQuota(id, limit) {
  var day = new Date().toISOString().slice(0, 10)
  var u = usage.get(id)
  if (!u || u.day !== day) u = { day: day, count: 0 }
  if (u.count >= limit) return true
  u.count++
  usage.set(id, u)
  if (usage.size > 5000) usage.clear()
  return false
}

function num(v) { var n = Number(v); return isFinite(n) ? n : 0 }

function systemPrompt(lang, loan) {
  var l = loan || {}
  var extras = Array.isArray(l.extraPayments) ? l.extraPayments.slice(0, 24).map(function(e) {
    return 'month ' + num(e.month) + ': ' + num(e.amount)
  }).join('; ') : ''
  return [
    'You are ArmFinCredit, a friendly and precise loan advisor inside a loan calculator for Armenia. Currency is Armenian dram (AMD, symbol ֏).',
    'Answer in ' + (LANG_NAME[lang] || 'English') + '. Be concise: at most ~150 words, short paragraphs or bullets, concrete numbers.',
    'Use the user\'s current calculation below. Do not invent specific bank names, bank rates or promotions. If asked for something outside personal loans and budgeting, briefly steer back.',
    'End with one practical next step. You are not a licensed financial advisor.',
    '',
    'Current calculation:',
    '- amount: ' + num(l.amount) + ' AMD',
    '- nominal rate: ' + num(l.rate) + '% per year, term: ' + num(l.term) + ' months, type: ' + (l.loanType === 'differentiated' ? 'differentiated' : 'annuity'),
    '- origination fee: ' + num(l.fee) + ' AMD, insurance: ' + num(l.insurance) + ' AMD/month',
    '- monthly payment: ' + num(l.monthlyPayment) + ' AMD' + (l.loanType === 'differentiated' ? ' (first payment, then decreasing)' : ''),
    '- total interest: ' + num(l.totalInterest) + ' AMD, total paid: ' + num(l.totalPayment) + ' AMD, APR: ' + num(l.apr) + '%',
    '- number of payments: ' + num(l.payments) + (extras ? ', extra payments: ' + extras : '')
  ].join('\n')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }
  res.setHeader('Cache-Control', 'no-store')

  var apiKey = process.env.AI_API_KEY
  if (!apiKey) return res.status(503).json({ error: 'not_configured' })

  var body = await readJson(req)
  var messages = (Array.isArray(body.messages) ? body.messages : [])
    .filter(function(m) { return m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' })
    .slice(-8)
    .map(function(m) { return { role: m.role, content: m.content.slice(0, 1500) } })
  if (!messages.length || messages[messages.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'bad_request' })
  }

  var isPro = false
  if (body.licenseKey) isPro = (await validateLicense(body.licenseKey)).valid
  var limit = isPro ? num(process.env.AI_PRO_PER_DAY || 120) : num(process.env.AI_FREE_PER_DAY || 5)
  var quotaId = isPro ? 'lic:' + body.licenseKey : 'ip:' + clientIp(req)
  if (overQuota(quotaId, limit)) return res.status(429).json({ error: 'quota' })

  var base = (process.env.AI_BASE_URL || DEFAULT_BASE).replace(/\/+$/, '')
  var ctrl = new AbortController()
  var timer = setTimeout(function() { ctrl.abort() }, 25000)
  try {
    var r = await fetch(base + '/chat/completions', {
      method: 'POST',
      signal: ctrl.signal,
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + apiKey },
      body: JSON.stringify({
        model: process.env.AI_MODEL || DEFAULT_MODEL,
        temperature: 0.4,
        max_tokens: 700,
        messages: [{ role: 'system', content: systemPrompt(body.lang, body.loan) }].concat(messages)
      })
    })
    var j = await r.json().catch(function() { return {} })
    var reply = j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content
    if (!r.ok || !reply) {
      return res.status(502).json({ error: r.status === 429 ? 'provider_quota' : 'provider_error' })
    }
    return res.status(200).json({ reply: String(reply).trim() })
  } catch (e) {
    return res.status(504).json({ error: 'timeout' })
  } finally {
    clearTimeout(timer)
  }
}
