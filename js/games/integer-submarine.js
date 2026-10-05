// js/games/integer-submarine.js - Game 2: Tàu Ngầm Số Nguyên Z

export const IntegerSubmarineGame = {
  id: "integer-submarine",
  title: "Tàu Ngầm Số Nguyên Z",
  subtitle: "Làm chủ trục số âm dương và phép tính số nguyên qua hành trình thám hiểm đáy biển",
  icon: "🌊",
  targetCompetency: "algebra",
  weight: 1.0,

  render(container, onComplete) {
    let depth = -20; // Mặc định ở độ sâu -20m
    let targetDepth = -50;
    let score = 0;
    let round = 1;
    const maxRounds = 5;

    const updateDisplay = () => {
      container.innerHTML = `
        <div class="game-arena submarine-arena">
          <div class="game-hud">
            <div>Chuyến lặn: <b>${round}/${maxRounds}</b></div>
            <div>Điểm: <b>${score}</b></div>
          </div>
          <div class="sea-visual">
            <div class="depth-gauge">
              <span class="depth-marker zero">Mặt biển (0m)</span>
              <span class="depth-marker current" style="top: ${Math.min(90, Math.max(10, Math.abs(depth)))}%">
                🚢 Tàu ở: <b>${depth}m</b>
              </span>
              <span class="depth-marker target" style="top: ${Math.min(90, Math.max(10, Math.abs(targetDepth)))}%">
                💎 Kho báu: <b>${targetDepth}m</b>
              </span>
            </div>
          </div>
          <div class="mission-box">
            <p>Tàu đang ở độ sâu <b>${depth}m</b>. Để đến kho báu ở độ sâu <b>${targetDepth}m</b>, tàu cần lặn thêm hay ngoi lên bao nhiêu mét?</p>
            <div class="answer-row">
              <input type="text" id="subDepthInput" class="math-answer-input" placeholder="Ví dụ: -30 hoặc +30" data-math-input />
              <button class="btn btn-primary" id="subMoveBtn">Phát Lệnh</button>
            </div>
            <div class="feedback-msg" id="subFeedback"></div>
          </div>
        </div>
      `;

      const input = container.querySelector("#subDepthInput");
      const btn = container.querySelector("#subMoveBtn");
      const feedback = container.querySelector("#subFeedback");

      btn.addEventListener("click", () => {
        const val = parseInt(input.value.replace("+", ""), 10);
        const needed = targetDepth - depth;

        if (val === needed) {
          score += 20;
          depth = targetDepth;
          feedback.innerHTML = `<span class="correct">✔ Tuyệt vời! Tàu đã tiếp cận kho báu thành công! (+20đ)</span>`;
          round++;
          if (round > maxRounds) {
            setTimeout(() => {
              container.innerHTML = `
                <div class="game-completed-box">
                  <h3>🏆 Hoàn Thành Thám Hiểm Đáy Biển!</h3>
                  <p>Ngân đã nắm vững trục số nguyên Z với số điểm: <b>${score} điểm</b></p>
                  <button class="btn btn-primary" id="subRestartBtn">Lặn Tiếp</button>
                  <button class="btn btn-secondary" id="subExitBtn">Về Menu Trò Chơi</button>
                </div>
              `;
              container.querySelector("#subRestartBtn").addEventListener("click", () => IntegerSubmarineGame.render(container, onComplete));
              container.querySelector("#subExitBtn").addEventListener("click", () => onComplete(score));
            }, 1200);
            return;
          }
          // Tạo mục tiêu mới
          targetDepth = -Math.floor(Math.random() * 80 + 10);
          setTimeout(updateDisplay, 1200);
        } else {
          feedback.innerHTML = `<span class="incorrect">✘ Chưa đúng! Khoảng cách cần đi là ${needed > 0 ? "+" + needed : needed}m. Thử lại nhé!</span>`;
        }
      });
    };

    updateDisplay();
  }
};
