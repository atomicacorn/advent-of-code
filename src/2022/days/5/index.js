'use strict';
exports.__esModule = true;
exports.part2 =
  exports.part1 =
  exports.sortCrates =
  exports.splitMovesCrates =
    void 0;
var utils_1 = require('utils');
var splitMovesCrates = function (pathToFile) {
  var entries = (0, utils_1.getEntries)(pathToFile);
  var moves = [];
  var crateRows = [];
  entries.forEach(function (entry) {
    if (entry) {
      entry.includes('move') ? moves.push(entry) : crateRows.push(entry);
    }
  });
  return { moves: moves, crateRows: crateRows };
};
exports.splitMovesCrates = splitMovesCrates;
var sortCrates = function (crateRows) {
  var crateStacks = [];
  for (var i = 0; i < crateRows.length; i++) {
    var crateRow = crateRows[i];
    var crates = crateRow.match(/.{1,4}/g);
    if (crates) {
      for (var j = 0; j < crates.length; j++) {
        var crate = crates[j];
        var crateValue = crate.split('')[1].trim(); // 0 is always a whitespace
        if (crateValue && !crateValue.match(/^\d+$/)) {
          if (crateStacks[j]) {
            crateStacks[j] = crateStacks[j] + crateValue; // the string reads from left to right for crates on the top of the stack to the bottom
          } else {
            crateStacks[j] = crateValue;
          }
        }
      }
    }
  }
  return crateStacks;
};
exports.sortCrates = sortCrates;
var moveCrates = function (initialCrates, moves, retainOrder) {
  if (retainOrder === void 0) {
    retainOrder = false;
  }
  for (var i = 0; i < moves.length; i++) {
    var move = moves[i].split(' ');
    var indexToMoveTo = move[5] - 1;
    var indexToMoveFrom = move[3] - 1;
    var count = move[1];
    var orderedCrates = retainOrder
      ? initialCrates[indexToMoveFrom].slice(0, count)
      : initialCrates[indexToMoveFrom]
          .slice(0, count)
          .split('')
          .reverse()
          .join('');
    initialCrates[indexToMoveTo] = orderedCrates + initialCrates[indexToMoveTo];
    initialCrates[indexToMoveFrom] =
      initialCrates[indexToMoveFrom].substring(count);
  }
  return initialCrates;
};
var getCratesOnTop = function (crateStacks) {
  return crateStacks.map(function (crates) {
    return crates.slice(0, 1);
  });
};
// After the rearrangement procedure completes, what crate ends up on top of each stack?
var part1 = function (pathToFile) {
  var _a = (0, exports.splitMovesCrates)(pathToFile),
    moves = _a.moves,
    crateRows = _a.crateRows;
  var crates = (0, exports.sortCrates)(crateRows);
  var movedCrates = moveCrates(crates, moves);
  var cratesOnTop = getCratesOnTop(movedCrates).join('');
  console.log('The crates on top of each stack are', cratesOnTop);
  return cratesOnTop;
};
exports.part1 = part1;
// After the rearrangement procedure completes, what crate ends up on top of each stack?
// Maintain crate order
var part2 = function (pathToFile) {
  var _a = (0, exports.splitMovesCrates)(pathToFile),
    moves = _a.moves,
    crateRows = _a.crateRows;
  var crates = (0, exports.sortCrates)(crateRows);
  var movedCrates = moveCrates(crates, moves, true); // move crates maintaining order
  var cratesOnTop = getCratesOnTop(movedCrates).join('');
  console.log('The crates on top of each stack are', cratesOnTop);
  return cratesOnTop;
};
exports.part2 = part2;
var run = function (pathToFile) {
  console.log('Day 5:');
  (0, exports.part1)(pathToFile);
  (0, exports.part2)(pathToFile);
};
exports['default'] = run;
