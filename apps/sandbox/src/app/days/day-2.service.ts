import { Injectable } from '@nestjs/common'
import { FileReadService } from '../utils/file-read.service'

// USAGE :
// await get(Day2Service).solvePart1()
// await get(Day2Service).solvePart2()

@Injectable()
export class Day2Service {
  private readonly MAX_GREEN = 13
  private readonly MAX_RED = 12
  private readonly MAX_BLUE = 14
  constructor(private readonly fileReadService: FileReadService) {}

  async solvePart1(): Promise<number> {
    let result = 0
    const content = this.fileReadService.read('day2.txt')
    const allGames: string[] = content.split('\n')
    for (const game of allGames) {
      let gameNotValid = false
      const gameSplitted = game.split(':')
      const gameId = gameSplitted[0].split(' ')[1]
      const sets = gameSplitted[1].split(';')
      for (const set of sets) {
        let greenCubes = 0,
          redCubes = 0,
          blueCubes = 0
        const setSplitted = set.split(',')
        for (const cube of setSplitted) {
          const splittedCommand = cube.trim().split(' ')
          if (splittedCommand[1] === 'green') {
            // console.log('green')
            greenCubes += Number(splittedCommand[0])
          }
          if (splittedCommand[1] === 'red') {
            // console.log('red')
            redCubes += Number(splittedCommand[0])
          }
          if (splittedCommand[1] === 'blue') {
            // console.log('blue')
            blueCubes += Number(splittedCommand[0])
          }
        }
        if (
          greenCubes > this.MAX_GREEN ||
          redCubes > this.MAX_RED ||
          blueCubes > this.MAX_BLUE
        ) {
          console.log('Game ' + gameId + ' is not valid')
          gameNotValid = true
        }
      }
      // console.log('greenCubes', greenCubes)
      // console.log('blueCubes', blueCubes)
      // console.log('redCubes', redCubes)
      // Decision here
      if (!gameNotValid) {
        console.log('Game ' + gameId + ' is valid')
        result += Number(gameId)
      }
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
}
