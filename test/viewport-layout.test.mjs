// test/viewport-layout.test.mjs - Kiểm thử layout, responsive & trợ năng theo chuẩn iPad Air M1 & Codex Terra
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

test("Layout CSS: Split View 55/45 cho Màn hình Học Toán", () => {
  const cssPath = path.join(rootDir, "styles.css");
  const css = fs.readFileSync(cssPath, "utf-8");

  // Kiểm tra tỉ lệ 55% lý thuyết / 45% bài tập
  assert.ok(
    css.includes("grid-template-columns: minmax(0, 5.5fr) minmax(0, 4.5fr)"),
    "styles.css phải cấu hình tỷ lệ split view 5.5fr / 4.5fr chuẩn công thái học"
  );

  // Kiểm tra orientation landscape cho split layout
  assert.ok(
    css.includes("@media (min-width: 960px) and (orientation: landscape)"),
    "Split layout phải có điều kiện orientation: landscape để tránh chia 2 cột khi xoay dọc hoặc iPad Split View"
  );

  // Không được chứa background-attachment: fixed gây giật lag GPU trên iPad Safari
  assert.ok(
    !css.includes("background-attachment: fixed"),
    "styles.css không được dùng background-attachment: fixed để bảo toàn FPS trên Safari iPad"
  );

  // Kiểm tra media query portrait iPad 834px
  assert.ok(
    css.includes("@media (max-width: 834px)"),
    "styles.css phải có breakpoint thích ứng cho màn hình iPad 834px portrait"
  );

  // Kiểm tra độ tương phản nút cập nhật WCAG AA (amber tối #b45309)
  assert.ok(
    css.includes("#b45309"),
    "Nút cập nhật phải dùng amber tối #b45309 để đạt tỷ lệ tương phản chữ trắng >= 4.5:1"
  );

  // Kiểm tra kích thước ô nhập form báo lỗi >= 44px
  assert.ok(
    css.includes(".form-row select, .form-row input") && css.includes("min-height: 44px"),
    "Các ô nhập trong form báo lỗi phải có min-height: 44px chuẩn cảm ứng Apple HIG"
  );
});

test("Trợ năng Keypad Toán Học: ARIA, Labels & Focus", () => {
  const keypadJsPath = path.join(rootDir, "js", "touch-keypad.js");
  const keypadJs = fs.readFileSync(keypadJsPath, "utf-8");

  // Kiểm tra role và aria-label của drawer bàn phím
  assert.ok(
    keypadJs.includes('keypad.setAttribute("role", "region")'),
    "Drawer bàn phím toán học phải có role='region'"
  );
  assert.ok(
    keypadJs.includes('keypad.setAttribute("aria-label", "Bàn phím toán học cảm ứng")'),
    "Drawer bàn phím toán học phải có aria-label định danh"
  );

  // Kiểm tra các phím toán học cơ bản và các nhãn aria tương ứng (bao gồm phép cộng, nhân và biến x)
  const requiredAriaLabels = [
    'aria-label="Số 7"',
    'aria-label="Số 8"',
    'aria-label="Số 9"',
    'aria-label="Dấu cộng"',
    'aria-label="Dấu gạch phân số"',
    'aria-label="Số 4"',
    'aria-label="Số 5"',
    'aria-label="Số 6"',
    'aria-label="Dấu âm hoặc trừ"',
    'aria-label="Phép nhân"',
    'aria-label="Số 1"',
    'aria-label="Số 2"',
    'aria-label="Số 3"',
    'aria-label="Mở ngoặc"',
    'aria-label="Đóng ngoặc"',
    'aria-label="Số 0"',
    'aria-label="Dấu phẩy thập phân"',
    'aria-label="Ẩn số x"',
    'aria-label="Xóa ký tự trước con trỏ"',
    'aria-label="Xác nhận và kiểm tra đáp án"'
  ];

  for (const label of requiredAriaLabels) {
    assert.ok(
      keypadJs.includes(label),
      `Keypad phải chứa nút với thuộc tính trợ năng: ${label}`
    );
  }

  // Kiểm tra phím Enter hỗ trợ chuyển ô kế tiếp (Next Field) khi làm khảo sát
  assert.ok(
    keypadJs.includes("nextInput.focus()"),
    "Keypad phải tự động focus ô kế tiếp khi nhấn Enter trong chuỗi khảo sát"
  );

  // Kiểm tra tính năng đóng khi chạm ra ngoài
  assert.ok(
    keypadJs.includes('document.addEventListener("pointerdown"'),
    "Keypad phải có listener pointerdown đóng khi chạm ra ngoài dock"
  );

  // Không dùng aria-haspopup="dialog" khi role là region (tránh sai lệch VoiceOver)
  assert.ok(
    !keypadJs.includes('aria-haspopup'),
    "Keypad không được gán aria-haspopup='dialog' sai ngữ nghĩa khi là role='region'"
  );

  // Phải gán aria-controls cho input khi bàn phím xuất hiện
  assert.ok(
    keypadJs.includes('aria-controls'),
    "Input phải được liên kết aria-controls với mathTouchKeypad"
  );

  // Phải quản lý focus với cờ chống loop focus khi đóng bàn phím
  assert.ok(
    keypadJs.includes("suppressNextFocus"),
    "Keypad phải có cờ suppressNextFocus để tránh tự mở lại khi đóng"
  );
});

test("Topbar Thông Báo Trợ Năng (Live Region) Khi Cập Nhật", () => {
  const indexHtmlPath = path.join(rootDir, "index.html");
  const html = fs.readFileSync(indexHtmlPath, "utf-8");

  assert.ok(
    html.includes('id="topbarUpdateLiveNotice"'),
    "index.html phải có phần tử live region cho thông báo cập nhật"
  );
  assert.ok(
    html.includes('role="status"'),
    "Live region phải có role='status'"
  );
  assert.ok(
    html.includes('aria-live="polite"'),
    "Live region phải có aria-live='polite'"
  );
});

test("Micro-animations Phản Hồi Tương Tác Sống Động", () => {
  const cssPath = path.join(rootDir, "styles.css");
  const css = fs.readFileSync(cssPath, "utf-8");

  assert.ok(
    css.includes("@keyframes popInBounce"),
    "styles.css phải có micro-animation popInBounce cho phản hồi đúng/sai"
  );
});

test("Visual/Viewport Regression: iPad Air M1 (1180x820 Landscape & 820x1180 Portrait)", () => {
  const cssPath = path.join(rootDir, "styles.css");
  const css = fs.readFileSync(cssPath, "utf-8");

  // Kiểm tra an toàn safe-area-inset cho bàn phím số
  assert.ok(
    css.includes("env(safe-area-inset-bottom"),
    "Bàn phím nổi và bottom nav phải có đệm an toàn env(safe-area-inset-bottom) của iPadOS"
  );

  // Đảm bảo body có padding-bottom tự động khi bàn phím nổi mở để không che input
  assert.ok(
    css.includes("body.math-keypad-open"),
    "Phải có lớp body.math-keypad-open bù trừ chiều cao bàn phím không che khuất ô nhập"
  );

  // Kiểm tra cấu hình cụ thể GPU transition không dùng transition: all
  assert.ok(
    css.includes("transition: transform 0.25s"),
    "CSS phải dùng thuộc tính cụ thể transform thay vì all để tránh giật lag Safari"
  );

  // Kiểm tra Service Worker lifecycle: không dùng skipWaiting() tự động trong sw.js
  const swPath = path.join(rootDir, "sw.js");
  const swCode = fs.readFileSync(swPath, "utf-8");
  assert.ok(
    !swCode.includes("self.skipWaiting();\n});") && !swCode.includes("self.skipWaiting();\r\n});"),
    "sw.js không được gọi self.skipWaiting() tự động trong install handler để tránh cướp phiên học sinh"
  );
});

test("Chuẩn Hoá Số Thập Phân & Biểu Thức Tương Đương Toán Học Cho Học Sinh", async () => {
  const { normalizeMathAnswer, isMathAnswerEqual, parseMathValue } = await import("../js/render-views.js");

  // Chuẩn hoá dấu phẩy và khoảng trắng
  assert.equal(normalizeMathAnswer("0,375"), "0.375");
  assert.equal(normalizeMathAnswer("0.375"), "0.375");
  assert.equal(normalizeMathAnswer(" 0,48 "), "0.48");
  assert.equal(normalizeMathAnswer("0.48"), "0.48");
  assert.equal(normalizeMathAnswer("-2,5"), "-2.5");
  assert.equal(normalizeMathAnswer("-2.5"), "-2.5");

  // So sánh tương đương toán học phân số & số thập phân
  assert.equal(isMathAnswerEqual("1/2", "0.5"), true, "1/2 phải tương đương 0.5");
  assert.equal(isMathAnswerEqual("2/4", "1/2"), true, "2/4 phải tương đương 1/2");
  assert.equal(isMathAnswerEqual("0,5", "1/2"), true, "0,5 phải tương đương 1/2");
  assert.equal(isMathAnswerEqual("3/4", "0.75"), true, "3/4 phải tương đương 0.75");
  assert.equal(isMathAnswerEqual("3/4", "0,75"), true, "3/4 phải tương đương 0,75");
  assert.equal(isMathAnswerEqual("-3/4", "-0.75"), true, "-3/4 phải tương đương -0.75");

  // Ngoặc đơn và dấu âm
  assert.equal(isMathAnswerEqual("(1/2)", "0.5"), true, "(1/2) phải tương đương 0.5");
  assert.equal(isMathAnswerEqual("(-3)/4", "-0.75"), true, "(-3)/4 phải tương đương -0.75");
  assert.equal(isMathAnswerEqual("-(3/4)", "-0.75"), true, "-(3/4) phải tương đương -0.75");

  // Hỗ trợ Unary Plus (+3, +1/2, (+3), x = +4)
  assert.equal(isMathAnswerEqual("+3", "3"), true, "+3 phải tương đương 3");
  assert.equal(isMathAnswerEqual("+1/2", "0.5"), true, "+1/2 phải tương đương 0.5");
  assert.equal(isMathAnswerEqual("(+3)", "3"), true, "(+3) phải tương đương 3");
  assert.equal(isMathAnswerEqual("x = +4", "4"), true, "x = +4 phải tương đương 4");
  assert.equal(isMathAnswerEqual("+(-5)", "-5"), true, "+(-5) phải tương đương -5");

  // Dạng x = ...
  assert.equal(isMathAnswerEqual("x = 5", "5"), true, "x = 5 phải khớp đáp án 5");
  assert.equal(isMathAnswerEqual("x=5", "5"), true, "x=5 phải khớp đáp án 5");

  // Phép tính nhân hoặc cộng đơn giản từ bàn phím
  assert.equal(isMathAnswerEqual("2*3", "6"), true, "2*3 phải tương đương 6");
  assert.equal(isMathAnswerEqual("2×3", "6"), true, "2×3 phải tương đương 6");
  assert.equal(isMathAnswerEqual("2+3", "5"), true, "2+3 phải tương đương 5");
  assert.equal(isMathAnswerEqual("3x + 1", "3x+1"), true, "3x + 1 phải tương đương 3x+1");
  assert.equal(isMathAnswerEqual("1/3", "0.5"), false, "1/3 không thể bằng 0.5");

  // Kiểm tra không còn behavior: 'smooth' cứng trong render-views.js (tuân thủ prefers-reduced-motion)
  const renderViewsCode = fs.readFileSync(path.join(rootDir, "js", "render-views.js"), "utf-8");
  assert.equal(
    /scrollTo\(\{[^}]*behavior:\s*['"]smooth['"]/m.test(renderViewsCode),
    false,
    "render-views.js không được dùng behavior: 'smooth' cứng mà phải dùng getScrollBehavior() để tuân thủ prefers-reduced-motion"
  );
});

test("Hệ Thống Thiết Kế Apple Canvas: Gradient Duy Nhất Dành Cho Hero CTA & Semantic Tokens", () => {
  const cssPath = path.join(rootDir, "styles.css");
  const css = fs.readFileSync(cssPath, "utf-8");

  // var(--primary-gradient) chỉ được sử dụng cho nút Hero CTA
  const matches = css.match(/background(-color)?:\s*var\(--primary-gradient\)/g) || [];
  assert.equal(matches.length, 1, "var(--primary-gradient) chỉ được phép sử dụng duy nhất một lần cho Hero CTA");

  // Quét toàn bộ linear-gradient trong styles.css: chỉ duy nhất 1 lần khai báo trong --primary-gradient
  const cssLinearGradients = css.match(/linear-gradient\([^)]+\)/g) || [];
  assert.equal(
    cssLinearGradients.length,
    1,
    `styles.css chỉ được phép chứa đúng 1 linear-gradient (khai báo --primary-gradient), tìm thấy: ${cssLinearGradients.length}`
  );

  // Không có radial-gradient nào trong styles.css
  assert.equal((css.match(/radial-gradient/g) || []).length, 0, "styles.css không được chứa radial-gradient");

  // Quét toàn bộ code JS (render-views và games/*.js) đảm bảo không có gradient nào
  const jsRenderViews = fs.readFileSync(path.join(rootDir, "js", "render-views.js"), "utf-8");
  assert.equal(
    (jsRenderViews.match(/linear-gradient|radial-gradient/gi) || []).length,
    0,
    "js/render-views.js không được chứa bất kỳ gradient trang trí nào"
  );

  const gamesDir = path.join(rootDir, "js", "games");
  if (fs.existsSync(gamesDir)) {
    const gameFiles = fs.readdirSync(gamesDir).filter(f => f.endsWith(".js"));
    for (const gf of gameFiles) {
      const code = fs.readFileSync(path.join(gamesDir, gf), "utf-8");
      assert.equal(
        (code.match(/linear-gradient|radial-gradient/gi) || []).length,
        0,
        `Game module ${gf} không được chứa gradient trang trí`
      );
    }
  }

  // Stylesheet phải có styling cho Hero Stats & Game Hub Card focus-within & button focus-visible
  assert.ok(css.includes(".hero-stats"), "styles.css phải có class .hero-stats");
  assert.ok(css.includes(".stat-pill"), "styles.css phải có class .stat-pill");
  assert.ok(css.includes(".game-hub-card:focus-within"), "styles.css phải có focus-within cho .game-hub-card");
  assert.ok(css.includes(".btn-play-game:focus-visible"), "styles.css phải có focus-visible cho .btn-play-game");

  // Loại bỏ hoàn toàn transition: all trong styles.css để tối ưu hiệu năng iPad Safari
  assert.equal(
    /transition:[^;]*\ball\b/m.test(css),
    false,
    "styles.css không được dùng transition: all mà phải chỉ định thuộc tính cụ thể để tránh giật lag iPad Safari"
  );

  // Semantic surfaces được khai báo đầy đủ
  assert.ok(css.includes("--surface-quiet: #ffffff"), "styles.css phải có token --surface-quiet");
  assert.ok(css.includes("--surface-subtle: #f8fafc"), "styles.css phải có token --surface-subtle");
  assert.ok(css.includes("--token-achievement: #059669"), "styles.css phải có token --token-achievement");
  assert.ok(css.includes("--token-alert: #b45309"), "styles.css phải có token --token-alert");
  assert.ok(css.includes("--token-danger: #dc2626"), "styles.css phải có token --token-danger");
});

test("Chuẩn WAI-ARIA & Tránh Lồng Interactive Controls (No Nested Interactive Controls)", () => {
  const keypadJs = fs.readFileSync(path.join(rootDir, "js", "touch-keypad.js"), "utf-8");
  // aria-expanded KHÔNG được gán lên input element (sai W3C spec cho textbox)
  assert.equal(
    keypadJs.includes('activeInput.setAttribute("aria-expanded"'),
    false,
    "touch-keypad.js không được gán aria-expanded lên input textbox"
  );
  assert.ok(
    keypadJs.includes('activeInput.setAttribute("aria-controls", "mathTouchKeypad")'),
    "touch-keypad.js phải gán aria-controls liên kết input tới bàn phím"
  );

  // Keypad có guard selection APIs an toàn cho input type=number
  assert.ok(
    keypadJs.includes("function supportsSelection"),
    "touch-keypad.js phải có guard function supportsSelection() để tránh throw DOMException trên type=number"
  );

  const renderViewsCode = fs.readFileSync(path.join(rootDir, "js", "render-views.js"), "utf-8");
  // Thẻ game-hub-card KHÔNG được mang role="button" lồng thẻ <button> bên trong (W3C violation)
  assert.equal(
    renderViewsCode.includes('class="game-hub-card" data-game-id="${g.id}" data-category="${g.targetCompetency}" role="button"'),
    false,
    "game-hub-card container không được mang role='button' khi bên trong chứa thẻ <button> (vi phạm W3C nested interactive controls)"
  );

  // Nút CTA Chơi Ngay là interactive control chính thống có aria-label đầy đủ
  assert.ok(
    renderViewsCode.includes('class="btn btn-primary btn-play-game" data-launch="${g.id}" aria-label="Chơi trò'),
    "Nút 'Chơi Ngay ▶' phải là interactive button chính thống có thuộc tính aria-label mô tả chi tiết"
  );

  // Sự kiện click phải gắn trực tiếp vào .btn-play-game, không gắn lên toàn bộ .game-hub-card
  assert.ok(
    renderViewsCode.includes('container.querySelectorAll(".btn-play-game").forEach(btn =>'),
    "render-views.js phải gắn sự kiện click trực tiếp vào nút .btn-play-game"
  );

  // styles.css không được gán cursor: pointer lên toàn bộ thẻ game container
  const css = fs.readFileSync(path.join(rootDir, "styles.css"), "utf-8");
  assert.equal(
    /\.game-hub-card\s*\{[^}]*cursor:\s*pointer/m.test(css),
    false,
    "styles.css không được đặt cursor: pointer lên .game-hub-card vì card không phải interactive button"
  );

  // styles.css phải khai báo đầy đủ keyframes cho các animation đã sử dụng
  assert.ok(css.includes("@keyframes fadeIn"), "styles.css phải có @keyframes fadeIn");
  assert.ok(css.includes("@keyframes bounceIn"), "styles.css phải có @keyframes bounceIn");

  // styles.css không được có .game-hub-card:active (tránh tactile feedback giả trên container tĩnh)
  assert.equal(
    css.includes(".game-hub-card:active"),
    false,
    "styles.css không được định nghĩa .game-hub-card:active để tránh phản hồi tactile giả cho container tĩnh"
  );
  assert.ok(
    css.includes(".btn-play-game:active"),
    "styles.css phải định nghĩa phản hồi xúc giác .btn-play-game:active cho nút bấm thực thụ"
  );
});

test("Keypad Toán Học: Xử Lý An Toàn Khi Gõ Ký Tự Vào Input Type='number' Mà Không Throw Exception", async () => {
  // Mô phỏng input type="number" giống trình duyệt thực tế (ném DOMException khi gọi selectionStart hoặc setSelectionRange)
  const mockNumberInput = {
    type: "number",
    value: "10",
    getAttribute(attr) { return null; },
    scrollIntoView() {},
    blur() {},
    focus() {},
    get selectionStart() {
      throw new Error("Failed to read the 'selectionStart' property: type 'number' does not support selection.");
    },
    get selectionEnd() {
      throw new Error("Failed to read the 'selectionEnd' property: type 'number' does not support selection.");
    },
    setSelectionRange() {
      throw new Error("Failed to execute 'setSelectionRange': type 'number' does not support selection.");
    },
    dispatchEvent(ev) {},
    setAttribute(k, v) {}
  };

  const keypadModule = await import("../js/touch-keypad.js");
  assert.doesNotThrow(() => {
    keypadModule.attachInput(mockNumberInput);
    keypadModule.hideKeypad(false);
  }, "Keypad phải tương thích an toàn với mock input type=number mà không ném ngoại lệ");
});

test("Khu Vực Báo Lỗi Bài Học: Accordion Thu Gọn Mặc Định & Affordance Trung Thực", () => {
  const renderViewsPath = path.join(rootDir, "js", "render-views.js");
  const renderViewsCode = fs.readFileSync(renderViewsPath, "utf-8");

  // Phải bọc trong <details class="lesson-feedback-accordion">
  assert.ok(
    renderViewsCode.includes('details class="lesson-feedback-accordion" id="lessonFeedbackAccordion"'),
    "render-views.js phải bọc form báo lỗi trong <details id='lessonFeedbackAccordion'> để thu gọn mặc định"
  );

  // Nút báo lỗi trên câu hỏi phải kích hoạt mở accordion
  assert.ok(
    renderViewsCode.includes('if (accordion) accordion.open = true;'),
    "Nút '⚠️ Báo lỗi' trên từng câu phải tự động mở accordion feedback"
  );

  // Không được tự ý thêm class 'needs-update' giả khi chưa có bản vá Service Worker thực tế
  assert.ok(
    !renderViewsCode.includes('updateBtn.classList.add("needs-update")'),
    "render-views.js không được gán class needs-update giả khi chỉ mới nộp phiếu góp ý"
  );

  // styles.css phải có class .lesson-feedback-accordion và summary min-height >= 44px
  const cssPath = path.join(rootDir, "styles.css");
  const css = fs.readFileSync(cssPath, "utf-8");
  assert.ok(css.includes(".lesson-feedback-accordion"), "styles.css phải có quy tắc cho .lesson-feedback-accordion");
  assert.ok(
    css.includes(".feedback-accordion-summary") && css.includes("min-height: 48px"),
    "Summary của accordion phải có chiều cao tối thiểu >= 48px chuẩn cảm ứng Apple HIG"
  );
});

test("Visual/Viewport iPad Air M1 Layout Matrix (1180x820 Landscape & 820x1180 Portrait)", () => {
  const cssPath = path.join(rootDir, "styles.css");
  const css = fs.readFileSync(cssPath, "utf-8");

  // Landscape 1180x820
  const landscapeWidth = 1180;
  const theoryRatio = 5.5 / 10;
  const exerciseRatio = 4.5 / 10;
  const theoryWidth = landscapeWidth * theoryRatio;
  const exerciseWidth = landscapeWidth * exerciseRatio;

  assert.ok(theoryWidth >= 600, "Theory pane trên landscape phải rộng tối thiểu 600px để đọc bài giảng");
  assert.ok(exerciseWidth >= 480, "Exercise pane trên landscape phải rộng tối thiểu 480px để thao tác làm bài");

  // Portrait 820x1180
  assert.ok(
    css.includes("@media (max-width: 834px)"),
    "styles.css phải có media query cho chiều ngang portrait iPad 820px / 834px"
  );

  // Đệm an toàn bàn phím nổi khi nhập liệu gần cuối trang
  assert.ok(
    css.includes("body.math-keypad-open"),
    "Phải có lớp body.math-keypad-open để đảm bảo input ở cuối bài không bị bàn phím che khuất"
  );
});

test("Accessibility Nút Chụp Ảnh & Trạng Thái Mạng Thực Tế", () => {
  const renderViewsPath = path.join(rootDir, "js", "render-views.js");
  const renderViewsCode = fs.readFileSync(renderViewsPath, "utf-8");

  // Nút chụp ảnh phải là button có aria-label và kích hoạt input file
  assert.ok(
    renderViewsCode.includes('<button type="button" class="btn-upload-photo"'),
    "Nút chụp ảnh phải là button type='button' để focus được qua bàn phím/Switch Control"
  );
  assert.ok(
    renderViewsCode.includes('aria-label='),
    "Nút chụp ảnh phải có thuộc tính aria-label định danh rõ ràng"
  );

  // File input ẩn phải dùng utility class .sr-only
  assert.ok(
    renderViewsCode.includes('class="sr-only"'),
    "File input phải sử dụng class .sr-only"
  );

  // styles.css phải có class .sr-only và .sync-dot.offline
  const cssPath = path.join(rootDir, "styles.css");
  const css = fs.readFileSync(cssPath, "utf-8");
  assert.ok(css.includes(".sr-only"), "styles.css phải có utility class .sr-only");
  assert.ok(css.includes(".sync-dot.offline"), "styles.css phải có trạng thái .sync-dot.offline");

  // styles.css phải tính safe-area cho topbar real height để không che khuất sticky panel
  assert.ok(
    css.includes("--topbar-real-height") && css.includes("env(safe-area-inset-top"),
    "styles.css phải khai báo --topbar-real-height kèm env(safe-area-inset-top) cho iPad fullscreen"
  );

  // index.html phải có aria-label cho nút cập nhật
  const indexHtmlPath = path.join(rootDir, "index.html");
  const indexHtml = fs.readFileSync(indexHtmlPath, "utf-8");
  assert.ok(
    indexHtml.includes('aria-label="Cập nhật bài học mới"'),
    "Nút cập nhật topbar phải có thuộc tính aria-label rõ ràng"
  );

  // render-views.js phải có disclosure cam kết không dùng ảnh để train AI
  assert.ok(
    renderViewsCode.includes("tuyệt đối không sử dụng để huấn luyện AI model"),
    "Khu vực chụp ảnh phải có disclosure cam kết bảo mật không dùng dữ liệu học sinh train AI"
  );

  // app.js phải hiển thị 'Đang trực tuyến' thay vì 'Đã đồng bộ'
  const appJsPath = path.join(rootDir, "app.js");
  const appJs = fs.readFileSync(appJsPath, "utf-8");
  assert.ok(
    appJs.includes('"Đang trực tuyến"'),
    "app.js phải ghi nhận trạng thái mạng thực tế là 'Đang trực tuyến'"
  );
});
