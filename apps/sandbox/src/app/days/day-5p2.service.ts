import { Injectable } from '@nestjs/common'
import { FileReadService } from '../utils/file-read.service'

// USAGE :
// await get(Day5P2Service).solvePart2()

interface LocationMapping {
  source: number
  destination: number
  range: number
}

interface Alamanac {
  seeds: { begin: number; range: number }[]
  seedToSoil: LocationMapping[]
  soilToFertilizer: LocationMapping[]
  fertilizerToWater: LocationMapping[]
  waterToLight: LocationMapping[]
  lightToTemperature: LocationMapping[]
  temperatureToHumidity: LocationMapping[]
  humidityToLocation: LocationMapping[]
}

@Injectable()
export class Day5P2Service {
  constructor(private readonly fileReadService: FileReadService) {}

  readAndFormatFile(): Alamanac {
    const alamanac: Alamanac = {
      seeds: [],
      seedToSoil: [],
      soilToFertilizer: [],
      fertilizerToWater: [],
      waterToLight: [],
      lightToTemperature: [],
      temperatureToHumidity: [],
      humidityToLocation: [],
    }
    const content = this.fileReadService.read('day5.txt')
    const lines: string[] = content.split('\n')

    // Process seeds
    const seeds = lines
      .shift()
      .split(':')[1]
      .trim()
      .split(' ')
      .map((n) => Number(n))
    for (let i = 0; i < seeds.length; i += 2) {
      alamanac.seeds.push({
        begin: seeds[i],
        range: seeds[i + 1],
      })
    }
    let objectToFill:
      | 'seedToSoil'
      | 'soilToFertilizer'
      | 'fertilizerToWater'
      | 'waterToLight'
      | 'lightToTemperature'
      | 'temperatureToHumidity'
      | 'humidityToLocation'
    for (const line of lines) {
      if (line !== '') {
        if (line.startsWith('seed-to-soil')) {
          objectToFill = 'seedToSoil'
        } else if (line === 'soil-to-fertilizer map:') {
          objectToFill = 'soilToFertilizer'
        } else if (line === 'fertilizer-to-water map:') {
          objectToFill = 'fertilizerToWater'
        } else if (line === 'water-to-light map:') {
          objectToFill = 'waterToLight'
        } else if (line === 'light-to-temperature map:') {
          objectToFill = 'lightToTemperature'
        } else if (line === 'temperature-to-humidity map:') {
          objectToFill = 'temperatureToHumidity'
        } else if (line === 'humidity-to-location map:') {
          objectToFill = 'humidityToLocation'
        } else {
          const splittedLine = line.split(' ')
          const destination = Number(splittedLine[0])
          const source = Number(splittedLine[1])
          const range = Number(splittedLine[2])
          alamanac[objectToFill].push({
            destination,
            source,
            range,
          })
        }
      }
    }
    return alamanac
  }

  private processMapping(result: number, mapping: LocationMapping[]): number {
    for (const item of mapping) {
      if (item.source <= result && result < item.source + item.range) {
        return item.destination + (result - item.source)
      }
    }
    return result
  }

  async solvePart2(): Promise<number> {
    let minLocation
    const content = this.readAndFormatFile()
    for (const seed of content.seeds) {
      for (
        let seedNumber = seed.begin;
        seedNumber < seed.begin + seed.range;
        seedNumber++
      ) {
        let result = seedNumber
        result = this.processMapping(result, content.seedToSoil)
        result = this.processMapping(result, content.soilToFertilizer)
        result = this.processMapping(result, content.fertilizerToWater)
        result = this.processMapping(result, content.waterToLight)
        result = this.processMapping(result, content.lightToTemperature)
        result = this.processMapping(result, content.temperatureToHumidity)
        result = this.processMapping(result, content.humidityToLocation)
        if (!minLocation) {
          minLocation = result
        } else if (result < minLocation) {
          minLocation = result
        }
      }
    }
    return minLocation
  }
}
