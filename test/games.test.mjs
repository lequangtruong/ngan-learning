// test/games.test.mjs - Unit test cho Hệ sinh thái 15 trò chơi toán học độc lập
import test from "node:test";
import assert from "node:assert/strict";
import { getRegisteredGames, getGameById } from "../js/game-registry.js";
import { RushHourSession } from "../js/games/rush-hour.js";
import { Spatial3DGame, renderIsometricCubesSvg } from "../js/games/spatial-3d.js";
import { TangramGame, getPiecePolygonPoints, generateSilhouettePath } from "../js/games/tangram.js";
import { CHIMP_LEVELS } from "../js/games/chimp-memory.js";
import { CELL_STATE } from "../js/games/logic-grid.js";
import { renderBarModelSvg } from "../js/games/bar-model.js";

test("Game Registry should contain exactly 15 pluggable games", () => {
  const games = getRegisteredGames();
  assert.equal(games.length, 15);
});

test("Every game plugin must export valid metadata and render method", () => {
  const games = getRegisteredGames();
  for (const game of games) {
    assert.ok(game.id, "Game must have an id");
    assert.ok(game.title, `Game ${game.id} must have a title`);
    assert.ok(game.subtitle || game.description, `Game ${game.id} must have a subtitle or description`);
    assert.ok(game.icon, `Game ${game.id} must have an icon`);
    assert.equal(typeof game.render, "function", `Game ${game.id} must export a render function`);
  }
});

test("getGameById should retrieve all newly ported games", () => {
  const rush = getGameById("rush-hour");
  assert.ok(rush);
  assert.equal(rush.id, "rush-hour");

  const sp3d = getGameById("spatial-3d");
  assert.ok(sp3d);
  assert.equal(sp3d.id, "spatial-3d");

  const tangram = getGameById("tangram");
  assert.ok(tangram);
  assert.equal(tangram.id, "tangram");

  const chimp = getGameById("chimp-memory");
  assert.ok(chimp);
  assert.equal(chimp.id, "chimp-memory");

  const logic = getGameById("logic-grid");
  assert.ok(logic);
  assert.equal(logic.id, "logic-grid");

  const barModel = getGameById("bar-model");
  assert.ok(barModel);
  assert.equal(barModel.id, "bar-model");

  const balance = getGameById("balance-detective");
  assert.ok(balance);
  assert.equal(balance.id, "balance-detective");

  const none = getGameById("non-existent-game");
  assert.equal(none, null);
});

test("RushHourSession engine logic and moves", () => {
  const session = new RushHourSession(0);
  assert.equal(session.moveCount, 0);
  assert.equal(session.isSolved(), false);
  const red = session.getVehicle("R");
  assert.ok(red);
  assert.equal(red.dir, "H");
});

test("Spatial 3D Isometric SVG generation", () => {
  const svg = renderIsometricCubesSvg([[0,0,0], [1,0,0]]);
  assert.ok(svg.includes("<svg"));
  assert.ok(svg.includes("polygon"));
});

test("Tangram pieces polygon points and silhouette generation", () => {
  const pts = getPiecePolygonPoints("large-triangle");
  assert.ok(pts.includes("70,35"));
  const sil = generateSilhouettePath({ t1: { x: 100, y: 100, rot: 0, flipped: false } });
  assert.ok(sil.startsWith("M "));
});

test("Chimp Memory levels configuration", () => {
  assert.equal(CHIMP_LEVELS.length, 8);
  assert.equal(CHIMP_LEVELS[0].count, 4);
});

test("Bar Model SVG rendering", () => {
  const svg = renderBarModelSvg({ name: "A", parts: 3, extraDiff: 0 }, { name: "B", parts: 1, extraDiff: 0 });
  assert.ok(svg.includes("<svg"));
  assert.ok(svg.includes("Thanh A") || svg.includes("A"));
});
