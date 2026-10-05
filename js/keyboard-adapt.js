// js/keyboard-adapt.js - Bảo toàn trải nghiệm iPad Air M1 khi xoay màn hình & chống che khuất

let scrollTimeout = null;

export function initKeyboardAndOrientationAdaptation() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  // 1. Tự động cuộn ô nhập liệu vào vùng thoải mái (Comfort Zone) khi focus
  document.addEventListener("focusin", (e) => {
    const target = e.target;
    if (!target || !target.tagName) return;

    const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA";
    if (!isInput) return;

    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      scrollInputIntoComfortZone(target);
    }, 280);
  });

  // 2. Bảo toàn trạng thái khi xoay màn hình (Orientation Change)
  const orientationMedia = window.matchMedia("(orientation: landscape)");
  const handleOrientationChange = () => {
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) {
      setTimeout(() => {
        scrollInputIntoComfortZone(activeEl);
      }, 350);
    }
  };

  if (orientationMedia.addEventListener) {
    orientationMedia.addEventListener("change", handleOrientationChange);
  } else if (orientationMedia.addListener) {
    orientationMedia.addListener(handleOrientationChange);
  }

  // Lắng nghe visualViewport thay đổi kích thước trên Safari iOS
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", () => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) {
        scrollInputIntoComfortZone(activeEl);
      }
    });
  }
}

function getScrollBehavior() {
  return (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) ? "auto" : "smooth";
}

export function scrollInputIntoComfortZone(element) {
  if (!element || typeof element.getBoundingClientRect !== "function") return;

  try {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    const targetTop = viewportHeight * 0.28; // Giữ ở khoảng 28% từ đỉnh màn hình xuống

    const currentScrollY = window.scrollY || window.pageYOffset;
    const deltaY = rect.top - targetTop;

    if (Math.abs(deltaY) > 20) {
      window.scrollTo({
        top: currentScrollY + deltaY,
        behavior: getScrollBehavior()
      });
    }
  } catch {
    // Fallback an toàn
    element.scrollIntoView({ behavior: getScrollBehavior(), block: "center" });
  }
}
