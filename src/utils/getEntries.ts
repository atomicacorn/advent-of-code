import path from 'path';
import readInFile from './readInFile';

const getEntries = (pathToFile: string): string[] => {
  let entries: string[] = [];
  try {
    const path = require('path');
    const rawInput = readInFile(path.resolve(__dirname, pathToFile));
    if (rawInput) {
      entries = rawInput.toString().split('\n');
    }
  } catch (e) {
    console.error(
      `There was a problem reading the input file ${pathToFile}`,
      e
    );
  }
  entries.pop(); // remove the empty entry at the end from new line
  return entries;
};

export default getEntries;
