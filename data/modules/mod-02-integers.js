// data/modules/mod-02-integers.js - Chuyên đề 2: Số Tự Nhiên, Lũy Thừa & Ước Bội (Tuần 4 - 6)
// Đầy đủ 6 buổi/tuần, mỗi buổi 5-6 bài tập đa tầng cấp độ (Basic -> Medium -> Advanced -> Olympiad)
// Đảm bảo 25 phút Pomodoro học tập sâu sắc và phân cấp theo kết quả Khảo sát đầu vào

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
              level: "basic",
              question: "Tính giá trị của 2^5 = ?",
              answer: "32",
              type: "number",
              hints: ["2 × 2 × 2 × 2 × 2 = ?"],
              explanation: "2^5 = 32.",
              rubric: "Tính đúng 32: 1.0đ."
            },
            {
              id: "MATH6-W04-D01-Q02",
              level: "basic",
              question: "Viết kết quả phép tính dưới dạng một lũy thừa: 3^4 × 3^3 = 3^?",
              answer: "7",
              type: "number",
              hints: ["Giữ nguyên cơ số 3, cộng hai số mũ: 4 + 3 = 7."],
              explanation: "3^4 × 3^3 = 3^(4+3) = 3^7. Số mũ là 7.",
              rubric: "Đáp số 7: 1.0đ."
            },
            {
              id: "MATH6-W04-D01-Q03",
              level: "medium",
              question: "Tính giá trị biểu thức: 5^2 − 2^3 × 3 = ?",
              answer: "1",
              type: "number",
              hints: ["Tính lũy thừa trước: 5^2 = 25, 2^3 = 8. Sau đó 8 × 3 = 24. Cuối cùng 25 − 24."],
              explanation: "5^2 = 25, 2^3 × 3 = 8 × 3 = 24. 25 - 24 = 1.",
              rubric: "Tính đúng 5^2=25 và 2^3=8: 0.5đ, kết quả 1: 0.5đ."
            },
            {
              id: "MATH6-W04-D01-Q04",
              level: "medium",
              question: "Tính giá trị lũy thừa: 10^4 = ?",
              answer: "10000",
              type: "number",
              hints: ["10^n là số gồm chữ số 1 và n chữ số 0 đằng sau."],
              explanation: "10^4 = 10000.",
              rubric: "Đáp số 10000: 1.0đ."
            },
            {
              id: "MATH6-W04-D01-Q05",
              level: "advanced",
              question: "Tính giá trị biểu thức: 2^3 × 5^2 = ?",
              answer: "200",
              type: "number",
              hints: ["2^3 = 8, 5^2 = 25. 8 × 25 = 200."],
              explanation: "8 × 25 = 200.",
              rubric: "Đáp số 200: 1.0đ."
            },
            {
              id: "MATH6-W04-D01-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Viết tích sau dưới dạng một lũy thừa: 2 × 4 × 8 × 16 = 2^?",
              answer: "10",
              type: "number",
              hints: ["Đổi về cơ số 2: 2^1 × 2^2 × 2^3 × 2^4 = 2^(1+2+3+4)."],
              explanation: "2^1 × 2^2 × 2^3 × 2^4 = 2^10. Số mũ là 10.",
              rubric: "Đổi về cơ số 2: 0.5đ, đáp số 10: 0.5đ."
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
              level: "basic",
              question: "Viết kết quả dưới dạng số mũ: 7^8 ÷ 7^5 = 7^?",
              answer: "3",
              type: "number",
              hints: ["Lấy 8 − 5 = 3."],
              explanation: "7^8 ÷ 7^5 = 7^(8-5) = 7^3. Số mũ là 3.",
              rubric: "Đáp số 3: 1.0đ."
            },
            {
              id: "MATH6-W04-D02-Q02",
              level: "basic",
              question: "Tìm số tự nhiên x biết: 2^x = 64. Giá trị của x là:",
              answer: "6",
              type: "number",
              hints: ["2^5 = 32, 2^6 = 64."],
              explanation: "64 = 2^6 nên x = 6.",
              rubric: "x = 6: 1.0đ."
            },
            {
              id: "MATH6-W04-D02-Q03",
              level: "medium",
              question: "Tính giá trị: (5^7 ÷ 5^5) × 2 = ?",
              answer: "50",
              type: "number",
              hints: ["5^(7-5) = 5^2 = 25. 25 × 2 = 50."],
              explanation: "5^2 × 2 = 25 × 2 = 50.",
              rubric: "Đáp số 50: 1.0đ."
            },
            {
              id: "MATH6-W04-D02-Q04",
              level: "medium",
              question: "Tìm số tự nhiên x biết: 3^(x + 1) = 81. Giá trị của x là:",
              answer: "3",
              type: "number",
              hints: ["81 = 3^4 => x + 1 = 4 => x = 3."],
              explanation: "3^(x+1) = 3^4 => x + 1 = 4 => x = 3.",
              rubric: "Đáp số 3: 1.0đ."
            },
            {
              id: "MATH6-W04-D02-Q05",
              level: "advanced",
              question: "Tính giá trị biểu thức: 10^5 ÷ 10^2 − 4 × 5^2 = ?",
              answer: "900",
              type: "number",
              hints: ["10^3 = 1000. 4 × 25 = 100. 1000 − 100 = 900."],
              explanation: "1000 - 100 = 900.",
              rubric: "Đáp số 900: 1.0đ."
            },
            {
              id: "MATH6-W04-D02-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Tìm chữ số tận cùng của lũy thừa 7^2024:",
              answer: "1",
              type: "number",
              hints: ["Chu kỳ chữ số tận cùng của lũy thừa 7: 7, 9, 3, 1 (chu kỳ 4 số). 2024 chia hết cho 4."],
              explanation: "Vì 2024 chia hết cho 4 nên 7^2024 có chữ số tận cùng là 1.",
              rubric: "Nêu chu kỳ 4 và kết luận 1: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 3,
          name: "Thứ 4",
          title: "Tập Hợp & Phần Tử Của Tập Hợp",
          theory: "Tập hợp gồm các phần tử. Ký hiệu: x ∈ A (x thuộc A), y ∉ A (y không thuộc A). Tập số tự nhiên N = {0, 1, 2, ...}, tập N* = {1, 2, 3, ...}.",
          exercises: [
            {
              id: "MATH6-W04-D03-Q01",
              level: "basic",
              question: "Cho tập hợp A = {x ∈ N | 5 ≤ x < 9}. Tập hợp A có bao nhiêu phần tử?",
              answer: "4",
              type: "number",
              hints: ["Các phần tử là: 5, 6, 7, 8."],
              explanation: "A = {5, 6, 7, 8} có đúng 4 phần tử.",
              rubric: "Đáp số 4: 1.0đ."
            },
            {
              id: "MATH6-W04-D03-Q02",
              level: "basic",
              question: "Tập hợp các chữ số của số 2024 có bao nhiêu phần tử?",
              answer: "3",
              type: "number",
              hints: ["Các chữ số là 2, 0, 4 (chữ số 2 xuất hiện 2 lần chỉ tính 1 lần trong tập hợp)."],
              explanation: "Tập hợp {0, 2, 4} có 3 phần tử.",
              rubric: "Đáp số 3: 1.0đ."
            },
            {
              id: "MATH6-W04-D03-Q03",
              level: "medium",
              question: "Tập hợp B = {10, 11, 12, ..., 99} gồm tất cả các số tự nhiên có 2 chữ số. Tập B có bao nhiêu phần tử?",
              answer: "90",
              type: "number",
              hints: ["Số phần tử = (Số cuối − Số đầu) ÷ Khoảng cách + 1 = (99 − 10) + 1 = 90."],
              explanation: "99 - 10 + 1 = 90 phần tử.",
              rubric: "Đáp số 90: 1.0đ."
            },
            {
              id: "MATH6-W04-D03-Q04",
              level: "medium",
              question: "Số 0 có thuộc tập hợp N* không? (Nhập 'Có' hoặc 'Không')",
              answer: "Không",
              type: "text",
              hints: ["N* là tập hợp các số tự nhiên KHÁC 0."],
              explanation: "0 không thuộc N* vì N* = {1, 2, 3, ...}.",
              rubric: "Trả lời Không: 1.0đ."
            },
            {
              id: "MATH6-W04-D03-Q05",
              level: "advanced",
              question: "Cho tập hợp M gồm các số tự nhiên chẵn nhỏ hơn 20. Tập hợp M có bao nhiêu phần tử?",
              answer: "10",
              type: "number",
              hints: ["M = {0, 2, 4, 6, 8, 10, 12, 14, 16, 18}. Nhớ tính cả số 0."],
              explanation: "Từ 0 đến 18 có (18 - 0)/2 + 1 = 10 số chẵn.",
              rubric: "Đáp số 10: 1.0đ."
            },
            {
              id: "MATH6-W04-D03-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Một tập hợp có 3 phần tử thì có tất cả bao nhiêu tập hợp con?",
              answer: "8",
              type: "number",
              hints: ["Công thức tính số tập con của tập n phần tử là 2^n. Ở đây 2^3 = 8."],
              explanation: "Số tập con = 2^3 = 8 (gồm 1 tập rỗng, 3 tập 1 phần tử, 3 tập 2 phần tử, 1 tập chính nó).",
              rubric: "Đáp số 8 kèm công thức 2^n: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 4,
          name: "Thứ 5",
          title: "Ghi Số Tự Nhiên & Chữ Số La Mã",
          theory: "Hệ thập phân: Mỗi hàng gấp 10 lần hàng liền sau. Chữ số La Mã: I (1), V (5), X (10), L (50), C (100). Quy tắc cộng bên phải, trừ bên trái (IV = 4, IX = 9, XIV = 14).",
          exercises: [
            {
              id: "MATH6-W04-D04-Q01",
              level: "basic",
              question: "Số La Mã XIV biểu diễn số tự nhiên nào?",
              answer: "14",
              type: "number",
              hints: ["X = 10, IV = 4. 10 + 4 = 14."],
              explanation: "XIV = 14.",
              rubric: "Đáp số 14: 1.0đ."
            },
            {
              id: "MATH6-W04-D04-Q02",
              level: "basic",
              question: "Viết số 29 dưới dạng số La Mã:",
              answer: "XXIX",
              type: "text",
              hints: ["20 là XX, 9 là IX. Ghép lại là XXIX."],
              explanation: "29 = XXIX.",
              rubric: "Đáp số XXIX: 1.0đ."
            },
            {
              id: "MATH6-W04-D04-Q03",
              level: "medium",
              question: "Trong số 25.340, chữ số 5 có giá trị là bao nhiêu?",
              answer: "5000",
              type: "number",
              hints: ["Chữ số 5 nằm ở hàng nghìn."],
              explanation: "Chữ số 5 ở hàng nghìn có giá trị là 5000.",
              rubric: "Đáp số 5000: 1.0đ."
            },
            {
              id: "MATH6-W04-D04-Q04",
              level: "medium",
              question: "Dùng ba chữ số 0, 3, 5 có thể viết được bao nhiêu số tự nhiên có 3 chữ số khác nhau?",
              answer: "4",
              type: "number",
              hints: ["Chữ số hàng trăm có 2 cách chọn (3 hoặc 5). Hàng chục có 2 cách chọn. Hàng đơn vị có 1 cách: 2 × 2 × 1 = 4."],
              explanation: "Các số đó là: 305, 350, 503, 530 (4 số).",
              rubric: "Đáp số 4: 1.0đ."
            },
            {
              id: "MATH6-W04-D04-Q05",
              level: "advanced",
              question: "Số La Mã XXVIII có giá trị bằng bao nhiêu?",
              answer: "28",
              type: "number",
              hints: ["XX = 20, VIII = 8. 20 + 8 = 28."],
              explanation: "XXVIII = 28.",
              rubric: "Đáp số 28: 1.0đ."
            },
            {
              id: "MATH6-W04-D04-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Cần dùng ít nhất bao nhiêu que diêm để xếp thành số La Mã 24 (XXIV)?",
              answer: "7",
              type: "number",
              hints: ["Mỗi chữ X cần 2 que diêm, chữ I cần 1 que, chữ V cần 2 que. Tổng: 2 + 2 + 1 + 2 = 7."],
              explanation: "X (2) + X (2) + I (1) + V (2) = 7 que diêm.",
              rubric: "Đếm đúng 7 que diêm: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 5,
          name: "Thứ 6",
          title: "Spot The Bug — Bẫy Lũy Thừa & Số Tự Nhiên",
          theory: "Bẫy thường gặp: Nhầm 2^3 = 2 × 3 = 6; nhầm 3^2 × 3^3 = 9^5; nhầm a^0 = 0 thay vì 1.",
          exercises: [
            {
              id: "MATH6-W04-D05-Q01",
              level: "basic",
              question: "Bạn Lan tính: 2^3 = 2 × 3 = 6. Kết quả ĐÚNG của 2^3 là bao nhiêu?",
              answer: "8",
              type: "number",
              hints: ["2^3 là 3 thừa số 2 nhân với nhau: 2 × 2 × 2 = 8."],
              explanation: "2^3 = 8.",
              rubric: "Đáp số 8: 1.0đ."
            },
            {
              id: "MATH6-W04-D05-Q02",
              level: "basic",
              question: "Bạn Bình tính: 3^2 × 3^3 = 9^5. Hãy chỉ ra số mũ ĐÚNG khi giữ nguyên cơ số 3: 3^?",
              answer: "5",
              type: "number",
              hints: ["Giữ nguyên cơ số 3, cộng các số mũ: 2 + 3 = 5."],
              explanation: "3^2 × 3^3 = 3^(2+3) = 3^5. Số mũ là 5.",
              rubric: "Đáp số 5: 1.0đ."
            },
            {
              id: "MATH6-W04-D05-Q03",
              level: "medium",
              question: "Khẳng định: 'Với mọi số tự nhiên a khác 0 thì a^0 = 1' là ĐÚNG hay SAI? (Nhập 'Đúng' hoặc 'Sai')",
              answer: "Đúng",
              type: "text",
              hints: ["Đây là quy ước toán học chuẩn mực cho lũy thừa bậc 0."],
              explanation: "Khẳng định này đúng theo quy ước toán học a^0 = 1 (với a ≠ 0).",
              rubric: "Trả lời Đúng: 1.0đ."
            },
            {
              id: "MATH6-W04-D05-Q04",
              level: "medium",
              question: "Tìm x biết: 2^x × 2^2 = 2^6. Giá trị của x là:",
              answer: "4",
              type: "number",
              hints: ["x + 2 = 6 => x = 4."],
              explanation: "x + 2 = 6 => x = 4.",
              rubric: "Đáp số 4: 1.0đ."
            },
            {
              id: "MATH6-W04-D05-Q05",
              level: "advanced",
              question: "So sánh 2^6 và 6^2: Giá trị nào lớn hơn? (Nhập 2^6 hoặc 6^2)",
              answer: "2^6",
              type: "text",
              hints: ["2^6 = 64, 6^2 = 36. 64 > 36."],
              explanation: "2^6 = 64 > 6^2 = 36.",
              rubric: "Đáp số 2^6: 1.0đ."
            },
            {
              id: "MATH6-W04-D05-Q06",
              level: "olympiad",
              question: "⭐ Olympic: So sánh hai số A = 2^30 và B = 3^20: Số nào lớn hơn? (Nhập A hoặc B)",
              answer: "B",
              type: "text",
              hints: ["Đưa về cùng số mũ 10: 2^30 = (2^3)^10 = 8^10. 3^20 = (3^2)^10 = 9^10. Vì 8 < 9 nên A < B."],
              explanation: "2^30 = 8^10 < 3^20 = 9^10. Vậy B lớn hơn A.",
              rubric: "Đưa về cùng số mũ 10: 0.5đ, kết luận B: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 6,
          name: "Thứ 7",
          title: "Weekend Math Exam — Kiểm Tra Tổng Hợp Tuần 4",
          theory: "Bài kiểm tra cuối tuần 4: Lũy thừa, nhân chia cùng cơ số, tập hợp và số La Mã.",
          durationMinutes: 30,
          totalScore: 10,
          rubricGuide: "Chấm điểm từng bước chi tiết, hỗ trợ nộp ảnh bài giải.",
          exercises: [
            {
              id: "MATH6-W04-D06-Q01",
              level: "basic",
              question: "Câu 1 (2.0đ): Tính: a) 3^3 × 2 − 2^4 = ?   b) 5^6 ÷ 5^4 + 2^3 = ? (Nhập: kq_a,kq_b)",
              answer: "38,33",
              type: "text",
              explanation: "a) 27 × 2 - 16 = 54 - 16 = 38. b) 5^2 + 8 = 25 + 8 = 33.",
              rubric: "Đúng mỗi câu 1.0đ."
            },
            {
              id: "MATH6-W04-D06-Q02",
              level: "medium",
              question: "Câu 2 (2.0đ): Tìm số tự nhiên x biết: 3^x × 3 = 81. Giá trị của x là:",
              answer: "3",
              type: "number",
              explanation: "3^(x+1) = 3^4 => x + 1 = 4 => x = 3.",
              rubric: "Đáp số 3: 2.0đ."
            },
            {
              id: "MATH6-W04-D06-Q03",
              level: "medium",
              question: "Câu 3 (2.0đ): Viết số 44 dưới dạng số La Mã:",
              answer: "XLIV",
              type: "text",
              explanation: "40 là XL, 4 là IV => XLIV.",
              rubric: "Đáp số XLIV: 2.0đ."
            },
            {
              id: "MATH6-W04-D06-Q04",
              level: "advanced",
              question: "Câu 4 (2.0đ - Tự luận): Cho tập hợp A = {x ∈ N* | x ≤ 50 và x chia hết cho 5}. Tập hợp A có bao nhiêu phần tử?",
              answer: "10",
              type: "number",
              requiresWrittenWork: true,
              explanation: "Các phần tử: 5, 10, 15, ..., 50. Số phần tử = (50 - 5)/5 + 1 = 10.",
              rubric: "Liệt kê hoặc công thức: 1.0đ, đáp số 10: 1.0đ."
            },
            {
              id: "MATH6-W04-D06-Q05",
              level: "advanced",
              question: "Câu 5 (1.0đ): Tính giá trị: 2024^0 + 1^2024 = ?",
              answer: "2",
              type: "number",
              explanation: "2024^0 = 1, 1^2024 = 1. 1 + 1 = 2.",
              rubric: "Đáp số 2: 1.0đ."
            },
            {
              id: "MATH6-W04-D06-Q06",
              level: "olympiad",
              question: "Câu 6 (1.0đ - ⭐ Olympic): Cho S = 1 + 2 + 2^2 + 2^3 + ... + 2^10. Tính giá trị S + 1 dưới dạng lũy thừa của 2: 2^?",
              answer: "11",
              type: "number",
              explanation: "2S = 2 + 2^2 + ... + 2^11. Lấy 2S - S = 2^11 - 1 => S = 2^11 - 1 => S + 1 = 2^11. Số mũ là 11.",
              rubric: "Nhân 2 trừ vế: 0.5đ, đáp số 11: 0.5đ."
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
          theory: "Số nguyên tố là số tự nhiên lớn hơn 1, chỉ có 2 ước là 1 và chính nó (2, 3, 5, 7, 11, 13, 17, 19...). Hợp số có nhiều hơn 2 ước. Số 0 và 1 không phải là số nguyên tố, cũng không phải là hợp số.",
          exercises: [
            {
              id: "MATH6-W05-D01-Q01",
              level: "basic",
              question: "Trong các số sau, số nào là số nguyên tố? 9, 15, 29, 35 (Nhập số nguyên tố đó)",
              answer: "29",
              type: "number",
              hints: ["9 chia hết cho 3, 15 chia hết cho 3, 35 chia hết cho 5. 29 chỉ chia hết cho 1 và 29."],
              explanation: "29 là số nguyên tố.",
              rubric: "Chọn đúng 29: 1.0đ."
            },
            {
              id: "MATH6-W05-D01-Q02",
              level: "basic",
              question: "Phân tích số 72 ra thừa số nguyên tố: 72 = 2^a × 3^b. Nhập giá trị a,b (Ví dụ: 3,2)",
              answer: "3,2",
              type: "text",
              hints: ["72 = 8 × 9 = 2^3 × 3^2."],
              explanation: "72 = 8 × 9 = 2^3 × 3^2. Vậy a = 3, b = 2.",
              rubric: "a = 3, b = 2: 1.0đ."
            },
            {
              id: "MATH6-W05-D01-Q03",
              level: "medium",
              question: "Số 51 là số nguyên tố hay hợp số? (Nhập 'Nguyên tố' hoặc 'Hợp số')",
              answer: "Hợp số",
              type: "text",
              hints: ["Tổng các chữ số: 5 + 1 = 6 chia hết cho 3 nên 51 chia hết cho 3 (51 = 3 × 17)."],
              explanation: "51 chia hết cho 3 nên là hợp số.",
              rubric: "Trả lời Hợp số: 1.0đ."
            },
            {
              id: "MATH6-W05-D01-Q04",
              level: "medium",
              question: "Phân tích số 120 ra thừa số nguyên tố có bao nhiêu thừa số nguyên tố khác nhau?",
              answer: "3",
              type: "number",
              hints: ["120 = 2^3 × 3 × 5. Các thừa số nguyên tố khác nhau là 2, 3, 5."],
              explanation: "120 = 2^3 × 3 × 5 có 3 thừa số nguyên tố khác nhau là 2, 3, 5.",
              rubric: "Đáp số 3: 1.0đ."
            },
            {
              id: "MATH6-W05-D01-Q05",
              level: "advanced",
              question: "Tìm số nguyên tố p sao cho p + 2 và p + 4 cũng là các số nguyên tố:",
              answer: "3",
              type: "number",
              hints: ["Thử p = 3: p + 2 = 5, p + 4 = 7 (đều là số nguyên tố). Với p > 3, p chia 3 dư 1 hoặc 2 thì p+2 hoặc p+4 sẽ chia hết cho 3."],
              explanation: "Duy nhất p = 3 thỏa mãn vì khi đó bộ ba (3, 5, 7) đều là số nguyên tố.",
              rubric: "Đáp số 3: 1.0đ."
            },
            {
              id: "MATH6-W05-D01-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Tổng của ba số nguyên tố bằng 100. Số nguyên tố nhỏ nhất trong ba số đó là bao nhiêu?",
              answer: "2",
              type: "number",
              hints: ["Tổng của 3 số bằng 100 (số chẵn). Do đó trong 3 số bắt buộc phải có ít nhất một số chẵn. Số nguyên tố chẵn duy nhất là 2."],
              explanation: "Tổng 3 số là chẵn nên phải có ít nhất 1 số chẵn. Số nguyên tố chẵn duy nhất là 2. Vậy số nhỏ nhất là 2.",
              rubric: "Lập luận tính chẵn lẻ: 0.5đ, đáp số 2: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Dấu Hiệu Chia Hết Cho 2, 3, 5, 9",
          theory: "Chia hết cho 2: Tận cùng chẵn (0, 2, 4, 6, 8). Chia hết cho 5: Tận cùng 0 hoặc 5. Chia hết cho 3: Tổng các chữ số chia hết cho 3. Chia hết cho 9: Tổng các chữ số chia hết cho 9.",
          exercises: [
            {
              id: "MATH6-W05-D02-Q01",
              level: "basic",
              question: "Tìm chữ số x để số 1x5 chia hết cho 9:",
              answer: "3",
              type: "number",
              hints: ["Tổng các chữ số: 1 + x + 5 = 6 + x phải chia hết cho 9 => x = 3."],
              explanation: "6 + x chia hết cho 9 => x = 3.",
              rubric: "Đáp số 3: 1.0đ."
            },
            {
              id: "MATH6-W05-D02-Q02",
              level: "basic",
              question: "Một số vừa chia hết cho 2 vừa chia hết cho 5 thì chữ số tận cùng của số đó là mấy?",
              answer: "0",
              type: "number",
              hints: ["Số chia hết cho 2 và 5 bắt buộc có tận cùng là 0."],
              explanation: "Tận cùng là 0.",
              rubric: "Đáp số 0: 1.0đ."
            },
            {
              id: "MATH6-W05-D02-Q03",
              level: "medium",
              question: "Trong các số sau: 135, 246, 360, 405, có bao nhiêu số chia hết cho cả 3 và 5?",
              answer: "3",
              type: "number",
              hints: ["Tận cùng 0 hoặc 5 và tổng chữ số chia hết cho 3: 135 (tổng 9), 360 (tổng 9), 405 (tổng 9). 246 không chia hết cho 5."],
              explanation: "Có 3 số: 135, 360, 405.",
              rubric: "Đáp số 3: 1.0đ."
            },
            {
              id: "MATH6-W05-D02-Q04",
              level: "medium",
              question: "Tìm chữ số a để số 7a2 chia hết cho 3 nhưng KHÔNG chia hết cho 9, biết a là số chẵn:",
              answer: "6",
              type: "number",
              hints: ["7 + a + 2 = 9 + a chia hết cho 3. Để không chia hết cho 9 thì a không chia hết cho 9. Với a chẵn: a ∈ {0, 6}. Nếu a = 0 thì 9 chia hết cho 9 (loại). Vậy a = 6."],
              explanation: "a = 6 thì 762 có tổng chữ số là 15 (chia hết cho 3, không chia hết cho 9).",
              rubric: "Đáp số 6: 1.0đ."
            },
            {
              id: "MATH6-W05-D02-Q05",
              level: "advanced",
              question: "Tìm số tự nhiên nhỏ nhất có 4 chữ số dạng 1a2b chia hết cho cả 2, 5 và 9:",
              answer: "1620",
              type: "number",
              hints: ["Chia hết cho 2 và 5 => b = 0. Tổng 1 + a + 2 + 0 = 3 + a chia hết cho 9 => a = 6. Số đó là 1620."],
              explanation: "b = 0, a = 6 => 1620.",
              rubric: "Đáp số 1620: 1.0đ."
            },
            {
              id: "MATH6-W05-D02-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Số tự nhiên A = 10^2024 + 8 có chia hết cho 9 không? (Nhập 'Có' hoặc 'Không')",
              answer: "Có",
              type: "text",
              hints: ["10^2024 = 100...00 (có 1 chữ số 1 và 2024 chữ số 0). Tổng các chữ số của A = 1 + 0 + ... + 8 = 9 chia hết cho 9."],
              explanation: "Tổng các chữ số của A là 1 + 8 = 9 chia hết cho 9 nên A chia hết cho 9.",
              rubric: "Tính tổng chữ số bằng 9: 0.5đ, kết luận Có: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 3,
          name: "Thứ 4",
          title: "Tính Chất Chia Hết Của Một Tổng & Một Hiệu",
          theory: "Nếu tất cả các số hạng của một tổng đều chia hết cho m thì tổng đó chia hết cho m. Nếu chỉ có duy nhất một số hạng không chia hết cho m còn các số hạng khác đều chia hết cho m thì tổng KHÔNG chia hết cho m.",
          exercises: [
            {
              id: "MATH6-W05-D03-Q01",
              level: "basic",
              question: "Không tính giá trị, cho biết tổng 24 + 36 + 48 có chia hết cho 6 không? (Nhập 'Có' hoặc 'Không')",
              answer: "Có",
              type: "text",
              hints: ["24, 36, 48 đều là bội của 6."],
              explanation: "Cả 3 số hạng đều chia hết cho 6 nên tổng chia hết cho 6.",
              rubric: "Trả lời Có: 1.0đ."
            },
            {
              id: "MATH6-W05-D03-Q02",
              level: "basic",
              question: "Cho biểu thức A = 12 + 15 + x. Để A chia hết cho 3 thì điều kiện của số tự nhiên x là x phải là bội của mấy?",
              answer: "3",
              type: "number",
              hints: ["12 và 15 đều chia hết cho 3 nên x bắt buộc phải chia hết cho 3."],
              explanation: "x phải là bội của 3.",
              rubric: "Đáp số 3: 1.0đ."
            },
            {
              id: "MATH6-W05-D03-Q03",
              level: "medium",
              question: "Khi chia số tự nhiên a cho 12 ta được số dư là 8. Hỏi số a có chia hết cho 4 không? (Nhập 'Có' hoặc 'Không')",
              answer: "Có",
              type: "text",
              hints: ["a = 12q + 8. Cả 12q và 8 đều chia hết cho 4."],
              explanation: "a = 12q + 8. Vì 12q chia hết cho 4 và 8 chia hết cho 4 nên a chia hết cho 4.",
              rubric: "Trả lời Có: 1.0đ."
            },
            {
              id: "MATH6-W05-D03-Q04",
              level: "medium",
              question: "Tổng 15 + 20 + 35 + x KHÔNG chia hết cho 5 khi x là số nào trong các số: 5, 10, 15, 18? (Nhập số đó)",
              answer: "18",
              type: "number",
              hints: ["15, 20, 35 đều chia hết cho 5. Để tổng không chia hết cho 5 thì x không được chia hết cho 5."],
              explanation: "18 không chia hết cho 5.",
              rubric: "Đáp số 18: 1.0đ."
            },
            {
              id: "MATH6-W05-D03-Q05",
              level: "advanced",
              question: "Cho tổng S = 2 + 2^2 + 2^3 + 2^4. Giá trị của S có chia hết cho 3 không? (Nhập 'Có' hoặc 'Không')",
              answer: "Có",
              type: "text",
              hints: ["Nhóm từng cặp: (2 + 2^2) + (2^3 + 2^4) = 6 + 2^2 × 6 = 6 × (1 + 4) = 30 chia hết cho 3."],
              explanation: "S = 30 chia hết cho 3.",
              rubric: "Trả lời Có: 1.0đ."
            },
            {
              id: "MATH6-W05-D03-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Chứng minh tổng S = 3 + 3^2 + 3^3 + ... + 3^60 chia hết cho 4. Hỏi khi chia S cho 4 được số dư là mấy?",
              answer: "0",
              type: "number",
              hints: ["Ghép cặp (3 + 3^2) = 12 chia hết cho 4. Tất cả các cặp đều chia hết cho 4 nên chia 4 dư 0."],
              explanation: "S = (3 + 3^2) + 3^2(3 + 3^2) + ... Mỗi cặp bằng 12 chia hết cho 4. Vậy số dư là 0.",
              rubric: "Chứng minh chia hết và số dư 0: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 4,
          name: "Thứ 5",
          title: "Tìm Số Ước Của Một Số Tự Nhiên",
          theory: "Nếu số N phân tích ra thừa số nguyên tố: N = p1^a × p2^b × ... thì số ước của N là: (a + 1)(b + 1)...",
          exercises: [
            {
              id: "MATH6-W05-D04-Q01",
              level: "basic",
              question: "Số 36 = 2^2 × 3^2 có tất cả bao nhiêu ước số tự nhiên?",
              answer: "9",
              type: "number",
              hints: ["Số ước = (2 + 1) × (2 + 1) = 3 × 3 = 9."],
              explanation: "(2 + 1) × (2 + 1) = 9 ước.",
              rubric: "Đáp số 9: 1.0đ."
            },
            {
              id: "MATH6-W05-D04-Q02",
              level: "basic",
              question: "Phân tích số 84 ra thừa số nguyên tố dưới dạng 2^a × 3^b × 7^c. Nhập giá trị a,b,c (Ví dụ: 2,1,1)",
              answer: "2,1,1",
              type: "text",
              hints: ["84 = 4 × 21 = 2^2 × 3 × 7."],
              explanation: "84 = 2^2 × 3^1 × 7^1 => a = 2, b = 1, c = 1.",
              rubric: "Đáp số 2,1,1: 1.0đ."
            },
            {
              id: "MATH6-W05-D04-Q03",
              level: "medium",
              question: "Số 60 có bao nhiêu ước số tự nhiên?",
              answer: "12",
              type: "number",
              hints: ["60 = 2^2 × 3 × 5. Số ước = (2 + 1)(1 + 1)(1 + 1) = 3 × 2 × 2 = 12."],
              explanation: "Số ước = 3 × 2 × 2 = 12.",
              rubric: "Đáp số 12: 1.0đ."
            },
            {
              id: "MATH6-W05-D04-Q04",
              level: "medium",
              question: "Tìm ước chung lớn hơn 10 của 36 và 48:",
              answer: "12",
              type: "number",
              hints: ["Các ước chung là 1, 2, 3, 4, 6, 12. Số lớn hơn 10 là 12."],
              explanation: "Ước chung lớn hơn 10 là 12.",
              rubric: "Đáp số 12: 1.0đ."
            },
            {
              id: "MATH6-W05-D04-Q05",
              level: "advanced",
              question: "Tìm số tự nhiên n nhỏ nhất sao cho số n có đúng 3 ước số tự nhiên:",
              answer: "4",
              type: "number",
              hints: ["Số có đúng 3 ước có dạng p^2 (với p là số nguyên tố). p nhỏ nhất là 2 => 2^2 = 4."],
              explanation: "4 có 3 ước là {1, 2, 4}.",
              rubric: "Đáp số 4: 1.0đ."
            },
            {
              id: "MATH6-W05-D04-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Tìm số tự nhiên n nhỏ nhất có đúng 5 ước số tự nhiên:",
              answer: "16",
              type: "number",
              hints: ["Số có đúng 5 ước có dạng p^4. Chọn số nguyên tố nhỏ nhất p = 2 => 2^4 = 16."],
              explanation: "16 = 2^4 có đúng (4 + 1) = 5 ước là {1, 2, 4, 8, 16}.",
              rubric: "Đáp số 16: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 5,
          name: "Thứ 6",
          title: "Spot The Bug — Bẫy Tính Chia Hết & Số Nguyên Tố",
          theory: "Bẫy: Nhầm số 2 không phải số nguyên tố vì là số chẵn; nhầm 9, 15 là số nguyên tố; nhầm tích chia hết cho 6 thì từng thừa số phải chia hết cho 6.",
          exercises: [
            {
              id: "MATH6-W05-D05-Q01",
              level: "basic",
              question: "Bạn Lan nói: 'Mọi số nguyên tố đều là số lẻ'. Khẳng định của Lan ĐÚNG hay SAI? (Nhập 'Đúng' hoặc 'Sai')",
              answer: "Sai",
              type: "text",
              hints: ["Số 2 là số nguyên tố chẵn."],
              explanation: "Khẳng định này sai vì số 2 là số nguyên tố chẵn.",
              rubric: "Trả lời Sai: 1.0đ."
            },
            {
              id: "MATH6-W05-D05-Q02",
              level: "basic",
              question: "Bạn Nam nói: 'Mọi số lẻ đều là số nguyên tố'. Nam nói ĐÚNG hay SAI? (Nhập 'Đúng' hoặc 'Sai')",
              answer: "Sai",
              type: "text",
              hints: ["Ví dụ số 9, 15, 21, 25, 27 là các số lẻ nhưng là hợp số."],
              explanation: "Sai vì có rất nhiều số lẻ là hợp số (9, 15, 21, 25...).",
              rubric: "Trả lời Sai: 1.0đ."
            },
            {
              id: "MATH6-W05-D05-Q03",
              level: "medium",
              question: "Số 111 có chia hết cho 3 không? (Nhập 'Có' hoặc 'Không')",
              answer: "Có",
              type: "text",
              hints: ["1 + 1 + 1 = 3 chia hết cho 3."],
              explanation: "Có, vì tổng các chữ số bằng 3.",
              rubric: "Trả lời Có: 1.0đ."
            },
            {
              id: "MATH6-W05-D05-Q04",
              level: "medium",
              question: "Tích a × b chia hết cho 6 thì a bắt buộc phải chia hết cho 6. Khẳng định này ĐÚNG hay SAI? (Nhập 'Đúng' hoặc 'Sai')",
              answer: "Sai",
              type: "text",
              hints: ["Ví dụ a = 2, b = 3: tích là 6 chia hết cho 6 nhưng cả 2 và 3 đều không chia hết cho 6."],
              explanation: "Sai. Chỉ cần tích a × b chia hết cho 6.",
              rubric: "Trả lời Sai: 1.0đ."
            },
            {
              id: "MATH6-W05-D05-Q05",
              level: "advanced",
              question: "Số 0 và số 1 có bao nhiêu số là số nguyên tố? (Nhập số lượng)",
              answer: "0",
              type: "number",
              hints: ["Số nguyên tố theo định nghĩa phải LỚN HƠN 1."],
              explanation: "Cả 0 và 1 đều không phải số nguyên tố.",
              rubric: "Đáp số 0: 1.0đ."
            },
            {
              id: "MATH6-W05-D05-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Cho p là số nguyên tố lớn hơn 3. Hỏi số dư khi chia p^2 cho 3 là bao nhiêu?",
              answer: "1",
              type: "number",
              hints: ["p không chia hết cho 3 nên p chia 3 dư 1 hoặc 2. Khi bình phương, 1^2 = 1, 2^2 = 4 (chia 3 dư 1)."],
              explanation: "Mọi số nguyên tố > 3 khi bình phương đều chia 3 dư 1.",
              rubric: "Chứng minh chia 3 dư 1: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 6,
          name: "Thứ 7",
          title: "Weekend Math Exam — Kiểm Tra Tổng Hợp Tuần 5",
          theory: "Bài kiểm tra cuối tuần 5: Dấu hiệu chia hết, số nguyên tố, hợp số và tính chất chia hết của tổng.",
          durationMinutes: 30,
          totalScore: 10,
          rubricGuide: "Chấm điểm từng bước chi tiết, hỗ trợ nộp ảnh bài giải.",
          exercises: [
            {
              id: "MATH6-W05-D06-Q01",
              level: "basic",
              question: "Câu 1 (2.0đ): Trong các số sau: 12, 17, 25, 39, 41, 57, hãy đếm xem có bao nhiêu số nguyên tố?",
              answer: "2",
              type: "number",
              explanation: "Các số nguyên tố là 17 và 41 (2 số). 12 (chẵn), 25 (chia hết 5), 39 (chia hết 3), 57 (chia hết 3).",
              rubric: "Xác định đúng 2 số: 2.0đ."
            },
            {
              id: "MATH6-W05-D06-Q02",
              level: "medium",
              question: "Câu 2 (2.0đ): Phân tích số 180 ra thừa số nguyên tố: 180 = 2^a × 3^b × 5^c. Nhập giá trị a,b,c (Ví dụ: 2,2,1)",
              answer: "2,2,1",
              type: "text",
              explanation: "180 = 4 × 9 × 5 = 2^2 × 3^2 × 5^1 => a = 2, b = 2, c = 1.",
              rubric: "Đáp số 2,2,1: 2.0đ."
            },
            {
              id: "MATH6-W05-D06-Q03",
              level: "medium",
              question: "Câu 3 (2.0đ): Tìm chữ số x để số 4x5 chia hết cho cả 3 và 5 nhưng KHÔNG chia hết cho 9:",
              answer: "3",
              type: "number",
              explanation: "Tận cùng là 5 nên chia hết cho 5. Tổng 4 + x + 5 = 9 + x chia hết cho 3. x ∈ {0, 3, 6}. Nếu x = 0 hoặc x = 9 thì chia hết cho 9. Với x = 3 thì tổng là 12 (chia hết 3, không chia 9).",
              rubric: "Đáp số 3: 2.0đ."
            },
            {
              id: "MATH6-W05-D06-Q04",
              level: "advanced",
              question: "Câu 4 (2.0đ - Tự luận): Tìm số tự nhiên n biết rằng n + 7 chia hết cho n + 1. Giá trị lớn nhất của n là:",
              answer: "5",
              type: "number",
              requiresWrittenWork: true,
              explanation: "(n + 7) = (n + 1) + 6. Để chia hết thì 6 phải chia hết cho n + 1. Ước của 6 là 1, 2, 3, 6 => n + 1 lớn nhất là 6 => n = 5.",
              rubric: "Tách (n+1)+6: 1.0đ, tìm n = 5: 1.0đ."
            },
            {
              id: "MATH6-W05-D06-Q05",
              level: "advanced",
              question: "Câu 5 (1.0đ): Số 75 có bao nhiêu ước số tự nhiên?",
              answer: "6",
              type: "number",
              explanation: "75 = 3 × 5^2 => số ước = (1 + 1)(2 + 1) = 2 × 3 = 6.",
              rubric: "Đáp số 6: 1.0đ."
            },
            {
              id: "MATH6-W05-D06-Q06",
              level: "olympiad",
              question: "Câu 6 (1.0đ - ⭐ Olympic): Cho p là số nguyên tố. Biết p + 10 và p + 14 cũng là các số nguyên tố. Tìm giá trị của p:",
              answer: "3",
              type: "number",
              explanation: "Nếu p = 3 thì p + 10 = 13 và p + 14 = 17 (đều là số nguyên tố). Nếu p ≠ 3 thì p chia 3 dư 1 hoặc 2 làm cho p+10 hoặc p+14 chia hết cho 3.",
              rubric: "Chứng minh p = 3 là nghiệm duy nhất: 1.0đ."
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
              level: "basic",
              question: "Tìm ƯCLN của 24 và 36:",
              answer: "12",
              type: "number",
              hints: ["24 = 2^3 × 3; 36 = 2^2 × 3^2. Thừa số chung là 2^2 × 3 = 12."],
              explanation: "ƯCLN(24, 36) = 12.",
              rubric: "Đáp số 12: 1.0đ."
            },
            {
              id: "MATH6-W06-D01-Q02",
              level: "basic",
              question: "Cô giáo có 48 cái bút và 72 quyển vở muốn chia đều vào các túi quà sao cho số bút và vở ở mỗi túi bằng nhau. Hỏi cô có thể chia nhiều nhất thành bao nhiêu túi quà?",
              answer: "24",
              type: "number",
              hints: ["Số túi quà nhiều nhất chính là ƯCLN của 48 và 72."],
              explanation: "ƯCLN(48, 72) = 24. Cô có thể chia nhiều nhất thành 24 túi quà.",
              rubric: "Lời giải quy về ƯCLN: 0.5đ, tính ra 24 túi quà: 0.5đ."
            },
            {
              id: "MATH6-W06-D01-Q03",
              level: "medium",
              question: "Tìm ƯCLN của 18, 30 và 42:",
              answer: "6",
              type: "number",
              hints: ["18 = 2 × 3^2; 30 = 2 × 3 × 5; 42 = 2 × 3 × 7. Thừa số chung: 2 × 3 = 6."],
              explanation: "ƯCLN(18, 30, 42) = 6.",
              rubric: "Đáp số 6: 1.0đ."
            },
            {
              id: "MATH6-W06-D01-Q04",
              level: "medium",
              question: "Rút gọn phân số 48/64 về tối giản bằng cách chia cả tử và mẫu cho ƯCLN của chúng. Phân số tối giản là (dạng a/b):",
              answer: "3/4",
              type: "fraction",
              hints: ["ƯCLN(48, 64) = 16. 48 ÷ 16 / 64 ÷ 16 = 3/4."],
              explanation: "48/64 = 3/4.",
              rubric: "Đáp số 3/4: 1.0đ."
            },
            {
              id: "MATH6-W06-D01-Q05",
              level: "advanced",
              question: "Hai số tự nhiên nguyên tố cùng nhau có ƯCLN bằng bao nhiêu?",
              answer: "1",
              type: "number",
              hints: ["Theo định nghĩa, hai số nguyên tố cùng nhau khi ước chung lớn nhất của chúng bằng 1."],
              explanation: "ƯCLN của hai số nguyên tố cùng nhau luôn bằng 1.",
              rubric: "Đáp số 1: 1.0đ."
            },
            {
              id: "MATH6-W06-D01-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Cho n là số tự nhiên. Tìm ƯCLN của n và n + 1:",
              answer: "1",
              type: "number",
              hints: ["Gọi d là ước chung của n và n + 1. Khi đó (n + 1) − n = 1 chia hết cho d => d = 1."],
              explanation: "Hai số tự nhiên liên tiếp luôn nguyên tố cùng nhau nên ƯCLN = 1.",
              rubric: "Chứng minh hiệu bằng 1: 0.5đ, kết luận 1: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 3",
          title: "Bội Chung Nhỏ Nhất (BCNN)",
          theory: "BCNN của hai hay nhiều số là số nhỏ nhất khác 0 trong tập hợp các bội chung. Cách tìm: Chọn tất cả thừa số chung và riêng với số mũ lớn nhất rồi nhân lại.",
          exercises: [
            {
              id: "MATH6-W06-D02-Q01",
              level: "basic",
              question: "Tìm BCNN của 12 và 18:",
              answer: "36",
              type: "number",
              hints: ["12 = 2^2 × 3; 18 = 2 × 3^2. BCNN = 2^2 × 3^2 = 4 × 9 = 36."],
              explanation: "BCNN(12, 18) = 36.",
              rubric: "Đáp số 36: 1.0đ."
            },
            {
              id: "MATH6-W06-D02-Q02",
              level: "basic",
              question: "Tìm BCNN của 10, 15 và 20:",
              answer: "60",
              type: "number",
              hints: ["10 = 2 × 5; 15 = 3 × 5; 20 = 2^2 × 5. BCNN = 2^2 × 3 × 5 = 60."],
              explanation: "BCNN(10, 15, 20) = 60.",
              rubric: "Đáp số 60: 1.0đ."
            },
            {
              id: "MATH6-W06-D02-Q03",
              level: "medium",
              question: "Số tự nhiên a nhỏ nhất khác 0 chia hết cho cả 8 và 12 là:",
              answer: "24",
              type: "number",
              hints: ["Số tự nhiên a nhỏ nhất khác 0 chia hết cho cả 8 và 12 chính là BCNN(8, 12)."],
              explanation: "BCNN(8, 12) = 24.",
              rubric: "Đáp số 24: 1.0đ."
            },
            {
              id: "MATH6-W06-D02-Q04",
              level: "medium",
              question: "Quy đồng mẫu số hai phân số 5/12 và 7/18: Mẫu số chung nhỏ nhất của chúng là bao nhiêu?",
              answer: "36",
              type: "number",
              hints: ["Mẫu chung nhỏ nhất chính là BCNN(12, 18) = 36."],
              explanation: "Mẫu số chung nhỏ nhất là 36.",
              rubric: "Đáp số 36: 1.0đ."
            },
            {
              id: "MATH6-W06-D02-Q05",
              level: "advanced",
              question: "Hai số a và b có tích a × b = 180 và ƯCLN(a, b) = 3. Tìm BCNN của a và b:",
              answer: "60",
              type: "number",
              hints: ["Công thức liên hệ: a × b = ƯCLN(a, b) × BCNN(a, b). BCNN = 180 ÷ 3."],
              explanation: "BCNN = 180 ÷ 3 = 60.",
              rubric: "Đáp số 60: 1.0đ."
            },
            {
              id: "MATH6-W06-D02-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Tìm số tự nhiên x nhỏ nhất khác 0 biết rằng x chia hết cho 12, 15 và 18:",
              answer: "180",
              type: "number",
              hints: ["x chính là BCNN(12, 15, 18). 12 = 2^2 × 3; 15 = 3 × 5; 18 = 2 × 3^2. BCNN = 2^2 × 3^2 × 5 = 180."],
              explanation: "BCNN(12, 15, 18) = 180.",
              rubric: "Đáp số 180: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 3,
          name: "Thứ 4",
          title: "Ứng Dụng Thực Tế Của ƯCLN & BCNN",
          theory: "Bài toán chia tổ, chia quà, cắt tấm bìa lớn nhất -> Tìm ƯCLN. Bài toán chu kỳ gặp nhau, xếp hàng vừa vặn -> Tìm BCNN.",
          exercises: [
            {
              id: "MATH6-W06-D03-Q01",
              level: "basic",
              question: "Hai bạn An và Bình cùng trực nhật vào một ngày. An cứ 6 ngày trực một lần, Bình cứ 8 ngày trực một lần. Hỏi ít nhất sau bao nhiêu ngày thì hai bạn lại cùng trực nhật?",
              answer: "24",
              type: "number",
              hints: ["Thời gian hai bạn cùng trực là bội chung của 6 và 8. Ít nhất là BCNN(6, 8) = 24."],
              explanation: "BCNN(6, 8) = 24 ngày.",
              rubric: "Đáp số 24: 1.0đ."
            },
            {
              id: "MATH6-W06-D03-Q02",
              level: "basic",
              question: "Một đội thanh niên gồm 36 nam và 48 nữ muốn chia thành các tổ sao cho số nam và nữ ở mỗi tổ đều bằng nhau. Hỏi có thể chia nhiều nhất thành bao nhiêu tổ?",
              answer: "12",
              type: "number",
              hints: ["Số tổ nhiều nhất chính là ƯCLN(36, 48) = 12."],
              explanation: "ƯCLN(36, 48) = 12 tổ.",
              rubric: "Đáp số 12: 1.0đ."
            },
            {
              id: "MATH6-W06-D03-Q03",
              level: "medium",
              question: "Số học sinh khối 6 của một trường khi xếp hàng 12, hàng 15, hàng 18 đều vừa đủ. Biết số học sinh trong khoảng từ 300 đến 400 em. Tìm số học sinh khối 6 của trường đó:",
              answer: "360",
              type: "number",
              hints: ["Số học sinh là bội chung của 12, 15, 18. BCNN = 180. Bội của 180 trong khoảng 300 - 400 là 360."],
              explanation: "BCNN(12, 15, 18) = 180. Bội nằm giữa 300 và 400 là 360 em.",
              rubric: "Đáp số 360: 1.0đ."
            },
            {
              id: "MATH6-W06-D03-Q04",
              level: "medium",
              question: "Một tấm bìa hình chữ nhật có chiều dài 75 cm, chiều rộng 60 cm. Người ta muốn cắt tấm bìa thành các mảnh hình vuông bằng nhau sao cho tấm bìa được cắt hết. Độ dài cạnh hình vuông lớn nhất là bao nhiêu cm?",
              answer: "15",
              type: "number",
              hints: ["Cạnh hình vuông lớn nhất chính là ƯCLN(75, 60) = 15 cm."],
              explanation: "ƯCLN(75, 60) = 15 cm.",
              rubric: "Đáp số 15: 1.0đ."
            },
            {
              id: "MATH6-W06-D03-Q05",
              level: "advanced",
              question: "Tìm số tự nhiên a lớn nhất biết rằng 420 chia hết cho a và 700 chia hết cho a:",
              answer: "140",
              type: "number",
              hints: ["a là ƯCLN(420, 700). 420 = 2^2 × 3 × 5 × 7; 700 = 2^2 × 5^2 × 7. Thừa số chung: 2^2 × 5 × 7 = 140."],
              explanation: "ƯCLN(420, 700) = 140.",
              rubric: "Đáp số 140: 1.0đ."
            },
            {
              id: "MATH6-W06-D03-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Tìm số tự nhiên nhỏ nhất khi chia cho 3 dư 1, khi chia cho 4 dư 2, khi chia cho 5 dư 3:",
              answer: "58",
              type: "number",
              hints: ["Gọi số đó là a. Ta thấy a + 2 chia hết cho 3, chia hết cho 4, chia hết cho 5. Vậy a + 2 = BCNN(3, 4, 5) = 60 => a = 58."],
              explanation: "a + 2 là bội chung nhỏ nhất của 3, 4, 5 là 60 => a = 60 - 2 = 58.",
              rubric: "Phát hiện a + 2 chia hết cho 60: 0.5đ, đáp số 58: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 4,
          name: "Thứ 5",
          title: "Thuật Toán Euclid Tìm ƯCLN Nhanh Chóng",
          theory: "Thuật toán Euclid: Để tìm ƯCLN(a, b) (với a > b), lấy a chia cho b được số dư r. Khi đó ƯCLN(a, b) = ƯCLN(b, r). Lặp lại cho đến khi số dư bằng 0.",
          exercises: [
            {
              id: "MATH6-W06-D04-Q01",
              level: "basic",
              question: "Dùng thuật toán Euclid tìm ƯCLN(156, 48): 156 = 48 × 3 + 12; 48 = 12 × 4 + 0. Vậy ƯCLN(156, 48) là:",
              answer: "12",
              type: "number",
              hints: ["Số dư cuối cùng khác 0 là 12."],
              explanation: "ƯCLN(156, 48) = 12.",
              rubric: "Đáp số 12: 1.0đ."
            },
            {
              id: "MATH6-W06-D04-Q02",
              level: "basic",
              question: "Tìm ƯCLN của 105 và 45:",
              answer: "15",
              type: "number",
              hints: ["105 = 45 × 2 + 15; 45 = 15 × 3 + 0 => ƯCLN = 15."],
              explanation: "ƯCLN(105, 45) = 15.",
              rubric: "Đáp số 15: 1.0đ."
            },
            {
              id: "MATH6-W06-D04-Q03",
              level: "medium",
              question: "Tìm số tự nhiên x lớn nhất thỏa mãn 90 chia hết cho x và 126 chia hết cho x:",
              answer: "18",
              type: "number",
              hints: ["x = ƯCLN(90, 126). 126 = 90 × 1 + 36; 90 = 36 × 2 + 18; 36 = 18 × 2 + 0."],
              explanation: "ƯCLN(90, 126) = 18.",
              rubric: "Đáp số 18: 1.0đ."
            },
            {
              id: "MATH6-W06-D04-Q04",
              level: "medium",
              question: "Tìm hai số tự nhiên a và b (a < b) biết a + b = 36 và ƯCLN(a, b) = 6. Giá trị của tích a × b nhỏ nhất có thể là bao nhiêu?",
              answer: "180",
              type: "number",
              hints: ["a = 6x, b = 6y với x + y = 6 và ƯCLN(x, y) = 1 => x = 1, y = 5 => a = 6, b = 30. Tích 6 × 30 = 180."],
              explanation: "a = 6, b = 30 => tích = 180.",
              rubric: "Đáp số 180: 1.0đ."
            },
            {
              id: "MATH6-W06-D04-Q05",
              level: "advanced",
              question: "Chứng minh phân số (2n + 1) / (2n + 2) là tối giản với mọi số tự nhiên n. ƯCLN của tử và mẫu bằng bao nhiêu?",
              answer: "1",
              type: "number",
              hints: ["Gọi d là ước chung của 2n + 1 và 2n + 2 => (2n + 2) − (2n + 1) = 1 chia hết cho d => d = 1."],
              explanation: "ƯCLN = 1 nên phân số luôn tối giản.",
              rubric: "Đáp số 1: 1.0đ."
            },
            {
              id: "MATH6-W06-D04-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Tìm ƯCLN của 2n + 1 và 2n + 3 với n là số tự nhiên lẻ:",
              answer: "1",
              type: "number",
              hints: ["Hiệu (2n + 3) − (2n + 1) = 2. Vì 2n + 1 là số lẻ nên không thể chia hết cho 2. Do đó ƯCLN = 1."],
              explanation: "Ước chung chỉ có thể là 1 hoặc 2. Vì hai số đều là số lẻ nên ƯCLN = 1.",
              rubric: "Chứng minh hiệu bằng 2 và số lẻ: 0.5đ, kết luận 1: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 5,
          name: "Thứ 6",
          title: "Spot The Bug — Bẫy Nhầm Lẫn Giữa ƯCLN & BCNN",
          theory: "Bẫy: Nhầm chọn số mũ lớn nhất khi tìm ƯCLN; nhầm lấy tích chia cho BCNN ra số sai; nhầm bài toán chu kỳ trực nhật lại đi tìm ƯCLN.",
          exercises: [
            {
              id: "MATH6-W06-D05-Q01",
              level: "basic",
              question: "Bạn An tìm ƯCLN(12, 18) = 36. An đã nhầm ƯCLN với cái gì? (Nhập 'BCNN' hoặc 'Ước số')",
              answer: "BCNN",
              type: "text",
              hints: ["36 là BCNN của 12 và 18, còn ƯCLN của chúng là 6."],
              explanation: "An đã nhầm sang tìm BCNN.",
              rubric: "Trả lời BCNN: 1.0đ."
            },
            {
              id: "MATH6-W06-D05-Q02",
              level: "basic",
              question: "Khi tìm ƯCLN của hai số, ta chọn các thừa số nguyên tố chung với số mũ LỚN NHẤT hay NHỎ NHẤT? (Nhập 'Lớn nhất' hoặc 'Nhỏ nhất')",
              answer: "Nhỏ nhất",
              type: "text",
              hints: ["Ước chung phải chia hết cho cả hai nên chọn số mũ nhỏ nhất."],
              explanation: "Tìm ƯCLN phải chọn số mũ nhỏ nhất.",
              rubric: "Trả lời Nhỏ nhất: 1.0đ."
            },
            {
              id: "MATH6-W06-D05-Q03",
              level: "medium",
              question: "Số 0 có phải là ước của bất kỳ số tự nhiên nào không? (Nhập 'Có' hoặc 'Không')",
              answer: "Không",
              type: "text",
              hints: ["Phép chia cho 0 không có nghĩa."],
              explanation: "Không, vì không có phép chia cho 0.",
              rubric: "Trả lời Không: 1.0đ."
            },
            {
              id: "MATH6-W06-D05-Q04",
              level: "medium",
              question: "Số 0 có phải là bội của mọi số tự nhiên khác 0 không? (Nhập 'Có' hoặc 'Không')",
              answer: "Có",
              type: "text",
              hints: ["0 = a × 0 với mọi a khác 0."],
              explanation: "Có, vì 0 chia hết cho mọi số tự nhiên khác 0.",
              rubric: "Trả lời Có: 1.0đ."
            },
            {
              id: "MATH6-W06-D05-Q05",
              level: "advanced",
              question: "Hai số lẻ liên tiếp có nguyên tố cùng nhau không? (Nhập 'Có' hoặc 'Không')",
              answer: "Có",
              type: "text",
              hints: ["Hiệu của 2 số lẻ liên tiếp là 2. Vì là số lẻ nên không chia hết cho 2, ước chung duy nhất là 1."],
              explanation: "Có, vì ước chung của chúng chỉ có thể là 1.",
              rubric: "Trả lời Có: 1.0đ."
            },
            {
              id: "MATH6-W06-D05-Q06",
              level: "olympiad",
              question: "⭐ Olympic: Có bao nhiêu cặp số tự nhiên (a, b) thỏa mãn a + b = 40 và ƯCLN(a, b) = 5 (với a < b)?",
              answer: "2",
              type: "number",
              hints: ["a = 5x, b = 5y. x + y = 8 với ƯCLN(x, y) = 1. Các cặp (x, y) thỏa mãn là (1, 7) và (3, 5). Có 2 cặp."],
              explanation: "Có 2 cặp (5, 35) và (15, 25).",
              rubric: "Tìm đúng 2 cặp: 1.0đ."
            }
          ]
        },
        {
          dayIndex: 6,
          name: "Thứ 7",
          title: "Weekend Math Exam — Kiểm Tra Tổng Hợp Tuần 6",
          theory: "Bài kiểm tra cuối tuần 6: Tìm ƯCLN, BCNN, bài toán phân chia thực tế và thuật toán Euclid.",
          durationMinutes: 30,
          totalScore: 10,
          rubricGuide: "Chấm điểm từng bước chi tiết, hỗ trợ nộp ảnh bài giải.",
          exercises: [
            {
              id: "MATH6-W06-D06-Q01",
              level: "basic",
              question: "Câu 1 (2.0đ): Tìm: a) ƯCLN(36, 54)   b) BCNN(15, 25) (Nhập: kq_a,kq_b)",
              answer: "18,75",
              type: "text",
              explanation: "a) ƯCLN(36, 54) = 18. b) BCNN(15, 25) = 75.",
              rubric: "Đúng mỗi câu 1.0đ."
            },
            {
              id: "MATH6-W06-D06-Q02",
              level: "medium",
              question: "Câu 2 (2.0đ): Học sinh khối 6 khi xếp hàng 10, hàng 12, hàng 15 đều vừa đủ. Tìm số học sinh khối 6 biết số học sinh nằm trong khoảng từ 200 đến 250 em:",
              answer: "240",
              type: "number",
              explanation: "BCNN(10, 12, 15) = 60. Bội của 60 trong khoảng 200 - 250 là 240 em.",
              rubric: "Tìm BCNN = 60: 1.0đ, đáp số 240: 1.0đ."
            },
            {
              id: "MATH6-W06-D06-Q03",
              level: "medium",
              question: "Câu 3 (2.0đ): Có 48 quả cam và 60 quả táo chia đều vào các đĩa. Hỏi có thể chia nhiều nhất vào bao nhiêu đĩa?",
              answer: "12",
              type: "number",
              explanation: "ƯCLN(48, 60) = 12 đĩa.",
              rubric: "Đáp số 12: 2.0đ."
            },
            {
              id: "MATH6-W06-D06-Q04",
              level: "advanced",
              question: "Câu 4 (2.0đ - Tự luận): Tìm số tự nhiên a biết rằng 112 chia a dư 4 và 140 chia a dư 5. Giá trị của a là:",
              answer: "9",
              type: "number",
              requiresWrittenWork: true,
              explanation: "112 - 4 = 108 chia hết cho a, 140 - 5 = 135 chia hết cho a, và a > 5. ƯCLN(108, 135) = 27. Các ước của 27 lớn hơn 5 là 9 và 27. Thử lại 112 chia 27 dư 4, nhưng 140 chia 27 dư 5. Giá trị thỏa mãn là 9 hoặc 27 (ở đây a = 9 hoặc 27, 108 = 27x4, 135 = 27x5 => 27 là ƯCLN, 9 cũng thỏa).",
              rubric: "Trình bày đúng: 1.0đ, kết luận a = 27 hoặc 9: 1.0đ."
            },
            {
              id: "MATH6-W06-D06-Q05",
              level: "advanced",
              question: "Câu 5 (1.0đ): Hai số a và b có BCNN(a, b) = 120 và ƯCLN(a, b) = 10. Tích a × b bằng bao nhiêu?",
              answer: "1200",
              type: "number",
              explanation: "a × b = ƯCLN × BCNN = 10 × 120 = 1200.",
              rubric: "Đáp số 1200: 1.0đ."
            },
            {
              id: "MATH6-W06-D06-Q06",
              level: "olympiad",
              question: "Câu 6 (1.0đ - ⭐ Olympic): Tìm số tự nhiên n lớn nhất có 3 chữ số sao cho khi chia n cho 4 dư 3, chia cho 5 dư 4, chia cho 6 dư 5:",
              answer: "959",
              type: "number",
              explanation: "n + 1 chia hết cho 4, 5, 6 => n + 1 là bội của BCNN(4, 5, 6) = 60. Số lớn nhất có 3 chữ số chia hết cho 60 là 960 => n = 959.",
              rubric: "Tìm n + 1 chia hết cho 60: 0.5đ, đáp số 959: 0.5đ."
            }
          ]
        }
      ]
    }
  ]
};
