// https://adventofcode.com/2023/day/4
import { getPuzzleInput } from 'utils';

const getCardPoints = (timesWon: number): number => {
  let points;
  if (timesWon <= 2) {
    points = timesWon;
  } else {
    points = 2 ** (timesWon - 1);
  }
  return points;
};

const howManyTimesWon = (
  winningNumbers: string[],
  actualNumbers: string[]
): number => {
  const result = actualNumbers.filter(
    (actualNumber) =>
      actualNumber &&
      !isNaN(Number(actualNumber)) &&
      winningNumbers.includes(actualNumber)
  );
  return result.length;
};

const getScratchCardPoints = (pathToFile: string): number[] => {
  const cardData: string[] = getPuzzleInput(pathToFile);
  const allWinningCardPoints: number[] = [];

  cardData.forEach((scratchCard) => {
    if (scratchCard) {
      const [, cardValues] = scratchCard.split(':'); // ["Game 1", "10 green, 5 blue, 11 red; 5 blue, 6 green"]
      const [winningNumbersRaw, actualNumbersRaw] = cardValues.split('|'); // ["Game 1", "10 green, 5 blue, 11 red; 5 blue, 6 green"]
      const winningNumbers = winningNumbersRaw.trim().split(' ');
      const actualNumbers = actualNumbersRaw.trim().split(' ');
      const timesWon = howManyTimesWon(winningNumbers, actualNumbers);
      const points = getCardPoints(timesWon);
      allWinningCardPoints.push(points);
    }
  });

  return allWinningCardPoints;
};

const getNumberOfWonScratchCards = (pathToFile: string): number[] => {
  const rawCardData: string[] = getPuzzleInput(pathToFile);
  const totalScratchCardsByNumber: number[] = [];
  const cardData = rawCardData.filter((row) => row); // remove the empty rows

  cardData.forEach((card, index) => {
    totalScratchCardsByNumber[index] =
      (totalScratchCardsByNumber[index] || 0) + 1;
    const [, cardValues] = card.split(':'); // ["Game 1", "10 green, 5 blue, 11 red; 5 blue, 6 green"]
    const [winningNumbersRaw, actualNumbersRaw] = cardValues.split('|'); // ["Game 1", "10 green, 5 blue, 11 red; 5 blue, 6 green"]
    const winningNumbers = winningNumbersRaw.trim().split(' ');
    const actualNumbers = actualNumbersRaw.trim().split(' ');
    const timesWon = howManyTimesWon(winningNumbers, actualNumbers);
    for (let i = index + 1; i < index + timesWon + 1; i++) {
      totalScratchCardsByNumber[i] =
        (totalScratchCardsByNumber[i] || 0) +
        1 * totalScratchCardsByNumber[index];
    }
  });
  return totalScratchCardsByNumber;
};

// Any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)
// How many points are they worth in total?
export const part1 = (pathToFile: string): number => {
  const scratchCardPoints = getScratchCardPoints(pathToFile);
  const sumOfScratchCardPoints = scratchCardPoints.reduce((acc, current) => {
    return acc + current;
  }, 0);
  console.log(
    'The sum of the winning scratch card points is',
    sumOfScratchCardPoints
  );
  return sumOfScratchCardPoints;
};

// There's no such thing as "points". Instead, scratchcards only cause you to win more scratchcards equal to the number of winning numbers you have.
// Process all of the original and copied scratchcards until no more scratchcards are won.
// Including the original set of scratchcards, how many total scratchcards do you end up with?
export const part2 = (pathToFile: string): number => {
  const wonScratchCards = getNumberOfWonScratchCards(pathToFile);
  const sumOfWonScratchCards = wonScratchCards.reduce((acc, current) => {
    return acc + current;
  }, 0);
  console.log('The total number of scratchcards is', sumOfWonScratchCards);
  return sumOfWonScratchCards;
};

const run = (pathToFile: string) => {
  console.log('Day 4:');
  part1(pathToFile);
  part2(pathToFile);
};

export default run;
