// https://adventofcode.com/2023/day/5
import { getPuzzleInput } from 'utils';

enum Almanac {
  SeedToSoil = 'seed-to-soil map:',
  SoilToFertilizer = 'soil-to-fertilizer map:',
  FertilizerToWater = 'fertilizer-to-water map:',
  WaterToLight = 'water-to-light map:',
  LightToTemp = 'light-to-temperature map:',
  TempToHumidity = 'temperature-to-humidity map:',
  HumidityToLocation = 'humidity-to-location map:',
}

type SeedRequirement = {
  seed: number;
  soil: number;
  fertilizer: number;
  water: number;
  light: number;
  temperature: number;
  humidity: number;
  location: number;
};

type ParsedAlmanac = Record<'seeds', number[]> & Record<Almanac, number[][]>;

const parseAlmanac = (pathToFile: string): ParsedAlmanac => {
  const almanac: ParsedAlmanac = {
    seeds: [],
    [Almanac.SeedToSoil]: [],
    [Almanac.SoilToFertilizer]: [],
    [Almanac.FertilizerToWater]: [],
    [Almanac.WaterToLight]: [],
    [Almanac.LightToTemp]: [],
    [Almanac.TempToHumidity]: [],
    [Almanac.HumidityToLocation]: [],
  };
  const almanacRaw: string[] = getPuzzleInput(pathToFile);
  const [seedsString, ...rest] = almanacRaw;

  // get the initial seeds
  almanac.seeds = seedsString
    .split(':')[1]
    .split(' ')
    .filter((seed) => seed)
    .map((seed) => Number(seed));

  // extract the maps
  const almanacValues = Object.values(Almanac);
  almanacValues.forEach((almanacKey, almanacIndex) => {
    let startIndex = 0;
    let endIndex = 0;
    if (almanacKey) {
      startIndex = rest.findIndex((row) => row === almanacKey);
      if (almanacIndex + 1 <= almanacValues.length - 1) {
        endIndex = rest.findIndex(
          (row) => row === almanacValues[almanacIndex + 1]
        );
      }
    }
    if (startIndex >= 0 && endIndex >= 0) {
      almanac[almanacKey] = rest
        .slice(startIndex + 1, endIndex - 1)
        .map((almanacRow) =>
          almanacRow.split(' ').map((alamancRow) => Number(alamancRow))
        );
    }
  });

  return almanac;
};

const getMapping = (value: number, ranges: number[][]): number => {
  let returnedValue = value; // default to the value if not in ranges
  ranges.forEach((range) => {
    const destination = range[0];
    const source = range[1];
    const increment = range[2];

    if (value >= source && value <= source + increment) {
      // value within range now work out it's range value
      const diff = source - value;
      const rangeValue = destination - diff;
      if (rangeValue >= destination && rangeValue <= destination + increment) {
        returnedValue = rangeValue;
      }
    }
  });

  return returnedValue;
};

const getSeedRequirements = (
  currentSeed: number,
  almanac: ParsedAlmanac
): SeedRequirement => {
  const seed = currentSeed;
  const soil = getMapping(seed, almanac[Almanac.SeedToSoil]);
  const fertilizer = getMapping(soil, almanac[Almanac.SoilToFertilizer]);
  const water = getMapping(fertilizer, almanac[Almanac.FertilizerToWater]);
  const light = getMapping(water, almanac[Almanac.WaterToLight]);
  const temperature = getMapping(light, almanac[Almanac.LightToTemp]);
  const humidity = getMapping(temperature, almanac[Almanac.TempToHumidity]);
  const location = getMapping(humidity, almanac[Almanac.HumidityToLocation]);

  return {
    seed,
    soil,
    fertilizer,
    water,
    light,
    temperature,
    humidity,
    location,
  };
};

// What is the lowest location number that corresponds to any of the initial seed numbers?
export const part1 = (pathToFile: string): number => {
  const almanac = parseAlmanac(pathToFile);
  const seedRequirements: SeedRequirement[] = [];
  almanac.seeds.map((seed, index) => {
    seedRequirements[index] = getSeedRequirements(seed, almanac);
  });
  const locations = seedRequirements.map(
    (seedRequirement) => seedRequirement.location
  );
  const closestLocation = Math.min(...locations);
  console.log('The closest seed location is', closestLocation);
  return closestLocation;
};

const run = (pathToFile: string) => {
  console.log('Day 5:');
  part1(pathToFile);
};

export default run;
