// https://adventofcode.com/2023/day/7
import { getPuzzleInput } from 'utils';

const cardRank = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'J',
  'Q',
  'K',
  'A',
];

const cardRank2 = [
  'J',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'Q',
  'K',
  'A',
];

enum Rank {
  'HighCard',
  'OnePair',
  'TwoPair',
  'ThreeOfAKind',
  'FullHouse',
  'FourOfAKind',
  'FiveOfAKind',
}

const getRankWithWildcard = (cards: string[]): Rank => {
  const rank = Rank.HighCard;
  const counts: Record<string, number> = {};
  for (const card of cards) {
    counts[card] = counts[card] ? counts[card] + 1 : 1;
  }
  const uniqueCards = Object.values(counts);
  const totalUniqueCards = uniqueCards.length;
  const numberOfWildcards = counts['J'];
  if (totalUniqueCards === 1) {
    // can only be Rank.FiveOfAKind
    return Rank.FiveOfAKind;
  } else {
    if (totalUniqueCards === 5) {
      // could be a Rank.HighCard or wildcard Rank.OnePair
      if (numberOfWildcards > 0) {
        return Rank.OnePair;
      }
      return Rank.HighCard;
    } else if (totalUniqueCards === 4) {
      // could be a Rank.OnePair or wildcard Rank.ThreeOfAKind
      if (numberOfWildcards > 0) {
        return Rank.ThreeOfAKind;
      }
      return Rank.OnePair;
    } else if (totalUniqueCards === 2) {
      // can be Rank.FourOfAKind | Rank.FullHouse or
      // wildcard Rank.FiveOfAKind | Rank.FourOfAKind
      if (numberOfWildcards > 0) {
        return Rank.FiveOfAKind;
      }
      for (let i = 0; i < uniqueCards.length; i++) {
        if (uniqueCards[i] === 4 || uniqueCards[i] === 1) {
          return Rank.FourOfAKind;
        } else if (uniqueCards[i] === 3 || uniqueCards[i] === 2) {
          return Rank.FullHouse;
        }
      }
    } else if (totalUniqueCards === 3) {
      // can be Rank.ThreeOfAKind | Rank.TwoPair or
      // wildcard Rank.FourOfAKind | Rank.ThreeOfAKind
      for (let i = 0; i < uniqueCards.length; i++) {
        if (uniqueCards[i] === 3) {
          // it's a three of a kind at minimum
          return numberOfWildcards > 0 ? Rank.FourOfAKind : Rank.ThreeOfAKind;
        }
        if (uniqueCards[i] === 2) {
          // it's a two pair at minimum
          if (numberOfWildcards > 0) {
            return numberOfWildcards === 2 ? Rank.FourOfAKind : Rank.FullHouse;
          } else {
            return Rank.TwoPair;
          }
        }
      }
    }
  }
  return rank;
};

const getRank = (cards: string[]): Rank => {
  const rank = Rank.HighCard;
  const counts: Record<string, number> = {};
  for (const card of cards) {
    counts[card] = counts[card] ? counts[card] + 1 : 1;
  }
  const uniqueCards = Object.values(counts);
  const totalUniqueCards = uniqueCards.length;
  if (totalUniqueCards === 1) {
    // can only be Rank.FiveOfAKind
    return Rank.FiveOfAKind;
  } else if (totalUniqueCards === 5) {
    // can only be Rank.HighCard
    return Rank.HighCard;
  } else if (totalUniqueCards === 4) {
    // can only be Rank.OnePair
    return Rank.OnePair;
  } else if (totalUniqueCards === 2) {
    // two types of unique card
    // can be Rank.FourOfAKind | Rank.FullHouse
    for (let i = 0; i < uniqueCards.length; i++) {
      if (uniqueCards[i] === 4 || uniqueCards[i] === 1) {
        return Rank.FourOfAKind;
      } else if (uniqueCards[i] === 3 || uniqueCards[i] === 2) {
        return Rank.FullHouse;
      }
    }
  } else if (totalUniqueCards === 3) {
    // can be Rank.ThreeOfAKind | Rank.TwoPair
    for (let i = 0; i < uniqueCards.length; i++) {
      if (uniqueCards[i] === 3 || uniqueCards[i] === 2) {
        return uniqueCards[i] === 3 ? Rank.ThreeOfAKind : Rank.TwoPair;
      }
    }
  }
  return rank;
};

const getStrongerHand = (
  firstHand: string[],
  secondHand: string[],
  isWildCardRule = false
): number => {
  let result = 1;
  const gameCardRank = isWildCardRule ? cardRank2 : cardRank;
  for (let i = 0; i < firstHand.length; i++) {
    const firstHandCard = firstHand[i];
    const secondHandCard = secondHand[i];
    const valueFirstCard = gameCardRank.indexOf(firstHandCard);
    const valueSecondCard = gameCardRank.indexOf(secondHandCard);

    if (valueFirstCard === valueSecondCard) {
      // same value, break early move to next card
      continue;
    } else if (valueFirstCard > valueSecondCard) {
      break;
    }
    result = -1;
  }
  return result;
};

const parseInput = (pathToFile: string, isWildCardRule = false): string[] => {
  const handsAndBids = getPuzzleInput(pathToFile).filter((hands) => hands);
  const gameGetRank = isWildCardRule ? getRankWithWildcard : getRank;
  const sortedHands = handsAndBids.sort((a, b) => {
    const [firstHand] = a.split(' ');
    const [secondHand] = b.split(' ');
    const firstHandCards = firstHand.split('');
    const secondHandCards = secondHand.split('');
    const firstHandRank = gameGetRank(firstHandCards);
    const secondHandRank = gameGetRank(secondHandCards);
    if (firstHandRank > secondHandRank) {
      return 1;
    } else if (firstHandRank < secondHandRank) {
      return -1;
    }
    // must be equal, so compare according to the stronger hand
    return getStrongerHand(firstHandCards, secondHandCards, isWildCardRule);
  });
  return sortedHands;
};

// Find the rank of every hand in your set. What are the total winnings?
export const part1 = (pathToFile: string): number => {
  const sortedHands = parseInput(pathToFile);
  const totalWinnings = sortedHands.reduce((acc, curr, index) => {
    const [, bid] = curr.split(' ');
    return acc + Number(bid) * (index + 1);
  }, 0);
  console.log('The total winnings is', totalWinnings);
  return totalWinnings;
};

// Using the new joker rule (where a Joker is a wildcard), find the rank of every hand in your set. What are the new total winnings?
export const part2 = (pathToFile: string): number => {
  const sortedHands = parseInput(pathToFile, true);
  const totalWinnings = sortedHands.reduce((acc, curr, index) => {
    const [, bid] = curr.split(' ');
    return acc + Number(bid) * (index + 1);
  }, 0);
  console.log('The total winnings using the wildcard rule is', totalWinnings);
  return totalWinnings;
};

const run = (pathToFile: string) => {
  console.log('Day 7:');
  part1(pathToFile);
  part2(pathToFile);
};

export default run;
