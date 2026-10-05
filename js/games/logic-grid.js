// js/games/logic-grid.js - Game 13: Bảng Suy Luận Logic Thám Tử (Einstein Logic Grid)
import { LOGIC_GRID_CASES } from "../../data/games/logic-grid-cases.js";

export const CELL_STATE = {
  EMPTY: 0,
  CROSS: 1, // ❌
  CHECK: 2  // ✅
};

export const LogicGridGame = {
  id: "logic-grid",
  title: "Bảng Suy Luận Thám Tử",
  subtitle: "Bài toán suy luận logic Einstein - Phân tích manh mối, lập ma trận loại trừ tìm thủ phạm",
  icon: "🕵️",
  targetCompetency: "logic",
  weight: 1.0,

  render(container, onComplete) {
    let caseIdx = 0;
    let score = 0;
    let gridState = {};
    let isChecked = false;
    let checkResult = null;

    function initGrid() {
      const c = LOGIC_GRID_CASES[caseIdx];
      gridState = {};
      for (const r of c.rows.items) {
        gridState[r] = {};
        for (const col of c.cols.items) {
          gridState[r][col] = CELL_STATE.EMPTY;
        }
      }
      isChecked = false;
      checkResult = null;
    }

    function toggleCell(rowItem, colItem) {
      if (!gridState[rowItem] || gridState[rowItem][colItem] === undefined) return;
      const cur = gridState[rowItem][colItem];
      let next = CELL_STATE.EMPTY;
      if (cur === CELL_STATE.EMPTY) next = CELL_STATE.CROSS;
      else if (cur === CELL_STATE.CROSS) next = CELL_STATE.CHECK;
      else next = CELL_STATE.EMPTY;

      gridState[rowItem][colItem] = next;

      // Nếu tick ✅, tự động điền ❌ cho các ô khác cùng hàng và cùng cột
      if (next === CELL_STATE.CHECK) {
        const c = LOGIC_GRID_CASES[caseIdx];
        for (const oc of c.cols.items) {
          if (oc !== colItem && gridState[rowItem][oc] === CELL_STATE.EMPTY) {
            gridState[rowItem][oc] = CELL_STATE.CROSS;
          }
        }
        for (const or of c.rows.items) {
          if (or !== rowItem && gridState[or][colItem] === CELL_STATE.EMPTY) {
            gridState[or][colItem] = CELL_STATE.CROSS;
          }
        }
      }
      isChecked = false;
      renderView();
    }

    function checkSolution() {
      const c = LOGIC_GRID_CASES[caseIdx];
      const sol = c.solution;
      let matched = 0;
      const total = Object.keys(sol).length;
      let hasMistake = false;

      for (const r of c.rows.items) {
        for (const col of c.cols.items) {
          const st = gridState[r]?.[col];
          const isTarget = sol[r] === col;
          if (isTarget) {
            if (st === CELL_STATE.CHECK) matched++;
            else if (st === CELL_STATE.CROSS) hasMistake = true;
          } else {
            if (st === CELL_STATE.CHECK) hasMistake = true;
          }
        }
      }

      const isCorrect = matched === total && !hasMistake;
      if (isCorrect && !isChecked) score += 30;

      isChecked = true;
      checkResult = {
        isCorrect,
        matched,
        total,
        explanation: c.explanation
      };
      renderView();
    }

    initGrid();

    function renderView() {
      const c = LOGIC_GRID_CASES[caseIdx];

      container.innerHTML = `
        <div class="game-arena logic-grid-arena" style="max-width:760px; margin:0 auto; display:flex; flex-direction:column; gap:16px">
          <div class="game-hud" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; padding:12px 18px; background:#fff; border-radius:12px; border:1px solid #e2e8f0">
            <div>
              <span style="font-weight:700">Vụ án:</span>
              <select id="lgCaseSelect" style="padding:6px 10px; border-radius:8px; border:1px solid #cbd5e1; font-weight:600">
                ${LOGIC_GRID_CASES.map((item, idx) => `
                  <option value="${idx}" ${idx === caseIdx ? 'selected' : ''}>
                    Vụ án ${idx + 1}: ${item.title}
                  </option>
                `).join("")}
              </select>
            </div>
            <div style="display:flex; align-items:center; gap:14px">
              <span style="font-size:14px; font-weight:600">Tiến độ: <b>${caseIdx + 1}/${LOGIC_GRID_CASES.length}</b></span>
              <span style="font-size:14px; font-weight:600">Điểm: <b style="color:#4f46e5; font-size:16px">${score}</b></span>
            </div>
          </div>

          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:20px; box-shadow:0 4px 16px rgba(0,0,0,0.04); display:flex; flex-direction:column; gap:16px">
            <h3 style="margin:0; color:#1e1b4b; font-size:18px">🕵️ ${c.title}</h3>
            <p style="margin:0; font-size:14px; color:#475569; line-height:1.5">${c.story || c.prompt || ''}</p>

            <!-- Khung manh mối điều tra -->
            <div style="background:#f8fafc; border-left:4px solid #3b82f6; border-radius:8px; padding:14px">
              <h4 style="margin:0 0 8px 0; font-size:14px; color:#1e293b">🔍 Các Manh Mối Suy Luận:</h4>
              <ul style="margin:0; padding-left:20px; font-size:13px; color:#334155; line-height:1.6">
                ${c.clues.map(clue => `<li>${clue}</li>`).join("")}
              </ul>
            </div>

            <!-- Bảng Ma Trận Lưới Logic -->
            <div style="overflow-x:auto; padding:4px 0">
              <table style="width:100%; border-collapse:collapse; text-align:center; font-size:13px">
                <thead>
                  <tr>
                    <th style="padding:10px; border:1.5px solid #cbd5e1; background:#f1f5f9; color:#475569">
                      ${c.rows.label} \\ ${c.cols.label}
                    </th>
                    ${c.cols.items.map(col => `
                      <th style="padding:10px; border:1.5px solid #cbd5e1; background:#f1f5f9; font-weight:700; color:#1e293b">
                        ${col}
                      </th>
                    `).join("")}
                  </tr>
                </thead>
                <tbody>
                  ${c.rows.items.map(r => `
                    <tr>
                      <td style="padding:10px; border:1.5px solid #cbd5e1; background:#f8fafc; font-weight:700; text-align:left; color:#1e293b">
                        ${r}
                      </td>
                      ${c.cols.items.map(col => {
                        const st = gridState[r]?.[col] || 0;
                        let icon = "";
                        let bg = "#ffffff";
                        if (st === CELL_STATE.CROSS) {
                          icon = "❌";
                          bg = "#fee2e2";
                        } else if (st === CELL_STATE.CHECK) {
                          icon = "✅";
                          bg = "#dcfce7";
                        }
                        return `
                          <td class="lg-cell" data-r="${r}" data-c="${col}" style="padding:12px; border:1.5px solid #cbd5e1; background:${bg}; cursor:pointer; font-size:18px; user-select:none; transition:background 0.15s ease">
                            ${icon}
                          </td>
                        `;
                      }).join("")}
                    </tr>
                  `).join("")}
                </tbody>
              </table>
              <div style="font-size:12px; color:#64748b; margin-top:6px; text-align:right">
                💡 Nhấn 1 lần: ❌ (Loại trừ) • Nhấn lần 2: ✅ (Khẳng định) • Nhấn lần 3: Xóa
              </div>
            </div>

            ${isChecked && checkResult ? `
              <div style="padding:14px; border-radius:10px; background:${checkResult.isCorrect ? '#f0fdf4' : '#fef2f2'}; border:1px solid ${checkResult.isCorrect ? '#86efac' : '#fecaca'}">
                <div style="font-weight:700; color:${checkResult.isCorrect ? '#15803d' : '#dc2626'}; margin-bottom:4px">
                  ${checkResult.isCorrect ? '🎉 XUẤT SẮC! Thám tử đã phá án hoàn toàn chính xác! (+30 điểm)' : '✘ Chưa đúng hoàn toàn, hãy kiểm tra lại các manh mối loại trừ nhé!'}
                </div>
                <div style="font-size:13px; color:#475569; line-height:1.4">
                  ${checkResult.explanation || ''}
                </div>
              </div>
            ` : ''}

            <!-- Thanh điều khiển -->
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; border-top:1px solid #f1f5f9; padding-top:14px">
              <div style="display:flex; gap:8px">
                <button class="btn btn-secondary btn-sm" id="lgResetBtn">🔄 Điền Lại</button>
                <button class="btn btn-outline btn-sm" id="lgPrevBtn" ${caseIdx === 0 ? 'disabled' : ''}>← Vụ Trước</button>
                <button class="btn btn-outline btn-sm" id="lgNextBtn" ${caseIdx >= LOGIC_GRID_CASES.length - 1 ? 'disabled' : ''}>Vụ Sau →</button>
              </div>
              <div style="display:flex; gap:8px">
                <button class="btn btn-primary" id="lgCheckBtn">Kiểm Tra Phá Án</button>
                <button class="btn btn-outline" id="lgExitBtn">Về Menu</button>
              </div>
            </div>
          </div>
        </div>
      `;

      // Gắn sự kiện ô
      container.querySelectorAll(".lg-cell").forEach(cell => {
        cell.addEventListener("click", () => {
          toggleCell(cell.dataset.r, cell.dataset.c);
        });
      });

      container.querySelector("#lgCheckBtn")?.addEventListener("click", checkSolution);
      container.querySelector("#lgResetBtn")?.addEventListener("click", () => {
        initGrid();
        renderView();
      });

      container.querySelector("#lgCaseSelect")?.addEventListener("change", (e) => {
        caseIdx = parseInt(e.target.value, 10);
        initGrid();
        renderView();
      });

      container.querySelector("#lgPrevBtn")?.addEventListener("click", () => {
        if (caseIdx > 0) {
          caseIdx--;
          initGrid();
          renderView();
        }
      });

      container.querySelector("#lgNextBtn")?.addEventListener("click", () => {
        if (caseIdx < LOGIC_GRID_CASES.length - 1) {
          caseIdx++;
          initGrid();
          renderView();
        }
      });

      container.querySelector("#lgExitBtn")?.addEventListener("click", () => {
        onComplete(score);
      });
    }

    renderView();
  }
};
