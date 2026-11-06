import { test } from 'node:test';
import assert from 'node:assert/strict';
import { gateOutcome } from '@site/src/utils/shadowGate.js';

const none = { trauma: false, ptsd: false, crisis: false };

test('a contraindication blocks with no override, whatever the distress level', () => {
  for (const distress of ['1', '3', '7', '10']) {
    assert.equal(gateOutcome(distress, { ...none, crisis: true }), 'contraindication');
  }
});

test('high distress alone is blocked; lower distress passes', () => {
  assert.equal(gateOutcome('7', none), 'distress');
  assert.equal(gateOutcome('6', none), 'pass');
});

test('no distress answer never passes the gate', () => {
  assert.equal(gateOutcome(null, none), 'incomplete');
  assert.equal(gateOutcome(undefined, none), 'incomplete');
  assert.equal(gateOutcome(null, { ...none, ptsd: true }), 'incomplete');
});
