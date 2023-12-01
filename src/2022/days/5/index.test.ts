import path from 'path';
import { splitMovesCrates, sortCrates, part1, part2 } from './index';

const pathToFile = path.resolve(__dirname, `./test.txt`);

describe('Fifth day solutions using test input', () => {
  it('should be correct for part 1', () => {
    const result = part1(pathToFile);
    expect(result).toBe('CMZ');
  });
  it('should be correct for part 2', () => {
    const result = part2(pathToFile);
    expect(result).toBe('MCD');
  });
});

describe('Util tests', () => {
  describe('splitMovesCrates', () => {
    it('should divide up the crate rows and move rows into two separate arrays', () => {
      const { moves, crateRows } = splitMovesCrates(pathToFile);
      expect(moves).toEqual([
        'move 1 from 2 to 1',
        'move 3 from 1 to 3',
        'move 2 from 2 to 1',
        'move 1 from 1 to 2',
      ]);
      expect(crateRows).toEqual([
        '    [D]',
        '[N] [C]',
        '[Z] [M] [P]',
        ' 1   2   3',
      ]);
    });
  });
  describe('sortCrates', () => {
    it('should sort the crates into a single dimension string array each string ordered with the top crate on the left', () => {
      const crates = sortCrates([
        '    [D]',
        '[N] [C]',
        '[Z] [M] [P]',
        ' 1   2   3',
      ]);
      expect(crates).toEqual(['NZ', 'DCM', 'P']);
    });
  });
});
