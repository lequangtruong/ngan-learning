// js/parent-feedback.js - Cổng Phụ Huynh Báo Lỗi & Tự Động Sửa Code Trực Tiếp Trên Server

import { addParentFeedback, getAllFeedbacks, markFeedbackPatched } from "../data/data-core.js";
import { escapeHtml } from "./core.js";

function getApiEndpoint(endpointPath) {
  const isSubpath = typeof window !== "undefined" && window.location.pathname.includes("ngan-learning");
  const clean = endpointPath.startsWith("/") ? endpointPath : `/${endpointPath}`;
  return isSubpath ? `/ngan-learning${clean}` : clean;
}

/**
 * Gửi yêu cầu tới server để tự động vá code trực tiếp trong file module
 */
export async function patchCodeOnServer(feedbackPayload) {
  try {
    const res = await fetch(getApiEndpoint("/api/parent-feedback/patch"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedbackPayload)
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Lấy lịch sử các bản vá từ server
 */
export async function getPatchLogsFromServer() {
  try {
    const res = await fetch(getApiEndpoint("/api/patch-logs"));
    if (!res.ok) return [];
    return await res.json();
  } catch (_) {
    return [];
  }
}

/**
 * Hiển thị Modal báo lỗi kèm tính năng Tự Động Sửa Code Trên Server
 */
export function showReportIssueModal(context = {}) {
  const existing = document.getElementById("parentFeedbackModal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "parentFeedbackModal";
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-header">
        <h3>⚠️ Phụ Huynh Báo Lỗi & Sửa Code Tự Động</h3>
        <button type="button" class="modal-close-btn" id="closeFbModalBtn">✕</button>
      </div>
      <form id="parentFeedbackForm" class="modal-body">
        <div class="form-row">
          <label>Mã câu hỏi (Bất biến):</label>
          <input type="text" id="fbQuestionId" value="${escapeHtml(context.questionId || 'CHUNG')}" readonly class="input-readonly" />
        </div>
        <div class="form-row-grid">
          <div>
            <label>Tuần học:</label>
            <input type="number" id="fbWeek" value="${context.weekNumber || 1}" readonly class="input-readonly" />
          </div>
          <div>
            <label>Buổi học:</label>
            <input type="number" id="fbDay" value="${context.dayNumber || 1}" readonly class="input-readonly" />
          </div>
        </div>
        <div class="form-row">
          <label>Loại vấn đề:</label>
          <select id="fbErrorType">
            <option value="SAI_DAP_AN">Sai đáp án hoặc barem chấm</option>
            <option value="SAI_DE_BAI">Đề bài bị nhầm dấu / nhầm số liệu</option>
            <option value="GIAI_THICH_CHUA_RO">Lời giải / gợi ý chưa rõ ràng</option>
            <option value="DE_QUA_KHO_DE">Mức độ quá khó hoặc quá dễ</option>
            <option value="LOI_HIEN_THI">Lỗi hiển thị công thức / hình vẽ</option>
          </select>
        </div>
        <div class="form-row">
          <label>Mô tả chi tiết lỗi phát hiện:</label>
          <textarea id="fbDescription" rows="3" placeholder="Ví dụ: Đề câu c đang ghi là 12 - 25 = 13 là sai đáp án, phải là -13." required></textarea>
        </div>

        <!-- Vùng chỉnh sửa trực tiếp đáp án/đề bài để server vá file ngay lập tức -->
        <div class="form-row-box">
          <label class="font-bold text-primary">⚡ Tùy chọn sửa trực tiếp mã nguồn (Server tự cập nhật file .js):</label>
          <div class="form-row">
            <label>Đáp án đúng mới (Nếu cần sửa):</label>
            <input type="text" id="fbDirectAnswer" placeholder="Ví dụ: -13 hoặc 56 hoặc 3/4" />
          </div>
          <div class="form-row">
            <label>Lời giải mới (Nếu cần bổ sung):</label>
            <textarea id="fbDirectExplanation" rows="2" placeholder="Ví dụ: 12 - 25 = -(25 - 12) = -13."></textarea>
          </div>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn btn-secondary" id="cancelFbBtn">Hủy</button>
          <button type="submit" class="btn btn-warning" id="submitFbLocalBtn">Chỉ Lưu Phiếu</button>
          <button type="button" class="btn btn-primary" id="autoPatchServerBtn">⚡ Server Tự Sửa Code Ngay</button>
        </div>
        <div id="patchStatusMsg" class="patch-status-msg" style="display:none;"></div>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  const close = () => modal.remove();
  modal.querySelector("#closeFbModalBtn").addEventListener("click", close);
  modal.querySelector("#cancelFbBtn").addEventListener("click", close);

  const getPayload = () => {
    const qid = document.getElementById("fbQuestionId").value;
    const directAns = document.getElementById("fbDirectAnswer").value.trim();
    const directExp = document.getElementById("fbDirectExplanation").value.trim();

    return {
      questionId: qid,
      weekNumber: parseInt(document.getElementById("fbWeek").value, 10) || 1,
      dayNumber: parseInt(document.getElementById("fbDay").value, 10) || 1,
      lessonTitle: context.lessonTitle || "",
      moduleFile: context.moduleFile || "",
      errorType: document.getElementById("fbErrorType").value,
      description: document.getElementById("fbDescription").value,
      parentProposedFix: directAns ? `Sửa đáp án thành: ${directAns}` : "",
      patchData: directAns || directExp ? {
        answer: directAns || undefined,
        explanation: directExp || undefined
      } : undefined
    };
  };

  // Nút 1: Chỉ lưu phiếu vào IndexedDB
  modal.querySelector("#parentFeedbackForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = modal.querySelector("#submitFbLocalBtn");
    btn.disabled = true;
    btn.textContent = "Đang lưu...";

    const feedback = getPayload();
    const record = await addParentFeedback(feedback);
    close();

    if (record) {
      alert(`Đã lưu phiếu báo lỗi (${record.id}) vào Cổng Phụ Huynh.`);
    }
  });

  // Nút 2: TỰ ĐỘNG SỬA CODE TRÊN SERVER NGAY LẬP TỨC
  modal.querySelector("#autoPatchServerBtn").addEventListener("click", async () => {
    const statusMsg = modal.querySelector("#patchStatusMsg");
    const autoBtn = modal.querySelector("#autoPatchServerBtn");
    const desc = document.getElementById("fbDescription").value.trim();

    if (!desc && !document.getElementById("fbDirectAnswer").value.trim()) {
      alert("Vui lòng nhập mô tả lỗi hoặc điền đáp án đúng mới để server tiến hành sửa code!");
      return;
    }

    autoBtn.disabled = true;
    autoBtn.textContent = "⏳ Server đang tự động sửa code...";
    statusMsg.style.display = "block";
    statusMsg.className = "patch-status-msg info";
    statusMsg.textContent = "Đang tìm file module, cập nhật mã nguồn và kiểm tra cú pháp JS...";

    const payload = getPayload();
    const res = await patchCodeOnServer(payload);

    if (res && res.success) {
      statusMsg.className = "patch-status-msg success";
      statusMsg.textContent = `✔ Thành công: ${res.message}`;
      payload.status = "PATCHED_VERIFIED";
      await addParentFeedback(payload);
      setTimeout(() => {
        alert(`🎉 SERVER ĐÃ TỰ ĐỘNG SỬA CODE THÀNH CÔNG!\n- File: ${res.targetFile}\n- Câu hỏi: ${res.questionId}\n- Cú pháp: HỢP LỆ 100%.`);
        close();
        window.location.reload();
      }, 1000);
    } else {
      autoBtn.disabled = false;
      autoBtn.textContent = "⚡ Thử lại";
      statusMsg.className = "patch-status-msg error";
      statusMsg.textContent = `❌ Lỗi khi sửa code: ${res.error || "Không thể kết nối tới server"}`;
    }
  });
}

/**
 * Sinh Prompt chuẩn kỹ thuật (Sanitized Guided Patch Request) làm dự phòng
 */
export function generateGuidedPatchPrompt(feedback) {
  if (!feedback) return "";

  const payload = {
    ticketId: feedback.id,
    dateReported: feedback.createdAt,
    targetQuestionId: feedback.questionId,
    weekNumber: feedback.weekNumber,
    dayNumber: feedback.dayNumber,
    targetFile: feedback.moduleFile || "data/modules/mod-01-foundation.js",
    errorType: feedback.errorType,
    parentFeedback: feedback.description,
    parentProposedFix: feedback.parentProposedFix
  };

  return [
    `### [YÊU CẦU SỬA MÃ NGUỒN TỪ PHỤ HUYNH NGÂN - MÃ TICKET: ${feedback.id}]`,
    `Dưới đây là thông tin lỗi đã được xác thực cần cập nhật trong kho dữ liệu bài học:`,
    "```json",
    JSON.stringify(payload, null, 2),
    "```",
    `HÀNH ĐỘNG YÊU CẦU CHO AI AGENT:`,
    `1. Mở file dữ liệu \`${payload.targetFile}\` (hoặc module tương ứng).`,
    `2. Tìm chính xác câu hỏi có ID bất biến: \`${payload.targetQuestionId}\`.`,
    `3. Cập nhật lại đề bài, đáp án hoặc lời giải theo đúng mô tả của phụ huynh.`,
    `4. Chạy lệnh kiểm tra \`npm test\` để bảo đảm toàn bộ cú pháp và test suite đều PASS.`,
    `5. Sau khi sửa xong, thông báo lại cho phụ huynh để xác nhận bản vá.`
  ].join("\n");
}
