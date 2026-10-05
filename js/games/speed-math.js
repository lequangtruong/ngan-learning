// js/games/speed-math.js - Game 1: Đấu Trường Nhẩm Siêu Tốc (Speed Math Arena 90s/120s)
// Tối ưu phản xạ tốc độ cao cho iPad Air M1 với bộ đếm thời gian rực cháy

export const SpeedMathGame = {
  id: "speed-math",
  title: "Đấu Trường Nhẩm 90s - 120s",
  subtitle: "Đua tốc độ đếm ngược: Cửu chương, Số nguyên Z, Phân số & Lũy thừa Lớp 6",
  icon: "⚡",
  targetCompetency: "fluency",
  weight: 1.0,

  render(container, onComplete) {
    let duration = 90; // Mặc định 90 giây
    let remaining = 90;
    let timerId = null;
    let isRunning = false;

    let currentTier = 0; // 0: Tổng hợp tất cả, 1: Cửu chương, 2: Số nguyên Z, 3: Phân số, 4: Lũy thừa
    let score = 0;
    let streak = 0;
    let maxStreak = 0;
    let correctCount = 0;
    let totalAnswered = 0;

    let currentProblem = generateProblem(currentTier);
    let questionStartTime = Date.now();

    function formatTime(sec) {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    function cleanup() {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
      isRunning = false;
    }

    function startTimer() {
      cleanup();
      remaining = duration;
      isRunning = true;
      questionStartTime = Date.now();

      timerId = setInterval(() => {
        remaining--;
        updateTimerUi();

        if (remaining <= 0) {
          endGame();
        }
      }, 1000);
      if (typeof timerId?.unref === "function") {
        timerId.unref();
      }
    }

    function updateTimerUi() {
      const timerEl = container.querySelector("#smTimerDisplay");
      const fillEl = container.querySelector("#smTimerFill");
      const statEl = container.querySelector("#smTimerStat");

      if (timerEl) timerEl.textContent = formatTime(remaining);

      if (fillEl) {
        const pct = Math.max(0, (remaining / duration) * 100);
        fillEl.style.width = `${pct}%`;
        fillEl.className = "arena-timer-fill" + (remaining <= 10 ? " danger" : (remaining <= 25 ? " warning" : ""));
      }

      if (statEl) {
        if (remaining <= 10) statEl.classList.add("danger");
        else statEl.classList.remove("danger");
      }
    }

    function endGame() {
      cleanup();
      const apm = duration > 0 ? Math.round((totalAnswered / duration) * 60) : 0;
      const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

      let rankTitle = "🎖️ Tay Đua Tốc Độ";
      let rankTrophy = "🥉";
      if (correctCount >= 28 && accuracy >= 90) {
        rankTitle = "⚡ Thần Tốc Olympic (Tia Chớp Số Học)";
        rankTrophy = "👑";
      } else if (correctCount >= 20 && accuracy >= 80) {
        rankTitle = "🏆 Kiện Tướng Nhẩm Nhanh Lớp 6";
        rankTrophy = "🥇";
      } else if (correctCount >= 12) {
        rankTitle = "🥈 Chiến Binh Tốc Độ";
        rankTrophy = "🥈";
      }

      container.innerHTML = `
        <div class="game-completed-box" style="animation: fadeIn 0.3s ease">
          <div class="complete-trophy">${rankTrophy}</div>
          <h2 style="margin: 0 0 6px 0; color: #1e1b4b">${rankTitle}</h2>
          <p style="margin: 0; color: #64748b">Hết giờ! Ngân đã hoàn thành xuất sắc lượt đua <b>${duration} giây</b>!</p>

          <!-- Thẻ Thống Kê Trận Đấu -->
          <div class="battle-stats-grid">
            <div class="battle-stat-card">
              <div class="battle-stat-val" style="color: #4f46e5">${score}</div>
              <div class="battle-stat-label">Tổng Điểm</div>
            </div>
            <div class="battle-stat-card">
              <div class="battle-stat-val" style="color: #10b981">${correctCount}/${totalAnswered}</div>
              <div class="battle-stat-label">Số Câu Đúng</div>
            </div>
            <div class="battle-stat-card">
              <div class="battle-stat-val" style="color: #f59e0b">🔥 ${maxStreak}</div>
              <div class="battle-stat-label">Chuỗi Dài Nhất</div>
            </div>
            <div class="battle-stat-card">
              <div class="battle-stat-val" style="color: #0284c7">${apm}</div>
              <div class="battle-stat-label">Tốc Độ (Câu/phút)</div>
            </div>
            <div class="battle-stat-card">
              <div class="battle-stat-val" style="color: #8b5cf6">${accuracy}%</div>
              <div class="battle-stat-label">Độ Chính Xác</div>
            </div>
          </div>

          <div class="complete-actions">
            <button class="btn btn-primary btn-large" id="smRestartArenaBtn">🚀 Đua Lại Ván Mới (${duration}s)</button>
            <button class="btn btn-secondary btn-large" id="smExitArenaBtn">← Về Menu Trò Chơi</button>
          </div>
        </div>
      `;

      container.querySelector("#smRestartArenaBtn")?.addEventListener("click", () => {
        score = 0;
        streak = 0;
        maxStreak = 0;
        correctCount = 0;
        totalAnswered = 0;
        currentProblem = generateProblem(currentTier);
        renderScreen();
        startTimer();
      });

      container.querySelector("#smExitArenaBtn")?.addEventListener("click", () => {
        cleanup();
        onComplete(score);
      });
    }

    function renderScreen() {
      const pct = Math.max(0, (remaining / duration) * 100);

      container.innerHTML = `
        <div class="game-arena speed-math-box">
          <!-- Thanh Chọn Thời Gian & Chặng Đua -->
          <div class="speed-duration-bar">
            <div style="display:flex; align-items:center; gap:8px">
              <span style="font-weight:700; font-size:13px; color:#475569">⏱️ Đấu trường:</span>
              <div class="duration-pills">
                <button type="button" class="duration-pill ${duration === 60 ? 'is-active' : ''}" data-dur="60">60 Giây</button>
                <button type="button" class="duration-pill ${duration === 90 ? 'is-active' : ''}" data-dur="90">90 Giây 🔥</button>
                <button type="button" class="duration-pill ${duration === 120 ? 'is-active' : ''}" data-dur="120">120 Giây</button>
              </div>
            </div>

            <div class="tier-select-wrap">
              <label for="smTierSelect" style="font-weight:700; color:#475569">Chuyên đề:</label>
              <select id="smTierSelect" class="tier-dropdown">
                <option value="0" ${currentTier === 0 ? 'selected' : ''}>🎯 Tổng Hợp Đua Toàn Diện (Toán 6)</option>
                <option value="1" ${currentTier === 1 ? 'selected' : ''}>Tầng 1: Cửu chương & Tự nhiên</option>
                <option value="2" ${currentTier === 2 ? 'selected' : ''}>Tầng 2: Số nguyên âm Z</option>
                <option value="3" ${currentTier === 3 ? 'selected' : ''}>Tầng 3: Phân số nhẩm nhanh</option>
                <option value="4" ${currentTier === 4 ? 'selected' : ''}>Tầng 4: Lũy thừa & Quy tắc ngoặc</option>
              </select>
            </div>
          </div>

          <!-- Thanh Đồng Hồ Đếm Ngược Trực Quan -->
          <div class="arena-timer-wrap">
            <div class="arena-timer-fill ${remaining <= 10 ? 'danger' : (remaining <= 25 ? 'warning' : '')}" id="smTimerFill" style="width: ${pct}%"></div>
          </div>

          <!-- HUD Thông Số Trận Đấu -->
          <div class="game-hud">
            <div class="hud-stat timer-stat ${remaining <= 10 ? 'danger' : ''}" id="smTimerStat">
              Thời gian: <b id="smTimerDisplay">${formatTime(remaining)}</b>
            </div>
            <div class="hud-stats-group">
              <div class="hud-stat score">Điểm: <b id="smScore">${score}</b></div>
              <div class="hud-stat streak">Chuỗi: <b id="smStreak">${streak > 0 ? `🔥 ${streak}` : '0'}</b></div>
              <div class="hud-stat progress">Đã giải: <b id="smProgress">${correctCount}</b> câu</div>
            </div>
          </div>

          <!-- Thẻ Hiển Thị Câu Hỏi -->
          <div class="question-hero-card">
            <span class="q-tier-tag">${currentProblem.tierTag || 'ĐẤU TRƯỜNG TOÁN 6'}</span>
            <div class="question-display" id="smQuestion">${currentProblem.q}</div>
          </div>

          <!-- 4 Nút Lựa Chọn Nhanh 1-Chạm (Tối Ưu Phản Xạ iPad) -->
          <div class="quick-options-label">Chạm thật nhanh đáp án đúng (hoặc gõ phím 1, 2, 3, 4):</div>
          <div class="quick-options-grid" id="smOptionsGrid">
            ${currentProblem.options.map((opt, i) => `
              <button type="button" class="btn-sm-choice" data-choice="${opt}" data-key="${i + 1}">
                <span style="font-size:12px; opacity:0.5; margin-right:6px">[${i + 1}]</span> ${opt}
              </button>
            `).join("")}
          </div>

          <!-- Hoặc Gõ Trực Tiếp Bằng Bàn Phím -->
          <div class="manual-input-divider">
            <span>Hoặc gõ đáp án vào ô:</span>
          </div>
          <div class="answer-row">
            <input type="text"
              id="smAnswerInput"
              class="math-answer-input"
              placeholder="Nhập số..."
              autocomplete="off"
              data-math-input />
            <button type="button" class="btn btn-primary" id="smSubmitBtn">Trả Lời</button>
          </div>

          <div class="feedback-msg" id="smFeedback"></div>
        </div>
      `;

      bindEvents();
    }

    function bindEvents() {
      // Chọn thời lượng đấu trường (60s, 90s, 120s)
      container.querySelectorAll(".duration-pill").forEach(pill => {
        pill.addEventListener("click", () => {
          duration = parseInt(pill.dataset.dur, 10);
          score = 0;
          streak = 0;
          maxStreak = 0;
          correctCount = 0;
          totalAnswered = 0;
          currentProblem = generateProblem(currentTier);
          renderScreen();
          startTimer();
        });
      });

      // Chọn chuyên đề
      const tierSelect = container.querySelector("#smTierSelect");
      if (tierSelect) {
        tierSelect.addEventListener("change", (e) => {
          currentTier = parseInt(e.target.value, 10);
          currentProblem = generateProblem(currentTier);
          renderScreen();
          if (!isRunning) startTimer();
        });
      }

      // 4 Lựa chọn nhanh
      container.querySelectorAll(".btn-sm-choice").forEach(btn => {
        btn.addEventListener("click", () => {
          if (!isRunning) startTimer();
          handleAnswer(btn.dataset.choice);
        });
      });

      // Nhập qua ô input
      const input = container.querySelector("#smAnswerInput");
      const submitBtn = container.querySelector("#smSubmitBtn");
      if (submitBtn && input) {
        submitBtn.addEventListener("click", () => {
          if (!isRunning) startTimer();
          handleAnswer(input.value);
        });
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            if (!isRunning) startTimer();
            handleAnswer(input.value);
          }
        });
      }

      // Phím tắt bàn phím 1, 2, 3, 4 trên iPad/PC
      const keyHandler = (e) => {
        if (["1", "2", "3", "4"].includes(e.key) && document.activeElement !== input) {
          const btn = container.querySelector(`.btn-sm-choice[data-key='${e.key}']`);
          if (btn && !btn.disabled) {
            btn.click();
          }
        }
      };
      if (typeof window !== "undefined") { window.addEventListener("keydown", keyHandler, { once: true }); }
    }

    function handleAnswer(rawVal) {
      const userVal = String(rawVal || "").trim().toLowerCase();
      if (!userVal) return;

      totalAnswered++;
      const isCorrect = userVal === String(currentProblem.a).trim().toLowerCase();
      const elapsedMs = Date.now() - questionStartTime;

      const feedback = container.querySelector("#smFeedback");
      const scoreEl = container.querySelector("#smScore");
      const streakEl = container.querySelector("#smStreak");
      const progressEl = container.querySelector("#smProgress");

      if (isCorrect) {
        correctCount++;
        streak++;
        if (streak > maxStreak) maxStreak = streak;

        // Điểm cơ bản + Thưởng streak + Thưởng phản xạ nhanh dưới 2s
        const speedBonus = elapsedMs < 2000 ? 5 : 0;
        const streakBonus = Math.min(15, streak * 2);
        const earned = 10 + streakBonus + speedBonus;
        score += earned;

        if (feedback) {
          feedback.innerHTML = `<span class="correct">✔ Đúng rồi! (+${earned}đ ${speedBonus > 0 ? '⚡ Tốc độ!' : ''})</span>`;
        }
      } else {
        streak = 0;
        if (feedback) {
          feedback.innerHTML = `<span class="incorrect">✘ Chưa đúng! Đáp án đúng là <b>${currentProblem.a}</b></span>`;
        }
      }

      if (scoreEl) scoreEl.textContent = score;
      if (streakEl) streakEl.textContent = streak > 0 ? `🔥 ${streak}` : '0';
      if (progressEl) progressEl.textContent = `${correctCount} câu`;

      // Highlight nút đúng / sai
      container.querySelectorAll(".btn-sm-choice").forEach(b => {
        b.disabled = true;
        if (b.dataset.choice === String(currentProblem.a)) {
          b.classList.add("is-correct-choice");
        } else if (b.dataset.choice === userVal && !isCorrect) {
          b.classList.add("is-wrong-choice");
        }
      });

      // Tốc độ cao: chuyển câu mới sau 240ms để không làm gián đoạn nhịp đua
      setTimeout(() => {
        if (remaining > 0) {
          currentProblem = generateProblem(currentTier);
          questionStartTime = Date.now();
          renderScreen();
        }
      }, 240);
    }

    // Khởi tạo màn hình và bật đếm ngược 90s ngay lập tức!
    renderScreen();
    startTimer();
  }
};

function generateProblem(selectedTier = 0) {
  // Nếu chọn 0 (Tổng hợp), ngẫu nhiên chọn giữa 4 tầng
  const tier = selectedTier === 0 ? Math.floor(Math.random() * 4) + 1 : selectedTier;

  let q = "";
  let a = "";
  let distractors = [];
  let tierTag = "TẦNG 1: CỬU CHƯƠNG";

  if (tier === 2) {
    // Tầng 2: Số nguyên âm Z
    tierTag = "TẦNG 2: SỐ NGUYÊN Z";
    const mode = Math.floor(Math.random() * 3);
    if (mode === 0) {
      // Cộng trừ số nguyên: (-x) + y hoặc x - (-y)
      const x = Math.floor(Math.random() * 20) - 10;
      const y = Math.floor(Math.random() * 18) - 9;
      const isAdd = Math.random() > 0.5;
      const res = isAdd ? x + y : x - y;
      q = `${x < 0 ? `(${x})` : x} ${isAdd ? '+' : '−'} ${y < 0 ? `(${y})` : y} = ?`;
      a = String(res);
      distractors = [res + 1, res - 1, -res, res + 2].map(String);
    } else if (mode === 1) {
      // Nhân số nguyên: (-m) * n
      const m = Math.floor(Math.random() * 9) + 2;
      const n = Math.floor(Math.random() * 8) - 4;
      const res = (-m) * n;
      q = `(${ -m }) × ${n < 0 ? `(${n})` : n} = ?`;
      a = String(res);
      distractors = [-res, res + m, res - m, res + 2].map(String);
    } else {
      // Chia số nguyên: m : (-n)
      const n = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const k = Math.floor(Math.random() * 8) - 4 || 3;
      const m = n * k;
      const res = m / (-n);
      q = `${m < 0 ? `(${m})` : m} : (${ -n }) = ?`;
      a = String(res);
      distractors = [-res, res + 1, res - 1, res + 2].map(String);
    }
  } else if (tier === 3) {
    // Tầng 3: Phân số nhẩm nhanh
    tierTag = "TẦNG 3: PHÂN SỐ";
    const mode = Math.random() > 0.5;
    if (mode) {
      // Rút gọn phân số
      const factor = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
      const numBase = [1, 2, 3][Math.floor(Math.random() * 3)];
      const denBase = numBase + [1, 2, 3][Math.floor(Math.random() * 3)];
      const num = numBase * factor;
      const den = denBase * factor;
      q = `Rút gọn phân số: ${num}/${den} = ?`;
      a = `${numBase}/${denBase}`;
      distractors = [
        `${numBase}/${denBase + 1}`,
        `${numBase + 1}/${denBase}`,
        `${numBase}/${factor}`,
        `${factor}/${denBase}`
      ];
    } else {
      // Cộng cùng mẫu
      const den = [5, 7, 8, 9, 10][Math.floor(Math.random() * 5)];
      const n1 = Math.floor(Math.random() * (den - 2)) + 1;
      const n2 = Math.floor(Math.random() * (den - n1)) + 1;
      const sum = n1 + n2;
      q = `${n1}/${den} + ${n2}/${den} = ?`;
      a = `${sum}/${den}`;
      distractors = [
        `${sum + 1}/${den}`,
        `${sum}/${den * 2}`,
        `${sum - 1}/${den}`,
        `${sum + 2}/${den}`
      ];
    }
  } else if (tier === 4) {
    // Tầng 4: Lũy thừa & Ngoặc
    tierTag = "TẦNG 4: LŨY THỪA & NGOẶC";
    const mode = Math.random() > 0.5;
    if (mode) {
      // Lũy thừa
      const base = [2, 3, 4, 5, 10][Math.floor(Math.random() * 5)];
      let exp = 2;
      if (base === 2) exp = [3, 4, 5][Math.floor(Math.random() * 3)];
      else if (base === 3) exp = [2, 3, 4][Math.floor(Math.random() * 3)];
      else if (base === 10) exp = [2, 3][Math.floor(Math.random() * 2)];

      const ans = Math.pow(base, exp);
      q = `${base}<sup>${exp}</sup> = ?`;
      a = String(ans);
      distractors = [ans + base, ans - base, base * exp, ans + 4].map(String);
    } else {
      // Thứ tự thực hiện phép tính có ngoặc: a * (b + c)
      const aVal = Math.floor(Math.random() * 5) + 2;
      const bVal = Math.floor(Math.random() * 6) + 2;
      const cVal = Math.floor(Math.random() * 4) + 1;
      const ans = aVal * (bVal + cVal);
      q = `${aVal} × (${bVal} + ${cVal}) = ?`;
      a = String(ans);
      distractors = [ans + aVal, aVal * bVal + cVal, ans - aVal, ans + 10].map(String);
    }
  } else {
    // Tầng 1: Cửu chương cơ bản & nhân nhẩm
    tierTag = "TẦNG 1: CỬU CHƯƠNG";
    const m = Math.floor(Math.random() * 8) + 2;
    const n = Math.floor(Math.random() * 8) + 2;
    const ans = m * n;
    q = `${m} × ${n} = ?`;
    a = String(ans);
    distractors = [ans + m, ans - n, ans + 2, ans - 2].map(String);
  }

  // Loại trừ đáp án trùng trong distractors
  const unique = new Set([a]);
  for (const d of distractors) {
    if (unique.size < 4 && d !== a && d !== undefined) {
      unique.add(d);
    }
  }
  let fallbackCount = 1;
  while (unique.size < 4) {
    unique.add(String(parseInt(a, 10) + fallbackCount));
    fallbackCount++;
  }

  const options = Array.from(unique).sort(() => Math.random() - 0.5);
  return { q, a, options, tierTag };
}
