// https://adventofcode.com/2022/day/5
import { getEntries } from 'utils';

export const splitMovesCrates = (
  pathToFile: string
): { moves: string[]; crateRows: string[] } => {
  const entries = getEntries(pathToFile);
  const moves: string[] = [];
  const crateRows: string[] = [];
  entries.forEach((entry) => {
    if (entry) {
      entry.includes('move') ? moves.push(entry) : crateRows.push(entry);
    }
  });
  return { moves, crateRows };
};

export const sortCrates = (crateRows: string[]): string[] => {
  const crateStacks: string[] = [];
  for (let i = 0; i < crateRows.length; i++) {
    const crateRow = crateRows[i];
    const crates = crateRow.match(/.{1,4}/g);
    if (crates) {
      for (let j = 0; j < crates.length; j++) {
        const crate = crates[j];
        const crateValue = crate.split('')[1].trim(); // 0 is always a whitespace
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

const moveCrates = (
  initialCrates: string[],
  moves: string[],
  retainOrder = false
): string[] => {
  for (let i = 0; i < moves.length; i++) {
    const move = moves[i].split(' ');
    const indexToMoveTo = (move[5] as unknown as number) - 1;
    const indexToMoveFrom = (move[3] as unknown as number) - 1;
    const count = move[1] as unknown as number;
    const orderedCrates = retainOrder
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

const getCratesOnTop = (crateStacks: string[]): string[] => {
  return crateStacks.map((crates) => crates.slice(0, 1));
};

// After the rearrangement procedure completes, what crate ends up on top of each stack?
export const part1 = (pathToFile: string): string => {
  const { moves, crateRows } = splitMovesCrates(pathToFile);
  const crates = sortCrates(crateRows);
  const movedCrates = moveCrates(crates, moves);
  const cratesOnTop = getCratesOnTop(movedCrates).join('');
  console.log('The crates on top of each stack are', cratesOnTop);
  return cratesOnTop;
};

// After the rearrangement procedure completes, what crate ends up on top of each stack?
// Maintain crate order
export const part2 = (pathToFile: string): string => {
  const { moves, crateRows } = splitMovesCrates(pathToFile);
  const crates = sortCrates(crateRows);
  const movedCrates = moveCrates(crates, moves, true); // move crates maintaining order
  const cratesOnTop = getCratesOnTop(movedCrates).join('');
  console.log('The crates on top of each stack are', cratesOnTop);
  return cratesOnTop;
};

const run = (pathToFile: string) => {
  console.log('Day 5:');
  part1(pathToFile);
  part2(pathToFile);
};

export default run;
