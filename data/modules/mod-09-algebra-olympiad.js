// data/modules/mod-09-algebra-olympiad.js - Chuyên đề 9: Đại Số Sơ Cấp & Thử Thách Olympic Toán 6 (Tuần 23 - 24)

export const MODULE_09_ALGEBRA_OLYMPIAD = {
  id: "mod-09-algebra-olympiad",
  title: "Đại Số Sơ Cấp, Bài Toán Thực Tế & Thử Thách Olympic",
  focus: "Tìm x với quy tắc chuyển vế, bài toán chuyển động đều, ôn tập tổng kết năm & thử thách Olympic TIMO/SASMO tự chọn",
  weeks: [
    {
      id: "w23",
      number: 23,
      title: "Phương Trình Đại Số Sơ Cấp & Quy Tắc Chuyển Vế",
      goal: "Làm chủ quy tắc chuyển vế đổi dấu trong Z; giải quyết bài toán tìm x và toán đố lập phương trình đơn giản.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Quy Tắc Chuyển Vế Đổi Dấu",
          theory: "Khi chuyển một số hạng từ vế này sang vế kia của một đẳng thức, ta PHẢI ĐỔI DẤU số hạng đó: '+' đổi thành '-' và '-' đổi thành '+'.",
          exercises: [
            {
              id: "MATH6-W23-D01-Q01",
              question: "Tìm số nguyên x biết: x − 15 = -28",
              answer: "-13",
              type: "number",
              hints: ["Chuyển -15 sang vế phải thành +15: x = -28 + 15."],
              explanation: "x = -28 + 15 = -13.",
              rubric: "Tính đúng x = -13: 1.0đ."
            },
            {
              id: "MATH6-W23-D01-Q02",
              question: "Tìm số nguyên x biết: 3x + 12 = -6",
              answer: "-6",
              type: "number",
              hints: ["3x = -6 - 12 = -18. Sau đó x = -18 ÷ 3."],
              explanation: "3x = -18 => x = -18 ÷ 3 = -6.",
              rubric: "3x = -18: 0.5đ, x = -6: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Bài Toán Chuyển Động & Đại Lượng Tỉ Lệ",
          theory: "Công thức chuyển động đều: Quãng đường s = v × t. Vận tốc v = s ÷ t. Thời gian t = s ÷ v.",
          exercises: [
            {
              id: "MATH6-W23-D02-Q01",
              question: "Một xe ô tô đi quãng đường 150 km trong 2 giờ 30 phút. Vận tốc của xe là bao nhiêu km/h?",
              answer: "60",
              type: "number",
              hints: ["Đổi 2 giờ 30 phút = 2.5 giờ. Vận tốc = 150 ÷ 2.5."],
              explanation: "2 giờ 30 phút = 2.5 giờ. Vận tốc = 150 ÷ 2.5 = 60 km/h.",
              rubric: "Đổi 2.5 giờ: 0.5đ, vận tốc 60 km/h: 0.5đ."
            }
          ]
        }
      ]
    },
    {
      id: "w24",
      number: 24,
      title: "Tổng Ôn Toàn Diện & Thử Thách Olympic (TIMO/SASMO)",
      goal: "Tổng kết năng lực toán 6; giải các bài toán tư duy logic Olympic với nhiều chiến lược tiếp cận.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Tổng Ôn Tập Toán Lớp 6 Toàn Diện",
          theory: "Hệ thống hóa toàn bộ kiến thức: Số học (Số tự nhiên, Số nguyên, Phân số, Thập phân), Hình học trực quan và Thống kê xác suất.",
          exercises: [
            {
              id: "MATH6-W24-D01-Q01",
              question: "Tính giá trị biểu thức rút gọn: M = (1/2 + 2/3 + 3/4) × 12 = ?",
              answer: "23",
              type: "number",
              hints: ["Dùng tính chất phân phối: 1/2 × 12 + 2/3 × 12 + 3/4 × 12 = 6 + 8 + 9."],
              explanation: "M = 6 + 8 + 9 = 23.",
              rubric: "Tính đúng 23: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Thử Thách Tư Duy Olympic (TIMO/SASMO - Tự Chọn)",
          theory: "Bài toán mở khóa tư duy logic và suy luận ngược (mastery level).",
          exercises: [
            {
              id: "MATH6-W24-D02-Q01",
              question: "Trong một cuộc thi toán gồm 20 câu hỏi. Mỗi câu đúng được 5 điểm, mỗi câu sai bị trừ 2 điểm. Bạn Ngân làm hết cả 20 câu và đạt tổng cộng 72 điểm. Hỏi Ngân đã làm đúng bao nhiêu câu?",
              answer: "16",
              type: "number",
              hints: ["Giả sử cả 20 câu đều đúng thì được 100 điểm. Mỗi câu sai làm mất đi 5 + 2 = 7 điểm."],
              explanation: "Giả sử đúng hết được: 20 × 5 = 100 điểm. Số điểm dôi ra: 100 − 72 = 28 điểm. Mỗi câu sai mất 5 + 2 = 7 điểm. Số câu sai = 28 ÷ 7 = 4 câu. Số câu đúng = 20 − 4 = 16 câu.",
              rubric: "Nêu được phương pháp giả thiết tạm: 0.5đ, đáp số 16 câu: 0.5đ."
            }
          ]
        }
      ]
    }
  ]
};
