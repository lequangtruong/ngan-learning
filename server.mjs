// server.mjs - Local Server & Auto-Patching Engine cho Ngân Learning Lab
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 4175;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8"
};

/**
 * Đọc body JSON từ request
 */
function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 10 * 1024 * 1024) { // Max 10MB (cho ảnh)
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

/**
 * Tìm file module chứa câu hỏi theo immutable questionId
 */
function findModuleFileForQuestion(questionId) {
  const modulesDir = path.join(__dirname, "data", "modules");
  if (!fs.existsSync(modulesDir)) return null;
  const files = fs.readdirSync(modulesDir).filter(f => f.endsWith(".js"));

  for (const file of files) {
    const fullPath = path.join(modulesDir, file);
    const content = fs.readFileSync(fullPath, "utf-8");
    if (content.includes(`"${questionId}"`) || content.includes(`'${questionId}'`)) {
      return {
        filename: file,
        relPath: `data/modules/${file}`,
        fullPath
      };
    }
  }
  return null;
}

/**
 * Trích xuất khối câu hỏi từ nội dung file
 */
function extractQuestionBlock(content, questionId) {
  const regex = new RegExp(`(\\{[\\s\\S]*?id:\\s*["']${questionId}["'][\\s\\S]*?\\n\\s*\\})`, "g");
  const match = regex.exec(content);
  if (match) {
    return {
      rawBlock: match[1],
      index: match.index
    };
  }
  return null;
}

/**
 * Tự động sửa code trực tiếp trong file module
 */
function patchQuestionInFile(fullPath, questionId, patchData) {
  let content = fs.readFileSync(fullPath, "utf-8");

  // Tìm vị trí ID câu hỏi
  const idPos = content.indexOf(`id: "${questionId}"`);
  const altIdPos = idPos >= 0 ? idPos : content.indexOf(`id: '${questionId}'`);
  if (altIdPos < 0) {
    throw new Error(`Không tìm thấy câu hỏi ${questionId} trong file`);
  }

  // Tìm khối ngoặc nhọn bao quanh câu hỏi
  let startBrace = content.lastIndexOf("{", altIdPos);
  let depth = 0;
  let endBrace = -1;
  for (let i = startBrace; i < content.length; i++) {
    if (content[i] === "{") depth++;
    else if (content[i] === "}") {
      depth--;
      if (depth === 0) {
        endBrace = i;
        break;
      }
    }
  }

  if (startBrace < 0 || endBrace < 0) {
    throw new Error(`Không thể định vị ranh giới khối câu hỏi ${questionId}`);
  }

  let block = content.substring(startBrace, endBrace + 1);
  let updatedBlock = block;

  // Cập nhật answer nếu có với validation và JSON literal escaping an toàn
  if (patchData.answer !== undefined && patchData.answer !== null) {
    const cleanAns = String(patchData.answer).trim();
    if (!/^[-+]?[\w\s.,/()^:;]+$/i.test(cleanAns) || cleanAns.length > 100) {
      throw new Error("Đáp án chứa ký tự không an toàn hoặc vượt quá độ dài cho phép");
    }
    const escapedAns = JSON.stringify(cleanAns);
    if (/answer:\s*["'][^"']*["']/.test(updatedBlock)) {
      updatedBlock = updatedBlock.replace(/answer:\s*["'][^"']*["']/, `answer: ${escapedAns}`);
    } else {
      updatedBlock = updatedBlock.replace(/id:\s*["'][^"']*["'],?/, `id: "${questionId}",\n              answer: ${escapedAns},`);
    }
  }

  // Cập nhật question nếu có với JSON literal escaping
  if (patchData.question !== undefined && patchData.question.trim()) {
    const escapedQ = JSON.stringify(String(patchData.question).trim());
    if (/question:\s*["'][\s\S]*?["'],\s*\n/.test(updatedBlock)) {
      updatedBlock = updatedBlock.replace(/question:\s*["'][\s\S]*?["'],\s*\n/, `question: ${escapedQ},\n`);
    }
  }

  // Cập nhật explanation nếu có với JSON literal escaping
  if (patchData.explanation !== undefined && patchData.explanation.trim()) {
    const escapedExp = JSON.stringify(String(patchData.explanation).trim());
    if (/explanation:\s*["'][\s\S]*?["'],?\s*\n/.test(updatedBlock)) {
      updatedBlock = updatedBlock.replace(/explanation:\s*["'][\s\S]*?["'],?\s*\n/, `explanation: ${escapedExp},\n`);
    }
  }

  // Cập nhật rubric nếu có với JSON literal escaping
  if (patchData.rubric !== undefined && patchData.rubric.trim()) {
    const escapedRub = JSON.stringify(String(patchData.rubric).trim());
    if (/rubric:\s*["'][\s\S]*?["'],?\s*\n/.test(updatedBlock)) {
      updatedBlock = updatedBlock.replace(/rubric:\s*["'][\s\S]*?["'],?\s*\n/, `rubric: ${escapedRub},\n`);
    }
  }

  // Cập nhật hints nếu có dạng mảng
  if (Array.isArray(patchData.hints) && patchData.hints.length > 0) {
    const hintsStr = JSON.stringify(patchData.hints);
    if (/hints:\s*\[[\s\S]*?\],?\s*\n/.test(updatedBlock)) {
      updatedBlock = updatedBlock.replace(/hints:\s*\[[\s\S]*?\],?\s*\n/, `hints: ${hintsStr},\n`);
    }
  }

  // Ghép lại nội dung file
  const newContent = content.substring(0, startBrace) + updatedBlock + content.substring(endBrace + 1);
  return { newContent, oldBlock: block, newBlock: updatedBlock };
}

// Khởi tạo HTTP Server
const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  let rawPath = parsedUrl.pathname.replace(/\/+/g, "/");
  let pathname = rawPath;
  if (pathname.startsWith("/ngan-learning")) {
    pathname = pathname.substring("/ngan-learning".length) || "/";
  }

  // CORS headers bảo mật
  const origin = req.headers.origin || "";
  const isAllowedOrigin = !origin ||
    origin.includes("localhost") ||
    origin.includes("127.0.0.1") ||
    origin.includes("ngrok-free.dev") ||
    origin.includes("ngrok.io");

  if (isAllowedOrigin && origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else if (!origin) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  } else {
    res.setHeader("Access-Control-Allow-Origin", "null");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // 1. API: Kiểm tra trạng thái hệ thống
  if (req.method === "GET" && pathname === "/api/system/status") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      status: "online",
      server: "Ngan Learning Lab Auto-Patch Server",
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // 2. API: Lấy chi tiết một câu hỏi để hiển thị cho phụ huynh chỉnh sửa
  if (req.method === "GET" && pathname.startsWith("/api/curriculum/question/")) {
    const questionId = pathname.replace("/api/curriculum/question/", "").trim();
    const loc = findModuleFileForQuestion(questionId);
    if (!loc) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: `Không tìm thấy câu hỏi ${questionId}` }));
      return;
    }
    const content = fs.readFileSync(loc.fullPath, "utf-8");
    const extracted = extractQuestionBlock(content, questionId);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      found: true,
      questionId,
      file: loc.relPath,
      rawSnippet: extracted ? extracted.rawBlock : null
    }));
    return;
  }

  // 3. API: Phụ huynh báo lỗi & Server TỰ ĐỘNG SỬA CODE
  if (req.method === "POST" && pathname === "/api/parent-feedback/patch") {
    try {
      const body = await readJsonBody(req);
      const { ticketId, questionId, targetFile, errorType, description, parentProposedFix, patchData, parentPin } = body;

      // Bảo mật phân quyền: Xác thực mã PIN Phụ huynh (hoặc Header x-parent-pin)
      const pin = req.headers["x-parent-pin"] || parentPin;
      const expectedPin = process.env.PARENT_ADMIN_PIN || "2026";
      if (process.env.NODE_ENV === "production" || pin) {
        if (!pin || String(pin).trim() !== String(expectedPin)) {
          res.writeHead(403, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: false, error: "Bảo mật: Yêu cầu mã PIN Phụ huynh (2026) để sửa mã nguồn hệ thống." }));
          return;
        }
      }

      if (!questionId || typeof questionId !== "string" || !/^MATH6-W\d{1,2}-D\d{1,2}-Q\d{1,2}$/i.test(questionId)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: "Mã câu hỏi không hợp lệ (cần tuân thủ định dạng MATH6-W{w}-D{d}-Q{q})" }));
        return;
      }

      // Xác định file đích
      let loc = null;
      if (targetFile && fs.existsSync(path.join(__dirname, targetFile))) {
        loc = {
          relPath: targetFile,
          fullPath: path.join(__dirname, targetFile),
          filename: path.basename(targetFile)
        };
      } else {
        loc = findModuleFileForQuestion(questionId);
      }

      if (!loc) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: `Không tìm thấy file module chứa câu hỏi ${questionId}` }));
        return;
      }

      // Ngăn chặn Path Traversal: Đảm bảo file được vá bắt buộc phải nằm trong data/modules/
      const modulesDir = path.resolve(__dirname, "data", "modules");
      if (!path.resolve(loc.fullPath).startsWith(modulesDir) || !loc.filename.endsWith(".js")) {
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: "Quyền truy cập bị từ chối: File mục tiêu phải nằm trong thư mục data/modules" }));
        return;
      }

      // Chuẩn bị dữ liệu vá: ưu tiên patchData, nếu không có thì suy luận từ parentProposedFix
      const finalPatchData = Object.assign({}, patchData || {});

      // Nếu phụ huynh chưa điền patchData chi tiết nhưng có đề xuất sửa đáp án
      if (!finalPatchData.answer && parentProposedFix) {
        // Trích xuất số hoặc biểu thức từ đề xuất (ví dụ: "đáp án là 56", "sửa thành -13", "56")
        const numMatch = parentProposedFix.match(/(?:đáp án|thành|=)\s*([-\d/.,]+)/i) || parentProposedFix.match(/^([-\d/.,]+)$/);
        if (numMatch) {
          finalPatchData.answer = numMatch[1].trim();
        }
      }

      // Tạo thư mục backup nếu chưa có
      const backupDir = path.join(__dirname, "data", "backups");
      if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

      // Lưu bản sao dự phòng trước khi vá
      const timestamp = Date.now();
      const backupPath = path.join(backupDir, `${loc.filename}.${timestamp}.bak`);
      fs.copyFileSync(loc.fullPath, backupPath);

      // Thực hiện vá code
      const { newContent, oldBlock, newBlock } = patchQuestionInFile(loc.fullPath, questionId, finalPatchData);

      // Ghi tạm vào file
      fs.writeFileSync(loc.fullPath, newContent, "utf-8");

      // KIỂM TRA CÚ PHÁP TỰ ĐỘNG BẰNG NODE --CHECK
      try {
        execSync(`node --check "${loc.fullPath}"`, { stdio: "pipe" });
      } catch (checkErr) {
        // Cú pháp bị lỗi -> Khôi phục ngay lập tức từ file backup!
        fs.copyFileSync(backupPath, loc.fullPath);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          success: false,
          error: `Vá thất bại do vi phạm cú pháp JS. Hệ thống đã tự động khôi phục nguyên trạng! Chi tiết: ${checkErr.message}`
        }));
        return;
      }

      // Ghi nhật ký vào data/patch-logs.json
      const patchLogsPath = path.join(__dirname, "data", "patch-logs.json");
      let logs = [];
      if (fs.existsSync(patchLogsPath)) {
        try {
          logs = JSON.parse(fs.readFileSync(patchLogsPath, "utf-8"));
        } catch (_) {
          logs = [];
        }
      }

      const logEntry = {
        ticketId: ticketId || `AUTO-FIX-${timestamp}`,
        questionId,
        file: loc.relPath,
        errorType: errorType || "PHỤ_HUYNH_YÊU_CẦU",
        description: description || "",
        parentProposedFix: parentProposedFix || "",
        appliedPatch: finalPatchData,
        backupFile: path.relative(__dirname, backupPath),
        patchedAt: new Date().toISOString(),
        status: "VERIFIED_OK"
      };
      logs.unshift(logEntry);
      fs.writeFileSync(patchLogsPath, JSON.stringify(logs, null, 2), "utf-8");

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        success: true,
        message: `Đã tự động sửa mã nguồn trong file ${loc.relPath} thành công và xác thực cú pháp JS hợp lệ!`,
        ticketId: logEntry.ticketId,
        questionId,
        targetFile: loc.relPath,
        patchedAt: logEntry.patchedAt,
        diff: {
          before: oldBlock,
          after: newBlock
        }
      }));
      return;
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, error: err.message }));
      return;
    }
  }

  // 4. API: Lấy danh sách lịch sử các bản vá
  if (req.method === "GET" && pathname === "/api/patch-logs") {
    const patchLogsPath = path.join(__dirname, "data", "patch-logs.json");
    if (fs.existsSync(patchLogsPath)) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(fs.readFileSync(patchLogsPath, "utf-8"));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify([]));
    }
    return;
  }

  // 5. API: Chấm ảnh bài giải bằng AI Vision (Multimodal Grader)
  if (req.method === "POST" && pathname === "/api/grade-math") {
    try {
      const body = await readJsonBody(req);
      const { imageBase64, questionId, rubric, expectedAnswer, questionText } = body;

      // Nếu có GEMINI_API_KEY ở môi trường máy chủ
      if (process.env.GEMINI_API_KEY && imageBase64) {
        // Có thể gọi trực tiếp Gemini Multimodal API tại đây
        // (Bảo đảm bí mật API Key không bao giờ lộ về trình duyệt của học sinh)
      }

      // Phản hồi trung thực sư phạm: Nếu chưa có GEMINI_API_KEY thì không được làm giả điểm 100%
      if (!process.env.GEMINI_API_KEY) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          status: "MANUAL_REVIEW_REQUIRED",
          confidence: 0,
          scorePercent: null,
          awardedPoints: null,
          totalPoints: 1.0,
          lines: [
            { line: 1, text: "Đã tiếp nhận và lưu ảnh bài làm trong vở của học sinh", status: "SAVED", note: "Chờ phụ huynh hoặc giáo viên đối soát" }
          ],
          advice: "Server chưa kích hoạt GEMINI_API_KEY để tự động chấm điểm qua AI Vision. Ảnh bài làm đã được lưu để phụ huynh/thầy cô đối soát trực tiếp trong vở.",
          canResubmit: true
        }));
        return;
      }
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
      return;
    }
  }

  // 6. Phục vụ Static Files
  let filePath = path.join(__dirname, pathname === "/" ? "index.html" : pathname);
  
  // Tránh Directory Traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-cache"
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // SPA Fallback cho client router
    const indexPath = path.join(__dirname, "index.html");
    if (fs.existsSync(indexPath)) {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      fs.createReadStream(indexPath).pipe(res);
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
  }
});

server.listen(PORT, () => {
  console.log(`[Ngan Learning Lab Server] Đang chạy tại http://localhost:${PORT}`);
  console.log(`[Auto-Patch Engine] Sẵn sàng tiếp nhận phản hồi từ phụ huynh và tự động sửa mã nguồn!`);
});
