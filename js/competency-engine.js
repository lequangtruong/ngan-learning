// js/competency-engine.js - Thang đo Năng lực Toán học MQI (0-1000) & Biểu đồ Radar SVG

const DAILY_GAME_CAP = 40; // Giới hạn tối đa 40 điểm/game/ngày để chống cày điểm

export function calculateMQI(metrics = {}) {
  const fluency = Math.min(1000, Math.max(0, metrics.fluency ?? 400));
  const algebra = Math.min(1000, Math.max(0, metrics.algebra ?? 400));
  const geometry = Math.min(1000, Math.max(0, metrics.geometry ?? 400));
  const logic = Math.min(1000, Math.max(0, metrics.logic ?? 400));
  const resilience = Math.min(1000, Math.max(0, metrics.resilience ?? 400));

  // Trọng số 5 trục: Fluency (20%), Algebra (30%), Geometry (20%), Logic (20%), Resilience (10%)
  const totalMqi = Math.round(
    fluency * 0.20 +
    algebra * 0.30 +
    geometry * 0.20 +
    logic * 0.20 +
    resilience * 0.10
  );

  return {
    totalMqi,
    fluency,
    algebra,
    geometry,
    logic,
    resilience,
    tier: getTierInfo(totalMqi)
  };
}

export function getTierInfo(score) {
  if (score >= 900) return { title: "Bậc Thầy Toán Học (Grandmaster)", color: "#7c3aed", badge: "👑" };
  if (score >= 800) return { title: "Bản Lĩnh Olympic (Challenger)", color: "#2563eb", badge: "🏆" };
  if (score >= 650) return { title: "Nhà Toán Học Khá Giỏi (Advanced)", color: "#16a34a", badge: "🌟" };
  if (score >= 400) return { title: "Vững Vàng Chuẩn Lớp 6 (Core)", color: "#d97706", badge: "📚" };
  return { title: "Khởi Động Nền Tảng (Starter)", color: "#6b7280", badge: "🌱" };
}

/**
 * Vẽ Biểu đồ Radar động thuần SVG (5 Trục)
 */
export function renderRadarChartSvg(metrics, size = 260) {
  const center = size / 2;
  const radius = size * 0.38;
  const axes = [
    { label: "Tính Nhẩm", value: metrics.fluency || 400, angle: -Math.PI / 2 },
    { label: "Đại Số", value: metrics.algebra || 400, angle: -Math.PI / 2 + (2 * Math.PI / 5) * 1 },
    { label: "Hình Học", value: metrics.geometry || 400, angle: -Math.PI / 2 + (2 * Math.PI / 5) * 2 },
    { label: "Logic", value: metrics.logic || 400, angle: -Math.PI / 2 + (2 * Math.PI / 5) * 3 },
    { label: "Bền Bỉ", value: metrics.resilience || 400, angle: -Math.PI / 2 + (2 * Math.PI / 5) * 4 }
  ];

  // Vẽ các vòng lưới đồng tâm (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const gridPolygons = gridLevels.map(lvl => {
    const pts = axes.map(a => {
      const r = radius * lvl;
      const x = center + r * Math.cos(a.angle);
      const y = center + r * Math.sin(a.angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
    return `<polygon points="${pts}" fill="none" stroke="#e5e7eb" stroke-width="1.2" />`;
  }).join("");

  // Vẽ các trục toạ độ
  const axisLines = axes.map(a => {
    const x = center + radius * Math.cos(a.angle);
    const y = center + radius * Math.sin(a.angle);
    return `<line x1="${center}" y1="${center}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#cbd5e1" stroke-width="1.2" stroke-dasharray="3,3" />`;
  }).join("");

  // Tọa độ đa giác dữ liệu của Ngân
  const dataPoints = axes.map(a => {
    const normalized = Math.min(1000, Math.max(0, a.value)) / 1000;
    const r = radius * normalized;
    const x = center + r * Math.cos(a.angle);
    const y = center + r * Math.sin(a.angle);
    return { x, y, str: `${x.toFixed(1)},${y.toFixed(1)}` };
  });

  const polygonPoints = dataPoints.map(p => p.str).join(" ");
  const dotElements = dataPoints.map(p => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4.5" fill="#2563eb" stroke="#ffffff" stroke-width="2" />`).join("");

  // Nhãn các trục
  const labels = axes.map(a => {
    const labelR = radius + 22;
    const x = center + labelR * Math.cos(a.angle);
    const y = center + labelR * Math.sin(a.angle) + 4;
    return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="#334155">${a.label}</text>`;
  }).join("");

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="radar-chart-svg" aria-label="Biểu đồ radar năng lực">
      ${gridPolygons}
      ${axisLines}
      <polygon points="${polygonPoints}" fill="rgba(37, 99, 235, 0.22)" stroke="#2563eb" stroke-width="2.5" />
      ${dotElements}
      ${labels}
    </svg>
  `;
}

// Bảng Từ Điển Sư Phạm Chuyên Sâu Cho 5 Trục Năng Lực Toán 6
const AXIS_PEDAGOGICAL_DATA = {
  fluency: {
    key: "fluency",
    name: "Tính Nhẩm & Phản Xạ Cửu Chương",
    icon: "⚡",
    color: "#f59e0b",
    praiseHigh: (name) => ({
      title: "Phản Xạ Số Học Thần Tốc!",
      detail: `${name} có năng lực tính nhẩm và ghi nhớ bảng cửu chương, lũy thừa cực kỳ nhạy bén. Tốc độ xử lý phép tính nhanh giúp con tiết kiệm tới 40% thời gian làm bài thi và luôn tự tin trước các phép tính lớn.`
    }),
    praiseMid: (name) => ({
      title: "Nền Tảng Tính Toán Tốt",
      detail: `${name} thực hiện tốt các phép tính cơ bản của lớp 6. Chỉ cần rèn luyện thêm khả năng gộp số tròn chục tròn trăm thì tốc độ giải toán của con sẽ bứt phá vượt bậc.`
    }),
    bottleneck: {
      title: "Phản xạ phép tính nhiều chữ số & tính nhẩm nhanh còn mất thời gian",
      cause: "Học sinh lớp 6 thường có thói quen đặt bút tính nháp từng bước theo lối mòn Tiểu học, chưa vận dụng linh hoạt tính chất phân phối a × (b + c) để gộp số tròn chục, tròn trăm.",
      remedy: "Áp dụng kỹ thuật tách số thông minh và tham gia Đấu trường tính nhẩm 90s - 120s đếm ngược để xây dựng nhịp điệu tư duy nhanh và dứt khoát.",
      recommendedWeeks: [
        { id: "w01", number: 1, title: "Tập Hợp & Thứ Tự Phép Tính, Lũy Thừa", reason: "Nắm vững quy tắc gộp số và tính chất lũy thừa" }
      ],
      recommendedGames: [
        { id: "speed-math", name: "Đấu Trường Nhẩm 90s - 120s", icon: "⚡", reason: "Luyện nhịp độ phản xạ dưới áp lực thời gian" },
        { id: "make-target", name: "Đấu Trường 24 & Số Mục Tiêu", icon: "🎯", reason: "Rèn tư duy tổ hợp 4 phép tính linh hoạt" }
      ]
    }
  },
  algebra: {
    key: "algebra",
    name: "Số Học & Đại Số (Số Nguyên Z, Tìm x)",
    icon: "🔢",
    color: "#3b82f6",
    praiseHigh: (name) => ({
      title: "Tư Duy Đại Số Sắc Sảo & Vững Vàng!",
      detail: `${name} nắm rất chắc bản chất tập hợp số nguyên Z, quy tắc chuyển vế đổi dấu và xử lý biểu thức đại số. Đây là bước nhảy vọt quan trọng nhất giữa Toán Tiểu học và THCS mà ${name} đã làm chủ xuất sắc!`
    }),
    praiseMid: (name) => ({
      title: "Khả Năng Xử Lý Biểu Thức Tốt",
      detail: `${name} hiểu các phép toán trên số tự nhiên và số nguyên. Khi rèn kỹ hơn phản xạ với các dấu ngoặc lồng nhau, con sẽ giải ngon lành mọi bài tìm x nâng cao.`
    }),
    bottleneck: {
      title: "Dễ nhầm lẫn quy tắc dấu ngoặc và phép trừ số nguyên âm",
      cause: "Khái niệm số âm ngược hướng trên trục số là tư duy trừu tượng mới của lớp 6. Khi gặp biểu thức lồng ngoặc như -(-a) hay -(a - b), các con rất dễ quên đổi dấu bên trong ngoặc.",
      remedy: "Sử dụng mô hình trực quan Tàu ngầm lặn dưới mực nước biển và Cân đĩa đại số để hiểu bản chất: 'Chuyển vế thì phải đổi dấu' như việc cân bằng hai đĩa cân.",
      recommendedWeeks: [
        { id: "w02", number: 2, title: "Ước, Bội & Số Nguyên Tố", reason: "Củng cố phân tích thừa số nguyên tố và dấu hiệu chia hết" },
        { id: "w03", number: 3, title: "Số Nguyên Âm & Phép Toán Trên Z", reason: "Làm chủ quy tắc chuyển vế đổi dấu và bỏ dấu ngoặc" }
      ],
      recommendedGames: [
        { id: "integer-submarine", name: "Tàu Ngầm Số Nguyên Z", icon: "⚓", reason: "Trực quan hóa độ cao âm/dương trên trục số" },
        { id: "algebra-scale", name: "Cân Bằng Cân Đĩa Đại Số", icon: "⚖️", reason: "Thấu hiểu bản chất cân bằng phương trình tìm x" }
      ]
    }
  },
  geometry: {
    key: "geometry",
    name: "Hình Học Trực Quan, Đối Xứng & Không Gian 3D",
    icon: "📐",
    color: "#10b981",
    praiseHigh: (name) => ({
      title: "Trực Giác Không Gian & Đối Xứng Sắc Nét!",
      detail: `${name} có khả năng quan sát hình học phẳng và tưởng tượng hình khối không gian 3D trải net (mặt trải phẳng) rất ấn tượng. Đây là tố chất đặc trưng của những bạn có năng khiếu kiến trúc và hình học!`
    }),
    praiseMid: (name) => ({
      title: "Cảm Quan Hình Học Tốt",
      detail: `${name} nhận biết chuẩn xác các hình phẳng cơ bản (tam giác đều, hình thoi, hình bình hành). Tiếp tục trải nghiệm hình 3D thực tế sẽ giúp con hoàn thiện toàn diện.`
    }),
    bottleneck: {
      title: "Khó tưởng tượng hình khối 3D từ hình vẽ 2D & nhầm chu vi với diện tích",
      cause: "Hình học lớp 6 bắt đầu tính diện tích các hình phẳng đặc biệt và hình trải net (hộp chữ nhật, lập phương). Nhìn trên trang giấy phẳng 2D khiến con khó hình dung không gian thật.",
      remedy: "Trải nghiệm mô hình 3D xoay chiều đa góc, bài toán gấp hộp (net folding) và xếp hình trí uẩn Tangram để xây dựng tư duy không gian trực quan từ gốc rễ.",
      recommendedWeeks: [
        { id: "w05", number: 5, title: "Hình Học Phẳng: Tam Giác Đều, Hình Thoi, Hình Bình Hành", reason: "Phân biệt rạch ròi công thức chu vi và diện tích từng hình" },
        { id: "w06", number: 6, title: "Hình Có Trục Đối Xứng & Tâm Đối Xứng", reason: "Rèn luyện cảm quan đối xứng và hình khối trực quan" }
      ],
      recommendedGames: [
        { id: "spatial-3d", name: "Thám Tử Khối 3D & Net Gấp Hộp", icon: "📦", reason: "Xoay khối 3D và ghép hình trải net trực quan" },
        { id: "tangram", name: "Xếp Hình Trí Uẩn Tangram", icon: "🧩", reason: "Rèn khả năng xoay ghép và phân rã diện tích đa giác" },
        { id: "symmetry-lab", name: "Phòng Thí Nghiệm Trục Đối Xứng", icon: "🪞", reason: "Luyện phản xạ gương và tâm đối xứng" }
      ]
    }
  },
  logic: {
    key: "logic",
    name: "Giải Quyết Vấn Đề & Tư Duy Logic",
    icon: "🧠",
    color: "#8b5cf6",
    praiseHigh: (name) => ({
      title: "Tư Duy Phân Tích & Lập Luận Logic Tuyệt Vời!",
      detail: `${name} có phương pháp tiếp cận bài toán lời văn rất bài bản: biết bóc tách dữ kiện, dùng phương pháp loại trừ và mô hình hóa bài toán thành từng bước mạch lạc, không bị ngợp trước bài khó.`
    }),
    praiseMid: (name) => ({
      title: "Khả Năng Lập Luận Đang Phát Triển Tốt",
      detail: `${name} nắm bắt tốt các bài toán logic vừa sức. Khi gặp các bài toán có nhiều dữ kiện đan xen, con chỉ cần công cụ sơ đồ đoạn thẳng để tự tin bứt phá.`
    }),
    bottleneck: {
      title: "Dễ bối rối trước bài toán lời văn phức tạp có nhiều dữ kiện đan xen",
      cause: "Các bài toán thực tế (tỉ số phần trăm, phân số, tuổi, chuyển động) chứa nhiều câu chữ khiến học sinh khó chuyển đổi từ ngôn ngữ thông thường sang ngôn ngữ đại số.",
      remedy: "Áp dụng phương pháp Sơ đồ đoạn thẳng Singapore (Bar Model) để vẽ trực quan bài toán, kết hợp chơi trò chơi logic bảng ma trận Einstein để rèn tư duy loại trừ.",
      recommendedWeeks: [
        { id: "w04", number: 4, title: "Phân Số & Bài Toán Lời Văn Thực Tế", reason: "Làm chủ phương pháp tìm giá trị phân số của một số" },
        { id: "w09", number: 9, title: "Chuyên Đề Olympic & Bứt Phá Điểm 10", reason: "Thử thách tư duy đa chiều và giải bài toán hóc búa" }
      ],
      recommendedGames: [
        { id: "bar-model", name: "Sơ Đồ Đoạn Thẳng Singapore", icon: "📊", reason: "Mô hình hóa trực quan mọi bài toán lời văn" },
        { id: "logic-grid", name: "Bảng Suy Luận Logic Einstein", icon: "🕵️", reason: "Rèn luyện phương pháp loại trừ ma trận khoa học" },
        { id: "rush-hour", name: "Kẹt Xe Rush Hour", icon: "🚗", reason: "Luyện tư duy quy hoạch đường đi và chiến lược" }
      ]
    }
  },
  resilience: {
    key: "resilience",
    name: "Săn Lỗi Sai & Bản Lĩnh Kiên Trì",
    icon: "🛡️",
    color: "#ec4899",
    praiseHigh: (name) => ({
      title: "Bản Lĩnh Bền Bỉ, Tư Duy Phát Triển (Growth Mindset) Đáng Nể!",
      detail: `${name} không hề sợ hãi trước bài toán khó. Khi làm bài chưa đúng, con luôn bình tĩnh kiểm tra lại từng dòng để tìm ra lỗi sai và rút kinh nghiệm sâu sắc. Đây là phẩm chất quý giá nhất của một nhà toán học!`
    }),
    praiseMid: (name) => ({
      title: "Tinh Thần Học Tập Nghiêm Túc",
      detail: `${name} có tính kiên nhẫn khi làm bài. Con đang dần hình thành thói quen kiểm tra lại đáp án (sanity check) trước khi nộp bài.`
    }),
    bottleneck: {
      title: "Tâm lý sợ sai khi gặp bài toán lạ hoặc vội nản lòng sau khi làm sai",
      cause: "Học sinh lứa tuổi lớp 6 rất nhạy cảm với kết quả điểm số và sợ bị đánh giá. Khi sai một câu, con dễ bị phân tâm và mất tự tin ở các câu tiếp theo.",
      remedy: "Nuôi dưỡng tư duy 'Sai lầm là bạn thân của học tập'. Thường xuyên đóng vai 'Thám tử bắt lỗi' để săn lỗi sai của người khác, từ đó thấy sai sót là hoàn toàn bình thường và biết cách tự sửa.",
      recommendedWeeks: [
        { id: "w01", number: 1, title: "Luyện Tập Lại Các Câu Hỏi Từng Sai", reason: "Rèn thói quen vượt qua bẫy và khẳng định lại kiến thức" }
      ],
      recommendedGames: [
        { id: "spot-the-bug", name: "Spot The Bug 6.0 (Săn Bẫy Toán Học)", icon: "🔍", reason: "Rèn con mắt tinh tường phát hiện bẫy sai" },
        { id: "balance-detective", name: "Thám Tử Cân Bóng Giả Olympic", icon: "⚖️", reason: "Tư duy chia để trị và kiên nhẫn bóc tách manh mối" }
      ]
    }
  }
};

/**
 * Tạo Báo Cáo Chẩn Đoán Sư Phạm Toàn Diện (Pedagogical Diagnosis Engine)
 * @param {object} metrics - 5 trục năng lực (0-1000)
 * @param {string} learnerName - Tên của bé ("Ngân", "Bách", "Khoa"...)
 */
export function generatePedagogicalDiagnosis(metrics = {}, learnerName = "Ngân") {
  const mqi = calculateMQI(metrics);
  const name = learnerName || "Ngân";

  // Danh sách các trục kèm điểm số
  const axesList = [
    { key: "fluency", val: mqi.fluency },
    { key: "algebra", val: mqi.algebra },
    { key: "geometry", val: mqi.geometry },
    { key: "logic", val: mqi.logic },
    { key: "resilience", val: mqi.resilience }
  ].sort((a, b) => b.val - a.val);

  // Điểm mạnh nhất (Top 2)
  const strengths = axesList.slice(0, 2).map(item => {
    const data = AXIS_PEDAGOGICAL_DATA[item.key];
    const praiseFn = item.val >= 650 ? data.praiseHigh : data.praiseMid;
    const praise = praiseFn(name);
    return {
      key: item.key,
      name: data.name,
      icon: data.icon,
      color: data.color,
      score: item.val,
      title: praise.title,
      description: praise.detail
    };
  });

  // Điểm nghẽn cần bứt phá nhất (Bottom 2)
  const growthAreas = axesList.slice(-2).reverse().map(item => {
    const data = AXIS_PEDAGOGICAL_DATA[item.key];
    return {
      key: item.key,
      name: data.name,
      icon: data.icon,
      color: data.color,
      score: item.val,
      title: data.bottleneck.title,
      cause: data.bottleneck.cause,
      remedy: data.bottleneck.remedy,
      recommendedWeeks: data.bottleneck.recommendedWeeks,
      recommendedGames: data.bottleneck.recommendedGames
    };
  });

  // Lộ trình rèn luyện 3 bước cụ thể trong 7 ngày tới
  const primaryWeakness = growthAreas[0];
  const primaryGame = primaryWeakness.recommendedGames[0];
  const primaryWeek = primaryWeakness.recommendedWeeks[0];

  const actionRoadmap = [
    {
      step: 1,
      tag: "Khởi động phản xạ (10 phút/ngày)",
      title: `Chơi game tư duy [${primaryGame.name}]`,
      desc: `Giúp ${name} kích hoạt cảm quan trực quan và lấy lại phản xạ tự nhiên mà không cảm thấy áp lực bài tập.`,
      actionLabel: `🎮 Chơi Ngay ${primaryGame.name}`,
      actionUrl: `#games?play=${primaryGame.id}`
    },
    {
      step: 2,
      tag: "Củng cố lý thuyết & Kỹ năng (15 phút/ngày)",
      title: `Chinh phục [Tuần ${primaryWeek.number}: ${primaryWeek.title}]`,
      desc: `Làm các bài toán trọng điểm để ${name} làm chủ hoàn toàn quy tắc cốt lõi và phương pháp tư duy.`,
      actionLabel: `📖 Mở Bài Học Tuần ${primaryWeek.number}`,
      actionUrl: `#math?week=${primaryWeek.id}`
    },
    {
      step: 3,
      tag: "Tự tin bứt phá & Săn lỗi (Cuối tuần)",
      title: `Thử thách Thám tử săn lỗi & Chụp ảnh vở ô ly AI`,
      desc: `Khuyến khích ${name} trình bày tự luận ra vở ô ly và chụp ảnh để trợ lý AI chấm từng bước, rèn tính cẩn thận.`,
      actionLabel: `📸 Làm Bài Vở Ô Ly`,
      actionUrl: `#math?week=${primaryWeek.id}`
    }
  ];

  // Lời khuyên ấm áp dành riêng cho Phụ huynh đồng hành
  const parentGuidance = [
    {
      icon: "⏱️",
      title: "Quy tắc 20 Phút Vàng (Pomodoro)",
      content: `Não bộ của học sinh 11-12 tuổi đạt hiệu quả tập trung tốt nhất trong 20-25 phút. Ba mẹ hãy khuyến khích ${name} học tập trung ngắn nhưng duy trì đều đặn mỗi tối, thay vì ngồi 2 tiếng căng thẳng vào cuối tuần.`
    },
    {
      icon: "🌱",
      title: "Khen Ngợi Nỗ Lực & Quá Trình (Process Praise)",
      content: `Thay vì khen 'Con thông minh lắm', ba mẹ hãy khen: 'Ba mẹ rất thích cách ${name} kiên trì thử cách giải thứ 2 khi cách đầu chưa đúng'. Điều này giúp ${name} xây dựng Tư duy phát triển vững chắc, không ngại thử thách.`
    },
    {
      icon: "💡",
      title: "Nghệ Thuật Đặt Câu Hỏi Gợi Mở (Không Giải Hộ)",
      content: `Khi ${name} gặp bài toán hóc búa, ba mẹ hãy kiên nhẫn hỏi gợi mở: 'Đề bài đang cho mình biết những dữ kiện gì rồi con?', 'Con có nhớ trò chơi ${primaryGame.name} mình áp dụng nguyên lý gì không?'. Hãy để con là người tìm ra chìa khóa cuối cùng!`
    },
    {
      icon: "🤝",
      title: "Thách Đấu Gia Đình Cuối Tuần",
      content: `Cuối tuần, ba mẹ hãy cùng ${name} chơi 1 ván trò chơi toán học (như Speed Math hoặc Kẹt Xe Rush Hour). Biến toán học thành trò chơi vui vẻ sẽ giúp tình cảm gia đình thêm gắn kết và ${name} yêu thích môn Toán hơn bao giờ hết.`
    }
  ];

  return {
    learnerName: name,
    mqi,
    strengths,
    growthAreas,
    actionRoadmap,
    parentGuidance
  };
}

