import { readJson, clientIp } from './_lib/license.js'
import { takeQuota, hashId } from './_lib/quota.js'
import { redisConfig, redisPipeline } from './_lib/redis.js'
import { BANK_OFFERS } from '../src/config/bankOffers.js'

// POST /api/lead — a visitor asks a bank to contact them about an offer.
//
// The request is kept in Redis (list "afc:leads", newest first, last 5000)
// and, if configured, emailed to the owner via Resend (resend.com, free tier):
//   RESEND_API_KEY   API key from resend.com
//   LEAD_EMAIL_TO    where requests go (default: the site contact address)
//   LEAD_EMAIL_FROM  sender; until a domain is verified in Resend keep the
//                    default onboarding@resend.dev (it can only send to the
//                    address the Resend account was registered with)
//   LEAD_PER_DAY     requests per IP per day (default 5)
// With neither Redis nor email configured the endpoint answers 503 and the
// form shows the contact address instead.

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

var CONTACT_EMAIL = 'armfincredit@zohomail.com'

function esc(v) { return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') }

function leadText(l) {
  return [
    'Новая заявка: ' + l.bank + (l.product ? ' — ' + l.product : ''),
    (l.kind === 'mortgage' ? 'Ипотека' : 'Кредит') + (l.amount ? ': ' + l.amount.toLocaleString('ru-RU') + ' ֏' : '') +
      (l.term ? ', ' + l.term + ' мес.' : '') + (l.rate ? ', ставка ' + l.rate + '%' : ''),
    'Имя: ' + l.name,
    'Телефон: ' + l.phone,
    l.comment ? 'Комментарий: ' + l.comment : '',
    'Язык: ' + l.lang + ' · ' + l.at
  ].filter(Boolean).join('\n')
}

async function notifyEmail(lead) {
  var key = String(process.env.RESEND_API_KEY || '').trim()
  if (!key) return false
  var base = (process.env.RESEND_API_URL || 'https://api.resend.com').replace(/\/+$/, '')
  var text = leadText(lead)
  var r = await fetch(base + '/emails', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.LEAD_EMAIL_FROM || 'ArmFinCredit <onboarding@resend.dev>',
      to: [process.env.LEAD_EMAIL_TO || CONTACT_EMAIL],
      subject: 'Заявка: ' + lead.bank + ' — ' + lead.name,
      text: text,
      html: '<pre style="font:15px/1.5 sans-serif;white-space:pre-wrap">' + esc(text) + '</pre>'
    }),
    signal: AbortSignal.timeout(5000)
  })
  if (!r.ok) throw new Error('resend HTTP ' + r.status)
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
  try { sent = await notifyEmail(lead) } catch (e) { console.warn('[lead] email failed:', e && e.message) }

  if (!stored && !sent) {
    await q.refund()
    return res.status(503).json({ error: 'not_configured' })
  }
  return res.status(200).json({ ok: true })
}
