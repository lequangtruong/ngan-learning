// data/diagnostic-assessment.js - Bài Khảo Sát Năng Lực Đầu Vào & Bộ Điều Chỉnh Độ Khó Cá Nhân Hóa Cho Ngân

export const DIAGNOSTIC_TEST = {
  id: "math6-diagnostic-pretest",
  title: "Bài Khảo Sát Năng Lực Đầu Vào Toán 6",
  subtitle: "10 câu hỏi đa tầng đánh giá chính xác năng lực khởi điểm của Ngân để tự động cá nhân hóa độ khó bài học",
  description: "Không áp lực thời gian. Hãy làm bài cẩn thận và điền đáp số vào từng câu.",
  questions: [
    {
      id: "DIAG-01",
      dimension: "fluency",
      level: "basic",
      question: "Tính nhẩm nhanh: 9 × 7 = ?",
      answer: "63",
      type: "number",
      hint: "Bảng cửu chương 9 hoặc nhẩm 9 × 7 = 10 × 7 − 7 = 70 − 7.",
      explanation: "9 × 7 = 63."
    },
    {
      id: "DIAG-02",
      dimension: "fluency",
      level: "advanced",
      question: "Tính nhanh bằng cách tách thừa số: 25 × 36 = ?",
      answer: "900",
      type: "number",
      hint: "25 × 36 = 25 × (4 × 9) = (25 × 4) × 9 = 100 × 9.",
      explanation: "25 × 36 = (25 × 4) × 9 = 100 × 9 = 900."
    },
    {
      id: "DIAG-03",
      dimension: "algebra",
      level: "basic",
      question: "Rút gọn phân số 42/56 về tối giản (dạng a/b):",
      answer: "3/4",
      type: "fraction",
      hint: "Chia cả tử và mẫu cho ƯCLN là 14.",
      explanation: "42 ÷ 14 / 56 ÷ 14 = 3/4."
    },
    {
      id: "DIAG-04",
      dimension: "algebra",
      level: "medium",
      question: "Tính giá trị phân số: 3/5 + 1/4 = ? (Dạng tối giản a/b)",
      answer: "17/20",
      type: "fraction",
      hint: "Mẫu chung là 20. 3/5 = 12/20; 1/4 = 5/20. 12 + 5 = 17.",
      explanation: "12/20 + 5/20 = 17/20."
    },
    {
      id: "DIAG-05",
      dimension: "fluency",
      level: "medium",
      question: "Tính giá trị biểu thức: 100 − (25 + 5 × 4) = ?",
      answer: "55",
      type: "number",
      hint: "Ưu tiên trong ngoặc: tính nhân trước 5 × 4 = 20, sau đó 25 + 20 = 45.",
      explanation: "100 - (25 + 20) = 100 - 45 = 55."
    },
    {
      id: "DIAG-06",
      dimension: "algebra",
      level: "medium",
      question: "Nhiệt độ Sa Pa buổi sáng là 3°C, đến đêm nhiệt độ giảm thêm 7°C. Nhiệt độ ban đêm là bao nhiêu °C?",
      answer: "-4",
      type: "number",
      hint: "Phép tính: 3 − 7 = -4.",
      explanation: "3 - 7 = -4°C."
    },
    {
      id: "DIAG-07",
      dimension: "geometry",
      level: "medium",
      question: "Một mảnh đất hình vuông có chu vi là 48 m. Diện tích mảnh đất đó là bao nhiêu m²?",
      answer: "144",
      type: "number",
      hint: "Cạnh hình vuông = 48 ÷ 4 = 12 m. Diện tích = 12 × 12.",
      explanation: "Cạnh = 12 m. Diện tích = 12 × 12 = 144 m²."
    },
    {
      id: "DIAG-08",
      dimension: "logic",
      level: "medium",
      question: "Tìm ước chung lớn nhất (ƯCLN) của 18 và 24:",
      answer: "6",
      type: "number",
      hint: "18 = 2 × 3^2; 24 = 2^3 × 3. Thừa số chung là 2 × 3 = 6.",
      explanation: "ƯCLN(18, 24) = 6."
    },
    {
      id: "DIAG-09",
      dimension: "logic",
      level: "advanced",
      question: "Tìm một số biết rằng: Lấy số đó nhân với 3 rồi trừ đi 15 thì được kết quả là 45. Số đó là:",
      answer: "20",
      type: "number",
      hint: "Giải ngược: (45 + 15) ÷ 3 = 60 ÷ 3.",
      explanation: "Số đó là (45 + 15) ÷ 3 = 60 ÷ 3 = 20."
    },
    {
      id: "DIAG-10",
      dimension: "logic",
      level: "olympiad",
      question: "Một đoàn tàu dài 150 m chạy qua một cây cầu dài 350 m hết 25 giây. Vận tốc của đoàn tàu là bao nhiêu m/s?",
      answer: "20",
      type: "number",
      hint: "Quãng đường tàu đi = chiều dài cầu + chiều dài tàu = 350 + 150 = 500 m. Vận tốc = 500 ÷ 25.",
      explanation: "Tổng quãng đường = 350 + 150 = 500 m. Vận tốc = 500 ÷ 25 = 20 m/s."
    }
  ]
};

/**
 * Đánh giá kết quả bài khảo sát đầu vào và tính toán hồ sơ phân cấp độ khó
 */
export function evaluateDiagnostic(userAnswers = {}) {
  let totalScore = 0;
  const questions = DIAGNOSTIC_TEST.questions;
  const breakdown = {
    fluency: { correct: 0, total: 0 },
    algebra: { correct: 0, total: 0 },
    geometry: { correct: 0, total: 0 },
    logic: { correct: 0, total: 0 }
  };

  const detailedResults = [];

  for (const q of questions) {
    const userVal = String(userAnswers[q.id] || "").trim().toLowerCase();
    const expected = String(q.answer).trim().toLowerCase();
    const isCorrect = userVal === expected;

    if (isCorrect) totalScore++;

    const dim = q.dimension || "logic";
    if (breakdown[dim]) {
      breakdown[dim].total++;
      if (isCorrect) breakdown[dim].correct++;
    }

    detailedResults.push({
      id: q.id,
      userAnswer: userVal,
      expectedAnswer: expected,
      isCorrect,
      dimension: q.dimension,
      level: q.level
    });
  }

  // Phân tầng độ khó cá nhân hóa (Difficulty Tier Calibration)
  let level = "CORE_ADVANCED";
  let title = "Trình Độ Chuẩn Lớp 6 Khá (Core Advanced)";
  let badge = "🌟 Khá Giỏi";
  let recommendedTrack = "Lộ trình Cân bằng Lớp 6";
  let hintPolicy = "Gợi ý linh hoạt khi gặp khó";
  let baseMqi = 600;
  let description = "Ngân có nền tảng toán học khá tốt. Hệ thống đã cân chỉnh bài tập mức độ trung bình-khá và mở dần các bài thử thách.";

  if (totalScore >= 9) {
    level = "OLYMPIAD_TALENT";
    title = "Trình Độ Vượt Trội / Bản Lĩnh Olympic";
    badge = "🏆 Bản Lĩnh Olympic";
    recommendedTrack = "Lộ trình Chuyên Sâu & Thử Thách Olympic";
    hintPolicy = "Tự lập tư duy, mở rộng dạng bài nâng cao TIMO/SASMO";
    baseMqi = 820;
    description = "Ngân có phản xạ tính nhẩm và tư duy logic rất xuất sắc! Hệ thống đã kích hoạt toàn bộ thử thách Olympic và tự động ẩn gợi ý sơ cấp để kích thích tư duy độc lập.";
  } else if (totalScore < 6) {
    level = "FOUNDATION_BRIDGE";
    title = "Trình Độ Củng Cố Nền Tảng (Foundation Bridge)";
    badge = "🌱 Nền Tảng";
    recommendedTrack = "Lộ trình Củng cố Cửu chương & Kỹ năng nền";
    hintPolicy = "Luôn hiển thị gợi ý từng bước chi tiết";
    baseMqi = 480;
    description = "Ngân cần củng cố thêm một số kỹ năng tính nhẩm và phân số tiểu học. Hệ thống sẽ bật chế độ đồng hành chi tiết để Ngân tự tin lấy gốc.";
  }

  // Tính lại điểm 5 trục năng lực khởi điểm
  const fluencyRatio = breakdown.fluency.total ? breakdown.fluency.correct / breakdown.fluency.total : 0.5;
  const algebraRatio = breakdown.algebra.total ? breakdown.algebra.correct / breakdown.algebra.total : 0.5;
  const geometryRatio = breakdown.geometry.total ? breakdown.geometry.correct / breakdown.geometry.total : 0.5;
  const logicRatio = breakdown.logic.total ? breakdown.logic.correct / breakdown.logic.total : 0.5;

  const initialMetrics = {
    fluency: Math.round(350 + fluencyRatio * 450),
    algebra: Math.round(350 + algebraRatio * 450),
    geometry: Math.round(350 + geometryRatio * 450),
    logic: Math.round(350 + logicRatio * 450),
    resilience: 500,
    academicMasteryScore: Math.round(totalScore * 10)
  };

  return {
    totalScore,
    maxScore: questions.length,
    percentage: Math.round((totalScore / questions.length) * 100),
    level,
    title,
    badge,
    recommendedTrack,
    hintPolicy,
    baseMqi,
    description,
    breakdown,
    initialMetrics,
    detailedResults,
    evaluatedAt: new Date().toISOString()
  };
}
