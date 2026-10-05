// js/games/balance-detective.js - Game 15: Thám Tử Cân Bóng Giả Olympic (Weighing Detective - SASMO & AMC 8)
import { DETECTIVE_PUZZLES } from "../../data/games/balance-scale-detective.js";

export const BalanceDetectiveGame = {
  id: "balance-detective",
  title: "Thám Tử Cân Bóng Giả",
  subtitle: "Bài toán chia ba (Trisection) kinh điển Olympic Toán quốc tế - Tìm bóng giả bằng số lần cân tối thiểu",
  icon: "⚖️",
  targetCompetency: "logic",
  weight: 1.0,

  render(container, onComplete) {
    let puzzleIdx = 0;
    let score = 0;
    let leftPan = [];
    let rightPan = [];
    let weighCount = 0;
    let weighHistory = [];
    let currentTilt = 0;
    let isSolved = false;
    let feedbackMsg = "";

    function resetPuzzle() {
      leftPan = [];
      rightPan = [];
      weighCount = 0;
      weighHistory = [];
      currentTilt = 0;
      isSolved = false;
      feedbackMsg = "";
    }

    function doWeigh() {
      const p = DETECTIVE_PUZZLES[puzzleIdx];
      if (leftPan.length === 0 && rightPan.length === 0) {
        feedbackMsg = "⚠️ Em hãy đặt các quả bóng lên 2 đĩa cân trước khi bấm Cân!";
        renderView();
        return;
      }
      if (leftPan.length !== rightPan.length) {
        feedbackMsg = "⚠️ Hai đĩa cân cần có số lượng bóng bằng nhau để so sánh!";
        renderView();
        return;
      }

      weighCount++;
      const hasFakeLeft = leftPan.includes(p.fakeBallIndex);
      const hasFakeRight = rightPan.includes(p.fakeBallIndex);

      let tilt = 0;
      let outcome = "Cân thăng bằng (=)";

      if (p.fakeType === "lighter") {
        if (hasFakeLeft) {
          tilt = -10; // Đĩa trái nhẹ hơn -> nhấc lên cao
          outcome = "Đĩa trái nhẹ hơn đĩa phải (▲ Trái | ▼ Phải)";
        } else if (hasFakeRight) {
          tilt = 10; // Đĩa phải nhẹ hơn -> nhấc lên cao
          outcome = "Đĩa phải nhẹ hơn đĩa trái (▼ Trái | ▲ Phải)";
        }
      } else {
        if (hasFakeLeft) {
          tilt = 10; // Đĩa trái nặng hơn -> chìm xuống
          outcome = "Đĩa trái nặng hơn đĩa phải (▼ Trái | ▲ Phải)";
        } else if (hasFakeRight) {
          tilt = -10; // Đĩa phải nặng hơn -> chìm xuống
          outcome = "Đĩa phải nặng hơn đĩa trái (▲ Trái | ▼ Phải)";
        }
      }

      currentTilt = tilt;
      weighHistory.push({
        num: weighCount,
        left: [...leftPan],
        right: [...rightPan],
        outcome
      });

      feedbackMsg = `Kết quả lần cân ${weighCount}: ${outcome}`;
      renderView();
    }

    function guessBall(num) {
      const p = DETECTIVE_PUZZLES[puzzleIdx];
      if (num === p.fakeBallIndex) {
        isSolved = true;
        const withinQuota = weighCount <= p.maxWeighsAllowed;
        score += withinQuota ? 50 : 25;
        feedbackMsg = `🎉 CHÍNH XÁC TUYỆT ĐỐI! Quả bóng số ${p.fakeBallIndex} chính là quả bóng giả! (+${withinQuota ? 50 : 25} điểm)`;
      } else {
        feedbackMsg = `✘ Quả bóng số ${num} là bóng thật tiêu chuẩn! Hãy xem lại lịch sử cân nhé. Gợi ý: ${p.hint}`;
      }
      renderView();
    }

    function renderSvg() {
      const svgWidth = 520;
      const svgHeight = 220;
      const angle = currentTilt || 0;
      const rad = (angle * Math.PI) / 180;
      const beamHalf = 150;
      const pivotX = svgWidth / 2;
      const pivotY = 90;

      const leftX = pivotX - beamHalf * Math.cos(rad);
      const leftY = pivotY + beamHalf * Math.sin(rad);
      const rightX = pivotX + beamHalf * Math.cos(rad);
      const rightY = pivotY - beamHalf * Math.sin(rad);

      const ropeLen = 55;
      const leftPanY = leftY + ropeLen;
      const rightPanY = rightY + ropeLen;

      const renderBalls = (list) => {
        const count = list.length;
        const spacing = 22;
        return list.map((bNum, i) => {
          const offset = (i - (count - 1) / 2) * spacing;
          return `
            <g transform="translate(${offset}, -14)">
              <circle cx="0" cy="0" r="11" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1.8" />
              <text x="0" y="4" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle">${bNum}</text>
            </g>
          `;
        }).join("");
      };

      return `
        <svg viewBox="0 0 ${svgWidth} ${svgHeight}" style="width:100%; max-height:220px; background:#f8fafc; border-radius:12px; border:1px solid #e2e8f0; display:block">
          <rect x="220" y="195" width="80" height="15" rx="4" fill="#475569" />
          <rect x="254" y="90" width="12" height="110" rx="3" fill="#64748b" />
          <circle cx="${pivotX}" cy="${pivotY}" r="10" fill="#0284c7" stroke="#0369a1" stroke-width="2" />
          <line x1="${leftX}" y1="${leftY}" x2="${rightX}" y2="${rightY}" stroke="#334155" stroke-width="5" stroke-linecap="round" />
          <line x1="${leftX}" y1="${leftY}" x2="${leftX - 35}" y2="${leftPanY}" stroke="#94a3b8" stroke-width="1.5" />
          <line x1="${leftX}" y1="${leftY}" x2="${leftX + 35}" y2="${leftPanY}" stroke="#94a3b8" stroke-width="1.5" />
          <path d="M ${leftX - 45} ${leftPanY} Q ${leftX} ${leftPanY + 16} ${leftX + 45} ${leftPanY} Z" fill="#e2e8f0" stroke="#475569" stroke-width="2" />
          <g transform="translate(${leftX}, ${leftPanY})">${renderBalls(leftPan)}</g>
          <line x1="${rightX}" y1="${rightY}" x2="${rightX - 35}" y2="${rightPanY}" stroke="#94a3b8" stroke-width="1.5" />
          <line x1="${rightX}" y1="${rightY}" x2="${rightX + 35}" y2="${rightPanY}" stroke="#94a3b8" stroke-width="1.5" />
          <path d="M ${rightX - 45} ${rightPanY} Q ${rightX} ${rightPanY + 16} ${rightX + 45} ${rightPanY} Z" fill="#e2e8f0" stroke="#475569" stroke-width="2" />
          <g transform="translate(${rightX}, ${rightPanY})">${renderBalls(rightPan)}</g>
        </svg>
      `;
    }

    resetPuzzle();

    function renderView() {
      const p = DETECTIVE_PUZZLES[puzzleIdx];
      const allBalls = Array.from({ length: p.ballCount }, (_, i) => i + 1);
      const remainingBalls = allBalls.filter(b => !leftPan.includes(b) && !rightPan.includes(b));

      container.innerHTML = `
        <div class="game-arena balance-detective-arena" style="max-width:740px; margin:0 auto; display:flex; flex-direction:column; gap:16px">
          <div class="game-hud" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; padding:12px 18px; background:#fff; border-radius:12px; border:1px solid #e2e8f0">
            <div>
              <span style="font-weight:700">Vụ án:</span>
              <select id="bdSelect" style="padding:6px 10px; border-radius:8px; border:1px solid #cbd5e1; font-weight:600">
                ${DETECTIVE_PUZZLES.map((item, idx) => `
                  <option value="${idx}" ${idx === puzzleIdx ? 'selected' : ''}>
                    ${item.title}
                  </option>
                `).join("")}
              </select>
            </div>
            <div style="display:flex; align-items:center; gap:14px">
              <span style="font-size:14px; font-weight:600">Lần cân: <b style="color:${weighCount > p.maxWeighsAllowed ? '#ef4444' : '#0284c7'}">${weighCount}</b> / ${p.maxWeighsAllowed}</span>
              <span style="font-size:14px; font-weight:600">Điểm: <b style="color:#4f46e5; font-size:16px">${score}</b></span>
            </div>
          </div>

          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:20px; box-shadow:0 4px 16px rgba(0,0,0,0.04); display:flex; flex-direction:column; gap:16px">
            <h3 style="margin:0; color:#1e1b4b; font-size:18px">⚖️ ${p.title}</h3>
            <p style="margin:0; font-size:14px; color:#334155; line-height:1.5">${p.problem}</p>

            <!-- Trực quan hóa Cân đĩa SVG -->
            <div>
              ${renderSvg()}
            </div>

            <!-- Bàn để bóng chưa xếp & Điều khiển xếp đĩa -->
            <div style="background:#f1f5f9; padding:14px; border-radius:10px; display:flex; flex-direction:column; gap:10px">
              <div style="font-size:13px; font-weight:700; color:#475569">
                Chạm bóng để đặt vào đĩa trái hoặc đĩa phải:
              </div>
              <div style="display:flex; gap:8px; flex-wrap:wrap">
                ${allBalls.map(num => {
                  let loc = "bàn";
                  let bg = "#ffffff";
                  let border = "#cbd5e1";
                  let color = "#1e293b";
                  if (leftPan.includes(num)) {
                    loc = "trái";
                    bg = "#dbeafe";
                    border = "#3b82f6";
                    color = "#1d4ed8";
                  } else if (rightPan.includes(num)) {
                    loc = "phải";
                    bg = "#dcfce7";
                    border = "#22c55e";
                    color = "#15803d";
                  }

                  return `
                    <div style="display:flex; flex-direction:column; align-items:center; gap:4px">
                      <button class="bd-ball-btn" data-ball="${num}" style="width:42px; height:42px; border-radius:50%; font-size:16px; font-weight:800; cursor:pointer; background:${bg}; border:2px solid ${border}; color:${color}; box-shadow:0 2px 4px rgba(0,0,0,0.08)">
                        ${num}
                      </button>
                      <span style="font-size:10px; font-weight:700; color:#64748b">${loc}</span>
                    </div>
                  `;
                }).join("")}
              </div>

              <div style="display:flex; gap:10px; margin-top:6px; flex-wrap:wrap">
                <button class="btn btn-primary" id="bdWeighBtn" style="font-weight:700">⚖️ Thực Hiện Cân</button>
                <button class="btn btn-secondary btn-sm" id="bdClearPansBtn">🔄 Thu Hồi Bóng Về Bàn</button>
              </div>
            </div>

            ${feedbackMsg ? `
              <div style="padding:12px 16px; border-radius:8px; background:${isSolved ? '#f0fdf4' : '#f8fafc'}; border:1px solid ${isSolved ? '#86efac' : '#cbd5e1'}; font-size:14px; font-weight:600; color:${isSolved ? '#15803d' : '#1e293b'}">
                ${feedbackMsg}
              </div>
            ` : ''}

            <!-- Phá Án: Chọn bóng giả -->
            <div style="background:#fff7ed; border:1px solid #fed7aa; padding:14px; border-radius:10px">
              <div style="font-size:13px; font-weight:700; color:#9a3412; margin-bottom:8px">
                🎯 KẾT LUẬN: Chọn quả bóng giả bạn nghi ngờ:
              </div>
              <div style="display:flex; gap:8px; flex-wrap:wrap">
                ${allBalls.map(num => `
                  <button class="btn btn-sm btn-outline bd-guess-btn" data-guess="${num}" style="font-weight:700">
                    Bóng ${num}
                  </button>
                `).join("")}
              </div>
            </div>

            <!-- Lịch sử các lần cân -->
            ${weighHistory.length > 0 ? `
              <div style="font-size:12px; color:#475569">
                <b>Nhật ký cân:</b>
                ${weighHistory.map(h => `
                  <div>• Lần ${h.num}: Trái [${h.left.join(',')}] vs Phải [${h.right.join(',')}] ➔ <b>${h.outcome}</b></div>
                `).join("")}
              </div>
            ` : ''}

            <!-- Điều hướng -->
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; border-top:1px solid #f1f5f9; padding-top:14px">
              <div style="display:flex; gap:8px">
                <button class="btn btn-secondary btn-sm" id="bdPrevBtn" ${puzzleIdx === 0 ? 'disabled' : ''}>← Vụ Trước</button>
                <button class="btn btn-secondary btn-sm" id="bdNextBtn" ${puzzleIdx >= DETECTIVE_PUZZLES.length - 1 ? 'disabled' : ''}>Vụ Sau →</button>
              </div>
              <button class="btn btn-outline" id="bdExitBtn">Về Menu</button>
            </div>
          </div>
        </div>
      `;

      // Gắn sự kiện chuyển bóng giữa bàn ➔ đĩa trái ➔ đĩa phải ➔ bàn
      container.querySelectorAll(".bd-ball-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const num = parseInt(btn.dataset.ball, 10);
          if (leftPan.includes(num)) {
            leftPan = leftPan.filter(x => x !== num);
            rightPan.push(num);
          } else if (rightPan.includes(num)) {
            rightPan = rightPan.filter(x => x !== num);
          } else {
            leftPan.push(num);
          }
          currentTilt = 0;
          renderView();
        });
      });

      container.querySelector("#bdWeighBtn")?.addEventListener("click", doWeigh);

      container.querySelector("#bdClearPansBtn")?.addEventListener("click", () => {
        leftPan = [];
        rightPan = [];
        currentTilt = 0;
        renderView();
      });

      container.querySelectorAll(".bd-guess-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          guessBall(parseInt(btn.dataset.guess, 10));
        });
      });

      container.querySelector("#bdSelect")?.addEventListener("change", (e) => {
        puzzleIdx = parseInt(e.target.value, 10);
        resetPuzzle();
        renderView();
      });

      container.querySelector("#bdPrevBtn")?.addEventListener("click", () => {
        if (puzzleIdx > 0) {
          puzzleIdx--;
          resetPuzzle();
          renderView();
        }
      });

      container.querySelector("#bdNextBtn")?.addEventListener("click", () => {
        if (puzzleIdx < DETECTIVE_PUZZLES.length - 1) {
          puzzleIdx++;
          resetPuzzle();
          renderView();
        }
      });

      container.querySelector("#bdExitBtn")?.addEventListener("click", () => {
        onComplete(score);
      });
    }

    renderView();
  }
};
