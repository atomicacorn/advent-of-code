import path from 'path';
import {
  convertNumbersFromText,
  extractNumbers,
  extractNumbersAndText,
  part1,
  part2,
  numbersAsText,
} from './index';

const pathToFile = path.resolve(__dirname, `./test.txt`);
const pathToFile2 = path.resolve(__dirname, `./test2.txt`);

describe('First day solutions using test input', () => {
  it('should be correct for part 1', () => {
    const result = part1(pathToFile);
    expect(result).toBe(142);
  });

  it('should be correct for part 2', () => {
    const result = part2(pathToFile2);
    expect(result).toBe(281);
  });
});

describe('extractNumbers', () => {
  it('should extract both digits 0 - 9 from a string', () => {
    const result = extractNumbers('onecs2kja3mdthree');
    expect(result).toEqual(['2', '3']);
  });
});

describe('extractNumbersAndText', () => {
  it('should extract both digits 0 - 9 and "zero" - "nine" from a string', () => {
    const result = extractNumbersAndText('onecs2kja3mdthree');
    expect(result).toEqual(['one', '2', '3', 'three']);
  });

  it('should extract both digits 0 - 9 and "zero" - "nine" from a string', () => {
    const result = extractNumbersAndText('nineighthree');
    console.log('result', result);
    expect(result).toStrictEqual(['9', '8', '3']);
  });
});

describe('convertNumbersFromText', () => {
  it('should convert zero - nine correctly', () => {
    numbersAsText.forEach((number, index) => {
      expect(convertNumbersFromText(number)).toEqual(index);
    });
  });

  it('should not convert 0 - 9 correctly', () => {
    for (let i = 0; i < 9; i++) {
      expect(convertNumbersFromText(i)).toEqual(i);
    }
  });
});
