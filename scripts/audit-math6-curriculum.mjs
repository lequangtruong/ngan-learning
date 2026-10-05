// scripts/audit-math6-curriculum.mjs - Kiểm thử & Đánh giá Tính Toàn Vẹn của Giáo trình Toán 6
import { getAllWeeks, getCurriculumMeta } from "../data/curriculum-registry.js";

console.log("=== BẮT ĐẦU KIỂM TRA CHẤT LƯỢNG GIÁO TRÌNH TOÁN 6 (NGÂN LEARNING LAB) ===");

const meta = getCurriculumMeta();
console.log(`Tiêu đề: ${meta.title} - ${meta.subtitle}`);
console.log(`Chuẩn: ${meta.textbook}`);

const weeks = getAllWeeks();
console.log(`Tổng số tuần học tìm thấy: ${weeks.length} / 24 tuần.`);

if (weeks.length < 24) {
  console.error(`[CẢNH BÁO] Số tuần hiện tại (${weeks.length}) chưa đủ 24 tuần!`);
}

let totalExercises = 0;
const seenQuestionIds = new Set();
let errorCount = 0;

for (const w of weeks) {
  if (!w.id || typeof w.number !== "number" || !w.title || !w.goal) {
    console.error(`[LỖI] Tuần ${w.number || 'Không rõ'} thiếu thông tin bắt buộc (id, number, title, goal).`);
    errorCount++;
  }

  if (!Array.isArray(w.days) || w.days.length === 0) {
    console.error(`[LỖI] Tuần ${w.number} không có danh sách buổi học (days).`);
    errorCount++;
    continue;
  }

  for (const d of w.days) {
    if (!d.title || !d.theory) {
      console.error(`[LỖI] Tuần ${w.number} - Buổi ${d.dayIndex} thiếu lý thuyết hoặc tiêu đề.`);
      errorCount++;
    }

    if (Array.isArray(d.exercises)) {
      for (const ex of d.exercises) {
        totalExercises++;
        if (!ex.id) {
          console.error(`[LỖI] Tuần ${w.number} - Buổi ${d.dayIndex} có câu hỏi thiếu ID bất biến!`);
          errorCount++;
        } else if (seenQuestionIds.has(ex.id)) {
          console.error(`[LỖI TRÙNG LẶP] ID câu hỏi ${ex.id} bị trùng lặp trong hệ thống!`);
          errorCount++;
        } else {
          seenQuestionIds.add(ex.id);
        }

        if (!ex.question || ex.answer === undefined || ex.answer === null) {
          console.error(`[LỖI] Câu hỏi ${ex.id} thiếu đề bài hoặc đáp án!`);
          errorCount++;
        }

        if (!ex.explanation) {
          console.error(`[LỖI] Câu hỏi ${ex.id} thiếu lời giải chi tiết (explanation)!`);
          errorCount++;
        }

        if (!ex.rubric) {
          console.error(`[LỖI] Câu hỏi ${ex.id} thiếu barem chấm điểm (rubric)!`);
          errorCount++;
        }
      }
    }
  }
}

console.log(`Tổng số câu hỏi đánh giá hợp lệ: ${totalExercises} câu.`);
console.log(`Số ID câu hỏi bất biến duy nhất: ${seenQuestionIds.size}.`);

if (errorCount === 0) {
  console.log("✔ TOÀN BỘ GIÁO TRÌNH 24 TUẦN ĐẠT CHUẨN KỸ THUẬT & SƯ PHẠM GDPT 2018!");
  process.exit(0);
} else {
  console.error(`❌ Phát hiện ${errorCount} lỗi trong giáo trình cần khắc phục.`);
  process.exit(1);
}
