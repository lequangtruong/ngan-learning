// js/image-compressor.js - Nén ảnh Canvas phần cứng & giải phóng RAM Safari iPadOS

export async function compressImageToJpeg(file, options = {}) {
  const maxWidth = options.maxWidth || 1400;
  const maxHeight = options.maxHeight || 1400;
  const quality = options.quality !== undefined ? options.quality : 0.82;

  if (!file) throw new Error("Không có tệp ảnh được chọn.");

  // Tạo Object URL tạm thời
  const objectUrl = URL.createObjectURL(file);

  try {
    const img = await loadImage(objectUrl);
    let { width, height } = img;

    // Giữ nguyên tỉ lệ khung hình (Aspect Ratio)
    if (width > maxWidth || height > maxHeight) {
      if (width / maxWidth > height / maxHeight) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      } else {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) throw new Error("Không thể khởi tạo Canvas 2D.");

    // Đổ nền trắng cho ảnh JPEG (tránh nền đen khi ảnh gốc trong suốt)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    // Xuất ra JPEG chất lượng cao tối ưu dung lượng (200-400KB)
    const dataUrl = canvas.toDataURL("image/jpeg", quality);
    const base64Data = dataUrl.split(",")[1];

    // DỌN DẸP BỘ NHỚ TRIỆT ĐỂ: Xóa canvas buffer để chống crash Safari di động
    canvas.width = 1;
    canvas.height = 1;

    return {
      dataUrl,
      base64: base64Data,
      mimeType: "image/jpeg",
      width,
      height,
      sizeBytes: Math.round(base64Data.length * 0.75)
    };
  } finally {
    // Thu hồi Object URL ngay lập tức để giải phóng RAM
    URL.revokeObjectURL(objectUrl);
  }
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Không thể tải ảnh. Định dạng có thể không được hỗ trợ."));
    img.src = url;
  });
}
