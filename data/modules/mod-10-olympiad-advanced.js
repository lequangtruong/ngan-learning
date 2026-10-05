// data/modules/mod-10-olympiad-advanced.js - Chuyên đề 10: Đột Phá Năng Lực & Đấu Trường Olympic Toán 6 (Tuần 25 - 30)

export const MODULE_10_OLYMPIAD_ADVANCED = {
  id: "mod-10-olympiad-advanced",
  title: "Đột Phá Năng Lực & Đấu Trường Olympic Toán 6",
  focus: "Đồng dư thức, Chữ số tận cùng, Phương trình nghiệm nguyên Z, Dãy phân số quy luật, Nguyên lý Dirichlet, Tỉ số diện tích & Đấu trường TIMO/SASMO",
  weeks: [
    {
      id: "w25",
      number: 25,
      title: "Chuyên Đề Đồng Dư Thức & Chữ Số Tận Cùng",
      goal: "Nắm vững chu kỳ chữ số tận cùng của lũy thừa và ứng dụng đồng dư thức để chứng minh tính chia hết.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Tìm Chữ Số Tận Cùng Của Lũy Thừa Bậc Cao",
          theory: "Các chữ số tận cùng có chu kỳ lặp: Các số tận cùng 0, 1, 5, 6 nâng lên lũy thừa bất kỳ (khác 0) vẫn giữ nguyên tận cùng. Các số tận cùng 2, 3, 7, 8 có chu kỳ lặp là 4 (ví dụ: 2^1=2, 2^2=4, 2^3=8, 2^4=16, 2^5=32...). Để tìm chữ số tận cùng của a^n, ta lấy n chia cho 4.",
          exercises: [
            {
              id: "MATH6-W25-D01-Q01",
              level: "medium",
              question: "Chữ số tận cùng của số 2^20 là chữ số nào?",
              answer: "6",
              type: "number",
              hints: ["Lấy số mũ 20 chia cho 4 được 5 dư 0. Do đó 2^20 có cùng chữ số tận cùng với 2^4."],
              explanation: "20 chia hết cho 4. 2^4 = 16 tận cùng là 6, nên 2^20 tận cùng là 6.",
              rubric: "Xác định chu kỳ 4: 0.5đ, đáp số 6: 0.5đ."
            },
            {
              id: "MATH6-W25-D01-Q02",
              level: "advanced",
              question: "Tìm chữ số tận cùng của số 7^2025:",
              answer: "7",
              type: "number",
              hints: ["Lấy 2025 chia cho 4. Tìm số dư."],
              explanation: "2025 chia 4 dư 1. Do đó 7^2025 có cùng chữ số tận cùng với 7^1 = 7.",
              rubric: "Chia số mũ tìm số dư 1: 0.5đ, kết luận chữ số 7: 0.5đ."
            },
            {
              id: "MATH6-W25-D01-Q03",
              level: "olympiad",
              question: "Tìm chữ số tận cùng của biểu thức: A = 2^101 + 3^101. Chữ số tận cùng là:",
              answer: "5",
              type: "number",
              hints: ["101 chia 4 dư 1. Tính tận cùng của 2^101 và 3^101 rồi cộng lại."],
              explanation: "101 chia 4 dư 1. 2^101 tận cùng là 2, 3^101 tận cùng là 3. Vậy 2 + 3 = 5.",
              rubric: "Tính đúng từng tận cùng: 0.5đ, cộng lại ra 5: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 4",
          title: "Ứng Dụng Đồng Dư Thức Chứng Minh Chia Hết",
          theory: "Hai số a và b được gọi là đồng dư với nhau theo mod m (ký hiệu a ≡ b (mod m)) nếu a và b có cùng số dư khi chia cho m (tức là a − b chia hết cho m). Tính chất: Nếu a ≡ b (mod m) thì a^n ≡ b^n (mod m).",
          exercises: [
            {
              id: "MATH6-W25-D02-Q01",
              level: "advanced",
              question: "Số dư khi chia 5^100 cho 4 là bao nhiêu?",
              answer: "1",
              type: "number",
              hints: ["5 chia 4 dư 1, tức là 5 ≡ 1 (mod 4)."],
              explanation: "Vì 5 ≡ 1 (mod 4) nên 5^100 ≡ 1^100 = 1 (mod 4). Số dư là 1.",
              rubric: "Biến đổi đồng dư: 0.5đ, đáp số 1: 0.5đ."
            },
            {
              id: "MATH6-W25-D02-Q02",
              level: "olympiad",
              question: "Số dư khi chia 3^105 cho 7 là bao nhiêu?",
              answer: "6",
              type: "number",
              hints: ["3^3 = 27 ≡ -1 (mod 7). 105 = 3 × 35."],
              explanation: "Ta có 3^3 = 27 = 4 × 7 − 1 ≡ -1 (mod 7). Do đó 3^105 = (3^3)^35 ≡ (-1)^35 = -1 ≡ 6 (mod 7). Số dư là 6.",
              rubric: "Biến đổi qua 3^3: 0.5đ, kết luận số dư 6: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 3,
          name: "Thứ 6",
          title: "Thử Thách Olympic: Tìm 2 Chữ Số Tận Cùng",
          theory: "Để tìm 2 chữ số tận cùng của một số, ta tìm số dư của số đó khi chia cho 100. Lưu ý các lũy thừa đặc biệt: 7^4 = 2401 ≡ 1 (mod 100), 2^20 = 1048576 ≡ 76 (mod 100).",
          exercises: [
            {
              id: "MATH6-W25-D03-Q01",
              level: "olympiad",
              question: "Hai chữ số tận cùng của số 7^2024 là bao nhiêu?",
              answer: "01",
              type: "text",
              hints: ["7^4 = 2401 tận cùng là 01. 2024 chia hết cho 4."],
              explanation: "7^4 = 2401 ≡ 1 (mod 100). Vì 2024 = 4 × 506 nên 7^2024 = (7^4)^506 ≡ 1^506 = 01 (mod 100).",
              rubric: "Phát hiện 7^4 tận cùng 01: 0.5đ, đáp số 01: 0.5đ."
            }
          ]
        }
      ]
    },
    {
      id: "w26",
      number: 26,
      title: "Phương Trình Nghiệm Nguyên Z Sơ Cấp",
      goal: "Thành thạo phương pháp phân tích nhân tử đưa về dạng ước số và kỹ thuật chặn miền nghiệm trên tập số nguyên Z.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Phương Pháp Phân Tích Đưa Về Dạng Tích",
          theory: "Phương pháp đưa về tích: Đưa phương trình về dạng (A) × (B) = k, trong đó A và B là các biểu thức chứa x, y; k là một số nguyên cụ thể. Khi đó A và B phải là các ước số nguyên của k.",
          exercises: [
            {
              id: "MATH6-W26-D01-Q01",
              level: "advanced",
              question: "Có bao nhiêu cặp số nguyên (x, y) thỏa mãn: (x + 1)(y − 2) = 3?",
              answer: "4",
              type: "number",
              hints: ["Các ước nguyên của 3 là: 1, -1, 3, -3. Mỗi ước cho ta 1 cặp (x, y)."],
              explanation: "Ước của 3 là {1, 3, -1, -3}. Tương ứng có 4 trường hợp, mỗi trường hợp cho đúng 1 nghiệm nguyên (x, y). Có tất cả 4 cặp.",
              rubric: "Liệt kê 4 ước: 0.5đ, kết luận 4 cặp: 0.5đ."
            },
            {
              id: "MATH6-W26-D01-Q02",
              level: "olympiad",
              question: "Tìm giá trị x nguyên dương lớn nhất thỏa mãn: xy − 2x + y = 5.",
              answer: "2",
              type: "number",
              hints: ["Thêm bớt đưa về tích: x(y − 2) + (y − 2) = 5 − 2 = 3 => (x + 1)(y − 2) = 3."],
              explanation: "Biến đổi: xy - 2x + y - 2 = 3 => (x + 1)(y - 2) = 3. Vì x là số nguyên dương nên x + 1 ≥ 2. Do x + 1 là ước của 3 nên x + 1 = 3 => x = 2 (tương ứng y = 3). Vậy giá trị x nguyên dương lớn nhất (và duy nhất) là 2.",
              rubric: "Biến đổi đưa về dạng tích: 0.5đ, tìm đúng x = 2: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 4",
          title: "Phương Pháp Đánh Giá Chặn & Chia Có Dư",
          theory: "Kỹ thuật chặn: Nếu x, y là các số nguyên dương và biểu thức có dạng đối xứng hoặc luỹ thừa, ta có thể giả sử x ≤ y để chặn miền giá trị của biến nhỏ hơn.",
          exercises: [
            {
              id: "MATH6-W26-D02-Q01",
              level: "olympiad",
              question: "Tìm số cặp số nguyên dương (x, y) thỏa mãn: 1/x + 1/y = 1/2 với x ≤ y.",
              answer: "2",
              type: "number",
              hints: ["Vì x ≤ y nên 1/x ≥ 1/y. Do đó 1/2 = 1/x + 1/y ≤ 2/x => x ≤ 4. Mà x > 2 nên x ∈ {3, 4}."],
              explanation: "x phải lớn hơn 2. Do x <= y nên 1/x >= 1/4 => x <= 4. Vậy x = 3 (y = 6) hoặc x = 4 (y = 4). Có đúng 2 cặp (3, 6) và (4, 4).",
              rubric: "Chặn được miền x: 0.5đ, tìm đúng 2 cặp: 0.5đ."
            }
          ]
        }
      ]
    },
    {
      id: "w27",
      number: 27,
      title: "Dãy Phân Số Quy Luật & Sai Phân Triệt Tiêu",
      goal: "Làm chủ kỹ thuật phân tích số hạng tổng quát để triệt tiêu các phân số trung gian và ước lượng bất đẳng thức phân số.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Công Thức Sai Phân Tổng Quát",
          theory: "Công thức cơ bản: 1/(n × (n + 1)) = 1/n − 1/(n + 1). Mở rộng: k/(n × (n + k)) = 1/n − 1/(n + k). Khi cộng một chuỗi các phân số này, các số hạng trung gian sẽ triệt tiêu từng cặp số đối nhau.",
          exercises: [
            {
              id: "MATH6-W27-D01-Q01",
              level: "advanced",
              question: "Tính giá trị biểu thức: S = 1/(1×2) + 1/(2×3) + 1/(3×4) + ... + 1/(99×100). (Viết dạng a/b tối giản)",
              answer: "99/100",
              type: "fraction",
              hints: ["S = 1 - 1/2 + 1/2 - 1/3 + ... + 1/99 - 1/100 = 1 - 1/100."],
              explanation: "S = (1 - 1/2) + (1/2 - 1/3) + ... + (1/99 - 1/100) = 1 - 1/100 = 99/100.",
              rubric: "Triệt tiêu các cặp đối: 0.5đ, đáp án 99/100: 0.5đ."
            },
            {
              id: "MATH6-W27-D01-Q02",
              level: "olympiad",
              question: "Tính giá trị: B = 2/(1×3) + 2/(3×5) + 2/(5×7) + ... + 2/(19×21). (Dạng a/b)",
              answer: "20/21",
              type: "fraction",
              hints: ["2/(n×(n+2)) = 1/n - 1/(n+2). B = 1 - 1/21."],
              explanation: "B = (1 - 1/3) + (1/3 - 1/5) + ... + (1/19 - 1/21) = 1 - 1/21 = 20/21.",
              rubric: "Áp dụng đúng sai phân: 0.5đ, đáp số 20/21: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 4",
          title: "Chứng Minh Bất Đẳng Thức Phân Số",
          theory: "Để chứng minh tổng S < k, ta thường làm trội từng số hạng của S bằng một dãy sai phân có thể tính được tổng.",
          exercises: [
            {
              id: "MATH6-W27-D02-Q01",
              level: "olympiad",
              question: "Cho A = 1/2^2 + 1/3^2 + 1/4^2 + ... + 1/100^2. So sánh A với 1, ta được A < ? (Điền 1 nếu A < 1, điền 2 nếu A >= 1)",
              answer: "1",
              type: "number",
              hints: ["1/n^2 < 1/((n-1)×n). Do đó A < 1/(1×2) + 1/(2×3) + ... + 1/(99×100) = 1 - 1/100 < 1."],
              explanation: "Vì 1/n^2 < 1/(n-1)n nên A < 1 - 1/100 < 1.",
              rubric: "Đánh giá làm trội: 0.5đ, kết luận đúng: 0.5đ."
            }
          ]
        }
      ]
    },
    {
      id: "w28",
      number: 28,
      title: "Nguyên Lý Dirichlet & Kỹ Thuật Chứng Minh Phản Chứng",
      goal: "Hiểu bản chất 'nguyên lý chuồng bồ câu' và vận dụng giải quyết các bài toán suy luận logic tổ hợp hóc búa.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Nguyên Lý Dirichlet Cơ Bản",
          theory: "Nguyên lý Dirichlet: Nếu nhốt (n + 1) con thỏ vào n cái chuồng thì luôn có ít nhất một chuồng chứa từ 2 con thỏ trở lên. Dạng tổng quát: Nếu nhốt m con thỏ vào n chuồng thì luôn có ít nhất một chuồng chứa không ít hơn [m/n] + 1 con thỏ.",
          exercises: [
            {
              id: "MATH6-W28-D01-Q01",
              level: "advanced",
              question: "Trong một lớp học có 37 học sinh. Chứng minh rằng luôn có ít nhất bao nhiêu bạn có cùng tháng sinh?",
              answer: "4",
              type: "number",
              hints: ["Một năm có 12 tháng (12 chuồng). Có 37 bạn (37 con thỏ). 37 = 3 × 12 + 1."],
              explanation: "Vì 37 = 3 × 12 + 1 nên theo nguyên lý Dirichlet, tồn tại ít nhất 3 + 1 = 4 bạn sinh cùng một tháng.",
              rubric: "Xác định số chuồng và số thỏ: 0.5đ, đáp số 4: 0.5đ."
            },
            {
              id: "MATH6-W28-D01-Q02",
              level: "olympiad",
              question: "Cần chọn ngẫu nhiên ít nhất bao nhiêu số tự nhiên bất kỳ để chắc chắn có 2 số có cùng số dư khi chia cho 7?",
              answer: "8",
              type: "number",
              hints: ["Khi chia cho 7, có đúng 7 số dư có thể: 0, 1, 2, 3, 4, 5, 6."],
              explanation: "Có 7 số dư khác nhau (7 chuồng). Để chắc chắn có 2 số cùng số dư, ta cần lấy ít nhất 7 + 1 = 8 số.",
              rubric: "Xác định 7 số dư: 0.5đ, kết luận 8 số: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 4",
          title: "Bài Toán Chọn Tất & Bi Trong Bóng Tối",
          theory: "Bài toán trường hợp xấu nhất (Worst-case scenario): Để chắc chắn lấy được một số lượng vật phẩm mong muốn trong điều kiện mù, ta phải tính đến trường hợp xui xẻo nhất là bốc toàn bộ các vật phẩm không mong muốn trước.",
          exercises: [
            {
              id: "MATH6-W28-D02-Q01",
              level: "advanced",
              question: "Trong hộp có 10 đôi tất đen và 10 đôi tất trắng (các chiếc tất rời nhau). Trong phòng tối, cần lấy ra ít nhất bao nhiêu chiếc tất để chắc chắn có được 1 đôi cùng màu?",
              answer: "3",
              type: "number",
              hints: ["Có 2 màu (đen và trắng). Áp dụng Dirichlet với 2 màu."],
              explanation: "Vì chỉ có 2 màu tất, nên theo nguyên lý Dirichlet, lấy 2 + 1 = 3 chiếc chắc chắn có ít nhất 2 chiếc cùng màu tạo thành 1 đôi.",
              rubric: "Áp dụng đúng Dirichlet 2 màu: 0.5đ, đáp số 3: 0.5đ."
            },
            {
              id: "MATH6-W28-D02-Q02",
              level: "olympiad",
              question: "Trong hộp có 8 viên bi đỏ, 6 viên bi xanh và 10 viên bi vàng. Không nhìn vào hộp, phải lấy ra ít nhất bao nhiêu viên bi để chắc chắn có ít nhất 1 viên bi đỏ?",
              answer: "17",
              type: "number",
              hints: ["Trường hợp xấu nhất: Bốc hết tất cả bi xanh và bi vàng trước."],
              explanation: "Trường hợp xấu nhất là bốc hết 6 bi xanh + 10 bi vàng = 16 viên không có bi đỏ nào. Viên thứ 17 chắc chắn là bi đỏ. Cần lấy: 16 + 1 = 17 viên.",
              rubric: "Phân tích trường hợp xấu nhất 16 viên: 0.5đ, đáp số 17: 0.5đ."
            }
          ]
        }
      ]
    },
    {
      id: "w29",
      number: 29,
      title: "Hình Học Nâng Cao – Tỉ Số Diện Tích & Cắt Ghép",
      goal: "Nắm vững kỹ thuật so sánh diện tích tam giác qua tỉ số chiều cao và đáy, giải quyết các bài toán chia diện tích hình phức tạp.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Kỹ Thuật Tỉ Số Diện Tích Tam Giác",
          theory: "1. Hai tam giác có chung đáy (hoặc đáy bằng nhau): Tỉ số diện tích bằng tỉ số chiều cao tương ứng. 2. Hai tam giác có chung chiều cao (hoặc chiều cao bằng nhau): Tỉ số diện tích bằng tỉ số hai đáy.",
          exercises: [
            {
              id: "MATH6-W29-D01-Q01",
              level: "advanced",
              question: "Cho tam giác ABC có diện tích 60 cm². Trên cạnh BC lấy điểm D sao cho BD = 2 × DC. Diện tích tam giác ABD là bao nhiêu cm²?",
              answer: "40",
              type: "number",
              hints: ["Tam giác ABD và ABC có chung chiều cao hạ từ A. BD = 2/3 BC."],
              explanation: "Vì BD = 2 × DC nên BD chiếm 2/3 đoạn BC. Do tam giác ABD và ABC chung chiều cao từ đỉnh A xuống BC nên S(ABD) = 2/3 × S(ABC) = 2/3 × 60 = 40 cm².",
              rubric: "Lập luận tỉ số 2/3: 0.5đ, đáp số 40 cm²: 0.5đ."
            },
            {
              id: "MATH6-W29-D01-Q02",
              level: "olympiad",
              question: "Cho tam giác ABC. M là trung điểm AB, N là điểm trên AC sao cho AN = 1/3 AC. Biết diện tích tam giác AMN là 5 cm². Diện tích tam giác ABC là bao nhiêu cm²?",
              answer: "30",
              type: "number",
              hints: ["Nối B với N. S(AMN) = 1/2 S(ABN). S(ABN) = 1/3 S(ABC)."],
              explanation: "S(AMN) = 1/2 S(ABN) vì chung đường cao từ N và M là trung điểm AB => S(ABN) = 10 cm². Lại có S(ABN) = 1/3 S(ABC) vì AN = 1/3 AC và chung chiều cao từ B => S(ABC) = 3 × 10 = 30 cm².",
              rubric: "Tính S(ABN): 0.5đ, suy ra S(ABC) = 30 cm²: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 4",
          title: "Bài Toán Cắt Ghép Hình & Đường Đi Ngắn Nhất",
          theory: "Phương pháp trải hình (Net unfolding): Để tìm đường đi ngắn nhất giữa hai điểm trên bề mặt hình khối không gian, ta trải hình khối đó ra mặt phẳng 2D. Đường thẳng nối hai điểm trên mặt phẳng chính là đường đi ngắn nhất.",
          exercises: [
            {
              id: "MATH6-W29-D02-Q01",
              level: "olympiad",
              question: "Một con kiến ở góc đáy A của một hình lập phương cạnh 10 cm. Nó muốn bò trên bề mặt hình khối để đến góc đối diện C' ở đỉnh trên. Độ dài ngắn nhất mà kiến phải bò bằng căn bậc hai của bao nhiêu? (Tính d^2)",
              answer: "500",
              type: "number",
              hints: ["Trải 2 mặt liền kề của hình lập phương ra mặt phẳng thành hình chữ nhật kích thước 10 cm × 20 cm. Áp dụng định lý Pythagoras: 10^2 + 20^2."],
              explanation: "Khi trải 2 mặt ra, đoạn đường là đường chéo hình chữ nhật 10 × 20. d^2 = 10^2 + 20^2 = 100 + 400 = 500.",
              rubric: "Trải đúng 2 mặt: 0.5đ, tính đúng 500: 0.5đ."
            }
          ]
        }
      ]
    },
    {
      id: "w30",
      number: 30,
      title: "Đấu Trường Olympic Quốc Tế Tổng Hợp (TIMO/SASMO)",
      goal: "Chinh phục bộ đề thi tuyển chọn từ các kỳ thi Olympic toán học uy tín quốc tế, rèn bản lĩnh thi cử và tư duy đột phá.",
      days: [
        {
          dayIndex: 1,
          name: "Thứ 2",
          title: "Đấu Trường Olympic SASMO & TIMO (Vòng Tuyển Chọn)",
          theory: "Kinh nghiệm làm bài thi Olympic quốc tế: 1. Đọc kỹ đề, phân biệt rõ các từ khóa 'tối thiểu', 'tối đa', 'khác nhau', 'số nguyên dương'. 2. Ưu tiên giải nhanh các câu số học quen thuộc trước. 3. Với các câu hình học và logic, vẽ hình minh họa và thử với các trường hợp nhỏ để tìm quy luật.",
          exercises: [
            {
              id: "MATH6-W30-D01-Q01",
              level: "olympiad",
              question: "⭐ SASMO 6: Có bao nhiêu số có 3 chữ số mà trong đó có ít nhất một chữ số 7?",
              answer: "252",
              type: "number",
              hints: ["Dùng phần bù: Tổng số có 3 chữ số trừ đi số các số có 3 chữ số KHÔNG chứa chữ số 7 nào."],
              explanation: "Tổng số có 3 chữ số: 900 số (từ 100 đến 999). Số các số không chứa chữ số 7: Chữ số hàng trăm có 8 cách (1-9 trừ 7); hàng chục có 9 cách (0-9 trừ 7); hàng đơn vị có 9 cách => 8 × 9 × 9 = 648 số. Số các số có ít nhất một chữ số 7: 900 − 648 = 252 số.",
              rubric: "Tính số phần bù 648: 0.5đ, đáp số 252: 0.5đ."
            },
            {
              id: "MATH6-W30-D01-Q02",
              level: "olympiad",
              question: "⭐ TIMO 6: Tính giá trị của phép toán định nghĩa mới: a * b = a × b + a − b. Giá trị của 7 * 4 là bao nhiêu?",
              answer: "31",
              type: "number",
              hints: ["Thay a = 7, b = 4 vào công thức định nghĩa."],
              explanation: "7 * 4 = 7 × 4 + 7 − 4 = 28 + 7 − 4 = 31.",
              rubric: "Thay số chuẩn xác: 0.5đ, đáp số 31: 0.5đ."
            },
            {
              id: "MATH6-W30-D01-Q03",
              level: "olympiad",
              question: "⭐ Olympic: Một ngày có 24 giờ. Kim giờ và kim phút của đồng hồ tạo thành một góc vuông (90°) bao nhiêu lần trong một ngày?",
              answer: "44",
              type: "number",
              hints: ["Trong 12 giờ, kim phút quay nhanh hơn kim giờ 11 vòng, tạo ra góc vuông 22 lần. Một ngày là 24 giờ."],
              explanation: "Trong 12 giờ, kim phút quay 12 vòng, kim giờ quay 1 vòng, nên kim phút vượt kim giờ 11 lần. Trong mỗi lần vượt nhau, kim phút tạo với kim giờ góc vuông 2 lần. Do đó trong 12 giờ có 11 × 2 = 22 lần góc vuông. Trong 24 giờ sẽ có 22 × 2 = 44 lần.",
              rubric: "Lập luận chu kỳ 12 giờ: 0.5đ, kết luận 44 lần: 0.5đ."
            }
          ]
        },
        {
          dayIndex: 2,
          name: "Thứ 4",
          title: "Chung Kết Trạng Nguyên Toán 6 & Vinh Danh Cúp Vàng",
          theory: "Chúc mừng Ngân đã hoàn thành xuất sắc toàn bộ 30 tuần học tập Toán 6! Con đã làm chủ từ nền tảng số học GDPT 2018 đến các đỉnh cao tư duy Olympic quốc tế. Hãy tự hào về nỗ lực và sự kiên trì bền bỉ của mình!",
          exercises: [
            {
              id: "MATH6-W30-D02-Q01",
              level: "olympiad",
              question: "⭐ Thử thách Chung kết: Tìm số tự nhiên n nhỏ nhất để tổng 1 + 2 + 3 + ... + n là một số có 3 chữ số giống nhau (dạng aaa). Giá trị của n là:",
              answer: "36",
              type: "number",
              hints: ["Tổng = n(n+1)/2 = aaa = a × 111 = a × 3 × 37. Do đó n(n+1) = a × 2 × 3 × 37 = 6a × 37."],
              explanation: "n(n+1)/2 = a × 111 = a × 3 × 37 => n(n+1) = 2 × 3 × a × 37 = 6a × 37. Vì n và n+1 là 2 số tự nhiên liên tiếp nên 6a phải bằng 36 (với a = 6) hoặc 38. Với a = 6, 6a = 36, ta có n = 36 và n+1 = 37. Tổng là 36 × 37 / 2 = 666. Số n nhỏ nhất là 36.",
              rubric: "Phân tích 111 ra thừa số 37: 0.5đ, đáp số n = 36: 0.5đ."
            }
          ]
        }
      ]
    }
  ]
};
