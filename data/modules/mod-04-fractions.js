// data/modules/mod-04-fractions.js - Chuyên đề 4: Phân Số & Số Thập Phân Lớp 6 (Tuần 10 - 12)

export const MODULE_04_FRACTIONS = {
  id: "mod-04-fractions",
  title: "Phân Số, Hỗn Số & Số Thập Phân",
  focus: "Mở rộng phân số với tử mẫu nguyên, quy đồng mẫu số, phép tính phân số, tỉ số & tỉ số phần trăm thực tế",
  weeks: [
    {
      id: "w10",
      number: 10,
      title: "Mở Rộng Phân Số & Rút Gọn Tối Giản",
      goal: "Khái niệm phân số a/b với a, b thuộc Z (b khác 0); tính chất cơ bản và rút gọn về phân số tối giản.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Phân Số Bằng Nhau & Tính Chất Cơ Bản",
          theory: "Hai phân số a/b và c/d bằng nhau nếu a × d = b × c. Khi nhân hoặc chia cả tử và mẫu cho cùng một số nguyên khác 0, ta được phân số bằng phân số đã cho.",
          exercises: [
            {
              id: "MATH6-W10-D01-Q01",
              question: "Rút gọn phân số (-24)/36 về tối giản (Dạng a/b):",
              answer: "-2/3",
              type: "fraction",
              hints: ["ƯCLN của 24 và 36 là 12. Chia cả tử và mẫu cho 12."],
              explanation: "(-24) ÷ 12 / 36 ÷ 12 = -2/3.",
              rubric: "Đáp số -2/3: 1.0đ."
            },
            {
              id: "MATH6-W10-D01-Q02",
              question: "Tìm số nguyên x biết: x / 5 = (-12) / 20",
              answer: "-3",
              type: "number",
              hints: ["(-12)/20 rút gọn thành (-3)/5. Hoặc x = 5 × (-12) ÷ 20."],
              explanation: "x = (5 × -12) / 20 = -60 / 20 = -3.",
              rubric: "Tính đúng x = -3: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Quy Đồng Mẫu Số Nhiều Phân Số",
          theory: "Để quy đồng: 1. Tìm BCNN của các mẫu dương làm mẫu chung. 2. Tìm thừa số phụ của từng mẫu. 3. Nhân tử và mẫu với thừa số phụ tương ứng.",
          exercises: [
            {
              id: "MATH6-W10-D02-Q01",
              question: "Tìm mẫu chung nhỏ nhất (BCNN của các mẫu) của hai phân số: 5/12 và 7/18",
              answer: "36",
              type: "number",
              hints: ["BCNN(12, 18) = ?"],
              explanation: "12 = 2^2 × 3; 18 = 2 × 3^2. BCNN = 4 × 9 = 36.",
              rubric: "Đáp số 36: 1.0đ."
            }
          ]
        }
      ]
    },
    {
      id: "w11",
      number: 11,
      title: "Các Phép Tính Phân Số & Thứ Tự Thực Hiện",
      goal: "Cộng, trừ, nhân, chia phân số có dấu âm; vận dụng tính chất giao hoán, kết hợp, phân phối để tính nhanh.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Cộng & Trừ Phân Số Khác Mẫu",
          theory: "Quy đồng mẫu số rồi cộng hoặc trừ các tử số, giữ nguyên mẫu số chung. Chú ý luôn rút gọn kết quả về tối giản.",
          exercises: [
            {
              id: "MATH6-W11-D01-Q01",
              question: "Tính giá trị: 3/4 + (-1/6) = ? (Nhập phân số tối giản a/b)",
              answer: "7/12",
              type: "fraction",
              hints: ["Mẫu chung là 12. 3/4 = 9/12; -1/6 = -2/12. 9 + (-2) = 7."],
              explanation: "9/12 + (-2/12) = 7/12.",
              rubric: "Đáp số 7/12: 1.0đ."
            },
            {
              id: "MATH6-W11-D01-Q02",
              question: "Tính nhanh: A = 7/15 + 4/9 + 8/15 + 5/9",
              answer: "2",
              type: "number",
              hints: ["Nhóm (7/15 + 8/15) + (4/9 + 5/9) = 15/15 + 9/9 = 1 + 1."],
              explanation: "A = (7/15 + 8/15) + (4/9 + 5/9) = 1 + 1 = 2.",
              rubric: "Nhóm đúng cặp: 0.5đ, kết quả 2: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Nhân & Chia Phân Số",
          theory: "Muốn nhân hai phân số, ta nhân các tử với nhau và nhân các mẫu với nhau: a/b × c/d = (a×c)/(b×d). Phép chia: a/b ÷ c/d = a/b × d/c.",
          exercises: [
            {
              id: "MATH6-W11-D02-Q01",
              question: "Tính: (-5/8) × (4/15) = ? (Dạng tối giản a/b)",
              answer: "-1/6",
              type: "fraction",
              hints: ["Rút gọn chéo trước khi nhân: 5 với 15 còn 1 và 3; 4 với 8 còn 1 và 2."],
              explanation: "(-5 × 4) / (8 × 15) = -1 / (2 × 3) = -1/6.",
              rubric: "Đáp số -1/6: 1.0đ."
            }
          ]
        }
      ]
    },
    {
      id: "w12",
      number: 12,
      title: "Số Thập Phân, Hỗn Số & Tỉ Số Phần Trăm",
      goal: "Chuyển đổi phân số thập phân sang số thập phân; giải 3 bài toán cơ bản về tỉ số phần trăm trong đời sống.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Số Thập Phân & Các Phép Tính Cơ Bản",
          theory: "Phân số thập phân là phân số có mẫu là lũy thừa của 10. Khi nhân chia số thập phân với 10, 100, 1000 ta dời dấu phẩy sang phải hoặc sang trái tương ứng.",
          exercises: [
            {
              id: "MATH6-W12-D01-Q01",
              question: "Viết phân số 3/8 dưới dạng số thập phân:",
              answer: "0.375",
              type: "number",
              hints: ["3 ÷ 8 = 0.375."],
              explanation: "3/8 = 375/1000 = 0.375.",
              rubric: "Đáp số 0.375: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Bài Toán Tỉ Số Phần Trăm Thực Tế",
          theory: "Tìm a% của một số b: b × a ÷ 100. Tìm một số khi biết a% của nó là c: c ÷ a × 100.",
          exercises: [
            {
              id: "MATH6-W12-D02-Q01",
              question: "Một chiếc áo giá 200.000 đồng đang được giảm giá 15%. Hỏi giá tiền được giảm là bao nhiêu nghìn đồng? (Chỉ nhập số)",
              answer: "30",
              type: "number",
              hints: ["200 × 15% = 200 × 15 / 100 = 30 nghìn đồng."],
              explanation: "Số tiền được giảm: 200.000 × 15 / 100 = 30.000 đồng (30 nghìn đồng).",
              rubric: "Đáp số 30: 1.0đ."
            }
          ]
        }
      ]
    }
  ]
};
