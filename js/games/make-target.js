// js/games/make-target.js - Game 8: Đấu Trường 24 & Số Mục Tiêu Pro (Make Target 24 - 100)
// Ngân hàng 120 thử thách tư duy biểu thức số học và quy tắc ngoặc toán học chuẩn quốc tế
import { MAKE_24_BANK } from "../../data/games/make-24-bank.js";
import { evaluateArithmeticTokens } from "../../data/games/make-24.js";

export const MakeTargetGame = {
  id: "make-target",
  title: "Đấu Trường 24 & Số Mục Tiêu",
  subtitle: "Ghép 4 thẻ số và các phép tính + − × : () tạo thành 24 hoặc số mục tiêu (36, 48, 50, 100)",
  icon: "🎯",
  targetCompetency: "logic",
  weight: 1.0,

  render(container, onComplete) {
    let currentIdx = 0;
    let score = 0;
    let usedCardIndices = new Set();
    let tokens = [];
    let isSolved = false;
    let feedback = null;
    let showHint = false;

    function getChallenge() {
      return MAKE_24_BANK[currentIdx] || MAKE_24_BANK[0];
    }

    function getTarget() {
      const ch = getChallenge();
      return ch.target !== undefined ? ch.target : 24;
    }

    function pushCard(cardIdx) {
      const ch = getChallenge();
      if (usedCardIndices.has(cardIdx)) return;
      const val = ch.cards[cardIdx];
      if (val === undefined) return;

      usedCardIndices.add(cardIdx);
      tokens.push(String(val));
      feedback = null;
      renderView();
    }

    function pushOp(op) {
      tokens.push(op === "−" ? "-" : (op === ":" ? "/" : (op === "×" ? "*" : op)));
      feedback = null;
      renderView();
    }

    function backspace() {
      if (tokens.length === 0) return;
      const removed = tokens.pop();
      const ch = getChallenge();

      if (/^\d+$/.test(removed)) {
        const num = Number(removed);
        for (const idx of Array.from(usedCardIndices).reverse()) {
          if (ch.cards[idx] === num) {
            usedCardIndices.delete(idx);
            break;
          }
        }
      }
      feedback = null;
      renderView();
    }

    function clearAll() {
      tokens = [];
      usedCardIndices.clear();
      feedback = null;
      renderView();
    }

    function getExprDisplay() {
      if (tokens.length === 0) return "";
      return tokens.map(t => {
        if (t === "*") return "×";
        if (t === "/") return ":";
        if (t === "-") return "−";
        return t;
      }).join(" ");
    }

    function checkAnswer() {
      const ch = getChallenge();
      const target = getTarget();

      if (usedCardIndices.size !== 4) {
        feedback = {
          isSuccess: false,
          msg: `⚠️ Ngân cần dùng đủ cả 4 thẻ số! (Hiện mới dùng ${usedCardIndices.size}/4 thẻ).`
        };
        renderView();
        return;
      }

      const res = evaluateArithmeticTokens(tokens);
      if (!res.ok) {
        feedback = {
          isSuccess: false,
          msg: `⚠️ Lỗi biểu thức: ${res.error}`
        };
        renderView();
        return;
      }

      const val = res.value;
      if (Math.abs(val - target) < 1e-6) {
        isSolved = true;
        score += 25;
        feedback = {
          isSuccess: true,
          msg: `🎉 XUẤT SẮC! Biểu thức của Ngân cho kết quả đúng bằng ${target}! (+25 điểm)`,
          sample: ch.sampleSolution
        };
      } else {
        feedback = {
          isSuccess: false,
          msg: `Biểu thức có giá trị là ${Number(val.toFixed(2))} (chưa bằng ${target}). Hãy thử đổi thứ tự hoặc phép tính nhé!`,
          hint: ch.hint
        };
      }
      renderView();
    }

    function loadIndex(idx) {
      currentIdx = Math.max(0, Math.min(MAKE_24_BANK.length - 1, idx));
      tokens = [];
      usedCardIndices.clear();
      isSolved = false;
      feedback = null;
      showHint = false;
      renderView();
    }

    function renderView() {
      const ch = getChallenge();
      const target = getTarget();
      const exprStr = getExprDisplay();

      container.innerHTML = `
        <div class="game-arena make24-arena">
          <!-- Thanh điều khiển đỉnh -->
          <div class="game-hud" style="margin-bottom:14px">
            <div>
              <span style="font-weight:700">Bộ thẻ:</span>
              <select id="m24Select" class="tier-dropdown" style="max-width:260px">
                ${MAKE_24_BANK.map((item, idx) => {
                  const t = item.target !== undefined ? item.target : 24;
                  return `
                    <option value="${idx}" ${idx === currentIdx ? 'selected' : ''}>
                      #${idx + 1}: [${item.cards.join(", ")}] ➔ Mục tiêu: ${t}
                    </option>
                  `;
                }).join("")}
              </select>
            </div>
            <div class="hud-stats-group">
              <div class="hud-stat score">Điểm: <b>${score}</b></div>
              <div class="hud-stat">Tiến độ: <b>${currentIdx + 1}/${MAKE_24_BANK.length}</b></div>
            </div>
          </div>

          <!-- Nhãn Chọn Nhanh Nhóm Mục Tiêu -->
          <div class="m24-lvl-pills">
            <span style="font-size:12px; font-weight:700; color:var(--text-muted)">Phân loại:</span>
            <button type="button" class="m24-lvl-btn" data-idx="0">🎯 24 Cơ bản</button>
            <button type="button" class="m24-lvl-btn" data-idx="12">🎯 24 Vừa sức</button>
            <button type="button" class="m24-lvl-btn" data-idx="20">🎯 24 Nâng cao</button>
            <button type="button" class="m24-lvl-btn" data-idx="30" style="color:#dc2626; border-color:#fca5a5">🔥 24 Phân số</button>
            <button type="button" class="m24-lvl-btn" data-idx="40" style="color:#1d4ed8; border-color:#93c5fd">⚡ Mục tiêu 36</button>
            <button type="button" class="m24-lvl-btn" data-idx="55" style="color:#15803d; border-color:#86efac">🌟 Số 48 & 50</button>
            <button type="button" class="m24-lvl-btn" data-idx="74" style="color:#c2410c; border-color:#fdba74">🏆 Tròn Trăm 100</button>
          </div>

          <!-- Tiêu đề & Huy Hiệu Mục Tiêu Vàng -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin:14px 0 10px; flex-wrap:wrap; gap:12px">
            <div>
              <h3 style="margin:0 0 4px; font-size:20px; color:#1e1b4b">
                Bộ thẻ #${currentIdx + 1} ${currentIdx >= 30 && currentIdx < 40 ? '<span style="color:#dc2626; font-size:14px; font-weight:800">(Olympic Master)</span>' : ''}
              </h3>
              <p style="margin:0; font-size:14px; color:#64748b">
                Chạm vào <strong>cả 4 thẻ số</strong> và các phép tính để lập biểu thức = <strong>${target}</strong>!
              </p>
            </div>
            <div class="m24-target-badge">
              <span class="m24-target-label">MỤC TIÊU:</span>
              <span class="m24-target-val">${target}</span>
            </div>
          </div>

          <!-- Hàng 4 Thẻ Số Đẹp Sang Trọng -->
          <div class="make24-cards-row" id="m24CardsRow">
            ${ch.cards.map((cardNum, cIdx) => {
              const isUsed = usedCardIndices.has(cIdx);
              return `
                <button type="button" class="make24-card-btn ${isUsed ? 'used' : ''}" data-card-idx="${cIdx}" ${isUsed ? 'disabled' : ''} title="Chạm để thêm số ${cardNum}">
                  ${cardNum}
                </button>
              `;
            }).join("")}
          </div>

          <!-- Khung Hiển Thị Biểu Thức Toán Học -->
          <div class="make24-expr-display" id="m24ExprDisplay">
            ${exprStr || '<span style="color:#94a3b8; font-size:16px; font-weight:500; font-family:var(--font-main)">(Chạm các thẻ số và phép tính bên dưới)</span>'}
          </div>

          <!-- Bàn Phím Phép Tính 1-Chạm iPad -->
          <div class="make24-keypad">
            <button type="button" class="make24-op-btn" data-op="+">+</button>
            <button type="button" class="make24-op-btn" data-op="−">−</button>
            <button type="button" class="make24-op-btn" data-op="×">×</button>
            <button type="button" class="make24-op-btn" data-op=":">:</button>
            <button type="button" class="make24-op-btn" data-op="(">(</button>
            <button type="button" class="make24-op-btn" data-op=")">)</button>
            <button type="button" class="make24-op-btn action-btn" id="m24BackspaceBtn" style="color:#dc2626">⌫ Xóa</button>
            <button type="button" class="make24-op-btn action-btn" id="m24ClearBtn" style="color:#64748b">🔄 Làm lại</button>
          </div>

          <!-- Nút Kiểm Tra Kết Quả -->
          <div style="margin-top:14px">
            <button type="button" class="btn btn-primary" id="m24CheckBtn" style="width:100%; min-height:52px; font-size:18px; font-weight:800; background:#d97706; border-color:#b45309">
              Kiểm Tra Biểu Thức = ${target}? 🚀
            </button>
            <div style="display:flex; justify-content:center; margin-top:8px">
              <button type="button" class="btn btn-sm btn-outline" id="m24ToggleHintBtn" style="border:none; color:#b45309; font-weight:700">
                💡 Cần gợi ý bộ số này?
              </button>
            </div>
          </div>

          <!-- Vùng Gợi Ý -->
          <div id="m24HintBox" style="display:${showHint ? 'block' : 'none'}; margin-top:12px; padding:12px 16px; border-radius:12px; background:#fffbeb; border:1px solid #fde68a; color:#92400e; font-size:14px; line-height:1.5">
            <strong>💡 Gợi ý tư duy:</strong> ${ch.hint || 'Hãy thử phân tích các ước của số mục tiêu!'}
          </div>

          <!-- Vùng Phản Hồi Kết Quả -->
          ${feedback ? `
            <div style="margin-top:14px; padding:14px 18px; border-radius:12px; background:${feedback.isSuccess ? '#f0fdf4' : '#fef2f2'}; border:1px solid ${feedback.isSuccess ? '#86efac' : '#fecaca'}; font-size:14px; line-height:1.5">
              <div style="font-weight:700; color:${feedback.isSuccess ? '#15803d' : '#dc2626'}; margin-bottom:4px">
                ${feedback.msg}
              </div>
              ${feedback.sample ? `
                <div style="font-size:13px; color:#166534">
                  Đáp án mẫu: <b>${feedback.sample}</b>
                </div>
              ` : ''}
              ${feedback.hint ? `
                <div style="font-size:13px; color:#475569; margin-top:4px">
                  Gợi ý: ${feedback.hint}
                </div>
              ` : ''}
            </div>
          ` : ''}

          <!-- Điều Hướng Cuối Trang -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-top:20px; border-top:1px solid var(--border-light); padding-top:16px">
            <div style="display:flex; gap:8px">
              <button class="btn btn-secondary btn-sm" id="m24PrevBtn" ${currentIdx === 0 ? 'disabled' : ''}>← Bộ Trước</button>
              <button class="btn btn-secondary btn-sm" id="m24NextBtn" ${currentIdx >= MAKE_24_BANK.length - 1 ? 'disabled' : ''}>Bộ Sau →</button>
              <button class="btn btn-secondary btn-sm" id="m24RandomBtn">🔀 Ngẫu Nhiên</button>
            </div>
            <button class="btn btn-outline" id="m24ExitBtn">Về Menu Trò Chơi</button>
          </div>
        </div>
      `;

      bindEvents();
    }

    function bindEvents() {
      // Chạm thẻ số
      container.querySelectorAll(".make24-card-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const cIdx = parseInt(btn.dataset.cardIdx, 10);
          pushCard(cIdx);
        });
      });

      // Chạm phép tính
      container.querySelectorAll(".make24-op-btn[data-op]").forEach(btn => {
        btn.addEventListener("click", () => {
          pushOp(btn.dataset.op);
        });
      });

      // Nút Xóa & Làm lại
      container.querySelector("#m24BackspaceBtn")?.addEventListener("click", backspace);
      container.querySelector("#m24ClearBtn")?.addEventListener("click", clearAll);

      // Nút Kiểm tra
      container.querySelector("#m24CheckBtn")?.addEventListener("click", checkAnswer);

      // Bật/tắt gợi ý
      container.querySelector("#m24ToggleHintBtn")?.addEventListener("click", () => {
        showHint = !showHint;
        renderView();
      });

      // Chọn bộ số
      container.querySelector("#m24Select")?.addEventListener("change", (e) => {
        loadIndex(parseInt(e.target.value, 10));
      });

      // Chọn nhóm cấp độ
      container.querySelectorAll(".m24-lvl-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          loadIndex(parseInt(btn.dataset.idx, 10));
        });
      });

      // Điều hướng
      container.querySelector("#m24PrevBtn")?.addEventListener("click", () => {
        loadIndex(currentIdx - 1);
      });
      container.querySelector("#m24NextBtn")?.addEventListener("click", () => {
        loadIndex(currentIdx + 1);
      });
      container.querySelector("#m24RandomBtn")?.addEventListener("click", () => {
        const randIdx = Math.floor(Math.random() * MAKE_24_BANK.length);
        loadIndex(randIdx);
      });

      container.querySelector("#m24ExitBtn")?.addEventListener("click", () => {
        onComplete(score);
      });
    }

    renderView();
  }
};
