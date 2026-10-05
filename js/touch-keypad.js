// js/touch-keypad.js - Bàn phím số cảm ứng Toán học Lớp 6 (Custom Math Touch Keypad)
// Tối ưu cho iPad Air M1: phản xạ 0ms, đầy đủ phím số âm, phân số, ẩn x, chống che khuất ô nhập.

let activeInput = null;
let keypadContainer = null;
let isKeypadVisible = false;
let audioCtx = null;
let switchFloatBtn = null;
let suppressNextFocus = false;

function playKeyClickSound(freq = 580) {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === "suspended") audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch {
    // Không làm gián đoạn trải nghiệm nếu audio bị chặn
  }
}

function updateKeypadHeight() {
  if (keypadContainer) {
    const h = keypadContainer.offsetHeight || 360;
    document.documentElement.style.setProperty("--math-keypad-height", `${h}px`);
  }
}

function getScrollBehavior() {
  return (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) ? "auto" : "smooth";
}

function showSwitchBackFloatButton(targetInput) {
  if (!switchFloatBtn) {
    switchFloatBtn = document.createElement("button");
    switchFloatBtn.id = "btnSwitchBackToMathKeypad";
    switchFloatBtn.className = "btn-switch-back-keypad";
    switchFloatBtn.type = "button";
    switchFloatBtn.innerHTML = "<span>🔢 Dùng Phím Số Toán</span>";
    switchFloatBtn.setAttribute("aria-label", "Chuyển lại bàn phím toán học");
    document.body.appendChild(switchFloatBtn);

    switchFloatBtn.addEventListener("click", () => {
      if (activeInput) {
        activeInput.removeAttribute("data-custom-keyboard");
        activeInput.inputMode = "none";
        attachInput(activeInput);
      }
      hideSwitchBackFloatButton();
    });
  }
  switchFloatBtn.style.display = "flex";
}

function hideSwitchBackFloatButton() {
  if (switchFloatBtn) {
    switchFloatBtn.style.display = "none";
  }
}

export function initMathTouchKeypad() {
  if (typeof document === "undefined") return;
  if (document.getElementById("mathTouchKeypad")) return;

  const keypad = document.createElement("div");
  keypad.id = "mathTouchKeypad";
  keypad.className = "math-touch-keypad-dock";
  keypad.setAttribute("role", "region");
  keypad.setAttribute("aria-label", "Bàn phím toán học cảm ứng");
  keypad.hidden = true;

  keypad.innerHTML = `
    <div class="keypad-toolbar">
      <div class="keypad-title-wrap">
        <span class="keypad-title">🔢 Bàn phím Toán 6</span>
        <span class="keypad-subtitle">Tối ưu iPad Air M1</span>
      </div>
      <div class="keypad-tools">
        <button type="button" class="keypad-tool-btn" id="toggleSystemKeyboardBtn" aria-label="Chuyển sang bàn phím chữ iPad" title="Chuyển sang bàn phím hệ thống iPad">⌨️ Phím iPad</button>
        <button type="button" class="keypad-tool-btn keypad-close-btn" id="closeKeypadBtn" aria-label="Đóng bàn phím" title="Thu nhỏ bàn phím">▼ Đóng</button>
      </div>
    </div>
    <div class="keypad-grid">
      <button type="button" class="kp-btn num" data-key="7" aria-label="Số 7">7</button>
      <button type="button" class="kp-btn num" data-key="8" aria-label="Số 8">8</button>
      <button type="button" class="kp-btn num" data-key="9" aria-label="Số 9">9</button>
      <button type="button" class="kp-btn op" data-key="+" aria-label="Dấu cộng" title="Phép cộng">+</button>
      <button type="button" class="kp-btn op" data-key="/" aria-label="Dấu gạch phân số" title="Dấu gạch phân số">/</button>

      <button type="button" class="kp-btn num" data-key="4" aria-label="Số 4">4</button>
      <button type="button" class="kp-btn num" data-key="5" aria-label="Số 5">5</button>
      <button type="button" class="kp-btn num" data-key="6" aria-label="Số 6">6</button>
      <button type="button" class="kp-btn op" data-key="-" aria-label="Dấu âm hoặc trừ" title="Dấu âm / Dấu trừ">−</button>
      <button type="button" class="kp-btn op" data-key="×" aria-label="Phép nhân" title="Phép nhân">×</button>

      <button type="button" class="kp-btn num" data-key="1" aria-label="Số 1">1</button>
      <button type="button" class="kp-btn num" data-key="2" aria-label="Số 2">2</button>
      <button type="button" class="kp-btn num" data-key="3" aria-label="Số 3">3</button>
      <button type="button" class="kp-btn op" data-key="(" aria-label="Mở ngoặc" title="Mở ngoặc">(</button>
      <button type="button" class="kp-btn op" data-key=")" aria-label="Đóng ngoặc" title="Đóng ngoặc">)</button>

      <button type="button" class="kp-btn num" data-key="0" aria-label="Số 0">0</button>
      <button type="button" class="kp-btn op" data-key="," aria-label="Dấu phẩy thập phân" title="Dấu phẩy thập phân">,</button>
      <button type="button" class="kp-btn op" data-key="x" aria-label="Ẩn số x" title="Ẩn số biến x">x</button>
      <button type="button" class="kp-btn action backspace" data-key="BACKSPACE" aria-label="Xóa ký tự trước con trỏ" title="Xóa lùi">⌫ Xóa</button>
      <button type="button" class="kp-btn action enter" data-key="ENTER" aria-label="Xác nhận và kiểm tra đáp án" title="Xác nhận nhập">✓ Nhập</button>
    </div>
  `;

  document.body.appendChild(keypad);
  keypadContainer = keypad;

  // Đo chiều cao thực tế bằng ResizeObserver
  if (typeof window !== "undefined" && window.ResizeObserver) {
    const ro = new ResizeObserver(() => updateKeypadHeight());
    ro.observe(keypad);
  }

  // Lắng nghe sự kiện click phím
  keypad.addEventListener("click", handleKeypadClick);

  // Nút đóng bàn phím
  const closeBtn = keypad.querySelector("#closeKeypadBtn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => hideKeypad());
  }

  // Nút chuyển bàn phím hệ thống
  const sysBtn = keypad.querySelector("#toggleSystemKeyboardBtn");
  if (sysBtn) {
    sysBtn.addEventListener("click", () => {
      if (activeInput) {
        activeInput.setAttribute("data-custom-keyboard", "system");
        activeInput.inputMode = "text";
        hideKeypad();
        activeInput.focus();
        showSwitchBackFloatButton(activeInput);
      } else {
        hideKeypad();
      }
    });
  }

  // Phím Escape để đóng bàn phím gọn gàng
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isKeypadVisible) {
      hideKeypad();
      if (activeInput) activeInput.blur();
    }
  });

  // Chạm bên ngoài vùng bàn phím và ô nhập để thu gọn bàn phím
  document.addEventListener("pointerdown", (e) => {
    if (!isKeypadVisible) return;
    if (keypadContainer && keypadContainer.contains(e.target)) return;
    if (activeInput && activeInput.contains(e.target)) return;
    if (e.target && (e.target.matches("input[data-math-input]") || e.target.classList.contains("math-answer-input"))) return;
    if (e.target.closest && e.target.closest("#btnSwitchBackToMathKeypad")) return;
    hideKeypad();
  });

  // Lắng nghe thay đổi visualViewport trên iPad Safari khi xoay màn hình
  if (typeof window !== "undefined" && window.visualViewport) {
    window.visualViewport.addEventListener("resize", () => {
      if (isKeypadVisible && activeInput) {
        activeInput.scrollIntoView({ behavior: getScrollBehavior(), block: "center" });
      }
    });
  }

  // Lắng nghe focus vào input toán học
  document.addEventListener("focusin", (e) => {
    if (suppressNextFocus) return;
    if (e.target && (e.target.matches("input[data-math-input]") || e.target.classList.contains("math-answer-input"))) {
      if (e.target.getAttribute("data-custom-keyboard") === "system") {
        showSwitchBackFloatButton(e.target);
      } else {
        hideSwitchBackFloatButton();
        attachInput(e.target);
      }
    }
  });
}

export function attachInput(inputElement) {
  if (!inputElement) return;
  activeInput = inputElement;
  if (typeof activeInput.setAttribute === "function") {
    activeInput.setAttribute("aria-controls", "mathTouchKeypad");
  }

  // Tránh việc bàn phím ảo mặc định của iPad bật lên đè lên bàn phím toán nổi
  if (typeof inputElement.getAttribute === "function" && inputElement.getAttribute("data-custom-keyboard") !== "system") {
    inputElement.inputMode = "none";
  }

  showKeypad();

  // Giữ ô nhập luôn hiển thị ở giữa tầm mắt khi bàn phím nổi bật lên
  setTimeout(() => {
    if (typeof inputElement.scrollIntoView === "function") {
      inputElement.scrollIntoView({ behavior: getScrollBehavior(), block: "center" });
    }
  }, 100);
}

export function showKeypad() {
  if (!keypadContainer) return;
  keypadContainer.hidden = false;
  isKeypadVisible = true;
  document.body.classList.add("math-keypad-open");
  updateKeypadHeight();
  hideSwitchBackFloatButton();
  if (activeInput) {
    activeInput.setAttribute("aria-controls", "mathTouchKeypad");
  }
}

export function hideKeypad(shouldBlur = true) {
  if (!keypadContainer) return;
  keypadContainer.hidden = true;
  isKeypadVisible = false;
  document.body.classList.remove("math-keypad-open");
  if (activeInput) {
    if (shouldBlur) {
      suppressNextFocus = true;
      try {
        activeInput.blur();
      } catch (_) {}
      setTimeout(() => {
        suppressNextFocus = false;
      }, 250);
    }
  }
}

function supportsSelection(el) {
  if (!el || !el.type) return false;
  const t = el.type.toLowerCase();
  return ["text", "search", "url", "tel", "password"].includes(t);
}

function handleKeypadClick(e) {
  const btn = e.target.closest("button.kp-btn");
  if (!btn || !activeInput) return;

  e.preventDefault();
  const key = btn.dataset.key;
  playKeyClickSound(key === "ENTER" ? 720 : 540);

  if (key === "ENTER") {
    // Kích hoạt event input và change
    activeInput.dispatchEvent(new Event("input", { bubbles: true }));
    activeInput.dispatchEvent(new Event("change", { bubbles: true }));

    // 1. Tìm nút kiểm tra đáp án tương ứng theo data-check-qid hoặc data-check-for (cho bài học)
    const qid = activeInput.dataset.mathInputQid || (activeInput.id ? activeInput.id.replace(/^input_/, "") : "");
    const submitBtn = (qid ? document.querySelector(`[data-check-qid="${qid}"]`) : null) ||
                      document.querySelector(`[data-check-for="${activeInput.id}"]`) ||
                      activeInput.closest(".input-wrap")?.querySelector(".btn-check-answer");

    if (submitBtn) {
      submitBtn.click();
      hideKeypad();
      return;
    }

    // 2. Nếu trong khảo sát đầu vào hoặc chuỗi ô nhập liệu liên tiếp: tự động chuyển sang ô kế tiếp
    const allInputs = Array.from(document.querySelectorAll(".math-answer-input:not([disabled])"));
    const currentIndex = allInputs.indexOf(activeInput);
    if (currentIndex !== -1 && currentIndex < allInputs.length - 1) {
      const nextInput = allInputs[currentIndex + 1];
      nextInput.focus();
      nextInput.scrollIntoView({ behavior: getScrollBehavior(), block: "center" });
      return;
    }

    // 3. Nếu là ô cuối cùng của form khảo sát hoặc form submit: kích hoạt nộp bài
    const form = activeInput.closest("form");
    const formSubmitBtn = form?.querySelector("button[type='submit']");
    if (formSubmitBtn) {
      formSubmitBtn.click();
    }
    hideKeypad();
    return;
  }

  const val = activeInput.value || "";
  const canSelect = supportsSelection(activeInput);
  let start = val.length;
  let end = val.length;

  if (canSelect) {
    try {
      if (typeof activeInput.selectionStart === "number") {
        start = activeInput.selectionStart;
      }
      if (typeof activeInput.selectionEnd === "number") {
        end = activeInput.selectionEnd;
      }
    } catch (_) {
      start = val.length;
      end = val.length;
    }
  }

  if (key === "BACKSPACE") {
    if (canSelect && start < end) {
      // Xóa vùng đang bôi đen
      activeInput.value = val.slice(0, start) + val.slice(end);
      try { activeInput.setSelectionRange(start, start); } catch (_) {}
    } else if (canSelect && start > 0) {
      // Xóa ký tự ngay trước con trỏ
      activeInput.value = val.slice(0, start - 1) + val.slice(start);
      try { activeInput.setSelectionRange(start - 1, start - 1); } catch (_) {}
    } else {
      // Fallback an toàn cho input không hỗ trợ selection APIs (ví dụ type="number")
      activeInput.value = val.slice(0, -1);
    }
    activeInput.dispatchEvent(new Event("input", { bubbles: true }));
    return;
  }

  // Chèn ký tự tại vị trí con trỏ (hoặc thay thế khoảng text đang chọn)
  if (canSelect) {
    activeInput.value = val.slice(0, start) + key + val.slice(end);
    const nextPos = start + key.length;
    try { activeInput.setSelectionRange(nextPos, nextPos); } catch (_) {}
  } else {
    // Fallback an toàn cho input không hỗ trợ selection APIs (như type="number")
    activeInput.value = val + key;
  }
  activeInput.dispatchEvent(new Event("input", { bubbles: true }));
}
