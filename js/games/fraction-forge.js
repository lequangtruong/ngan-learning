// js/games/fraction-forge.js - Game 4: Đấu Trường Phân Số

export const FractionForgeGame = {
  id: "fraction-forge",
  title: "Đấu Trường Phân Số",
  subtitle: "Quy đồng mẫu số, so sánh và rút gọn phân số siêu tốc",
  icon: "⚖️",
  targetCompetency: "algebra",
  weight: 1.0,

  render(container, onComplete) {
    const questions = [
      { q: "Rút gọn phân số 16/24 về tối giản:", answer: "2/3" },
      { q: "Tính tổng: 1/3 + 1/6 = ? (Nhập phân số tối giản)", answer: "1/2" },
      { q: "So sánh: Trong hai phân số 3/4 và 4/5, phân số nào lớn hơn?", answer: "4/5" },
      { q: "Tính: 3/5 × 10/9 = ? (Nhập phân số tối giản)", answer: "2/3" }
    ];

    let currentIdx = 0;
    let score = 0;

    const renderQuestion = () => {
      if (currentIdx >= questions.length) {
        container.innerHTML = `
          <div class="game-completed-box">
            <h3>⚖️ Hoàn Thành Đấu Trường Phân Số!</h3>
            <p>Tổng điểm: <b>${score} điểm</b></p>
            <button class="btn btn-primary" id="ffRestart">Chơi Lại</button>
            <button class="btn btn-secondary" id="ffExit">Về Menu</button>
          </div>
        `;
        container.querySelector("#ffRestart").addEventListener("click", () => FractionForgeGame.render(container, onComplete));
        container.querySelector("#ffExit").addEventListener("click", () => onComplete(score));
        return;
      }

      const q = questions[currentIdx];
      container.innerHTML = `
        <div class="game-arena fraction-arena">
          <div class="game-hud">
            <div>Câu: <b>${currentIdx + 1}/${questions.length}</b></div>
            <div>Điểm: <b>${score}</b></div>
          </div>
          <div class="question-display">${q.q}</div>
          <div class="answer-row">
            <input type="text" id="ffInput" class="math-answer-input" placeholder="Ví dụ: 2/3" data-math-input autofocus />
            <button class="btn btn-primary" id="ffSubmitBtn">Xác Nhận</button>
          </div>
          <div class="feedback-msg" id="ffFeedback"></div>
        </div>
      `;

      const input = container.querySelector("#ffInput");
      const btn = container.querySelector("#ffSubmitBtn");
      const feedback = container.querySelector("#ffFeedback");

      const check = () => {
        const val = String(input.value || "").trim();
        if (!val) return;
        if (val === q.answer) {
          score += 25;
          feedback.innerHTML = `<span class="correct">✔ Đúng rồi! (+25đ)</span>`;
        } else {
          feedback.innerHTML = `<span class="incorrect">✘ Chưa đúng! Đáp án đúng là <b>${q.answer}</b></span>`;
        }
        currentIdx++;
        setTimeout(renderQuestion, 1200);
      };

      btn.addEventListener("click", check);
      input.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
    };

    renderQuestion();
  }
};
