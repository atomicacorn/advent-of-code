import path from 'path';
import { part1 } from './index';

const pathToFile1 = path.resolve(__dirname, './test1.txt');
const pathToFile2 = path.resolve(__dirname, './test2.txt');
const pathToFile3 = path.resolve(__dirname, './test3.txt');
const pathToFile4 = path.resolve(__dirname, './test4.txt');
const pathToFile5 = path.resolve(__dirname, './test5.txt');

describe('Third day solutions using test input', () => {
  it('should be correct for part 1', () => {
    expect(part1(pathToFile1)).toBe(4361);
    expect(part1(pathToFile2)).toBe(413);
    expect(part1(pathToFile3)).toBe(550934);
    expect(part1(pathToFile4)).toBe(0);
    expect(part1(pathToFile5)).toBe(10657);
  });
});
