import { Injectable } from '@nestjs/common'
import { FileReadService } from '../utils/file-read.service'

// USAGE :
// await get(Day8P2Service).solvePart2()

interface CoordinateMapping {
  L: string
  R: string
}

@Injectable()
export class Day8P2Service {
  constructor(private readonly fileReadService: FileReadService) {}

  async solvePart2(): Promise<number> {
    const content = this.fileReadService.read('day8.txt')
    const lines: string[] = content.split('\n')

    const instructions = lines[0].split('')

    const coordMapping: { [key: string]: CoordinateMapping } = {}

    const coords = []

    for (let i = 2; i < lines.length; i++) {
      const splittedLine = lines[i].split('=')
      const origin = splittedLine[0].trim()
      const splittedLR = splittedLine[1]
        .trim()
        .substring(1, splittedLine[1].length - 2)
        .split(',')

      if (origin.split('')[2] === 'A') {
        coords.push(origin)
      }
      const L = splittedLR[0].trim()
      const R = splittedLR[1].trim()
      coordMapping[origin] = { L, R }
    }
    const allStepCount = []

    let instructionIndex = 0
    for (let i = 0; i < coords.length; i++) {
      let stepCount = 0
      do {
        stepCount++
        const instruction = instructions[instructionIndex]
        const mapping = coordMapping[coords[i]]
        if (instruction === 'L') {
          coords[i] = mapping.L
        } else {
          coords[i] = mapping.R
        }
        if (instructionIndex === instructions.length - 1) {
          instructionIndex = 0
        } else {
          instructionIndex++
        }
      } while (coords[i].split('')[2] !== 'Z')
      console.log('stepCount', stepCount)
      allStepCount.push(stepCount)
    }

    return this.lcm(...allStepCount)
  }

  lcm = (...arr) => {
    const gcd = (x, y) => (!y ? x : gcd(y, x % y))
    const _lcm = (x, y) => (x * y) / gcd(x, y)
    return [...arr].reduce((a, b) => _lcm(a, b))
  }
}
