import path from 'path';
import { part1, part2 } from './index';

const pathToFile = path.resolve(__dirname, './test.txt');

describe('Fifth day solutions using test input', () => {
  it('should be correct for part 1', () => {
    const result = part1(pathToFile);
    expect(result).toBe(35);
  });
  it('should be correct for part 2', () => {
    const result = part2(pathToFile);
    expect(result).toBe(46);
  });
});
