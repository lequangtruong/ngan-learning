// scripts/test-speedmath-play.mjs - CDP test để click trực tiếp vào Speed Math trên Chrome thật
import { spawn } from "node:child_process";
import fs from "node:fs";

console.log("🚀 Khởi động Chrome Headless với CDP port 9222...");

const chromeProc = spawn(
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  [
    "--headless",
    "--disable-gpu",
    "--remote-debugging-port=9222",
    "--window-size=1200,900",
    "about:blank"
  ],
  { stdio: "ignore" }
);

// Chờ 1 giây để Chrome sẵn sàng
await new Promise(r => setTimeout(r, 1200));

try {
  const versionResp = await fetch("http://127.0.0.1:9222/json/version");
  const versionInfo = await versionResp.json();
  const wsUrl = versionInfo.webSocketDebuggerUrl;
  console.log("✔ Đã kết nối Chrome CDP:", wsUrl);

  // Tạo tab mới với URL encode
  const targetUrl = "http://localhost:4175/#games";
  const newTabResp = await fetch("http://127.0.0.1:9222/json/new?" + encodeURIComponent(targetUrl), { method: "PUT" });
  const tabInfo = await newTabResp.json();
  const tabWs = new WebSocket(tabInfo.webSocketDebuggerUrl);

  await new Promise((resolve, reject) => {
    tabWs.onopen = resolve;
    tabWs.onerror = reject;
  });

  let msgId = 1;
  function sendCdp(method, params = {}) {
    return new Promise((resolve) => {
      const id = msgId++;
      const handler = (evt) => {
        const data = JSON.parse(evt.data);
        if (data.id === id) {
          tabWs.removeEventListener("message", handler);
          resolve(data.result);
        }
      };
      tabWs.addEventListener("message", handler);
      tabWs.send(JSON.stringify({ id, method, params }));
    });
  }

  await sendCdp("Page.enable");
  await sendCdp("Runtime.enable");

  // Chờ trang tải xong
  await new Promise(r => setTimeout(r, 1500));

  // 1. Click vào nút "Chơi Ngay" của Speed Math
  console.log("👉 Bấm nút 'Chơi Ngay' trên thẻ Speed Math 6.0...");
  const clickRes = await sendCdp("Runtime.evaluate", {
    expression: `
      (() => {
        const btn = document.querySelector('.btn-play-game[data-launch="speed-math"]');
        if (btn) {
          btn.click();
          return { clicked: true, found: true };
        }
        return { clicked: false, found: false };
      })()
    `,
    returnByValue: true
  });
  console.log("  Kết quả click:", clickRes.result.value);

  // Chờ game arena render
  await new Promise(r => setTimeout(r, 1000));

  // 2. Chụp ảnh màn hình Speed Math đang chạy
  const shot1 = await sendCdp("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(
    "/Users/truong/.gemini/antigravity-ide/brain/b45735db-6364-4c6a-bdfc-2ce0030a52c2/speed_math_ingame.png",
    Buffer.from(shot1.data, "base64")
  );
  console.log("✔ Đã lưu ảnh Speed Math đang chạy: speed_math_ingame.png");

  // 3. Bấm vào đáp án lựa chọn đầu tiên
  console.log("👉 Bấm vào nút đáp án lựa chọn nhanh...");
  const answerClickRes = await sendCdp("Runtime.evaluate", {
    expression: `
      (() => {
        const choiceBtn = document.querySelector('.btn-sm-choice');
        const questionText = document.querySelector('#smQuestion')?.textContent;
        if (choiceBtn) {
          const val = choiceBtn.dataset.choice;
          choiceBtn.click();
          return { answered: true, choice: val, question: questionText };
        }
        return { answered: false };
      })()
    `,
    returnByValue: true
  });
  console.log("  Kết quả trả lời:", answerClickRes.result.value);

  // Chờ 500ms để điểm số và hiệu ứng cập nhật
  await new Promise(r => setTimeout(r, 500));

  // 4. Chụp ảnh màn hình sau khi bấm trả lời
  const shot2 = await sendCdp("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(
    "/Users/truong/.gemini/antigravity-ide/brain/b45735db-6364-4c6a-bdfc-2ce0030a52c2/speed_math_after_answer.png",
    Buffer.from(shot2.data, "base64")
  );
  console.log("✔ Đã lưu ảnh kết quả trả lời: speed_math_after_answer.png");

  // 5. Kiểm tra nút quay về "← Trở Về Danh Sách Game"
  console.log("👉 Bấm nút '← Trở Về Danh Sách Game'...");
  const exitRes = await sendCdp("Runtime.evaluate", {
    expression: `
      (() => {
        const exitBtn = document.querySelector('#btnExitActiveGame');
        if (exitBtn) {
          exitBtn.click();
          return { exited: true };
        }
        return { exited: false };
      })()
    `,
    returnByValue: true
  });
  console.log("  Kết quả bấm nút thoát:", exitRes.result.value);

  // Chờ 300ms rồi kiểm tra lại danh sách game
  await new Promise(r => setTimeout(r, 400));
  const verifyHubRes = await sendCdp("Runtime.evaluate", {
    expression: `
      (() => {
        const hub = document.querySelector('#gamesHubGrid');
        const arena = document.querySelector('#activeGameContainer');
        return {
          hubVisible: !hub.hidden,
          arenaHidden: arena.hidden
        };
      })()
    `,
    returnByValue: true
  });
  console.log("  Xác nhận đã về danh sách game:", verifyHubRes.result.value);

  tabWs.close();
} finally {
  chromeProc.kill();
  console.log("✔ Đã hoàn tất phiên kiểm thử CDP thực tế!");
}
