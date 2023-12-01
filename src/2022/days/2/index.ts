// https://adventofcode.com/2022/day/2
import { getEntries, getKeyByValue } from 'utils';

// opponent
// A / X = rock
// B / Y = paper
// C / Z = scissors
enum Opponent {
  A = 'A',
  B = 'B',
  C = 'C',
}

enum Player {
  X = 'X',
  Y = 'Y',
  Z = 'Z',
}

enum Result {
  X = 'X',
  Y = 'Y',
  Z = 'Z',
}

const drawResult = {
  [Player.X]: Opponent.A,
  [Player.Y]: Opponent.B,
  [Player.Z]: Opponent.C,
};

const winResult = {
  [Player.X]: Opponent.C,
  [Player.Y]: Opponent.A,
  [Player.Z]: Opponent.B,
};

const loseResult = {
  [Player.X]: Opponent.B,
  [Player.Y]: Opponent.C,
  [Player.Z]: Opponent.A,
};

const shapeScore = {
  [Player.X]: 1,
  [Player.Y]: 2,
  [Player.Z]: 3,
};

const playerHandResult = {
  [Result.X]: false, // lose
  [Result.Y]: null, // draw
  [Result.Z]: true, // win
};

const winScore = (result: boolean | null): number => {
  if (result == null) return 3;
  return result ? 6 : 0;
};

const doesPlayerWin = (opponent: Opponent, player: Player): boolean | null => {
  if (drawResult[player] === opponent) return null;
  return winResult[player] === opponent;
};

// for part 2 only, how player should end the round
// X = lose
// Y = draw
// Z = win
const getPlayersHand = (opponent: Opponent, result: Result): Player => {
  switch (result) {
    case Result.X:
      // LOSE
      return getKeyByValue<Opponent>(loseResult, opponent) as Player;
    case Result.Y:
      // DRAW
      return getKeyByValue<Opponent>(drawResult, opponent) as Player;
    case Result.Z:
      // WIN
      return getKeyByValue<Opponent>(winResult, opponent) as Player;
  }
};

// What would your total score be if everything goes exactly according to your strategy guide?
export const part1 = (pathToFile: string): number => {
  const games = getEntries(pathToFile);
  const playerTotalScore = games
    .filter((game) => game)
    .map((game) => {
      const [opponent, player] = game.split(' ');
      const playerScore = winScore(
        doesPlayerWin(Opponent[opponent as Opponent], player as Player)
      );
      return playerScore + shapeScore[player as Player];
    })
    .reduce((acc, current) => acc + current);
  console.log('The player scores a total of', playerTotalScore);
  return playerTotalScore;
};

// Following the Elf's instructions for the second column, what would your total score be if everything goes exactly according to your strategy guide?
export const part2 = (pathToFile: string): number => {
  const games = getEntries(pathToFile);
  const playerTotalScore = games
    .filter((game) => game)
    .map((game) => {
      const [opponent, result] = game.split(' ');
      const playerHand = getPlayersHand(opponent as Opponent, result as Result);
      const playerScore = winScore(playerHandResult[result as Result]);
      return playerScore + shapeScore[playerHand as Player];
    })
    .reduce((acc, current) => acc + current);
  console.log(
    "The player using the elf's strategy got a total of",
    playerTotalScore
  );
  return playerTotalScore;
};

const run = (pathToFile: string) => {
  console.log('Day 2:');
  part1(pathToFile);
  part2(pathToFile);
};

export default run;
