import path from 'path';
import { part1 } from './index';

const pathToFile = path.resolve(__dirname, `./test.txt`);

describe('Seventh day solutions using test input', () => {
  it('should be correct for part 1', () => {
    const result = part1(pathToFile);
    expect(result).toBe(95437);
  });
});
