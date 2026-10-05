// js/game-registry.js - Kiến trúc Cắm-Rút Quản lý Trò chơi Toán học (Game Plugin Registry)

import { SpeedMathGame } from "./games/speed-math.js";
import { IntegerSubmarineGame } from "./games/integer-submarine.js";
import { PrimeBusterGame } from "./games/prime-buster.js";
import { FractionForgeGame } from "./games/fraction-forge.js";
import { AlgebraScaleGame } from "./games/algebra-scale.js";
import { SpotTheBugGame } from "./games/spot-the-bug.js";
import { SymmetryLabGame } from "./games/symmetry-lab.js";
import { MakeTargetGame } from "./games/make-target.js";
import { RushHourGame } from "./games/rush-hour.js";
import { Spatial3DGame } from "./games/spatial-3d.js";
import { TangramGame } from "./games/tangram.js";
import { ChimpMemoryGame } from "./games/chimp-memory.js";
import { LogicGridGame } from "./games/logic-grid.js";
import { BarModelGame } from "./games/bar-model.js";
import { BalanceDetectiveGame } from "./games/balance-detective.js";

const gameCatalog = [
  SpeedMathGame,
  RushHourGame,
  Spatial3DGame,
  TangramGame,
  ChimpMemoryGame,
  LogicGridGame,
  BarModelGame,
  BalanceDetectiveGame,
  IntegerSubmarineGame,
  PrimeBusterGame,
  FractionForgeGame,
  AlgebraScaleGame,
  SpotTheBugGame,
  SymmetryLabGame,
  MakeTargetGame
];

export function getRegisteredGames() {
  return gameCatalog;
}

export function getGameById(gameId) {
  return gameCatalog.find(g => g.id === gameId) || null;
}
