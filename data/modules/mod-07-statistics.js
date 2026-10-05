// data/modules/mod-07-statistics.js - Chuyên đề 7: Thống Kê & Phân Tích Dữ Liệu (Tuần 19 - 20)

export const MODULE_07_STATISTICS = {
  id: "mod-07-statistics",
  title: "Thu Thập, Phân Loại & Đọc Biểu Đồ Thống Kê",
  focus: "Dữ liệu định tính & định lượng, bảng số liệu thống kê, biểu đồ tranh, biểu đồ cột và biểu đồ cột kép",
  weeks: [
    {
      id: "w19",
      number: 19,
      title: "Thu Thập, Tổ Chức & Phân Loại Dữ Liệu",
      goal: "Biết cách lập bảng kiểm đếm, phân biệt dữ liệu là số (định lượng) và không phải số (định tính).",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Dữ Liệu Định Tính & Định Lượng",
          theory: "Dữ liệu là các thông tin thu thập được. Dữ liệu là số gọi là số liệu (định lượng): chiều cao, điểm số, số học sinh. Dữ liệu không là số gọi là định tính: môn học yêu thích, màu sắc, xếp loại hạnh kiểm.",
          exercises: [
            {
              id: "MATH6-W19-D01-Q01",
              question: "Trong các dữ liệu: 'Toán', 'Văn', '8.5 điểm', 'Tiếng Anh'. Dữ liệu nào là số liệu định lượng?",
              answer: "8.5 điểm",
              type: "text",
              hints: ["Số liệu định lượng là thông tin biểu diễn bằng con số đo lường được."],
              explanation: "8.5 điểm là số liệu (định lượng), các môn học là dữ liệu định tính.",
              rubric: "Trả lời đúng 8.5 điểm: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Bảng Số Liệu Ban Đầu & Bảng Tần Số",
          theory: "Bảng số liệu giúp tổng hợp thông tin rõ ràng, dễ so sánh và tìm giá trị lớn nhất, nhỏ nhất.",
          exercises: [
            {
              id: "MATH6-W19-D02-Q01",
              question: "Số điểm 10 môn Toán của 4 tổ lớp 6A lần lượt là: Tổ 1: 12 điểm 10, Tổ 2: 15 điểm 10, Tổ 3: 10 điểm 10, Tổ 4: 18 điểm 10. Hỏi lớp 6A có tất cả bao nhiêu điểm 10?",
              answer: "55",
              type: "number",
              hints: ["Tính tổng: 12 + 15 + 10 + 18 = ?"],
              explanation: "Tổng số điểm 10 = 12 + 15 + 10 + 18 = 55 điểm 10.",
              rubric: "Đáp số 55: 1.0đ."
            }
          ]
        }
      ]
    },
    {
      id: "w20",
      number: 20,
      title: "Biểu Đồ Tranh, Biểu Đồ Cột & Biểu Đồ Cột Kép",
      goal: "Đọc và phân tích thông tin từ biểu đồ cột đơn và biểu đồ cột kép so sánh hai nhóm đối tượng.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Đọc & Khai Thác Biểu Đồ Cột",
          theory: "Biểu đồ cột dùng các cột có chiều rộng bằng nhau và chiều cao biểu diễn số liệu tương ứng. Trục đứng ghi số lượng, trục ngang ghi các đối tượng.",
          exercises: [
            {
              id: "MATH6-W20-D01-Q01",
              question: "Một biểu đồ cột thể hiện số cây trồng của khối 6: Lớp 6A trồng 45 cây, 6B trồng 50 cây, 6C trồng 40 cây. Hỏi trung bình mỗi lớp trồng được bao nhiêu cây?",
              answer: "45",
              type: "number",
              hints: ["Trung bình cộng = (45 + 50 + 40) ÷ 3 = 135 ÷ 3 = 45."],
              explanation: "Trung bình mỗi lớp: (45 + 50 + 40) ÷ 3 = 45 cây.",
              rubric: "Đáp số 45: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Biểu Đồ Cột Kép & So Sánh Đối Chiếu",
          theory: "Biểu đồ cột kép đặt hai cột cạnh nhau tại mỗi đối tượng để so sánh trực quan hai bộ số liệu (ví dụ: số học sinh Nam và Nữ, hoặc kết quả Học kỳ 1 và Học kỳ 2).",
          exercises: [
            {
              id: "MATH6-W20-D02-Q01",
              question: "Biểu đồ cột kép so sánh số điểm giỏi môn Toán của hai bạn: Nam đạt 8 điểm giỏi ở HK1 và 12 điểm giỏi ở HK2; An đạt 10 điểm giỏi ở HK1 và 11 điểm giỏi ở HK2. Hỏi trong cả năm, bạn nào có tổng số điểm giỏi nhiều hơn? (Nhập Nam hoặc An)",
              answer: "An",
              type: "text",
              hints: ["Nam: 8 + 12 = 20. An: 10 + 11 = 21."],
              explanation: "Nam có 20 điểm giỏi, An có 21 điểm giỏi. Vậy An nhiều hơn.",
              rubric: "Đáp số An: 1.0đ."
            }
          ]
        }
      ]
    }
  ]
};
