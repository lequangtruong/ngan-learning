// test/buttons-and-interactions.test.mjs - Mock test toàn bộ các nút bấm, sự kiện & màn hình
import test from "node:test";
import assert from "node:assert/strict";

// Import modules cần kiểm thử
import { getDefaultState } from "../data/data-core.js";
import { getRegisteredGames, getGameById } from "../js/game-registry.js";
import { initTimer, startTimer, pauseTimer, getTimerState, formatTime, onTimerTick } from "../js/study-timer.js";
import { evaluateDiagnostic, DIAGNOSTIC_TEST } from "../data/diagnostic-assessment.js";
import { gradePhotoSolution } from "../js/photo-grader.js";

test("Study Timer Buttons & State Machine", () => {
  initTimer(25);
  let state = getTimerState();
  assert.equal(state.remainingSeconds, 25 * 60);
  assert.equal(state.isRunning, false);
  assert.equal(formatTime(state.remainingSeconds), "25:00");

  // Format time test
  assert.equal(formatTime(65), "01:05");
  assert.equal(formatTime(0), "00:00");
  assert.equal(formatTime(599), "09:59");

  // Timer Tick listener
  let tickFired = false;
  const unsubscribe = onTimerTick((st) => {
    tickFired = true;
  });

  startTimer();
  state = getTimerState();
  assert.equal(state.isRunning, true);

  pauseTimer();
  state = getTimerState();
  assert.equal(state.isRunning, false);
  assert.equal(tickFired, true);

  unsubscribe();
});

test("All 15 Game Plugins & In-Game Interactive Flow", () => {
  const games = getRegisteredGames();
  assert.equal(games.length, 15, "Must have exactly 15 games registered");

  for (const game of games) {
    assert.ok(game.id, "Game must have id");
    assert.ok(game.title, "Game must have title");
    assert.ok(game.targetCompetency, "Game must have targetCompetency");
    assert.equal(typeof game.render, "function", "Game must have render function");

    // Test Mock Render Container & onComplete Callback
    let completedPoints = null;
    const mockContainer = {
      innerHTML: "",
      listeners: {},
      querySelector(sel) {
        return {
          textContent: "",
          value: "",
          addEventListener(evt, fn) {
            mockContainer.listeners[sel + ":" + evt] = fn;
          },
          focus() {}
        };
      },
      querySelectorAll() {
        return [];
      }
    };

    game.render(mockContainer, (score) => {
      completedPoints = score;
    });

    assert.ok(mockContainer.innerHTML.length > 0, `Game ${game.id} must render markup into container`);
  }
});

test("Diagnostic Assessment 10-Question Form Submission Mock Test", () => {
  assert.equal(DIAGNOSTIC_TEST.questions.length, 10);

  // Test full submission: all 10 correct
  const allCorrect = {};
  DIAGNOSTIC_TEST.questions.forEach(q => {
    allCorrect[q.id] = q.answer;
  });

  const res10 = evaluateDiagnostic(allCorrect);
  assert.equal(res10.totalScore, 10);
  assert.equal(res10.level, "OLYMPIAD_TALENT");
  assert.equal(res10.badge, "🏆 Bản Lĩnh Olympic");
  assert.ok(res10.baseMqi >= 800);

  // Test partial submission: 7 correct -> Core Advanced
  const sevenCorrect = {
    "DIAG-01": "63",
    "DIAG-02": "900",
    "DIAG-03": "3/4",
    "DIAG-04": "17/20",
    "DIAG-05": "55",
    "DIAG-06": "-4",
    "DIAG-07": "144"
  };
  const res7 = evaluateDiagnostic(sevenCorrect);
  assert.equal(res7.totalScore, 7);
  assert.equal(res7.level, "CORE_ADVANCED");
  assert.equal(res7.badge, "🌟 Khá Giỏi");

  // Test low submission: 3 correct -> Foundation Bridge
  const threeCorrect = {
    "DIAG-01": "63",
    "DIAG-02": "900",
    "DIAG-03": "3/4"
  };
  const res3 = evaluateDiagnostic(threeCorrect);
  assert.equal(res3.totalScore, 3);
  assert.equal(res3.level, "FOUNDATION_BRIDGE");
  assert.equal(res3.badge, "🌱 Nền Tảng");
});

test("Photo Grader Mock Test: offline fallback truthful handling", async () => {
  const mockPayload = {
    questionId: "MATH6-W01-D01-Q01",
    questionText: "Tính nhanh: 8 × 7 = ?",
    expectedAnswer: "56",
    imageDataBase64: "data:image/jpeg;base64,mock..."
  };

  const result = await gradePhotoSolution(mockPayload);
  assert.ok(result, "Photo grader must return result");
  assert.equal(result.ok, false, "When offline/no endpoint, must not fabricate a pass grade");
  assert.equal(result.offline, true, "Must flag offline status truthfully");
  assert.equal(result.savedOffline, false, "Must not claim false persistence when no queue exists");
  assert.ok(result.message.length > 0, "Must provide clear status explanation to user");
});

test("Default State & Competency Profile Integrity", () => {
  const state = getDefaultState();
  assert.ok(state.competencyMetrics, "State must have competencyMetrics");
  assert.ok(state.competencyMetrics.fluency >= 0);
  assert.ok(state.competencyMetrics.algebra >= 0);
  assert.ok(state.competencyMetrics.geometry >= 0);
  assert.ok(state.competencyMetrics.logic >= 0);
  assert.ok(state.competencyMetrics.resilience >= 0);
  assert.equal(state.activeWeek, 1);
});
