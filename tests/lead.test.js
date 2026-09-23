import test from 'node:test'
import assert from 'node:assert/strict'
import http from 'node:http'
import { Readable } from 'node:stream'

// /api/lead against local stand-ins for Redis (Upstash REST) and Resend.

var redisList = []
var counters = new Map()
var emails = []

var server = http.createServer(function(req, res) {
  var body = ''
  req.on('data', function(c) { body += c })
  req.on('end', function() {
    res.setHeader('Content-Type', 'application/json')
    if (req.url === '/redis/pipeline') {
      var out = JSON.parse(body).map(function(cmd) {
        if (cmd[0] === 'INCRBY') { var n = (counters.get(cmd[1]) || 0) + Number(cmd[2]); counters.set(cmd[1], n); return { result: n } }
        if (cmd[0] === 'LPUSH') { redisList.unshift(cmd[2]); return { result: redisList.length } }
        return { result: 'OK' }
      })
      return res.end(JSON.stringify(out))
    }
    if (req.url === '/emails') { assert.equal(req.headers.authorization, 'Bearer re_test'); emails.push(JSON.parse(body)); return res.end('{"id":"1"}') }
    res.statusCode = 404; res.end('{}')
  })
})

var handler
test.before(async function() {
  await new Promise(function(r) { server.listen(0, '127.0.0.1', r) })
  var base = 'http://127.0.0.1:' + server.address().port
  process.env.KV_REST_API_URL = base + '/redis'
  process.env.KV_REST_API_TOKEN = 'secret'
  process.env.RESEND_API_URL = base
  process.env.RESEND_API_KEY = 're_test'
  process.env.LEAD_EMAIL_TO = 'owner@example.com'
  process.env.LEAD_PER_DAY = '2'
  handler = (await import('../api/lead.js')).default
})
test.after(function() { server.close() })

function send(body, ip) {
  var req = Readable.from([JSON.stringify(body)])
  req.method = 'POST'
  req.headers = { 'x-forwarded-for': ip || '10.1.0.1' }
  return new Promise(function(resolve) {
    handler(req, {
      statusCode: 200, setHeader: function() {},
      status: function(c) { this.statusCode = c; return this },
      json: function(obj) { resolve({ status: this.statusCode, body: obj }); return this }
    })
  })
}

var good = { bank: 'Ardshinbank', product: 'Unsecured consumer loan', kind: 'loan', rate: 12.9, amount: 3000000, term: 36,
  name: 'Aram', phone: '+374 91 123456', comment: 'call after 6pm', lang: 'RU', consent: true }

test('a valid request is stored in Redis and emailed to the owner', async function() {
  var r = await send(good)
  assert.equal(r.status, 200)
  assert.equal(redisList.length, 1)
  var saved = JSON.parse(redisList[0])
  assert.equal(saved.bank, 'Ardshinbank'); assert.equal(saved.phone, '+374 91 123456'); assert.equal(saved.amount, 3000000)
  assert.equal(emails.length, 1)
  assert.deepEqual(emails[0].to, ['owner@example.com'])
  assert.match(emails[0].subject, /Ardshinbank/)
  assert.doesNotMatch(emails[0].html, /<script/)
  assert.match(emails[0].text, /Ardshinbank[\s\S]*3[\s ]000[\s ]000 ֏[\s\S]*Aram[\s\S]*\+374 91 123456/)
})

test('consent, a known bank and a real phone number are required', async function() {
  assert.equal((await send(Object.assign({}, good, { consent: false }), '10.1.0.2')).status, 400)
  assert.equal((await send(Object.assign({}, good, { bank: 'Fake Bank' }), '10.1.0.2')).status, 400)
  assert.equal((await send(Object.assign({}, good, { phone: '12' }), '10.1.0.2')).status, 400)
  assert.equal((await send(Object.assign({}, good, { phone: 'call me' }), '10.1.0.2')).status, 400)
  assert.equal(redisList.length, 1)
})

test('bots filling the hidden field get a silent OK and nothing is saved', async function() {
  var r = await send(Object.assign({}, good, { website: 'spam.example' }), '10.1.0.3')
  assert.equal(r.status, 200)
  assert.equal(redisList.length, 1)
})

test('per-IP daily limit', async function() {
  assert.equal((await send(good, '10.1.0.9')).status, 200)
  assert.equal((await send(good, '10.1.0.9')).status, 200)
  assert.equal((await send(good, '10.1.0.9')).status, 429)
})
