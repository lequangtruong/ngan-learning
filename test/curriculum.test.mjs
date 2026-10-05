// test/curriculum.test.mjs - Unit test cho bộ quản lý giáo trình Toán 6
import test from "node:test";
import assert from "node:assert/strict";
import { getAllWeeks, getWeek, findQuestionById, getCurriculumMeta } from "../data/curriculum-registry.js";

test("Curriculum Registry should have exactly 24 weeks", () => {
  const weeks = getAllWeeks();
  assert.equal(weeks.length, 24);
  assert.equal(weeks[0].number, 1);
  assert.equal(weeks[23].number, 24);
});

test("Curriculum Metadata should conform to Grade 6 Math", () => {
  const meta = getCurriculumMeta();
  assert.ok(meta.title.includes("Ngân"));
  assert.ok(meta.textbook.includes("GDPT 2018"));
});

test("getWeek should find week by number and by string ID", () => {
  const w1 = getWeek(1);
  assert.ok(w1);
  assert.equal(w1.id, "w01");

  const w7 = getWeek("w07");
  assert.ok(w7);
  assert.equal(w7.number, 7);
});

test("findQuestionById should locate question with immutable ID", () => {
  const res = findQuestionById("MATH6-W01-D01-Q01");
  assert.ok(res, "Should find MATH6-W01-D01-Q01");
  assert.equal(res.exercise.answer, "56");
  assert.equal(res.week.number, 1);
  assert.ok(res.module.id);
});
