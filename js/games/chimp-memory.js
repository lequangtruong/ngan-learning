// js/games/chimp-memory.js - Game 12: Não Siêu Nhớ Thần Tốc (Chimp Memory Test - Ayumu Kyoto)

export const CHIMP_LEVELS = [
  { level: 1, count: 4, gridSize: 4, flashMs: 2000, title: "Cấp 1: Khởi Động (4 số - Lưới 4x4)" },
  { level: 2, count: 5, gridSize: 4, flashMs: 1800, title: "Cấp 2: Vừa Sức (5 số - Lưới 4x4)" },
  { level: 3, count: 6, gridSize: 4, flashMs: 1600, title: "Cấp 3: Nhanh Mắt (6 số - Lưới 4x4)" },
  { level: 4, count: 6, gridSize: 5, flashMs: 1500, title: "Cấp 4: Mở Rộng (6 số - Lưới 5x5)" },
  { level: 5, count: 7, gridSize: 5, flashMs: 1500, title: "Cấp 5: Thách Thức (7 số - Lưới 5x5)" },
  { level: 6, count: 8, gridSize: 5, flashMs: 1400, title: "Cấp 6: Siêu Nhớ (8 số - Lưới 5x5)" },
  { level: 7, count: 9, gridSize: 5, flashMs: 1300, title: "Cấp 7: Ngang Ngửa Ayumu (9 số - Lưới 5x5)" },
  { level: 8, count: 9, gridSize: 6, flashMs: 1200, title: "Cấp 8: Bậc Thầy Kyoto (9 số - Lưới 6x6)" }
];

export const ChimpMemoryGame = {
  id: "chimp-memory",
  title: "Não Siêu Nhớ Thần Tốc",
  subtitle: "Rèn luyện trí nhớ không gian và sự tập trung cao độ (Thí nghiệm Đại học Kyoto)",
  icon: "🧠",
  targetCompetency: "calculation",
  weight: 1.0,

  render(container, onComplete) {
    let currentLvlIdx = 0;
    let score = 0;
    let streak = 0;
    let state = "IDLE"; // IDLE, MEMORIZING, RECALLING, SUCCESS, FAILED
    let tiles = [];
    let nextExpectedVal = 1;
    let mistakeTile = null;
    let timerId = null;

    function getCfg() {
      return CHIMP_LEVELS[currentLvlIdx];
    }

    function startRound() {
      if (timerId) clearTimeout(timerId);
      const cfg = getCfg();
      const totalCells = cfg.gridSize * cfg.gridSize;
      const indices = Array.from({ length: totalCells }, (_, i) => i);

      // Fisher-Yates shuffle
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }

      const chosen = indices.slice(0, cfg.count);
      tiles = chosen.map((cellIdx, numIdx) => ({
        r: Math.floor(cellIdx / cfg.gridSize),
        c: cellIdx % cfg.gridSize,
        val: numIdx + 1,
        revealed: false
      }));

      state = "MEMORIZING";
      nextExpectedVal = 1;
      mistakeTile = null;
      renderView();

      timerId = setTimeout(() => {
        state = "RECALLING";
        renderView();
      }, cfg.flashMs);
    }

    function tapCell(r, c) {
      if (state !== "RECALLING") return;
      const tile = tiles.find(t => t.r === r && t.c === c);
      if (!tile || tile.revealed) return;

      if (tile.val === nextExpectedVal) {
        tile.revealed = true;
        nextExpectedVal++;
        const cfg = getCfg();
        if (nextExpectedVal > cfg.count) {
          state = "SUCCESS";
          score += cfg.count * 10;
          streak++;
        }
      } else {
        state = "FAILED";
        mistakeTile = { r, c, val: tile.val, expected: nextExpectedVal };
        streak = 0;
        tiles.forEach(t => t.revealed = true);
      }
      renderView();
    }

    function renderView() {
      const cfg = getCfg();
      const cellSize = cfg.gridSize === 6 ? 48 : (cfg.gridSize === 5 ? 56 : 64);
      const gridPx = cellSize * cfg.gridSize + (cfg.gridSize - 1) * 8;

      container.innerHTML = `
        <div class="game-arena chimp-arena" style="max-width:680px; margin:0 auto; display:flex; flex-direction:column; gap:16px">
          <div class="game-hud" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; padding:12px 18px; background:#fff; border-radius:12px; border:1px solid #e2e8f0">
            <div>
              <span style="font-weight:700">Cấp độ:</span>
              <select id="chimpLvlSelect" style="padding:6px 10px; border-radius:8px; border:1px solid #cbd5e1; font-weight:600">
                ${CHIMP_LEVELS.map((lvl, idx) => `
                  <option value="${idx}" ${idx === currentLvlIdx ? 'selected' : ''}>
                    ${lvl.title}
                  </option>
                `).join("")}
              </select>
            </div>
            <div style="display:flex; align-items:center; gap:14px">
              <span style="font-size:14px; font-weight:600">Chuỗi: <b style="color:#f59e0b">🔥 ${streak}</b></span>
              <span style="font-size:14px; font-weight:600">Điểm: <b style="color:#4f46e5; font-size:16px">${score}</b></span>
            </div>
          </div>

          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:24px; box-shadow:0 4px 16px rgba(0,0,0,0.04); display:flex; flex-direction:column; align-items:center; gap:16px">
            <div style="text-align:center">
              <h3 style="margin:0 0 4px 0; color:#1e1b4b; font-size:18px">Ghi nhớ vị trí các số theo thứ tự 1 → ${cfg.count}</h3>
              <p style="margin:0; font-size:13px; color:#64748b">
                ${state === 'MEMORIZING' ? '👀 Hãy ghi nhớ thật nhanh trước khi các số biến mất!' :
                  state === 'RECALLING' ? `👉 Chạm vào các ô theo thứ tự tăng dần từ ${nextExpectedVal} đến ${cfg.count}!` :
                  state === 'SUCCESS' ? '🎉 Tuyệt vời! Bạn có trí nhớ không gian siêu phàm!' :
                  state === 'FAILED' ? '❌ Ối sai rồi! Hãy quan sát lại vị trí đúng nhé.' :
                  'Nhấn Bắt Đầu để thử thách trí nhớ của bạn!'}
              </p>
            </div>

            <!-- Lưới Chimp Grid -->
            <div style="width:${gridPx}px; height:${gridPx}px; display:grid; grid-template-columns:repeat(${cfg.gridSize}, ${cellSize}px); grid-template-rows:repeat(${cfg.gridSize}, ${cellSize}px); gap:8px; background:#0f172a; padding:10px; border-radius:14px; box-shadow:0 8px 24px rgba(0,0,0,0.2)">
              ${Array.from({ length: cfg.gridSize }).map((_, r) =>
                Array.from({ length: cfg.gridSize }).map((_, c) => {
                  const tile = tiles.find(t => t.r === r && t.c === c);
                  if (!tile) {
                    return `<div style="background:#1e293b; border-radius:8px"></div>`;
                  }

                  let content = "";
                  let tileStyle = `width:100%; height:100%; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:800; cursor:pointer; user-select:none; transition:transform 0.1s ease; `;

                  if (state === "MEMORIZING") {
                    content = String(tile.val);
                    tileStyle += "background:#3b82f6; color:#ffffff; border:2px solid #60a5fa;";
                  } else if (state === "RECALLING") {
                    if (tile.revealed) {
                      content = String(tile.val);
                      tileStyle += "background:#22c55e; color:#ffffff; border:2px solid #86efac; transform:scale(0.96);";
                    } else {
                      content = "";
                      tileStyle += "background:#ffffff; color:#0f172a; border:2px solid #e2e8f0; box-shadow:0 4px 8px rgba(0,0,0,0.1);";
                    }
                  } else if (state === "SUCCESS") {
                    content = String(tile.val);
                    tileStyle += "background:#22c55e; color:#ffffff; border:2px solid #86efac;";
                  } else if (state === "FAILED") {
                    content = String(tile.val);
                    if (mistakeTile && mistakeTile.r === r && mistakeTile.c === c) {
                      tileStyle += "background:#ef4444; color:#ffffff; border:2px solid #fca5a5; transform:scale(1.05);";
                    } else {
                      tileStyle += "background:#64748b; color:#ffffff; border:2px solid #94a3b8;";
                    }
                  }

                  return `
                    <div class="chimp-tile" data-r="${r}" data-c="${c}" style="${tileStyle}">
                      ${content}
                    </div>
                  `;
                }).join("")
              ).join("")}
            </div>

            <!-- Các nút hành động -->
            <div style="display:flex; gap:12px; margin-top:8px; flex-wrap:wrap; justify-content:center">
              ${state === "IDLE" ? `
                <button class="btn btn-primary" id="chimpStartBtn">Bắt Đầu Vòng Đấu ▶</button>
              ` : (state === "SUCCESS" || state === "FAILED") ? `
                <button class="btn btn-primary" id="chimpNextRoundBtn">
                  ${state === "SUCCESS" ? "Vòng Tiếp Theo ▶" : "Thử Lại 🔄"}
                </button>
              ` : `
                <button class="btn btn-secondary btn-sm" id="chimpRestartBtn">🔄 Làm Lại Vòng Này</button>
              `}
              <button class="btn btn-outline" id="chimpExitBtn">Về Menu</button>
            </div>
          </div>
        </div>
      `;

      // Gắn sự kiện
      container.querySelectorAll(".chimp-tile").forEach(el => {
        el.addEventListener("click", () => {
          const r = parseInt(el.dataset.r, 10);
          const c = parseInt(el.dataset.c, 10);
          tapCell(r, c);
        });
      });

      container.querySelector("#chimpStartBtn")?.addEventListener("click", startRound);
      container.querySelector("#chimpRestartBtn")?.addEventListener("click", startRound);
      container.querySelector("#chimpNextRoundBtn")?.addEventListener("click", () => {
        if (state === "SUCCESS" && currentLvlIdx < CHIMP_LEVELS.length - 1) {
          currentLvlIdx++;
        }
        startRound();
      });

      container.querySelector("#chimpLvlSelect")?.addEventListener("change", (e) => {
        currentLvlIdx = parseInt(e.target.value, 10);
        state = "IDLE";
        tiles = [];
        renderView();
      });

      container.querySelector("#chimpExitBtn")?.addEventListener("click", () => {
        if (timerId) clearTimeout(timerId);
        onComplete(score);
      });
    }

    renderView();
  }
};
