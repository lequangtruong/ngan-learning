// js/games/bar-model.js - Game 14: Sơ Đồ Đoạn Thẳng Singapore (Bar Model Studio - Toán 6 Tỉ Số & Phân Số)
import { BAR_MODEL_CHALLENGES, BAR_MODEL_LEVELS } from "../../data/games/bar-model-challenges.js";

export function renderBarModelSvg(bar1, bar2, bar3, { width = 420, height = 200 } = {}) {
  const barHeight = 32;
  const startX = 110;
  const unitWidth = 32;

  const renderSingleBar = (bar, y, color, strokeColor) => {
    if (!bar) return "";
    let rects = "";
    for (let i = 0; i < bar.parts; i++) {
      rects += `
        <rect x="${startX + i * unitWidth}" y="${y}" width="${unitWidth}" height="${barHeight}" fill="${color}" stroke="${strokeColor}" stroke-width="1.8" rx="3" />
        <text x="${startX + i * unitWidth + unitWidth / 2}" y="${y + barHeight / 2 + 5}" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">1p</text>
      `;
    }
    if (bar.extraDiff > 0) {
      rects += `
        <rect x="${startX + bar.parts * unitWidth}" y="${y}" width="${unitWidth * 0.8}" height="${barHeight}" fill="#fca5a5" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3,3" rx="3" />
        <text x="${startX + bar.parts * unitWidth + (unitWidth * 0.8) / 2}" y="${y + barHeight / 2 + 5}" font-size="11" font-weight="700" fill="#991b1b" text-anchor="middle">+d</text>
      `;
    }
    return `
      <g>
        <text x="${startX - 10}" y="${y + barHeight / 2 + 5}" font-size="13" font-weight="700" fill="#334155" text-anchor="end">${bar.name}</text>
        ${rects}
      </g>
    `;
  };

  return `
    <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" style="background:#f8fafc; border-radius:12px; border:1px solid #e2e8f0; display:block">
      ${renderSingleBar(bar1, 30, "#3b82f6", "#1d4ed8")}
      ${renderSingleBar(bar2, 85, "#10b981", "#047857")}
      ${bar3 ? renderSingleBar(bar3, 140, "#f59e0b", "#b45309") : ''}
    </svg>
  `;
}

export const BarModelGame = {
  id: "bar-model",
  title: "Sơ Đồ Đoạn Thẳng Singapore",
  subtitle: "Mô hình hóa bài toán lời văn bằng sơ đồ đoạn thẳng trực quan (Tổng-Tỉ, Hiệu-Tỉ, Phân số)",
  icon: "📊",
  targetCompetency: "algebra",
  weight: 1.0,

  render(container, onComplete) {
    let challengeIdx = 0;
    let score = 0;
    let bar1Parts = 1;
    let bar2Parts = 1;
    let bar3Parts = 1;
    let studentAns = "";
    let isChecked = false;
    let isCorrect = false;

    function resetChallenge() {
      const ch = BAR_MODEL_CHALLENGES[challengeIdx];
      bar1Parts = 1;
      bar2Parts = 1;
      bar3Parts = 1;
      studentAns = "";
      isChecked = false;
      isCorrect = false;
    }

    function checkAnswer() {
      const ch = BAR_MODEL_CHALLENGES[challengeIdx];
      const val = parseInt(studentAns.trim(), 10);
      const targetVal = parseInt(String(ch.target?.answer ?? ch.answer ?? 0), 10);

      // Kiểm tra cả mô hình số phần vẽ và đáp số
      const partsMatch = (bar1Parts === ch.target.bar1Parts) && (bar2Parts === ch.target.bar2Parts);
      const answerMatch = val === targetVal;

      isCorrect = answerMatch;
      if (isCorrect && !isChecked) score += 25;
      isChecked = true;
      renderView();
    }

    resetChallenge();

    function renderView() {
      const ch = BAR_MODEL_CHALLENGES[challengeIdx];
      const bar1 = { name: ch.target?.bar1Name || "Thanh A", parts: bar1Parts, extraDiff: 0 };
      const bar2 = { name: ch.target?.bar2Name || "Thanh B", parts: bar2Parts, extraDiff: 0 };
      const bar3 = ch.target?.hasBar3 ? { name: ch.target?.bar3Name || "Thanh C", parts: bar3Parts, extraDiff: 0 } : null;

      const svgMarkup = renderBarModelSvg(bar1, bar2, bar3, { height: bar3 ? 190 : 140 });

      container.innerHTML = `
        <div class="game-arena bar-model-arena" style="max-width:740px; margin:0 auto; display:flex; flex-direction:column; gap:16px">
          <div class="game-hud" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; padding:12px 18px; background:#fff; border-radius:12px; border:1px solid #e2e8f0">
            <div>
              <span style="font-weight:700">Bài toán:</span>
              <select id="bmSelect" style="padding:6px 10px; border-radius:8px; border:1px solid #cbd5e1; font-weight:600">
                ${BAR_MODEL_CHALLENGES.map((item, idx) => `
                  <option value="${idx}" ${idx === challengeIdx ? 'selected' : ''}>
                    Bài ${idx + 1}: ${item.title || 'Bài toán ' + (idx + 1)}
                  </option>
                `).join("")}
              </select>
            </div>
            <div style="display:flex; align-items:center; gap:14px">
              <span style="font-size:14px; font-weight:600">Tiến độ: <b>${challengeIdx + 1}/${BAR_MODEL_CHALLENGES.length}</b></span>
              <span style="font-size:14px; font-weight:600">Điểm: <b style="color:#4f46e5; font-size:16px">${score}</b></span>
            </div>
          </div>

          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:20px; box-shadow:0 4px 16px rgba(0,0,0,0.04); display:flex; flex-direction:column; gap:16px">
            <h3 style="margin:0; color:#1e1b4b; font-size:18px">${ch.title || 'Bài toán Sơ Đồ Đoạn Thẳng'}</h3>
            <p style="margin:0; font-size:15px; color:#334155; line-height:1.6; font-weight:500">${ch.story || ch.prompt || ch.question}</p>

            <!-- Trực quan hóa Sơ Đồ Đoạn Thẳng SVG -->
            <div>
              ${svgMarkup}
            </div>

            <!-- Bộ công cụ điều chỉnh số phần từng thanh -->
            <div style="background:#f1f5f9; padding:14px; border-radius:10px; display:flex; flex-direction:column; gap:10px">
              <div style="font-size:13px; font-weight:700; color:#475569">Thiết lập số phần bằng nhau trên sơ đồ:</div>
              <div style="display:flex; gap:16px; flex-wrap:wrap">
                <div style="display:flex; align-items:center; gap:8px">
                  <span style="font-size:13px; font-weight:600">${bar1.name}:</span>
                  <button class="btn btn-secondary btn-sm" id="bmBar1Minus">-</button>
                  <b style="font-size:15px; min-width:20px; text-align:center">${bar1Parts}</b>
                  <button class="btn btn-secondary btn-sm" id="bmBar1Plus">+</button>
                </div>
                <div style="display:flex; align-items:center; gap:8px">
                  <span style="font-size:13px; font-weight:600">${bar2.name}:</span>
                  <button class="btn btn-secondary btn-sm" id="bmBar2Minus">-</button>
                  <b style="font-size:15px; min-width:20px; text-align:center">${bar2Parts}</b>
                  <button class="btn btn-secondary btn-sm" id="bmBar2Plus">+</button>
                </div>
                ${bar3 ? `
                  <div style="display:flex; align-items:center; gap:8px">
                    <span style="font-size:13px; font-weight:600">${bar3.name}:</span>
                    <button class="btn btn-secondary btn-sm" id="bmBar3Minus">-</button>
                    <b style="font-size:15px; min-width:20px; text-align:center">${bar3Parts}</b>
                    <button class="btn btn-secondary btn-sm" id="bmBar3Plus">+</button>
                  </div>
                ` : ''}
              </div>
            </div>

            <!-- Nhập đáp số -->
            <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap">
              <span style="font-weight:700; font-size:14px; color:#1e1b4b">${ch.questionLabel || 'Đáp số của bài toán:'}</span>
              <input type="text" inputmode="numeric" id="bmAnswerInput" value="${studentAns}" placeholder="Nhập số..." style="padding:10px 14px; border:2px solid #cbd5e1; border-radius:8px; font-size:16px; font-weight:700; width:140px" />
              <button class="btn btn-primary" id="bmCheckBtn">Kiểm Tra</button>
            </div>

            ${isChecked ? `
              <div style="padding:14px; border-radius:10px; background:${isCorrect ? '#f0fdf4' : '#fef2f2'}; border:1px solid ${isCorrect ? '#86efac' : '#fecaca'}">
                <div style="font-weight:700; color:${isCorrect ? '#15803d' : '#dc2626'}; margin-bottom:4px">
                  ${isCorrect ? '✔ Hoàn toàn chính xác! (+25 điểm)' : '✘ Chưa đúng rồi, hãy đọc kỹ gợi ý nhé!'}
                </div>
                <div style="font-size:13px; color:#475569; line-height:1.5">
                  ${ch.explanation || `Đáp án đúng là: ${ch.target?.answer ?? ch.answer}`}
                </div>
              </div>
            ` : ''}

            <!-- Điều hướng -->
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; border-top:1px solid #f1f5f9; padding-top:14px">
              <div style="display:flex; gap:8px">
                <button class="btn btn-secondary btn-sm" id="bmPrevBtn" ${challengeIdx === 0 ? 'disabled' : ''}>← Bài Trước</button>
                <button class="btn btn-secondary btn-sm" id="bmNextBtn" ${challengeIdx >= BAR_MODEL_CHALLENGES.length - 1 ? 'disabled' : ''}>Bài Sau →</button>
              </div>
              <button class="btn btn-outline" id="bmExitBtn">Về Menu</button>
            </div>
          </div>
        </div>
      `;

      // Gắn sự kiện nút +/- thanh
      container.querySelector("#bmBar1Minus")?.addEventListener("click", () => {
        if (bar1Parts > 1) { bar1Parts--; renderView(); }
      });
      container.querySelector("#bmBar1Plus")?.addEventListener("click", () => {
        if (bar1Parts < 8) { bar1Parts++; renderView(); }
      });

      container.querySelector("#bmBar2Minus")?.addEventListener("click", () => {
        if (bar2Parts > 1) { bar2Parts--; renderView(); }
      });
      container.querySelector("#bmBar2Plus")?.addEventListener("click", () => {
        if (bar2Parts < 8) { bar2Parts++; renderView(); }
      });

      container.querySelector("#bmBar3Minus")?.addEventListener("click", () => {
        if (bar3Parts > 1) { bar3Parts--; renderView(); }
      });
      container.querySelector("#bmBar3Plus")?.addEventListener("click", () => {
        if (bar3Parts < 8) { bar3Parts++; renderView(); }
      });

      const ansInput = container.querySelector("#bmAnswerInput");
      ansInput?.addEventListener("input", (e) => {
        studentAns = e.target.value;
      });
      ansInput?.addEventListener("keydown", (e) => {
        if (e.key === "Enter") checkAnswer();
      });

      container.querySelector("#bmCheckBtn")?.addEventListener("click", checkAnswer);

      container.querySelector("#bmSelect")?.addEventListener("change", (e) => {
        challengeIdx = parseInt(e.target.value, 10);
        resetChallenge();
        renderView();
      });

      container.querySelector("#bmPrevBtn")?.addEventListener("click", () => {
        if (challengeIdx > 0) {
          challengeIdx--;
          resetChallenge();
          renderView();
        }
      });

      container.querySelector("#bmNextBtn")?.addEventListener("click", () => {
        if (challengeIdx < BAR_MODEL_CHALLENGES.length - 1) {
          challengeIdx++;
          resetChallenge();
          renderView();
        }
      });

      container.querySelector("#bmExitBtn")?.addEventListener("click", () => {
        onComplete(score);
      });
    }

    renderView();
  }
};
