import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DIAGNOSTIC_TEST, evaluateDiagnostic } from '../data/diagnostic-assessment.js';

test('DIAGNOSTIC_TEST should have 10 calibrated questions', () => {
  assert.equal(DIAGNOSTIC_TEST.questions.length, 10);
  for (const q of DIAGNOSTIC_TEST.questions) {
    assert.ok(q.id, 'Question must have id');
    assert.ok(q.question, 'Question must have text');
    assert.ok(q.answer !== undefined, 'Question must have answer');
    assert.ok(q.dimension, 'Question must have dimension');
    assert.ok(q.level, 'Question must have level');
  }
});

test('evaluateDiagnostic should identify OLYMPIAD_TALENT level for high scores (>= 9)', () => {
  const perfectAnswers = {};
  for (const q of DIAGNOSTIC_TEST.questions) {
    perfectAnswers[q.id] = q.answer;
  }
  const result = evaluateDiagnostic(perfectAnswers);
  assert.equal(result.totalScore, 10);
  assert.equal(result.percentage, 100);
  assert.equal(result.level, 'OLYMPIAD_TALENT');
  assert.ok(result.baseMqi >= 800);
  assert.ok(result.initialMetrics.academicMasteryScore === 100);
});

test('evaluateDiagnostic should identify CORE_ADVANCED level for moderate scores (6 to 8)', () => {
  const partialAnswers = {
    'DIAG-01': '63',
    'DIAG-02': '900',
    'DIAG-03': '3/4',
    'DIAG-04': '17/20',
    'DIAG-05': '55',
    'DIAG-06': '-4',
    'DIAG-07': 'wrong',
    'DIAG-08': 'wrong',
    'DIAG-09': 'wrong',
    'DIAG-10': 'wrong'
  };
  const result = evaluateDiagnostic(partialAnswers);
  assert.equal(result.totalScore, 6);
  assert.equal(result.level, 'CORE_ADVANCED');
  assert.equal(result.baseMqi, 600);
});

test('evaluateDiagnostic should identify FOUNDATION_BRIDGE level for scores < 6', () => {
  const lowAnswers = {
    'DIAG-01': '63',
    'DIAG-02': '900'
  };
  const result = evaluateDiagnostic(lowAnswers);
  assert.equal(result.totalScore, 2);
  assert.equal(result.level, 'FOUNDATION_BRIDGE');
  assert.equal(result.baseMqi, 480);
});
