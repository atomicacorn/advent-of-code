// https://adventofcode.com/2023/day/1
import path from 'path';
import { readInFile } from 'utils';

export const numbersAsText = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

export const convertNumbersFromText = (number: number | string): number => {
  const castToNumber = Number(number);
  if (isNaN(castToNumber)) {
    return numbersAsText.indexOf(number as string);
  }
  return castToNumber;
};

export const extractNumbers = (calibrationValue: string): number[] => {
  return calibrationValue.replace(/\D+/g, '').split('') as unknown as number[];
};

export const extractNumbersAndText = (calibrationValue: string): string[] => {
  const pattern = `(?=([0-9]|${numbersAsText.join('|')}))`; // (?=([0-9]|zero|one|two|three|four|five|six|seven|eight|nine))
  const regex = new RegExp(`${pattern}`, 'g');
  const matches = [...calibrationValue.matchAll(regex)];
  return matches.map((match) => match[1]);
};

const getCalibrationValues = (pathToFile: string): number[] => {
  let rawCalibrationEntries: string[] = [];
  const calibrationDigits: number[] = [];
  try {
    const rawInput = readInFile(path.resolve(__dirname, pathToFile));
    if (rawInput) {
      rawCalibrationEntries = rawInput.toString().split('\n'); // every calorie entry
    }
  } catch (e) {
    console.error(`There was a problem reading the input file for day 1`, e);
  }
  rawCalibrationEntries.forEach((calibrationEntry) => {
    const numbers = extractNumbers(calibrationEntry);
    const doubleDigit = parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`);
    if (!isNaN(doubleDigit)) {
      calibrationDigits.push(doubleDigit);
    }
  });
  return calibrationDigits;
};

const getCalibrationValues2 = (pathToFile: string): number[] => {
  let rawCalibrationEntries: string[] = [];
  const calibrationDigits: number[] = [];
  try {
    const rawInput = readInFile(path.resolve(__dirname, pathToFile));
    if (rawInput) {
      rawCalibrationEntries = rawInput.toString().split('\n'); // every calorie entry
    }
  } catch (e) {
    console.error(`There was a problem reading the input file for day 1`, e);
  }
  rawCalibrationEntries.forEach((calibrationEntry) => {
    const numbers = extractNumbersAndText(calibrationEntry).map((number) =>
      convertNumbersFromText(number)
    );
    const doubleDigit = parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`);
    if (!isNaN(doubleDigit)) {
      calibrationDigits.push(doubleDigit);
    }
  });
  return calibrationDigits;
};

// Using the calibration document, decode and add the first and last digit in the sequence to form a two-digit number
// What is the sum of all the calibration values?
export const part1 = (pathToFile: string): number => {
  const calibrationValues = getCalibrationValues(pathToFile);
  const sumOfCalibrationDigits = calibrationValues.reduce((acc, current) => {
    return acc + current;
  }, 0);
  console.log('The sum of the calibration digits is', sumOfCalibrationDigits);
  return sumOfCalibrationDigits;
};

// It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits"
// What is the sum of all the calibration values WITH spelled out digits?
export const part2 = (pathToFile: string): number => {
  const calibrationValues = getCalibrationValues2(pathToFile);
  // console.log('calibrationValues', calibrationValues);
  // console.log('calibrationValues', calibrationValues.length);
  console.dir(calibrationValues, { maxArrayLength: null });
  const sumOfCalibrationDigits = calibrationValues.reduce((acc, current) => {
    return acc + current;
  }, 0);
  console.log(
    'The sum of the calibration digits (inc spelled out) is',
    sumOfCalibrationDigits
  );
  return sumOfCalibrationDigits;
};

const run = (pathToFile: string) => {
  console.log('Day 1:');
  part1(pathToFile);
  part2(pathToFile);
};

export default run;
