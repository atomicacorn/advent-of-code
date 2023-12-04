import path from 'path';
import readInFile from './readInFile';

const getPuzzleInput = (pathToFile: string): string[] => {
  let puzzleInput: string[] = [];
  try {
    const rawInput = readInFile(path.resolve(__dirname, pathToFile));
    if (rawInput) {
      puzzleInput = rawInput.toString().split('\n');
    }
  } catch (e) {
    console.error(
      `There was a problem reading the input file for ${pathToFile}`,
      e
    );
  }

  return puzzleInput;
};

export default getPuzzleInput;
