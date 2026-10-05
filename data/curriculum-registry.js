// data/curriculum-registry.js - Quản lý các Chuyên đề bài học độc lập (Curriculum Registry)

import { MODULE_01_FOUNDATION } from "./modules/mod-01-foundation.js";
import { MODULE_02_INTEGERS } from "./modules/mod-02-integers.js";
import { MODULE_03_INTEGERS_Z } from "./modules/mod-03-integers-z.js";
import { MODULE_04_FRACTIONS } from "./modules/mod-04-fractions.js";
import { MODULE_05_GEOMETRY } from "./modules/mod-05-geometry.js";
import { MODULE_06_SYMMETRY } from "./modules/mod-06-symmetry.js";
import { MODULE_07_STATISTICS } from "./modules/mod-07-statistics.js";
import { MODULE_08_PROBABILITY } from "./modules/mod-08-probability.js";
import { MODULE_09_ALGEBRA_OLYMPIAD } from "./modules/mod-09-algebra-olympiad.js";
import { MODULE_10_OLYMPIAD_ADVANCED } from "./modules/mod-10-olympiad-advanced.js";

// Danh mục tất cả các module bài học đã đăng ký trong hệ thống
const registeredModules = [
  MODULE_01_FOUNDATION,
  MODULE_02_INTEGERS,
  MODULE_03_INTEGERS_Z,
  MODULE_04_FRACTIONS,
  MODULE_05_GEOMETRY,
  MODULE_06_SYMMETRY,
  MODULE_07_STATISTICS,
  MODULE_08_PROBABILITY,
  MODULE_09_ALGEBRA_OLYMPIAD,
  MODULE_10_OLYMPIAD_ADVANCED
];

/**
 * Đăng ký thêm một module bài học mới vào registry
 * @param {object} moduleDef 
 */
export function registerModule(moduleDef) {
  if (!moduleDef || !moduleDef.id) return;
  const idx = registeredModules.findIndex(m => m.id === moduleDef.id);
  if (idx >= 0) {
    registeredModules[idx] = moduleDef;
  } else {
    registeredModules.push(moduleDef);
  }
}

/**
 * Lấy danh sách toàn bộ các tuần học từ tất cả module
 * @returns {Array<object>}
 */
export function getAllWeeks() {
  const weeks = [];
  for (const mod of registeredModules) {
    if (Array.isArray(mod.weeks)) {
      for (const w of mod.weeks) {
        weeks.push(Object.assign({}, w, {
          moduleId: mod.id,
          moduleTitle: mod.title
        }));
      }
    }
  }
  return weeks.sort((a, b) => a.number - b.number);
}

/**
 * Tìm tuần học theo ID (ví dụ 'w01', 'w04') hoặc theo số tuần (1, 4)
 * @param {string|number} identifier 
 * @returns {object|null}
 */
export function getWeek(identifier) {
  const all = getAllWeeks();
  if (typeof identifier === "number") {
    return all.find(w => w.number === identifier) || null;
  }
  const normalized = String(identifier).toLowerCase();
  return all.find(w => w.id === normalized || `w${w.number}` === normalized || String(w.number) === normalized) || null;
}

/**
 * Tìm câu hỏi theo Immutable Question ID (ví dụ: 'MATH6-W01-D01-Q01')
 * @param {string} questionId 
 * @returns {object|null}
 */
export function findQuestionById(questionId) {
  if (!questionId) return null;
  for (const mod of registeredModules) {
    if (!Array.isArray(mod.weeks)) continue;
    for (const w of mod.weeks) {
      if (!Array.isArray(w.days)) continue;
      for (const d of w.days) {
        if (!Array.isArray(d.exercises)) continue;
        for (const ex of d.exercises) {
          if (ex.id === questionId) {
            return {
              exercise: ex,
              day: d,
              week: w,
              module: mod
            };
          }
        }
      }
    }
  }
  return null;
}

/**
 * Lấy metadata chung của giáo trình Toán 6
 */
export function getCurriculumMeta() {
  return {
    title: "Ngân Learning Lab",
    subtitle: "Toán Lớp 6 Nâng Cao · Học Chắc Nền Tảng, Vượt Trội Tư Duy",
    totalWeeks: getAllWeeks().length,
    curriculumVersion: "1.0.0",
    textbook: "Chuẩn GDPT 2018 Toán 6 (Kết nối tri thức & Cánh diều)",
    learnerProfile: "Ngân - Rèn luyện tính nhẩm siêu tốc, làm chủ số nguyên Z, phân số và phương trình đại số sơ cấp."
  };
}
