import path from 'path';
import * as advent2022 from './days';

var daysToRun = process.argv.slice(2);
const filename = 'input.txt';

const getFilename = (day: number): string => {
  return path.resolve(__dirname, `days/${day}/${filename}`);
};

const day1 = () => advent2022.day1(getFilename(1));
const day2 = () => advent2022.day2(getFilename(2));
const day3 = () => advent2022.day3(getFilename(3));
const day4 = () => advent2022.day4(getFilename(4));
const day5 = () => advent2022.day5(getFilename(5));
const day6 = () => advent2022.day6(getFilename(6));
const day7 = () => advent2022.day7(getFilename(7));

if (daysToRun.length > 0) {
  daysToRun.forEach((cliArg) => {
    switch (cliArg) {
      case '1':
        day1();
        break;
      case '2':
        day2();
        break;
      case '3':
        day3();
        break;
      case '4':
        day4();
        break;
      case '5':
        day5();
        break;
      case '6':
        day6();
        break;
      case '7':
        day7();
        break;
      default:
        console.log(`Unsupported argument '${cliArg}'`);
        break;
    }
  });
} else {
  console.log('Running all available Advent of Code solutions');
  day1();
  day2();
  day3();
  day4();
  day5();
  day6();
  day7();
}
