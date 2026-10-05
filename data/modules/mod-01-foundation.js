// data/modules/mod-01-foundation.js - Chuyên đề 1: Củng cố Cửu chương & Kỹ năng Tính toán Nền tảng (Tuần 1 - 3)
// Đầy đủ 6 buổi/tuần, mỗi buổi 5-6 bài tập đa tầng cấp độ (Basic -> Medium -> Advanced -> Olympiad)
// Đảm bảo trọn vẹn 25 phút Pomodoro học tập sâu sắc và phân cấp theo kết quả Khảo sát đầu vào

export const MODULE_01_FOUNDATION = {
  id: "mod-01-foundation",
  title: "Củng cố Cửu chương & Kỹ năng Tính toán Tiểu học",
  focus: "Bảng cửu chương nhẩm nhanh, phân số cơ bản, thứ tự ưu tiên phép tính và bài chẩn đoán đầu vào",
  weeks: [
    {
      id: "w01",
      number: 1,
      title: "Bảng Cửu Chương & Phản Xạ Nhẩm Nhanh",
      goal: "Làm chủ bảng cửu chương 2 đến 9, nắm bản chất phép nhân là cộng lặp, tính chất phân phối và kỹ thuật tách số.",
      diagnosticPretest: {
        title: "Bài Chẩn đoán Năng lực Đầu vào (Pre-Test)",
        description: "Làm 5 câu ngắn không bấm giờ để xác định vùng kiến thức cần bổ trợ.",
        questions: [
          {
            id: "MATH6-W01-PRE-01",
            q: "Tính nhẩm: 7 × 8 = ?",
            answer: "56",
            type: "number",
            explanation: "7 × 8 = 56. Mẹo: 7 × 7 = 49, thêm 7 là 56."
          },
          {
            id: "MATH6-W01-PRE-02",
            q: "Tính nhanh: 15 × 6 = ?",
            answer: "90",
            type: "number",
            explanation: "15 × 6 = (15 × 2) × 3 = 30 × 3 = 90."
          },
          {
            id: "MATH6-W01-PRE-03",
            q: "Tìm x: 9 × x = 72",
            answer: "8",
            type: "number",
            explanation: "x = 72 ÷ 9 = 8."
          },
          {
            id: "MATH6-W01-PRE-04",
            q: "Rút gọn phân số 18/24 về tối giản:",
            answer: "3/4",
            type: "fraction",
            explanation: "Chia cả tử và mẫu cho ƯCLN là 6: 18÷6 / 24÷6 = 3/4."
          },
          {
            id: "MATH6-W01-PRE-05",
            q: "Tính giá trị biểu thức: 20 + 5 × 4 = ?",
            answer: "40",
            type: "number",
            explanation: "Thực hiện nhân trước: 5 × 4 = 20, sau đó 20 + 20 = 40."
          }
        ]
      },
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Bản chất Phép nhân & Cửu chương 6, 7, 8, 9",
          theory: "Phép nhân bản chất là phép cộng các số bằng nhau. Khi quên một phép nhân, ta có thể dùng tính chất phân phối: 8 × 7 = 8 × (5 + 2) = 40 + 16 = 56.",
          exercises: [
            {
              id: "MATH6-W01-D01-Q01",
              level: "basic",
              question: "Tính nhẩm: 8 × 7 = ?",
              answer: "56",
              type: "number",
              hints: ["Nhẩm 8 × 5 = 40, 8 × 2 = 16 rồi gộp lại."],
              explanation: "8 × 7 = 56.",
              rubric: "Tính đúng kết quả: 1.0đ."
            },
            {
              id: "MATH6-W01-D01-Q02",
              level: "basic",
              question: "Tính nhẩm: 9 × 8 = ?",
              answer: "72",
              type: "number",
              hints: ["Quy tắc ngón tay bảng 9 hoặc nhẩm 9 × 8 = 10 × 8 − 8 = 80 − 8."],
              explanation: "9 × 8 = 72.",
              rubric: "Tính đúng kết quả: 1.0đ."
            },
            {
              id: "MATH6-W01-D01-Q03",
              level: "medium",
              question: "Tính nhanh bằng cách tách số: 24 × 5 = ?",
              answer: "120",
              type: "number",
              hints: ["24 × 5 = (24 ÷ 2) × (5 × 2) = 12 × 10."],
              explanation: "24 × 5 = 12 × 10 = 120.",
              rubric: "Nêu được cách tách chẵn: 0.5đ, kết quả 120: 0.5đ."
            },
            {
              id: "MATH6-W01-D01-Q04",
              level: "medium",
              question: "Một kệ sách có 7 ngăn, mỗi ngăn chứa 9 quyển vở. Hỏi kệ có tất cả bao nhiêu quyển vở?",
              answer: "63",
              type: "number",
              hints: ["Phép tính: Số ngăn nhân với số vở mỗi ngăn."],
              explanation: "Tổng số vở = 7 × 9 = 63 quyển.",
              rubric: "Lời giải đúng: 0.5đ, phép tính 7 × 9 = 63: 0.5đ."
            },
            {
              id: "MATH6-W01-D01-Q05",
              level: "advanced",
              question: "Một người đi xe đạp trong 3 giờ, mỗi giờ đi được 14 km. Hỏi quãng đường người đó đã đi được là bao nhiêu km?",
              answer: "42",
              type: "number",
              hints: ["Quãng đường = Vận tốc × Thời gian = 14 × 3."],
              explanation: "Quãng đường = 14 × 3 = 42 km.",
              rubric: "Phép tính 14 × 3 = 42: 1.0đ."
            },
            {
              id: "MATH6-W01-D01-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Tích của tất cả các chữ số lẻ từ 1 đến 9: 1 × 3 × 5 × 7 × 9 có chữ số tận cùng bằng bao nhiêu?",
              answer: "5",
              type: "number",
              hints: ["Bất kỳ số lẻ nào nhân với 5 đều cho tận cùng bằng 5."],
              explanation: "Tích chứa thừa số 5 và tất cả các thừa số khác đều là số lẻ, do đó chữ số tận cùng luôn luôn là 5.",
              rubric: "Đáp số 5 kèm giải thích tính chất nhân 5 với số lẻ: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Chiến Lược Tách Số & Bù Tròn Chục",
          theory: "Để tính nhẩm siêu tốc: Gộp các số bù tròn 10 hoặc 100 trước. Ví dụ: 36 + 64 = 100, 25 × 4 = 100, 125 × 8 = 1000.",
          exercises: [
            {
              id: "MATH6-W01-D02-Q01",
              level: "basic",
              question: "Tính nhanh: 37 + 58 + 63 = ?",
              answer: "158",
              type: "number",
              hints: ["Ghép cặp (37 + 63) trước vì tận cùng 7 + 3 = 10."],
              explanation: "(37 + 63) + 58 = 100 + 58 = 158.",
              rubric: "Ghép đúng cặp bù 100: 0.5đ, đáp số 158: 0.5đ."
            },
            {
              id: "MATH6-W01-D02-Q02",
              level: "basic",
              question: "Tính nhanh: 25 × 17 × 4 = ?",
              answer: "1700",
              type: "number",
              hints: ["Ghép (25 × 4) = 100."],
              explanation: "(25 × 4) × 17 = 100 × 17 = 1700.",
              rubric: "Ghép đúng 25 × 4: 0.5đ, đáp số 1700: 0.5đ."
            },
            {
              id: "MATH6-W01-D02-Q03",
              level: "medium",
              question: "Tính nhẩm: 100 − 38 = ?",
              answer: "62",
              type: "number",
              hints: ["Số bù của 8 là 2, hàng chục lấy 9 − 3 = 6."],
              explanation: "100 − 38 = 62.",
              rubric: "Đáp số 62: 1.0đ."
            },
            {
              id: "MATH6-W01-D02-Q04",
              level: "medium",
              question: "Tính nhanh: 125 × 72 = ?",
              answer: "9000",
              type: "number",
              hints: ["Tách 72 = 8 × 9. Khi đó 125 × 8 = 1000."],
              explanation: "125 × 72 = (125 × 8) × 9 = 1000 × 9 = 9000.",
              rubric: "Tách 72 thành 8 × 9: 0.5đ, đáp số 9000: 0.5đ."
            },
            {
              id: "MATH6-W01-D02-Q05",
              level: "advanced",
              question: "Bạn Ngân mua 4 hộp bút, mỗi hộp giá 25 nghìn đồng và 2 quyển sổ tay giá 50 nghìn đồng mỗi quyển. Tổng số tiền Ngân phải trả là bao nhiêu nghìn đồng?",
              answer: "200",
              type: "number",
              hints: ["Tính tiền bút: 4 × 25 = 100. Tiền sổ: 2 × 50 = 100."],
              explanation: "Tổng tiền = 4 × 25 + 2 × 50 = 100 + 100 = 200 nghìn đồng.",
              rubric: "Tính đúng 200: 1.0đ."
            },
            {
              id: "MATH6-W01-D02-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Tính nhanh tổng sau: S = 19 + 28 + 37 + 63 + 72 + 81 = ?",
              answer: "300",
              type: "number",
              hints: ["Ghép các cặp bù 100: (19 + 81) + (28 + 72) + (37 + 63)."],
              explanation: "S = (19 + 81) + (28 + 72) + (37 + 63) = 100 + 100 + 100 = 300.",
              rubric: "Ghép đúng 3 cặp tròn trăm: 0.5đ, đáp số 300: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 3,
          name: "Thứ 4",
          title: "Phép Chia Hết & Chia Có Dư",
          theory: "Trong phép chia có dư: Số bị chia = Số chia × Thương + Số dư (Số dư r luôn thỏa mãn 0 ≤ r < Số chia).",
          exercises: [
            {
              id: "MATH6-W01-D03-Q01",
              level: "basic",
              question: "Tìm thương và số dư của phép chia 58 ÷ 7: Nhập kết quả dưới dạng thương,số dư (Ví dụ: 8,2)",
              answer: "8,2",
              type: "text",
              hints: ["7 × 8 = 56, 58 − 56 = 2."],
              explanation: "58 = 7 × 8 + 2. Thương là 8, dư 2.",
              rubric: "Tìm đúng thương 8: 0.5đ, số dư 2: 0.5đ."
            },
            {
              id: "MATH6-W01-D03-Q02",
              level: "basic",
              question: "Có 45 bông hoa cắm đều vào các lọ, mỗi lọ 6 bông. Hỏi cắm được nhiều nhất bao nhiêu lọ và thừa mấy bông hoa? (Nhập: lọ,bông)",
              answer: "7,3",
              type: "text",
              hints: ["45 ÷ 6 = ? dư ?"],
              explanation: "45 ÷ 6 = 7 dư 3. Cắm được 7 lọ và thừa 3 bông hoa.",
              rubric: "Đáp số 7 lọ thừa 3 bông: 1.0đ."
            },
            {
              id: "MATH6-W01-D03-Q03",
              level: "medium",
              question: "Tìm số dư của phép chia 125 cho 4:",
              answer: "1",
              type: "number",
              hints: ["125 = 120 + 4 + 1. Hoặc 125 = 4 × 31 + 1."],
              explanation: "125 ÷ 4 = 31 dư 1.",
              rubric: "Đáp số 1: 1.0đ."
            },
            {
              id: "MATH6-W01-D03-Q04",
              level: "medium",
              question: "Một đoàn khách gồm 38 người cần qua sông bằng thuyền. Mỗi chuyến thuyền chở được tối đa 6 người. Hỏi cần ít nhất bao nhiêu chuyến thuyền để chở hết đoàn khách?",
              answer: "7",
              type: "number",
              hints: ["38 ÷ 6 = 6 dư 2. Còn 2 người nên cần thêm 1 chuyến thuyền nữa."],
              explanation: "38 ÷ 6 = 6 dư 2. Do đó cần 6 + 1 = 7 chuyến thuyền.",
              rubric: "Tính phép chia 38 ÷ 6: 0.5đ, kết luận 7 chuyến: 0.5đ."
            },
            {
              id: "MATH6-W01-D03-Q05",
              level: "advanced",
              question: "Trong một phép chia cho 9, thương là 15 và số dư là số dư lớn nhất có thể có. Tìm số bị chia đó:",
              answer: "143",
              type: "number",
              hints: ["Số dư lớn nhất khi chia cho 9 là 8. Số bị chia = 15 × 9 + 8."],
              explanation: "Số dư lớn nhất có thể là 8. Số bị chia = 15 × 9 + 8 = 135 + 8 = 143.",
              rubric: "Tìm số dư 8: 0.5đ, tính số bị chia 143: 0.5đ."
            },
            {
              id: "MATH6-W01-D03-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Một số tự nhiên khi chia cho 5 dư 3, khi chia cho 7 dư 5. Hỏi số đó khi cộng thêm 2 thì chia hết cho cả 5 và 7 không? Biết số đó nhỏ hơn 50, tìm số đó:",
              answer: "33",
              type: "number",
              hints: ["Số đó gọi là a. a + 2 chia hết cho 5 và chia hết cho 7. BCNN(5,7) = 35."],
              explanation: "Vì a chia 5 dư 3 nên a + 2 chia hết cho 5. Vì a chia 7 dư 5 nên a + 2 chia hết cho 7. Do đó a + 2 chia hết cho 35 => a + 2 = 35 => a = 33.",
              rubric: "Lập luận a + 2 chia hết cho 35: 0.5đ, đáp số 33: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 4,
          name: "Thứ 5",
          title: "Thử Thách Nâng Cao (Nhánh Tự Chọn Mastery)",
          theory: "Bài toán tính nhanh bằng phân phối ngược: a × b + a × c = a × (b + c) và công thức tính tổng dãy số cách đều.",
          isOptionalChallenge: true,
          exercises: [
            {
              id: "MATH6-W01-D04-Q01",
              level: "medium",
              question: "Tính nhanh: 38 × 64 + 38 × 36 = ?",
              answer: "3800",
              type: "number",
              hints: ["Đặt thừa số chung 38 ra ngoài: 38 × (64 + 36)."],
              explanation: "38 × (64 + 36) = 38 × 100 = 3800.",
              rubric: "Đặt thừa số chung 38: 0.5đ, tính 64 + 36 = 100: 0.25đ, đáp số 3800: 0.25đ."
            },
            {
              id: "MATH6-W01-D04-Q02",
              level: "medium",
              question: "Tính tổng dãy số cách đều: 2 + 4 + 6 + 8 + ... + 20 = ?",
              answer: "110",
              type: "number",
              hints: ["Số số hạng = (20 − 2) ÷ 2 + 1 = 10. Tổng = (2 + 20) × 10 ÷ 2."],
              explanation: "Số số hạng: (20 - 2)/2 + 1 = 10. Tổng: (2 + 20) × 10 / 2 = 22 × 5 = 110.",
              rubric: "Tính số số hạng: 0.5đ, tính tổng 110: 0.5đ."
            },
            {
              id: "MATH6-W01-D04-Q03",
              level: "medium",
              question: "Tính nhanh: 135 × 27 − 135 × 17 = ?",
              answer: "1350",
              type: "number",
              hints: ["Đặt 135 ra ngoài: 135 × (27 − 17)."],
              explanation: "135 × (27 − 17) = 135 × 10 = 1350.",
              rubric: "Đặt 135 ra ngoài: 0.5đ, đáp số 1350: 0.5đ."
            },
            {
              id: "MATH6-W01-D04-Q04",
              level: "advanced",
              question: "Tính tổng dãy số lẻ cách đều: 1 + 3 + 5 + ... + 19 = ?",
              answer: "100",
              type: "number",
              hints: ["Số số hạng = (19 − 1) ÷ 2 + 1 = 10. Tổng = (1 + 19) × 10 ÷ 2."],
              explanation: "Số số hạng = 10. Tổng = 20 × 10 ÷ 2 = 100. (Nhận xét: Tổng n số lẻ đầu tiên luôn bằng n^2 = 10^2 = 100).",
              rubric: "Đáp số 100: 1.0đ."
            },
            {
              id: "MATH6-W01-D04-Q05",
              level: "advanced",
              question: "Một mảnh vườn hình chữ nhật có chu vi 60 m, chiều dài hơn chiều rộng 6 m. Diện tích mảnh vườn đó là bao nhiêu mét vuông?",
              answer: "216",
              type: "number",
              hints: ["Nửa chu vi = 30 m. Chiều dài = (30 + 6) ÷ 2 = 18 m. Chiều rộng = 12 m. Diện tích = 18 × 12."],
              explanation: "Nửa chu vi = 30. Chiều dài = 18 m, chiều rộng = 12 m. Diện tích = 18 × 12 = 216 m².",
              rubric: "Tính đúng chiều dài, chiều rộng: 0.5đ, diện tích 216: 0.5đ."
            },
            {
              id: "MATH6-W01-D04-Q06",
              level: "olympiad",
              question: "⭐ Olympic (Gauss): Tính tổng 100 số tự nhiên liên tiếp đầu tiên: S = 1 + 2 + 3 + ... + 99 + 100 = ?",
              answer: "5050",
              type: "number",
              hints: ["Ghép cặp đầu và cuối: (1 + 100) + (2 + 99) + ... có tất cả 50 cặp, mỗi cặp tổng là 101."],
              explanation: "S = (1 + 100) × 100 ÷ 2 = 101 × 50 = 5050.",
              rubric: "Nêu quy tắc ghép cặp Gauss: 0.5đ, đáp số 5050: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 5,
          name: "Thứ 6",
          title: "Spot The Bug — Săn Bẫy Tính Nhẩm",
          theory: "Học từ sai lầm: Đọc kỹ từng bước giải xem bạn nhỏ bị sai từ dòng nào để rèn luyện tư duy phản biện.",
          exercises: [
            {
              id: "MATH6-W01-D05-Q01",
              level: "basic",
              question: "Bạn Nam tính: 50 − 20 × 2 = 30 × 2 = 60. Theo Ngân bạn Nam sai từ bước nào? A. Trừ trước nhân sau  B. Nhân 30 với 2 sai  C. Phép tính không có gì sai (Nhập A hoặc B hoặc C)",
              answer: "A",
              type: "choice",
              hints: ["Thứ tự phép tính ưu tiên nhân chia trước, cộng trừ sau."],
              explanation: "Nam đã thực hiện trừ trước nhân sau (50 - 20 = 30) là sai thứ tự ưu tiên. Đúng là: 50 - (20 × 2) = 50 - 40 = 10.",
              rubric: "Chọn đúng A: 1.0đ."
            },
            {
              id: "MATH6-W01-D05-Q02",
              level: "basic",
              question: "Bạn An tính: 100 − (30 − 10) = 100 − 30 − 10 = 60. Kết quả đúng của biểu thức phải là bao nhiêu?",
              answer: "80",
              type: "number",
              hints: ["Trong ngoặc: 30 − 10 = 20. Khi đó 100 − 20 = 80. Hoặc bỏ ngoặc đổi dấu: 100 − 30 + 10."],
              explanation: "An quên đổi dấu khi bỏ dấu ngoặc có dấu trừ đằng trước. Đúng là: 100 - 20 = 80.",
              rubric: "Đáp số 80: 1.0đ."
            },
            {
              id: "MATH6-W01-D05-Q03",
              level: "medium",
              question: "Bạn Bình tính: 40 ÷ 2 × 5 = 40 ÷ 10 = 4. Kết quả đúng theo thứ tự từ trái sang phải là bao nhiêu?",
              answer: "100",
              type: "number",
              hints: ["Phép nhân và chia có cùng bậc ưu tiên, phải thực hiện lần lượt từ trái sang phải."],
              explanation: "40 ÷ 2 = 20, sau đó 20 × 5 = 100.",
              rubric: "Đáp số 100: 1.0đ."
            },
            {
              id: "MATH6-W01-D05-Q04",
              level: "medium",
              question: "Tìm x biết: 20 + x ÷ 2 = 30. Giá trị chính xác của x là:",
              answer: "20",
              type: "number",
              hints: ["Coi x ÷ 2 là một số hạng: x ÷ 2 = 30 − 20 = 10. Từ đó x = 10 × 2."],
              explanation: "x ÷ 2 = 30 - 20 = 10 => x = 10 × 2 = 20.",
              rubric: "Tính đúng x = 20: 1.0đ."
            },
            {
              id: "MATH6-W01-D05-Q05",
              level: "advanced",
              question: "Khẳng định sau ĐÚNG hay SAI: 'Với mọi số tự nhiên a và b thì a × b = b × a'? (Nhập 'Đúng' hoặc 'Sai')",
              answer: "Đúng",
              type: "text",
              hints: ["Đây chính là tính chất giao hoán của phép nhân."],
              explanation: "Khẳng định này đúng vì phép nhân các số tự nhiên có tính chất giao hoán.",
              rubric: "Trả lời Đúng: 1.0đ."
            },
            {
              id: "MATH6-W01-D05-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Tìm số tự nhiên nhỏ nhất có 3 chữ số khác nhau chia hết cho cả 2 và 5:",
              answer: "120",
              type: "number",
              hints: ["Chia hết cho 2 và 5 thì chữ số tận cùng phải là 0. Chữ số hàng trăm nhỏ nhất khác 0 là 1."],
              explanation: "Để chia hết cho 2 và 5 thì tận cùng là 0. Để số nhỏ nhất có 3 chữ số khác nhau, chữ số hàng trăm là 1, hàng chục là 2. Số cần tìm là 120.",
              rubric: "Đáp số 120: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 6,
          name: "Thứ 7",
          title: "Weekend Math Exam — Kiểm Tra Tổng Hợp Tuần 1",
          theory: "Bài kiểm tra tổng hợp cuối tuần: Ôn tập cửu chương, tính nhanh, chia có dư và phản xạ toán học.",
          durationMinutes: 30,
          totalScore: 10,
          rubricGuide: "Chấm điểm từng bước chi tiết, cho phép chụp ảnh bài làm trong vở để AI Vision chấm.",
          exercises: [
            {
              id: "MATH6-W01-D06-Q01",
              level: "basic",
              question: "Câu 1 (2.0đ): Tính nhanh: a) 47 + 128 + 53   b) 25 × 39 × 4 (Nhập: kq_a,kq_b)",
              answer: "228,3900",
              type: "text",
              explanation: "a) (47 + 53) + 128 = 100 + 128 = 228. b) (25 × 4) × 39 = 100 × 39 = 3900.",
              rubric: "Đúng câu a: 1.0đ, đúng câu b: 1.0đ."
            },
            {
              id: "MATH6-W01-D06-Q02",
              level: "medium",
              question: "Câu 2 (2.0đ): Tính giá trị biểu thức: 120 − (45 + 15 × 3) = ?",
              answer: "30",
              type: "number",
              explanation: "Trong ngoặc: 15 × 3 = 45 -> 45 + 45 = 90. Ngoài ngoặc: 120 - 90 = 30.",
              rubric: "Tính đúng 15 × 3 = 45: 0.5đ, tính trong ngoặc = 90: 0.5đ, đáp số 30: 1.0đ."
            },
            {
              id: "MATH6-W01-D06-Q03",
              level: "medium",
              question: "Câu 3 (2.0đ): Tìm x biết: 8 × (x − 5) = 56. Giá trị x là:",
              answer: "12",
              type: "number",
              explanation: "x - 5 = 56 ÷ 8 = 7 -> x = 7 + 5 = 12.",
              rubric: "x - 5 = 7: 1.0đ, x = 12: 1.0đ."
            },
            {
              id: "MATH6-W01-D06-Q04",
              level: "advanced",
              question: "Câu 4 (2.0đ - Tự luận): Lớp 6A có 40 học sinh xếp thành các hàng, mỗi hàng có 6 học sinh. Hỏi xếp được bao nhiêu hàng và còn dư mấy bạn? (Nhập: số_hàng,số_dư)",
              answer: "6,4",
              type: "text",
              requiresWrittenWork: true,
              explanation: "40 ÷ 6 = 6 dư 4. Xếp được 6 hàng và còn dư 4 học sinh.",
              rubric: "Lời giải và phép tính đúng: 1.5đ, kết luận đúng 6 hàng dư 4 bạn: 0.5đ."
            },
            {
              id: "MATH6-W01-D06-Q05",
              level: "advanced",
              question: "Câu 5 (1.0đ): Tính nhanh: 35 × 42 + 35 × 58 = ?",
              answer: "3500",
              type: "number",
              explanation: "35 × (42 + 58) = 35 × 100 = 3500.",
              rubric: "Đáp số 3500: 1.0đ."
            },
            {
              id: "MATH6-W01-D06-Q06",
              level: "olympiad",
              question: "Câu 6 (1.0đ - ⭐ Olympic): Tính nhanh giá trị biểu thức: A = 99 − 97 + 95 − 93 + ... + 3 − 1 = ?",
              answer: "50",
              type: "number",
              explanation: "Các cặp: (99 - 97) + (95 - 93) + ... + (3 - 1). Mỗi cặp có giá trị bằng 2. Dãy số lẻ từ 1 đến 99 có 50 số, chia thành 25 cặp. Giá trị A = 25 × 2 = 50.",
              rubric: "Tính số cặp 25: 0.5đ, đáp số 50: 0.5đ."
            }
          ]
        }
      ]
    },
    {
      id: "w02",
      number: 2,
      title: "Phân Số & Số Thập Phân Tiểu Học Củng Cố",
      goal: "Rút gọn phân số, quy đồng mẫu số, 4 phép tính phân số, hỗn số và số thập phân cơ bản chuẩn bị vào Lớp 6.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Rút Gọn Phân Số & Phân Số Bằng Nhau",
          theory: "Khi chia cả tử và mẫu của một phân số cho cùng một ước chung lớn hơn 1, ta được phân số bằng nó nhưng đơn giản hơn. Phân số tối giản là phân số không thể rút gọn được nữa (tử và mẫu nguyên tố cùng nhau).",
          exercises: [
            {
              id: "MATH6-W02-D01-Q01",
              level: "basic",
              question: "Rút gọn phân số 24/36 về tối giản (nhập dạng a/b):",
              answer: "2/3",
              type: "fraction",
              hints: ["ƯCLN của 24 và 36 là 12."],
              explanation: "24 ÷ 12 / 36 ÷ 12 = 2/3.",
              rubric: "Đáp số 2/3: 1.0đ."
            },
            {
              id: "MATH6-W02-D01-Q02",
              level: "basic",
              question: "Rút gọn phân số 45/105 về tối giản:",
              answer: "3/7",
              type: "fraction",
              hints: ["Chia cả tử và mẫu cho 15."],
              explanation: "45 ÷ 15 / 105 ÷ 15 = 3/7.",
              rubric: "Đáp số 3/7: 1.0đ."
            },
            {
              id: "MATH6-W02-D01-Q03",
              level: "medium",
              question: "Tìm số tự nhiên x biết: x/15 = 4/5. Giá trị của x là:",
              answer: "12",
              type: "number",
              hints: ["Quy đồng mẫu: 4/5 = 12/15."],
              explanation: "4/5 = (4 × 3) / (5 × 3) = 12/15 => x = 12.",
              rubric: "Tính đúng x = 12: 1.0đ."
            },
            {
              id: "MATH6-W02-D01-Q04",
              level: "medium",
              question: "Một lớp học có 40 học sinh, trong đó có 24 học sinh nữ. Phân số tối giản chỉ số học sinh nữ so với cả lớp là (dạng a/b):",
              answer: "3/5",
              type: "fraction",
              hints: ["24/40 rút gọn bằng cách chia cả tử và mẫu cho 8."],
              explanation: "24/40 = 3/5.",
              rubric: "Đáp số 3/5: 1.0đ."
            },
            {
              id: "MATH6-W02-D01-Q05",
              level: "advanced",
              question: "Tìm phân số bằng phân số 15/25 có tổng của tử số và mẫu số bằng 32 (nhập dạng a/b):",
              answer: "12/20",
              type: "fraction",
              hints: ["15/25 = 3/5. Tổng số phần bằng nhau: 3 + 5 = 8 phần. Một phần: 32 ÷ 8 = 4."],
              explanation: "15/25 = 3/5. Tử = 3 × 4 = 12, mẫu = 5 × 4 = 20. Phân số là 12/20.",
              rubric: "Rút gọn ra 3/5: 0.5đ, tìm đúng 12/20: 0.5đ."
            },
            {
              id: "MATH6-W02-D01-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Rút gọn phân số sau về tối giản: 10101 / 20202 = ? (nhập dạng a/b)",
              answer: "1/2",
              type: "fraction",
              hints: ["10101 = 10101 × 1, 20202 = 10101 × 2."],
              explanation: "Chia cả tử và mẫu cho 10101 ta được 1/2.",
              rubric: "Đáp số 1/2: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Quy Đồng Mẫu Số & So Sánh Phân Số",
          theory: "Để so sánh hoặc cộng trừ hai phân số khác mẫu, ta quy đồng về cùng mẫu số chung dương nhỏ nhất rồi so sánh các tử số.",
          exercises: [
            {
              id: "MATH6-W02-D02-Q01",
              level: "basic",
              question: "Quy đồng mẫu số và tính: 1/4 + 2/3 = ? (Nhập phân số tối giản)",
              answer: "11/12",
              type: "fraction",
              hints: ["Mẫu số chung là 12. 1/4 = 3/12, 2/3 = 8/12."],
              explanation: "3/12 + 8/12 = 11/12.",
              rubric: "Quy đồng đúng: 0.5đ, cộng ra 11/12: 0.5đ."
            },
            {
              id: "MATH6-W02-D02-Q02",
              level: "basic",
              question: "So sánh 3/5 và 5/8: Phân số nào lớn hơn? (Nhập 3/5 hoặc 5/8)",
              answer: "5/8",
              type: "fraction",
              hints: ["Quy đồng mẫu 40: 3/5 = 24/40, 5/8 = 25/40."],
              explanation: "24/40 < 25/40 nên 5/8 > 3/5.",
              rubric: "Kết luận đúng 5/8: 1.0đ."
            },
            {
              id: "MATH6-W02-D02-Q03",
              level: "medium",
              question: "Trong 3 phân số: 2/3, 3/4, 5/6, phân số nào LỚN NHẤT? (Nhập dạng a/b)",
              answer: "5/6",
              type: "fraction",
              hints: ["So sánh phần bù tới 1: 1 - 2/3 = 1/3; 1 - 3/4 = 1/4; 1 - 5/6 = 1/6. Phần bù 1/6 bé nhất nên 5/6 lớn nhất."],
              explanation: "Quy đồng mẫu 12: 8/12 < 9/12 < 10/12. Phân số lớn nhất là 5/6.",
              rubric: "Đáp số 5/6: 1.0đ."
            },
            {
              id: "MATH6-W02-D02-Q04",
              level: "medium",
              question: "Tính phép trừ phân số: 5/6 − 1/4 = ? (Nhập dạng a/b tối giản)",
              answer: "7/12",
              type: "fraction",
              hints: ["Mẫu chung là 12. 5/6 = 10/12, 1/4 = 3/12."],
              explanation: "10/12 − 3/12 = 7/12.",
              rubric: "Đáp số 7/12: 1.0đ."
            },
            {
              id: "MATH6-W02-D02-Q05",
              level: "advanced",
              question: "Bạn Mai đọc một cuốn sách: Ngày thứ nhất đọc được 1/3 cuốn sách, ngày thứ hai đọc được 2/5 cuốn sách. Hỏi cả hai ngày Mai đọc được bao nhiêu phần cuốn sách? (Nhập dạng a/b)",
              answer: "11/15",
              type: "fraction",
              hints: ["Cộng 1/3 + 2/5. Mẫu chung là 15."],
              explanation: "1/3 + 2/5 = 5/15 + 6/15 = 11/15 cuốn sách.",
              rubric: "Đáp số 11/15: 1.0đ."
            },
            {
              id: "MATH6-W02-D02-Q06",
              level: "olympiad",
              question: "⭐ Olympic: So sánh hai phân số A = 2023/2024 và B = 2024/2025: Phân số nào lớn hơn? (Nhập A hoặc B)",
              answer: "B",
              type: "text",
              hints: ["Dùng phương pháp so sánh phần bù tới 1: 1 − A = 1/2024; 1 − B = 1/2025. Vì 1/2024 > 1/2025 nên A < B."],
              explanation: "Phần bù của A là 1/2024 > phần bù của B là 1/2025. Do đó B lớn hơn A.",
              rubric: "Đáp số B kèm giải thích phần bù: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 3,
          name: "Thứ 4",
          title: "Phép Nhân & Phép Chia Phân Số",
          theory: "Quy tắc: Muốn nhân hai phân số, lấy tử nhân tử, mẫu nhân mẫu. Muốn chia hai phân số, lấy phân số thứ nhất nhân với phân số đảo ngược của phân số thứ hai.",
          exercises: [
            {
              id: "MATH6-W02-D03-Q01",
              level: "basic",
              question: "Tính: 3/5 × 10/9 = ? (Nhập phân số tối giản)",
              answer: "2/3",
              type: "fraction",
              hints: ["Rút gọn chéo trước: 3 với 9 còn 3 ở mẫu, 10 với 5 còn 2 ở tử."],
              explanation: "(3 × 10) / (5 × 9) = 30/45 = 2/3.",
              rubric: "Tính đúng 2/3: 1.0đ."
            },
            {
              id: "MATH6-W02-D03-Q02",
              level: "basic",
              question: "Tính: 4/7 ÷ 2/21 = ?",
              answer: "6",
              type: "number",
              hints: ["Nhân nghịch đảo: 4/7 × 21/2 = 4 × 21 / 7 × 2 = 6."],
              explanation: "4/7 × 21/2 = (4 ÷ 2) × (21 ÷ 7) = 2 × 3 = 6.",
              rubric: "Đáp số 6: 1.0đ."
            },
            {
              id: "MATH6-W02-D03-Q03",
              level: "medium",
              question: "Tính giá trị biểu thức: (2/3 + 1/2) × 6/7 = ?",
              answer: "1",
              type: "number",
              hints: ["Trong ngoặc: 2/3 + 1/2 = 7/6. Sau đó 7/6 × 6/7 = 1."],
              explanation: "7/6 × 6/7 = 1.",
              rubric: "Tính đúng trong ngoặc 7/6: 0.5đ, đáp số 1: 0.5đ."
            },
            {
              id: "MATH6-W02-D03-Q04",
              level: "medium",
              question: "Một hình chữ nhật có chiều dài 4/5 m, chiều rộng 3/4 m. Diện tích hình chữ nhật đó là bao nhiêu mét vuông? (Nhập phân số tối giản a/b)",
              answer: "3/5",
              type: "fraction",
              hints: ["Diện tích = Dài × Rộng = 4/5 × 3/4."],
              explanation: "4/5 × 3/4 = 3/5 m².",
              rubric: "Đáp số 3/5: 1.0đ."
            },
            {
              id: "MATH6-W02-D03-Q05",
              level: "advanced",
              question: "Viết hỗn số 2 và 3/4 dưới dạng phân số tối giản (nhập dạng a/b):",
              answer: "11/4",
              type: "fraction",
              hints: ["Tử số = 2 × 4 + 3 = 11, mẫu số là 4."],
              explanation: "2 và 3/4 = (2 × 4 + 3)/4 = 11/4.",
              rubric: "Đáp số 11/4: 1.0đ."
            },
            {
              id: "MATH6-W02-D03-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Tính giá trị tích triệt tiêu sau: P = (1 − 1/2) × (1 − 1/3) × (1 − 1/4) × ... × (1 − 1/10) = ? (nhập dạng a/b)",
              answer: "1/10",
              type: "fraction",
              hints: ["1 − 1/2 = 1/2; 1 − 1/3 = 2/3; 1 − 1/4 = 3/4 ... Rút gọn liên tiếp tử và mẫu."],
              explanation: "P = 1/2 × 2/3 × 3/4 × ... × 9/10 = 1/10.",
              rubric: "Phát hiện quy luật triệt tiêu chéo: 0.5đ, đáp số 1/10: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 4,
          name: "Thứ 5",
          title: "Số Thập Phân & Ứng Dụng Đo Lường Thực Tế",
          theory: "Cộng trừ số thập phân: Đặt thẳng hàng dấu phẩy. Nhân số thập phân: Đếm tổng số chữ số phần thập phân của hai thừa số để đặt dấu phẩy ở tích.",
          exercises: [
            {
              id: "MATH6-W02-D04-Q01",
              level: "basic",
              question: "Tính: 12.5 + 8.75 = ?",
              answer: "21.25",
              type: "number",
              hints: ["12.50 + 8.75 = 21.25."],
              explanation: "12.5 + 8.75 = 21.25.",
              rubric: "Tính đúng 21.25: 1.0đ."
            },
            {
              id: "MATH6-W02-D04-Q02",
              level: "basic",
              question: "Tính: 45.6 − 18.25 = ?",
              answer: "27.35",
              type: "number",
              hints: ["45.60 − 18.25 = 27.35."],
              explanation: "45.6 - 18.25 = 27.35.",
              rubric: "Tính đúng 27.35: 1.0đ."
            },
            {
              id: "MATH6-W02-D04-Q03",
              level: "medium",
              question: "Tính: 3.5 × 4 = ?",
              answer: "14",
              type: "number",
              hints: ["35 × 4 = 140, bớt 1 chữ số thập phân là 14."],
              explanation: "3.5 × 4 = 14.",
              rubric: "Đáp số 14: 1.0đ."
            },
            {
              id: "MATH6-W02-D04-Q04",
              level: "medium",
              question: "Tính: 15.6 ÷ 3 = ?",
              answer: "5.2",
              type: "number",
              hints: ["15 ÷ 3 = 5, 0.6 ÷ 3 = 0.2."],
              explanation: "15.6 ÷ 3 = 5.2.",
              rubric: "Đáp số 5.2: 1.0đ."
            },
            {
              id: "MATH6-W02-D04-Q05",
              level: "advanced",
              question: "Mẹ mua 2.5 kg cam với giá 30 nghìn đồng/kg và 1.5 kg táo với giá 40 nghìn đồng/kg. Hỏi mẹ phải trả tất cả bao nhiêu nghìn đồng?",
              answer: "135",
              type: "number",
              hints: ["Tiền cam: 2.5 × 30 = 75. Tiền táo: 1.5 × 40 = 60."],
              explanation: "75 + 60 = 135 nghìn đồng.",
              rubric: "Đáp số 135: 1.0đ."
            },
            {
              id: "MATH6-W02-D04-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Tính nhanh: 0.25 × 1.25 × 4 × 8 = ?",
              answer: "10",
              type: "number",
              hints: ["Ghép (0.25 × 4) = 1 và (1.25 × 8) = 10."],
              explanation: "(0.25 × 4) × (1.25 × 8) = 1 × 10 = 10.",
              rubric: "Ghép cặp chuẩn xác: 0.5đ, đáp số 10: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 5,
          name: "Thứ 6",
          title: "Spot The Bug — Săn Bẫy Sai Lầm Phân Số & Số Thập Phân",
          theory: "Bẫy thường gặp: Cộng tử với tử, mẫu với mẫu; quên nhân nghịch đảo khi chia; đặt sai vị trí dấu phẩy ở tích số thập phân.",
          exercises: [
            {
              id: "MATH6-W02-D05-Q01",
              level: "basic",
              question: "Bạn Nam tính: 1/2 + 1/3 = (1 + 1)/(2 + 3) = 2/5. Nam làm ĐÚNG hay SAI? (Nhập 'Đúng' hoặc 'Sai')",
              answer: "Sai",
              type: "text",
              hints: ["Muốn cộng hai phân số khác mẫu, bắt buộc phải quy đồng mẫu số."],
              explanation: "Nam đã làm sai. Đúng phải quy đồng mẫu số 6: 3/6 + 2/6 = 5/6.",
              rubric: "Trả lời Sai: 1.0đ."
            },
            {
              id: "MATH6-W02-D05-Q02",
              level: "basic",
              question: "Bạn An chia phân số: 3/4 ÷ 2 = 3/2. Kết quả đúng phải là bao nhiêu? (Nhập dạng a/b)",
              answer: "3/8",
              type: "fraction",
              hints: ["Chia cho 2 tức là nhân với nghịch đảo 1/2: 3/4 × 1/2."],
              explanation: "3/4 ÷ 2 = 3/4 × 1/2 = 3/8.",
              rubric: "Đáp số 3/8: 1.0đ."
            },
            {
              id: "MATH6-W02-D05-Q03",
              level: "medium",
              question: "Bạn Bình tính: 0.2 × 0.3 = 0.6. Hãy sửa lại kết quả đúng:",
              answer: "0.06",
              type: "number",
              hints: ["2 × 3 = 6. Cả 2 thừa số có tổng cộng 2 chữ số ở phần thập phân nên kết quả là 0.06."],
              explanation: "0.2 × 0.3 = 0.06.",
              rubric: "Đáp số 0.06: 1.0đ."
            },
            {
              id: "MATH6-W02-D05-Q04",
              level: "medium",
              question: "Rút gọn phân số: (15 + 5) / (20 + 5). Bạn Mai gạch bỏ số 5 ở cả tử và mẫu rồi ghi bằng 15/20 = 3/4. Cách làm này ĐÚNG hay SAI? (Nhập 'Đúng' hoặc 'Sai')",
              answer: "Sai",
              type: "text",
              hints: ["Chỉ được rút gọn khi tử và mẫu là các THỪA SỐ nhân, tuyệt đối không được rút gọn các số hạng phép cộng."],
              explanation: "Cách làm hoàn toàn sai. Đúng là: (15 + 5)/(20 + 5) = 20/25 = 4/5.",
              rubric: "Trả lời Sai kèm hiểu bản chất thừa số: 1.0đ."
            },
            {
              id: "MATH6-W02-D05-Q05",
              level: "advanced",
              question: "Tìm một phân số có mẫu là 7, lớn hơn 2/5 và nhỏ hơn 3/5. Tử số của phân số đó là:",
              answer: "3",
              type: "number",
              hints: ["Quy đồng mẫu 35: 2/5 = 14/35; 3/5 = 21/35. Phân số có mẫu 7 là x/7 = 5x/35. Cần 14 < 5x < 21."],
              explanation: "14 < 5x < 21 => 5x = 15 => x = 3. Phân số là 3/7.",
              rubric: "Đáp số 3: 1.0đ."
            },
            {
              id: "MATH6-W02-D05-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Cho phân số 13/29. Hỏi phải cùng thêm vào tử số và mẫu số bao nhiêu đơn vị để được phân số mới bằng 1/2?",
              answer: "3",
              type: "number",
              hints: ["Khi cùng thêm vào tử và mẫu một số thì HIỆU giữa mẫu và tử KHÔNG ĐỔI: 29 − 13 = 16."],
              explanation: "Hiệu mẫu và tử = 29 - 13 = 16. Ở phân số mới 1/2, hiệu số phần là 2 - 1 = 1 phần = 16. Tử mới = 16. Số cần thêm là 16 - 13 = 3.",
              rubric: "Áp dụng định lý hiệu không đổi: 0.5đ, đáp số 3: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 6,
          name: "Thứ 7",
          title: "Weekend Math Exam — Kiểm Tra Tổng Hợp Tuần 2",
          theory: "Bài kiểm tra cuối tuần 2: Rút gọn, quy đồng, 4 phép tính phân số & số thập phân thực tế.",
          durationMinutes: 30,
          totalScore: 10,
          rubricGuide: "Chấm điểm từng bước chi tiết, hỗ trợ chụp ảnh bài giải trong vở.",
          exercises: [
            {
              id: "MATH6-W02-D06-Q01",
              level: "basic",
              question: "Câu 1 (2.0đ): Rút gọn về tối giản: a) 36/48  b) 75/125 (Nhập: kq_a,kq_b)",
              answer: "3/4,3/5",
              type: "text",
              explanation: "a) 36/48 = 3/4. b) 75/125 = 3/5.",
              rubric: "Đúng mỗi ý 1.0đ."
            },
            {
              id: "MATH6-W02-D06-Q02",
              level: "medium",
              question: "Câu 2 (2.0đ): Tính: 2/3 + 3/4 − 1/6 = ? (Nhập phân số tối giản)",
              answer: "5/4",
              type: "fraction",
              explanation: "Mẫu chung 12: 8/12 + 9/12 - 2/12 = 15/12 = 5/4.",
              rubric: "Quy đồng đúng: 1.0đ, kết quả 5/4: 1.0đ."
            },
            {
              id: "MATH6-W02-D06-Q03",
              level: "medium",
              question: "Câu 3 (2.0đ): Tính nhanh: 4/9 × 5/7 + 4/9 × 2/7 = ? (Nhập phân số tối giản)",
              answer: "4/9",
              type: "fraction",
              explanation: "4/9 × (5/7 + 2/7) = 4/9 × 1 = 4/9.",
              rubric: "Đặt nhân tử chung: 1.0đ, đáp số 4/9: 1.0đ."
            },
            {
              id: "MATH6-W02-D06-Q04",
              level: "advanced",
              question: "Câu 4 (2.0đ - Tự luận): Một mảnh đất hình chữ nhật có chiều dài 20.5 m, chiều rộng 12 m. Người ta dùng 1/5 diện tích mảnh đất để làm lối đi. Tính diện tích phần đất làm lối đi theo mét vuông:",
              answer: "49.2",
              type: "number",
              requiresWrittenWork: true,
              explanation: "Diện tích mảnh đất = 20.5 × 12 = 246 m². Diện tích lối đi = 246 × 1/5 = 49.2 m².",
              rubric: "Diện tích mảnh đất 246 m²: 1.0đ, diện tích lối đi 49.2 m²: 1.0đ."
            },
            {
              id: "MATH6-W02-D06-Q05",
              level: "advanced",
              question: "Câu 5 (1.0đ): Tìm x biết: x − 2/3 = 1/2. Giá trị của x là (dạng a/b):",
              answer: "7/6",
              type: "fraction",
              explanation: "x = 1/2 + 2/3 = 3/6 + 4/6 = 7/6.",
              rubric: "Tính đúng 7/6: 1.0đ."
            },
            {
              id: "MATH6-W02-D06-Q06",
              level: "olympiad",
              question: "Câu 6 (1.0đ - ⭐ Olympic): Tính giá trị biểu thức: S = 1/(1×2) + 1/(2×3) + 1/(3×4) + ... + 1/(9×10) = ? (nhập dạng a/b)",
              answer: "9/10",
              type: "fraction",
              explanation: "1/(n(n+1)) = 1/n - 1/(n+1). S = (1 - 1/2) + (1/2 - 1/3) + ... + (1/9 - 1/10) = 1 - 1/10 = 9/10.",
              rubric: "Tách phân số thành hiệu: 0.5đ, kết quả 9/10: 0.5đ."
            }
          ]
        }
      ]
    },
    {
      id: "w03",
      number: 3,
      title: "Thứ Tự Phép Tính & Bẫy Dấu Ngoặc",
      goal: "Làm chủ quy tắc thực hiện phép tính: Lũy thừa -> Nhân chia -> Cộng trừ; thứ tự ngoặc tròn, vuông, nhọn và bỏ ngoặc đổi dấu.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Quy Tắc Thứ Tự Thực Hiện Phép Tính",
          theory: "1. Trong ngoặc trước, ngoài ngoặc sau: () -> [] -> {}. 2. Thứ tự ưu tiên phép toán: Lũy thừa -> Nhân và Chia -> Cộng và Trừ (tính từ trái qua phải khi cùng bậc).",
          exercises: [
            {
              id: "MATH6-W03-D01-Q01",
              level: "basic",
              question: "Tính giá trị: 50 − 3 × 4 + 8 = ?",
              answer: "46",
              type: "number",
              hints: ["Thực hiện nhân trước: 3 × 4 = 12. Sau đó: 50 − 12 + 8."],
              explanation: "50 - 12 + 8 = 38 + 8 = 46.",
              rubric: "Nhân trước đúng: 0.5đ, tính từ trái qua phải ra 46: 0.5đ."
            },
            {
              id: "MATH6-W03-D01-Q02",
              level: "basic",
              question: "Tính giá trị: 100 ÷ [ 5 × (14 − 12) ] = ?",
              answer: "10",
              type: "number",
              hints: ["Trong ngoặc tròn trước: 14 − 12 = 2. Sau đó trong ngoặc vuông: 5 × 2 = 10."],
              explanation: "14 - 12 = 2 -> 5 × 2 = 10 -> 100 ÷ 10 = 10.",
              rubric: "Tính đúng ngoặc tròn và vuông: 0.5đ, kết quả 10: 0.5đ."
            },
            {
              id: "MATH6-W03-D01-Q03",
              level: "medium",
              question: "Tính: 4 × 5^2 − 32 ÷ 2^4 = ?",
              answer: "98",
              type: "number",
              hints: ["Tính lũy thừa trước: 5^2 = 25, 2^4 = 16. Sau đó: 4 × 25 − 32 ÷ 16."],
              explanation: "4 × 25 - 32 ÷ 16 = 100 - 2 = 98.",
              rubric: "Lũy thừa đúng: 0.5đ, đáp số 98: 0.5đ."
            },
            {
              id: "MATH6-W03-D01-Q04",
              level: "medium",
              question: "Tính giá trị biểu thức: 180 − [130 − (12 − 4)^2] = ?",
              answer: "114",
              type: "number",
              hints: ["12 − 4 = 8, 8^2 = 64. Trong ngoặc vuông: 130 − 64 = 66."],
              explanation: "180 - [130 - 64] = 180 - 66 = 114.",
              rubric: "Tính đúng các ngoặc: 0.5đ, kết quả 114: 0.5đ."
            },
            {
              id: "MATH6-W03-D01-Q05",
              level: "advanced",
              question: "Tìm số tự nhiên x biết: 45 − 5 × (x − 2) = 15. Giá trị của x là:",
              answer: "8",
              type: "number",
              hints: ["5 × (x − 2) = 45 − 15 = 30 => x − 2 = 30 ÷ 5 = 6."],
              explanation: "5 × (x - 2) = 30 => x - 2 = 6 => x = 8.",
              rubric: "Tìm được x - 2 = 6: 0.5đ, x = 8: 0.5đ."
            },
            {
              id: "MATH6-W03-D01-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Đặt một cặp dấu ngoặc đơn ( ) vào biểu thức sau để được kết quả lớn nhất: 5 × 6 + 18 ÷ 3. Giá trị lớn nhất đó là bao nhiêu?",
              answer: "40",
              type: "number",
              hints: ["Thử các cách đặt: 5 × (6 + 18) ÷ 3 = 5 × 24 ÷ 3 = 40. Hoặc (5 × 6 + 18) ÷ 3 = 16."],
              explanation: "Đặt 5 × (6 + 18) ÷ 3 = 5 × 24 ÷ 3 = 40. Đây là giá trị lớn nhất.",
              rubric: "Tìm ra cách đặt ngoặc chuẩn và kết quả 40: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Bẫy Dấu Ngoặc & Thứ Tự Đa Tầng",
          theory: "Khi gặp biểu thức có nhiều lớp ngoặc: Luôn ưu tiên giải quyết từ trong ra ngoài: Ngoặc tròn ( ) -> Ngoặc vuông [ ] -> Ngoặc nhọn { }.",
          exercises: [
            {
              id: "MATH6-W03-D02-Q01",
              level: "basic",
              question: "Tính giá trị: 80 − (4 × 5^2 − 3 × 2^3) = ?",
              answer: "4",
              type: "number",
              hints: ["4 × 25 = 100, 3 × 8 = 24. Trong ngoặc: 100 − 24 = 76."],
              explanation: "80 - (100 - 24) = 80 - 76 = 4.",
              rubric: "Tính đúng trong ngoặc 76: 0.5đ, đáp số 4: 0.5đ."
            },
            {
              id: "MATH6-W03-D02-Q02",
              level: "basic",
              question: "Tính: 120 ÷ {54 − [50 ÷ 2 − (3^2 − 2 × 4)]} = ?",
              answer: "4",
              type: "number",
              hints: ["Ngoặc tròn: 9 − 8 = 1. Ngoặc vuông: 25 − 1 = 24. Ngoặc nhọn: 54 − 24 = 30."],
              explanation: "120 ÷ 30 = 4.",
              rubric: "Giải quyết đúng từng lớp ngoặc: 0.5đ, đáp số 4: 0.5đ."
            },
            {
              id: "MATH6-W03-D02-Q03",
              level: "medium",
              question: "Tính nhanh: [ (25 + 15) ÷ 2 ] × 3 = ?",
              answer: "60",
              type: "number",
              hints: ["(25 + 15) = 40. 40 ÷ 2 = 20. 20 × 3 = 60."],
              explanation: "40 ÷ 2 × 3 = 20 × 3 = 60.",
              rubric: "Đáp số 60: 1.0đ."
            },
            {
              id: "MATH6-W03-D02-Q04",
              level: "medium",
              question: "Tìm số tự nhiên x biết: 2 × (x + 5) − 10 = 30. Giá trị của x là:",
              answer: "15",
              type: "number",
              hints: ["2 × (x + 5) = 40 => x + 5 = 20 => x = 15."],
              explanation: "2 × (x + 5) = 40 => x + 5 = 20 => x = 15.",
              rubric: "Đáp số 15: 1.0đ."
            },
            {
              id: "MATH6-W03-D02-Q05",
              level: "advanced",
              question: "Một cửa hàng nhập 5 thùng bánh, mỗi thùng có 20 hộp bánh, mỗi hộp giá 15 nghìn đồng. Tổng số tiền cửa hàng nhập bánh là bao nhiêu nghìn đồng?",
              answer: "1500",
              type: "number",
              hints: ["Biểu thức: 5 × 20 × 15 = 100 × 15 = 1500."],
              explanation: "5 × 20 × 15 = 100 × 15 = 1500 nghìn đồng.",
              rubric: "Đáp số 1500: 1.0đ."
            },
            {
              id: "MATH6-W03-D02-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Cho biểu thức A = 100 − 99 + 98 − 97 + ... + 2 − 1. Giá trị của A là bao nhiêu?",
              answer: "50",
              type: "number",
              hints: ["Nhóm từng cặp 2 số: (100 − 99) + (98 − 97) + ... + (2 − 1). Mỗi cặp bằng 1."],
              explanation: "Có 50 cặp, mỗi cặp có giá trị bằng 1 => Tổng A = 50 × 1 = 50.",
              rubric: "Nhóm cặp đúng: 0.5đ, đáp số 50: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 3,
          name: "Thứ 4",
          title: "Bỏ Dấu Ngoặc & Đổi Dấu",
          theory: "Quy tắc dấu ngoặc: Khi bỏ dấu ngoặc có dấu '+' đằng trước, giữ nguyên dấu các số hạng: a + (b - c) = a + b - c. Khi bỏ dấu ngoặc có dấu '-' đằng trước, PHẢI ĐỔI DẤU tất cả các số hạng bên trong: a - (b - c) = a - b + c.",
          exercises: [
            {
              id: "MATH6-W03-D03-Q01",
              level: "basic",
              question: "Bỏ dấu ngoặc và tính nhanh: 125 − (25 − 50) = ?",
              answer: "150",
              type: "number",
              hints: ["Bỏ ngoặc đổi dấu: 125 − 25 + 50 = 100 + 50 = 150."],
              explanation: "125 - 25 + 50 = 150.",
              rubric: "Đáp số 150: 1.0đ."
            },
            {
              id: "MATH6-W03-D03-Q02",
              level: "basic",
              question: "Tính giá trị: (38 − 19) − (18 − 19) = ?",
              answer: "20",
              type: "number",
              hints: ["Bỏ ngoặc: 38 − 19 − 18 + 19 = (38 − 18) + (−19 + 19) = 20."],
              explanation: "38 - 18 = 20.",
              rubric: "Đáp số 20: 1.0đ."
            },
            {
              id: "MATH6-W03-D03-Q03",
              level: "medium",
              question: "Tính nhẩm nhanh: 452 − (52 + 100) = ?",
              answer: "300",
              type: "number",
              hints: ["452 − 52 − 100 = 400 − 100 = 300."],
              explanation: "452 - 52 - 100 = 300.",
              rubric: "Đáp số 300: 1.0đ."
            },
            {
              id: "MATH6-W03-D03-Q04",
              level: "medium",
              question: "Tìm x biết: 50 − (x − 10) = 20. Giá trị của x là:",
              answer: "40",
              type: "number",
              hints: ["x − 10 = 50 − 20 = 30 => x = 40."],
              explanation: "x - 10 = 30 => x = 40.",
              rubric: "Đáp số 40: 1.0đ."
            },
            {
              id: "MATH6-W03-D03-Q05",
              level: "advanced",
              question: "Tính nhanh giá trị: S = (2024 + 199) − (2024 − 1) = ?",
              answer: "200",
              type: "number",
              hints: ["Bỏ ngoặc: 2024 + 199 − 2024 + 1 = (2024 − 2024) + (199 + 1)."],
              explanation: "199 + 1 = 200.",
              rubric: "Triệt tiêu 2024: 0.5đ, đáp số 200: 0.5đ."
            },
            {
              id: "MATH6-W03-D03-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Tìm chữ số tận cùng của tích sau: M = 2021 × 2022 × 2023 × 2024 × 2025. Tận cùng là chữ số mấy?",
              answer: "0",
              type: "number",
              hints: ["Tích chứa thừa số có tận cùng là 2 (chẵn) và thừa số có tận cùng là 5. Chẵn × 5 luôn có tận cùng là 0."],
              explanation: "2 × 5 = 10 nên tích luôn có chữ số tận cùng là 0.",
              rubric: "Đáp số 0 kèm giải thích thừa số chẵn nhân 5: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 4,
          name: "Thứ 5",
          title: "Lũy Thừa Với Số Mũ Tự Nhiên",
          theory: "Lũy thừa: a^n = a × a × ... × a (n thừa số a). Quy tắc: a^m × a^n = a^(m+n); a^m ÷ a^n = a^(m-n). Lưu ý: (a + b)^2 KHÔNG BẰNG a^2 + b^2!",
          exercises: [
            {
              id: "MATH6-W03-D04-Q01",
              level: "basic",
              question: "Tính giá trị: 2^3 + 3^2 = ?",
              answer: "17",
              type: "number",
              hints: ["2^3 = 8, 3^2 = 9. 8 + 9 = 17."],
              explanation: "8 + 9 = 17.",
              rubric: "Đáp số 17: 1.0đ."
            },
            {
              id: "MATH6-W03-D04-Q02",
              level: "basic",
              question: "Tính giá trị: 5^3 − 5^2 = ?",
              answer: "100",
              type: "number",
              hints: ["125 − 25 = 100. Hoặc 5^2 × (5 − 1) = 25 × 4 = 100."],
              explanation: "125 - 25 = 100.",
              rubric: "Đáp số 100: 1.0đ."
            },
            {
              id: "MATH6-W03-D04-Q03",
              level: "medium",
              question: "So sánh (2 + 3)^2 và 2^2 + 3^2: Hiệu của giá trị thứ nhất trừ giá trị thứ hai là bao nhiêu?",
              answer: "12",
              type: "number",
              hints: ["(2 + 3)^2 = 5^2 = 25. 2^2 + 3^2 = 4 + 9 = 13. Hiệu = 25 − 13."],
              explanation: "25 - 13 = 12.",
              rubric: "Tính đúng 25 và 13: 0.5đ, hiệu 12: 0.5đ."
            },
            {
              id: "MATH6-W03-D04-Q04",
              level: "medium",
              question: "Tính: 3^4 ÷ 3^2 + 2^3 × 2 = ?",
              answer: "25",
              type: "number",
              hints: ["3^4 ÷ 3^2 = 3^2 = 9. 2^3 × 2 = 2^4 = 16. 9 + 16 = 25."],
              explanation: "9 + 16 = 25.",
              rubric: "Đáp số 25: 1.0đ."
            },
            {
              id: "MATH6-W03-D04-Q05",
              level: "advanced",
              question: "Tìm số tự nhiên x biết: 2^x + 5 = 21. Giá trị của x là:",
              answer: "4",
              type: "number",
              hints: ["2^x = 21 − 5 = 16 = 2^4 => x = 4."],
              explanation: "2^x = 16 = 2^4 => x = 4.",
              rubric: "Đáp số 4: 1.0đ."
            },
            {
              id: "MATH6-W03-D04-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Tìm chữ số tận cùng của lũy thừa 2^2024:",
              answer: "6",
              type: "number",
              hints: ["Chu kỳ chữ số tận cùng của lũy thừa 2: 2, 4, 8, 6 (lặp lại theo chu kỳ 4). Vì 2024 chia hết cho 4 nên tận cùng là số cuối chu kỳ."],
              explanation: "Chu kỳ lũy thừa cơ số 2 là 4 số (2, 4, 8, 6). 2024 chia hết cho 4 nên 2^2024 có chữ số tận cùng là 6.",
              rubric: "Nêu chu kỳ 4: 0.5đ, đáp số 6: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 5,
          name: "Thứ 6",
          title: "Spot The Bug — Bẫy Sai Lầm Thứ Tự Phép Tính",
          theory: "Các bẫy kinh điển: Thực hiện nhân trước chia khi không có ngoặc; tính lũy thừa sau khi nhân; quên đổi dấu khi phá ngoặc tròn.",
          exercises: [
            {
              id: "MATH6-W03-D05-Q01",
              level: "basic",
              question: "Bạn Lan tính: 24 ÷ 4 × 2 = 24 ÷ 8 = 3. Hãy sửa lại kết quả ĐÚNG:",
              answer: "12",
              type: "number",
              hints: ["Nhân và chia từ trái qua phải: 24 ÷ 4 = 6, sau đó 6 × 2 = 12."],
              explanation: "Lan sai vì nhân trước chia. Kết quả đúng: 24 ÷ 4 × 2 = 6 × 2 = 12.",
              rubric: "Đáp số 12: 1.0đ."
            },
            {
              id: "MATH6-W03-D05-Q02",
              level: "basic",
              question: "Bạn Minh tính: 10 + 20 ÷ 5 = 30 ÷ 5 = 6. Kết quả ĐÚNG phải là bao nhiêu?",
              answer: "14",
              type: "number",
              hints: ["Nhân chia trước cộng trừ sau: 20 ÷ 5 = 4, 10 + 4 = 14."],
              explanation: "Minh đã cộng trước chia sau. Đúng là: 10 + 4 = 14.",
              rubric: "Đáp số 14: 1.0đ."
            },
            {
              id: "MATH6-W03-D05-Q03",
              level: "medium",
              question: "Bạn Hùng tính: 3 × 2^3 = 6^3 = 216. Kết quả ĐÚNG là bao nhiêu?",
              answer: "24",
              type: "number",
              hints: ["Lũy thừa ưu tiên trước phép nhân: 2^3 = 8, sau đó 3 × 8 = 24."],
              explanation: "Hùng đã nhân trước lũy thừa là sai quy tắc. Đúng là: 3 × 8 = 24.",
              rubric: "Đáp số 24: 1.0đ."
            },
            {
              id: "MATH6-W03-D05-Q04",
              level: "medium",
              question: "Tìm x biết: 12 ÷ (x − 1) = 4. Giá trị của x là:",
              answer: "4",
              type: "number",
              hints: ["x − 1 = 12 ÷ 4 = 3 => x = 4."],
              explanation: "x - 1 = 3 => x = 4.",
              rubric: "Đáp số 4: 1.0đ."
            },
            {
              id: "MATH6-W03-D05-Q05",
              level: "advanced",
              question: "Biểu thức sau có giá trị bằng bao nhiêu: 100 − 40 + 20 = ?",
              answer: "80",
              type: "number",
              hints: ["Cộng trừ cùng bậc, thực hiện từ trái qua phải: 100 − 40 = 60, sau đó 60 + 20 = 80."],
              explanation: "100 - 40 + 20 = 60 + 20 = 80.",
              rubric: "Đáp số 80: 1.0đ."
            },
            {
              id: "MATH6-W03-D05-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Số 3^100 có chữ số tận cùng bằng bao nhiêu?",
              answer: "1",
              type: "number",
              hints: ["Chu kỳ tận cùng của lũy thừa 3: 3, 9, 7, 1 (chu kỳ 4 số). Vì 100 chia hết cho 4 nên tận cùng là 1."],
              explanation: "Chu kỳ chữ số tận cùng của lũy thừa 3 là 4 số (3, 9, 7, 1). 100 chia hết cho 4 nên chữ số tận cùng là 1.",
              rubric: "Tìm đúng chu kỳ 4 và kết luận 1: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 6,
          name: "Thứ 7",
          title: "Weekend Math Exam — Khảo Sát Tổng Hợp Chuyên Đề 1",
          theory: "Bài thi kiểm tra toàn diện Chuyên đề 1: Tính nhanh cửu chương, phân số và thứ tự ưu tiên phép toán.",
          durationMinutes: 30,
          totalScore: 10,
          rubricGuide: "Chấm điểm từng bước chi tiết, hỗ trợ chụp ảnh bài giải trong vở.",
          exercises: [
            {
              id: "MATH6-W03-D06-Q01",
              level: "basic",
              question: "Câu 1 (2.0đ): Tính giá trị biểu thức: 75 − (3 × 5^2 − 4 × 2^3) = ?",
              answer: "32",
              type: "number",
              explanation: "Trong ngoặc: 3 × 25 - 4 × 8 = 75 - 32 = 43. 75 - 43 = 32.",
              rubric: "Tính đúng trong ngoặc 43: 1.0đ, kết quả 32: 1.0đ."
            },
            {
              id: "MATH6-W03-D06-Q02",
              level: "medium",
              question: "Câu 2 (2.0đ): Tính nhanh: 142 × 38 + 142 × 62 = ?",
              answer: "14200",
              type: "number",
              explanation: "142 × (38 + 62) = 142 × 100 = 14200.",
              rubric: "Đặt nhân tử chung: 1.0đ, đáp số 14200: 1.0đ."
            },
            {
              id: "MATH6-W03-D06-Q03",
              level: "medium",
              question: "Câu 3 (2.0đ): Tìm số tự nhiên x biết: 3 × (x − 4) + 12 = 36. Giá trị x là:",
              answer: "12",
              type: "number",
              explanation: "3 × (x - 4) = 24 => x - 4 = 8 => x = 12.",
              rubric: "Tìm ra x - 4 = 8: 1.0đ, x = 12: 1.0đ."
            },
            {
              id: "MATH6-W03-D06-Q04",
              level: "advanced",
              question: "Câu 4 (2.0đ - Tự luận): Một trường THCS có 360 học sinh khối 6 đi tham quan. Nhà trường cần thuê các xe ô tô loại 45 chỗ. Hỏi nhà trường cần thuê ít nhất bao nhiêu xe để chở hết số học sinh đó?",
              answer: "8",
              type: "number",
              requiresWrittenWork: true,
              explanation: "360 ÷ 45 = 8 xe. Vì phép chia hết nên nhà trường cần thuê đúng 8 xe.",
              rubric: "Phép tính 360 ÷ 45: 1.0đ, kết luận 8 xe: 1.0đ."
            },
            {
              id: "MATH6-W03-D06-Q05",
              level: "advanced",
              question: "Câu 5 (1.0đ): Rút gọn phân số (2^3 × 3^4) / (2^2 × 3^3) về một số tự nhiên:",
              answer: "6",
              type: "number",
              explanation: "2^(3-2) × 3^(4-3) = 2^1 × 3^1 = 6.",
              rubric: "Áp dụng chia lũy thừa ra 6: 1.0đ."
            },
            {
              id: "MATH6-W03-D06-Q06",
              level: "olympiad",
              question: "Câu 6 (1.0đ - ⭐ Olympic): Tính tổng A = 1 + 2 + 4 + 8 + 16 + ... + 512 (gấp đôi mỗi bước) = ?",
              answer: "1023",
              type: "number",
              explanation: "2A = 2 + 4 + 8 + ... + 1024. Lấy 2A - A = 1024 - 1 = 1023.",
              rubric: "Nêu phương pháp nhân 2 rồi trừ: 0.5đ, đáp số 1023: 0.5đ."
            }
          ]
        }
      ]
    }
  ]
};
