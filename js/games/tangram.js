// js/games/tangram.js - Game 11: Xếp Hình Trí Uẩn Tangram 7 Mảnh (Toán Lớp 6 Hình Học Trực Quan)
import { TANGRAM_PUZZLES, TANGRAM_PIECES_CONFIG } from "../../data/games/tangram-puzzles.js";

export function getPiecePolygonPoints(type) {
  switch (type) {
    case "large-triangle":
      return "-70,35 70,35 0,-35";
    case "med-triangle":
      return "-35,35 35,35 -35,-35";
    case "small-triangle":
      return "-35,17 35,17 0,-17";
    case "square":
      return "0,-35 35,0 0,35 -35,0";
    case "parallelogram":
      return "-50,17 20,17 50,-17 -20,-17";
    default:
      return "0,0";
  }
}

export function generateSilhouettePath(targetLayout) {
  if (!targetLayout) return "";
  const pieceTypes = {
    t1: "large-triangle", t2: "large-triangle", tm: "med-triangle",
    ts1: "small-triangle", ts2: "small-triangle", sq: "square", para: "parallelogram"
  };
  const piecePolys = {
    "large-triangle": [[-70, 35], [70, 35], [0, -35]],
    "med-triangle": [[-35, 35], [35, 35], [-35, -35]],
    "small-triangle": [[-35, 17], [35, 17], [0, -17]],
    "square": [[0, -35], [35, 0], [0, 35], [-35, 0]],
    "parallelogram": [[-50, 17], [20, 17], [50, -17], [-20, -17]]
  };
  const subpaths = [];
  for (const [key, target] of Object.entries(targetLayout)) {
    const type = pieceTypes[key];
    const poly = piecePolys[type];
    if (!poly || !target) continue;
    const rad = ((target.rot || 0) * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const sx = target.flipped ? -1 : 1;
    const pts = poly.map(([px, py]) => {
      const fx = px * sx;
      const rx = fx * cos - py * sin;
      const ry = fx * sin + py * cos;
      return [Math.round((target.x * 0.9) + rx), Math.round((target.y * 0.9) + ry)];
    });
    if (pts.length > 0) {
      subpaths.push("M " + pts.map(p => `${p[0]} ${p[1]}`).join(" L ") + " Z");
    }
  }
  return subpaths.join(" ");
}

export const TangramGame = {
  id: "tangram",
  title: "Xếp Hình Trí Uẩn Tangram",
  subtitle: "7 mảnh ghép hình học cổ điển - Ghép hình chim, thú, thuyền và đa giác toán học",
  icon: "🧩",
  targetCompetency: "visual",
  weight: 1.0,

  render(container, onComplete) {
    let puzzleIdx = 0;
    let score = 0;
    let selectedPieceId = "t1";
    let isSolved = false;

    // Khởi tạo tọa độ mảnh ghép
    let pieces = {
      t1: { id: "t1", type: "large-triangle", x: 60, y: 280, rot: 0, flipped: false, color: "#3b82f6" },
      t2: { id: "t2", type: "large-triangle", x: 140, y: 280, rot: 90, flipped: false, color: "#60a5fa" },
      tm: { id: "tm", type: "med-triangle", x: 215, y: 280, rot: 45, flipped: false, color: "#10b981" },
      ts1: { id: "ts1", type: "small-triangle", x: 275, y: 280, rot: 0, flipped: false, color: "#f59e0b" },
      ts2: { id: "ts2", type: "small-triangle", x: 60, y: 230, rot: 180, flipped: false, color: "#fbbf24" },
      sq: { id: "sq", type: "square", x: 130, y: 230, rot: 0, flipped: false, color: "#ec4899" },
      para: { id: "para", type: "parallelogram", x: 210, y: 230, rot: 0, flipped: false, color: "#8b5cf6" }
    };

    function resetPieces() {
      pieces = {
        t1: { id: "t1", type: "large-triangle", x: 60, y: 280, rot: 0, flipped: false, color: "#3b82f6" },
        t2: { id: "t2", type: "large-triangle", x: 140, y: 280, rot: 90, flipped: false, color: "#60a5fa" },
        tm: { id: "tm", type: "med-triangle", x: 215, y: 280, rot: 45, flipped: false, color: "#10b981" },
        ts1: { id: "ts1", type: "small-triangle", x: 275, y: 280, rot: 0, flipped: false, color: "#f59e0b" },
        ts2: { id: "ts2", type: "small-triangle", x: 60, y: 230, rot: 180, flipped: false, color: "#fbbf24" },
        sq: { id: "sq", type: "square", x: 130, y: 230, rot: 0, flipped: false, color: "#ec4899" },
        para: { id: "para", type: "parallelogram", x: 210, y: 230, rot: 0, flipped: false, color: "#8b5cf6" }
      };
      isSolved = false;
    }

    function checkWin() {
      const p = TANGRAM_PUZZLES[puzzleIdx];
      const targets = p.targetLayout;
      if (!targets) return false;

      const DIST_TOLERANCE = 35;
      const checkMatch = (pc, tgt) => {
        if (!pc || !tgt) return false;
        const dx = Math.abs(pc.x - (tgt.x * 0.9));
        const dy = Math.abs(pc.y - (tgt.y * 0.9));
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > DIST_TOLERANCE) return false;

        const dRot = Math.abs((pc.rot - tgt.rot + 360) % 360);
        if (pc.type === "square") return dRot % 90 === 0;
        if (pc.type === "parallelogram") return (dRot % 180 === 0) && (!!pc.flipped === !!tgt.flipped);
        return dRot === 0;
      };

      const matchT1 = checkMatch(pieces.t1, targets.t1) || checkMatch(pieces.t1, targets.t2);
      const matchT2 = checkMatch(pieces.t2, targets.t2) || checkMatch(pieces.t2, targets.t1);
      const matchTm = checkMatch(pieces.tm, targets.tm);
      const matchTs1 = checkMatch(pieces.ts1, targets.ts1) || checkMatch(pieces.ts1, targets.ts2);
      const matchTs2 = checkMatch(pieces.ts2, targets.ts2) || checkMatch(pieces.ts2, targets.ts1);
      const matchSq = checkMatch(pieces.sq, targets.sq);
      const matchPara = checkMatch(pieces.para, targets.para);

      const all = matchT1 && matchT2 && matchTm && matchTs1 && matchTs2 && matchSq && matchPara;
      if (all && !isSolved) {
        isSolved = true;
        score += 50;
      }
      return all;
    }

    function renderView() {
      const p = TANGRAM_PUZZLES[puzzleIdx];
      const silhouettePath = generateSilhouettePath(p.targetLayout);
      const activePiece = pieces[selectedPieceId];

      container.innerHTML = `
        <div class="game-arena tangram-arena" style="max-width:720px; margin:0 auto; display:flex; flex-direction:column; gap:16px">
          <div class="game-hud" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; padding:12px 18px; background:#fff; border-radius:12px; border:1px solid #e2e8f0">
            <div>
              <span style="font-weight:700">Hình ghép:</span>
              <select id="tangramSelect" style="padding:6px 10px; border-radius:8px; border:1px solid #cbd5e1; font-weight:600">
                ${TANGRAM_PUZZLES.map((item, idx) => `
                  <option value="${idx}" ${idx === puzzleIdx ? 'selected' : ''}>
                    Bài ${idx + 1}: ${item.name} (${item.topic || 'Hình học'})
                  </option>
                `).join("")}
              </select>
            </div>
            <div style="display:flex; align-items:center; gap:14px">
              <span style="font-size:14px; font-weight:600">Tiến độ: <b>${puzzleIdx + 1}/${TANGRAM_PUZZLES.length}</b></span>
              <span style="font-size:14px; font-weight:600">Điểm: <b style="color:#4f46e5; font-size:16px">${score}</b></span>
            </div>
          </div>

          <div style="display:flex; gap:18px; justify-content:center; align-items:flex-start; flex-wrap:wrap">
            <!-- Vùng chơi SVG 340x340 -->
            <div style="position:relative; width:340px; height:340px; background:#f8fafc; border-radius:14px; border:2px solid #cbd5e1; box-shadow:0 6px 20px rgba(0,0,0,0.06); touch-action:none" id="tangramStage">
              <svg width="340" height="340" style="display:block">
                <!-- Hình bóng Silhouette mục tiêu -->
                <path d="${silhouettePath}" fill="rgba(30, 41, 59, 0.12)" stroke="#475569" stroke-width="2" stroke-dasharray="4,4" />

                <!-- Các mảnh ghép -->
                ${Object.values(pieces).map(pc => {
                  const isSel = pc.id === selectedPieceId;
                  const pts = getPiecePolygonPoints(pc.type);
                  const sx = pc.flipped ? -1 : 1;
                  return `
                    <g class="tangram-piece" data-pid="${pc.id}" transform="translate(${pc.x}, ${pc.y}) rotate(${pc.rot}) scale(${sx}, 1)" style="cursor:grab">
                      <polygon points="${pts}" fill="${pc.color}" stroke="${isSel ? '#ffffff' : 'rgba(0,0,0,0.2)'}" stroke-width="${isSel ? '3' : '1.5'}" filter="${isSel ? 'drop-shadow(0 0 6px rgba(0,0,0,0.4))' : 'none'}" />
                    </g>
                  `;
                }).join("")}
              </svg>
            </div>

            <!-- Bảng Công Cụ Xoay & Lật iPad -->
            <div style="display:flex; flex-direction:column; gap:12px; min-width:240px">
              <div style="font-size:13px; font-weight:700; color:#64748b">
                Mảnh đang chọn: <b style="color:${activePiece?.color || '#333'}">${activePiece ? activePiece.id.toUpperCase() : 'Chạm mảnh để chọn'}</b>
              </div>

              <!-- Nút xoay 45 độ & Lật -->
              <div style="display:flex; gap:8px">
                <button class="btn btn-secondary" id="tgRotateLeftBtn" style="flex:1; font-size:14px; font-weight:700">↺ Xoay 45°</button>
                <button class="btn btn-secondary" id="tgRotateRightBtn" style="flex:1; font-size:14px; font-weight:700">↻ Xoay 45°</button>
              </div>

              ${activePiece?.type === 'parallelogram' ? `
                <button class="btn btn-secondary" id="tgFlipBtn" style="font-size:13px; font-weight:700">⇄ Lật Mặt Hình Bình Hành</button>
              ` : ''}

              <!-- D-Pad dịch chuyển chính xác -->
              <div style="display:grid; grid-template-columns:repeat(3, 48px); grid-template-rows:repeat(3, 48px); gap:6px; margin:4px auto">
                <div style="grid-column:2; grid-row:1">
                  <button class="btn btn-outline" id="tgMoveUp" style="width:100%; height:100%; padding:0">▲</button>
                </div>
                <div style="grid-column:1; grid-row:2">
                  <button class="btn btn-outline" id="tgMoveLeft" style="width:100%; height:100%; padding:0">◀</button>
                </div>
                <div style="grid-column:2; grid-row:2; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; color:#94a3b8">
                  Dịch
                </div>
                <div style="grid-column:3; grid-row:2">
                  <button class="btn btn-outline" id="tgMoveRight" style="width:100%; height:100%; padding:0">▶</button>
                </div>
                <div style="grid-column:2; grid-row:3">
                  <button class="btn btn-outline" id="tgMoveDown" style="width:100%; height:100%; padding:0">▼</button>
                </div>
              </div>

              <!-- Nút Snap Gợi ý & Reset -->
              <div style="display:flex; gap:8px">
                <button class="btn btn-secondary btn-sm" id="tgHintSnapBtn" style="flex:1">💡 Gợi Ý 1 Mảnh</button>
                <button class="btn btn-secondary btn-sm" id="tgResetBtn" style="flex:1">🔄 Xếp Lại</button>
              </div>

              <div style="display:flex; gap:8px">
                <button class="btn btn-outline btn-sm" id="tgPrevBtn" ${puzzleIdx === 0 ? 'disabled' : ''}>← Bài Trước</button>
                <button class="btn btn-outline btn-sm" id="tgNextBtn" ${puzzleIdx >= TANGRAM_PUZZLES.length - 1 ? 'disabled' : ''}>Bài Sau →</button>
              </div>
            </div>
          </div>

          ${isSolved ? `
            <div style="background:#f0fdf4; border:2px solid #22c55e; border-radius:12px; padding:16px; text-align:center; animation:fadeIn 0.3s ease">
              <h3 style="color:#15803d; margin:0 0 6px 0">🎉 GHÉP HÌNH HOÀN TẤT XUẤT SẮC!</h3>
              <p style="margin:0 0 12px 0; color:#166534">Ngân đã xếp khớp hoàn hảo hình <b>${p.name}</b> (+50 điểm)</p>
              <div style="display:flex; gap:10px; justify-content:center">
                <button class="btn btn-primary" id="tgNextWinBtn">Thử Thách Tiếp Theo ▶</button>
                <button class="btn btn-secondary" id="tgExitBtn">Về Menu Trò Chơi</button>
              </div>
            </div>
          ` : ''}
        </div>
      `;

      // Gắn sự kiện chọn mảnh
      container.querySelectorAll(".tangram-piece").forEach(el => {
        el.addEventListener("click", () => {
          selectedPieceId = el.dataset.pid;
          renderView();
        });
      });

      // Kéo thả chạm trên màn hình iPad / Chuột
      const stage = container.querySelector("#tangramStage");
      let draggingPiece = null;
      let dragOffset = { x: 0, y: 0 };

      const startDrag = (clientX, clientY, pid) => {
        selectedPieceId = pid;
        draggingPiece = pieces[pid];
        const rect = stage.getBoundingClientRect();
        dragOffset = {
          x: (clientX - rect.left) - draggingPiece.x,
          y: (clientY - rect.top) - draggingPiece.y
        };
      };

      const moveDrag = (clientX, clientY) => {
        if (!draggingPiece) return;
        const rect = stage.getBoundingClientRect();
        const nx = Math.max(25, Math.min(315, (clientX - rect.left) - dragOffset.x));
        const ny = Math.max(25, Math.min(315, (clientY - rect.top) - dragOffset.y));
        draggingPiece.x = Math.round(nx);
        draggingPiece.y = Math.round(ny);
        checkWin();
        renderView();
      };

      const endDrag = () => {
        draggingPiece = null;
      };

      stage.addEventListener("pointerdown", (e) => {
        const pieceEl = e.target.closest(".tangram-piece");
        if (pieceEl) {
          startDrag(e.clientX, e.clientY, pieceEl.dataset.pid);
          stage.setPointerCapture?.(e.pointerId);
        }
      });

      stage.addEventListener("pointermove", (e) => {
        if (draggingPiece) moveDrag(e.clientX, e.clientY);
      });

      stage.addEventListener("pointerup", (e) => {
        endDrag();
      });

      // Nút xoay & lật
      container.querySelector("#tgRotateLeftBtn")?.addEventListener("click", () => {
        if (pieces[selectedPieceId]) {
          pieces[selectedPieceId].rot = (pieces[selectedPieceId].rot - 45 + 360) % 360;
          checkWin();
          renderView();
        }
      });

      container.querySelector("#tgRotateRightBtn")?.addEventListener("click", () => {
        if (pieces[selectedPieceId]) {
          pieces[selectedPieceId].rot = (pieces[selectedPieceId].rot + 45) % 360;
          checkWin();
          renderView();
        }
      });

      container.querySelector("#tgFlipBtn")?.addEventListener("click", () => {
        if (pieces[selectedPieceId]?.type === "parallelogram") {
          pieces[selectedPieceId].flipped = !pieces[selectedPieceId].flipped;
          checkWin();
          renderView();
        }
      });

      // D-Pad di chuyển từng bước
      const step = 15;
      container.querySelector("#tgMoveUp")?.addEventListener("click", () => {
        if (pieces[selectedPieceId]) {
          pieces[selectedPieceId].y = Math.max(25, pieces[selectedPieceId].y - step);
          checkWin();
          renderView();
        }
      });
      container.querySelector("#tgMoveDown")?.addEventListener("click", () => {
        if (pieces[selectedPieceId]) {
          pieces[selectedPieceId].y = Math.min(315, pieces[selectedPieceId].y + step);
          checkWin();
          renderView();
        }
      });
      container.querySelector("#tgMoveLeft")?.addEventListener("click", () => {
        if (pieces[selectedPieceId]) {
          pieces[selectedPieceId].x = Math.max(25, pieces[selectedPieceId].x - step);
          checkWin();
          renderView();
        }
      });
      container.querySelector("#tgMoveRight")?.addEventListener("click", () => {
        if (pieces[selectedPieceId]) {
          pieces[selectedPieceId].x = Math.min(315, pieces[selectedPieceId].x + step);
          checkWin();
          renderView();
        }
      });

      // Gợi ý snap 1 mảnh
      container.querySelector("#tgHintSnapBtn")?.addEventListener("click", () => {
        const tgts = TANGRAM_PUZZLES[puzzleIdx].targetLayout;
        if (tgts && tgts[selectedPieceId]) {
          pieces[selectedPieceId].x = Math.round(tgts[selectedPieceId].x * 0.9);
          pieces[selectedPieceId].y = Math.round(tgts[selectedPieceId].y * 0.9);
          pieces[selectedPieceId].rot = tgts[selectedPieceId].rot;
          pieces[selectedPieceId].flipped = !!tgts[selectedPieceId].flipped;
          checkWin();
          renderView();
        }
      });

      container.querySelector("#tgResetBtn")?.addEventListener("click", () => {
        resetPieces();
        renderView();
      });

      container.querySelector("#tgSelect")?.addEventListener("change", (e) => {
        puzzleIdx = parseInt(e.target.value, 10);
        resetPieces();
        renderView();
      });

      container.querySelector("#tgPrevBtn")?.addEventListener("click", () => {
        if (puzzleIdx > 0) {
          puzzleIdx--;
          resetPieces();
          renderView();
        }
      });

      container.querySelector("#tgNextBtn")?.addEventListener("click", () => {
        if (puzzleIdx < TANGRAM_PUZZLES.length - 1) {
          puzzleIdx++;
          resetPieces();
          renderView();
        }
      });

      container.querySelector("#tgNextWinBtn")?.addEventListener("click", () => {
        if (puzzleIdx < TANGRAM_PUZZLES.length - 1) {
          puzzleIdx++;
          resetPieces();
          renderView();
        } else {
          onComplete(score);
        }
      });

      container.querySelector("#tgExitBtn")?.addEventListener("click", () => {
        onComplete(score);
      });
    }

    renderView();
  }
};
