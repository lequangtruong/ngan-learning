// data/modules/mod-03-integers-z.js - Chuyên đề 3: Tập Hợp Số Nguyên Z & Phép Tính (Tuần 7 - 9)

export const MODULE_03_INTEGERS_Z = {
  id: "mod-03-integers-z",
  title: "Tập Hợp Số Nguyên Z & Quy Tắc Dấu",
  focus: "Số nguyên âm, điểm biểu diễn trên trục số, cộng trừ nhân chia số nguyên, quy tắc bỏ dấu ngoặc",
  weeks: [
    {
      id: "w07",
      number: 7,
      title: "Làm Quen Với Số Nguyên & Trục Số",
      goal: "Hiểu ý nghĩa số nguyên âm trong đời sống (nhiệt độ, độ cao, nợ/có), biểu diễn trên trục số, so sánh hai số nguyên.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Số Nguyên Âm & Trục Số Nằm Ngang",
          theory: "Tập hợp số nguyên Z gồm các số nguyên âm (-1, -2, ...), số 0 và các số nguyên dương (1, 2, ...). Trên trục số nằm ngang, điểm biểu diễn số âm nằm bên trái điểm 0. Càng sang trái giá trị càng nhỏ.",
          exercises: [
            {
              id: "MATH6-W07-D01-Q01",
              question: "Nhiệt độ buổi sáng ở Sa Pa là 2°C, đến đêm giảm thêm 5°C. Hỏi nhiệt độ ban đêm là bao nhiêu °C?",
              answer: "-3",
              type: "number",
              hints: ["Lấy 2 − 5 = ?"],
              explanation: "Nhiệt độ ban đêm: 2 − 5 = -3°C.",
              rubric: "Đáp số -3: 1.0đ."
            },
            {
              id: "MATH6-W07-D01-Q02",
              question: "So sánh hai số nguyên: -15 và -9. Số nào lớn hơn? (Nhập -15 hoặc -9)",
              answer: "-9",
              type: "number",
              hints: ["Trên trục số, -9 nằm bên phải -15 nên -9 lớn hơn."],
              explanation: "-9 > -15. Số -9 lớn hơn.",
              rubric: "Trả lời đúng -9: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Số Đối & Khoảng Cách Đến Gốc 0",
          theory: "Hai số nguyên trên trục số nằm ở hai phía của gốc 0 và cách đều gốc 0 được gọi là hai số đối nhau. Số đối của a là -a. Số đối của -a là a. Số đối của 0 là 0.",
          exercises: [
            {
              id: "MATH6-W07-D02-Q01",
              question: "Tìm số đối của số -27:",
              answer: "27",
              type: "number",
              hints: ["Số đối của số âm là số dương cùng độ lớn."],
              explanation: "Số đối của -27 là -(-27) = 27.",
              rubric: "Đáp số 27: 1.0đ."
            }
          ]
        }
      ]
    },
    {
      id: "w08",
      number: 8,
      title: "Phép Cộng & Phép Trừ Số Nguyên",
      goal: "Thành thạo cộng hai số nguyên cùng dấu, khác dấu; chuyển phép trừ thành phép cộng với số đối.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Cộng Hai Số Nguyên Khác Dấu",
          theory: "Để cộng hai số nguyên khác dấu: Lấy phần số lớn hơn trừ phần số nhỏ hơn, rồi đặt trước kết quả dấu của số có phần số lớn hơn. a + (-b) = a - b (nếu a >= b).",
          exercises: [
            {
              id: "MATH6-W08-D01-Q01",
              question: "Tính: (-35) + 50 = ?",
              answer: "15",
              type: "number",
              hints: ["50 mang dấu +, 35 mang dấu -. Lấy 50 - 35 = 15."],
              explanation: "(-35) + 50 = 50 - 35 = 15.",
              rubric: "Tính đúng 15: 1.0đ."
            },
            {
              id: "MATH6-W08-D01-Q02",
              question: "Tính: 42 + (-75) = ?",
              answer: "-33",
              type: "number",
              hints: ["75 lớn hơn 42 và mang dấu âm. Lấy -(75 - 42) = -33."],
              explanation: "42 + (-75) = -(75 - 42) = -33.",
              rubric: "Tính đúng -33: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Phép Trừ Số Nguyên & Quy Tắc Đổi Dấu",
          theory: "Muốn trừ số nguyên a cho số nguyên b, ta cộng a với số đối của b: a − b = a + (-b). Ví dụ: 12 - (-5) = 12 + 5 = 17.",
          exercises: [
            {
              id: "MATH6-W08-D02-Q01",
              question: "Tính: 18 − (-12) = ?",
              answer: "30",
              type: "number",
              hints: ["Trừ đi một số âm là cộng với số đối của nó: 18 + 12."],
              explanation: "18 − (-12) = 18 + 12 = 30.",
              rubric: "Đáp số 30: 1.0đ."
            },
            {
              id: "MATH6-W08-D02-Q02",
              question: "Tính: (-24) − 16 = ?",
              answer: "-40",
              type: "number",
              hints: ["(-24) + (-16) = -(24 + 16)."],
              explanation: "(-24) − 16 = -40.",
              rubric: "Đáp số -40: 1.0đ."
            }
          ]
        }
      ]
    },
    {
      id: "w09",
      number: 9,
      title: "Quy Tắc Bỏ Dấu Ngoặc & Phép Nhân Chia Số Nguyên",
      goal: "Thành thạo quy tắc đổi dấu khi trước ngoặc có dấu trừ; nhân chia hai số nguyên cùng dấu và khác dấu.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Quy Tắc Bỏ Ngoặc Đổi Dấu",
          theory: "Khi bỏ dấu ngoặc có dấu '+' đằng trước thì giữ nguyên dấu của các số hạng. Khi bỏ dấu ngoặc có dấu '-' đằng trước, ta PHẢI ĐỔI DẤU tất cả các số hạng trong ngoặc: dấu '+' thành '-' và dấu '-' thành '+'.",
          exercises: [
            {
              id: "MATH6-W09-D01-Q01",
              question: "Tính giá trị biểu thức: A = (28 − 45) − (28 − 45 + 13)",
              answer: "-13",
              type: "number",
              hints: ["Bỏ ngoặc: 28 - 45 - 28 + 45 - 13."],
              explanation: "A = (28 - 28) + (-45 + 45) - 13 = 0 + 0 - 13 = -13.",
              rubric: "Biết triệt tiêu các số đối: 0.5đ, kết quả -13: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Nhân & Chia Số Nguyên",
          theory: "Cùng dấu ra dương (+ × + = +, - × - = +). Khác dấu ra âm (+ × - = -, - × + = -).",
          exercises: [
            {
              id: "MATH6-W09-D02-Q01",
              question: "Tính: (-8) × (-12) = ?",
              answer: "96",
              type: "number",
              hints: ["Hai số cùng âm nhân nhau ra số dương: 8 × 12 = 96."],
              explanation: "(-8) × (-12) = 96.",
              rubric: "Đáp số 96: 1.0đ."
            },
            {
              id: "MATH6-W09-D02-Q02",
              question: "Tính: (-144) ÷ 12 = ?",
              answer: "-12",
              type: "number",
              hints: ["Khác dấu ra âm."],
              explanation: "(-144) ÷ 12 = -12.",
              rubric: "Đáp số -12: 1.0đ."
            }
          ]
        }
      ]
    }
  ]
};
