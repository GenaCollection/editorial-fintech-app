import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { INDEXNOW_KEY } from '../scripts/indexnow.js'

test('IndexNow key file is published with exactly the key', function() {
  assert.match(INDEXNOW_KEY, /^[a-f0-9]{32}$/)
  var file = new URL('../public/' + INDEXNOW_KEY + '.txt', import.meta.url)
  assert.equal(fs.readFileSync(file, 'utf8'), INDEXNOW_KEY)
})
