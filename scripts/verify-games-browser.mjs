// scripts/verify-games-browser.mjs
import fs from "node:fs";
import http from "node:http";

async function getBrowserWs() {
  return new Promise((resolve, reject) => {
    http.get("http://localhost:9222/json", (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        try {
          const list = JSON.parse(data);
          const page = list.find(p => p.type === "page" && p.url.includes("4175"));
          if (page && page.webSocketDebuggerUrl) resolve(page.webSocketDebuggerUrl);
          else reject(new Error("No 4175 page found in CDP"));
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

const wsUrl = await getBrowserWs();
const ws = new WebSocket(wsUrl);

let msgId = 1;
const pending = new Map();

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = msgId++;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}

ws.addEventListener("message", (evt) => {
  const msg = JSON.parse(evt.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(msg.error);
    else resolve(msg.result);
  }
});

await new Promise(r => ws.addEventListener("open", r));

async function evalJs(expr) {
  const res = await send("Runtime.evaluate", {
    expression: expr,
    returnByValue: true,
    awaitPromise: true
  });
  return res.result?.value;
}

async function takeScreenshot(filepath) {
  const res = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(filepath, Buffer.from(res.data, "base64"));
  console.log(`Saved screenshot: ${filepath}`);
}

// 1. Reload & go to #games
console.log("Navigating to #games...");
await evalJs(`window.location.hash = "#games"; window.location.reload();`);
await new Promise(r => setTimeout(r, 1200));

// Kiểm tra số lượng card trò chơi
const cardCount = await evalJs(`document.querySelectorAll(".game-hub-card").length`);
console.log(`Found ${cardCount} game cards on screen!`);

await takeScreenshot("/Users/truong/.gemini/antigravity-ide/brain/b45735db-6364-4c6a-bdfc-2ce0030a52c2/games_hub_15.png");

// 2. Chơi Rush Hour
console.log("Clicking Play Rush Hour...");
await evalJs(`document.querySelector("button[data-launch='rush-hour']").click();`);
await new Promise(r => setTimeout(r, 800));

const rushBoardVisible = await evalJs(`!!document.querySelector(".rush-hour-arena")`);
console.log(`Rush Hour arena visible: ${rushBoardVisible}`);
await takeScreenshot("/Users/truong/.gemini/antigravity-ide/brain/b45735db-6364-4c6a-bdfc-2ce0030a52c2/game_rush_hour_active.png");

// 3. Quay lại và chơi Spatial 3D
console.log("Exiting Rush Hour...");
await evalJs(`document.querySelector("#btnExitActiveGame").click();`);
await new Promise(r => setTimeout(r, 600));

console.log("Clicking Play Spatial 3D...");
await evalJs(`document.querySelector("button[data-launch='spatial-3d']").click();`);
await new Promise(r => setTimeout(r, 800));
const sp3dVisible = await evalJs(`!!document.querySelector(".spatial-3d-arena")`);
console.log(`Spatial 3D arena visible: ${sp3dVisible}`);
await takeScreenshot("/Users/truong/.gemini/antigravity-ide/brain/b45735db-6364-4c6a-bdfc-2ce0030a52c2/game_spatial_3d_active.png");

// 4. Quay lại và chơi Tangram
console.log("Exiting Spatial 3D...");
await evalJs(`document.querySelector("#btnExitActiveGame").click();`);
await new Promise(r => setTimeout(r, 600));

console.log("Clicking Play Tangram...");
await evalJs(`document.querySelector("button[data-launch='tangram']").click();`);
await new Promise(r => setTimeout(r, 800));
const tgVisible = await evalJs(`!!document.querySelector(".tangram-arena")`);
console.log(`Tangram arena visible: ${tgVisible}`);
await takeScreenshot("/Users/truong/.gemini/antigravity-ide/brain/b45735db-6364-4c6a-bdfc-2ce0030a52c2/game_tangram_active.png");

// Quay lại sảnh trò chơi
await evalJs(`document.querySelector("#btnExitActiveGame").click();`);
await new Promise(r => setTimeout(r, 500));

console.log("Verification finished successfully!");
ws.close();
process.exit(0);
