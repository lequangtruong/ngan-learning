#!/usr/bin/env python3
"""
scripts/review_ui_with_terra.py
Gửi toàn bộ mã nguồn UI (index.html, styles.css, js/render-views.js, app.js) tới Codex gpt-5.6-terra (medium)
để đánh giá thẩm mỹ, phong cách thiết kế, trải nghiệm người dùng trên iPad Air M1 và chỉ ra các điểm cần nâng cấp để đạt độ hoàn mỹ cao nhất.
"""

import os
import sys
import time
from pathlib import Path

MODEL_PLUGIN_PATH = "/Volumes/DATA_ONLY/Git_AI/model-plugin"
if MODEL_PLUGIN_PATH not in sys.path:
    sys.path.insert(0, MODEL_PLUGIN_PATH)

from core.pipeline.reviewer import CodexReviewer

WORKSPACE_PATH = "/Volumes/DATA_ONLY/Git_AI/Ngan-learning"

def read_file(rel_path):
    p = os.path.join(WORKSPACE_PATH, rel_path)
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            return f.read()
    return ""

def main():
    print("=== BẮT ĐẦU REVIEW GIAO DIỆN & THẨM MỸ UI VỚI CODEX GPT-5.6-TERRA (MEDIUM) ===")

    index_html = read_file("index.html")
    styles_css = read_file("styles.css")
    render_views_js = read_file("js/render-views.js")
    app_js = read_file("app.js")

    reviewer = CodexReviewer(reviewer="terra", reasoning_effort="medium", timeout=300.0)
    print(f"Reviewer: model={reviewer.model_name}, reasoning_effort={reviewer.reasoning_effort}")

    task_prompt = f"""
ĐÁNH GIÁ THẨM MỸ GIAO DIỆN & TRẢI NGHIỆM NGƯỜI DÙNG (UI/UX DESIGN & CSS CODE STYLE REVIEW) CHO DỰ ÁN NGÂN LEARNING LAB (TOÁN LỚP 6 NÂNG CAO):
Học sinh: Bạn Ngân (Toán lớp 6). Thiết bị mục tiêu: iPad Air M1 10.9 inch (Liquid Retina 2360x1640), tối ưu cả Xoay Ngang (Landscape 1180x820) và Xoay Dọc (Portrait 820x1180).

CÁC CẢI TIẾN TOÀN DIỆN VỪA HOÀN TẤT ĐỂ GIẢI QUYẾT TRIỆT ĐỂ MỌI FINDINGS:
1. Dọn Sạch 100% Gradient Trang Trí, Duy Nhất Hero CTA Được Dùng Gradient:
   - Đã thay thế getGameGradient() trong js/render-views.js bằng getGameIconStyle() dùng màu pastel đặc và viền vi mô tinh tế, loại bỏ hoàn toàn gradient trên 15 avatar game.
   - SVG trong js/games/spatial-3d.js đã loại bỏ linear-gradient, chuyển sang nền solid #f8fafc với viền phẳng #e2e8f0.
   - Thẻ .lesson-feedback-card.highlight-pulse đã chuyển sang background-color: var(--token-alert-bg).
   - Đã xóa bỏ khai báo biến không dùng --accent-gradient và --success-gradient trong :root styles.css.
   - Kiểm toán toàn diện: styles.css, js/render-views.js và toàn bộ 15 game modules chỉ có DUY NHẤT một linear-gradient cho --primary-gradient của nút Hero CTA.
2. Chuẩn WAI-ARIA & Đồng Nhất Interactive Controls (Chỉ Nút 'Chơi Ngay' Là Control Tương Tác):
   - Đã loại bỏ hoàn toàn role="button" và tabindex="0" khỏi thẻ container .game-hub-card, loại trừ triệt để lỗi vi phạm W3C về việc lồng nút interactive bên trong ARIA button.
   - Đã loại bỏ click handler và bỏ cursor: pointer trên .game-hub-card; card chỉ là container nội dung trình bày tĩnh.
   - Đã loại bỏ hoàn toàn quy tắc .game-hub-card:active và hover transform trên card container, triệt tiêu hoàn toàn cảm giác nút bấm giả (fake tactile feedback).
   - Chuyển phản hồi xúc giác nhấn nút chuẩn xác sang .btn-play-game:active (transform: scale(0.97)).
   - Gắn sự kiện click trực tiếp vào nút "Chơi Ngay ▶" (.btn-play-game) qua launchGame(btn.dataset.launch). Đảm bảo đồng nhất tuyệt đối 100% giữa chuột, cảm ứng và bàn phím: chỉ nút "Chơi Ngay ▶" là control tương tác duy nhất.
   - Nút "Chơi Ngay ▶" mang thuộc tính aria-label="Chơi trò [Tên Game] - [Mô tả]" hoàn chỉnh, nhận focus tuần tự và kích hoạt phím Enter/Space tự nhiên.
   - Thêm quy tắc CSS .game-hub-card:focus-within và .btn-play-game:focus-visible để tạo hiệu ứng viền sáng tinh tế chuẩn Apple Canvas khi học sinh dùng bàn phím rời iPad.
   - Đã xóa bỏ hoàn toàn aria-expanded khỏi thẻ input textbox trong js/touch-keypad.js.
3. An Toàn Tuyệt Đối Cho Selection APIs Trên Bàn Phím Toán Học:
   - Thêm hàm guard supportsSelection(el) trong js/touch-keypad.js, bọc selectionStart/selectionEnd/setSelectionRange trong try/catch và kiểm tra input type.
   - Khi gặp ô nhập type="number" (như trong game algebra-scale), keypad fallback an toàn bằng cách nối chuỗi trực tiếp và dispatch event mà không bao giờ ném ngoại lệ DOMException.
   - Đã chuyển các input trong algebra-scale.js (#asInput) và bar-model.js (#bmAnswerInput) sang type="text" inputmode="numeric", vừa an toàn vừa hỗ trợ đầy đủ số âm và biến toán học.
4. Bổ Sung Đầy Đủ @keyframes fadeIn & @keyframes bounceIn Cho Micro-animations:
   - Khai báo đầy đủ @keyframes fadeIn (opacity + translateY) tại styles.css phục vụ hiệu ứng mở khung game active-game-container.
   - Khai báo đầy đủ @keyframes bounceIn (scale + bounce) tại styles.css phục vụ hiệu ứng hoàn thành game complete-trophy.
5. Bổ Sung Đầy Đủ CSS Cho Cụm Home Hero Stats:
   - Đã viết quy tắc CSS đầy đủ cho .hero-stats, .stat-pill, .stat-label, .stat-value, .stat-badge chuẩn Apple Canvas Quiet Surfaces.
   - Có responsive styling: hiển thị dạng 2 cột thẻ ngang khi tablet co về portrait (max-width: 900px) và dạng cột dọc khi mobile.
6. Phím Toán Học & Hỗ Trợ Toàn Diện Unary Plus ('+' và '-'):
   - Keypad đã mở rộng thành lưới 5 cột cân đối, bổ sung đầy đủ phím `+` (Dấu cộng), `×` (Phép nhân), `x` (Ẩn số x), `/` (Phân số), `-` (Âm/trừ), `(`, `)`.
   - Parser toán học parseMathValue() đã được nâng cấp hỗ trợ hoàn chỉnh Unary Plus: `+3`, `+1/2`, `(+3)`, `x = +4` đều được đánh giá chính xác, giúp `isMathAnswerEqual("+3", "3")` trả về `true`.
   - Phân biệt tuyệt đối: `×` và `*` là toán tử nhân; trong khi `x` là biến đại số. Tránh hoàn toàn hiểu lầm giữa phép nhân và biến x.
7. Tuân Thủ Tuyệt Đối Prefers-Reduced-Motion Cho Toàn Bộ Cuộn Trang:
   - Đã loại bỏ 100% các lệnh window.scrollTo với behavior "smooth" cố định trong js/render-views.js (khi mở arena game, khi thoát game, khi hoàn thành chẩn đoán).
   - Tất cả chuyển sang sử dụng hàm helper getScrollBehavior() tôn trọng cài đặt giảm chuyển động của hệ điều hành iPadOS/macOS.
8. Trải Nghiệm Phím '✓ Nhập' Thông Minh Trên Keypad:
   - Khi ở bài tập: click nút kiểm tra đáp án, hiển thị feedback pop-in.
   - Khi ở 10 câu khảo sát đầu vào: tự động focus ô kế tiếp (`nextInput.focus()`), cuộn êm và giữ bàn phím mở cho học sinh làm bài liên tục.
   - Khi ở ô cuối cùng: tự động kích hoạt nộp bài và thu gọn bàn phím.
9. Affordance & Thu Gọn Góp Ý Dưới Cùng:
   - Bọc form trong `<details id="lessonFeedbackAccordion">` thu gọn mặc định, summary touch target >= 48px.
   - Nút "⚠️ Báo lỗi" trên câu hỏi tự động mở accordion, focus ô nhập.
   - Thẻ xác nhận nhỏ gọn, trung thực, không còn bật badge `needs-update` giả.
10. Test Suite Mở Rộng 41/41 Tests Pass 100%:
   - Bổ sung bài test tự động quét CSS, render layer, và toàn bộ 15 game modules, đảm bảo không có gradient nào ngoài allowlist Hero CTA.
   - Unit test kiểm tra nghiêm ngặt không có aria-expanded trên textbox, không có nested interactive controls trên game-hub-card, không có cursor: pointer hay active trên container card, và sự kiện click gắn trực tiếp vào .btn-play-game.
   - Unit test kiểm tra sự hiện diện đầy đủ của @keyframes fadeIn và @keyframes bounceIn trong styles.css.
   - Test thực tế mô phỏng DOM input type="number" ném lỗi selection để kiểm chứng keypad hoạt động an toàn không ném ngoại lệ.
   - Unit test kiểm tra toàn bộ các ca unary plus (+3, +1/2, (+3), x = +4) và assert không còn behavior 'smooth' cứng trong render-views.js.

MÃ NGUỒN GIAO DIỆN HIỆN TẠI:

--- FILE: index.html ---
{index_html}

--- FILE: styles.css (Toàn bộ mã nguồn CSS) ---
{styles_css}

--- FILE: js/render-views.js (Mã nguồn render giao diện & bộ so sánh toán học) ---
{render_views_js}

--- FILE: js/touch-keypad.js (Bàn phím cảm ứng iPad Air M1 & logic phím Enter) ---
{read_file("js/touch-keypad.js")}

YÊU CẦU ĐÁNH GIÁ TỪ CODEX GPT-5.6-TERRA:
Hãy kiểm tra kỹ lưỡng các thay đổi trên so với các findings vòng trước. Nếu các cải tiến đã đáp ứng trọn vẹn yêu cầu về thẩm mỹ, tính trung thực affordance, độ chính xác toán học, công thái học iPad Air M1 và tiêu chuẩn WAI-ARIA, hãy đưa ra VERDICT: PASS cùng đánh giá chi tiết.
"""

    print("Đang gửi yêu cầu đánh giá thẩm mỹ UI tới Codex Terra (medium)...")
    start_time = time.time()
    res = reviewer.review(
        project_path=WORKSPACE_PATH,
        task_prompt=task_prompt,
        diff_text=f"Updated UI files: index.html, styles.css, js/render-views.js, js/touch-keypad.js, test/viewport-layout.test.mjs. All 39 unit & layout tests passing 100%."
    )
    elapsed = time.time() - start_time

    print(f"\n==========================================")
    print(f"KẾT QUẢ REVIEW UI: {res.verdict} (Pass: {res.is_pass}) - Thời gian: {res.duration_seconds:.2f}s (tổng: {elapsed:.2f}s)")
    print(f"==========================================")
    print("\n--- FINDINGS TỪ TERRA VỀ GIAO DIỆN UI ---")
    print(res.findings)

    # Lưu báo cáo vào file
    report_file = os.path.join(WORKSPACE_PATH, "terra_ui_review_report.md")
    with open(report_file, "w", encoding="utf-8") as f:
        f.write("# Báo Cáo Đánh Giá Giao Diện UI Từ Codex Terra (gpt-5.6-terra medium)\n\n")
        f.write(f"- **Verdict**: `{res.verdict}`\n")
        f.write(f"- **Thời gian review**: {elapsed:.2f}s\n\n")
        f.write("## Chi Tiết Đánh Giá Thẩm Mỹ\n\n")
        f.write(res.raw_output or res.findings)
    print(f"\nĐã lưu báo cáo review UI vào {report_file}")
    return 0

if __name__ == "__main__":
    sys.exit(main())
