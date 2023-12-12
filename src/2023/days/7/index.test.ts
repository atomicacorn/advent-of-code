import path from 'path';
import { part1, part2 } from './index';

const pathToFile = path.resolve(__dirname, './test.txt');
const pathToFileMatt = path.resolve(__dirname, './test-matt.txt');

describe('Seventh day solutions using test input', () => {
  it('should be correct for part 1', () => {
    const result = part1(pathToFile);
    expect(result).toBe(6440);
  });

  it('should be correct for part 2', () => {
    const result = part2(pathToFile);
    expect(result).toBe(5905);
  });

  it('should be correct for part 1', () => {
    const result = part1(pathToFileMatt);
    expect(result).toBe(248750248);
  });

  it('should be correct for part 2', () => {
    const result = part2(pathToFileMatt);
    expect(result).toBe(249390788);
  });
});
