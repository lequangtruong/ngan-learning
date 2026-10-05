// app.js - Điểm khởi động chính của Ngân Learning Lab
import { openDatabase, loadState, saveState, getDefaultState } from "./data/data-core.js";
import { state, updateState, subscribe } from "./js/core.js";
import { renderHome, renderMath, renderGames, renderCompetency, renderParent, renderDiagnostic } from "./js/render-views.js";
import { initMathTouchKeypad } from "./js/touch-keypad.js";
import { initKeyboardAndOrientationAdaptation } from "./js/keyboard-adapt.js";
import { initTimer, startTimer, pauseTimer, getTimerState, subscribeTimer, formatTime } from "./js/study-timer.js";

// Khởi tạo router và điều hướng
const routes = {
  home: renderHome,
  math: renderMath,
  games: renderGames,
  competency: renderCompetency,
  parent: renderParent,
  diagnostic: renderDiagnostic
};

let currentRoute = "home";

function parseHash() {
  const fullHash = window.location.hash.replace("#", "").trim();
  const [routePart, queryPart] = fullHash.split("?");
  const route = routes[routePart] ? routePart : "home";
  const params = {};
  if (queryPart) {
    const searchParams = new URLSearchParams(queryPart);
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
  }
  return { route, params };
}

async function navigate() {
  const { route, params } = parseHash();
  currentRoute = route;
  const renderFn = routes[route] || renderHome;
  const container = document.getElementById("app");
  if (!container) return;

  // Chỉ hiển thị Đồng hồ học tập khi đang trong bài học (#math)
  const timerWidget = document.getElementById("studyTimerWidget");
  if (timerWidget) {
    timerWidget.style.display = (route === "math") ? "flex" : "none";
  }

  // Cập nhật giao diện menu dưới đáy và aria-current cho VoiceOver/Accessibility
  document.querySelectorAll("#bottomNav .nav-item").forEach(item => {
    const target = item.getAttribute("href")?.replace("#", "");
    if (target === route) {
      item.classList.add("active");
      item.setAttribute("aria-current", "page");
    } else {
      item.classList.remove("active");
      item.removeAttribute("aria-current");
    }
  });

  // Render view tương ứng
  await renderFn(container, state, params);
  window.scrollTo(0, 0);
}

// Khởi chạy toàn bộ ứng dụng
async function initApp() {
  try {
    // 1. Mở IndexedDB và nạp trạng thái học tập
    await openDatabase();
    const persistedState = await loadState();
    if (persistedState) {
      updateState(persistedState);
    } else {
      updateState(getDefaultState());
      await saveState(state);
    }

    // Tự động lưu state khi có thay đổi
    subscribe(async (newState) => {
      await saveState(newState);
    });

    // 2. Khởi tạo Bàn phím số Toán học cảm ứng nổi cho iPad
    initMathTouchKeypad();

    // 3. Khởi tạo thích ứng xoay ngang/dọc và chống che khuất trên iPad Air M1
    initKeyboardAndOrientationAdaptation();

    // 4. Khởi tạo Đồng hồ học tập 25 phút
    initTimer(25);
    const timerDisplay = document.getElementById("timerDisplay");
    const timerToggleBtn = document.getElementById("timerToggleBtn");

    subscribeTimer((timerState) => {
      if (timerDisplay) {
        timerDisplay.textContent = formatTime(timerState.remainingSeconds);
      }
      if (timerToggleBtn) {
        timerToggleBtn.textContent = timerState.isRunning ? "⏸" : "▶";
      }
    });

    if (timerToggleBtn) {
      timerToggleBtn.addEventListener("click", () => {
        const cur = getTimerState();
        if (cur.isRunning) {
          pauseTimer();
        } else {
          startTimer();
        }
      });
    }

    // 4b. Theo dõi Trạng Thái Kết Nối Mạng Thực Tế (Online/Offline)
    function updateNetworkSyncStatus() {
      const syncChip = document.getElementById("syncStatusChip");
      const syncDot = syncChip ? syncChip.querySelector(".sync-dot") : null;
      const syncText = document.getElementById("syncStatusText");
      if (!syncChip || !syncText) return;

      if (typeof navigator !== "undefined" && navigator.onLine) {
        if (syncDot) {
          syncDot.classList.remove("offline");
          syncDot.classList.add("online");
        }
        syncText.textContent = "Đang trực tuyến";
        syncChip.setAttribute("title", "Đang kết nối mạng Internet");
      } else {
        if (syncDot) {
          syncDot.classList.remove("online");
          syncDot.classList.add("offline");
        }
        syncText.textContent = "Lưu cục bộ (Offline)";
        syncChip.setAttribute("title", "Đang ngoại tuyến - Dữ liệu học tập lưu an toàn trên iPad");
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("online", updateNetworkSyncStatus);
      window.addEventListener("offline", updateNetworkSyncStatus);
      updateNetworkSyncStatus();
    }

    // 5. Quản lý Service Worker và Cập Nhật Ứng Dụng (Update UX)
    let swRegistration = null;
    const topbarUpdateBtn = document.getElementById("topbarUpdateBtn");
    const updateBadge = document.getElementById("updateBadge");

    function notifyUpdateAvailable() {
      if (updateBadge) {
        updateBadge.style.display = "inline-block";
        updateBadge.textContent = "Có bản mới";
      }
      if (topbarUpdateBtn) {
        topbarUpdateBtn.classList.add("needs-update");
      }
    }

    if (topbarUpdateBtn) {
      topbarUpdateBtn.addEventListener("click", async () => {
        if (topbarUpdateBtn.disabled) return;
        topbarUpdateBtn.disabled = true;
        topbarUpdateBtn.setAttribute("aria-busy", "true");

        const icon = topbarUpdateBtn.querySelector(".update-icon");
        const text = topbarUpdateBtn.querySelector(".update-text");
        const liveNotice = document.getElementById("topbarUpdateLiveNotice");
        if (icon) icon.classList.add("spin");
        if (text) text.textContent = "Đang kiểm tra...";
        if (liveNotice) liveNotice.textContent = "Đang kiểm tra phiên bản cập nhật...";

        try {
          if (!swRegistration && "serviceWorker" in navigator) {
            swRegistration = await navigator.serviceWorker.getRegistration();
          }

          if (swRegistration) {
            await swRegistration.update();

            // Nếu đang cài đặt worker mới, chờ cho đến khi hoàn tất cài đặt
            if (swRegistration.installing) {
              const installingWorker = swRegistration.installing;
              await new Promise((resolve) => {
                installingWorker.addEventListener("statechange", () => {
                  if (installingWorker.state === "installed") resolve();
                });
                // Timeout phòng ngừa kẹt mạng tối đa 4s
                setTimeout(resolve, 4000);
              });
            }

            // Nếu có worker đang chờ được kích hoạt
            if (swRegistration.waiting) {
              if (text) text.textContent = "Đang áp dụng...";
              if (liveNotice) liveNotice.textContent = "Đang tải bài học mới và nạp lại...";
              swRegistration.waiting.postMessage({ type: "SKIP_WAITING" });
              return;
            }
          }

          // Xác nhận trạng thái sau khi đã hoàn tất kiểm tra
          if (icon) icon.classList.remove("spin");
          if (text) text.textContent = "✔ Đã mới nhất";
          if (liveNotice) liveNotice.textContent = "Ứng dụng đã là phiên bản mới nhất.";
          if (updateBadge) updateBadge.style.display = "none";
          topbarUpdateBtn.classList.remove("needs-update");
          setTimeout(() => {
            if (text) text.textContent = "Cập nhật";
          }, 1800);
        } catch (err) {
          console.warn("[SW] Update check error:", err);
          if (icon) icon.classList.remove("spin");
          if (text) text.textContent = "⚠️ Thử lại sau";
          if (liveNotice) liveNotice.textContent = "Không thể kiểm tra cập nhật. Vui lòng thử lại sau.";
          setTimeout(() => {
            if (text) text.textContent = "Cập nhật";
          }, 1800);
        } finally {
          topbarUpdateBtn.disabled = false;
          topbarUpdateBtn.removeAttribute("aria-busy");
        }
      });
    }

    // 6. Lắng nghe Hash Change cho Single Page Router
    window.addEventListener("hashchange", () => {
      navigate();
    });

    // Điều hướng tới route ban đầu
    await navigate();

    // 7. Đăng ký Service Worker cho chế độ Ngoại Tuyến (Offline-First PWA)
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").then((reg) => {
        swRegistration = reg;
        if (reg.waiting) {
          notifyUpdateAvailable();
        }
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                notifyUpdateAvailable();
              }
            });
          }
        });
      }).catch((err) => {
        console.warn("[PWA] Service worker registration failed:", err);
      });

      navigator.serviceWorker.addEventListener("controllerchange", () => {
        window.location.reload();
      });
    }

    console.log("[Ngan Learning Lab] Ứng dụng đã khởi động thành công!");
  } catch (err) {
    console.error("[Ngan Learning Lab] Lỗi khởi động ứng dụng:", err);
    const container = document.getElementById("app");
    if (container) {
      container.innerHTML = `
        <div style="padding: 30px; text-align: center; color: #dc2626;">
          <h2>⚠️ Không thể khởi động ứng dụng</h2>
          <p>${err.message}</p>
        </div>
      `;
    }
  }
}

// Bắt đầu khi DOM sẵn sàng
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
