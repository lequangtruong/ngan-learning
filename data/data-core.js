// data/data-core.js - Quản lý lưu trữ Local-First (IndexedDB schema v2) & State Model độc lập DOM

const DB_NAME = "NganLearningDB";
const DB_VERSION = 2;
const STORE_NAME = "userLearningStore";
const FEEDBACK_STORE = "parentFeedbackLogs";
const PHOTO_STORE = "photoGraderLogs";

let dbInstance = null;

export async function openDatabase() {
  if (typeof window === "undefined" || !window.indexedDB) {
    return null;
  }
  if (dbInstance) return dbInstance;

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(FEEDBACK_STORE)) {
        const fbStore = db.createObjectStore(FEEDBACK_STORE, { keyPath: "id" });
        fbStore.createIndex("by_status", "status", { unique: false });
        fbStore.createIndex("by_date", "createdAt", { unique: false });
      }
      if (!db.objectStoreNames.contains(PHOTO_STORE)) {
        db.createObjectStore(PHOTO_STORE, { keyPath: "id" });
      }
    };

    request.onsuccess = (e) => {
      dbInstance = e.target.result;
      resolve(dbInstance);
    };

    request.onerror = (e) => {
      console.error("[IDB] Lỗi mở IndexedDB:", e.target.error);
      reject(e.target.error);
    };
  });
}

export function getDefaultState() {
  return {
    id: "main_profile",
    learnerName: "Ngân",
    grade: 6,
    activeWeek: 1,
    progress: {}, // { w01: { completed: true, days: { 1: true, 2: true }, parentOk: true } }
    notes: {},    // { w01: "Phụ huynh ghi chú" }
    lessonResponses: {}, // { "MATH6-W01-D01-Q01": { answer: "42", correct: true, timestamp: ... } }
    competencyMetrics: {
      fluency: 420,
      algebra: 450,
      geometry: 400,
      logic: 440,
      resilience: 460,
      academicMasteryScore: 78,
      resilienceIndex: 85,
      totalMqi: 434,
      dailyGameCaps: {}, // { "2026-10-04": { "speed-math": 50 } }
      history: []
    },
    streak: { count: 1, lastStudyDate: new Date().toISOString().split("T")[0] },
    curriculumVersion: "1.0.0",
    updatedAt: new Date().toISOString()
  };
}

export async function loadUserState() {
  try {
    const db = await openDatabase();
    if (!db) return getDefaultState();

    return new Promise((resolve) => {
      const tx = db.transaction([STORE_NAME], "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get("main_profile");

      req.onsuccess = () => {
        if (req.result) {
          const merged = Object.assign(getDefaultState(), req.result);
          resolve(merged);
        } else {
          const def = getDefaultState();
          saveUserState(def);
          resolve(def);
        }
      };

      req.onerror = () => {
        resolve(getDefaultState());
      };
    });
  } catch {
    return getDefaultState();
  }
}

export async function saveUserState(state) {
  try {
    const db = await openDatabase();
    if (!db) return false;

    return new Promise((resolve) => {
      const tx = db.transaction([STORE_NAME], "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const record = Object.assign({}, state, {
        id: "main_profile",
        updatedAt: new Date().toISOString()
      });
      const req = store.put(record);

      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}

export const loadState = loadUserState;
export const saveState = saveUserState;

// Quản lý phản hồi báo lỗi từ phụ huynh
export async function addParentFeedback(feedback) {
  try {
    const db = await openDatabase();
    if (!db) return null;

    const record = {
      id: "FB-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6),
      questionId: feedback.questionId || "GENERAL",
      weekNumber: feedback.weekNumber || 1,
      dayNumber: feedback.dayNumber || 1,
      lessonTitle: feedback.lessonTitle || "",
      moduleFile: feedback.moduleFile || "data/modules/mod-01-foundation.js",
      errorType: feedback.errorType || "SAI_DAP_AN",
      description: String(feedback.description || "").trim(),
      parentProposedFix: String(feedback.parentProposedFix || "").trim(),
      patchData: feedback.patchData || null,
      status: feedback.status || "PENDING_REVIEW", // PENDING_REVIEW | PATCHED_VERIFIED
      createdAt: new Date().toISOString()
    };

    return new Promise((resolve) => {
      const tx = db.transaction([FEEDBACK_STORE], "readwrite");
      const store = tx.objectStore(FEEDBACK_STORE);
      const req = store.add(record);

      req.onsuccess = () => resolve(record);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function getAllFeedbacks() {
  try {
    const db = await openDatabase();
    if (!db) return [];

    return new Promise((resolve) => {
      const tx = db.transaction([FEEDBACK_STORE], "readonly");
      const store = tx.objectStore(FEEDBACK_STORE);
      const req = store.getAll();

      req.onsuccess = () => {
        const list = req.result || [];
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        resolve(list);
      };
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

export async function markFeedbackPatched(feedbackId) {
  try {
    const db = await openDatabase();
    if (!db) return false;

    return new Promise((resolve) => {
      const tx = db.transaction([FEEDBACK_STORE], "readwrite");
      const store = tx.objectStore(FEEDBACK_STORE);
      const getReq = store.get(feedbackId);

      getReq.onsuccess = () => {
        if (!getReq.result) return resolve(false);
        const item = getReq.result;
        item.status = "PATCHED_VERIFIED";
        item.patchedAt = new Date().toISOString();
        const putReq = store.put(item);
        putReq.onsuccess = () => resolve(true);
        putReq.onerror = () => resolve(false);
      };
      getReq.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}
