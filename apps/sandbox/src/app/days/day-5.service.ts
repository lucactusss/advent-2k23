import { Injectable } from '@nestjs/common'
import { FileReadService } from '../utils/file-read.service'

// USAGE :
// await get(Day5Service).solvePart1()
// await get(Day5Service).solvePart2()

interface LocationMapping {
  source: number
  destination: number
  range: number
}

interface Alamanac {
  seeds: number[]
  seedToSoil: LocationMapping[]
  soilToFertilizer: LocationMapping[]
  fertilizerToWater: LocationMapping[]
  waterToLight: LocationMapping[]
  lightToTemperature: LocationMapping[]
  temperatureToHumidity: LocationMapping[]
  humidityToLocation: LocationMapping[]
}

@Injectable()
export class Day5Service {
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
    alamanac.seeds = lines
      .shift()
      .split(':')[1]
      .trim()
      .split(' ')
      .map((n) => Number(n))
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
        // console.log(
        //   `Mapping found : ${item.source} < ${result} < ${item.destination} with range ${item.range}`
        // )
        return item.destination + (result - item.source)
      }
    }
    return result
  }

  async solvePart1(): Promise<number> {
    const locations = []
    const content = this.readAndFormatFile()
    console.log(content)
    for (const seedNumber of content.seeds) {
      console.log('')
      console.log('processing seed : ', seedNumber)
      let result = seedNumber
      result = this.processMapping(result, content.seedToSoil)
      console.log('result after seedToSoil : ', result)
      result = this.processMapping(result, content.soilToFertilizer)
      console.log('result after soilToFertilizer : ', result)
      result = this.processMapping(result, content.fertilizerToWater)
      console.log('result after fertilizerToWater : ', result)
      result = this.processMapping(result, content.waterToLight)
      console.log('result after waterToLight : ', result)
      result = this.processMapping(result, content.lightToTemperature)
      console.log('result after lightToTemperature : ', result)
      result = this.processMapping(result, content.temperatureToHumidity)
      console.log('result after temperatureToHumidity : ', result)
      result = this.processMapping(result, content.humidityToLocation)
      console.log('result after humidityToLocation : ', result)
      locations.push(result)
    }
    return Math.min(...locations)
  }

  async solvePart2(): Promise<number> {
    const locations = []
    const content = this.readAndFormatFile()
    console.log(content)
    for (const seedNumber of content.seeds) {
      console.log('')
      console.log('processing seed : ', seedNumber)
      let result = seedNumber
      result = this.processMapping(result, content.seedToSoil)
      console.log('result after seedToSoil : ', result)
      result = this.processMapping(result, content.soilToFertilizer)
      console.log('result after soilToFertilizer : ', result)
      result = this.processMapping(result, content.fertilizerToWater)
      console.log('result after fertilizerToWater : ', result)
      result = this.processMapping(result, content.waterToLight)
      console.log('result after waterToLight : ', result)
      result = this.processMapping(result, content.lightToTemperature)
      console.log('result after lightToTemperature : ', result)
      result = this.processMapping(result, content.temperatureToHumidity)
      console.log('result after temperatureToHumidity : ', result)
      result = this.processMapping(result, content.humidityToLocation)
      console.log('result after humidityToLocation : ', result)
      locations.push(result)
    }
    return Math.min(...locations)
  }
}
