// js/games/spatial-3d.js - Game 10: Thám Tử Khối 3D & Net Gấp Hộp (Toán Lớp 6 GDPT 2018)
import { SPATIAL_3D_CHALLENGES } from "../../data/games/spatial-3d-challenges.js";

export function renderIsometricCubesSvg(cubes = [], { width = 380, height = 260, size = 28 } = {}) {
  if (!cubes || cubes.length === 0) {
    return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><text x="50%" y="50%" text-anchor="middle" fill="#666">Chưa có dữ liệu khối 3D</text></svg>`;
  }

  const originX = width / 2;
  const originY = height / 2 + 40;
  const cos30 = Math.cos(Math.PI / 6);
  const sin30 = Math.sin(Math.PI / 6);

  const sorted = [...cubes].sort((a, b) => {
    const depthA = (a[0] + a[1]) + a[2] * 0.1;
    const depthB = (b[0] + b[1]) + b[2] * 0.1;
    return depthA - depthB;
  });

  function toScreen(x, y, z) {
    const sx = originX + (x - y) * size * cos30;
    const sy = originY + (x + y) * size * sin30 - z * size;
    return [Math.round(sx * 10) / 10, Math.round(sy * 10) / 10];
  }

  let pathsHtml = "";
  for (let i = 0; i < sorted.length; i++) {
    const [x, y, z] = sorted[i];
    const p000 = toScreen(x, y, z);
    const p100 = toScreen(x + 1, y, z);
    const p110 = toScreen(x + 1, y + 1, z);
    const p010 = toScreen(x, y + 1, z);

    const p001 = toScreen(x, y, z + 1);
    const p101 = toScreen(x + 1, y, z + 1);
    const p111 = toScreen(x + 1, y + 1, z + 1);
    const p011 = toScreen(x, y + 1, z + 1);

    const topPts = `${p001.join(",")} ${p101.join(",")} ${p111.join(",")} ${p011.join(",")}`;
    const leftPts = `${p010.join(",")} ${p110.join(",")} ${p111.join(",")} ${p011.join(",")}`;
    const rightPts = `${p100.join(",")} ${p110.join(",")} ${p111.join(",")} ${p101.join(",")}`;

    pathsHtml += `
      <g class="cube-unit">
        <polygon points="${leftPts}" fill="#6366f1" stroke="#312e81" stroke-width="1.5" stroke-linejoin="round" opacity="0.95" />
        <polygon points="${rightPts}" fill="#4338ca" stroke="#312e81" stroke-width="1.5" stroke-linejoin="round" opacity="0.95" />
        <polygon points="${topPts}" fill="#a5b4fc" stroke="#312e81" stroke-width="1.5" stroke-linejoin="round" />
      </g>
    `;
  }

  return `
    <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; display: block;">
      ${pathsHtml}
    </svg>
  `;
}

export function renderCubeNetSvg(challenge, { width = 380, height = 240 } = {}) {
  const cellSize = 38;
  const startX = width / 2 - cellSize / 2;
  const startY = 25;

  const layoutFaces = [
    { label: "2", x: 0, y: 0, bg: "#c7d2fe" },
    { label: "3", x: -1, y: 1, bg: "#e0e7ff" },
    { label: "1", x: 0, y: 1, bg: "#818cf8" },
    { label: "5", x: 1, y: 1, bg: "#e0e7ff" },
    { label: "6", x: 2, y: 1, bg: "#e0e7ff" },
    { label: "4", x: 0, y: 2, bg: "#c7d2fe" }
  ];

  let rectsHtml = "";
  for (const f of layoutFaces) {
    const rx = startX + f.x * cellSize;
    const ry = startY + f.y * cellSize;
    rectsHtml += `
      <g>
        <rect x="${rx}" y="${ry}" width="${cellSize}" height="${cellSize}" fill="${f.bg}" stroke="#3730a3" stroke-width="2" rx="4" />
        <text x="${rx + cellSize/2}" y="${ry + cellSize/2 + 6}" font-size="16" font-weight="700" text-anchor="middle" fill="#1e1b4b">${f.label}</text>
      </g>
    `;
  }

  return `
    <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" style="background:rgba(99,102,241,0.04); border-radius:12px; display:block">
      <g transform="translate(0, 10)">
        ${rectsHtml}
      </g>
      <text x="50%" y="${height - 15}" font-size="12" font-weight="600" text-anchor="middle" fill="#64748b">
        Tấm trải phẳng 6 mặt hình lập phương (Gấp theo viền)
      </text>
    </svg>
  `;
}

export const Spatial3DGame = {
  id: "spatial-3d",
  title: "Thám Tử Khối 3D & Net Gấp",
  subtitle: "Rèn tư duy không gian 3 chiều - Đếm khối lập phương ẩn, hình chiếu và gấp hộp",
  icon: "🧊",
  targetCompetency: "visual",
  weight: 1.0,

  render(container, onComplete) {
    let currentIdx = 0;
    let score = 0;
    let selectedOption = null;
    let isAnswerChecked = false;
    let isCorrect = false;

    function renderView() {
      const ch = SPATIAL_3D_CHALLENGES[currentIdx];
      const visualSvg = ch.mode === "cube-nets"
        ? renderCubeNetSvg(ch)
        : renderIsometricCubesSvg(ch.cubes);

      container.innerHTML = `
        <div class="game-arena spatial-3d-arena" style="max-width:700px; margin:0 auto; display:flex; flex-direction:column; gap:16px">
          <div class="game-hud" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; padding:12px 18px; background:#fff; border-radius:12px; border:1px solid #e2e8f0">
            <div>
              <span style="font-weight:700">Câu hỏi:</span>
              <select id="sp3dSelect" style="padding:6px 10px; border-radius:8px; border:1px solid #cbd5e1; font-weight:600">
                ${SPATIAL_3D_CHALLENGES.map((item, idx) => `
                  <option value="${idx}" ${idx === currentIdx ? 'selected' : ''}>
                    Bài ${idx + 1}: ${item.title} (${item.mode === 'cube-nets' ? 'Gấp hộp' : 'Khối 3D'})
                  </option>
                `).join("")}
              </select>
            </div>
            <div style="display:flex; align-items:center; gap:14px">
              <span style="font-size:14px; font-weight:600">Tiến độ: <b>${currentIdx + 1}/${SPATIAL_3D_CHALLENGES.length}</b></span>
              <span style="font-size:14px; font-weight:600">Điểm: <b style="color:#4f46e5; font-size:16px">${score}</b></span>
            </div>
          </div>

          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:20px; box-shadow:0 4px 16px rgba(0,0,0,0.04); display:flex; flex-direction:column; gap:16px">
            <h3 style="margin:0; font-size:17px; color:#1e1b4b">${ch.title}</h3>
            <p style="margin:0; font-size:14px; color:#475569; line-height:1.5">${ch.prompt}</p>

            <!-- Visual 3D SVG -->
            <div style="display:flex; justify-content:center">
              ${visualSvg}
            </div>

            <!-- Các nút lựa chọn đáp án -->
            <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:12px; margin-top:8px">
              ${(ch.options || [ch.correctAnswer]).map(opt => {
                let btnStyle = "padding:14px 18px; font-size:16px; font-weight:700; border-radius:10px; cursor:pointer; transition:all 0.15s ease; border:2px solid ";
                if (isAnswerChecked) {
                  if (String(opt) === String(ch.correctAnswer)) {
                    btnStyle += "#22c55e; background:#dcfce7; color:#15803d;";
                  } else if (String(opt) === String(selectedOption)) {
                    btnStyle += "#ef4444; background:#fee2e2; color:#b91c1c;";
                  } else {
                    btnStyle += "#e2e8f0; background:#f8fafc; color:#94a3b8; opacity:0.6;";
                  }
                } else if (String(opt) === String(selectedOption)) {
                  btnStyle += "#4f46e5; background:#eef2ff; color:#4338ca;";
                } else {
                  btnStyle += "#cbd5e1; background:#ffffff; color:#1e293b;";
                }
                return `
                  <button class="sp3d-opt-btn" data-val="${opt}" style="${btnStyle}" ${isAnswerChecked ? 'disabled' : ''}>
                    ${opt}
                  </button>
                `;
              }).join("")}
            </div>

            ${isAnswerChecked ? `
              <div style="padding:14px; border-radius:10px; background:${isCorrect ? '#f0fdf4' : '#fef2f2'}; border:1px solid ${isCorrect ? '#86efac' : '#fecaca'}; margin-top:6px">
                <div style="font-weight:700; color:${isCorrect ? '#15803d' : '#dc2626'}; margin-bottom:4px">
                  ${isCorrect ? '✔ Chính xác tuyệt vời! (+20 điểm)' : '✘ Chưa chính xác rồi!'}
                </div>
                <div style="font-size:13px; color:#475569; line-height:1.4">
                  ${ch.explanation || `Đáp án đúng là: ${ch.correctAnswer}`}
                </div>
              </div>
            ` : ''}

            <!-- Thanh điều hướng hành động -->
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-top:8px; border-top:1px solid #f1f5f9; padding-top:14px">
              <div style="display:flex; gap:8px">
                <button class="btn btn-secondary btn-sm" id="sp3dPrevBtn" ${currentIdx === 0 ? 'disabled' : ''}>← Câu Trước</button>
                <button class="btn btn-secondary btn-sm" id="sp3dNextBtn" ${currentIdx >= SPATIAL_3D_CHALLENGES.length - 1 ? 'disabled' : ''}>Câu Sau →</button>
              </div>
              <div style="display:flex; gap:8px">
                ${!isAnswerChecked ? `
                  <button class="btn btn-primary" id="sp3dCheckBtn" ${selectedOption === null ? 'disabled' : ''}>Kiểm Tra Đáp Án</button>
                ` : `
                  <button class="btn btn-primary" id="sp3dContinueBtn">Câu Tiếp Theo ▶</button>
                `}
                <button class="btn btn-outline" id="sp3dExitBtn">Về Menu</button>
              </div>
            </div>
          </div>
        </div>
      `;

      // Gắn sự kiện
      container.querySelectorAll(".sp3d-opt-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          selectedOption = btn.dataset.val;
          renderView();
        });
      });

      container.querySelector("#sp3dCheckBtn")?.addEventListener("click", () => {
        if (selectedOption === null) return;
        isAnswerChecked = true;
        isCorrect = String(selectedOption).trim() === String(ch.correctAnswer).trim();
        if (isCorrect) score += 20;
        renderView();
      });

      container.querySelector("#sp3dContinueBtn")?.addEventListener("click", () => {
        if (currentIdx < SPATIAL_3D_CHALLENGES.length - 1) {
          currentIdx++;
          selectedOption = null;
          isAnswerChecked = false;
          isCorrect = false;
          renderView();
        } else {
          onComplete(score);
        }
      });

      container.querySelector("#sp3dPrevBtn")?.addEventListener("click", () => {
        if (currentIdx > 0) {
          currentIdx--;
          selectedOption = null;
          isAnswerChecked = false;
          isCorrect = false;
          renderView();
        }
      });

      container.querySelector("#sp3dNextBtn")?.addEventListener("click", () => {
        if (currentIdx < SPATIAL_3D_CHALLENGES.length - 1) {
          currentIdx++;
          selectedOption = null;
          isAnswerChecked = false;
          isCorrect = false;
          renderView();
        }
      });

      container.querySelector("#sp3dSelect")?.addEventListener("change", (e) => {
        currentIdx = parseInt(e.target.value, 10);
        selectedOption = null;
        isAnswerChecked = false;
        isCorrect = false;
        renderView();
      });

      container.querySelector("#sp3dExitBtn")?.addEventListener("click", () => {
        onComplete(score);
      });
    }

    renderView();
  }
};
