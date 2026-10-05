// test/competency.test.mjs - Unit test cho Thang đo Năng lực MQI (0-1000)
import test from "node:test";
import assert from "node:assert/strict";
import { calculateMQI, getTierInfo, renderRadarChartSvg, generatePedagogicalDiagnosis } from "../js/competency-engine.js";

test("calculateMQI should return weighted score between 0 and 1000", () => {
  const defaultMqi = calculateMQI({
    fluency: 500,
    algebra: 500,
    geometry: 500,
    logic: 500,
    resilience: 500
  });

  assert.equal(defaultMqi.totalMqi, 500);
  assert.equal(defaultMqi.tier.title, "Vững Vàng Chuẩn Lớp 6 (Core)");
});

test("calculateMQI should clamp boundary values strictly 0-1000", () => {
  const high = calculateMQI({ fluency: 1500, algebra: 2000, geometry: 9999, logic: 1000, resilience: 1000 });
  assert.equal(high.totalMqi, 1000);

  const low = calculateMQI({ fluency: -50, algebra: -100, geometry: 0, logic: 0, resilience: 0 });
  assert.equal(low.totalMqi, 0);
});

test("getTierInfo should assign correct badges and titles", () => {
  assert.equal(getTierInfo(950).title, "Bậc Thầy Toán Học (Grandmaster)");
  assert.equal(getTierInfo(850).title, "Bản Lĩnh Olympic (Challenger)");
  assert.equal(getTierInfo(700).title, "Nhà Toán Học Khá Giỏi (Advanced)");
  assert.equal(getTierInfo(450).title, "Vững Vàng Chuẩn Lớp 6 (Core)");
  assert.equal(getTierInfo(200).title, "Khởi Động Nền Tảng (Starter)");
});

test("renderRadarChartSvg should output valid SVG string", () => {
  const svg = renderRadarChartSvg({ fluency: 600, algebra: 700, geometry: 550, logic: 800, resilience: 650 });
  assert.ok(svg.includes("<svg"));
  assert.ok(svg.includes("polygon"));
  assert.ok(svg.includes("Tính Nhẩm"));
  assert.ok(svg.includes("Đại Số"));
});

test("generatePedagogicalDiagnosis should provide personalized praises, bottlenecks, roadmap, and parent advice", () => {
  const diagnosisNgan = generatePedagogicalDiagnosis({
    fluency: 780, // Top 1
    algebra: 420, // Weakest
    geometry: 450, // Weak 2
    logic: 750, // Top 2
    resilience: 600
  }, "Ngân");

  assert.equal(diagnosisNgan.learnerName, "Ngân");
  assert.equal(diagnosisNgan.strengths.length, 2);
  assert.equal(diagnosisNgan.strengths[0].key, "fluency");
  assert.ok(diagnosisNgan.strengths[0].description.includes("Ngân"));
  assert.ok(diagnosisNgan.strengths[0].title.includes("Phản Xạ"));

  // Check bottlenecks (growth areas)
  assert.equal(diagnosisNgan.growthAreas.length, 2);
  assert.equal(diagnosisNgan.growthAreas[0].key, "algebra");
  assert.ok(diagnosisNgan.growthAreas[0].title.includes("dấu ngoặc"));
  assert.ok(diagnosisNgan.growthAreas[0].recommendedWeeks.length > 0);
  assert.ok(diagnosisNgan.growthAreas[0].recommendedGames.length > 0);

  // Check roadmap & parent advice
  assert.equal(diagnosisNgan.actionRoadmap.length, 3);
  assert.ok(diagnosisNgan.actionRoadmap[0].actionUrl.startsWith("#games?play="));
  assert.ok(diagnosisNgan.actionRoadmap[1].actionUrl.startsWith("#math?week="));

  assert.equal(diagnosisNgan.parentGuidance.length, 4);
  assert.ok(diagnosisNgan.parentGuidance[0].content.includes("Ngân"));
});

test("generatePedagogicalDiagnosis should seamlessly support Khoa and Bách", () => {
  const diagBach = generatePedagogicalDiagnosis({ fluency: 500, algebra: 820, geometry: 400, logic: 850, resilience: 700 }, "Bách");
  assert.equal(diagBach.learnerName, "Bách");
  assert.ok(diagBach.strengths[0].description.includes("Bách"));

  const diagKhoa = generatePedagogicalDiagnosis({ fluency: 700, algebra: 600, geometry: 800, logic: 500, resilience: 600 }, "Khoa");
  assert.equal(diagKhoa.learnerName, "Khoa");
  assert.ok(diagKhoa.strengths[0].description.includes("Khoa"));
});

