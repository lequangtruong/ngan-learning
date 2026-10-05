# Báo Cáo Đánh Giá Kiến Trúc Từ Codex Terra (gpt-5.6-terra medium)

- **Dự án**: Ngân Learning Lab (Toán Lớp 6)
- **Reviewer Model**: `gpt-5.6-terra` (reasoning_effort: `medium`)
- **Verdict**: `BLOCKED`
- **Thời gian review**: 49.83s

## Tóm Tắt Đánh Giá (Findings)

- Không có git diff/code để xác minh cú pháp, regression, test hay mức độ hiện thực hoá. Đây chỉ là một master plan; không thể kết luận “đã đáp ứng” các yêu cầu kỹ thuật.

- Kế hoạch chưa thể tuyên bố “bám sát 100% GDPT 2018”. Toán 6 có 140 tiết/năm theo chương trình tổng thể của Bộ GDĐT; 24 tuần là một lộ trình tăng cường hợp lý, nhưng cần ma trận truy vết “yêu cầu cần đạt → tuần/buổi/bài đánh giá”. [Chương trình GDPT 2018](https://moet.gov.vn/content/tintuc/Lists/News/Attachments/8421/chuong-trinh-tong-the-ctgdpt-2018.pdf)

- Phần hình học/đo lường còn thiếu hoặc chưa chỉ rõ nội dung hình khối trực quan và các yêu cầu cần đạt tương ứng; thống kê–xác suất chỉ có hai tuần, chưa thấy ngân hàng tình huống/phân loại dữ liệu, đọc–tạo biểu đồ và đánh giá riêng. Cần hoàn thiện curriculum map trước khi viết data.

- Ba tuần nền tảng là hướng đi tốt, nhưng cần bài chẩn đoán đầu vào và nhánh bù lỗ hổng theo kỹ năng. Không nên ép toàn bộ học sinh đạt “<2 giây/câu” vì dễ ưu tiên tốc độ hơn hiểu biết và tạo áp lực không cần thiết.

- Olympic/TIMO/SASMO phải là nhánh tự chọn theo mastery, không phải tiến trình bắt buộc. Cần đặt điều kiện mở khóa, giới hạn độ khó, lời giải nhiều chiến lược, và cơ chế dừng/hạ độ khó khi học sinh liên tiếp thất bại.

- Có mâu thuẫn kiến trúc: “không phụ thuộc API AI bên ngoài” nhưng Vision grader dùng Gemini; “local-first” nhưng đồng bộ Google Drive và gửi ảnh bài làm tới backend. Cần phân định rõ tính năng offline nào khả dụng, tính năng nào cần mạng/tài khoản/đồng thuận phụ huynh.

- Không thể cam kết Canvas “hardware M1”, JPEG 250–400 KB, 0 ms hay 60–120 fps trên Safari. Cần dùng các tiêu chí kiểm thử được: giới hạn pixel/file, xử lý HEIC/EXIF, `AbortController`, timeout, giải phóng `ImageBitmap`/Object URL, fallback khi Canvas thiếu bộ nhớ, và đo bằng thiết bị thật.

- Chấm ảnh “đúng/sai từng dòng” không đủ tin cậy để trình bày như kết luận chắc chắn. API phải trả mức độ tin cậy, trạng thái “không đọc rõ/cần chụp lại”, không suy đoán; xác thực JSON schema; giới hạn payload/rate; kiểm tra quyền truy cập; và không tự động ảnh hưởng MQI đáng kể khi điểm tin cậy thấp.

- Ảnh vở của trẻ em là dữ liệu nhạy cảm. Thiếu chính sách đồng thuận phụ huynh, thời hạn lưu/xóa, không dùng để huấn luyện, kiểm soát truy cập, mã hóa khi truyền/lưu, và cách xử lý dữ liệu khi Google Drive/Vision provider lỗi. Đây là blocker trước khi triển khai AI Vision.

- “Bảo toàn 100% khi xoay” chưa có thiết kế thực thi. Cần một state model độc lập DOM, lưu draft có debounce, giữ focus/selection, theo dõi `visualViewport`, safe-area inset, và không re-render vùng input khi `resize`/`orientationchange`. Cần test Safari iPad thật ở cả xoay máy và bật bàn phím.

- Math keypad cần vẫn cho phép bàn phím hệ thống, copy/paste và trợ năng; `touch-action: manipulation` không thay thế thiết kế accessibility. Bổ sung semantic input, nhãn ARIA, focus order, kích thước drawer có giới hạn, và đường thoát khi drawer che phần nộp bài.

- MQI 0–1000 chưa có mô hình hiệu chuẩn. Hiện tại nó dễ bị “game hóa” qua lặp game/tốc độ và trộn các thước đo không đồng nhất. Cần công thức phiên bản hóa, trọng số minh bạch, số mẫu tối thiểu, recency/độ tin cậy, giới hạn điểm từ mỗi game, và tách “bền bỉ” khỏi kết quả học thuật.

- Tám game chưa phủ cân bằng năm trục: Hình học gần như phụ thuộc Symmetry; thống kê–xác suất không có game/hoạt động đo riêng; Resilience chủ yếu dựa Spot the Bug và streak. Cần mapping `game/event → competency → evidence → weight`, rồi test các tình huống biên.

- Cơ chế Auto-Fix Prompt không được gọi là “self-healing”. Nó là workflow hỗ trợ tạo yêu cầu sửa, vẫn phải có reviewer, test, và phê duyệt trước merge/deploy. Nội dung phản hồi phụ huynh phải được chèn như dữ liệu được quote/escape, không được trở thành chỉ dẫn cho agent.

- Prompt không thể xác định chính xác file/đáp án chỉ từ `weekId/day/questionIndex` nếu dữ liệu đổi thứ tự. Mỗi câu cần immutable `questionId`, phiên bản curriculum, source locator đáng tin cậy, trạng thái xử lý, audit trail, và xác nhận “đã sửa” chỉ sau khi một bản phát hành chứa fix được kiểm chứng.

- Đồng bộ IndexedDB ↔ một JSON Google Drive thiếu thiết kế conflict resolution, migration/schema version, idempotency, recovery và chiến lược khi offline. Không lưu OAuth client secret ở client; API Vision cũng phải giữ mọi secret ở server.

- `node --check` và unit test không kiểm chứng được PWA, IndexedDB migration, Safari/iPad orientation, camera/photo lifecycle, network failure, Drive conflict hay endpoint security. Cần bổ sung integration/E2E tests và checklist kiểm thử thủ công trên iPad Air M1.

## Chi Tiết Toàn Văn Đánh Giá

```markdown
VERDICT: BLOCKED

FINDINGS:

- Không có git diff/code để xác minh cú pháp, regression, test hay mức độ hiện thực hoá. Đây chỉ là một master plan; không thể kết luận “đã đáp ứng” các yêu cầu kỹ thuật.

- Kế hoạch chưa thể tuyên bố “bám sát 100% GDPT 2018”. Toán 6 có 140 tiết/năm theo chương trình tổng thể của Bộ GDĐT; 24 tuần là một lộ trình tăng cường hợp lý, nhưng cần ma trận truy vết “yêu cầu cần đạt → tuần/buổi/bài đánh giá”. [Chương trình GDPT 2018](https://moet.gov.vn/content/tintuc/Lists/News/Attachments/8421/chuong-trinh-tong-the-ctgdpt-2018.pdf)

- Phần hình học/đo lường còn thiếu hoặc chưa chỉ rõ nội dung hình khối trực quan và các yêu cầu cần đạt tương ứng; thống kê–xác suất chỉ có hai tuần, chưa thấy ngân hàng tình huống/phân loại dữ liệu, đọc–tạo biểu đồ và đánh giá riêng. Cần hoàn thiện curriculum map trước khi viết data.

- Ba tuần nền tảng là hướng đi tốt, nhưng cần bài chẩn đoán đầu vào và nhánh bù lỗ hổng theo kỹ năng. Không nên ép toàn bộ học sinh đạt “<2 giây/câu” vì dễ ưu tiên tốc độ hơn hiểu biết và tạo áp lực không cần thiết.

- Olympic/TIMO/SASMO phải là nhánh tự chọn theo mastery, không phải tiến trình bắt buộc. Cần đặt điều kiện mở khóa, giới hạn độ khó, lời giải nhiều chiến lược, và cơ chế dừng/hạ độ khó khi học sinh liên tiếp thất bại.

- Có mâu thuẫn kiến trúc: “không phụ thuộc API AI bên ngoài” nhưng Vision grader dùng Gemini; “local-first” nhưng đồng bộ Google Drive và gửi ảnh bài làm tới backend. Cần phân định rõ tính năng offline nào khả dụng, tính năng nào cần mạng/tài khoản/đồng thuận phụ huynh.

- Không thể cam kết Canvas “hardware M1”, JPEG 250–400 KB, 0 ms hay 60–120 fps trên Safari. Cần dùng các tiêu chí kiểm thử được: giới hạn pixel/file, xử lý HEIC/EXIF, `AbortController`, timeout, giải phóng `ImageBitmap`/Object URL, fallback khi Canvas thiếu bộ nhớ, và đo bằng thiết bị thật.

- Chấm ảnh “đúng/sai từng dòng” không đủ tin cậy để trình bày như kết luận chắc chắn. API phải trả mức độ tin cậy, trạng thái “không đọc rõ/cần chụp lại”, không suy đoán; xác thực JSON schema; giới hạn payload/rate; kiểm tra quyền truy cập; và không tự động ảnh hưởng MQI đáng kể khi điểm tin cậy thấp.

- Ảnh vở của trẻ em là dữ liệu nhạy cảm. Thiếu chính sách đồng thuận phụ huynh, thời hạn lưu/xóa, không dùng để huấn luyện, kiểm soát truy cập, mã hóa khi truyền/lưu, và cách xử lý dữ liệu khi Google Drive/Vision provider lỗi. Đây là blocker trước khi triển khai AI Vision.

- “Bảo toàn 100% khi xoay” chưa có thiết kế thực thi. Cần một state model độc lập DOM, lưu draft có debounce, giữ focus/selection, theo dõi `visualViewport`, safe-area inset, và không re-render vùng input khi `resize`/`orientationchange`. Cần test Safari iPad thật ở cả xoay máy và bật bàn phím.

- Math keypad cần vẫn cho phép bàn phím hệ thống, copy/paste và trợ năng; `touch-action: manipulation` không thay thế thiết kế accessibility. Bổ sung semantic input, nhãn ARIA, focus order, kích thước drawer có giới hạn, và đường thoát khi drawer che phần nộp bài.

- MQI 0–1000 chưa có mô hình hiệu chuẩn. Hiện tại nó dễ bị “game hóa” qua lặp game/tốc độ và trộn các thước đo không đồng nhất. Cần công thức phiên bản hóa, trọng số minh bạch, số mẫu tối thiểu, recency/độ tin cậy, giới hạn điểm từ mỗi game, và tách “bền bỉ” khỏi kết quả học thuật.

- Tám game chưa phủ cân bằng năm trục: Hình học gần như phụ thuộc Symmetry; thống kê–xác suất không có game/hoạt động đo riêng; Resilience chủ yếu dựa Spot the Bug và streak. Cần mapping `game/event → competency → evidence → weight`, rồi test các tình huống biên.

- Cơ chế Auto-Fix Prompt không được gọi là “self-healing”. Nó là workflow hỗ trợ tạo yêu cầu sửa, vẫn phải có reviewer, test, và phê duyệt trước merge/deploy. Nội dung phản hồi phụ huynh phải được chèn như dữ liệu được quote/escape, không được trở thành chỉ dẫn cho agent.

- Prompt không thể xác định chính xác file/đáp án chỉ từ `weekId/day/questionIndex` nếu dữ liệu đổi thứ tự. Mỗi câu cần immutable `questionId`, phiên bản curriculum, source locator đáng tin cậy, trạng thái xử lý, audit trail, và xác nhận “đã sửa” chỉ sau khi một bản phát hành chứa fix được kiểm chứng.

- Đồng bộ IndexedDB ↔ một JSON Google Drive thiếu thiết kế conflict resolution, migration/schema version, idempotency, recovery và chiến lược khi offline. Không lưu OAuth client secret ở client; API Vision cũng phải giữ mọi secret ở server.

- `node --check` và unit test không kiểm chứng được PWA, IndexedDB migration, Safari/iPad orientation, camera/photo lifecycle, network failure, Drive conflict hay endpoint security. Cần bổ sung integration/E2E tests và checklist kiểm thử thủ công trên iPad Air M1.

```
