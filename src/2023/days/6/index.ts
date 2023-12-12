// https://adventofcode.com/2023/day/6
import { getPuzzleInput } from 'utils';

type Input = { timeData: number[]; distanceData: number[] };

const parseInput = (pathToFile: string): Input => {
  const input: string[] = getPuzzleInput(pathToFile);
  const timeData = input[0]
    .split(':')[1]
    .split(' ')
    .filter((time) => time)
    .map((time) => Number(time));
  const distanceData = input[1]
    .split(':')[1]
    .split(' ')
    .filter((time) => time)
    .map((time) => Number(time));

  return { timeData, distanceData };
};

const parseInput2 = (pathToFile: string): Input => {
  const input: string[] = getPuzzleInput(pathToFile);
  const timeData = input[0].split(':')[1].replaceAll(' ', '');

  const distanceData = input[1].split(':')[1].replaceAll(' ', '');

  return { timeData: [Number(timeData)], distanceData: [Number(distanceData)] };
};

const getDifferentWaysToWinPerRace = ({
  timeData,
  distanceData,
}: Input): number[] => {
  const waysToWinPerRace: number[] = [];

  for (let i = 0; i < timeData.length; i++) {
    const raceLasts = timeData[i];
    const currentDistanceRecord = distanceData[i];
    let waysToWin = 0;
    for (let j = 0; j <= raceLasts; j++) {
      const speedOfBoat = j;
      // disance = speed * time;
      const distanceTravelled = speedOfBoat * (raceLasts - speedOfBoat);
      if (distanceTravelled > currentDistanceRecord) {
        waysToWin++;
      }
    }
    waysToWinPerRace.push(waysToWin);
  }

  return waysToWinPerRace;
};

// Determine the number of ways you could beat the record in each race.
// What do you get if you multiply these numbers together?
export const part1 = (pathToFile: string): number => {
  const { timeData, distanceData } = parseInput(pathToFile);
  const differentWaysToWinPerRace = getDifferentWaysToWinPerRace({
    timeData,
    distanceData,
  });
  const marginOfError = differentWaysToWinPerRace.reduce((acc, current) => {
    return acc * current;
  }, 1);
  console.log('The error margin to win the races is', marginOfError);
  return marginOfError;
};

// How many ways can you beat the record in this one much longer race?
export const part2 = (pathToFile: string): number => {
  const { timeData, distanceData } = parseInput2(pathToFile);
  const differentWaysToWinPerRace = getDifferentWaysToWinPerRace({
    timeData,
    distanceData,
  });
  const marginOfError = differentWaysToWinPerRace.reduce((acc, current) => {
    return acc * current;
  }, 1);
  console.log('The error margin to win the races is', marginOfError);
  return marginOfError;
};

const run = (pathToFile: string) => {
  console.log('Day 6:');
  part1(pathToFile);
  part2(pathToFile);
};

export default run;
