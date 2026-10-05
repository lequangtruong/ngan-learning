// js/study-timer.js - Bộ đếm thời gian học tập 25 phút ngày thường / 40 phút Thứ 7

let timerInterval = null;
let remainingSeconds = 25 * 60;
let isRunning = false;
let callbacks = [];

export function initTimer(defaultMinutes = 25) {
  remainingSeconds = defaultMinutes * 60;
  isRunning = false;
  if (timerInterval) clearInterval(timerInterval);
}

export function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timerInterval = setInterval(() => {
    if (remainingSeconds > 0) {
      remainingSeconds--;
      notifyTimer();
    } else {
      pauseTimer();
      alert("⏰ Hết giờ học tập! Ngân hãy đứng dậy vươn vai, uống nước và cho mắt nghỉ ngơi nhé!");
    }
  }, 1000);
}

export function pauseTimer() {
  isRunning = false;
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = null;
  notifyTimer();
}

export function getTimerState() {
  return {
    remainingSeconds,
    isRunning
  };
}

export function onTimerTick(cb) {
  callbacks.push(cb);
  return () => {
    callbacks = callbacks.filter(c => c !== cb);
  };
}

function notifyTimer() {
  const state = getTimerState();
  for (const cb of callbacks) {
    try { cb(state); } catch {}
  }
}

export function formatTime(seconds = 0) {
  const m = Math.floor((seconds || 0) / 60).toString().padStart(2, "0");
  const s = ((seconds || 0) % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function subscribeTimer(cb) {
  return onTimerTick(cb);
}
