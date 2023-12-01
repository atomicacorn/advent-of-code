// https://adventofcode.com/2022/day/6
import { getEntries } from 'utils';

const hasRepeats = (str: string): boolean => {
  return /(.).*\1/.test(str);
};

const getFirstMarker = (dataStream: string, packetSizeIndex = 3): number => {
  let startOfPacketMarkerIndex = 0;
  for (let i = packetSizeIndex; i < dataStream.length; i++) {
    const startOfPacket = dataStream.slice(i - packetSizeIndex, i + 1);
    if (!hasRepeats(startOfPacket)) {
      startOfPacketMarkerIndex = i + 1; // index of array + 1 to become nth char
      break;
    }
  }
  return startOfPacketMarkerIndex;
};

// How many characters need to be processed before the first start-of-packet marker is detected?
export const part1 = (pathToFile: string): number[] => {
  const datastreams = getEntries(pathToFile);
  return datastreams.map((dataStream) => {
    const firstMarkerIndex = getFirstMarker(dataStream);
    console.log(
      'The first start-of-packet marker is known from character number',
      firstMarkerIndex
    );
    return firstMarkerIndex;
  });
};

// How many characters need to be processed before the first start-of-message marker is detected?
export const part2 = (pathToFile: string): number[] => {
  const datastreams = getEntries(pathToFile);
  return datastreams.map((dataStream) => {
    const firstMarkerIndex = getFirstMarker(dataStream, 13);
    console.log(
      'The first start-of-message marker is known from character number',
      firstMarkerIndex
    );
    return firstMarkerIndex;
  });
};

const run = (pathToFile: string) => {
  console.log('Day 6:');
  part1(pathToFile);
  part2(pathToFile);
};

export default run;
