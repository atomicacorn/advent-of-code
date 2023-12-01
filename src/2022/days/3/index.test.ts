import { part1, part2, charPriority } from './index';
import path from 'path';

const pathToFile = path.resolve(__dirname, `./test.txt`);

describe('Third day solutions using test input', () => {
  it('should be correct for part 1', () => {
    const result = part1(pathToFile);
    expect(result).toBe(157);
  });
  it('should be correct for part 2', () => {
    const result = part2(pathToFile);
    expect(result).toBe(70);
  });
});

describe('Util tests', () => {
  describe('charPriority', () => {
    it('should return the correct priorities for lowercase a', () => {
      const result = charPriority('a');
      expect(result).toBe(1);
    });
    it('should return the correct priorities for lowercase z', () => {
      const result = charPriority('z');
      expect(result).toBe(26);
    });
    it('should return the correct priorities for uppercase A', () => {
      const result = charPriority('A');
      expect(result).toBe(27);
    });
    it('should return the correct priorities for uppercase Z', () => {
      const result = charPriority('Z');
      expect(result).toBe(52);
    });
  });
});
