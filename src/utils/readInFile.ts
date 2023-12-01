import fs from 'fs';

const readInFile = (
  pathToFile: string
): string | NodeJS.ErrnoException | null => {
  return fs.readFileSync(pathToFile, 'utf8');
};

export default readInFile;
