# Báo Cáo Đánh Giá Mã Nguồn & Kiến Trúc Từ Codex Sol 6.1 (gpt-5.6-sol low)

- **Dự án**: Ngân Learning Lab (Toán 6 Nâng Cao & Logic Games)
- **Thư mục**: `/Volumes/DATA/Github/Hoc-bang-AI/Hoc-Toan/Ngan+Khoa/ngan-learning`
- **Thời gian đánh giá**: 259.30s (2026-10-05 16:51:47)
- **Model**: `gpt-5.6-sol` | **Reasoning Effort**: `low`

---

VERDICT: BLOCKED

Các test kỹ thuật hiện tại đều xanh, nhưng chưa đủ để xác nhận chất lượng sư phạm hoặc cho phép deploy production.

### Các lỗi chặn production

1. **Sai đáp án toán học trong Module 10**

Câu `MATH6-W26-D01-Q02` khai báo đáp án `6`, trong khi chính lời giải chứng minh `x = 2` và còn xác nhận `x = 6` không thỏa mãn phương trình. Học sinh trả lời đúng sẽ bị chấm sai.

- [mod-10-olympiad-advanced.js:123](</Volumes/DATA/Github/Hoc-bang-AI/Hoc-Toan/Ngan+Khoa/ngan-learning/data/modules/mod-10-olympiad-advanced.js:123>)
- Đáp án sai tại dòng 126; lời giải mâu thuẫn tại dòng 129.

2. **54 QuestionId vi phạm chuẩn bất biến của dự án**

Toàn bộ buổi 6 của tuần 1–9 dùng dạng `MATH6-W01-EX-01`, thay vì chuẩn bắt buộc `MATH6-W01-D06-Q01`.

Ví dụ: [mod-01-foundation.js:408](</Volumes/DATA/Github/Hoc-bang-AI/Hoc-Toan/Ngan+Khoa/ngan-learning/data/modules/mod-01-foundation.js:408>)

Hậu quả:

- Không đúng contract `MATH6-W{week}-D{day}-Q{idx}`.
- API báo lỗi/tự vá từ chối các ID này vì server chỉ chấp nhận định dạng `D...-Q...`: [server.mjs:245](</Volumes/DATA/Github/Hoc-bang-AI/Hoc-Toan/Ngan+Khoa/ngan-learning/server.mjs:245>).
- Việc đổi ID sau khi đã có dữ liệu học tập cũng cần migration để không mất liên kết `lessonResponses`.

3. **Endpoint tự sửa mã nguồn không có xác thực**

Bất kỳ client truy cập được server đều có thể gọi `/api/parent-feedback/patch` và sửa trực tiếp giáo trình trên ổ đĩa. Endpoint không có authentication, authorization hay CSRF protection: [server.mjs:239](</Volumes/DATA/Github/Hoc-bang-AI/Hoc-Toan/Ngan+Khoa/ngan-learning/server.mjs:239>).

Đây là lỗi nghiêm trọng nếu server được đưa lên mạng. Chức năng này chỉ an toàn khi bị giới hạn tuyệt đối trong môi trường quản trị/local development.

4. **Chấm ảnh đang trả kết quả đúng giả lập cho mọi ảnh**

`/api/grade-math` chưa gọi mô hình AI nhưng luôn trả `100%`, `confidence: 0.94` và trạng thái `GRADED`: [server.mjs:378](</Volumes/DATA/Github/Hoc-bang-AI/Hoc-Toan/Ngan+Khoa/ngan-learning/server.mjs:378>).

Đây là phản hồi không trung thực đối với học sinh và là blocker sư phạm nếu tính năng xuất hiện trong production.

### Độ tin cậy của bằng chứng test

Đã xác nhận thực chạy:

- `npm test`: **41/41 PASS**.
- Mock test: hoàn tất 6 nhóm kiểm tra.
- Curriculum audit: **382 câu, 30 tuần, 382 ID duy nhất**.
- Không có câu hỏi trùng khớp hoàn toàn theo nội dung chuẩn hóa.
- Tuần 1–9 đúng 6 buổi/tuần, 6 câu/buổi và có đủ bốn mức độ.

Tuy nhiên:

- Audit chỉ kiểm tra trường tồn tại và ID không trùng; không kiểm tra định dạng/context ID, độ đúng đáp án hay tính nhất quán đáp án–lời giải: [audit-math6-curriculum.mjs:39](</Volumes/DATA/Github/Hoc-bang-AI/Hoc-Toan/Ngan+Khoa/ngan-learning/scripts/audit-math6-curriculum.mjs:39>).
- Mock endpoint server bắt lỗi kết nối rồi vẫn tiếp tục PASS: [mock-test-all-buttons.mjs:154](</Volumes/DATA/Github/Hoc-bang-AI/Hoc-Toan/Ngan+Khoa/ngan-learning/scripts/mock-test-all-buttons.mjs:154>).
- Test game chủ yếu xác nhận có sinh HTML, chưa thực sự nhấn và hoàn thành luồng của cả 15 game.
- Test viewport phần lớn tìm chuỗi CSS tĩnh, chưa phải screenshot hoặc browser test thực tế trên Safari/iPad.

### Đánh giá tổng thể

- **Kiến trúc:** Khá tốt. Curriculum registry và game registry có ranh giới module rõ; state tách DOM; IndexedDB local-first phù hợp iPad. Radar dùng `??` là sửa đúng. Nén ảnh thu hồi Object URL trong `finally`, có giải phóng canvas.
- **Adaptive Learning:** Logic sắp `olympiad → advanced → medium → basic` cho hồ sơ `OLYMPIAD_TALENT` được triển khai đúng về mặt mã nguồn: [render-views.js:397](</Volumes/DATA/Github/Hoc-bang-AI/Hoc-Toan/Ngan+Khoa/ngan-learning/js/render-views.js:397>). Tuy nhiên chưa có unit/integration test riêng chứng minh thứ tự render và persistence qua reload.
- **Chất lượng sư phạm:** Tuần 1–9 có mật độ và phân tầng tốt. Module 10 có chủ đề phù hợp hướng Olympic, nhưng lỗi đáp án tuần 26 cho thấy cần kiểm duyệt toán học độc lập. Tuần 10–30 vẫn khá thưa, thường chỉ 1–3 bài/buổi; vì vậy chưa thể khẳng định toàn bộ lộ trình đều đủ một Pomodoro 25 phút.
- **Production readiness:** Chưa đạt do lỗi nội dung, ID contract, endpoint tự sửa không xác thực, chấm ảnh giả lập và thiếu E2E Safari thực.

Điều kiện tối thiểu để chuyển sang PASS: sửa và kiểm duyệt Module 10; migration 54 ID; tăng cường audit semantic; khóa hoặc loại bỏ auto-patch khỏi production; thay mock grader bằng trạng thái “chưa hỗ trợ/không thể chấm”; và chạy E2E thực trên WebKit ở cả `1180×820` và `820×1180`.
