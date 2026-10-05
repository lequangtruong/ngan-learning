// js/games/symmetry-lab.js - Game 7: Phòng Thí Nghiệm Đối Xứng (Symmetry Mirror Lab)

export const SymmetryLabGame = {
  id: "symmetry-lab",
  title: "Symmetry Mirror Lab",
  subtitle: "Khám phá Trục đối xứng & Tâm đối xứng trong hình học và tự nhiên",
  icon: "🦋",
  targetCompetency: "geometry",
  weight: 1.0,

  render(container, onComplete) {
    const questions = [
      {
        shape: "Hình Thang Cân",
        svg: `<svg width="100" height="60" viewBox="0 0 100 60"><polygon points="30,10 70,10 85,50 15,50" fill="#fed7aa" stroke="#ea580c" stroke-width="2"/></svg>`,
        q: "Hình thang cân có mấy trục đối xứng?",
        answer: "1",
        explanation: "Hình thang cân có đúng 1 trục đối xứng là đường thẳng đi qua trung điểm 2 đáy."
      },
      {
        shape: "Hình Chữ Nhật",
        svg: `<svg width="100" height="60" viewBox="0 0 100 60"><rect x="15" y="15" width="70" height="30" fill="#bfdbfe" stroke="#2563eb" stroke-width="2"/></svg>`,
        q: "Hình chữ nhật có mấy trục đối xứng?",
        answer: "2",
        explanation: "Hình chữ nhật có 2 trục đối xứng đi qua trung điểm các cặp cạnh đối diện."
      },
      {
        shape: "Hình Vuông",
        svg: `<svg width="100" height="60" viewBox="0 0 100 60"><rect x="25" y="10" width="50" height="50" fill="#bbf7d0" stroke="#16a34a" stroke-width="2"/></svg>`,
        q: "Hình vuông có tâm đối xứng không? (Nhập: có hoặc không)",
        answer: "có",
        explanation: "Giao điểm của hai đường chéo là tâm đối xứng của hình vuông."
      }
    ];

    let currentIdx = 0;
    let score = 0;

    const renderCard = () => {
      if (currentIdx >= questions.length) {
        container.innerHTML = `
          <div class="game-completed-box">
            <h3>🦋 Chúc Mừng Bậc Thầy Đối Xứng!</h3>
            <p>Tổng điểm: <b>${score} điểm</b></p>
            <button class="btn btn-primary" id="symRestart">Khám Phá Tiếp</button>
            <button class="btn btn-secondary" id="symExit">Về Menu</button>
          </div>
        `;
        container.querySelector("#symRestart").addEventListener("click", () => SymmetryLabGame.render(container, onComplete));
        container.querySelector("#symExit").addEventListener("click", () => onComplete(score));
        return;
      }

      const item = questions[currentIdx];
      container.innerHTML = `
        <div class="game-arena symmetry-box">
          <div class="game-hud">
            <div>Hình: <b>${currentIdx + 1}/${questions.length}</b></div>
            <div>Điểm: <b>${score}</b></div>
          </div>
          <div class="symmetry-shape-card">
            <h4>${item.shape}</h4>
            <div class="shape-svg-preview">${item.svg}</div>
            <p class="shape-question">${item.q}</p>
          </div>
          <div class="answer-row">
            <input type="text" id="symInput" class="math-answer-input" placeholder="Trả lời..." data-math-input autofocus />
            <button class="btn btn-primary" id="symSubmitBtn">Xác Nhận</button>
          </div>
          <div class="feedback-msg" id="symFeedback"></div>
        </div>
      `;

      const input = container.querySelector("#symInput");
      const btn = container.querySelector("#symSubmitBtn");
      const feedback = container.querySelector("#symFeedback");

      const check = () => {
        const val = String(input.value || "").trim().toLowerCase();
        if (!val) return;
        if (val === item.answer.toLowerCase()) {
          score += 30;
          feedback.innerHTML = `<span class="correct">✔ Chính xác! ${item.explanation} (+30đ)</span>`;
        } else {
          feedback.innerHTML = `<span class="incorrect">✘ Chưa đúng! ${item.explanation}</span>`;
        }
        currentIdx++;
        setTimeout(renderCard, 1800);
      };

      btn.addEventListener("click", check);
      input.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
    };

    renderCard();
  }
};
