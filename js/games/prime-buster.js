// js/games/prime-buster.js - Game 3: Thợ Săn Số Nguyên Tố & Cây Thừa Số

export const PrimeBusterGame = {
  id: "prime-buster",
  title: "Thợ Săn Số Nguyên Tố",
  subtitle: "Tách hợp số thành tích các thừa số nguyên tố & tìm ƯCLN, BCNN",
  icon: "🔨",
  targetCompetency: "algebra",
  weight: 1.0,

  render(container, onComplete) {
    const targets = [
      { num: 24, factors: "2^3 × 3", choices: ["2^3 × 3", "2^2 × 6", "4 × 6", "2 × 12"] },
      { num: 36, factors: "2^2 × 3^2", choices: ["2^2 × 3^2", "4 × 9", "2 × 18", "2^3 × 3"] },
      { num: 60, factors: "2^2 × 3 × 5", choices: ["2^2 × 3 × 5", "4 × 15", "6 × 10", "2^3 × 5"] },
      { num: 72, factors: "2^3 × 3^2", choices: ["2^3 × 3^2", "8 × 9", "2^2 × 18", "2 × 36"] },
      { num: 100, factors: "2^2 × 5^2", choices: ["2^2 × 5^2", "4 × 25", "10 × 10", "2 × 50"] }
    ];

    let round = 0;
    let score = 0;

    const renderRound = () => {
      if (round >= targets.length) {
        container.innerHTML = `
          <div class="game-completed-box">
            <h3>🔨 Bậc Thầy Phân Tích Thừa Số!</h3>
            <p>Ngân đã hoàn thành xuất sắc thử thách Số nguyên tố với <b>${score} điểm</b>!</p>
            <button class="btn btn-primary" id="pbPlayAgain">Chơi Lại</button>
            <button class="btn btn-secondary" id="pbExit">Về Menu</button>
          </div>
        `;
        container.querySelector("#pbPlayAgain").addEventListener("click", () => PrimeBusterGame.render(container, onComplete));
        container.querySelector("#pbExit").addEventListener("click", () => onComplete(score));
        return;
      }

      const item = targets[round];
      container.innerHTML = `
        <div class="game-arena prime-buster-box">
          <div class="game-hud">
            <div>Câu: <b>${round + 1}/${targets.length}</b></div>
            <div>Điểm: <b>${score}</b></div>
          </div>
          <div class="prime-target-card">
            <span class="target-title">HỢP SỐ CẦN PHÂN TÍCH:</span>
            <div class="target-large-num">${item.num}</div>
            <p>Chọn dạng phân tích đúng ra thừa số nguyên tố:</p>
          </div>
          <div class="choices-grid">
            ${item.choices.map(c => `<button class="btn btn-choice" data-choice="${c}">${c}</button>`).join("")}
          </div>
          <div class="feedback-msg" id="pbFeedback"></div>
        </div>
      `;

      const buttons = container.querySelectorAll(".btn-choice");
      const feedback = container.querySelector("#pbFeedback");

      buttons.forEach(btn => {
        btn.addEventListener("click", () => {
          buttons.forEach(b => b.disabled = true);
          if (btn.dataset.choice === item.factors) {
            btn.classList.add("btn-correct");
            score += 20;
            feedback.innerHTML = `<span class="correct">✔ Chính xác! ${item.num} = ${item.factors} (+20đ)</span>`;
          } else {
            btn.classList.add("btn-wrong");
            feedback.innerHTML = `<span class="incorrect">✘ Chưa đúng! Dạng đúng là <b>${item.factors}</b></span>`;
          }
          round++;
          setTimeout(renderRound, 1200);
        });
      });
    };

    renderRound();
  }
};
