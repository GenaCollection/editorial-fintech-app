import test from 'node:test'
import assert from 'node:assert/strict'
import { projectDeposit } from '../src/lib/deposit.js'

function close(a, b, eps, msg) { assert.ok(Math.abs(a - b) <= (eps || 0.01), (msg || '') + ' expected ' + b + ', got ' + a) }

test('monthly capitalisation compounds: P·(1 + r/12)^n', function() {
  var res = projectDeposit({ initial: 1000000, monthly: 0, rate: 12, months: 12, cap: 'monthly', taxPct: 0 })
  close(res.final, 1000000 * Math.pow(1.01, 12), 0.01)
  close(res.effective, (Math.pow(1.01, 12) - 1) * 100, 1e-9)
})

test('interest paid at the end is simple interest', function() {
  var res = projectDeposit({ initial: 1000000, monthly: 0, rate: 10, months: 12, cap: 'end', taxPct: 0 })
  close(res.gross, 100000, 0.01)
  close(res.effective, 10, 1e-9)
})

test('10% tax is withheld from interest only', function() {
  var res = projectDeposit({ initial: 2000000, monthly: 0, rate: 10, months: 12, cap: 'end', taxPct: 10 })
  close(res.tax, res.gross * 0.1, 0.01)
  close(res.net, res.gross * 0.9, 0.01)
  close(res.final, 2000000 + res.net, 0.01)
})

test('monthly top-ups are counted as contributions', function() {
  var res = projectDeposit({ initial: 100000, monthly: 50000, rate: 0, months: 6, cap: 'monthly', taxPct: 0 })
  // top-ups at the end of months 1..5 (none after the last month)
  assert.equal(res.contributed, 100000 + 5 * 50000)
  close(res.final, res.contributed)
  assert.equal(res.rows.length, 6)
})
