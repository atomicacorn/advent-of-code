import path from 'path';
import { part1, part2 } from './index';

const pathToFile = path.resolve(__dirname, `./test.txt`);

describe('Sixth day solutions using test input', () => {
  it('should be correct for part 1', () => {
    const result = part1(pathToFile);
    expect(result).toEqual([7, 5, 6, 10, 11]);
  });
  it('should be correct for part 2', () => {
    const result = part2(pathToFile);
    expect(result).toEqual([19, 23, 23, 29, 26]);
  });
});
