// https://adventofcode.com/2023/day/2
import { getPuzzleInput } from 'utils';

const maxRedCubes = 12;
const maxGreenCubes = 13;
const maxBlueCubes = 14;

enum CubeColors {
  red = 'red',
  green = 'green',
  blue = 'blue',
}

type GameResult = {
  [CubeColors.red]: number;
  [CubeColors.green]: number;
  [CubeColors.blue]: number;
};

// Takes "10 green, 5 blue, 11 red"
const getGameResult = (game: string): GameResult => {
  const gameResult: GameResult = {
    [CubeColors.red]: 0,
    [CubeColors.green]: 0,
    [CubeColors.blue]: 0,
  };

  const gameData = game.split(','); // e.g. ["10 green", " 5 red", " 11 blue"]
  gameData.forEach((cube) => {
    const [number, colour] = cube.trim().split(' ');
    gameResult[colour as keyof GameResult] = Number(number);
  });

  return gameResult;
};

const isGamePossible = (gameData: GameResult): boolean => {
  return (
    gameData.red <= maxRedCubes &&
    gameData.green <= maxGreenCubes &&
    gameData.blue <= maxBlueCubes
  );
};

const getValidGameIDs = (pathToFile: string): number[] => {
  const gameData: string[] = getPuzzleInput(pathToFile);
  const possibleGameIDs: number[] = [];

  gameData.forEach((gameByID) => {
    if (gameByID) {
      const [gameName, gameResults] = gameByID.split(':'); // ["Game 1", "10 green, 5 blue, 11 red; 5 blue, 6 green"]
      const gameID = Number(gameName.split(' ')[1]);
      const games = gameResults.split(';'); // ["10 green, 5 blue, 11 red", " 5 blue, 6 green"]
      let gameIsPossible = true;

      for (let i = 0; i < games.length; i++) {
        const game = games[i]; // "10 green, 5 blue, 11 red"
        const gameObject = getGameResult(game);
        gameIsPossible = isGamePossible(gameObject);
        if (!gameIsPossible) break;
      }

      if (gameIsPossible && !isNaN(gameID)) {
        possibleGameIDs.push(gameID);
      }
    }
  });
  return possibleGameIDs;
};

const getFewestCubesMultiplied = (pathToFile: string): number[] => {
  const gameData: string[] = getPuzzleInput(pathToFile);
  const multipliedFewestCubes: number[] = [];

  gameData.forEach((gameByID) => {
    if (gameByID) {
      const [, gameResults] = gameByID.split(':'); // ["Game 1", "10 green, 5 blue, 11 red; 5 blue, 6 green"]
      const games = gameResults.split(';'); // ["10 green, 5 blue, 11 red", " 5 blue, 6 green"]
      const maxCubesInAGame: GameResult = {
        [CubeColors.red]: 0,
        [CubeColors.green]: 0,
        [CubeColors.blue]: 0,
      };

      for (let i = 0; i < games.length; i++) {
        const game = games[i]; // "10 green, 5 blue, 11 red"
        const gameObject = getGameResult(game);
        for (const cubeColor in CubeColors) {
          maxCubesInAGame[cubeColor as keyof typeof CubeColors] = Math.max(
            maxCubesInAGame[cubeColor as keyof typeof CubeColors],
            gameObject[cubeColor as keyof typeof CubeColors]
          );
        }
      }
      multipliedFewestCubes.push(
        maxCubesInAGame.red * maxCubesInAGame.green * maxCubesInAGame.blue
      );
    }
  });
  return multipliedFewestCubes;
};

// Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes.
// What is the sum of the IDs of those games?
export const part1 = (pathToFile: string): number => {
  const gameIDs = getValidGameIDs(pathToFile);
  const sumOfGameIDs = gameIDs.reduce((acc, current) => {
    return acc + current;
  }, 0);
  console.log('The sum of the IDs of the games is', sumOfGameIDs);
  return sumOfGameIDs;
};

// For each game, find the minimum set of cubes that must have been present.
// What is the sum of the power of these sets?
export const part2 = (pathToFile: string): number => {
  const gameIDs = getFewestCubesMultiplied(pathToFile);
  const sumOfGameIDs = gameIDs.reduce((acc, current) => {
    return acc + current;
  }, 0);
  console.log(
    'The sum of the power of the fewest cubes in each game is',
    sumOfGameIDs
  );
  return sumOfGameIDs;
};

const run = (pathToFile: string) => {
  console.log('Day 2:');
  part1(pathToFile);
  part2(pathToFile);
};

export default run;
