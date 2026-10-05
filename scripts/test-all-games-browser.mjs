// scripts/test-all-games-browser.mjs
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

console.log("Checking CDP...");
try {
  const wsUrl = await getBrowserWs();
  console.log("Found page CDP:", wsUrl);
} catch (e) {
  console.log("CDP check note:", e.message);
}
