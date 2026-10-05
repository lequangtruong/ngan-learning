// js/games/rush-hour.js - Game 9: Kẹt Xe Rush Hour (Mensa Select Traffic Jam)
import { RUSH_HOUR_BOARDS } from "../../data/games/rush-hour-boards.js";

export const GRID_SIZE = 6;
export const EXIT_ROW = 2;
export const EXIT_COL = 5;

export class RushHourSession {
  constructor(initialIndex = 0) {
    this.currentIndex = Math.max(0, Math.min(initialIndex, RUSH_HOUR_BOARDS.length - 1));
    this.vehicles = [];
    this.moveCount = 0;
    this.history = [];
    this.selectedVehicleId = "R";
    this.initBoard();
  }

  getCurrentBoard() {
    return RUSH_HOUR_BOARDS[this.currentIndex];
  }

  initBoard() {
    const b = this.getCurrentBoard();
    this.vehicles = b.vehicles.map(v => ({ ...v }));
    this.moveCount = 0;
    this.history = [];
    this.selectedVehicleId = "R";
  }

  getVehicle(id) {
    return this.vehicles.find(v => v.id === id);
  }

  getGrid() {
    const grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));
    for (const v of this.vehicles) {
      for (let i = 0; i < v.len; i++) {
        const r = v.dir === "V" ? v.row + i : v.row;
        const c = v.dir === "H" ? v.col + i : v.col;
        if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) {
          grid[r][c] = v.id;
        }
      }
    }
    return grid;
  }

  canMove(vehicleId, dir) {
    const v = this.getVehicle(vehicleId);
    if (!v) return false;
    const grid = this.getGrid();

    if (v.dir === "H") {
      if (dir === "left") {
        const targetCol = v.col - 1;
        return targetCol >= 0 && grid[v.row][targetCol] === null;
      }
      if (dir === "right") {
        const targetCol = v.col + v.len;
        return targetCol < GRID_SIZE && grid[v.row][targetCol] === null;
      }
      return false;
    } else {
      if (dir === "up") {
        const targetRow = v.row - 1;
        return targetRow >= 0 && grid[targetRow][v.col] === null;
      }
      if (dir === "down") {
        const targetRow = v.row + v.len;
        return targetRow < GRID_SIZE && grid[targetRow][v.col] === null;
      }
      return false;
    }
  }

  moveVehicle(vehicleId, dir) {
    if (!this.canMove(vehicleId, dir)) {
      return { ok: false, error: "Đường bị chặn!" };
    }

    const v = this.getVehicle(vehicleId);
    this.history.push(this.vehicles.map(item => ({ ...item })));

    if (dir === "left") v.col--;
    else if (dir === "right") v.col++;
    else if (dir === "up") v.row--;
    else if (dir === "down") v.row++;

    this.moveCount++;
    this.selectedVehicleId = vehicleId;

    return {
      ok: true,
      moveCount: this.moveCount,
      isSolved: this.isSolved()
    };
  }

  undo() {
    if (this.history.length === 0) return false;
    this.vehicles = this.history.pop();
    if (this.moveCount > 0) this.moveCount--;
    return true;
  }

  reset() {
    this.initBoard();
  }

  isSolved() {
    const redCar = this.getVehicle("R");
    if (!redCar) return false;
    return redCar.row === EXIT_ROW && redCar.col + redCar.len - 1 === EXIT_COL;
  }

  nextBoard() {
    if (this.currentIndex < RUSH_HOUR_BOARDS.length - 1) {
      this.currentIndex++;
      this.initBoard();
    }
  }

  prevBoard() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.initBoard();
    }
  }

  setBoardIndex(idx) {
    if (idx >= 0 && idx < RUSH_HOUR_BOARDS.length) {
      this.currentIndex = idx;
      this.initBoard();
    }
  }
}

export const RushHourGame = {
  id: "rush-hour",
  title: "Kẹt Xe Rush Hour",
  subtitle: "Trò chơi tư duy Mensa - Di chuyển các xe để đưa Xe Đỏ thoát khỏi bãi đỗ",
  icon: "🚗",
  targetCompetency: "logic",
  weight: 1.0,

  render(container, onComplete) {
    let session = new RushHourSession(0);
    let totalScore = 0;

    function renderView() {
      const b = session.getCurrentBoard();
      const isSolved = session.isSolved();
      const cellSize = 54;
      const boardPx = cellSize * GRID_SIZE; // 324px
      const selectedVehicle = session.getVehicle(session.selectedVehicleId);

      let vehiclesSvg = "";
      for (const v of session.vehicles) {
        const isSelected = v.id === session.selectedVehicleId;
        const x = v.col * cellSize + 3;
        const y = v.row * cellSize + 3;
        const w = v.dir === "H" ? v.len * cellSize - 6 : cellSize - 6;
        const h = v.dir === "V" ? v.len * cellSize - 6 : cellSize - 6;

        vehiclesSvg += `
          <g class="rush-vehicle" data-vid="${v.id}" style="cursor:pointer; transition:transform 0.15s ease">
            <rect x="${x + 2}" y="${y + 2}" width="${w}" height="${h}" rx="8" fill="rgba(0,0,0,0.2)" />
            <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${v.color}" stroke="${isSelected ? '#ffffff' : 'rgba(0,0,0,0.25)'}" stroke-width="${isSelected ? '3' : '1.5'}" />
            <rect x="${x + 5}" y="${y + 5}" width="${Math.max(w - 10, 6)}" height="${Math.max(h - 10, 6)}" rx="5" fill="rgba(255,255,255,0.25)" />
            <text x="${x + w/2}" y="${y + h/2 + 5}" font-size="${v.id === 'R' ? '14' : '11'}" font-weight="800" text-anchor="middle" fill="#ffffff" style="pointer-events:none">
              ${v.id === 'R' ? '🚗 ĐỎ' : (v.len === 3 ? '🚛 TẢI' : '🚙')}
            </text>
          </g>
        `;
      }

      container.innerHTML = `
        <div class="game-arena rush-hour-arena" style="max-width:720px; margin:0 auto; display:flex; flex-direction:column; gap:16px">
          <div class="game-hud" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; padding:12px 18px; background:#fff; border-radius:12px; border:1px solid #e2e8f0">
            <div>
              <span style="font-weight:700">Thế cờ:</span>
              <select id="rushBoardSelect" style="padding:6px 10px; border-radius:8px; border:1px solid #cbd5e1; font-weight:600">
                ${RUSH_HOUR_BOARDS.map((board, idx) => `
                  <option value="${idx}" ${idx === session.currentIndex ? 'selected' : ''}>
                    Bài ${idx + 1}: ${board.name || 'Thế cờ ' + (idx + 1)} (${board.minMoves} bước)
                  </option>
                `).join("")}
              </select>
            </div>
            <div style="display:flex; align-items:center; gap:14px">
              <span style="font-size:14px; font-weight:600">Bước: <b style="color:#ef4444; font-size:16px">${session.moveCount}</b> / ${b.minMoves}</span>
              <span style="font-size:14px; font-weight:600">Tổng điểm: <b style="color:#4f46e5; font-size:16px">${totalScore}</b></span>
            </div>
          </div>

          <div style="display:flex; gap:20px; justify-content:center; align-items:flex-start; flex-wrap:wrap">
            <!-- Bàn Cờ 6x6 SVG -->
            <div style="position:relative; width:${boardPx}px; height:${boardPx}px; background:#1e293b; border-radius:14px; box-shadow:0 8px 24px rgba(0,0,0,0.25); border:4px solid #334155; touch-action:none">
              <!-- Cổng thoát bên phải hàng 2 -->
              <div style="position:absolute; right:-14px; top:${EXIT_ROW * cellSize + 8}px; width:14px; height:${cellSize - 16}px; background:#22c55e; border-radius:0 6px 6px 0; display:flex; align-items:center; justify-content:center; font-size:10px; color:#fff; font-weight:900">▶</div>

              <svg width="${boardPx}" height="${boardPx}" style="display:block">
                <!-- Lưới ô cờ -->
                ${Array.from({ length: GRID_SIZE }).map((_, r) =>
                  Array.from({ length: GRID_SIZE }).map((_, c) => `
                    <rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize}" height="${cellSize}" fill="${(r + c) % 2 === 0 ? '#334155' : '#1e293b'}" opacity="0.6" stroke="#475569" stroke-width="0.5" />
                  `).join("")
                ).join("")}
                ${vehiclesSvg}
              </svg>
            </div>

            <!-- Bảng Điều Khiển Di Chuyển 1-Chạm iPad -->
            <div style="display:flex; flex-direction:column; gap:12px; align-items:center; justify-content:center; min-width:240px">
              <div style="font-size:13px; font-weight:700; color:#64748b">
                Xe đang chọn: <b style="color:${selectedVehicle?.color || '#333'}">${selectedVehicle ? (selectedVehicle.id === 'R' ? 'Xe Đỏ 🚗' : selectedVehicle.name || 'Xe ' + selectedVehicle.id) : 'Chạm để chọn'}</b>
              </div>

              <!-- D-Pad 4 hướng -->
              <div style="display:grid; grid-template-columns:repeat(3, 56px); grid-template-rows:repeat(3, 56px); gap:6px; margin:4px 0">
                <div style="grid-column:2; grid-row:1">
                  <button class="btn btn-secondary" id="rushUpBtn" style="width:100%; height:100%; font-size:20px; padding:0" ${selectedVehicle?.dir === 'H' ? 'disabled' : ''}>▲</button>
                </div>
                <div style="grid-column:1; grid-row:2">
                  <button class="btn btn-secondary" id="rushLeftBtn" style="width:100%; height:100%; font-size:20px; padding:0" ${selectedVehicle?.dir === 'V' ? 'disabled' : ''}>◀</button>
                </div>
                <div style="grid-column:2; grid-row:2; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; color:#94a3b8">
                  🕹️
                </div>
                <div style="grid-column:3; grid-row:2">
                  <button class="btn btn-secondary" id="rushRightBtn" style="width:100%; height:100%; font-size:20px; padding:0" ${selectedVehicle?.dir === 'V' ? 'disabled' : ''}>▶</button>
                </div>
                <div style="grid-column:2; grid-row:3">
                  <button class="btn btn-secondary" id="rushDownBtn" style="width:100%; height:100%; font-size:20px; padding:0" ${selectedVehicle?.dir === 'H' ? 'disabled' : ''}>▼</button>
                </div>
              </div>

              <!-- Nút Undo & Đặt Lại -->
              <div style="display:flex; gap:8px; width:100%">
                <button class="btn btn-secondary" id="rushUndoBtn" style="flex:1; font-size:13px; font-weight:600" ${session.history.length === 0 ? 'disabled' : ''}>↩ Hoàn Tác</button>
                <button class="btn btn-secondary" id="rushResetBtn" style="flex:1; font-size:13px; font-weight:600">🔄 Đặt Lại</button>
              </div>

              <!-- Nút chuyển thế cờ -->
              <div style="display:flex; gap:8px; width:100%">
                <button class="btn btn-outline" id="rushPrevBtn" style="flex:1; font-size:12px" ${session.currentIndex === 0 ? 'disabled' : ''}>← Bài Trước</button>
                <button class="btn btn-outline" id="rushNextBtn" style="flex:1; font-size:12px" ${session.currentIndex >= RUSH_HOUR_BOARDS.length - 1 ? 'disabled' : ''}>Bài Sau →</button>
              </div>
            </div>
          </div>

          ${isSolved ? `
            <div style="background:#f0fdf4; border:2px solid #22c55e; border-radius:12px; padding:16px; text-align:center; animation:fadeIn 0.3s ease">
              <h3 style="color:#15803d; margin:0 0 6px 0">🎉 XUẤT SẮC! XE ĐỎ ĐÃ THOÁT KHỎI BÃI ĐỖ!</h3>
              <p style="margin:0 0 12px 0; color:#166534">Ngân đã giải thành công thế cờ trong <b>${session.moveCount} bước</b> (Mục tiêu: ${b.minMoves} bước). (+50 điểm)</p>
              <div style="display:flex; gap:10px; justify-content:center">
                <button class="btn btn-primary" id="rushNextWinBtn">Thế Cờ Tiếp Theo ▶</button>
                <button class="btn btn-secondary" id="rushExitBtn">Về Menu Trò Chơi</button>
              </div>
            </div>
          ` : ''}
        </div>
      `;

      // Gắn sự kiện
      container.querySelectorAll(".rush-vehicle").forEach(el => {
        el.addEventListener("click", () => {
          session.selectedVehicleId = el.dataset.vid;
          renderView();
        });
      });

      const handleMove = (dir) => {
        const res = session.moveVehicle(session.selectedVehicleId, dir);
        if (res.ok) {
          if (res.isSolved) {
            totalScore += 50;
          }
          renderView();
        }
      };

      container.querySelector("#rushUpBtn")?.addEventListener("click", () => handleMove("up"));
      container.querySelector("#rushDownBtn")?.addEventListener("click", () => handleMove("down"));
      container.querySelector("#rushLeftBtn")?.addEventListener("click", () => handleMove("left"));
      container.querySelector("#rushRightBtn")?.addEventListener("click", () => handleMove("right"));

      container.querySelector("#rushUndoBtn")?.addEventListener("click", () => {
        session.undo();
        renderView();
      });

      container.querySelector("#rushResetBtn")?.addEventListener("click", () => {
        session.reset();
        renderView();
      });

      container.querySelector("#rushPrevBtn")?.addEventListener("click", () => {
        session.prevBoard();
        renderView();
      });

      container.querySelector("#rushNextBtn")?.addEventListener("click", () => {
        session.nextBoard();
        renderView();
      });

      container.querySelector("#rushBoardSelect")?.addEventListener("change", (e) => {
        session.setBoardIndex(parseInt(e.target.value, 10));
        renderView();
      });

      container.querySelector("#rushNextWinBtn")?.addEventListener("click", () => {
        session.nextBoard();
        renderView();
      });

      container.querySelector("#rushExitBtn")?.addEventListener("click", () => {
        onComplete(totalScore);
      });
    }

    renderView();
  }
};
