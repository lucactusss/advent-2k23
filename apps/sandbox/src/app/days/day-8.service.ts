import { Injectable } from '@nestjs/common'
import { FileReadService } from '../utils/file-read.service'

// USAGE :
// await get(Day8Service).solvePart1()

interface CoordinateMapping {
  L: string
  R: string
}

@Injectable()
export class Day8Service {
  constructor(private readonly fileReadService: FileReadService) {}

  async solvePart1(): Promise<number> {
    let stepCount = 0
    const content = this.fileReadService.read('day8.txt')
    const lines: string[] = content.split('\n')

    const instructions = lines[0].split('')

    const coordMapping: { [key: string]: CoordinateMapping } = {}

    for (let i = 2; i < lines.length; i++) {
      const splittedLine = lines[i].split('=')
      const origin = splittedLine[0].trim()
      const splittedLR = splittedLine[1]
        .trim()
        .substring(1, splittedLine[1].length - 2)
        .split(',')
      console.log(splittedLR)
      const L = splittedLR[0].trim()
      const R = splittedLR[1].trim()
      coordMapping[origin] = { L, R }
    }

    let coord = 'AAA'
    let instructionIndex = 0
    do {
      stepCount++
      const instruction = instructions[instructionIndex]
      const mapping = coordMapping[coord]
      if (instruction === 'L') {
        coord = mapping.L
      } else {
        coord = mapping.R
      }
      if (instructionIndex === instructions.length - 1) {
        instructionIndex = 0
      } else {
        instructionIndex++
      }
    } while (coord !== 'ZZZ')

    return stepCount
  }
}
