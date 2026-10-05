// data/modules/mod-08-probability.js - Chuyên đề 8: Xác Suất Thực Nghiệm & Biến Cố (Tuần 21 - 22)

export const MODULE_08_PROBABILITY = {
  id: "mod-08-probability",
  title: "Xác Suất Thực Nghiệm & Sự Kiện Ngẫu Nhiên",
  focus: "Mô hình xác suất đơn giản, sự kiện chắc chắn/không thể/có thể, tính xác suất thực nghiệm khi gieo xúc xắc hoặc đồng xu",
  weeks: [
    {
      id: "w21",
      number: 21,
      title: "Sự Kiện Chắc Chắn, Không Thể & Có Thể",
      goal: "Phân biệt 3 loại sự kiện trong các tình huống thực tế; nhận biết kết quả có thể xảy ra của một phép thử nghiệm.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Ba Loại Sự Kiện",
          theory: "- Sự kiện chắc chắn: luôn luôn xảy ra. - Sự kiện không thể: không bao giờ xảy ra. - Sự kiện có thể: có thể xảy ra hoặc không xảy ra tùy thuộc vào kết quả của phép thử.",
          exercises: [
            {
              id: "MATH6-W21-D01-Q01",
              question: "Gieo một con xúc xắc 6 mặt (từ 1 đến 6 chấm). Sự kiện 'Số chấm xuất hiện là 7' là loại sự kiện nào? (Nhập: Chắc chắn, Không thể, hoặc Có thể)",
              answer: "Không thể",
              type: "text",
              hints: ["Con xúc xắc chỉ có từ 1 đến 6 chấm nên không thể ra 7."],
              explanation: "Sự kiện không thể xảy ra vì xúc xắc chỉ có các mặt từ 1 đến 6.",
              rubric: "Trả lời đúng Không thể: 1.0đ."
            },
            {
              id: "MATH6-W21-D01-Q02",
              question: "Gieo một con xúc xắc 6 mặt. Sự kiện 'Số chấm xuất hiện nhỏ hơn 7' là loại sự kiện nào? (Nhập: Chắc chắn, Không thể, hoặc Có thể)",
              answer: "Chắc chắn",
              type: "text",
              hints: ["Mọi mặt từ 1 đến 6 đều nhỏ hơn 7."],
              explanation: "Tất cả các kết quả 1, 2, 3, 4, 5, 6 đều nhỏ hơn 7 nên sự kiện này chắc chắn xảy ra.",
              rubric: "Trả lời đúng Chắc chắn: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Các Kết Quả Có Thể Xảy Ra",
          theory: "Liệt kê đầy đủ các kết quả có thể xảy ra của một phép thử nghiệm ngẫu nhiên.",
          exercises: [
            {
              id: "MATH6-W21-D02-Q01",
              question: "Tung đồng thời hai đồng xu phân biệt. Có tất cả bao nhiêu kết quả có thể xảy ra?",
              answer: "4",
              type: "number",
              hints: ["Các kết quả: (Sấp, Sấp), (Sấp, Ngửa), (Ngửa, Sấp), (Ngửa, Ngửa)."],
              explanation: "Có 2 × 2 = 4 kết quả có thể xảy ra.",
              rubric: "Đáp số 4: 1.0đ."
            }
          ]
        }
      ]
    },
    {
      id: "w22",
      number: 22,
      title: "Xác Suất Thực Nghiệm Của Một Sự Kiện",
      goal: "Tính tỉ số giữa số lần sự kiện xảy ra và tổng số lần thực hiện phép thử.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Công Thức Xác Suất Thực Nghiệm",
          theory: "Xác suất thực nghiệm xuất hiện sự kiện A = (Số lần sự kiện A xảy ra) ÷ (Tổng số lần thực hiện phép thử).",
          exercises: [
            {
              id: "MATH6-W22-D01-Q01",
              question: "Gieo một con xúc xắc 50 lần, thấy mặt 6 chấm xuất hiện 8 lần. Xác suất thực nghiệm xuất hiện mặt 6 chấm là bao nhiêu? (Dạng phân số tối giản a/b)",
              answer: "4/25",
              type: "fraction",
              hints: ["Tỉ số = 8/50. Rút gọn chia cả tử và mẫu cho 2."],
              explanation: "Xác suất thực nghiệm = 8/50 = 4/25 (hoặc 16%).",
              rubric: "Đáp số 4/25: 1.0đ."
            },
            {
              id: "MATH6-W22-D01-Q02",
              question: "Tung một đồng xu 100 lần, mặt Ngửa xuất hiện 52 lần. Tính xác suất thực nghiệm xuất hiện mặt Sấp (dưới dạng số thập phân):",
              answer: "0.48",
              type: "number",
              hints: ["Số lần mặt Sấp xuất hiện: 100 - 52 = 48 lần. Xác suất = 48/100 = 0.48."],
              explanation: "Mặt Sấp xuất hiện 100 − 52 = 48 lần. Xác suất = 48/100 = 0.48.",
              rubric: "Đáp số 0.48: 1.0đ."
            }
          ]
        }
      ]
    }
  ]
};
