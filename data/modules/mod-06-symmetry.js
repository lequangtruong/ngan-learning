// data/modules/mod-06-symmetry.js - Chuyên đề 6: Tính Đối Xứng Của Hình Phẳng (Tuần 16 - 18)

export const MODULE_06_SYMMETRY = {
  id: "mod-06-symmetry",
  title: "Tính Đối Xứng Trong Hình Học & Đời Sống",
  focus: "Trục đối xứng, Tâm đối xứng của các hình học cơ bản (tam giác đều, tròn, vuông, thoi) và chữ cái in hoa",
  weeks: [
    {
      id: "w16",
      number: 16,
      title: "Hình Có Trục Đối Xứng",
      goal: "Nhận biết hình có trục đối xứng, xác định số lượng trục đối xứng của các hình phẳng quen thuộc.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Khái Niệm Trục Đối Xứng",
          theory: "Đường thẳng d là trục đối xứng của hình H nếu khi gấp hình theo đường thẳng d, hai phần của hình trùng khít lên nhau.",
          exercises: [
            {
              id: "MATH6-W16-D01-Q01",
              question: "Hình vuông có bao nhiêu trục đối xứng? (Nhập số)",
              answer: "4",
              type: "number",
              hints: ["Gồm 2 đường chéo và 2 đường nối trung điểm các cặp cạnh đối diện."],
              explanation: "Hình vuông có đúng 4 trục đối xứng.",
              rubric: "Đáp số 4: 1.0đ."
            },
            {
              id: "MATH6-W16-D01-Q02",
              question: "Tam giác đều có bao nhiêu trục đối xứng?",
              answer: "3",
              type: "number",
              hints: ["Là 3 đường cao (đồng thời là trung tuyến) kẻ từ 3 đỉnh."],
              explanation: "Tam giác đều có đúng 3 trục đối xứng.",
              rubric: "Đáp số 3: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Trục Đối Xứng Của Chữ Cái & Đời Sống",
          theory: "Nhiều chữ cái in hoa tiếng Việt có trục đối xứng: A (dọc), M (dọc), H (cả dọc và ngang), O (vô số).",
          exercises: [
            {
              id: "MATH6-W16-D02-Q01",
              question: "Trong các chữ cái sau: A, F, G, L. Chữ cái nào có trục đối xứng? (Nhập một chữ cái in hoa)",
              answer: "A",
              type: "text",
              hints: ["Chữ A có trục đối xứng thẳng đứng chia đôi."],
              explanation: "Chữ A có trục đối xứng thẳng đứng. Các chữ F, G, L không có trục đối xứng.",
              rubric: "Đáp án đúng chữ A: 1.0đ."
            }
          ]
        }
      ]
    },
    {
      id: "w17",
      number: 17,
      title: "Hình Có Tâm Đối Xứng",
      goal: "Nhận biết tâm đối xứng của hình tròn, hình vuông, hình thoi, hình bình hành; đối xứng qua phép quay 180°.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Khái Niệm Tâm Đối Xứng",
          theory: "Điểm O là tâm đối xứng của hình H nếu khi quay hình H xung quanh điểm O nửa vòng (180°), hình thu được trùng khít với hình ban đầu.",
          exercises: [
            {
              id: "MATH6-W17-D01-Q01",
              question: "Trong các hình: Tam giác đều, Hình chữ nhật, Hình thang cân. Hình nào CÓ TÂM ĐỐI XỨNG? (Nhập: Tam giác đều, Hình chữ nhật, hoặc Hình thang cân)",
              answer: "Hình chữ nhật",
              type: "text",
              hints: ["Giao điểm 2 đường chéo của hình chữ nhật là tâm đối xứng."],
              explanation: "Hình chữ nhật có tâm đối xứng là giao điểm 2 đường chéo. Tam giác đều và hình thang cân không có tâm đối xứng.",
              rubric: "Đáp số Hình chữ nhật: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Tâm Đối Xứng Của Các Chữ Cái",
          theory: "Các chữ cái có tâm đối xứng quen thuộc: N, S, Z, H, O, I.",
          exercises: [
            {
              id: "MATH6-W17-D02-Q01",
              question: "Trong các chữ: M, N, E, P. Chữ cái nào CÓ TÂM ĐỐI XỨNG? (Nhập chữ in hoa)",
              answer: "N",
              type: "text",
              hints: ["Quay chữ N 180 độ vẫn ra chính nó."],
              explanation: "Chữ N có tâm đối xứng tại trung điểm đoạn chéo.",
              rubric: "Đáp số N: 1.0đ."
            }
          ]
        }
      ]
    },
    {
      id: "w18",
      number: 18,
      title: "Hình Vừa Có Trục Đối Xứng, Vừa Có Tâm Đối Xứng",
      goal: "Tổng kết so sánh hai tính chất đối xứng; ứng dụng trong họa tiết gạch bông, logo và quốc kỳ các nước.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Tổng Hợp Đối Xứng Các Hình Phẳng",
          theory: "Hình tròn, hình vuông, hình thoi, hình chữ nhật đều VỪA CÓ TRỤC ĐỐI XỨNG, VỪA CÓ TÂM ĐỐI XỨNG.",
          exercises: [
            {
              id: "MATH6-W18-D01-Q01",
              question: "Hình thoi có bao nhiêu trục đối xứng?",
              answer: "2",
              type: "number",
              hints: ["Hai đường chéo của hình thoi chính là 2 trục đối xứng."],
              explanation: "Hình thoi có 2 trục đối xứng (chính là 2 đường chéo).",
              rubric: "Đáp số 2: 1.0đ."
            }
          ]
        }
      ]
    }
  ]
};
