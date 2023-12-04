// https://adventofcode.com/2023/day/3
import { getPuzzleInput } from 'utils';

const hasAdjacentSymbol = (
  partialEngineMap: string[][],
  startIndex: number,
  endIndex: number
): boolean => {
  let isAdjacentToASymbol = false;
  const isValidSymbol = new RegExp(/[^.[0-9]]*/); // matches any characters except ".", digits and ignores whitespace chars

  partialEngineMap.forEach((partialEngineMapRow) => {
    for (let i = startIndex - 1; i <= endIndex + 1; i++) {
      // make sure we don't select outside of the engine boundaries
      if (i >= 0 && i <= partialEngineMapRow.length) {
        const anAdjacentSquare = partialEngineMapRow[i];
        if (anAdjacentSquare && isValidSymbol.test(anAdjacentSquare)) {
          isAdjacentToASymbol = true;
          break;
        }
      }
    }
  });
  return isAdjacentToASymbol;
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

const getValidEngineParts = (pathToFile: string): number[] => {
  const engineData: string[] = getPuzzleInput(pathToFile);
  const validEngineParts: number[] = [];

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
        const isValid = hasAdjacentSymbol(
          partialEngineMap,
          startIndex,
          endIndex
        );
        isValid && validEngineParts.push(fullNumber);

        i = endIndex;
        endIndex = null;
        startIndex = null;
        fullNumber = null;
      }
    }
  });

  return validEngineParts;
};

// any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)
// What is the sum of all of the part numbers in the engine schematic?
export const part1 = (pathToFile: string): number => {
  const engineParts = getValidEngineParts(pathToFile);
  const sumOfEngineParts = engineParts.reduce((acc, current) => {
    return acc + current;
  }, 0);
  console.log('The sum of the valid engine parts is', sumOfEngineParts);
  return sumOfEngineParts;
};

const run = (pathToFile: string) => {
  console.log('Day 3:');
  part1(pathToFile);
};

export default run;
