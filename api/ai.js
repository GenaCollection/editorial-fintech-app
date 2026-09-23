import { validateLicense, readJson, clientIp } from './_lib/license.js'

// /api/ai — proxies the AI loan advisor to any OpenAI-compatible
// chat-completions endpoint, so the API key never reaches the browser.
//
//   POST /api/ai   { messages, loan, lang, licenseKey? } → { reply } | { error, detail }
//   GET  /api/ai   health check: is the key set, which model answers, and the
//                  provider's exact error if not. Open it in a browser.
//
// Free options (pick one, set in Vercel env):
//   Google Gemini (default)  AI_API_KEY from aistudio.google.com — free tier
//   Groq                     AI_BASE_URL=https://api.groq.com/openai/v1  AI_MODEL=llama-3.3-70b-versatile
//   OpenRouter               AI_BASE_URL=https://openrouter.ai/api/v1   AI_MODEL=<any ":free" model>
//
// Env: AI_API_KEY (required), AI_BASE_URL, AI_MODEL,
//      AI_FREE_PER_DAY (default 5), AI_PRO_PER_DAY (default 120)

var GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/openai'
// Tried in order when AI_MODEL is unset or no longer exists, so a retired
// model name does not silently break the advisor.
var GEMINI_MODELS = ['gemini-flash-latest', 'gemini-2.5-flash', 'gemini-2.0-flash']
var LANG_NAME = { AM: 'Armenian', RU: 'Russian', EN: 'English' }
var ATTEMPT_TIMEOUT_MS = 20000
var TOTAL_BUDGET_MS = 26000

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

function providerConfig() {
  // Trim: a pasted key often carries a trailing space or newline.
  var key = String(process.env.AI_API_KEY || '').trim()
  var base = String(process.env.AI_BASE_URL || GEMINI_BASE).trim().replace(/\/+$/, '')
  var isGemini = base.indexOf('generativelanguage.googleapis.com') !== -1
  var models = []
  var configured = String(process.env.AI_MODEL || '').trim()
  if (configured) models.push(configured)
  if (isGemini) GEMINI_MODELS.forEach(function(m) { if (models.indexOf(m) === -1) models.push(m) })
  return { key: key, base: base, isGemini: isGemini, models: models }
}

function providerMessage(j, status) {
  var e = Array.isArray(j) ? (j[0] && j[0].error) : j && j.error
  var msg = e && (e.message || e.status || (typeof e === 'string' ? e : ''))
  return String(msg || ('HTTP ' + status)).slice(0, 300)
}

// Tries the configured models in order. Gemini 2.5+ "thinks" before
// answering and the thinking counts toward max_tokens, so thinking is kept
// low and the token budget generous — otherwise replies come back empty.
async function callProvider(cfg, messages, maxTokens) {
  var started = Date.now()
  var last = { ok: false, status: 0, detail: 'no_model' }
  for (var i = 0; i < cfg.models.length; i++) {
    var model = cfg.models[i]
    var reasoning = cfg.isGemini ? 'low' : null
    for (var pass = 0; pass < 2; pass++) {
      if (Date.now() - started > TOTAL_BUDGET_MS) return Object.assign(last, { detail: last.detail + ' (time budget exhausted)' })
      var body = { model: model, temperature: 0.4, max_tokens: maxTokens, messages: messages }
      if (reasoning) body.reasoning_effort = reasoning
      var ctrl = new AbortController()
      var timer = setTimeout(function() { ctrl.abort() }, ATTEMPT_TIMEOUT_MS)
      var r, j
      try {
        r = await fetch(cfg.base + '/chat/completions', {
          method: 'POST',
          signal: ctrl.signal,
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + cfg.key },
          body: JSON.stringify(body)
        })
        j = await r.json().catch(function() { return {} })
      } catch (e) {
        clearTimeout(timer)
        return { ok: false, status: 504, detail: e && e.name === 'AbortError' ? 'provider timeout' : 'network error: ' + (e && e.message), model: model }
      }
      clearTimeout(timer)

      var choice = j && j.choices && j.choices[0]
      var reply = choice && choice.message && choice.message.content
      if (r.ok && reply && String(reply).trim()) {
        return { ok: true, reply: String(reply).trim(), model: model }
      }
      var detail = r.ok ? 'empty reply (finish_reason: ' + (choice && choice.finish_reason) + ')' : providerMessage(j, r.status)
      last = { ok: false, status: r.ok ? 502 : r.status, detail: detail, model: model }

      // Provider rejected the reasoning parameter → same model without it.
      if (reasoning && r.status === 400 && /reason|thinking/i.test(detail)) { reasoning = null; continue }
      break
    }
    // Only a missing/unsupported model or an empty reply is worth trying the
    // next model; bad key, quota and similar errors will not change.
    var retryable = last.status === 404 || (last.status === 400 && /model/i.test(last.detail)) || /^empty reply/.test(last.detail)
    if (!retryable) break
  }
  return last
}

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

async function healthCheck(req, res) {
  var cfg = providerConfig()
  var out = {
    configured: !!cfg.key,
    keyHint: cfg.key ? cfg.key.slice(0, 4) + '…' + cfg.key.slice(-2) + ' (' + cfg.key.length + ' chars)' : null,
    provider: cfg.base.replace(/^https?:\/\//, '').split('/')[0],
    models: cfg.models
  }
  if (!cfg.key) {
    out.ok = false
    out.hint = 'AI_API_KEY is not set for this deployment. Add it in Vercel → Settings → Environment Variables (Production), then Redeploy.'
    return res.status(200).json(out)
  }
  if (!cfg.models.length) {
    out.ok = false
    out.hint = 'Set AI_MODEL for a non-Gemini provider.'
    return res.status(200).json(out)
  }
  if (overQuota('health:' + clientIp(req), 20)) return res.status(429).json({ error: 'quota' })
  var t0 = Date.now()
  var r = await callProvider(cfg, [{ role: 'user', content: 'Reply with the single word OK.' }], 512)
  out.ok = r.ok
  out.model = r.model
  out.latencyMs = Date.now() - t0
  if (r.ok) out.reply = r.reply.slice(0, 40)
  else { out.status = r.status; out.detail = r.detail }
  return res.status(200).json(out)
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method === 'GET') return healthCheck(req, res)
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  var cfg = providerConfig()
  if (!cfg.key) return res.status(503).json({ error: 'not_configured' })

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

  var r = await callProvider(cfg, [{ role: 'system', content: systemPrompt(body.lang, body.loan) }].concat(messages), 2048)
  if (r.ok) return res.status(200).json({ reply: r.reply })
  console.error('[api/ai] provider error', r.status, r.model, r.detail)
  return res.status(r.status === 429 ? 429 : 502).json({
    error: r.status === 429 ? 'provider_quota' : 'provider_error',
    detail: r.detail
  })
}
