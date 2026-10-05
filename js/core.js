// js/core.js - State Manager & Event Bus toàn cục độc lập DOM

import { loadUserState, saveUserState } from "../data/data-core.js";

let appState = null;
const listeners = new Set();

export async function initCoreState() {
  appState = await loadUserState();
  return appState;
}

export function getState() {
  return appState;
}

export let state = null;

export function updateState(updater) {
  state = setState(updater);
  return state;
}

export function setState(updater) {
  if (typeof updater === "function") {
    appState = updater(appState);
  } else if (updater && typeof updater === "object") {
    appState = Object.assign({}, appState, updater);
  }
  state = appState;
  // Lưu bất đồng bộ có debounce nhẹ
  saveUserState(appState);
  notifyListeners();
  return appState;
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notifyListeners() {
  for (const fn of listeners) {
    try {
      fn(appState);
    } catch (err) {
      console.error("[core] Listener error:", err);
    }
  }
}

export function escapeHtml(str = "") {
  return String(str).replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[c]);
}

export function formatTime(seconds = 0) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
