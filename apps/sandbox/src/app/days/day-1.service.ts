import { Injectable } from '@nestjs/common'
import { FileReadService } from '../utils/file-read.service'

// USAGE :
// await get(Day1Service).solvePart1()
// await get(Day1Service).solvePart2()

@Injectable()
export class Day1Service {
  constructor(private readonly fileReadService: FileReadService) {}

  async solvePart1(): Promise<string> {
    const content = this.fileReadService.read('day1.txt')
    const allStrings: string[] = content.split('\n')
    const numbers: number[] = []
    for (const line of allStrings) {
      const lineSplitted = line.split('')
      let firstDigit: string, lastDigit: string
      for (const char of lineSplitted) {
        if (!isNaN(parseInt(char))) {
          if (!firstDigit) {
            firstDigit = char
            lastDigit = char
          } else {
            lastDigit = char
          }
        }
      }
      console.log(firstDigit + lastDigit)
      numbers.push(Number(firstDigit + lastDigit))
    }
    return numbers.reduce((a, b) => a + b, 0).toString()
  }

  async solvePart2(): Promise<string> {
    const content = this.fileReadService.read('day1.txt')
    const allStrings: string[] = content.split('\n')
    const numbers: number[] = []
    for (const line of allStrings) {
      const lineSplitted = line.split('')
      let firstDigit: string, lastDigit: string
      for (let i = 0; i < lineSplitted.length; i++) {
        console.log(lineSplitted[i])
        if (!isNaN(parseInt(lineSplitted[i]))) {
          if (!firstDigit) {
            firstDigit = lineSplitted[i]
            lastDigit = lineSplitted[i]
          } else {
            lastDigit = lineSplitted[i]
          }
        } else {
          //
          const result = this.checkIfStringDigit(lineSplitted, i)
          if (result) {
            if (!firstDigit) {
              firstDigit = result
              lastDigit = result
            } else {
              lastDigit = result
            }
          }
        }
      }
      console.log(firstDigit + lastDigit)
      numbers.push(Number(firstDigit + lastDigit))
    }

    return numbers.reduce((a, b) => a + b, 0).toString()
  }

  private checkIfStringDigit(line: string[], index: number): string {
    if (
      line[index] === 'o' &&
      line[index + 1] === 'n' &&
      line[index + 2] === 'e'
    ) {
      return '1'
    }
    if (
      line[index] === 't' &&
      line[index + 1] === 'w' &&
      line[index + 2] === 'o'
    ) {
      return '2'
    }
    if (
      line[index] === 't' &&
      line[index + 1] === 'h' &&
      line[index + 2] === 'r' &&
      line[index + 3] === 'e' &&
      line[index + 4] === 'e'
    ) {
      return '3'
    }
    if (
      line[index] === 'f' &&
      line[index + 1] === 'o' &&
      line[index + 2] === 'u' &&
      line[index + 3] === 'r'
    ) {
      return '4'
    }
    if (
      line[index] === 'f' &&
      line[index + 1] === 'i' &&
      line[index + 2] === 'v' &&
      line[index + 3] === 'e'
    ) {
      return '5'
    }
    if (
      line[index] === 's' &&
      line[index + 1] === 'i' &&
      line[index + 2] === 'x'
    ) {
      return '6'
    }
    if (
      line[index] === 's' &&
      line[index + 1] === 'e' &&
      line[index + 2] === 'v' &&
      line[index + 3] === 'e' &&
      line[index + 4] === 'n'
    ) {
      return '7'
    }
    if (
      line[index] === 'e' &&
      line[index + 1] === 'i' &&
      line[index + 2] === 'g' &&
      line[index + 3] === 'h' &&
      line[index + 4] === 't'
    ) {
      return '8'
    }
    if (
      line[index] === 'n' &&
      line[index + 1] === 'i' &&
      line[index + 2] === 'n' &&
      line[index + 3] === 'e'
    ) {
      return '9'
    }
  }
}
