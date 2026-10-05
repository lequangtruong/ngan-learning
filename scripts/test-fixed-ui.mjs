// scripts/test-fixed-ui.mjs
import fs from "node:fs";
import http from "node:http";

async function getBrowserWs() {
  return new Promise((resolve, reject) => {
    http.get("http://localhost:9222/json", (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        const list = JSON.parse(data);
        const page = list.find(p => p.type === "page" && p.url.includes("4175"));
        if (page && page.webSocketDebuggerUrl) resolve(page.webSocketDebuggerUrl);
        else reject(new Error("No 4175 page found in CDP"));
      });
    }).on("error", reject);
  });
}

const wsUrl = await getBrowserWs();
const ws = new globalThis.WebSocket(wsUrl);

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

// 1. Force refresh page
await evalJs(`window.location.reload();`);
await new Promise(r => setTimeout(r, 1200));

// 2. Launch Make Target Pro
console.log("Launching Make Target Pro...");
await evalJs(`
  window.location.hash = "#games";
  setTimeout(() => {
    const btn = document.querySelector("button[data-launch='make-target']");
    if (btn) btn.click();
  }, 200);
`);
await new Promise(r => setTimeout(r, 1000));

// Check computed style of make24-card-btn
const style = await evalJs(`
  (() => {
    const btn = document.querySelector(".make24-card-btn");
    if (!btn) return "not found";
    const cs = window.getComputedStyle(btn);
    return {
      width: cs.width,
      height: cs.height,
      fontSize: cs.fontSize,
      border: cs.border,
      background: cs.background
    };
  })()
`);
console.log("Card style after fix:", style);

// Click card 8, then -, then 4
await evalJs(`
  const cards = document.querySelectorAll(".make24-card-btn");
  if (cards[1]) cards[1].click();
  const op = document.querySelector(".make24-op-btn[data-op='−']");
  if (op) op.click();
  if (cards[2]) cards[2].click();
`);
await new Promise(r => setTimeout(r, 400));

await takeScreenshot("/Users/truong/.gemini/antigravity-ide/brain/b45735db-6364-4c6a-bdfc-2ce0030a52c2/make_target_fixed_cards.png");

ws.close();
process.exit(0);
