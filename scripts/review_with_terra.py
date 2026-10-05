#!/usr/bin/env python3
"""
scripts/review_with_terra.py
Chạy review kiến trúc và mã nguồn dự án Ngân Learning Lab bằng Codex gpt-5.6-terra (reasoning_effort: medium).
"""

import os
import sys
import time
import subprocess
from pathlib import Path

# Thêm model-plugin vào sys.path
MODEL_PLUGIN_PATH = "/Volumes/DATA_ONLY/Git_AI/model-plugin"
if MODEL_PLUGIN_PATH not in sys.path:
    sys.path.insert(0, MODEL_PLUGIN_PATH)

from core.pipeline.reviewer import CodexReviewer

WORKSPACE_PATH = "/Volumes/DATA_ONLY/Git_AI/Ngan-learning"
SPEC_PATH = "/Users/truong/.gemini/antigravity-ide/brain/b45735db-6364-4c6a-bdfc-2ce0030a52c2/ngan_math_learning_master_plan.md"

def get_git_status_and_diff():
    try:
        status = subprocess.check_output(["git", "status", "--short"], cwd=WORKSPACE_PATH, text=True)
        diff = subprocess.check_output(["git", "diff"], cwd=WORKSPACE_PATH, text=True)
        return status, diff
    except Exception as e:
        return "", f"Error getting git diff: {e}"

def main():
    print("=== BẮT ĐẦU REVIEW DỰ ÁN NGÂN LEARNING LAB VỚI CODEX GPT-5.6-TERRA (MEDIUM) ===")
    
    # 1. Đọc nội dung master plan
    spec_content = ""
    if os.path.exists(SPEC_PATH):
        with open(SPEC_PATH, "r", encoding="utf-8") as f:
            spec_content = f.read()
    else:
        print(f"Lỗi: Không tìm thấy file plan tại {SPEC_PATH}")
        return 1

    # 2. Khởi tạo reviewer Codex Terra với reasoning_effort: medium
    reviewer = CodexReviewer(reviewer="terra", reasoning_effort="medium", timeout=300.0)
    print(f"Reviewer: model={reviewer.model_name}, reasoning_effort={reviewer.reasoning_effort}")

    # 3. Lấy git diff & status
    git_status, git_diff = get_git_status_and_diff()

    task_prompt = f"""
Đánh giá kiến trúc chi tiết cho dự án NGÂN LEARNING LAB (Toán Lớp 6 Nâng Cao & Tinh Gọn 24 Tuần):
Hệ thống học toán cá nhân hóa chuyên sâu cho Ngân (chuẩn bị & đang học lớp 6), độ khó nâng cao hơn Bách, tối ưu cho iPad Air M1 10.9" cả 2 chiều Ngang (Landscape) & Dọc (Portrait).

BẢN THIẾT KẾ KẾ HOẠCH TỔNG THỂ (MASTER PLAN):
{spec_content}

YÊU CẦU ĐÁNH GIÁ CHUYÊN SÂU TỪ REVIEWER (CODEX GPT-5.6-TERRA MEDIUM):
1. Tính sư phạm & Độ chuẩn xác theo Chương trình GDPT 2018 Toán 6:
   - Lộ trình 24 tuần (10 chuyên đề cốt lõi) có bám sát và bao quát đầy đủ các trọng tâm của lớp 6 không? (Tập hợp, Lũy thừa, Ước-Bội-ƯCLN-BCNN, Số nguyên Z âm-dương, Phân số mở rộng, Hình học trực quan đối xứng, Thống kê xác suất).
   - 3 tuần đầu củng cố bảng cửu chương nhẩm siêu tốc và phân số tiểu học có đủ vững để làm bệ phóng cho lớp 6 không?
   - Độ khó nâng cao và các dạng bài Olympic (TIMO/SASMO) có vừa sức và kích thích tư duy học sinh khá-giỏi không?

2. Tối ưu UX/UI iPad Air M1 10.9-inch (Dual-Orientation Landscape & Portrait):
   - Thiết kế thích ứng 2 chiều: Landscape (Split-view 2 cột 55-45) và Portrait (Single-column vertical flow với bàn phím Docked Sheet trượt đáy) đã tối ưu công thái học chưa?
   - Bàn phím số Toán học cảm ứng (Custom Math Keypad có số âm `-`, phân số `/`, biến `x`) có giải quyết triệt để vấn đề bàn phím ảo iOS che khuất màn hình không?
   - Bảo toàn trạng thái 100% khi xoay màn hình (orientation change preservation) đã được tính toán kỹ chưa?

3. Tính năng Chụp Ảnh Bài Giải & AI Vision Phân Tích Đúng/Sai Từng Bước:
   - Quy trình nén ảnh bằng Hardware Canvas (Apple M1 GPU) xuống JPEG ~300KB có thực sự bảo vệ RAM và chống crash Safari không?
   - Bảng phân tích đúng/sai từng dòng (Line-by-line Verdict ✔/✘), chỉ rõ bản chất lỗi sai và cho phép nộp lại (Resubmit) có đáp ứng tính sư phạm sâu sắc không?

4. Cổng Phụ Huynh Báo Lỗi & Cơ Chế Tự Sửa Code (AI Self-Healing Prompt):
   - Cơ chế tự động ghi nhận bối cảnh (ngày giờ, tuần, bài học, mã câu hỏi) và nút "Xuất lệnh sửa code cho AI" có chuẩn xác và khả thi cho workflow AI Pair Programming không?

5. Hệ sinh thái 8 Trò chơi Toán 6 có tính điểm Năng lực MQI:
   - Bộ 8 game (Speed Math 6.0, Tàu Ngầm Số Nguyên Z, Thợ Săn Số Nguyên Tố, Đấu Trường Phân Số, Cân Đại Số x, Spot the Bug 6.0, Symmetry Mirror Lab, Make Target Pro) đã phủ trọn vẹn 5 trục năng lực chưa?
"""

    print("Đang gửi toàn bộ yêu cầu review tới Codex Terra (medium)... Quá trình này có thể mất 30-90 giây do reasoning sâu.")
    start_time = time.time()
    res = reviewer.review(
        project_path=WORKSPACE_PATH,
        task_prompt=task_prompt,
        diff_text=git_diff or "(Chưa có git diff code lớn, đang review bản thiết kế master plan chi tiết)"
    )
    elapsed = time.time() - start_time

    print(f"\n==========================================")
    print(f"KẾT QUẢ REVIEW: {res.verdict} (Pass: {res.is_pass}) - Thời gian: {res.duration_seconds:.2f}s (tổng: {elapsed:.2f}s)")
    print(f"==========================================")
    print("\n--- TÓM TẮT FINDINGS TỪ TERRA ---")
    print(res.findings)

    # Lưu báo cáo vào file
    report_file = os.path.join(WORKSPACE_PATH, "terra_review_report.md")
    with open(report_file, "w", encoding="utf-8") as f:
        f.write(f"# Báo Cáo Đánh Giá Kiến Trúc Từ Codex Terra (gpt-5.6-terra medium)\n\n")
        f.write(f"- **Dự án**: Ngân Learning Lab (Toán Lớp 6)\n")
        f.write(f"- **Reviewer Model**: `gpt-5.6-terra` (reasoning_effort: `medium`)\n")
        f.write(f"- **Verdict**: `{res.verdict}`\n")
        f.write(f"- **Thời gian review**: {res.duration_seconds:.2f}s\n\n")
        f.write(f"## Tóm Tắt Đánh Giá (Findings)\n\n{res.findings}\n\n")
        f.write(f"## Chi Tiết Toàn Văn Đánh Giá\n\n```markdown\n{res.raw_output}\n```\n")
    print(f"\nĐã lưu báo cáo review đầy đủ vào: {report_file}")

    return 0 if res.is_pass else 1

if __name__ == "__main__":
    sys.exit(main())
