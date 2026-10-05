// js/render-views.js - Giao diện hiển thị toàn bộ các màn hình ứng dụng (Paper UI Theme)

import { getAllWeeks, getWeek, getCurriculumMeta } from "../data/curriculum-registry.js";
import { getRegisteredGames, getGameById } from "./game-registry.js";
import { calculateMQI, renderRadarChartSvg, getTierInfo, generatePedagogicalDiagnosis } from "./competency-engine.js";
import { showReportIssueModal, generateGuidedPatchPrompt, patchCodeOnServer } from "./parent-feedback.js";
import { processAndUploadSolutionPhoto, gradePhotoSolution, renderGradingResultHtml } from "./photo-grader.js";
import { getAllFeedbacks, markFeedbackPatched, addParentFeedback } from "../data/data-core.js";
import { DIAGNOSTIC_TEST, evaluateDiagnostic } from "../data/diagnostic-assessment.js";
import { escapeHtml, updateState } from "./core.js";

function getScrollBehavior() {
  return (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) ? "auto" : "smooth";
}

export function parseMathValue(val) {
  if (val === null || val === undefined) return null;
  let s = String(val).trim().toLowerCase();
  
  // Xử lý dạng "x = ..."
  const eqMatch = s.match(/^[a-z]\s*=\s*(.+)$/);
  if (eqMatch) {
    s = eqMatch[1].trim();
  }

  // Chuẩn hoá:
  // Ký tự phép nhân '×', '·', '*' -> '*'
  // Dấu phẩy thập phân -> '.'
  // Dấu trừ '−' -> '-'
  s = s.replace(/,/g, ".")
       .replace(/[×·]/g, "*")
       .replace(/[−–—]/g, "-")
       .replace(/\s+/g, "");

  // Nếu chuỗi còn chứa biến 'x' (ẩn số x) thì không phải số học thuần túy
  if (s.includes("x")) {
    return null;
  }

  // Kiểm tra chỉ chứa ký tự toán học số học an toàn (không eval, không script)
  if (!/^[-+*/()0-9.]+$/.test(s)) {
    return null;
  }

  // Tokenize an toàn
  const tokens = [];
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    if (ch === '+' || ch === '-' || ch === '*' || ch === '/' || ch === '(' || ch === ')') {
      // Unary minus/plus: nếu '-' hoặc '+' ở đầu hoặc ngay sau '(', '+', '-', '*', '/'
      if (ch === '-' || ch === '+') {
        const prev = tokens[tokens.length - 1];
        if (!prev || prev === '(' || prev === '+' || prev === '-' || prev === '*' || prev === '/') {
          tokens.push(ch === '-' ? 'u-' : 'u+');
          i++;
          continue;
        }
      }
      tokens.push(ch);
      i++;
    } else if (/[0-9.]/.test(ch)) {
      let numStr = "";
      while (i < s.length && /[0-9.]/.test(s[i])) {
        numStr += s[i];
        i++;
      }
      const num = Number(numStr);
      if (isNaN(num)) return null;
      tokens.push(num);
    } else {
      return null;
    }
  }

  // Shunting-Yard parser
  const prec = { '+': 1, '-': 1, '*': 2, '/': 2, 'u-': 3, 'u+': 3 };
  const rpn = [];
  const ops = [];

  for (const t of tokens) {
    if (typeof t === 'number') {
      rpn.push(t);
    } else if (t === 'u-' || t === 'u+') {
      ops.push(t);
    } else if (t === '(') {
      ops.push(t);
    } else if (t === ')') {
      while (ops.length && ops[ops.length - 1] !== '(') {
        rpn.push(ops.pop());
      }
      if (!ops.length) return null;
      ops.pop();
    } else if (['+', '-', '*', '/'].includes(t)) {
      while (ops.length && ops[ops.length - 1] !== '(' && prec[ops[ops.length - 1]] >= prec[t]) {
        rpn.push(ops.pop());
      }
      ops.push(t);
    }
  }
  while (ops.length) {
    const op = ops.pop();
    if (op === '(' || op === ')') return null;
    rpn.push(op);
  }

  // Evaluate RPN an toàn
  const stack = [];
  for (const t of rpn) {
    if (typeof t === 'number') {
      stack.push(t);
    } else if (t === 'u-') {
      if (!stack.length) return null;
      const v = stack.pop();
      stack.push(-v);
    } else if (t === 'u+') {
      if (!stack.length) return null;
      const v = stack.pop();
      stack.push(+v);
    } else {
      if (stack.length < 2) return null;
      const b = stack.pop();
      const a = stack.pop();
      if (t === '+') stack.push(a + b);
      else if (t === '-') stack.push(a - b);
      else if (t === '*') stack.push(a * b);
      else if (t === '/') {
        if (Math.abs(b) < 1e-12) return null;
        stack.push(a / b);
      }
    }
  }

  if (stack.length !== 1) return null;
  const res = stack[0];
  return Number.isFinite(res) ? res : null;
}

export function normalizeMathAnswer(val) {
  if (val === null || val === undefined) return "";
  let s = String(val).trim().toLowerCase();
  // Chuẩn hoá dấu phẩy thập phân thành dấu chấm để so sánh tương đương số học
  s = s.replace(/,/g, ".").replace(/[−–—]/g, "-").replace(/\s+/g, "");
  return s;
}

export function isMathAnswerEqual(userVal, correctVal) {
  const uNorm = normalizeMathAnswer(userVal);
  const cNorm = normalizeMathAnswer(correctVal);
  if (!uNorm && !cNorm) return true;
  if (!uNorm || !cNorm) return false;
  if (uNorm === cNorm) return true;

  // So sánh tương đương số học phân số / số thập phân / biểu thức toán học
  const uNum = parseMathValue(userVal);
  const cNum = parseMathValue(correctVal);
  if (uNum !== null && cNum !== null) {
    return Math.abs(uNum - cNum) < 1e-6;
  }

  // Nếu một bên là x = ... và bên kia là số
  if (uNum !== null && (cNorm === String(uNum) || cNorm === `x=${uNum}`)) return true;
  if (cNum !== null && (uNorm === String(cNum) || uNorm === `x=${cNum}`)) return true;

  return false;
}

export function renderHome(container, state) {
  const meta = getCurriculumMeta();
  const weeks = getAllWeeks();
  const mqi = calculateMQI(state.competencyMetrics);
  const activeW = getWeek(state.activeWeek || 1) || weeks[0];

  // 5 Chuyên đề cốt lõi lớp 6 theo chuẩn GDPT 2018
  const modulesOverview = [
    { id: "mod1", title: "Chuyên Đề 1: Nền Tảng Số Học & Lũy Thừa", icon: "🌿", range: "Tuần 01 - 04", weekNumbers: [1, 2, 3, 4] },
    { id: "mod2", title: "Chuyên Đề 2: Số Nguyên Z, Ước & Bội Số", icon: "⚓", range: "Tuần 05 - 09", weekNumbers: [5, 6, 7, 8, 9] },
    { id: "mod3", title: "Chuyên Đề 3: Phân Số & Số Thập Phân Thực Tế", icon: "📊", range: "Tuần 10 - 12", weekNumbers: [10, 11, 12] },
    { id: "mod4", title: "Chuyên Đề 4: Hình Học Phẳng, Đối Xứng & 3D", icon: "📐", range: "Tuần 13 - 18", weekNumbers: [13, 14, 15, 16, 17, 18] },
    { id: "mod5", title: "Chuyên Đề 5: Thống Kê, Xác Suất & Chinh Phục Olympic", icon: "🏆", range: "Tuần 19 - 24", weekNumbers: [19, 20, 21, 22, 23, 24] }
  ];

  container.innerHTML = `
    <div class="view-home">
      <!-- Thẻ Chào Mừng & Bảng Năng Lực Nhanh -->
      <section class="hero-card">
        <div class="hero-main">
          <span class="badge-grade">TOÁN LỚP 6 NÂNG CAO · CHUẨN GDPT 2018</span>
          <h1 class="hero-title">Chào ${escapeHtml(state.learnerName || "Ngân")}! Sẵn sàng chinh phục Toán 6 hôm nay?</h1>
          <p class="hero-desc">${meta.subtitle}</p>
          <div class="hero-cta-row">
            <a href="#math?week=${activeW.id}" class="btn btn-primary btn-large">🚀 Vào Học Tuần ${activeW.number}: ${activeW.title}</a>
            <a href="#games" class="btn btn-secondary">🎮 Đấu Trường 15 Game Toán</a>
          </div>
        </div>
        <div class="hero-stats">
          <div class="stat-pill">
            <span class="stat-label">Chỉ Số Năng Lực MQI</span>
            <span class="stat-value" style="color:${mqi.tier.color}">${mqi.totalMqi} <small>/1000</small></span>
            <span class="stat-badge">${mqi.tier.badge} ${mqi.tier.title}</span>
          </div>
          <div class="stat-pill">
            <span class="stat-label">Chuỗi Ngày Học (Streak)</span>
            <span class="stat-value">🔥 ${state.streak?.count || 1} <small>ngày liên tục</small></span>
          </div>
        </div>
      </section>

      <!-- Thẻ Khảo Sát Năng Lực Đầu Vào & Tự Động Điều Chỉnh Độ Khó -->
      ${state.diagnosticResult ? `
        <section class="diagnostic-banner-card completed">
          <div class="diag-banner-icon">🏆</div>
          <div class="diag-banner-content">
            <div class="diag-tag-row">
              <span class="badge-grade">ĐÃ XÁC LẬP TRÌNH ĐỘ HỌC SINH</span>
              <span class="diag-level-badge">${state.diagnosticResult.badge}</span>
            </div>
            <h3>${escapeHtml(state.diagnosticResult.title)}</h3>
            <p>${escapeHtml(state.diagnosticResult.description)}</p>
            <div class="diag-metrics-mini">
              <span>🎯 Lộ trình: <b>${escapeHtml(state.diagnosticResult.recommendedTrack)}</b></span>
              <span>💡 Gợi ý: <b>${escapeHtml(state.diagnosticResult.hintPolicy)}</b></span>
              <span>📈 Điểm khảo sát: <b>${state.diagnosticResult.totalScore}/10 (${state.diagnosticResult.percentage}%)</b></span>
            </div>
          </div>
          <div class="diag-banner-actions">
            <a href="#diagnostic" class="btn btn-secondary btn-sm">Xem Chi Tiết / Làm Lại</a>
          </div>
        </section>
      ` : `
        <section class="diagnostic-banner-card uncompleted">
          <div class="diag-banner-icon">🎯</div>
          <div class="diag-banner-content">
            <div class="badge-grade">KHẢO SÁT ĐẦU VÀO DÀNH CHO ${escapeHtml(state.learnerName || "NGÂN").toUpperCase()}</div>
            <h3>Khảo Sát Năng Lực Để Tự Động Điều Chỉnh Độ Khó (10 câu không tính giờ)</h3>
            <p>Ngân hãy làm bài khảo sát ngắn này để hệ thống tự động nhận diện điểm mạnh và thiết lập độ khó các bài tập Toán 6 phù hợp nhất với năng lực của con nhé!</p>
          </div>
          <div class="diag-banner-actions">
            <a href="#diagnostic" class="btn btn-primary btn-start-diag">Bắt Đầu Khảo Sát Ngay ▶</a>
          </div>
        </section>
      `}

      <!-- Danh Sách 24 Tuần Học Phân Theo 5 Chuyên Đề Cốt Lõi -->
      <section class="section-weeks-overview">
        <div class="section-head">
          <div>
            <h2>📚 Lộ Trình 24 Tuần Học Trọng Tâm</h2>
            <p class="text-muted">Bám sát 100% chương trình GDPT 2018 (SGK Kết nối tri thức & Cánh diều) kèm chuyên đề Olympic</p>
          </div>
          <div class="curriculum-summary-pill">
            <span>24 Tuần</span> · <span>144 Buổi Học</span> · <span>5 Chuyên Đề</span>
          </div>
        </div>

        <div class="curriculum-modules-stack">
          ${modulesOverview.map(mod => {
            const modWeeks = weeks.filter(w => mod.weekNumbers.includes(w.number));
            return `
              <div class="curriculum-module-block">
                <div class="module-block-header">
                  <div class="mod-title-wrap">
                    <span class="mod-icon">${mod.icon}</span>
                    <h3 class="mod-title">${mod.title}</h3>
                  </div>
                  <span class="mod-range-badge">${mod.range}</span>
                </div>
                <div class="weeks-grid-home">
                  ${modWeeks.map(w => {
                    const wProgress = state.progress?.[w.id] || {};
                    const isDone = wProgress.completed;
                    const isCurrent = w.number === (state.activeWeek || 1);
                    const totalDays = (w.days || []).length || 6;
                    const doneDaysCount = Object.keys(wProgress.days || {}).filter(k => wProgress.days[k]).length;
                    const progressPercent = isDone ? 100 : Math.round((doneDaysCount / totalDays) * 100);

                    return `
                      <a href="#math?week=${w.id}" class="week-card-home ${isCurrent ? 'current' : ''} ${isDone ? 'done' : ''}" data-week-id="${w.id}">
                        <div class="card-top">
                          <span class="week-badge">TUẦN ${String(w.number).padStart(2, '0')}</span>
                          <span class="week-status-pill ${isDone ? 'status-done' : (isCurrent ? 'status-active' : 'status-upcoming')}">
                            ${isDone ? '✔ Đã Xong' : (isCurrent ? '⚡ Đang Học' : 'Chưa Học')}
                          </span>
                        </div>
                        <h4 class="card-title">${escapeHtml(w.title)}</h4>
                        <p class="card-goal">${escapeHtml(w.goal || '')}</p>
                        <div class="week-progress-wrap">
                          <div class="week-progress-bar">
                            <div class="week-progress-fill ${isDone ? 'fill-done' : ''}" style="width: ${progressPercent}%;"></div>
                          </div>
                          <span class="week-progress-label">${isDone ? 'Hoàn thành 100%' : `${doneDaysCount}/${totalDays} ngày (${progressPercent}%)`}</span>
                        </div>
                        <div class="card-footer-action">
                          <span class="action-text">Vào Học Bài</span>
                          <span class="action-arrow">→</span>
                        </div>
                      </a>
                    `;
                  }).join("")}
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </section>
    </div>
  `;
}

export function renderMath(container, state, params = {}) {
  const allWeeks = getAllWeeks();
  const weekId = params.week || `w${String(state.activeWeek || 1).padStart(2, '0')}`;
  const week = getWeek(weekId) || allWeeks[0];
  const days = week.days || [];
  const selectedDayIdx = parseInt(params.day, 10) || 1;
  const currentDay = days.find(d => d.dayIndex === selectedDayIdx) || days[0] || { exercises: [] };

  container.innerHTML = `
    <div class="view-math">
      <div class="math-top-nav">
        <div class="week-selector-stepper-wrap">
          <button type="button" class="btn-step-week" id="btnPrevWeek" ${week.number <= 1 ? 'disabled' : ''} title="Tuần trước">◀</button>
          <div class="week-dropdown-styled-wrap">
            <span class="dropdown-styled-icon">📅</span>
            <select id="mathWeekSelect" class="dropdown-week-stylish">
              ${allWeeks.map(w => `<option value="${w.id}" ${w.id === week.id ? 'selected' : ''}>Tuần ${w.number}: ${w.title}</option>`).join("")}
            </select>
          </div>
          <button type="button" class="btn-step-week" id="btnNextWeek" ${week.number >= allWeeks.length ? 'disabled' : ''} title="Tuần tiếp theo">▶</button>
        </div>
        <div class="days-pills">
          ${days.map(d => {
            const exCount = (d.exercises || []).length;
            const doneCount = (d.exercises || []).filter(e => state.lessonResponses?.[e.id]?.correct).length;
            const isDone = exCount > 0 && doneCount === exCount;
            return `
              <a href="#math?week=${week.id}&day=${d.dayIndex}" class="day-chip ${d.dayIndex === currentDay.dayIndex ? 'active' : ''}">
                <div class="day-chip-head">
                  <span class="day-chip-name">${d.name}</span>
                  ${isDone ? '<span class="day-chip-check">✔</span>' : ''}
                </div>
                <span class="day-chip-sub">${escapeHtml(d.title)}</span>
              </a>
            `;
          }).join("")}
        </div>
      </div>

      <!-- Thanh Trình Độ Cá Nhân Hóa Theo Khảo Sát Đầu Vào -->
      <div class="math-difficulty-bar">
        <div class="diff-bar-left">
          <span class="diff-icon">🎯</span>
          <span>Độ khó bài tập: <b>${state.diagnosticResult ? state.diagnosticResult.badge : 'Chuẩn Khá Giỏi Lớp 6 (Mặc định)'}</b></span>
          ${state.diagnosticResult ? `
            <span class="diff-track">· Lộ trình: <b>${escapeHtml(state.diagnosticResult.recommendedTrack)}</b></span>
          ` : ''}
        </div>
        <div class="diff-bar-right">
          ${state.diagnosticResult ? `
            <a href="#diagnostic" class="diff-link">Xem lại kết quả khảo sát đầu vào →</a>
          ` : `
            <a href="#diagnostic" class="diff-link highlight">⚡ Làm bài khảo sát đầu vào để tự động điều chỉnh độ khó →</a>
          `}
        </div>
      </div>

      <!-- Bố Cục Split-View iPad: Cột Trái là Lý Thuyết Cốt Lõi, Cột Phải là Bài Tập & Nộp Bài -->
      <div class="math-split-layout">
        <aside class="lesson-theory-pane">
          <div class="theory-card-sticky">
            <div class="theory-badge-row">
              <span class="badge-phase">TUẦN ${week.number} · ${currentDay.name}</span>
              <h3 class="theory-badge-title">${escapeHtml(currentDay.title)}</h3>
            </div>
            ${currentDay.theory ? `
              <div class="theory-box">
                <h4>💡 Tóm Tắt Lý Thuyết Cốt Lõi:</h4>
                <div class="theory-text">${escapeHtml(currentDay.theory)}</div>
              </div>
            ` : `
              <div class="theory-box-placeholder">
                <p>💡 Buổi học hôm nay rèn luyện kỹ năng thực hành, phản xạ toán học và tư duy giải toán chuyên sâu.</p>
              </div>
            `}
            <div class="theory-meta-stats">
              <div class="t-stat"><span>🎯 Mục tiêu:</span> <b>${(currentDay.exercises || []).length} bài tập</b></div>
              <div class="t-stat"><span>✨ Yêu cầu:</span> <b>Trình bày chuẩn, tính toán chính xác</b></div>
            </div>
          </div>
        </aside>

        <section class="lesson-exercises-pane" aria-label="Danh sách bài tập và lời giải">

        <!-- Danh sách bài tập -->
        <div class="exercises-container">
          ${(currentDay.exercises || []).map((ex, idx) => {
            const saved = state.lessonResponses?.[ex.id] || {};
            return `
              <div class="exercise-item-card ${saved.correct ? 'is-answered-correct' : ''}" id="card_${ex.id}" data-qid="${ex.id}">
                <div class="ex-head">
                  <span class="ex-index">Bài ${idx + 1}</span>
                  <span class="ex-id-tag">Mã: ${ex.id}</span>
                  <button type="button" class="btn-report-issue" data-report-qid="${ex.id}" title="Phụ huynh báo lỗi câu này">⚠️ Báo lỗi</button>
                </div>
                <div class="ex-question">${escapeHtml(ex.question)}</div>

                <div class="ex-interactive-row">
                  <div class="input-wrap">
                    <input type="text"
                      id="input_${ex.id}"
                      class="math-answer-input"
                      placeholder="Nhập đáp số..."
                      value="${escapeHtml(saved.userAnswer || '')}"
                      aria-label="Nhập đáp số cho Bài ${idx + 1}"
                      aria-describedby="fb_${ex.id}"
                      data-math-input
                      data-math-input-qid="${ex.id}" />
                    <button type="button" class="btn btn-primary btn-check-answer" data-check-qid="${ex.id}">Kiểm Tra</button>
                  </div>
                  <div class="feedback-badge" id="fb_${ex.id}" role="status" aria-live="polite">
                    ${saved.correct ? '<span class="correct">✔ Đã giải đúng!</span>' : ''}
                  </div>
                </div>

                <!-- Chỉ hiển thị Chụp Ảnh Vở khi câu hỏi là TỰ LUẬN VIẾT TAY NHIỀU BƯỚC -->
                ${(ex.requiresWrittenWork || ex.type === "essay" || ex.isEssay) ? `
                  <div class="photo-solution-zone photo-submission-zone essay-only">
                    <div class="photo-actions">
                      <span class="essay-badge">📝 Bài tự luận nhiều bước</span>
                      <button type="button" class="btn-upload-photo" id="btn_upload_${ex.id}" data-trigger-file="photo_input_${ex.id}" aria-label="Chụp ảnh bài giải trong vở cho bài tập ${ex.id}">
                        📸 Chụp ảnh bài giải trong vở (Tùy chọn)
                      </button>
                      <input type="file" id="photo_input_${ex.id}" class="sr-only" accept="image/*" capture="environment" data-photo-qid="${ex.id}" aria-label="Tệp ảnh bài giải câu ${ex.id}" tabindex="-1" />
                      <span class="photo-status" id="photo_status_${ex.id}"></span>
                    </div>
                    <div class="photo-privacy-notice" role="note" aria-label="Cam kết bảo mật dữ liệu học sinh">
                      <span class="privacy-icon">🔒</span>
                      <span>Ảnh vở bài tập của bé được xử lý bảo mật qua AI Vision, không lưu trữ công khai và <strong>tuyệt đối không sử dụng để huấn luyện AI model</strong>.</span>
                    </div>
                    <div class="photo-preview-wrap" id="preview_wrap_${ex.id}"></div>
                    <div class="photo-analysis-wrap" id="analysis_wrap_${ex.id}"></div>
                  </div>
                ` : ''}

                <!-- Gợi ý bước giải -->
                ${Array.isArray(ex.hints) && ex.hints.length ? `
                  <details class="hints-accordion">
                    <summary>💡 Gợi ý từng bước (Bấm để mở khi gặp khó khăn)</summary>
                    <ol>
                      ${ex.hints.map(h => `<li>${escapeHtml(h)}</li>`).join("")}
                    </ol>
                  </details>
                ` : ''}
              </div>
            `;
          }).join("")}
        </div>

        <!-- Phần Báo Lỗi & Góp Ý Trực Tiếp Dưới Cùng Bài Học (Thu gọn mặc định) -->
        <details class="lesson-feedback-accordion" id="lessonFeedbackAccordion">
          <summary class="feedback-accordion-summary">
            <span class="fb-summary-icon">💬</span>
            <div class="fb-summary-text-wrap">
              <span class="fb-summary-title">Báo lỗi hoặc Góp ý bài học này (Dành cho Phụ huynh)</span>
              <span class="fb-summary-sub">Phát hiện sai sót về đề bài hoặc đáp án? Bấm để gửi đề xuất</span>
            </div>
            <span class="fb-summary-toggle">Mở biểu mẫu ▾</span>
          </summary>
          <section class="lesson-feedback-card" id="lessonFeedbackCard">
            <div class="feedback-card-header">
              <span class="fb-icon">📝</span>
              <div class="fb-header-text">
                <h4>Đề Xuất Chỉnh Sửa Nội Dung Bài Học</h4>
                <p class="fb-sub">Phát hiện sai sót về đề bài, đáp án hoặc lời giải? Đề xuất sẽ được lưu vào hàng đợi duyệt nội dung.</p>
              </div>
            </div>
            <form id="inlineLessonFeedbackForm" class="feedback-inline-form">
              <div class="form-row-grid">
                <div class="form-row">
                  <label for="inlineFbQuestionSelect">Chọn câu hỏi cần góp ý:</label>
                  <select id="inlineFbQuestionSelect">
                    ${(currentDay.exercises || []).map((ex, idx) => `
                      <option value="${ex.id}">Bài ${idx + 1}: ${escapeHtml(ex.question.substring(0, 48))}... (${ex.id})</option>
                    `).join("")}
                  </select>
                </div>
                <div class="form-row">
                  <label for="inlineFbIssueType">Vấn đề phát hiện:</label>
                  <select id="inlineFbIssueType">
                    <option value="SAI_DAP_AN">Sai đáp án hoặc phép tính</option>
                    <option value="SAI_DE_BAI">Đề bài bị nhầm dấu / số liệu</option>
                    <option value="GIAI_THICH_CHUA_RO">Lời giải chưa rõ ràng</option>
                    <option value="KHAC">Góp ý khác</option>
                  </select>
                </div>
              </div>

              <div class="form-row">
                <label for="inlineFbContent">Mô tả chi tiết sai sót hoặc đáp án đúng:</label>
                <textarea id="inlineFbContent" rows="2" placeholder="Ví dụ: Câu này đáp án đúng phải là 56..."></textarea>
              </div>

              <div class="form-row">
                <label for="inlineFbDirectAnswer">Đề xuất đáp án đúng mới (Để duyệt cập nhật):</label>
                <input type="text" id="inlineFbDirectAnswer" placeholder="Ví dụ: 56 hoặc -13 hoặc 3/4" />
              </div>

              <div class="fb-form-actions">
                <button type="submit" class="btn btn-primary" id="btnSubmitInlineFeedback">
                  ✉ Gửi Báo Lỗi
                </button>
              </div>

              <div id="inlineFbNotice" class="inline-fb-notice" style="display:none;" role="status" aria-live="polite"></div>
            </form>
          </section>
        </details>
        </section>
      </div>
    </div>
  `;

  // Gắn sự kiện chuyển tuần
  const weekSelect = container.querySelector("#mathWeekSelect");
  if (weekSelect) {
    weekSelect.addEventListener("change", (e) => {
      window.location.hash = `#math?week=${e.target.value}`;
    });
  }

  const prevWeekBtn = container.querySelector("#btnPrevWeek");
  if (prevWeekBtn) {
    prevWeekBtn.addEventListener("click", () => {
      if (week.number > 1) {
        window.location.hash = `#math?week=w${String(week.number - 1).padStart(2, '0')}`;
      }
    });
  }

  const nextWeekBtn = container.querySelector("#btnNextWeek");
  if (nextWeekBtn) {
    nextWeekBtn.addEventListener("click", () => {
      if (week.number < allWeeks.length) {
        window.location.hash = `#math?week=w${String(week.number + 1).padStart(2, '0')}`;
      }
    });
  }

  // Gắn sự kiện click mở file selector cho nút chụp ảnh accessible
  container.querySelectorAll(".btn-upload-photo").forEach(btn => {
    btn.addEventListener("click", () => {
      const fileInputId = btn.dataset.triggerFile;
      const fileInput = fileInputId ? container.querySelector(`#${fileInputId}`) : null;
      if (fileInput) fileInput.click();
    });
  });

  // Gắn sự kiện kiểm tra đáp án
  container.querySelectorAll(".btn-check-answer").forEach(btn => {
    btn.addEventListener("click", () => {
      const qid = btn.dataset.checkQid;
      const input = container.querySelector(`#input_${qid}`);
      const fb = container.querySelector(`#fb_${qid}`);
      if (!input || !fb) return;

      const userVal = String(input.value || "").trim();
      const ex = currentDay.exercises.find(e => e.id === qid);
      if (!ex) return;

      const isCorrect = isMathAnswerEqual(userVal, ex.answer);
      fb.innerHTML = isCorrect
        ? `<span class="correct">✔ Hoàn toàn chính xác! (+10đ)</span>`
        : `<span class="incorrect">✘ Chưa đúng! Xem gợi ý bên dưới hoặc thử lại nhé.</span>`;

      // Cập nhật trạng thái và lưu bất biến qua updateState
      const updatedResponses = Object.assign({}, state.lessonResponses || {}, {
        [qid]: {
          userAnswer: userVal,
          correct: isCorrect,
          answeredAt: new Date().toISOString()
        }
      });
      const updatedMetrics = Object.assign({}, state.competencyMetrics || {});
      if (isCorrect) {
        updatedMetrics.academicMasteryScore = Math.min(100, (updatedMetrics.academicMasteryScore || 70) + 1);
      }
      updateState({
        lessonResponses: updatedResponses,
        competencyMetrics: updatedMetrics
      });
    });
  });

  // Khi ấn nút "⚠️ Báo lỗi" trên từng câu: mở accordion, cuộn xuống form dưới cùng và chọn câu đó
  container.querySelectorAll(".btn-report-issue").forEach(btn => {
    btn.addEventListener("click", () => {
      const qid = btn.dataset.reportQid;
      const accordion = container.querySelector("#lessonFeedbackAccordion");
      const select = container.querySelector("#inlineFbQuestionSelect");
      const card = container.querySelector("#lessonFeedbackCard");
      const textarea = container.querySelector("#inlineFbContent");
      if (accordion) accordion.open = true;
      if (select) select.value = qid;
      if (card) {
        card.scrollIntoView({ behavior: getScrollBehavior(), block: "center" });
        card.classList.add("highlight-pulse");
        const heading = card.querySelector("h4");
        if (heading) {
          heading.setAttribute("tabindex", "-1");
          heading.focus();
        }
        setTimeout(() => card.classList.remove("highlight-pulse"), 1800);
      }
      if (textarea) {
        setTimeout(() => textarea.focus(), 250);
      }
    });
  });

  // Xử lý nộp form báo lỗi ngay dưới bài học
  const inlineForm = container.querySelector("#inlineLessonFeedbackForm");
  if (inlineForm) {
    inlineForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = inlineForm.querySelector("#btnSubmitInlineFeedback");
      const notice = inlineForm.querySelector("#inlineFbNotice");
      const qid = inlineForm.querySelector("#inlineFbQuestionSelect").value;
      const issueType = inlineForm.querySelector("#inlineFbIssueType").value;
      const content = inlineForm.querySelector("#inlineFbContent").value.trim();
      const directAns = inlineForm.querySelector("#inlineFbDirectAnswer").value.trim();

      if (!content && !directAns) {
        if (notice) {
          notice.style.display = "block";
          notice.className = "inline-fb-notice error";
          notice.setAttribute("role", "alert");
          notice.setAttribute("aria-live", "assertive");
          notice.innerHTML = "<span>⚠️ Vui lòng nhập nội dung góp ý hoặc đề xuất sửa đáp án.</span>";
        }
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "⏳ Đang gửi phản hồi...";

      try {
        const payload = {
          questionId: qid,
          weekNumber: week.number,
          dayNumber: currentDay.dayIndex,
          lessonTitle: `${week.title} - ${currentDay.name}`,
          moduleFile: week.moduleId ? `data/modules/${week.moduleId}.js` : "data/modules/mod-01-foundation.js",
          errorType: issueType,
          description: content || directAns,
          parentProposedFix: directAns ? `Sửa đáp án thành: ${directAns}` : content,
          patchData: directAns ? { answer: directAns } : undefined
        };

        payload.status = "PENDING_REVIEW";
        const record = await addParentFeedback(payload);
        if (!record) {
          throw new Error("Không thể ghi nhận phiếu đóng góp vào bộ nhớ. Vui lòng thử lại.");
        }

        if (notice) {
          notice.style.display = "block";
          notice.className = "inline-fb-notice success";
          notice.setAttribute("role", "status");
          notice.setAttribute("aria-live", "polite");
          notice.innerHTML = `
            <div class="fb-submitted-compact-card">
              <div class="fb-submitted-badge-row">
                <span class="fb-badge-success">✔ Đã tiếp nhận góp ý</span>
                <span class="fb-ticket-id">Câu: ${escapeHtml(qid)}</span>
              </div>
              <p class="fb-submitted-msg">Phiếu đóng góp đã được lưu vào hàng đợi duyệt nội dung. Thầy cô và ban biên tập sẽ rà soát và cập nhật trong các bản phát hành tiếp theo.</p>
              <div class="fb-submitted-actions">
                <button type="button" class="btn btn-secondary btn-sm" id="btnCloseInlineNotice">Đóng thông báo</button>
              </div>
            </div>
          `;
          notice.scrollIntoView({ behavior: getScrollBehavior(), block: "nearest" });

          const closeBtn = notice.querySelector("#btnCloseInlineNotice");
          if (closeBtn) {
            closeBtn.addEventListener("click", () => {
              notice.style.display = "none";
              const accordion = container.querySelector("#lessonFeedbackAccordion");
              if (accordion) accordion.open = false;
            });
          }
        }

        inlineForm.querySelector("#inlineFbContent").value = "";
        inlineForm.querySelector("#inlineFbDirectAnswer").value = "";
      } catch (err) {
        if (notice) {
          notice.style.display = "block";
          notice.className = "inline-fb-notice error";
          notice.setAttribute("role", "alert");
          notice.setAttribute("aria-live", "assertive");
          notice.innerHTML = `<span>⚠️ Gửi phản hồi thất bại: ${escapeHtml(err.message || "Lỗi kết nối mạng")}. Vui lòng thử lại.</span>`;
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "✉ Gửi Báo Lỗi";
      }
    });
  }

  // Gắn sự kiện chụp ảnh bài giải
  container.querySelectorAll("input[type='file'][data-photo-qid]").forEach(fileInput => {
    fileInput.addEventListener("change", async (e) => {
      const qid = fileInput.dataset.photoQid;
      const file = e.target.files?.[0];
      if (!file) return;

      const statusEl = container.querySelector(`#photo_status_${qid}`);
      const previewWrap = container.querySelector(`#preview_wrap_${qid}`);
      const analysisWrap = container.querySelector(`#analysis_wrap_${qid}`);

      statusEl.textContent = "Đang nén ảnh phần cứng...";

      try {
        const ex = currentDay.exercises.find(item => item.id === qid);
        const payload = await processAndUploadSolutionPhoto(file, ex);

        statusEl.textContent = "Đã nén xong! Đang phân tích bài giải...";
        previewWrap.innerHTML = `
          <img src="${payload.previewUrl}" alt="Ảnh bài làm" class="photo-preview-thumbnail" />
        `;

        const result = await gradePhotoSolution(payload);
        if (result && result.ok) {
          statusEl.textContent = "Phân tích AI hoàn tất!";
        } else {
          statusEl.textContent = "Ngoại tuyến: Chưa thể phân tích ảnh";
        }
        analysisWrap.innerHTML = renderGradingResultHtml(result);
      } catch (err) {
        statusEl.textContent = "Lỗi xử lý ảnh: " + err.message;
      }
    });
  });
}

function getCompetencyLabel(comp) {
  switch (comp) {
    case "fluency": return "⚡ Tính Nhẩm";
    case "geometry": return "📐 Hình Học 3D";
    case "logic": return "🧠 Logic & Mensa";
    case "algebra": return "🔢 Số Học & Z";
    case "resilience": return "🛡️ Săn Lỗi Sai";
    default: return "Toán Học";
  }
}

function getGameIconStyle(gid) {
  switch (gid) {
    case "speed-math": return "background: #fffbeb; border: 1.5px solid #fde68a; color: #b45309;";
    case "rush-hour": return "background: #fef2f2; border: 1.5px solid #fecaca; color: #b91c1c;";
    case "spatial-3d": return "background: #f0f9ff; border: 1.5px solid #bae6fd; color: #0369a1;";
    case "tangram": return "background: #ecfdf5; border: 1.5px solid #a7f3d0; color: #047857;";
    case "chimp-memory": return "background: #f5f3ff; border: 1.5px solid #ddd6fe; color: #6d28d9;";
    case "logic-grid": return "background: #eef2ff; border: 1.5px solid #c7d2fe; color: #4338ca;";
    case "bar-model": return "background: #eff6ff; border: 1.5px solid #bfdbfe; color: #1d4ed8;";
    case "balance-detective": return "background: #f0fdfa; border: 1.5px solid #99f6e4; color: #0f766e;";
    case "integer-submarine": return "background: #f0f9ff; border: 1.5px solid #bae6fd; color: #1e40af;";
    case "prime-buster": return "background: #fff7ed; border: 1.5px solid #fed7aa; color: #c2410c;";
    case "fraction-forge": return "background: #f7fee7; border: 1.5px solid #d9f99d; color: #4d7c0f;";
    case "algebra-scale": return "background: #eef2ff; border: 1.5px solid #c7d2fe; color: #4f46e5;";
    case "spot-the-bug": return "background: #fdf2f8; border: 1.5px solid #fbcfe8; color: #be185d;";
    case "symmetry-lab": return "background: #faf5ff; border: 1.5px solid #e9d5ff; color: #7e22ce;";
    case "make-target": return "background: #fefce8; border: 1.5px solid #fef08a; color: #a16207;";
    default: return "background: var(--surface-subtle); border: 1.5px solid var(--border-light); color: var(--text-main);";
  }
}

function getDifficultyStars(gid) {
  if (["speed-math", "tangram", "symmetry-lab", "integer-submarine"].includes(gid)) {
    return "⭐ Cơ Bản";
  }
  if (["rush-hour", "spatial-3d", "balance-detective", "logic-grid", "make-target"].includes(gid)) {
    return "⭐⭐⭐ Olympic";
  }
  return "⭐⭐ Nâng Cao";
}

export function renderGames(container, state, params = {}) {
  const games = getRegisteredGames();

  container.innerHTML = `
    <div class="view-games">
      <div class="games-header">
        <div class="games-header-badge">ĐẤU TRƯỜNG TƯ DUY TOÁN HỌC LỚP 6</div>
        <h2>🎮 Hệ Sinh Thái 15 Trò Chơi Toán Học Đỉnh Cao</h2>
        <p>Rèn luyện phản xạ tính nhẩm siêu tốc, tư duy giải thuật Kẹt xe Mensa, hình học không gian 3D, Tangram, thám tử logic và sơ đồ Singapore.</p>
      </div>

      <!-- Thanh Lọc Chuyên Đề Game -->
      <div class="game-category-bar" id="gameCategoryBar">
        <button type="button" class="cat-pill-btn active" data-cat="all">🎯 Tất Cả (15)</button>
        <button type="button" class="cat-pill-btn" data-cat="fluency">⚡ Tính Nhẩm & Tốc Độ</button>
        <button type="button" class="cat-pill-btn" data-cat="geometry">📐 Không Gian & 3D</button>
        <button type="button" class="cat-pill-btn" data-cat="logic">🧠 Logic & Chiến Thuật</button>
        <button type="button" class="cat-pill-btn" data-cat="algebra">🔢 Số Học & Đại Số</button>
      </div>

      <div class="games-hub-grid" id="gamesHubGrid">
        ${games.map(g => `
          <div class="game-hub-card" data-game-id="${g.id}" data-category="${g.targetCompetency}">
            <div class="g-card-top">
              <div class="g-icon-avatar" style="${getGameIconStyle(g.id)}">${g.icon}</div>
              <div class="g-badges-stack">
                <span class="g-competency-pill comp-${g.targetCompetency}">${getCompetencyLabel(g.targetCompetency)}</span>
                <span class="g-diff-badge">${getDifficultyStars(g.id)}</span>
              </div>
            </div>
            <div class="g-info">
              <h3 class="g-title">${escapeHtml(g.title)}</h3>
              <p class="g-desc">${escapeHtml(g.subtitle || '')}</p>
            </div>
            <div class="g-card-footer">
              <button type="button" class="btn btn-primary btn-play-game" data-launch="${g.id}" aria-label="Chơi trò ${escapeHtml(g.title)} - ${escapeHtml(g.subtitle || '')}">Chơi Ngay ▶</button>
            </div>
          </div>
        `).join("")}
      </div>

      <div class="active-game-container" id="activeGameContainer" hidden></div>
    </div>
  `;

  // Gắn sự kiện lọc danh mục game
  const catButtons = container.querySelectorAll(".cat-pill-btn");
  const gameCards = container.querySelectorAll(".game-hub-card");

  catButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      catButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const targetCat = btn.getAttribute("data-cat");

      gameCards.forEach(card => {
        const cardCat = card.getAttribute("data-category");
        if (targetCat === "all" || cardCat === targetCat) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  const hub = container.querySelector("#gamesHubGrid");
  const arena = container.querySelector("#activeGameContainer");

  function launchGame(gid) {
    const game = getGameById(gid);
    if (!game) return;

    hub.style.display = "none";
    hub.hidden = true;
    arena.style.display = "block";
    arena.hidden = false;
    window.scrollTo({ top: 0, behavior: getScrollBehavior() });

    arena.innerHTML = `
      <div class="arena-top-toolbar">
        <button type="button" class="btn btn-sm btn-secondary" id="btnExitActiveGame">← Trở Về Danh Sách Game</button>
        <div class="arena-title-tag">
          <span class="arena-icon">${game.icon}</span>
          <span class="arena-name">${escapeHtml(game.title)}</span>
        </div>
      </div>
      <div class="game-stage-mount" id="gameStageMount"></div>
    `;

    const exitBtn = arena.querySelector("#btnExitActiveGame");
    if (exitBtn) {
      exitBtn.addEventListener("click", () => {
        arena.style.display = "none";
        arena.hidden = true;
        hub.style.display = "grid";
        hub.hidden = false;
        window.scrollTo({ top: 0, behavior: getScrollBehavior() });
      });
    }

    const stage = arena.querySelector("#gameStageMount");
    game.render(stage, (pointsScored) => {
      if (pointsScored > 0) {
        const comp = game.targetCompetency || "fluency";
        state.competencyMetrics[comp] = Math.min(1000, (state.competencyMetrics[comp] || 400) + Math.min(pointsScored, 30));
      }
      arena.style.display = "none";
      arena.hidden = true;
      hub.style.display = "grid";
      hub.hidden = false;
      window.scrollTo({ top: 0, behavior: getScrollBehavior() });
    });
  }

  // Gắn sự kiện click duy nhất vào nút "Chơi Ngay ▶"
  container.querySelectorAll(".btn-play-game").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const gid = btn.dataset.launch;
      if (gid) launchGame(gid);
    });
  });

  // Nếu có param play thì mở luôn
  if (params && params.play) {
    launchGame(params.play);
  }
}

export function renderCompetency(container, state) {
  const learnerName = state.learnerName || "Ngân";
  const mqi = calculateMQI(state.competencyMetrics);
  const radarSvg = renderRadarChartSvg(state.competencyMetrics, 280);
  const diagnosis = generatePedagogicalDiagnosis(state.competencyMetrics, learnerName);

  container.innerHTML = `
    <div class="view-competency">
      <!-- Thanh Chuyển Đổi Hồ Sơ Bé (Ngân, Bách, Khoa, Tên Khác) -->
      <div class="competency-top-toolbar">
        <div class="competency-profile-bar">
          <span class="profile-label">👤 Học Sinh:</span>
          <button class="profile-pill-btn ${learnerName === 'Ngân' ? 'active' : ''}" data-learner="Ngân">👧 Bé Ngân</button>
          <button class="profile-pill-btn ${learnerName === 'Bách' ? 'active' : ''}" data-learner="Bách">👦 Bé Bách</button>
          <button class="profile-pill-btn ${learnerName === 'Khoa' ? 'active' : ''}" data-learner="Khoa">👦 Bé Khoa</button>
          <button class="profile-pill-btn btn-custom-learner" id="btn-custom-learner" title="Tùy chỉnh tên bé">✏️ Đổi Tên</button>
        </div>
        <div class="competency-actions-bar">
          <button class="btn-print-report" id="btn-print-competency" title="In hoặc lưu file PDF bản đánh giá năng lực">
            🖨️ In Báo Cáo Năng Lực
          </button>
        </div>
      </div>

      <div class="competency-header">
        <div class="header-badge-row">
          <span class="badge-grade">TOÁN LỚP 6 · ĐỊNH LƯỢNG NĂNG LỰC TOÀN DIỆN</span>
          <span class="badge-date">Cập nhật: ${new Date().toLocaleDateString('vi-VN')}</span>
        </div>
        <h2>📊 Thang Đo Năng Lực Toán Học Của ${escapeHtml(learnerName)} (MQI)</h2>
        <p>Hệ thống đánh giá 5 trục năng lực cốt lõi theo chuẩn Cambridge & GDPT 2018, nhận diện chính xác điểm sáng, điểm nghẽn và đưa ra giải pháp bứt phá.</p>
      </div>

      <!-- Khối Biểu Đồ Radar & Tổng Điểm MQI -->
      <div class="competency-summary-grid">
        <div class="card-radar-chart">
          <h3>Biểu Đồ Radar 5 Trục Năng Lực</h3>
          <div class="radar-center">${radarSvg}</div>
          <div class="radar-legend">
            <span>⚡ Tính Nhẩm</span>
            <span>🔢 Đại Số</span>
            <span>📐 Hình Học</span>
            <span>🧠 Logic</span>
            <span>🛡️ Bền Bỉ</span>
          </div>
        </div>

        <div class="card-overall-score">
          <div class="overall-badge" style="border-color:${mqi.tier.color}">
            <span class="mqi-number" style="color:${mqi.tier.color}">${mqi.totalMqi}</span>
            <span class="mqi-max">/ 1000 điểm MQI</span>
            <div class="tier-pill" style="background:${mqi.tier.color}20; color:${mqi.tier.color}">
              ${mqi.tier.badge} ${mqi.tier.title}
            </div>
          </div>
          <div class="two-pillar-split">
            <div class="pillar-box">
              <span class="p-val">${state.competencyMetrics.academicMasteryScore || 78}%</span>
              <span class="p-label">Thành Thạo Học Thuật</span>
            </div>
            <div class="pillar-box">
              <span class="p-val">${state.competencyMetrics.resilienceIndex || 85}%</span>
              <span class="p-label">Chỉ Số Bền Bỉ / Rèn Luyện</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Chi tiết 5 trục -->
      <div class="axes-breakdown-card">
        <h3>Chi Tiết Điểm Số 5 Trục Năng Lực</h3>
        <div class="axis-bars-list">
          <div class="axis-row">
            <span>⚡ Tính Nhẩm & Phản Xạ Cửu Chương:</span>
            <div class="bar-bg"><div class="bar-fill" style="width:${(mqi.fluency / 10).toFixed(0)}%; background: #f59e0b;"></div></div>
            <b>${mqi.fluency}/1000</b>
          </div>
          <div class="axis-row">
            <span>🔢 Số Học & Đại Số (Số Nguyên Z, Tìm x):</span>
            <div class="bar-bg"><div class="bar-fill" style="width:${(mqi.algebra / 10).toFixed(0)}%; background: #3b82f6;"></div></div>
            <b>${mqi.algebra}/1000</b>
          </div>
          <div class="axis-row">
            <span>📐 Hình Học Trực Quan, Đối Xứng & 3D:</span>
            <div class="bar-bg"><div class="bar-fill" style="width:${(mqi.geometry / 10).toFixed(0)}%; background: #10b981;"></div></div>
            <b>${mqi.geometry}/1000</b>
          </div>
          <div class="axis-row">
            <span>🧠 Giải Quyết Vấn Đề & Logic:</span>
            <div class="bar-bg"><div class="bar-fill" style="width:${(mqi.logic / 10).toFixed(0)}%; background: #8b5cf6;"></div></div>
            <b>${mqi.logic}/1000</b>
          </div>
          <div class="axis-row">
            <span>🛡️ Săn Lỗi Sai & Bản Lĩnh Kiên Trì:</span>
            <div class="bar-bg"><div class="bar-fill" style="width:${(mqi.resilience / 10).toFixed(0)}%; background: #ec4899;"></div></div>
            <b>${mqi.resilience}/1000</b>
          </div>
        </div>
      </div>

      <!-- 🌟 MỤC 1: LỜI KHEN NGỢI & ĐIỂM SÁNG NĂNG LỰC -->
      <section class="praise-card-section">
        <div class="section-title-wrap">
          <span class="section-icon">🌟</span>
          <div>
            <h3>Điểm Sáng & Lời Khen Ngợi Động Viên Dành Cho ${escapeHtml(learnerName)}</h3>
            <p>Những năng lực vượt trội con đã xuất sắc làm chủ và phát huy rực rỡ</p>
          </div>
        </div>

        <div class="strengths-grid">
          ${diagnosis.strengths.map(st => `
            <div class="strength-highlight-card" style="border-left-color: ${st.color}">
              <div class="st-top">
                <div class="st-badge">
                  <span class="st-icon">${st.icon}</span>
                  <span class="st-axis-name">${st.name}</span>
                </div>
                <span class="st-score-pill" style="color: ${st.color}; background: ${st.color}15">
                  ${st.score}/1000 điểm
                </span>
              </div>
              <h4 class="st-title" style="color: ${st.color}">${st.title}</h4>
              <p class="st-desc">${st.description}</p>
            </div>
          `).join('')}
        </div>

        <div class="praise-quote-box">
          <span class="quote-icon">💬</span>
          <p class="quote-text">
            <strong>Lời nhắn từ Thầy Cô & Hệ Thống:</strong> "Thầy cô và ba mẹ vô cùng ấn tượng trước sự chăm chỉ và tư duy tích cực của <strong>${escapeHtml(learnerName)}</strong>. Khi con giữ vững ngọn lửa say mê và tự tin vào bản thân, mọi bài toán khó đều sẽ trở thành những bậc thang giúp con tiến xa hơn nữa!"
          </p>
        </div>
      </section>

      <!-- 🎯 MỤC 2: ĐIỂM NGHẼN CẦN BỨT PHÁ & NGUYÊN NHÂN SƯ PHẠM -->
      <section class="bottleneck-card-section">
        <div class="section-title-wrap">
          <span class="section-icon">🎯</span>
          <div>
            <h3>Điểm Nghẽn Cần Bứt Phá & Phân Tích Nguyên Nhân Sư Phạm</h3>
            <p>Nhận diện chính xác lỗ hổng tư duy và hướng giải quyết triệt để từ gốc</p>
          </div>
        </div>

        <div class="growth-areas-list">
          ${diagnosis.growthAreas.map(ga => `
            <div class="growth-area-card">
              <div class="ga-header">
                <div class="ga-title-wrap">
                  <span class="ga-icon">${ga.icon}</span>
                  <div>
                    <h4>${ga.name}</h4>
                    <span class="ga-status-tag">Cần Bồi Đắp (${ga.score}/1000 điểm)</span>
                  </div>
                </div>
              </div>

              <div class="ga-content-grid">
                <div class="ga-box ga-cause">
                  <span class="box-tag text-danger">⚠️ Triệu chứng & Nguyên nhân sâu xa:</span>
                  <p class="ga-text"><strong>${ga.title}:</strong> ${ga.cause}</p>
                </div>
                <div class="ga-box ga-remedy">
                  <span class="box-tag text-success">💡 Hướng giải quyết sư phạm:</span>
                  <p class="ga-text">${ga.remedy}</p>
                </div>
              </div>

              <div class="ga-recommendations-row">
                <div class="rec-group">
                  <span class="rec-label">📖 Bài Học Tuần Trọng Điểm:</span>
                  <div class="rec-chips">
                    ${ga.recommendedWeeks.map(w => `
                      <button class="rec-chip-btn btn-nav-week" data-nav-week="${w.id}" title="${w.reason}">
                        Tuần ${w.number}: ${w.title} ↗
                      </button>
                    `).join('')}
                  </div>
                </div>
                <div class="rec-group">
                  <span class="rec-label">🎮 Mini-game Rèn Luyện Trực Quan:</span>
                  <div class="rec-chips">
                    ${ga.recommendedGames.map(g => `
                      <button class="rec-chip-btn btn-nav-game" data-nav-game="${g.id}" title="${g.reason}">
                        ${g.icon} ${g.name} ↗
                      </button>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 🚀 MỤC 3: ĐƠN THUỐC HỌC TẬP & KẾ HOẠCH RÈN LUYỆN 3 BƯỚC -->
      <section class="prescription-roadmap-card">
        <div class="section-title-wrap">
          <span class="section-icon">🚀</span>
          <div>
            <h3>Đơn Thuốc Học Tập & Lộ Trình 3 Bước Trong 7 Ngày Tới</h3>
            <p>Kế hoạch hành động cụ thể giúp ${escapeHtml(learnerName)} khắc phục điểm nghẽn và nâng hạng năng lực</p>
          </div>
        </div>

        <div class="roadmap-steps-list">
          ${diagnosis.actionRoadmap.map(step => `
            <div class="step-card">
              <div class="step-badge">BƯỚC ${step.step}</div>
              <div class="step-content">
                <span class="step-tag">${step.tag}</span>
                <h4 class="step-title">${step.title}</h4>
                <p class="step-desc">${step.desc}</p>
              </div>
              <div class="step-action">
                <a href="${step.actionUrl}" class="btn-step-action">
                  ${step.actionLabel}
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 👨‍👩‍👧 MỤC 4: CẨM NANG ĐỒNG HÀNH DÀNH CHO PHỤ HUYNH -->
      <section class="parent-coaching-section">
        <div class="section-title-wrap">
          <span class="section-icon">👨‍👩‍👧</span>
          <div>
            <h3>Góc Đồng Hành Của Ba Mẹ Cùng ${escapeHtml(learnerName)}</h3>
            <p>Phương pháp sư phạm tích cực, giúp con tự tin và hào hứng với môn Toán mà không bị áp lực</p>
          </div>
        </div>

        <div class="coaching-grid">
          ${diagnosis.parentGuidance.map(item => `
            <div class="coaching-card">
              <div class="coach-icon">${item.icon}</div>
              <div class="coach-content">
                <h4>${item.title}</h4>
                <p>${item.content}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    </div>
  `;

  // Gắn sự kiện chuyển đổi hồ sơ bé (Ngân, Bách, Khoa, Custom)
  container.querySelectorAll(".profile-pill-btn[data-learner]").forEach(btn => {
    btn.addEventListener("click", () => {
      const selected = btn.getAttribute("data-learner");
      state.learnerName = selected;
      renderCompetency(container, state);
    });
  });

  const customBtn = container.querySelector("#btn-custom-learner");
  if (customBtn) {
    customBtn.addEventListener("click", () => {
      const current = state.learnerName || "Ngân";
      const customName = window.prompt("Nhập tên của bé để cá nhân hóa báo cáo:", current);
      if (customName && customName.trim()) {
        state.learnerName = customName.trim();
        renderCompetency(container, state);
      }
    });
  }

  // Gắn sự kiện nút In báo cáo
  const printBtn = container.querySelector("#btn-print-competency");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // Gắn sự kiện chuyển trang khi click vào đề xuất tuần
  container.querySelectorAll(".btn-nav-week").forEach(btn => {
    btn.addEventListener("click", () => {
      const wId = btn.getAttribute("data-nav-week");
      window.location.hash = `#math?week=${wId}`;
    });
  });

  // Gắn sự kiện chuyển sang game khi click vào đề xuất game
  container.querySelectorAll(".btn-nav-game").forEach(btn => {
    btn.addEventListener("click", () => {
      const gId = btn.getAttribute("data-nav-game");
      window.location.hash = `#games?play=${gId}`;
    });
  });
}

export async function renderParent(container, state) {
  const weeks = getAllWeeks();
  const feedbacks = await getAllFeedbacks();
  const verifiedWeeksCount = weeks.filter(w => state.progress?.[w.id]?.completed || state.progress?.[w.id]?.parentOk).length;
  const verifiedPercent = Math.round((verifiedWeeksCount / 24) * 100);

  container.innerHTML = `
    <div class="view-parent">
      <div class="parent-header">
        <h2>👨‍👩‍👦 Cổng Phụ Huynh & Theo Dõi Học Tập</h2>
        <p>Theo dõi tiến độ học tập 24 tuần, xem các bài học đã được sửa lỗi và cập nhật.</p>
      </div>

      <!-- Danh Sách Phản Hồi Báo Lỗi -->
      <section class="feedback-hub-card">
        <div class="fb-head">
          <h3>📋 Lịch Sử Góp Ý & Cập Nhật Bài Học (${feedbacks.length} phiếu)</h3>
          <span class="text-muted">Cập nhật trực tiếp nội dung</span>
        </div>
        ${feedbacks.length === 0 ? `
          <div class="empty-state">Chưa có bài học nào bị báo lỗi. Khi phát hiện sai sót, phụ huynh hãy điền khung báo lỗi ngay dưới bài học để hệ thống cập nhật.</div>
        ` : `
          <div class="feedback-tickets-list">
            ${feedbacks.map(fb => {
              const isPatched = fb.status === "PATCHED_VERIFIED";
              return `
                <div class="ticket-card ${isPatched ? 'is-patched' : 'is-pending'}">
                  <div class="ticket-top">
                    <span class="ticket-id">${fb.id}</span>
                    <span class="ticket-date">${new Date(fb.createdAt).toLocaleDateString('vi-VN')}</span>
                    <span class="ticket-status ${isPatched ? 'status-patched' : 'status-pending'}">
                      ${isPatched ? '✔ ĐÃ CẬP NHẬT' : '⏳ ĐANG XỬ LÝ'}
                    </span>
                  </div>
                  <div class="ticket-body">
                    <div class="ticket-location"><b>Vị trí:</b> Tuần ${fb.weekNumber} · Buổi ${fb.dayNumber} · Mã: <code>${fb.questionId}</code></div>
                    <div class="ticket-desc"><b>Ý kiến đóng góp:</b> "${escapeHtml(fb.description)}"</div>
                    ${fb.parentProposedFix ? `<div class="ticket-fix"><b>Đề xuất sửa:</b> ${escapeHtml(fb.parentProposedFix)}</div>` : ''}
                  </div>
                  <div class="ticket-actions">
                    ${!isPatched ? `
                      <button class="btn btn-sm btn-primary btn-auto-patch" data-fb-id="${fb.id}">
                        🔄 Cập nhật bài này ngay
                      </button>
                      <button class="btn btn-sm btn-secondary btn-edit-patch" data-fb-id="${fb.id}">
                        ✏ Sửa nhanh đáp án
                      </button>
                    ` : `
                      <span class="badge-patched-verified">✔ Đã cập nhật xong</span>
                    `}
                    ${!isPatched ? `
                      <button class="btn btn-sm btn-text btn-mark-done" data-fb-id="${fb.id}">
                        Đánh dấu đã sửa
                      </button>
                    ` : ''}
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        `}
      </section>

      <!-- Tiến Độ 24 Tuần Học -->
      <section class="parent-progress-section">
        <div class="parent-prog-header">
          <div>
            <h3>📅 Bảng Theo Dõi & Xác Nhận Tiến Độ 24 Tuần</h3>
            <p class="text-muted">Phụ huynh tích chọn xác nhận sau khi cùng con hoàn thành bài học mỗi tuần</p>
          </div>
          <div class="parent-prog-metrics">
            <span class="prog-badge">Đã hoàn thành: <b>${verifiedWeeksCount}/24 tuần</b> (${verifiedPercent}%)</span>
          </div>
        </div>

        <div class="parent-weeks-modules-grid">
          ${[
            { title: "Chuyên Đề 1: Nền Tảng Số Học & Lũy Thừa (Tuần 1 - 4)", icon: "🌿", nums: [1, 2, 3, 4] },
            { title: "Chuyên Đề 2: Số Nguyên Z, Ước & Bội (Tuần 5 - 9)", icon: "⚓", nums: [5, 6, 7, 8, 9] },
            { title: "Chuyên Đề 3: Phân Số & Số Thập Phân (Tuần 10 - 12)", icon: "📊", nums: [10, 11, 12] },
            { title: "Chuyên Đề 4: Hình Học Phẳng & 3D (Tuần 13 - 18)", icon: "📐", nums: [13, 14, 15, 16, 17, 18] },
            { title: "Chuyên Đề 5: Thống Kê & Chinh Phục Olympic (Tuần 19 - 24)", icon: "🏆", nums: [19, 20, 21, 22, 23, 24] }
          ].map(mod => `
            <div class="parent-mod-card">
              <div class="mod-head">
                <span class="mod-icon">${mod.icon}</span>
                <h4>${mod.title}</h4>
              </div>
              <div class="mod-weeks-rows">
                ${weeks.filter(w => mod.nums.includes(w.number)).map(w => {
                  const prog = state.progress?.[w.id] || {};
                  const isDone = prog.completed || prog.parentOk;
                  return `
                    <div class="parent-week-row ${isDone ? 'is-verified' : ''}">
                      <div class="pw-info">
                        <span class="pw-number">Tuần ${w.number}</span>
                        <a href="#math?week=${w.id}" class="pw-title-link" title="Bấm để xem bài học">${escapeHtml(w.title)} ↗</a>
                      </div>
                      <label class="pw-check-label">
                        <input type="checkbox" class="parent-confirm-chk" data-week-id="${w.id}" ${prog.parentOk ? 'checked' : ''} />
                        <span class="custom-checkbox"></span>
                        <span class="chk-text">${prog.parentOk ? 'Đã duyệt' : 'Xác nhận'}</span>
                      </label>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    </div>
  `;

  // Gắn sự kiện Cập nhật bài học
  container.querySelectorAll(".btn-auto-patch").forEach(btn => {
    btn.addEventListener("click", async () => {
      const fid = btn.dataset.fbId;
      const fb = feedbacks.find(item => item.id === fid);
      if (!fb) return;

      btn.disabled = true;
      btn.textContent = "⏳ Đang cập nhật...";

      const res = await patchCodeOnServer(fb);
      if (res && res.success) {
        await markFeedbackPatched(fid);
        alert(`✔ Đã cập nhật bài học thành công!\nBạn hãy ấn nút [🔄 Cập nhật] trên thanh công cụ để tải lại bài học mới.`);
        renderParent(container, state);
      } else {
        btn.disabled = false;
        btn.textContent = "🔄 Thử lại";
        alert(`❌ Cập nhật thất bại: ${res?.error || "Không thể kết nối tới server"}`);
      }
    });
  });

  // Gắn sự kiện Sửa Trực Tiếp
  container.querySelectorAll(".btn-edit-patch").forEach(btn => {
    btn.addEventListener("click", async () => {
      const fid = btn.dataset.fbId;
      const fb = feedbacks.find(item => item.id === fid);
      if (!fb) return;

      const newAns = prompt(`Nhập đáp án đúng mới cho câu ${fb.questionId}:`, "");
      if (newAns === null) return;

      const payload = Object.assign({}, fb, {
        patchData: {
          answer: newAns.trim()
        }
      });

      btn.disabled = true;
      btn.textContent = "⏳ Đang lưu...";

      const res = await patchCodeOnServer(payload);
      if (res && res.success) {
        await markFeedbackPatched(fid);
        alert(`✔ Đã cập nhật đáp án thành công!\nBạn hãy ấn nút [🔄 Cập nhật] trên thanh công cụ để tải lại bài học mới.`);
        renderParent(container, state);
      } else {
        btn.disabled = false;
        btn.textContent = "✏ Sửa nhanh đáp án";
        alert(`❌ Thất bại: ${res?.error}`);
      }
    });
  });

  // Gắn sự kiện copy prompt
  container.querySelectorAll(".btn-copy-prompt").forEach(btn => {
    btn.addEventListener("click", () => {
      const fid = btn.dataset.fbId;
      const fb = feedbacks.find(item => item.id === fid);
      if (!fb) return;
      const prompt = generateGuidedPatchPrompt(fb);
      navigator.clipboard.writeText(prompt).then(() => {
        alert("Đã sao chép Báo Cáo Kỹ Thuật vào Clipboard!");
      });
    });
  });

  // Gắn sự kiện đánh dấu đã sửa
  container.querySelectorAll(".btn-mark-done").forEach(btn => {
    btn.addEventListener("click", async () => {
      const fid = btn.dataset.fbId;
      await markFeedbackPatched(fid);
      renderParent(container, state);
    });
  });
}

/**
 * Hiển thị Màn hình Khảo Sát Năng Lực Đầu Vào (10 câu không tính giờ)
 */
export function renderDiagnostic(container, state) {
  const result = state.diagnosticResult;

  container.innerHTML = `
    <div class="view-diagnostic">
      <div class="diag-header-card">
        <div class="dh-top">
          <a href="#home" class="btn btn-sm btn-secondary btn-back-home">← Trở Về Trang Chủ</a>
          <span class="badge-grade">KHẢO SÁT ĐẦU VÀO</span>
        </div>
        <div class="diag-header-main">
          <h2>🎯 Khảo Sát Năng Lực Đầu Vào Toán 6 Cho Ngân</h2>
          <p>Làm 10 câu hỏi ngắn (không áp lực thời gian, được nháp ra giấy) để hệ thống tự động nhận diện năng lực và điều chỉnh độ khó bài học phù hợp nhất với Ngân.</p>
        </div>
      </div>

      ${result ? `
        <div class="diag-result-card">
          <div class="res-head">
            <span class="res-badge">${result.badge}</span>
            <h3>Kết Quả: ${result.totalScore} / ${result.maxScore} Điểm (${result.percentage}%)</h3>
          </div>
          <div class="res-body">
            <h4 class="res-title">${escapeHtml(result.title)}</h4>
            <p class="res-desc">${escapeHtml(result.description)}</p>
            <div class="res-policy-chips">
              <span class="r-chip">🎯 <b>Lộ trình:</b> ${escapeHtml(result.recommendedTrack)}</span>
              <span class="r-chip">💡 <b>Cơ chế gợi ý:</b> ${escapeHtml(result.hintPolicy)}</span>
              <span class="r-chip">📈 <b>MQI khởi điểm:</b> ${result.baseMqi} điểm</span>
            </div>
          </div>
          <div class="res-actions">
            <a href="#math" class="btn btn-primary" id="btnGoToMathAfterDiag">🚀 Vào Học Toán Ngay Theo Độ Khó Này</a>
          </div>
        </div>
      ` : ''}

      <form id="diagnosticForm" class="diag-questions-container">
        <div class="dq-instruction-bar">
          <span>📝 <b>Hướng dẫn:</b> Đọc kỹ từng câu, tính toán nháp ra giấy rồi điền kết quả vào ô tương ứng. Bấm nút hoàn thành ở dưới cùng khi làm xong.</span>
        </div>

        ${DIAGNOSTIC_TEST.questions.map((q, idx) => {
          const prevAnswer = result?.detailedResults?.find(r => r.id === q.id)?.userAnswer || "";
          return `
            <div class="diag-question-item" id="dq_${q.id}">
              <div class="dq-top">
                <span class="dq-index">Câu ${idx + 1}</span>
                <span class="dq-meta-tag">${q.dimension.toUpperCase()} · ${q.level.toUpperCase()}</span>
              </div>
              <div class="dq-prompt">${escapeHtml(q.question)}</div>
              ${q.hint ? `
                <div class="dq-hint-subtle">💡 <i>Gợi ý: ${escapeHtml(q.hint)}</i></div>
              ` : ''}
              <div class="dq-input-area">
                <input type="text"
                  id="ans_${q.id}"
                  class="math-answer-input"
                  placeholder="Điền đáp số..."
                  value="${escapeHtml(prevAnswer)}"
                  required />
              </div>
            </div>
          `;
        }).join("")}

        <div class="diag-submit-actions">
          <button type="submit" class="btn btn-primary btn-large" id="btnSubmitDiag">
            ✔ Nộp Bài & Xác Lập Độ Khó Cá Nhân Hóa Cho Ngân
          </button>
        </div>
      </form>
    </div>
  `;

  // Gắn sự kiện nộp bài khảo sát
  const form = container.querySelector("#diagnosticForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector("#btnSubmitDiag");
      submitBtn.disabled = true;
      submitBtn.textContent = "⏳ Đang đánh giá năng lực & hiệu chuẩn độ khó...";

      const answers = {};
      DIAGNOSTIC_TEST.questions.forEach(q => {
        const inp = form.querySelector(`#ans_${q.id}`);
        answers[q.id] = inp ? inp.value.trim() : "";
      });

      const evalRes = evaluateDiagnostic(answers);
      state.diagnosticResult = evalRes;
      state.competencyMetrics = Object.assign(state.competencyMetrics || {}, evalRes.initialMetrics);

      submitBtn.disabled = false;
      submitBtn.textContent = "✔ Đã Lưu";

      alert(`🎉 CHÚC MỪNG BẠN NGÂN!\nĐã hoàn thành khảo sát đầu vào: ${evalRes.totalScore}/10 câu đúng.\nTrình độ: ${evalRes.badge}\nHệ thống đã tự động tinh chỉnh độ khó và lộ trình cho Ngân!`);

      // Tải lại view chẩn đoán để xem bảng phân tích
      renderDiagnostic(container, state);
      window.scrollTo({ top: 0, behavior: getScrollBehavior() });
    });
  }
}
