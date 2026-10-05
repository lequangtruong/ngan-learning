// test/server-patch.test.mjs - Kiểm thử cơ chế Tự Động Sửa Code Trên Server
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

import os from "node:os";

import vm from "node:vm";

test("Target question MATH6-W01-D01-Q01 can be found in data/modules/", () => {
  const modPath = path.join(rootDir, "data", "modules", "mod-01-foundation.js");
  const content = fs.readFileSync(modPath, "utf-8");
  assert.ok(content.includes('id: "MATH6-W01-D01-Q01"'));
  assert.ok(content.includes('answer: "56"'));
});

test("Auto-patching question preserves syntactic validity of JS module", () => {
  const modPath = path.join(rootDir, "data", "modules", "mod-01-foundation.js");
  const original = fs.readFileSync(modPath, "utf-8");

  const testExplanation = '8 × 7 = 56. (Xác thực bởi Parent Auto-Patcher)';
  const modified = original.replace(
    /explanation:\s*"8 × 7 = 56\."/,
    `explanation: "${testExplanation}"`
  );

  let syntaxPassed = false;
  let tempDir = null;

  try {
    try {
      tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "ngan-patch-test-"));
    } catch {
      const fallbackBase = path.join(rootDir, ".tmp-test");
      if (!fs.existsSync(fallbackBase)) fs.mkdirSync(fallbackBase, { recursive: true });
      tempDir = fs.mkdtempSync(path.join(fallbackBase, "ngan-patch-test-"));
    }
    const tempModPath = path.join(tempDir, "mod-01-foundation.js");
    fs.writeFileSync(tempModPath, modified, "utf-8");
    execSync(`node --check "${tempModPath}"`, { stdio: "pipe" });
    syntaxPassed = true;
  } catch (err) {
    // Nếu môi trường read-only chặn tạo thư mục/ghi file (EPERM), kiểm tra cú pháp trong bộ nhớ bằng vm.Script
    try {
      const scriptCode = modified
        .replace(/\bexport\s+default\b/g, "const _def =")
        .replace(/\bexport\s+(const|let|var|function|class)\b/g, "$1");
      new vm.Script(scriptCode);
      syntaxPassed = true;
    } catch {
      syntaxPassed = false;
    }
  } finally {
    if (tempDir) {
      try {
        fs.rmSync(tempDir, { recursive: true, force: true });
      } catch (_) {}
    }
  }

  assert.ok(syntaxPassed, "File module phải hoàn toàn hợp lệ về cú pháp sau khi tự động vá!");
});
