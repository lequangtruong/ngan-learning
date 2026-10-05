# Quy tắc Dự án Ngân Learning Lab (Toán Lớp 6)

## 1. Tôn chỉ Kiến trúc & Chất lượng
- **Thiết kế Modular Cắm-Rút**: Mọi chuyên đề bài học nằm trong `data/modules/`, mọi trò chơi nằm trong `js/games/` tuân thủ Game Contract. Dễ dàng thêm bớt mà không sửa core app.
- **Test đủ & Chia nhỏ**: Chạy `npm test` trước và sau khi hoàn thiện bất kỳ tính năng nào. Không để file test khổng lồ.
- **Bảo toàn Bộ nhớ iPad Safari**: Luôn giải phóng `ImageBitmap`, gọi `URL.revokeObjectURL()` ngay sau khi nén ảnh. State model độc lập DOM, không re-render input khi xoay màn hình.
- **Mã Định Danh Câu Hỏi Bất Biến (Immutable QuestionId)**: Định dạng `MATH6-W{week}-D{day}-Q{idx}`, phục vụ truy vết chính xác khi phụ huynh báo lỗi.
- **Bảo mật & Quyền riêng tư**: Tuyệt đối không để lộ Client Secret ở client. Ảnh vở học sinh không lưu trữ công khai và không dùng để train AI model.
