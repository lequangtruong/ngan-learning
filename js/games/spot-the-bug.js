// js/games/spot-the-bug.js - Game 6: Thám Tử Săn Lỗi Sai Lớp 6

export const SpotTheBugGame = {
  id: "spot-the-bug",
  title: "Spot the Bug 6.0",
  subtitle: "Thám tử săn bẫy sai kinh điển: Đổi dấu ngoặc, lũy thừa & thứ tự phép tính",
  icon: "🔍",
  targetCompetency: "resilience",
  weight: 1.0,

  render(container, onComplete) {
    const cases = [
      {
        title: "Bẫy dấu trừ trước dấu ngoặc",
        steps: [
          "Đề bài: Rút gọn biểu thức A = 15 − (x − 8)",
          "Dòng 1: A = 15 − x − 8",
          "Dòng 2: A = (15 − 8) − x",
          "Dòng 3: A = 7 − x"
        ],
        bugStep: 1, // Dòng 1 bị sai vì phá ngoặc có dấu trừ phải đổi -8 thành +8
        explanation: "Dòng 1 sai! Khi phá ngoặc có dấu trừ đằng trước: 15 − (x − 8) = 15 − x + 8."
      },
      {
        title: "Bẫy lũy thừa nhân chia",
        steps: [
          "Đề bài: Tính 4 × 3^2",
          "Dòng 1: = (4 × 3)^2",
          "Dòng 2: = 12^2",
          "Dòng 3: = 144"
        ],
        bugStep: 1, // Dòng 1 sai vì lũy thừa phải tính trước nhân
        explanation: "Dòng 1 sai! Phải tính 3^2 = 9 trước: 4 × 9 = 36."
      },
      {
        title: "Bẫy chia hai phân số",
        steps: [
          "Đề bài: Tính 3/4 ÷ 2/5",
          "Dòng 1: = (3 ÷ 2) / (4 ÷ 5)",
          "Dòng 2: Không thể chia tử cho tử, mẫu cho mẫu trực tiếp"
        ],
        bugStep: 1,
        explanation: "Dòng 1 sai! Chia phân số phải nhân với phân số đảo ngược: 3/4 × 5/2 = 15/8."
      }
    ];

    let currentIdx = 0;
    let score = 0;

    const renderCase = () => {
      if (currentIdx >= cases.length) {
        container.innerHTML = `
          <div class="game-completed-box">
            <h3>🔍 Thám Tử Săn Lỗi Xuất Sắc!</h3>
            <p>Tổng điểm: <b>${score} điểm</b></p>
            <button class="btn btn-primary" id="stbRestart">Luyện Tiếp</button>
            <button class="btn btn-secondary" id="stbExit">Về Menu</button>
          </div>
        `;
        container.querySelector("#stbRestart").addEventListener("click", () => SpotTheBugGame.render(container, onComplete));
        container.querySelector("#stbExit").addEventListener("click", () => onComplete(score));
        return;
      }

      const c = cases[currentIdx];
      container.innerHTML = `
        <div class="game-arena spot-bug-box">
          <div class="game-hud">
            <div>Vụ án: <b>${currentIdx + 1}/${cases.length}</b></div>
            <div>Điểm: <b>${score}</b></div>
          </div>
          <div class="case-header">
            <h4>${c.title}</h4>
            <p>Tìm xem dòng nào bắt đầu xuất hiện lỗi sai quy tắc:</p>
          </div>
          <div class="steps-list">
            ${c.steps.map((st, idx) => `
              <button class="btn btn-step-choice" data-step-idx="${idx}">
                ${st}
              </button>
            `).join("")}
          </div>
          <div class="feedback-msg" id="stbFeedback"></div>
        </div>
      `;

      const buttons = container.querySelectorAll(".btn-step-choice");
      const feedback = container.querySelector("#stbFeedback");

      buttons.forEach(btn => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.dataset.stepIdx, 10);
          buttons.forEach(b => b.disabled = true);

          if (idx === c.bugStep) {
            btn.classList.add("btn-correct");
            score += 30;
            feedback.innerHTML = `<span class="correct">✔ Bắt đúng lỗi! ${c.explanation} (+30đ)</span>`;
          } else {
            btn.classList.add("btn-wrong");
            feedback.innerHTML = `<span class="incorrect">✘ Chưa đúng! Dòng bị sai là Dòng ${c.bugStep}. ${c.explanation}</span>`;
          }
          currentIdx++;
          setTimeout(renderCase, 2200);
        });
      });
    };

    renderCase();
  }
};
