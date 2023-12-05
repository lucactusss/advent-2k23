import { Injectable } from '@nestjs/common'
import { FileReadService } from '../utils/file-read.service'

// USAGE :
// await get(Day3Service).solvePart1()
// await get(Day3Service).solvePart2()

@Injectable()
export class Day3Service {
  DIGIT_EXPRESSION: RegExp = /^\d$/

  constructor(private readonly fileReadService: FileReadService) {}

  async solvePart1(): Promise<number> {
    let result = 0
    const content = this.fileReadService.read('day3.txt')
    const engineLines: string[] = content.split('\n')

    let previousLine, nextLine
    for (let i = 0; i < engineLines.length; i++) {
      const actualLineSplitted = engineLines[i].split('')
      if (engineLines[i + 1]) {
        nextLine = engineLines[i + 1].split('')
      } else {
        nextLine = null
      }
      if (engineLines[i - 1]) {
        previousLine = engineLines[i - 1].split('')
      }
      console.log('\n\n new line')
      console.log('p', (previousLine ?? []).join(''))
      console.log('a', (actualLineSplitted ?? []).join(''))
      console.log('n', (nextLine ?? []).join(''))
      let number = []
      let isValidNumber = false
      for (let j = 0; j < actualLineSplitted.length; j++) {
        if (this.isDigit(actualLineSplitted[j])) {
          number.push(actualLineSplitted[j])
          if (
            previousLine &&
            (this.isSpecialChar(previousLine[j]) ||
              this.isSpecialChar(previousLine[j - 1]) ||
              this.isSpecialChar(previousLine[j + 1]))
          ) {
            isValidNumber = true
          }
          if (
            nextLine &&
            (this.isSpecialChar(nextLine[j]) ||
              this.isSpecialChar(nextLine[j - 1]) ||
              this.isSpecialChar(nextLine[j + 1]))
          ) {
            isValidNumber = true
          }
          if (
            (actualLineSplitted[j + 1] &&
              this.isSpecialChar(actualLineSplitted[j - 1])) ||
            this.isSpecialChar(actualLineSplitted[j + 1])
          ) {
            isValidNumber = true
          }
        } else {
          // It is not a number, check the special char on the next char
          if (number.length > 0) {
            if (isValidNumber) {
              console.log('number valid', number.join(''))
              result += Number(number.join(''))
            } else {
              console.log('number not valid', number.join(''))
            }
            number = []
            isValidNumber = false
          }
        }
      }
      previousLine = engineLines[i]
    }

    return result
  }

  async solvePart2(): Promise<number> {
    let result = 0
    const content = this.fileReadService.read('day2.txt')
    const allGames: string[] = content.split('\n')
    for (const game of allGames) {
      const minCubes = {
        green: null,
        red: null,
        blue: null,
      }
      const gameSplitted = game.split(':')
      const sets = gameSplitted[1].split(';')
      for (const set of sets) {
        const setCubes = {
          green: 0,
          red: 0,
          blue: 0,
        }
        const setSplitted = set.split(',')
        for (const cube of setSplitted) {
          const splittedCommand = cube.trim().split(' ')
          if (splittedCommand[1] === 'green') {
            // console.log('green')
            setCubes.green += Number(splittedCommand[0])
          }
          if (splittedCommand[1] === 'red') {
            // console.log('red')
            setCubes.red += Number(splittedCommand[0])
          }
          if (splittedCommand[1] === 'blue') {
            // console.log('blue')
            setCubes.blue += Number(splittedCommand[0])
          }
          if (
            setCubes.green !== 0 &&
            (minCubes.green === null || setCubes.green > minCubes.green)
          ) {
            minCubes.green = setCubes.green
          }
          if (
            setCubes.red !== 0 &&
            (minCubes.red === null || setCubes.red > minCubes.red)
          ) {
            minCubes.red = setCubes.red
          }
          if (
            setCubes.blue !== 0 &&
            (minCubes.blue === null || setCubes.blue > minCubes.blue)
          ) {
            minCubes.blue = setCubes.blue
          }
        }
      }
      console.log('gameId', gameSplitted[0])
      console.log('minCubes', minCubes)
      result += minCubes.green * minCubes.red * minCubes.blue
    }
    return result
  }

  private isDigit(character: string): boolean {
    return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(
      character
    )
  }

  private isSpecialChar(character: string): boolean {
    return ['+', '#', '*', '$', '&', '=', '-', '@', '/', '%'].includes(
      character
    )
  }
}
