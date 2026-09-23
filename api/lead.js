import { readJson, clientIp } from './_lib/license.js'
import { takeQuota, hashId } from './_lib/quota.js'
import { redisConfig, redisPipeline } from './_lib/redis.js'
import { BANK_OFFERS } from '../src/config/bankOffers.js'

// POST /api/lead — a visitor asks a bank to contact them about an offer.
//
// The request is kept in Redis (list "afc:leads", newest first, last 5000)
// and, if configured, sent to the owner's Telegram:
//   TELEGRAM_BOT_TOKEN   token from @BotFather
//   TELEGRAM_CHAT_ID     chat that receives the requests
//   LEAD_PER_DAY         requests per IP per day (default 5)
// With neither Redis nor Telegram configured the endpoint answers 503 and the
// form points the visitor to Telegram instead.

var BANKS = {}
BANK_OFFERS.forEach(function(o) { BANKS[o.bank] = true })

function clean(v, max) { return String(v == null ? '' : v).replace(/[\u0000-\u001f]+/g, ' ').trim().slice(0, max) }

function validate(b) {
  var lead = {
    bank: clean(b.bank, 80),
    product: clean(b.product, 120),
    kind: b.kind === 'mortgage' ? 'mortgage' : 'loan',
    amount: Math.round(Number(b.amount) || 0),
    term: Math.round(Number(b.term) || 0),
    rate: Number(b.rate) || 0,
    name: clean(b.name, 60),
    phone: clean(b.phone, 30),
    comment: clean(b.comment, 500),
    lang: ['AM', 'RU', 'EN'].indexOf(b.lang) >= 0 ? b.lang : 'EN'
  }
  if (!BANKS[lead.bank]) return null
  if (lead.name.length < 2) return null
  var digits = lead.phone.replace(/\D/g, '')
  if (!/^[+\d\s()-]+$/.test(lead.phone) || digits.length < 8 || digits.length > 15) return null
  if (lead.amount < 0 || lead.amount > 1e9 || lead.term < 0 || lead.term > 480) return null
  return lead
}

function telegramText(l) {
  return [
    '🏦 Новая заявка: ' + l.bank + (l.product ? ' — ' + l.product : ''),
    (l.kind === 'mortgage' ? 'Ипотека' : 'Кредит') + (l.amount ? ': ' + l.amount.toLocaleString('ru-RU') + ' ֏' : '') +
      (l.term ? ', ' + l.term + ' мес.' : '') + (l.rate ? ', ставка ' + l.rate + '%' : ''),
    'Имя: ' + l.name,
    'Телефон: ' + l.phone,
    l.comment ? 'Комментарий: ' + l.comment : '',
    'Язык: ' + l.lang + ' · ' + l.at
  ].filter(Boolean).join('\n')
}

async function notifyTelegram(lead) {
  var token = String(process.env.TELEGRAM_BOT_TOKEN || '').trim()
  var chat = String(process.env.TELEGRAM_CHAT_ID || '').trim()
  if (!token || !chat) return false
  var base = (process.env.TELEGRAM_API_URL || 'https://api.telegram.org').replace(/\/+$/, '')
  var r = await fetch(base + '/bot' + token + '/sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chat, text: telegramText(lead), disable_web_page_preview: true }),
    signal: AbortSignal.timeout(5000)
  })
  if (!r.ok) throw new Error('telegram HTTP ' + r.status)
  return true
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }
  var body = await readJson(req)
  if (body.website) return res.status(200).json({ ok: true }) // honeypot: bots fill hidden fields
  if (body.consent !== true) return res.status(400).json({ error: 'consent_required' })
  var lead = validate(body)
  if (!lead) return res.status(400).json({ error: 'bad_request' })
  lead.at = new Date().toISOString()

  var q = await takeQuota([{ id: 'ip:' + hashId(clientIp(req)), limit: Number(process.env.LEAD_PER_DAY || 5) }], 'lead')
  if (!q.ok) return res.status(429).json({ error: 'too_many' })

  var stored = false, sent = false
  if (redisConfig()) {
    try {
      await redisPipeline([['LPUSH', 'afc:leads', JSON.stringify(lead)], ['LTRIM', 'afc:leads', '0', '4999']])
      stored = true
    } catch (e) { console.warn('[lead] Redis failed:', e && e.message) }
  }
  try { sent = await notifyTelegram(lead) } catch (e) { console.warn('[lead] Telegram failed:', e && e.message) }

  if (!stored && !sent) {
    await q.refund()
    return res.status(503).json({ error: 'not_configured' })
  }
  return res.status(200).json({ ok: true })
}
