// https://adventofcode.com/2022/day/3
import { getEntries } from 'utils';

export const charPriority = (char: string): number => {
  const asciiValue = char.charCodeAt(0);
  // convert ascii -> a = 1, ... z = 26, A = 27 ... Z = 52
  return char === char.toUpperCase() ? asciiValue - 38 : asciiValue - 96;
};

const divideIntoCompartments = (items: string): string[] => {
  const half = Math.ceil(items.length / 2);

  const firstHalf = items.slice(0, half);
  const secondHalf = items.slice(half);
  return [firstHalf, secondHalf];
};

// What would your total score be if everything goes exactly according to your strategy guide?
export const part1 = (pathToFile: string): number => {
  const items = getEntries(pathToFile);
  const duplicates: string[] = [];
  items.forEach((allItems) => {
    const [firstItem, secondItem] = divideIntoCompartments(allItems);
    for (let i = 0; i < firstItem.length; i++) {
      const char1 = firstItem[i];
      if (secondItem.includes(char1)) {
        duplicates.push(char1);
        break;
      }
    }
  });
  const prioritySum = duplicates.reduce((acc, current) => {
    return acc + charPriority(current);
  }, 0);
  console.log(
    'The sum of the priorities of the duplicate items is',
    prioritySum
  );
  return prioritySum;
};

// Find the item type that corresponds to the badges of each three-Elf group. What is the sum of the priorities of those item types?
export const part2 = (pathToFile: string): number => {
  const items = getEntries(pathToFile);
  const duplicates: string[] = [];
  // 3 elves per group
  for (let i = 0; i < items.length; i += 3) {
    const firstItem = items[i];
    const secondItem = items[i + 1];
    const thirdItem = items[i + 2];
    for (let i = 0; i < firstItem.length; i++) {
      const char1 = firstItem[i];
      if (secondItem.includes(char1) && thirdItem.includes(char1)) {
        duplicates.push(char1);
        break;
      }
    }
  }
  const prioritySum = duplicates.reduce((acc, current) => {
    return acc + charPriority(current);
  }, 0);
  console.log(
    'The sum of the priorities of the three elf group badges is',
    prioritySum
  );
  return prioritySum;
};

const run = (pathToFile: string) => {
  console.log('Day 3:');
  part1(pathToFile);
  part2(pathToFile);
};

export default run;
