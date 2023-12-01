// https://adventofcode.com/2022/day/4
import { getEntries } from 'utils';

const isContained = (pairsString: string[]) => {
  const numbers = pairsString.map((x) => parseInt(x));
  for (let i = 0; i < numbers.length; i += 4) {
    if (numbers[i] >= numbers[i + 2] && numbers[i + 1] <= numbers[i + 3])
      return true;
    if (numbers[i + 2] >= numbers[i] && numbers[i + 3] <= numbers[i + 1])
      return true;
  }
};

const isOverlapping = (pairsString: string[]) => {
  const numbers = pairsString.map((x) => parseInt(x));
  for (let i = 0; i < numbers.length; i += 4) {
    if (
      (numbers[i] >= numbers[i + 2] && numbers[i] <= numbers[i + 3]) ||
      (numbers[i + 1] >= numbers[i + 2] && numbers[i + 1] <= numbers[i + 3])
    )
      return true;
    if (
      (numbers[i + 2] >= numbers[i] && numbers[i + 2] <= numbers[i + 1]) ||
      (numbers[i + 3] >= numbers[i] && numbers[i + 3] <= numbers[i + 1])
    )
      return true;
  }
};

// In how many assignment pairs does one range fully contain the other?
export const part1 = (pathToFile: string): number => {
  const pairs = getEntries(pathToFile);
  let overlapCount = 0;
  for (let i = 0; i < pairs.length; i++) {
    const [first, second] = pairs[i].split(',');
    const [first1, first2] = first.split('-');
    const [second1, second2] = second.split('-');
    if (isContained([first1, first2, second1, second2])) {
      overlapCount++;
    }
  }
  console.log(
    'The number of fully overlapping pairs priorities is',
    overlapCount
  );
  return overlapCount;
};

// In how many assignment pairs do the ranges overlap?
export const part2 = (pathToFile: string): number => {
  const pairs = getEntries(pathToFile);
  let overlapCount = 0;
  for (let i = 0; i < pairs.length; i++) {
    const [first, second] = pairs[i].split(',');
    const [first1, first2] = first.split('-');
    const [second1, second2] = second.split('-');
    if (isOverlapping([first1, first2, second1, second2])) {
      overlapCount++;
    }
  }
  console.log(
    'The number of partially overlapping pairs priorities is',
    overlapCount
  );
  return overlapCount;
};

const run = (pathToFile: string) => {
  console.log('Day 4:');
  part1(pathToFile);
  part2(pathToFile);
};

export default run;
