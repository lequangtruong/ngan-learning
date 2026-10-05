// data/modules/mod-05-geometry.js - Chuyên đề 5: Hình Học Trực Quan & Đo Lường (Tuần 13 - 15)

export const MODULE_05_GEOMETRY = {
  id: "mod-05-geometry",
  title: "Hình Học Trực Quan & Công Thức Diện Tích",
  focus: "Tam giác đều, Lục giác đều, Hình vuông, Chữ nhật, Thoi, Bình hành, Thang cân; Chu vi & Diện tích",
  weeks: [
    {
      id: "w13",
      number: 13,
      title: "Tam Giác Đều, Hình Vuông & Lục Giác Đều",
      goal: "Nhận biết các đỉnh, cạnh, góc của tam giác đều, hình vuông, lục giác đều; vẽ hình bằng thước và compa.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Tam Giác Đều & Hình Vuông",
          theory: "Tam giác đều có 3 cạnh bằng nhau, 3 góc bằng nhau (đều bằng 60°). Hình vuông có 4 cạnh bằng nhau, 4 góc vuông, 2 đường chéo bằng nhau và vuông góc tại trung điểm.",
          exercises: [
            {
              id: "MATH6-W13-D01-Q01",
              question: "Một tam giác đều có độ dài một cạnh là 6 cm. Chu vi của tam giác đó là bao nhiêu cm?",
              answer: "18",
              type: "number",
              hints: ["Chu vi tam giác đều = cạnh × 3 = 6 × 3."],
              explanation: "Chu vi = 6 × 3 = 18 cm.",
              rubric: "Đáp số 18: 1.0đ."
            },
            {
              id: "MATH6-W13-D01-Q02",
              question: "Một mảnh đất hình vuông có chu vi là 36 m. Diện tích mảnh đất đó là bao nhiêu m²?",
              answer: "81",
              type: "number",
              hints: ["Cạnh hình vuông = Chu vi ÷ 4 = 36 ÷ 4 = 9 m. Diện tích = cạnh × cạnh."],
              explanation: "Cạnh = 36 ÷ 4 = 9 m. Diện tích = 9 × 9 = 81 m².",
              rubric: "Tính cạnh 9m: 0.5đ, diện tích 81: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Lục Giác Đều & Cấu Trúc Ghép Hình",
          theory: "Lục giác đều có 6 cạnh bằng nhau, 6 góc bằng nhau, 3 đường chéo chính cắt nhau tại một điểm. Lục giác đều có thể ghép lại từ 6 tam giác đều bằng nhau.",
          exercises: [
            {
              id: "MATH6-W13-D02-Q01",
              question: "Một lục giác đều được ghép từ 6 tam giác đều bằng nhau, mỗi tam giác có diện tích 15 cm². Diện tích của lục giác đều đó là bao nhiêu cm²?",
              answer: "90",
              type: "number",
              hints: ["Lấy 15 × 6 = 90."],
              explanation: "Diện tích lục giác đều = 15 × 6 = 90 cm².",
              rubric: "Đáp số 90: 1.0đ."
            }
          ]
        }
      ]
    },
    {
      id: "w14",
      number: 14,
      title: "Hình Chữ Nhật, Hình Thoi & Hình Bình Hành",
      goal: "Phân biệt tính chất cạnh đối, đường chéo; thành thạo công thức tính diện tích hình chữ nhật, thoi và bình hành.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Hình Chữ Nhật & Hình Bình Hành",
          theory: "Diện tích hình chữ nhật: S = a × b. Diện tích hình bình hành có đáy a và chiều cao h tương ứng: S = a × h.",
          exercises: [
            {
              id: "MATH6-W14-D01-Q01",
              question: "Một mảnh vườn hình bình hành có độ dài đáy là 12 m và chiều cao tương ứng là 7 m. Diện tích mảnh vườn là bao nhiêu m²?",
              answer: "84",
              type: "number",
              hints: ["S = đáy × chiều cao = 12 × 7."],
              explanation: "Diện tích = 12 × 7 = 84 m².",
              rubric: "Đáp số 84: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Hình Thoi & Công Thức Hai Đường Chéo",
          theory: "Hình thoi có 4 cạnh bằng nhau, hai đường chéo vuông góc với nhau tại trung điểm của mỗi đường. Diện tích hình thoi có độ dài hai đường chéo m và n: S = (m × n) ÷ 2.",
          exercises: [
            {
              id: "MATH6-W14-D02-Q01",
              question: "Một con diều hình thoi có hai đường chéo dài 40 cm và 60 cm. Diện tích của con diều là bao nhiêu cm²?",
              answer: "1200",
              type: "number",
              hints: ["S = (40 × 60) ÷ 2."],
              explanation: "Diện tích = (40 × 60) ÷ 2 = 2400 ÷ 2 = 1200 cm².",
              rubric: "Đáp số 1200: 1.0đ."
            }
          ]
        }
      ]
    },
    {
      id: "w15",
      number: 15,
      title: "Hình Thang Cân & Bài Toán Diện Tích Thực Tế",
      goal: "Nhận biết hình thang cân (hai cạnh bên bằng nhau, hai góc kề một đáy bằng nhau); tính diện tích hình thang và giải bài toán lát nền.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Công Thức Diện Tích Hình Thang",
          theory: "Diện tích hình thang có đáy lớn a, đáy bé b và chiều cao h: S = ((a + b) × h) ÷ 2.",
          exercises: [
            {
              id: "MATH6-W15-D01-Q01",
              question: "Một thửa ruộng hình thang có đáy lớn 18 m, đáy bé 12 m và chiều cao 10 m. Diện tích thửa ruộng là bao nhiêu m²?",
              answer: "150",
              type: "number",
              hints: ["S = (18 + 12) × 10 ÷ 2 = 30 × 10 ÷ 2 = 150."],
              explanation: "Diện tích = (18 + 12) × 10 ÷ 2 = 150 m².",
              rubric: "Đáp số 150: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Ứng Dụng Thực Tế: Lát Nền & Sơn Tường",
          theory: "Số viên gạch cần dùng = Diện tích sàn ÷ Diện tích một viên gạch. Chú ý đổi về cùng một đơn vị đo diện tích trước khi chia.",
          exercises: [
            {
              id: "MATH6-W15-D02-Q01",
              question: "Bác An lát nền một căn phòng hình chữ nhật dài 6 m, rộng 4 m bằng các viên gạch men hình vuông cạnh 40 cm. Bác An cần bao nhiêu viên gạch? (Bỏ qua mạch vữa)",
              answer: "150",
              type: "number",
              hints: ["Diện tích sàn: 6 × 4 = 24 m² = 240.000 cm². Diện tích 1 viên gạch: 40 × 40 = 1.600 cm². Số gạch = 240.000 ÷ 1.600."],
              explanation: "Sàn = 24 m² = 240000 cm². Gạch = 1600 cm². Số gạch = 240000 ÷ 1600 = 150 viên.",
              rubric: "Đổi đơn vị đúng: 0.5đ, kết quả 150 viên: 0.5đ."
            }
          ]
        }
      ]
    }
  ]
};
