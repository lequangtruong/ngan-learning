// js/games/algebra-scale.js - Game 5: Cân Đại Số Tìm x

export const AlgebraScaleGame = {
  id: "algebra-scale",
  title: "Cân Đại Số Tìm x",
  subtitle: "Trực quan hóa phương trình đại số ax + b = c và chuyển vế đổi dấu",
  icon: "⚖️",
  targetCompetency: "logic",
  weight: 1.0,

  render(container, onComplete) {
    const puzzles = [
      { left: "2x + 5", right: "19", x: 7, hint: "Bớt 5 ở hai vế: 2x = 14 -> x = 7" },
      { left: "3x − 4", right: "20", x: 8, hint: "Thêm 4 ở hai vế: 3x = 24 -> x = 8" },
      { left: "5x + 12", right: "47", x: 7, hint: "Bớt 12 ở hai vế: 5x = 35 -> x = 7" },
      { left: "4x − 9", right: "27", x: 9, hint: "Thêm 9 ở hai vế: 4x = 36 -> x = 9" }
    ];

    let current = 0;
    let score = 0;

    const renderPuzzle = () => {
      if (current >= puzzles.length) {
        container.innerHTML = `
          <div class="game-completed-box">
            <h3>🎉 Bậc Thầy Giải Phương Trình Cân Bằng!</h3>
            <p>Tổng điểm: <b>${score} điểm</b></p>
            <button class="btn btn-primary" id="asRestart">Luyện Tiếp</button>
            <button class="btn btn-secondary" id="asExit">Về Menu</button>
          </div>
        `;
        container.querySelector("#asRestart").addEventListener("click", () => AlgebraScaleGame.render(container, onComplete));
        container.querySelector("#asExit").addEventListener("click", () => onComplete(score));
        return;
      }

      const p = puzzles[current];
      container.innerHTML = `
        <div class="game-arena algebra-scale-box">
          <div class="game-hud">
            <div>Bài: <b>${current + 1}/${puzzles.length}</b></div>
            <div>Điểm: <b>${score}</b></div>
          </div>
          <div class="scale-visual-card">
            <div class="scale-pan left-pan">
              <span class="pan-label">ĐĨA TRÁI</span>
              <div class="pan-expr">${p.left}</div>
            </div>
            <div class="scale-pivot">⚖️ CÂN THĂNG BẰNG (=)</div>
            <div class="scale-pan right-pan">
              <span class="pan-label">ĐĨA PHẢI</span>
              <div class="pan-expr">${p.right}</div>
            </div>
          </div>
          <div class="answer-row">
            <span style="font-weight:700; font-size:1.1rem">Giá trị của x = </span>
            <input type="text" inputmode="numeric" id="asInput" class="math-answer-input" placeholder="?" data-math-input autofocus />
            <button class="btn btn-primary" id="asSubmitBtn">Tìm x</button>
          </div>
          <div class="feedback-msg" id="asFeedback"></div>
        </div>
      `;

      const input = container.querySelector("#asInput");
      const btn = container.querySelector("#asSubmitBtn");
      const feedback = container.querySelector("#asFeedback");

      const check = () => {
        const val = parseInt(input.value, 10);
        if (isNaN(val)) return;
        if (val === p.x) {
          score += 25;
          feedback.innerHTML = `<span class="correct">✔ Chính xác! x = ${p.x}. (${p.hint}) (+25đ)</span>`;
        } else {
          feedback.innerHTML = `<span class="incorrect">✘ Chưa đúng! Gợi ý: ${p.hint}</span>`;
        }
        current++;
        setTimeout(renderPuzzle, 1400);
      };

      btn.addEventListener("click", check);
      input.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
    };

    renderPuzzle();
  }
};
