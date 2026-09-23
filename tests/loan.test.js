import test from 'node:test'
import assert from 'node:assert/strict'
import { generateAnnuity, generateDifferentiated, generateAmortization, calcAPR } from '../src/lib/loan.js'

function sum(rows, key) { return rows.reduce(function(s, r) { return s + r[key] }, 0) }
function close(a, b, eps, msg) { assert.ok(Math.abs(a - b) <= (eps || 0.01), (msg || '') + ' expected ' + b + ', got ' + a) }

test('annuity payment matches the closed-form formula', function() {
  // 5 000 000 at 12% for 24 months: r = 1%, P·r/(1 − (1+r)^−n)
  var res = generateAnnuity(5000000, 12, 24)
  var r = 0.01
  close(res.monthlyPayment, 5000000 * r / (1 - Math.pow(1 + r, -24)), 0.001)
  close(res.monthlyPayment, 235367.36, 0.01, 'known value')
  assert.equal(res.schedule.length, 24)
})

test('annuity repays exactly the principal and ends at zero', function() {
  var res = generateAnnuity(30000000, 11, 240)
  close(sum(res.schedule, 'principal'), 30000000, 1)
  close(res.schedule[res.schedule.length - 1].balance, 0, 0.01)
})

test('zero rate splits the amount evenly with no interest', function() {
  var res = generateAnnuity(1200000, 0, 12)
  close(res.monthlyPayment, 100000)
  close(sum(res.schedule, 'interest'), 0)
})

test('differentiated: equal principal, decreasing payments, less interest than annuity', function() {
  var d = generateDifferentiated(6000000, 12, 12)
  var a = generateAnnuity(6000000, 12, 12)
  d.schedule.forEach(function(row) { close(row.principal, 500000, 0.001) })
  close(d.schedule[0].payment, 500000 + 60000, 0.001, 'first payment = principal + 1% of balance')
  assert.ok(d.schedule[11].payment < d.schedule[0].payment)
  assert.ok(sum(d.schedule, 'interest') < sum(a.schedule, 'interest'))
  assert.equal(generateAmortization(6000000, 12, 12, [], 'differentiated').type, 'differentiated')
  assert.equal(generateAmortization(6000000, 12, 12, [], 'annuity').type, 'annuity')
})

test('an extra payment shortens the loan and saves interest', function() {
  var base = generateAnnuity(5000000, 14, 60)
  var extra = generateAnnuity(5000000, 14, 60, [{ month: 6, amount: 1000000 }])
  assert.ok(extra.schedule.length < base.schedule.length)
  assert.ok(sum(extra.schedule, 'interest') < sum(base.schedule, 'interest'))
  close(sum(extra.schedule, 'principal') + sum(extra.schedule, 'extra'), 5000000, 1)
})

test('APR equals the nominal rate without fees and grows with fees and insurance', function() {
  close(calcAPR(5000000, 12, 24, 0, 0), 12, 0.001)
  assert.ok(calcAPR(5000000, 12, 24, 100000, 0) > 12)
  assert.ok(calcAPR(5000000, 12, 24, 100000, 5000) > calcAPR(5000000, 12, 24, 100000, 0))
})
