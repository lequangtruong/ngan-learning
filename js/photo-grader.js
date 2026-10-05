// js/photo-grader.js - Client AI Vision Grader chấm bài viết tay đa phương thức

import { compressImageToJpeg } from "./image-compressor.js";
import { escapeHtml } from "./core.js";

export async function processAndUploadSolutionPhoto(file, questionContext) {
  if (!file) throw new Error("Chưa chọn tệp ảnh.");

  // 1. Nén ảnh bằng Canvas phần cứng
  const compressed = await compressImageToJpeg(file, { maxWidth: 1400, quality: 0.82 });

  return {
    previewUrl: compressed.dataUrl,
    base64Data: compressed.base64,
    sizeBytes: compressed.sizeBytes,
    questionId: questionContext.id,
    questionText: questionContext.question,
    rubric: questionContext.rubric || "Barem chuẩn từng bước"
  };
}

function getApiEndpoint(endpointPath) {
  const isSubpath = typeof window !== "undefined" && window.location.pathname.includes("ngan-learning");
  const clean = endpointPath.startsWith("/") ? endpointPath : `/${endpointPath}`;
  return isSubpath ? `/ngan-learning${clean}` : clean;
}

/**
 * Gửi ảnh lên serverless Vision endpoint để phân tích
 */
export async function gradePhotoSolution(payload) {
  try {
    const res = await fetch(getApiEndpoint("/api/grade-math"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        questionId: payload.questionId,
        questionText: payload.questionText,
        rubric: payload.rubric,
        imageBase64: payload.base64Data
      })
    });

    if (!res.ok) {
      return {
        ok: false,
        offline: true,
        savedOffline: false,
        message: "Không thể kết nối máy chủ AI Vision để chấm bài lúc này (máy chủ tạm ngắt kết nối). Vui lòng thử lại sau.",
        gradedAt: new Date().toISOString()
      };
    }
    return await res.json();
  } catch {
    return {
      ok: false,
      offline: true,
      savedOffline: false,
      message: "Thiết bị đang ngoại tuyến hoặc không thể kết nối tới máy chủ AI Vision. Vui lòng kết nối WiFi/Internet và chụp gửi lại để chấm điểm nhé!",
      gradedAt: new Date().toISOString()
    };
  }
}

/**
 * Render HTML Bảng Phân Tích Kết Quả Chấm Ảnh
 */
export function renderGradingResultHtml(result) {
  if (!result) return "";

  if (!result.ok || result.offline) {
    return `
      <div class="photo-grading-card offline-saved" role="status" aria-live="polite">
        <div class="grading-offline-header">
          <span class="offline-icon">⚠️</span>
          <h4>Ngoại Tuyến · Chưa Thể Chấm Điểm AI</h4>
        </div>
        <p class="offline-desc">${escapeHtml(result.message || "Tính năng phân tích chữ viết tay tự luận yêu cầu kết nối mạng đến máy chủ AI Vision. Vui lòng kết nối WiFi/Internet và chụp gửi lại nhé!")}</p>
        <div class="offline-tag">Trạng thái: Cần kết nối Internet để chấm bài</div>
      </div>
    `;
  }

  if (result.needsRetake) {
    return `
      <div class="photo-grading-card needs-retake">
        <h4>📷 Nét chữ chưa đủ rõ nét</h4>
        <p>Ảnh chụp bị mờ hoặc thiếu sáng khiến hệ thống không thể đọc chuẩn xác các số mũ và dấu âm. Ngân hãy chụp lại ở góc sáng và thẳng đứng hơn nhé!</p>
      </div>
    `;
  }

  const lineItems = (result.lines || []).map((l) => {
    const isOk = l.status === "CORRECT";
    return `
      <div class="grading-line-item ${isOk ? 'is-correct' : 'is-wrong'}">
        <span class="line-badge">${isOk ? '✔ ĐÚNG' : '✘ LỖI SAI'}</span>
        <div class="line-desc">
          <strong>Dòng ${l.step}:</strong> ${escapeHtml(l.text)}
          ${l.note ? `<div class="line-note">${escapeHtml(l.note)}</div>` : ''}
        </div>
      </div>
    `;
  }).join("");

  return `
    <div class="photo-grading-card">
      <div class="grading-header">
        <div class="grading-score-badge">
          <span class="score-num">${result.score}</span> / ${result.maxScore || 10} điểm
        </div>
        <span class="confidence-tag">Độ tin cậy AI: ${Math.round((result.confidenceScore || 0.9) * 100)}%</span>
      </div>
      <div class="grading-lines-list">
        ${lineItems}
      </div>
      <div class="grading-feedback-box">
        <div class="praise-text">👏 <b>Lời khen:</b> ${escapeHtml(result.praise || '')}</div>
        ${result.advice ? `<div class="advice-text">💡 <b>Gợi ý sửa:</b> ${escapeHtml(result.advice)}</div>` : ''}
      </div>
    </div>
  `;
}
