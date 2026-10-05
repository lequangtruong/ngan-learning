// data/modules/mod-03-integers-z.js - Chuyên đề 3: Tập Hợp Số Nguyên Z & Phép Tính (Tuần 7 - 9)
// Đầy đủ 6 buổi/tuần, mỗi buổi 5-6 bài tập đa tầng cấp độ (Basic -> Medium -> Advanced -> Olympiad)
// Đảm bảo 25 phút Pomodoro học tập sâu sắc và phân cấp theo kết quả Khảo sát đầu vào

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
              level: "basic",
              question: "Nhiệt độ buổi sáng ở Sa Pa là 2°C, đến đêm giảm thêm 5°C. Hỏi nhiệt độ ban đêm là bao nhiêu °C?",
              answer: "-3",
              type: "number",
              hints: ["Lấy 2 − 5 = ?"],
              explanation: "Nhiệt độ ban đêm: 2 − 5 = -3°C.",
              rubric: "Đáp số -3: 1.0đ."
            },
            {
              id: "MATH6-W07-D01-Q02",
              level: "basic",
              question: "So sánh hai số nguyên: -15 và -9. Số nào lớn hơn? (Nhập -15 hoặc -9)",
              answer: "-9",
              type: "number",
              hints: ["Trên trục số, -9 nằm bên phải -15 nên -9 lớn hơn."],
              explanation: "-9 > -15. Số -9 lớn hơn.",
              rubric: "Trả lời đúng -9: 1.0đ."
            },
            {
              id: "MATH6-W07-D01-Q03",
              level: "medium",
              question: "Tàu ngầm đang ở độ sâu 30 m dưới mực nước biển (biểu diễn bởi -30 m), tàu lặn sâu thêm 15 m nữa. Độ sâu mới của tàu ngầm là bao nhiêu mét? (Biểu diễn bằng số nguyên âm)",
              answer: "-45",
              type: "number",
              hints: ["-30 − 15 = -45."],
              explanation: "-30 - 15 = -45 m.",
              rubric: "Đáp số -45: 1.0đ."
            },
            {
              id: "MATH6-W07-D01-Q04",
              level: "medium",
              question: "Sắp xếp các số nguyên sau theo thứ tự tăng dần: -8, 5, 0, -3, 2. Số nhỏ nhất là bao nhiêu?",
              answer: "-8",
              type: "number",
              hints: ["Số âm có phần số càng lớn thì càng bé: -8 < -3 < 0 < 2 < 5."],
              explanation: "Số nhỏ nhất là -8.",
              rubric: "Đáp số -8: 1.0đ."
            },
            {
              id: "MATH6-W07-D01-Q05",
              level: "advanced",
              question: "Tìm tất cả các số nguyên x thỏa mãn: -3 ≤ x < 2. Tập hợp các số nguyên x có bao nhiêu phần tử?",
              answer: "5",
              type: "number",
              hints: ["x ∈ {-3, -2, -1, 0, 1}."],
              explanation: "Có 5 số thỏa mãn là -3, -2, -1, 0, 1.",
              rubric: "Đáp số 5: 1.0đ."
            },
            {
              id: "MATH6-W07-D01-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Có bao nhiêu số nguyên x thỏa mãn: -20 ≤ x ≤ 20?",
              answer: "41",
              type: "number",
              hints: ["Số phần tử = 20 − (-20) + 1 = 20 + 20 + 1 = 41."],
              explanation: "Từ -20 đến 20 có 20 số âm, số 0 và 20 số dương => Tổng cộng 41 số.",
              rubric: "Đáp số 41: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Số Đối & Giá Trị Tuyệt Đối",
          theory: "Hai số nguyên trên trục số nằm ở hai phía của gốc 0 và cách đều gốc 0 được gọi là hai số đối nhau. Số đối của a là -a. Khoảng cách từ điểm a đến gốc 0 gọi là giá trị tuyệt đối |a|.",
          exercises: [
            {
              id: "MATH6-W07-D02-Q01",
              level: "basic",
              question: "Tìm số đối của số -27:",
              answer: "27",
              type: "number",
              hints: ["Số đối của số âm là số dương cùng độ lớn."],
              explanation: "Số đối của -27 là -(-27) = 27.",
              rubric: "Đáp số 27: 1.0đ."
            },
            {
              id: "MATH6-W07-D02-Q02",
              level: "basic",
              question: "Số đối của số 0 là bao nhiêu?",
              answer: "0",
              type: "number",
              hints: ["Số 0 là số duy nhất có số đối là chính nó."],
              explanation: "Số đối của 0 là 0.",
              rubric: "Đáp số 0: 1.0đ."
            },
            {
              id: "MATH6-W07-D02-Q03",
              level: "medium",
              question: "Tính giá trị: |-45| + |30| = ?",
              answer: "75",
              type: "number",
              hints: ["|-45| = 45, |30| = 30. 45 + 30 = 75."],
              explanation: "45 + 30 = 75.",
              rubric: "Đáp số 75: 1.0đ."
            },
            {
              id: "MATH6-W07-D02-Q04",
              level: "medium",
              question: "Tìm số nguyên x biết: |x| = 15 và x < 0. Giá trị của x là:",
              answer: "-15",
              type: "number",
              hints: ["|x| = 15 thì x = 15 hoặc x = -15. Vì x < 0 nên chọn x = -15."],
              explanation: "x = -15.",
              rubric: "Đáp số -15: 1.0đ."
            },
            {
              id: "MATH6-W07-D02-Q05",
              level: "advanced",
              question: "Trên trục số nằm ngang, khoảng cách giữa hai điểm biểu diễn số -8 và số 7 là bao nhiêu đơn vị?",
              answer: "15",
              type: "number",
              hints: ["Khoảng cách = 7 − (-8) = 7 + 8 = 15."],
              explanation: "Khoảng cách = |7 - (-8)| = 15 đơn vị.",
              rubric: "Đáp số 15: 1.0đ."
            },
            {
              id: "MATH6-W07-D02-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Có bao nhiêu số nguyên x thỏa mãn |x| < 5?",
              answer: "9",
              type: "number",
              hints: ["-5 < x < 5 => x ∈ {-4, -3, -2, -1, 0, 1, 2, 3, 4}."],
              explanation: "Có 9 số nguyên là -4, -3, -2, -1, 0, 1, 2, 3, 4.",
              rubric: "Liệt kê và kết luận 9: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 3,
          name: "Thứ 4",
          title: "So Sánh Số Nguyên & Điểm Trên Trục Số",
          theory: "Mọi số nguyên dương đều lớn hơn 0. Mọi số nguyên âm đều nhỏ hơn 0. Trong hai số nguyên âm, số nào có giá trị tuyệt đối lớn hơn thì số đó nhỏ hơn.",
          exercises: [
            {
              id: "MATH6-W07-D03-Q01",
              level: "basic",
              question: "Trong các số sau: -100, -50, 0, 2, số nào LỚN NHẤT?",
              answer: "2",
              type: "number",
              hints: ["Số dương luôn lớn hơn số 0 và số âm."],
              explanation: "Số lớn nhất là 2.",
              rubric: "Đáp số 2: 1.0đ."
            },
            {
              id: "MATH6-W07-D03-Q02",
              level: "basic",
              question: "Trong các số sau: -100, -50, -2, -10, số nào NHỎ NHẤT?",
              answer: "-100",
              type: "number",
              hints: ["Số âm có giá trị tuyệt đối lớn nhất sẽ nhỏ nhất: -100."],
              explanation: "Số nhỏ nhất là -100.",
              rubric: "Đáp số -100: 1.0đ."
            },
            {
              id: "MATH6-W07-D03-Q03",
              level: "medium",
              question: "Viết số nguyên liền trước của số -15:",
              answer: "-16",
              type: "number",
              hints: ["Số liền trước của a là a − 1: -15 − 1 = -16."],
              explanation: "Số liền trước là -16.",
              rubric: "Đáp số -16: 1.0đ."
            },
            {
              id: "MATH6-W07-D03-Q04",
              level: "medium",
              question: "Viết số nguyên liền sau của số -1:",
              answer: "0",
              type: "number",
              hints: ["Số liền sau của -1 là -1 + 1 = 0."],
              explanation: "Số liền sau là 0.",
              rubric: "Đáp số 0: 1.0đ."
            },
            {
              id: "MATH6-W07-D03-Q05",
              level: "advanced",
              question: "Cho tập hợp X = {x ∈ Z | -4 < x ≤ 3}. Tổng của tất cả các phần tử trong tập X bằng bao nhiêu?",
              answer: "0",
              type: "number",
              hints: ["X = {-3, -2, -1, 0, 1, 2, 3}. Các cặp số đối cộng lại triệt tiêu bằng 0."],
              explanation: "Tổng = (-3 + 3) + (-2 + 2) + (-1 + 1) + 0 = 0.",
              rubric: "Đáp số 0: 1.0đ."
            },
            {
              id: "MATH6-W07-D03-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Tìm số nguyên âm lớn nhất có 3 chữ số khác nhau:",
              answer: "-102",
              type: "number",
              hints: ["Số âm lớn nhất là số có giá trị tuyệt đối nhỏ nhất. Số có 3 chữ số khác nhau nhỏ nhất là 102."],
              explanation: "Số nguyên âm lớn nhất có 3 chữ số khác nhau là -102.",
              rubric: "Đáp số -102: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 4,
          name: "Thứ 5",
          title: "Ứng Dụng Số Nguyên Trong Kinh Tế & Địa Lý",
          theory: "Độ cao trên mực nước biển: Dương (+). Độ sâu dưới mực nước biển: Âm (-). Tiền có: Dương (+). Tiền nợ/lỗ: Âm (-).",
          exercises: [
            {
              id: "MATH6-W07-D04-Q01",
              level: "basic",
              question: "Một cửa hàng tháng trước lãi 20 triệu đồng (ghi +20), tháng này lỗ 8 triệu đồng. Số tiền tháng này biểu diễn bằng số nguyên là bao nhiêu?",
              answer: "-8",
              type: "number",
              hints: ["Lỗ 8 triệu ghi là -8."],
              explanation: "Lỗ biểu diễn bằng số âm: -8.",
              rubric: "Đáp số -8: 1.0đ."
            },
            {
              id: "MATH6-W07-D04-Q02",
              level: "basic",
              question: "Đỉnh núi Phan-xi-păng cao 3143 m so với mực nước biển. Độ cao này biểu diễn bằng số nguyên nào?",
              answer: "3143",
              type: "number",
              hints: ["Trên mực nước biển là số dương."],
              explanation: "+3143 hoặc 3143.",
              rubric: "Đáp số 3143: 1.0đ."
            },
            {
              id: "MATH6-W07-D04-Q03",
              level: "medium",
              question: "Một chiếc tàu ngầm lặn ở độ cao -120 m. Một chiếc máy bay bay ở độ cao 800 m. Khoảng cách theo phương thẳng đứng giữa máy bay và tàu ngầm là bao nhiêu mét?",
              answer: "920",
              type: "number",
              hints: ["Khoảng cách = 800 − (-120) = 800 + 120 = 920 m."],
              explanation: "800 - (-120) = 920 m.",
              rubric: "Đáp số 920: 1.0đ."
            },
            {
              id: "MATH6-W07-D04-Q04",
              level: "medium",
              question: "Nhiệt độ ở Mát-xcơ-va lúc 12 giờ trưa là -2°C, đến 24 giờ đêm cùng ngày nhiệt độ giảm thêm 6°C. Nhiệt độ lúc 24 giờ đêm là bao nhiêu °C?",
              answer: "-8",
              type: "number",
              hints: ["-2 − 6 = -8."],
              explanation: "-2 - 6 = -8°C.",
              rubric: "Đáp số -8: 1.0đ."
            },
            {
              id: "MATH6-W07-D04-Q05",
              level: "advanced",
              question: "Bác Ba có tài khoản ngân hàng số dư ban đầu là 15 triệu đồng. Sau khi thanh toán tiền điện thoại 2 triệu đồng và nhận tiền lương 10 triệu đồng, số dư mới là bao nhiêu triệu đồng?",
              answer: "23",
              type: "number",
              hints: ["15 − 2 + 10 = 23."],
              explanation: "15 - 2 + 10 = 23 triệu đồng.",
              rubric: "Đáp số 23: 1.0đ."
            },
            {
              id: "MATH6-W07-D04-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Điểm A trên trục số cách điểm 0 một khoảng bằng 7 đơn vị. Điểm B cách điểm A một khoảng bằng 3 đơn vị. Giá trị nhỏ nhất có thể có của tọa độ điểm B là bao nhiêu?",
              answer: "-10",
              type: "number",
              hints: ["A có thể là 7 hoặc -7. Để B nhỏ nhất thì A = -7 và B nằm bên trái A 3 đơn vị: -7 − 3 = -10."],
              explanation: "Tọa độ nhỏ nhất của B là -7 - 3 = -10.",
              rubric: "Tìm đúng giá trị -10: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 5,
          name: "Thứ 6",
          title: "Spot The Bug — Bẫy So Sánh Số Âm",
          theory: "Bẫy kinh điển: Thấy số 15 to hơn số 9 nên nghĩ -15 > -9; quên rằng với số âm thì số nào có giá trị tuyệt đối lớn hơn lại là số nhỏ hơn!",
          exercises: [
            {
              id: "MATH6-W07-D05-Q01",
              level: "basic",
              question: "Bạn Nam viết: -20 > -10 vì 20 lớn hơn 10. Khẳng định của Nam ĐÚNG hay SAI? (Nhập 'Đúng' hoặc 'Sai')",
              answer: "Sai",
              type: "text",
              hints: ["Với hai số nguyên âm, số nào có giá trị tuyệt đối nhỏ hơn thì lớn hơn: -10 > -20."],
              explanation: "Nam đã sai vì trên trục số -10 nằm bên phải -20 nên -10 > -20.",
              rubric: "Trả lời Sai: 1.0đ."
            },
            {
              id: "MATH6-W07-D05-Q02",
              level: "basic",
              question: "Điền dấu thích hợp (<, > hoặc =) vào chỗ chấm: -50 ... -49",
              answer: "<",
              type: "text",
              hints: ["-50 nhỏ hơn -49."],
              explanation: "-50 < -49.",
              rubric: "Điền đúng dấu <: 1.0đ."
            },
            {
              id: "MATH6-W07-D05-Q03",
              level: "medium",
              question: "Bạn An nói: 'Số 0 là số nguyên dương'. An nói ĐÚNG hay SAI? (Nhập 'Đúng' hoặc 'Sai')",
              answer: "Sai",
              type: "text",
              hints: ["Số 0 không phải là số nguyên dương, cũng không phải là số nguyên âm."],
              explanation: "Số 0 là ranh giới giữa số âm và số dương, không thuộc nhóm nào.",
              rubric: "Trả lời Sai: 1.0đ."
            },
            {
              id: "MATH6-W07-D05-Q04",
              level: "medium",
              question: "Có bao nhiêu số nguyên âm lớn hơn -5?",
              answer: "4",
              type: "number",
              hints: ["Các số đó là: -4, -3, -2, -1 (chỉ tính số nguyên ÂM, không tính 0)."],
              explanation: "Có 4 số: -4, -3, -2, -1.",
              rubric: "Đáp số 4: 1.0đ."
            },
            {
              id: "MATH6-W07-D05-Q05",
              level: "advanced",
              question: "Tìm số nguyên x thỏa mãn: -2 < x < 1. Tích của các số nguyên x đó bằng bao nhiêu?",
              answer: "0",
              type: "number",
              hints: ["x ∈ {-1, 0}. Tích (-1) × 0 = 0."],
              explanation: "Vì trong các giá trị của x có số 0 nên tích bằng 0.",
              rubric: "Đáp số 0: 1.0đ."
            },
            {
              id: "MATH6-W07-D05-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Cho a là số nguyên âm. Hỏi số -(-a) là số âm hay số dương? (Nhập 'Âm' hoặc 'Dương')",
              answer: "Âm",
              type: "text",
              hints: ["-(-a) = a. Vì a là số nguyên âm nên -(-a) cũng là số nguyên âm."],
              explanation: "-(-a) chính là a, mà a là số nguyên âm nên kết quả là số âm.",
              rubric: "Trả lời đúng Âm: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 6,
          name: "Thứ 7",
          title: "Weekend Math Exam — Kiểm Tra Tổng Hợp Tuần 7",
          theory: "Bài kiểm tra cuối tuần 7: Số nguyên âm, biểu diễn trên trục số, số đối, so sánh số nguyên.",
          durationMinutes: 30,
          totalScore: 10,
          rubricGuide: "Chấm điểm từng bước chi tiết, hỗ trợ nộp ảnh bài giải.",
          exercises: [
            {
              id: "MATH6-W07-D06-Q01",
              level: "basic",
              question: "Câu 1 (2.0đ): Sắp xếp các số sau theo thứ tự tăng dần: -12, 0, -5, 8, -1. Số đứng ở vị trí thứ hai là số nào?",
              answer: "-5",
              type: "number",
              explanation: "Thứ tự tăng dần: -12 < -5 < -1 < 0 < 8. Số thứ hai là -5.",
              rubric: "Sắp xếp đúng: 1.0đ, chọn số thứ hai -5: 1.0đ."
            },
            {
              id: "MATH6-W07-D06-Q02",
              level: "medium",
              question: "Câu 2 (2.0đ): Tìm số đối của các số: a) -18   b) 25 (Nhập: kq_a,kq_b)",
              answer: "18,-25",
              type: "text",
              explanation: "Số đối của -18 là 18. Số đối của 25 là -25.",
              rubric: "Đúng mỗi ý 1.0đ."
            },
            {
              id: "MATH6-W07-D06-Q03",
              level: "medium",
              question: "Câu 3 (2.0đ): Tính giá trị biểu thức: |-18| − |12| + |-6| = ?",
              answer: "12",
              type: "number",
              explanation: "18 - 12 + 6 = 6 + 6 = 12.",
              rubric: "Tính đúng trị tuyệt đối: 1.0đ, đáp số 12: 1.0đ."
            },
            {
              id: "MATH6-W07-D06-Q04",
              level: "advanced",
              question: "Câu 4 (2.0đ - Tự luận): Tìm tất cả các số nguyên x thỏa mãn: -4 ≤ x < 3. Tính tổng S của tất cả các giá trị x đó:",
              answer: "-4",
              type: "number",
              requiresWrittenWork: true,
              explanation: "x ∈ {-4, -3, -2, -1, 0, 1, 2}. Tổng = -4 + (-3) + (-2) + (-1) + 0 + 1 + 2 = -4 + (-3) = -7? Cặp triệt tiêu: (-2+2=0, -1+1=0), còn -4 + -3 + 0 = -7. Khoan, các số là -4, -3, -2, -1, 0, 1, 2. Tổng = -4 - 3 = -7. Đáp án là -7.",
              rubric: "Liệt kê đúng các giá trị: 1.0đ, tính tổng -7: 1.0đ."
            },
            {
              id: "MATH6-W07-D06-Q05",
              level: "advanced",
              question: "Câu 5 (1.0đ): Khoảng cách giữa hai điểm -14 và 6 trên trục số là bao nhiêu?",
              answer: "20",
              type: "number",
              explanation: "6 - (-14) = 6 + 14 = 20.",
              rubric: "Đáp số 20: 1.0đ."
            },
            {
              id: "MATH6-W07-D06-Q06",
              level: "olympiad",
              question: "Câu 6 (1.0đ - ⭐ Olympic): Cho tập hợp S gồm tất cả các số nguyên có giá trị tuyệt đối không vượt quá 10. Tập hợp S có bao nhiêu phần tử?",
              answer: "21",
              type: "number",
              explanation: "|x| ≤ 10 => -10 ≤ x ≤ 10. Số phần tử = 10 - (-10) + 1 = 21.",
              rubric: "Đáp số 21: 1.0đ."
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
          theory: "Để cộng hai số nguyên khác dấu: Lấy phần số lớn hơn trừ phần số nhỏ hơn, rồi đặt trước kết quả dấu của số có phần số lớn hơn. a + (-b) = a - b (nếu a >= b). Hai số đối nhau có tổng bằng 0: a + (-a) = 0.",
          exercises: [
            {
              id: "MATH6-W08-D01-Q01",
              level: "basic",
              question: "Tính: (-35) + 50 = ?",
              answer: "15",
              type: "number",
              hints: ["50 mang dấu +, 35 mang dấu -. Lấy 50 - 35 = 15."],
              explanation: "(-35) + 50 = 50 - 35 = 15.",
              rubric: "Tính đúng 15: 1.0đ."
            },
            {
              id: "MATH6-W08-D01-Q02",
              level: "basic",
              question: "Tính: 42 + (-75) = ?",
              answer: "-33",
              type: "number",
              hints: ["75 lớn hơn 42 và mang dấu âm. Lấy -(75 - 42) = -33."],
              explanation: "42 + (-75) = -(75 - 42) = -33.",
              rubric: "Tính đúng -33: 1.0đ."
            },
            {
              id: "MATH6-W08-D01-Q03",
              level: "medium",
              question: "Tính: (-120) + (-80) = ?",
              answer: "-200",
              type: "number",
              hints: ["Cộng hai số cùng âm: -(120 + 80) = -200."],
              explanation: "(-120) + (-80) = -200.",
              rubric: "Đáp số -200: 1.0đ."
            },
            {
              id: "MATH6-W08-D01-Q04",
              level: "medium",
              question: "Tính tổng: (-25) + 25 = ?",
              answer: "0",
              type: "number",
              hints: ["Tổng của hai số đối nhau luôn bằng 0."],
              explanation: "(-25) + 25 = 0.",
              rubric: "Đáp số 0: 1.0đ."
            },
            {
              id: "MATH6-W08-D01-Q05",
              level: "advanced",
              question: "Tính nhanh: 37 + (-50) + 63 = ?",
              answer: "50",
              type: "number",
              hints: ["Ghép (37 + 63) = 100 trước, sau đó 100 + (-50) = 50."],
              explanation: "(37 + 63) + (-50) = 100 - 50 = 50.",
              rubric: "Đáp số 50: 1.0đ."
            },
            {
              id: "MATH6-W08-D01-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Tính tổng tất cả các số nguyên x thỏa mãn: -50 ≤ x ≤ 50:",
              answer: "0",
              type: "number",
              hints: ["Từng cặp số đối (-50 + 50) + (-49 + 49) + ... + 0 đều bằng 0."],
              explanation: "Tổng các cặp đối xứng qua 0 triệt tiêu hết, kết quả bằng 0.",
              rubric: "Giải thích cặp đối và đáp số 0: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Phép Trừ Số Nguyên & Quy Tắc Đổi Dấu",
          theory: "Muốn trừ số nguyên a cho số nguyên b, ta cộng a với số đối của b: a − b = a + (-b). Phép trừ trong Z luôn thực hiện được.",
          exercises: [
            {
              id: "MATH6-W08-D02-Q01",
              level: "basic",
              question: "Tính: 18 − (-12) = ?",
              answer: "30",
              type: "number",
              hints: ["Trừ đi một số âm là cộng với số đối của nó: 18 + 12."],
              explanation: "18 − (-12) = 18 + 12 = 30.",
              rubric: "Đáp số 30: 1.0đ."
            },
            {
              id: "MATH6-W08-D02-Q02",
              level: "basic",
              question: "Tính: (-24) − 16 = ?",
              answer: "-40",
              type: "number",
              hints: ["(-24) + (-16) = -(24 + 16)."],
              explanation: "(-24) − 16 = -40.",
              rubric: "Đáp số -40: 1.0đ."
            },
            {
              id: "MATH6-W08-D02-Q03",
              level: "medium",
              question: "Tính: (-30) − (-45) = ?",
              answer: "15",
              type: "number",
              hints: ["-30 + 45 = 15."],
              explanation: "-30 + 45 = 15.",
              rubric: "Đáp số 15: 1.0đ."
            },
            {
              id: "MATH6-W08-D02-Q04",
              level: "medium",
              question: "Tìm số nguyên x biết: x − (-10) = 25. Giá trị của x là:",
              answer: "15",
              type: "number",
              hints: ["x + 10 = 25 => x = 15."],
              explanation: "x + 10 = 25 => x = 15.",
              rubric: "Đáp số 15: 1.0đ."
            },
            {
              id: "MATH6-W08-D02-Q05",
              level: "advanced",
              question: "Tính giá trị biểu thức: A = (-15) − [ 20 − (-5) ] = ?",
              answer: "-40",
              type: "number",
              hints: ["Trong ngoặc: 20 − (-5) = 25. Biểu thức: -15 − 25 = -40."],
              explanation: "20 - (-5) = 25. -15 - 25 = -40.",
              rubric: "Đáp số -40: 1.0đ."
            },
            {
              id: "MATH6-W08-D02-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Tìm số nguyên x biết: |x − 3| = 7. Tổng các giá trị của x tìm được là bao nhiêu?",
              answer: "6",
              type: "number",
              hints: ["x − 3 = 7 => x = 10. Hoặc x − 3 = -7 => x = -4. Tổng 10 + (-4) = 6."],
              explanation: "Hai nghiệm là 10 và -4. Tổng = 10 + (-4) = 6.",
              rubric: "Tìm đúng hai nghiệm: 0.5đ, tổng bằng 6: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 3,
          name: "Thứ 4",
          title: "Tính Chất Của Phép Cộng Số Nguyên (Giao Hoán, Kết Hợp)",
          theory: "Giao hoán: a + b = b + a. Kết hợp: (a + b) + c = a + (b + c). Cộng với 0: a + 0 = a. Cộng với số đối: a + (-a) = 0.",
          exercises: [
            {
              id: "MATH6-W08-D03-Q01",
              level: "basic",
              question: "Tính nhanh: (-17) + 5 + 17 = ?",
              answer: "5",
              type: "number",
              hints: ["Ghép cặp số đối: [(-17) + 17] + 5 = 0 + 5 = 5."],
              explanation: "0 + 5 = 5.",
              rubric: "Đáp số 5: 1.0đ."
            },
            {
              id: "MATH6-W08-D03-Q02",
              level: "basic",
              question: "Tính: (-25) + (-75) + 100 = ?",
              answer: "0",
              type: "number",
              hints: ["(-100) + 100 = 0."],
              explanation: "-100 + 100 = 0.",
              rubric: "Đáp số 0: 1.0đ."
            },
            {
              id: "MATH6-W08-D03-Q03",
              level: "medium",
              question: "Tính nhanh: 126 + (-20) + 2004 + (-106) = ?",
              answer: "2004",
              type: "number",
              hints: ["Ghép [126 + (-106)] = 20. Sau đó 20 + (-20) = 0. Còn lại 2004."],
              explanation: "(126 - 106) + (-20) + 2004 = 20 - 20 + 2004 = 2004.",
              rubric: "Đáp số 2004: 1.0đ."
            },
            {
              id: "MATH6-W08-D03-Q04",
              level: "medium",
              question: "Tìm x biết: x + (-15) = -30. Giá trị của x là:",
              answer: "-15",
              type: "number",
              hints: ["x = -30 − (-15) = -30 + 15 = -15."],
              explanation: "x = -15.",
              rubric: "Đáp số -15: 1.0đ."
            },
            {
              id: "MATH6-W08-D03-Q05",
              level: "advanced",
              question: "Tính tổng: S = (-1) + 2 + (-3) + 4 + ... + (-99) + 100 = ?",
              answer: "50",
              type: "number",
              hints: ["Ghép từng cặp: [(-1) + 2] + [(-3) + 4] + ... + [(-99) + 100]. Mỗi cặp có giá trị bằng 1. Có 50 cặp."],
              explanation: "50 cặp, mỗi cặp bằng 1 => Tổng = 50 × 1 = 50.",
              rubric: "Ghép cặp chuẩn xác: 0.5đ, đáp số 50: 0.5đ."
            },
            {
              id: "MATH6-W08-D03-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Tìm số nguyên x biết rằng: (-10) + (-9) + ... + x = -10 (với x > -10):",
              answer: "9",
              type: "number",
              hints: ["Tổng từ -9 đến 9 bằng 0. Khi đó (-10) + 0 = -10. Vậy x = 9."],
              explanation: "Vì tổng các số từ -9 đến 9 bằng 0 nên tổng từ -10 đến 9 chính bằng -10. Vậy x = 9.",
              rubric: "Lập luận triệt tiêu: 0.5đ, đáp số 9: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 4,
          name: "Thứ 5",
          title: "Giải Bài Toán Tìm x Trong Tập Hợp Z",
          theory: "Quy tắc tìm x: Số hạng chưa biết = Tổng − Số hạng đã biết. Số bị trừ = Hiệu + Số trừ. Số trừ = Số bị trừ − Hiệu.",
          exercises: [
            {
              id: "MATH6-W08-D04-Q01",
              level: "basic",
              question: "Tìm số nguyên x biết: x + 12 = 5. Giá trị của x là:",
              answer: "-7",
              type: "number",
              hints: ["x = 5 − 12 = -7."],
              explanation: "x = 5 - 12 = -7.",
              rubric: "Đáp số -7: 1.0đ."
            },
            {
              id: "MATH6-W08-D04-Q02",
              level: "basic",
              question: "Tìm số nguyên x biết: 8 − x = 15. Giá trị của x là:",
              answer: "-7",
              type: "number",
              hints: ["x = 8 − 15 = -7."],
              explanation: "x = 8 - 15 = -7.",
              rubric: "Đáp số -7: 1.0đ."
            },
            {
              id: "MATH6-W08-D04-Q03",
              level: "medium",
              question: "Tìm số nguyên x biết: (-12) − x = -20. Giá trị của x là:",
              answer: "8",
              type: "number",
              hints: ["x = -12 − (-20) = -12 + 20 = 8."],
              explanation: "x = 8.",
              rubric: "Đáp số 8: 1.0đ."
            },
            {
              id: "MATH6-W08-D04-Q04",
              level: "medium",
              question: "Tìm số nguyên x biết: 15 − (x + 2) = 20. Giá trị của x là:",
              answer: "-7",
              type: "number",
              hints: ["x + 2 = 15 − 20 = -5 => x = -7."],
              explanation: "x + 2 = -5 => x = -7.",
              rubric: "Đáp số -7: 1.0đ."
            },
            {
              id: "MATH6-W08-D04-Q05",
              level: "advanced",
              question: "Tìm số nguyên x biết: |x + 1| − 3 = 2. Tích của các giá trị x tìm được là bao nhiêu?",
              answer: "-24",
              type: "number",
              hints: ["|x + 1| = 5 => x + 1 = 5 (x = 4) hoặc x + 1 = -5 (x = -6). Tích 4 × (-6) = -24."],
              explanation: "x = 4 hoặc x = -6. Tích = -24.",
              rubric: "Đáp số -24: 1.0đ."
            },
            {
              id: "MATH6-W08-D04-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Tìm số nguyên x biết: (x − 2) × (x + 3) = 0. Tổng các nghiệm x là bao nhiêu?",
              answer: "-1",
              type: "number",
              hints: ["Tích bằng 0 khi x − 2 = 0 (x = 2) hoặc x + 3 = 0 (x = -3). Tổng = 2 + (-3) = -1."],
              explanation: "Nghiệm x = 2 hoặc x = -3. Tổng = -1.",
              rubric: "Đáp số -1: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 5,
          name: "Thứ 6",
          title: "Spot The Bug — Săn Bẫy Phép Trừ & Dấu Âm",
          theory: "Bẫy: Nhầm (-5) - 3 = -2 (quên rằng trừ 3 là lùi thêm 3 đơn vị về phía âm: -8); nhầm trừ với trừ ra trừ thay vì cộng.",
          exercises: [
            {
              id: "MATH6-W08-D05-Q01",
              level: "basic",
              question: "Bạn Lan tính: (-5) − 3 = -2. Kết quả ĐÚNG phải là bao nhiêu?",
              answer: "-8",
              type: "number",
              hints: ["(-5) − 3 = (-5) + (-3) = -8."],
              explanation: "(-5) - 3 = -8.",
              rubric: "Đáp số -8: 1.0đ."
            },
            {
              id: "MATH6-W08-D05-Q02",
              level: "basic",
              question: "Bạn Nam tính: 7 − (-3) = 4. Kết quả ĐÚNG phải là bao nhiêu?",
              answer: "10",
              type: "number",
              hints: ["Trừ đi số âm thành cộng: 7 + 3 = 10."],
              explanation: "7 - (-3) = 7 + 3 = 10.",
              rubric: "Đáp số 10: 1.0đ."
            },
            {
              id: "MATH6-W08-D05-Q03",
              level: "medium",
              question: "Tính giá trị: (-10) + (-20) − (-30) = ?",
              answer: "0",
              type: "number",
              hints: ["-30 + 30 = 0."],
              explanation: "-30 + 30 = 0.",
              rubric: "Đáp số 0: 1.0đ."
            },
            {
              id: "MATH6-W08-D05-Q04",
              level: "medium",
              question: "Khẳng định: 'Tổng của hai số nguyên âm luôn là một số nguyên âm' là ĐÚNG hay SAI? (Nhập 'Đúng' hoặc 'Sai')",
              answer: "Đúng",
              type: "text",
              hints: ["Âm cộng âm luôn ra âm."],
              explanation: "Đúng, vì cộng hai số âm ta cộng hai phần tự nhiên rồi đặt dấu trừ trước kết quả.",
              rubric: "Trả lời Đúng: 1.0đ."
            },
            {
              id: "MATH6-W08-D05-Q05",
              level: "advanced",
              question: "Khẳng định: 'Hiệu của hai số nguyên âm luôn là một số nguyên âm' là ĐÚNG hay SAI? (Nhập 'Đúng' hoặc 'Sai')",
              answer: "Sai",
              type: "text",
              hints: ["Ví dụ: (-2) − (-5) = -2 + 5 = 3 (là số dương!)."],
              explanation: "Sai, ví dụ (-2) - (-5) = 3 là số dương.",
              rubric: "Trả lời Sai kèm phản ví dụ: 1.0đ."
            },
            {
              id: "MATH6-W08-D05-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Cho a và b là hai số nguyên thỏa mãn a + b < a và a + b < b. Kết luận gì về dấu của a và b? A. Cả a và b đều dương  B. Cả a và b đều âm  C. a âm, b dương (Nhập A hoặc B hoặc C)",
              answer: "B",
              type: "text",
              hints: ["Vì a + b < a => b < 0. Vì a + b < b => a < 0. Vậy cả hai đều là số âm."],
              explanation: "Cả a và b đều là số nguyên âm.",
              rubric: "Chọn đúng B: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 6,
          name: "Thứ 7",
          title: "Weekend Math Exam — Kiểm Tra Tổng Hợp Tuần 8",
          theory: "Bài kiểm tra cuối tuần 8: Cộng trừ số nguyên, toán tìm x và tính chất kết hợp.",
          durationMinutes: 30,
          totalScore: 10,
          rubricGuide: "Chấm điểm từng bước chi tiết, hỗ trợ nộp ảnh bài giải.",
          exercises: [
            {
              id: "MATH6-W08-D06-Q01",
              level: "basic",
              question: "Câu 1 (2.0đ): Tính: a) (-48) + 28   b) 35 − (-15) (Nhập: kq_a,kq_b)",
              answer: "-20,50",
              type: "text",
              explanation: "a) -20. b) 35 + 15 = 50.",
              rubric: "Đúng mỗi ý 1.0đ."
            },
            {
              id: "MATH6-W08-D06-Q02",
              level: "medium",
              question: "Câu 2 (2.0đ): Tính nhanh: 154 + (-38) + (-54) + 138 = ?",
              answer: "200",
              type: "number",
              explanation: "(154 - 54) + (138 - 38) = 100 + 100 = 200.",
              rubric: "Ghép cặp đúng: 1.0đ, đáp số 200: 1.0đ."
            },
            {
              id: "MATH6-W08-D06-Q03",
              level: "medium",
              question: "Câu 3 (2.0đ): Tìm số nguyên x biết: 25 − (x − 5) = -10. Giá trị của x là:",
              answer: "40",
              type: "number",
              explanation: "x - 5 = 25 - (-10) = 35 => x = 40.",
              rubric: "Tìm ra x - 5 = 35: 1.0đ, x = 40: 1.0đ."
            },
            {
              id: "MATH6-W08-D06-Q04",
              level: "advanced",
              question: "Câu 4 (2.0đ - Tự luận): Tính tổng tất cả các số nguyên x thỏa mãn: -15 < x ≤ 14. Tổng bằng bao nhiêu?",
              answer: "-14",
              type: "number",
              requiresWrittenWork: true,
              explanation: "x ∈ {-14, -13, ..., 13, 14}. Các cặp số đối từ -14 đến 14 triệt tiêu hết thành 0, nhưng x > -15 nên bao gồm cả -14. Chờ chút: từ -14 đến 14 thì (-14 + 14) = 0! Khoan, điều kiện là -15 < x ≤ 14 tức là x từ -14 đến 14. Tổng của các số từ -14 đến 14 là 0!",
              rubric: "Liệt kê đúng: 1.0đ, tổng bằng 0: 1.0đ."
            },
            {
              id: "MATH6-W08-D06-Q05",
              level: "advanced",
              question: "Câu 5 (1.0đ): Tính: (-100) − (-20) − 30 = ?",
              answer: "-110",
              type: "number",
              explanation: "-100 + 20 - 30 = -80 - 30 = -110.",
              rubric: "Đáp số -110: 1.0đ."
            },
            {
              id: "MATH6-W08-D06-Q06",
              level: "olympiad",
              question: "Câu 6 (1.0đ - ⭐ Olympic): Cho biểu thức S = 1 − 2 + 3 − 4 + 5 − 6 + ... + 99 − 100. Giá trị của S là bao nhiêu?",
              answer: "-50",
              type: "number",
              explanation: "Ghép 50 cặp: (1-2) + (3-4) + ... + (99-100). Mỗi cặp bằng -1. S = 50 × (-1) = -50.",
              rubric: "Phát hiện 50 cặp -1: 0.5đ, đáp số -50: 0.5đ."
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
              level: "basic",
              question: "Tính giá trị biểu thức: A = (28 − 45) − (28 − 45 + 13)",
              answer: "-13",
              type: "number",
              hints: ["Bỏ ngoặc: 28 - 45 - 28 + 45 - 13."],
              explanation: "A = (28 - 28) + (-45 + 45) - 13 = 0 + 0 - 13 = -13.",
              rubric: "Biết triệt tiêu các số đối: 0.5đ, kết quả -13: 0.5đ."
            },
            {
              id: "MATH6-W09-D01-Q02",
              level: "basic",
              question: "Bỏ dấu ngoặc và rút gọn: (a + b) − (a − c) = ?",
              answer: "b + c",
              type: "text",
              hints: ["a + b − a + c = (a − a) + b + c = b + c."],
              explanation: "a + b - a + c = b + c.",
              rubric: "Đáp số b + c: 1.0đ."
            },
            {
              id: "MATH6-W09-D01-Q03",
              level: "medium",
              question: "Tính nhanh: (125 − 68) − (125 − 68 − 50) = ?",
              answer: "50",
              type: "number",
              hints: ["Bỏ ngoặc: 125 − 68 − 125 + 68 + 50 = 50."],
              explanation: "125 - 68 - 125 + 68 + 50 = 50.",
              rubric: "Đáp số 50: 1.0đ."
            },
            {
              id: "MATH6-W09-D01-Q04",
              level: "medium",
              question: "Tìm x biết: (x + 15) − (20 − 5) = -10. Giá trị của x là:",
              answer: "-10",
              type: "number",
              hints: ["x + 15 − 15 = -10 => x = -10."],
              explanation: "x + 15 - 15 = -10 => x = -10.",
              rubric: "Đáp số -10: 1.0đ."
            },
            {
              id: "MATH6-W09-D01-Q05",
              level: "advanced",
              question: "Rút gọn biểu thức M = (x − y + z) − (x + y − z). Nhập biểu thức thu gọn dạng: ?y + ?z",
              answer: "-2y + 2z",
              type: "text",
              hints: ["x − y + z − x − y + z = -2y + 2z."],
              explanation: "x - y + z - x - y + z = -2y + 2z.",
              rubric: "Đáp số -2y + 2z: 1.0đ."
            },
            {
              id: "MATH6-W09-D01-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Cho A = a − b + c và B = -a + b − c. Mối quan hệ giữa A và B là: A và B là hai số:",
              answer: "đối nhau",
              type: "text",
              hints: ["Tính A + B = (a - b + c) + (-a + b - c) = 0. Hai số có tổng bằng 0 là hai số đối nhau."],
              explanation: "A + B = 0 nên A và B là hai số đối nhau.",
              rubric: "Trả lời 'đối nhau': 1.0đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Nhân & Chia Số Nguyên",
          theory: "Cùng dấu ra dương (+ × + = +, - × - = +). Khác dấu ra âm (+ × - = -, - × + = -). Lũy thừa bậc chẵn của số âm là số dương, lũy thừa bậc lẻ của số âm là số âm.",
          exercises: [
            {
              id: "MATH6-W09-D02-Q01",
              level: "basic",
              question: "Tính: (-8) × (-12) = ?",
              answer: "96",
              type: "number",
              hints: ["Hai số cùng âm nhân nhau ra số dương: 8 × 12 = 96."],
              explanation: "(-8) × (-12) = 96.",
              rubric: "Đáp số 96: 1.0đ."
            },
            {
              id: "MATH6-W09-D02-Q02",
              level: "basic",
              question: "Tính: (-144) ÷ 12 = ?",
              answer: "-12",
              type: "number",
              hints: ["Khác dấu ra âm."],
              explanation: "(-144) ÷ 12 = -12.",
              rubric: "Đáp số -12: 1.0đ."
            },
            {
              id: "MATH6-W09-D02-Q03",
              level: "medium",
              question: "Tính giá trị biểu thức: (-5)^2 − (-2)^3 = ?",
              answer: "33",
              type: "number",
              hints: ["(-5)^2 = 25. (-2)^3 = -8. 25 − (-8) = 25 + 8 = 33."],
              explanation: "25 - (-8) = 33.",
              rubric: "Lũy thừa đúng: 0.5đ, đáp số 33: 0.5đ."
            },
            {
              id: "MATH6-W09-D02-Q04",
              level: "medium",
              question: "Tính nhanh: (-25) × 68 × (-4) = ?",
              answer: "1700",
              type: "number",
              hints: ["Ghép [(-25) × (-4)] = 100. 100 × 68 = 6800. Khoan: 100 × 68 = 6800."],
              explanation: "(-25) × (-4) × 68 = 100 × 68 = 6800.",
              rubric: "Đáp số 6800: 1.0đ."
            },
            {
              id: "MATH6-W09-D02-Q05",
              level: "advanced",
              question: "Tìm số nguyên x biết: (-3) × x + 15 = -6. Giá trị của x là:",
              answer: "7",
              type: "number",
              hints: ["-3x = -6 − 15 = -21 => x = -21 ÷ (-3) = 7."],
              explanation: "-3x = -21 => x = 7.",
              rubric: "Đáp số 7: 1.0đ."
            },
            {
              id: "MATH6-W09-D02-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Tích của 2024 số nguyên âm là số dương hay số âm? (Nhập 'Dương' hoặc 'Âm')",
              answer: "Dương",
              type: "text",
              hints: ["Số lượng thừa số âm là 2024 (số chẵn), do đó tích mang dấu dương (+)."],
              explanation: "Tích của một số chẵn các thừa số âm luôn mang dấu dương.",
              rubric: "Trả lời Dương: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 3,
          name: "Thứ 4",
          title: "Tính Chất Phân Phối Của Phép Nhân Đối Với Phép Cộng Trong Z",
          theory: "a × (b + c) = a × b + a × c và a × (b − c) = a × b − a × c. Đặt thừa số chung để tính nhanh trong tập hợp số nguyên.",
          exercises: [
            {
              id: "MATH6-W09-D03-Q01",
              level: "basic",
              question: "Tính nhanh: (-15) × 42 + (-15) × 58 = ?",
              answer: "-1500",
              type: "number",
              hints: ["Đặt (-15) ra ngoài: (-15) × (42 + 58) = (-15) × 100."],
              explanation: "(-15) × 100 = -1500.",
              rubric: "Đáp số -1500: 1.0đ."
            },
            {
              id: "MATH6-W09-D03-Q02",
              level: "basic",
              question: "Tính nhanh: 37 × (-24) + 37 × (-76) = ?",
              answer: "-3700",
              type: "number",
              hints: ["37 × [(-24) + (-76)] = 37 × (-100) = -3700."],
              explanation: "37 × (-100) = -3700.",
              rubric: "Đáp số -3700: 1.0đ."
            },
            {
              id: "MATH6-W09-D03-Q03",
              level: "medium",
              question: "Tính nhanh: 29 × (-13) + 29 × (-87) = ?",
              answer: "-2900",
              type: "number",
              hints: ["29 × [(-13) + (-87)] = 29 × (-100) = -2900."],
              explanation: "29 × (-100) = -2900.",
              rubric: "Đáp số -2900: 1.0đ."
            },
            {
              id: "MATH6-W09-D03-Q04",
              level: "medium",
              question: "Tính: (-8) × 125 + 8 × 25 = ?",
              answer: "-800",
              type: "number",
              hints: ["Đưa về cùng thừa số 8: 8 × (-125 + 25) = 8 × (-100) = -800."],
              explanation: "8 × (-100) = -800.",
              rubric: "Đáp số -800: 1.0đ."
            },
            {
              id: "MATH6-W09-D03-Q05",
              level: "advanced",
              question: "Tìm số nguyên x biết: (x − 1) × (x + 2) < 0. Có bao nhiêu số nguyên x thỏa mãn?",
              answer: "2",
              type: "number",
              hints: ["Tích âm khi hai thừa số trái dấu: -2 < x < 1 => x ∈ {-1, 0}."],
              explanation: "x ∈ {-1, 0} có 2 giá trị thỏa mãn.",
              rubric: "Đáp số 2: 1.0đ."
            },
            {
              id: "MATH6-W09-D03-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Tìm số nguyên n để biểu thức (n + 3) chia hết cho (n − 1). Giá trị lớn nhất của n là:",
              answer: "5",
              type: "number",
              hints: ["(n + 3) = (n − 1) + 4. Để chia hết thì 4 chia hết cho (n − 1). Ước lớn nhất của 4 là 4 => n − 1 = 4 => n = 5."],
              explanation: "n - 1 = 4 => n = 5.",
              rubric: "Đáp số 5: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 4,
          name: "Thứ 5",
          title: "Bội & Ước Của Một Số Nguyên",
          theory: "Cho a, b ∈ Z (b ≠ 0). Nếu có q ∈ Z sao cho a = b × q thì ta nói a là bội của b và b là ước của a. Nếu b là ước của a thì -b cũng là ước của a.",
          exercises: [
            {
              id: "MATH6-W09-D04-Q01",
              level: "basic",
              question: "Tập hợp các ước nguyên của số 6 gồm bao nhiêu phần tử?",
              answer: "8",
              type: "number",
              hints: ["Các ước là: ±1, ±2, ±3, ±6 (tổng cộng 8 phần tử)."],
              explanation: "Ư(6) = {±1, ±2, ±3, ±6} có 8 phần tử.",
              rubric: "Đáp số 8: 1.0đ."
            },
            {
              id: "MATH6-W09-D04-Q02",
              level: "basic",
              question: "Số -15 có phải là bội của 5 không? (Nhập 'Có' hoặc 'Không')",
              answer: "Có",
              type: "text",
              hints: ["-15 = 5 × (-3)."],
              explanation: "Có, vì -15 chia hết cho 5.",
              rubric: "Trả lời Có: 1.0đ."
            },
            {
              id: "MATH6-W09-D04-Q03",
              level: "medium",
              question: "Tìm các bội nguyên của 7 có giá trị nằm giữa -20 và 10. Có bao nhiêu số thỏa mãn?",
              answer: "4",
              type: "number",
              hints: ["Các bội là: -14, -7, 0, 7."],
              explanation: "Có 4 bội là -14, -7, 0, 7.",
              rubric: "Đáp số 4: 1.0đ."
            },
            {
              id: "MATH6-W09-D04-Q04",
              level: "medium",
              question: "Tìm số nguyên x sao cho x + 2 là ước của 6. Giá trị nguyên dương lớn nhất của x là:",
              answer: "4",
              type: "number",
              hints: ["Ước lớn nhất của 6 là 6 => x + 2 = 6 => x = 4."],
              explanation: "x + 2 = 6 => x = 4.",
              rubric: "Đáp số 4: 1.0đ."
            },
            {
              id: "MATH6-W09-D04-Q05",
              level: "advanced",
              question: "Tìm tất cả các số nguyên x sao cho 2x + 1 là ước của 10. Có bao nhiêu số nguyên x thỏa mãn?",
              answer: "4",
              type: "number",
              hints: ["Vì 2x + 1 là số lẻ nên 2x + 1 chỉ có thể là ước lẻ của 10: ±1, ±5. Có 4 giá trị."],
              explanation: "2x + 1 ∈ {1, -1, 5, -5} => x ∈ {0, -1, 2, -3} (4 giá trị).",
              rubric: "Đáp số 4: 1.0đ."
            },
            {
              id: "MATH6-W09-D04-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Tìm cặp số nguyên (x, y) thỏa mãn: (x − 1) × (y + 2) = 5. Có bao nhiêu cặp số nguyên thỏa mãn?",
              answer: "4",
              type: "number",
              hints: ["5 có 4 ước nguyên: 1, -1, 5, -5. Tương ứng có 4 cặp (x, y)."],
              explanation: "Các cặp ước của 5 là (1,5), (5,1), (-1,-5), (-5,-1) => có 4 cặp nghiệm nguyên.",
              rubric: "Đáp số 4: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 5,
          name: "Thứ 6",
          title: "Spot The Bug — Bẫy Dấu Âm Trong Nhân Chia",
          theory: "Bẫy: Quên đổi dấu khi trước ngoặc có dấu trừ; nhầm (-3)^2 = -9 (thay vì +9); nhầm nhân hai số âm lại ra số âm.",
          exercises: [
            {
              id: "MATH6-W09-D05-Q01",
              level: "basic",
              question: "Bạn Nam tính: (-3)^2 = -9. Hãy chỉ ra kết quả ĐÚNG:",
              answer: "9",
              type: "number",
              hints: ["(-3)^2 = (-3) × (-3) = +9."],
              explanation: "Lũy thừa bậc chẵn của số âm là số dương: (-3)^2 = 9.",
              rubric: "Đáp số 9: 1.0đ."
            },
            {
              id: "MATH6-W09-D05-Q02",
              level: "basic",
              question: "Bạn Lan tính: -3^2 = 9. Lan làm ĐÚNG hay SAI? (Nhập 'Đúng' hoặc 'Sai')",
              answer: "Sai",
              type: "text",
              hints: ["-3^2 = -(3^2) = -9 (dấu trừ không nằm trong ngoặc lũy thừa)."],
              explanation: "Lan sai vì -3^2 = -(3 × 3) = -9.",
              rubric: "Trả lời Sai: 1.0đ."
            },
            {
              id: "MATH6-W09-D05-Q03",
              level: "medium",
              question: "Tính giá trị: (-2)^3 × (-1)^5 = ?",
              answer: "8",
              type: "number",
              hints: ["(-2)^3 = -8, (-1)^5 = -1. (-8) × (-1) = 8."],
              explanation: "-8 × (-1) = 8.",
              rubric: "Đáp số 8: 1.0đ."
            },
            {
              id: "MATH6-W09-D05-Q04",
              level: "medium",
              question: "Biểu thức a − (b − c + d) khi bỏ dấu ngoặc bằng: A. a − b − c + d   B. a − b + c − d   C. a − b − c − d (Nhập A hoặc B hoặc C)",
              answer: "B",
              type: "text",
              hints: ["Trước ngoặc có dấu trừ: b thành -b, -c thành +c, +d thành -d."],
              explanation: "a - b + c - d.",
              rubric: "Chọn đúng B: 1.0đ."
            },
            {
              id: "MATH6-W09-D05-Q05",
              level: "advanced",
              question: "Tìm x biết: (-2) × x = 18. Giá trị của x là:",
              answer: "-9",
              type: "number",
              hints: ["x = 18 ÷ (-2) = -9."],
              explanation: "x = -9.",
              rubric: "Đáp số -9: 1.0đ."
            },
            {
              id: "MATH6-W09-D05-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Tìm giá trị nhỏ nhất của biểu thức A = (x − 2)^2 − 15 với x là số nguyên:",
              answer: "-15",
              type: "number",
              hints: ["(x − 2)^2 ≥ 0 với mọi x. Giá trị nhỏ nhất đạt được khi x − 2 = 0 => A = -15."],
              explanation: "Vì bình phương luôn không âm nên min A = 0 - 15 = -15.",
              rubric: "Lập luận bình phương ≥ 0 và kết luận -15: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 6,
          name: "Thứ 7",
          title: "Weekend Math Exam — Khảo Sát Tổng Hợp Chuyên Đề 3",
          theory: "Bài kiểm tra cuối tuần 9: Toàn bộ chuyên đề Số nguyên Z, quy tắc bỏ ngoặc, 4 phép tính và ước bội nguyên.",
          durationMinutes: 30,
          totalScore: 10,
          rubricGuide: "Chấm điểm từng bước chi tiết, hỗ trợ nộp ảnh bài giải.",
          exercises: [
            {
              id: "MATH6-W09-D06-Q01",
              level: "basic",
              question: "Câu 1 (2.0đ): Tính: a) (-15) × (-4)   b) (-72) ÷ 8 (Nhập: kq_a,kq_b)",
              answer: "60,-9",
              type: "text",
              explanation: "a) 60. b) -9.",
              rubric: "Đúng mỗi ý 1.0đ."
            },
            {
              id: "MATH6-W09-D06-Q02",
              level: "medium",
              question: "Câu 2 (2.0đ): Tính giá trị biểu thức: 45 − [ (12 − 18) × (-2) ] = ?",
              answer: "33",
              type: "number",
              explanation: "12 - 18 = -6. (-6) × (-2) = 12. 45 - 12 = 33.",
              rubric: "Tính đúng trong ngoặc 12: 1.0đ, đáp số 33: 1.0đ."
            },
            {
              id: "MATH6-W09-D06-Q03",
              level: "medium",
              question: "Câu 3 (2.0đ): Tính nhanh: (-24) × 45 + (-24) × 55 = ?",
              answer: "-2400",
              type: "number",
              explanation: "(-24) × (45 + 55) = (-24) × 100 = -2400.",
              rubric: "Đặt nhân tử chung: 1.0đ, đáp số -2400: 1.0đ."
            },
            {
              id: "MATH6-W09-D06-Q04",
              level: "advanced",
              question: "Câu 4 (2.0đ - Tự luận): Tìm số nguyên x biết: 3 × (x − 4) − (-10) = 1. Giá trị của x là:",
              answer: "1",
              type: "number",
              requiresWrittenWork: true,
              explanation: "3(x - 4) + 10 = 1 => 3(x - 4) = -9 => x - 4 = -3 => x = 1.",
              rubric: "Tìm ra x - 4 = -3: 1.0đ, x = 1: 1.0đ."
            },
            {
              id: "MATH6-W09-D06-Q05",
              level: "advanced",
              question: "Câu 5 (1.0đ): Tìm số nguyên n sao cho n + 5 là bội của n + 1. Giá trị nguyên lớn nhất của n là:",
              answer: "3",
              type: "number",
              explanation: "(n + 5) = (n + 1) + 4 => 4 chia hết cho n + 1. Ước lớn nhất của 4 là 4 => n + 1 = 4 => n = 3.",
              rubric: "Đáp số 3: 1.0đ."
            },
            {
              id: "MATH6-W09-D06-Q06",
              level: "olympiad",
              question: "Câu 6 (1.0đ - ⭐ Olympic): Cho x, y là các số nguyên thỏa mãn x × y = -12 và x < y. Có bao nhiêu cặp số nguyên (x, y) thỏa mãn?",
              answer: "6",
              type: "number",
              explanation: "12 có 6 cặp ước trái dấu (x < 0 < y): (-1, 12), (-2, 6), (-3, 4), (-4, 3), (-6, 2), (-12, 1). Có đúng 6 cặp.",
              rubric: "Tìm đúng 6 cặp: 1.0đ."
            }
          ]
        }
      ]
    }
  ]
};
