import path from 'path';
import * as advent2022 from './days';

const filename = 'input.txt';

const getInput = (day: string): string => {
  return path.resolve(__dirname, `days/${day}/${filename}`);
};

const runAll = () => {
  advent2022.day1(getInput('1'));
  advent2022.day2(getInput('2'));
};

const runDays = (daysToRun: string[]) => {
  if (daysToRun.length > 0) {
    daysToRun.forEach((day) => {
      advent2022[`day${day}` as keyof typeof advent2022](getInput(day));
    });
  } else {
    console.log('Running all available Advent of Code solutions');
    runAll();
  }
};

export default runDays;
