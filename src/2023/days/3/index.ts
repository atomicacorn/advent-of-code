// https://adventofcode.com/2023/day/3
import { getPuzzleInput } from 'utils';

const hasAdjacentSymbol = (
  partialEngineMap: string[][],
  engineRowIndex: number,
  startIndex: number,
  endIndex: number
): [isAdjacentToASymbol: boolean, gearCoordinate: string | null] => {
  let isAdjacentToASymbol = false;
  let gearCoordinate = null;

  const isValidSymbol = new RegExp(/[^.[0-9]]*/); // matches any characters except ".", digits and ignores whitespace chars

  partialEngineMap.forEach((partialEngineMapRow, rowIndex) => {
    for (let i = startIndex - 1; i <= endIndex + 1; i++) {
      // make sure we don't select outside of the engine boundaries
      if (i >= 0 && i <= partialEngineMapRow.length) {
        const anAdjacentSquare = partialEngineMapRow[i];
        if (anAdjacentSquare && isValidSymbol.test(anAdjacentSquare)) {
          if (partialEngineMap.length === 2 && rowIndex === 1) {
            gearCoordinate = `${engineRowIndex + rowIndex},${i}`;
          } else {
            gearCoordinate = `${engineRowIndex + rowIndex - 1},${i}`;
          }
          isAdjacentToASymbol = true;
          break;
        }
      }
    }
  });
  return [isAdjacentToASymbol, gearCoordinate];
};

const getEnginePartEndIndex = (
  engineRow: string[],
  startIndex: number
): [endIndex: number | null, fullNumber: number | null] => {
  let endIndex: number = startIndex;
  let fullNumber = String(engineRow[startIndex]);

  for (let i = startIndex + 1; i < engineRow.length; i++) {
    const partialEngineRowPart = engineRow[i];
    if (partialEngineRowPart && isNaN(Number(partialEngineRowPart))) {
      endIndex = i - 1;
      break;
    } else {
      endIndex = i;
      fullNumber += String(engineRow[i]);
    }
  }

  return [endIndex, Number(fullNumber)];
};

const getValidEngineParts = (
  pathToFile: string
): [number[], Map<string, number[]>] => {
  const engineData: string[] = getPuzzleInput(pathToFile);
  const validEngineParts: number[] = [];

  const engineToGearCoordinateMap: Map<string, number[]> = new Map();

  const engineMap = engineData.map(
    (engineDataLine) => engineDataLine && engineDataLine.split('')
  );

  engineMap.forEach((engineRow, engineRowIndex) => {
    if (engineRow === null) {
      return;
    }

    let startIndex: number | null = null;
    let endIndex: number | null = null;
    let fullNumber: number | null = null;
    for (let i = 0; i < engineRow.length; i++) {
      // check if we need to reset
      if (endIndex !== null) {
        // skip the remainder of the full number
        if (i < endIndex) {
          continue;
        }

        if (i === endIndex) {
          // reset the marker indices
          startIndex = null;
          endIndex = null;
          fullNumber = null;
          continue;
        }

        // handle edge cases e.g. endIndex = 0
        if (i > endIndex) {
          // reset the marker indices
          startIndex = null;
          endIndex = null;
          fullNumber = null;
        }
      }

      const partialEngineRowPart = engineRow[i];
      if (
        partialEngineRowPart &&
        startIndex == null &&
        !isNaN(Number(partialEngineRowPart)) &&
        engineRow
      ) {
        startIndex = i;
        [endIndex, fullNumber] = getEnginePartEndIndex(engineRow, startIndex);
      }

      const partialEngineMap: string[][] = [];

      if (engineRowIndex - 1 >= 0) {
        const firstRow = engineMap[engineRowIndex - 1];
        firstRow && partialEngineMap.push(firstRow);
      }

      const middleRow = engineMap[engineRowIndex];
      middleRow && partialEngineMap.push(middleRow);

      if (engineRowIndex + 1 <= engineRow.length) {
        const endRow = engineMap[engineRowIndex + 1];
        endRow && partialEngineMap.push(endRow);
      }

      if (startIndex !== null && endIndex !== null && fullNumber !== null) {
        const [isValid, gearCoordinate] = hasAdjacentSymbol(
          partialEngineMap,
          engineRowIndex,
          startIndex,
          endIndex
        );
        if (isValid && gearCoordinate) {
          // part1
          validEngineParts.push(fullNumber);
          // part2
          const existingCoordValues =
            engineToGearCoordinateMap.get(gearCoordinate);
          if (existingCoordValues && existingCoordValues.length > 0) {
            // add to the existing key
            engineToGearCoordinateMap.set(gearCoordinate, [
              ...existingCoordValues,
              fullNumber,
            ]);
          } else {
            // add new key
            engineToGearCoordinateMap.set(gearCoordinate, [fullNumber]);
          }
        }

        i = endIndex;
        endIndex = null;
        startIndex = null;
        fullNumber = null;
      }
    }
  });

  return [validEngineParts, engineToGearCoordinateMap];
};

// Any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)
// What is the sum of all of the part numbers in the engine schematic?
export const part1 = (pathToFile: string): number => {
  const [engineParts] = getValidEngineParts(pathToFile);
  const sumOfEngineParts = engineParts.reduce((acc, current) => {
    return acc + current;
  }, 0);
  console.log('The sum of the valid engine parts is', sumOfEngineParts);
  return sumOfEngineParts;
};

// A gear is any * symbol that is adjacent to exactly two part numbers.
// Its gear ratio is the result of multiplying those two numbers together.
// What is the sum of all of the gear ratios in your engine schematic?
export const part2 = (pathToFile: string): number => {
  const [, gearCoordinatesMap] = getValidEngineParts(pathToFile);
  let sumOfEngineParts = 0;
  for (const gearCoordinatesMapElement of gearCoordinatesMap.values()) {
    if (gearCoordinatesMapElement.length === 2) {
      sumOfEngineParts += gearCoordinatesMapElement.reduce((acc, current) => {
        return acc * current;
      }, 1);
    }
  }
  console.log(
    'The sum of the gear ratios with 2 engine parts adjacent is',
    sumOfEngineParts
  );
  return sumOfEngineParts;
};

const run = (pathToFile: string) => {
  console.log('Day 3:');
  part1(pathToFile);
  part2(pathToFile);
};

export default run;
