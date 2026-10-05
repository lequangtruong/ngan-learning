// data/modules/mod-02-integers.js - Chuyên đề 2: Số Tự Nhiên, Lũy Thừa & Ước Bội (Tuần 4 - 6)

export const MODULE_02_INTEGERS = {
  id: "mod-02-integers",
  title: "Số Tự Nhiên, Lũy Thừa & Ước Bội (Chuẩn GDPT 2018 Lớp 6)",
  focus: "Tập hợp, Lũy thừa, Ước - Bội, Số nguyên tố, ƯCLN & BCNN ứng dụng đời sống",
  weeks: [
    {
      id: "w04",
      number: 4,
      title: "Tập Hợp Số Tự Nhiên & Lũy Thừa",
      goal: "Làm chủ ký hiệu tập hợp, lũy thừa với số mũ tự nhiên, nhân chia hai lũy thừa cùng cơ số.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Khái Niệm Lũy Thừa & Nhân Hai Lũy Thừa Cùng Cơ Số",
          theory: "Lũy thừa bậc n của a là tích của n thừa số bằng nhau, mỗi thừa số bằng a: a^n = a × a × ... × a. Quy tắc nhân: a^m × a^n = a^(m+n).",
          exercises: [
            {
              id: "MATH6-W04-D01-Q01",
              question: "Tính giá trị của 2^5 = ?",
              answer: "32",
              type: "number",
              hints: ["2 × 2 × 2 × 2 × 2 = ?"],
              explanation: "2^5 = 32.",
              rubric: "Tính đúng 32: 1.0đ."
            },
            {
              id: "MATH6-W04-D01-Q02",
              question: "Viết kết quả phép tính dưới dạng một lũy thừa: 3^4 × 3^3 = 3^?",
              answer: "7",
              type: "number",
              hints: ["Giữ nguyên cơ số 3, cộng hai số mũ: 4 + 3 = 7."],
              explanation: "3^4 × 3^3 = 3^(4+3) = 3^7. Số mũ là 7.",
              rubric: "Đáp số 7: 1.0đ."
            },
            {
              id: "MATH6-W04-D01-Q03",
              question: "Tính giá trị biểu thức: 5^2 − 2^3 × 3 = ?",
              answer: "1",
              type: "number",
              hints: ["Tính lũy thừa trước: 5^2 = 25, 2^3 = 8. Sau đó 8 × 3 = 24. Cuối cùng 25 − 24."],
              explanation: "5^2 = 25, 2^3 × 3 = 8 × 3 = 24. 25 - 24 = 1.",
              rubric: "Tính đúng 5^2=25 và 2^3=8: 0.5đ, kết quả 1: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Chia Hai Lũy Thừa Cùng Cơ Số & Thứ Tự Phép Tính Lớp 6",
          theory: "Quy tắc chia: a^m ÷ a^n = a^(m-n) (với a ≠ 0, m ≥ n). Quy ước: a^0 = 1 (a ≠ 0).",
          exercises: [
            {
              id: "MATH6-W04-D02-Q01",
              question: "Viết kết quả dưới dạng số mũ: 7^8 ÷ 7^5 = 7^?",
              answer: "3",
              type: "number",
              hints: ["Lấy 8 − 5 = 3."],
              explanation: "7^8 ÷ 7^5 = 7^(8-5) = 7^3. Số mũ là 3.",
              rubric: "Đáp số 3: 1.0đ."
            },
            {
              id: "MATH6-W04-D02-Q02",
              question: "Tìm số tự nhiên x biết: 2^x = 64. Giá trị của x là:",
              answer: "6",
              type: "number",
              hints: ["2^5 = 32, 2^6 = 64."],
              explanation: "64 = 2^6 nên x = 6.",
              rubric: "x = 6: 1.0đ."
            }
          ]
        }
      ]
    },
    {
      id: "w05",
      number: 5,
      title: "Tính Chia Hết, Số Nguyên Tố & Hợp Số",
      goal: "Nắm vững dấu hiệu chia hết cho 2, 3, 5, 9; nhận biết số nguyên tố và hợp số; phân tích ra thừa số nguyên tố.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Số Nguyên Tố & Phân Tích Ra Thừa Số Nguyên Tố",
          theory: "Số nguyên tố là số tự nhiên lớn hơn 1, chỉ có 2 ước là 1 và chính nó (2, 3, 5, 7, 11, 13, 17, 19...). Hợp số có nhiều hơn 2 ước.",
          exercises: [
            {
              id: "MATH6-W05-D01-Q01",
              question: "Trong các số sau, số nào là số nguyên tố? 9, 15, 29, 35 (Nhập số nguyên tố đó)",
              answer: "29",
              type: "number",
              hints: ["9 chia hết cho 3, 15 chia hết cho 3, 35 chia hết cho 5. 29 chỉ chia hết cho 1 và 29."],
              explanation: "29 là số nguyên tố.",
              rubric: "Chọn đúng 29: 1.0đ."
            },
            {
              id: "MATH6-W05-D01-Q02",
              question: "Phân tích số 72 ra thừa số nguyên tố: 72 = 2^a × 3^b. Nhập giá trị a,b (Ví dụ: 3,2)",
              answer: "3,2",
              type: "text",
              hints: ["72 = 8 × 9 = 2^3 × 3^2."],
              explanation: "72 = 8 × 9 = 2^3 × 3^2. Vậy a = 3, b = 2.",
              rubric: "a = 3, b = 2: 1.0đ."
            }
          ]
        }
      ]
    },
    {
      id: "w06",
      number: 6,
      title: "Ước & Bội: ƯCLN & BCNN Ứng Dụng Đời Sống",
      goal: "Tìm ƯCLN và BCNN bằng phân tích thừa số nguyên tố; giải bài toán thực tế chia tổ, xếp hàng, chu kỳ gặp nhau.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Ước Chung Lớn Nhất (ƯCLN)",
          theory: "ƯCLN của hai hay nhiều số là số lớn nhất trong tập hợp các ước chung. Cách tìm: 1. Phân tích ra thừa số nguyên tố. 2. Chọn thừa số chung với số mũ nhỏ nhất. 3. Nhân các thừa số đó lại.",
          exercises: [
            {
              id: "MATH6-W06-D01-Q01",
              question: "Tìm ƯCLN của 24 và 36:",
              answer: "12",
              type: "number",
              hints: ["24 = 2^3 × 3; 36 = 2^2 × 3^2. Thừa số chung là 2^2 × 3 = 12."],
              explanation: "ƯCLN(24, 36) = 12.",
              rubric: "Đáp số 12: 1.0đ."
            },
            {
              id: "MATH6-W06-D01-Q02",
              question: "Cô giáo có 48 cái bút và 72 quyển vở muốn chia đều vào các túi quà sao cho số bút và vở ở mỗi túi bằng nhau. Hỏi cô có thể chia nhiều nhất thành bao nhiêu túi quà?",
              answer: "24",
              type: "number",
              hints: ["Số túi quà nhiều nhất chính là ƯCLN của 48 và 72."],
              explanation: "ƯCLN(48, 72) = 24. Cô có thể chia nhiều nhất thành 24 túi quà.",
              rubric: "Lời giải quy về ƯCLN: 0.5đ, tính ra 24 túi quà: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Bội Chung Nhỏ Nhất (BCNN)",
          theory: "BCNN của hai hay nhiều số là số nhỏ nhất khác 0 trong tập hợp các bội chung. Cách tìm: Chọn tất cả thừa số chung và riêng với số mũ lớn nhất.",
          exercises: [
            {
              id: "MATH6-W06-D02-Q01",
              question: "Tìm BCNN của 12 và 18:",
              answer: "36",
              type: "number",
              hints: ["12 = 2^2 × 3; 18 = 2 × 3^2. BCNN = 2^2 × 3^2 = 4 × 9 = 36."],
              explanation: "BCNN(12, 18) = 36.",
              rubric: "Đáp số 36: 1.0đ."
            }
          ]
        }
      ]
    }
  ]
};
