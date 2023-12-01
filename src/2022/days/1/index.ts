// https://adventofcode.com/2022/day/1
import path from 'path';
import { readInFile } from 'utils';

const getElves = (pathToFile: string): number[] => {
  let calorieEntries: string[] = []; // will hold original
  const elvesArray: number[] = []; // initialise with empty array

  try {
    const rawInput = readInFile(path.resolve(__dirname, pathToFile));
    if (rawInput) {
      calorieEntries = rawInput.toString().split('\n'); // every calorie entry
    }
  } catch (e) {
    console.error(`There was a problem reading the input file for day 1`, e);
  }
  calorieEntries.forEach((calorieEntry) => {
    const elf = elvesArray[elvesArray.length - 1];
    // initialise elf array
    if (elf == undefined) elvesArray.push(0);
    if (calorieEntry) {
      return (elvesArray[elvesArray.length - 1] =
        elvesArray[elvesArray.length - 1] + parseFloat(calorieEntry));
    }
    // record the elf's calories to it's entry
    return elvesArray.push(0);
  });
  return elvesArray;
};

// Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?
export const part1 = (pathToFile: string): number => {
  const elvesByCalories = getElves(pathToFile);
  const maxCalories = elvesByCalories.reduce((acc, current) => {
    return Math.max(acc, current);
  });
  console.log('The most calories carried by one elf is', maxCalories);
  return maxCalories;
};

// Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?
export const part2 = (pathToFile: string): number => {
  const elvesByCalories = getElves(pathToFile);
  const sortedMaxCalories = elvesByCalories.sort((a, b) => b - a);
  const result =
    sortedMaxCalories[0] + sortedMaxCalories[1] + sortedMaxCalories[2];
  console.log('The total calories carried by the three "top" elves is', result);
  return result;
};

const run = (pathToFile: string) => {
  console.log('Day 1:');
  part1(pathToFile);
  part2(pathToFile);
};

export default run;
