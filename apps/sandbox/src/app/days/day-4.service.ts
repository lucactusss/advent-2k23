import { Injectable } from '@nestjs/common'
import { FileReadService } from '../utils/file-read.service'

// USAGE :
// await get(Day4Service).solvePart1()
// await get(Day4Service).solvePart2()

@Injectable()
export class Day4Service {
  constructor(private readonly fileReadService: FileReadService) {}

  async solvePart1(): Promise<number> {
    let result = 0
    const content = this.fileReadService.read('day4.txt')
    const allGames: string[] = content.split('\n')
    for (const game of allGames) {
      let validNumbers = 0
      const gameSplitted = game.split(':')
      // console.log(gameSplitted)
      const winningNumbers = gameSplitted[1]
        .split('|')[0]
        .trim()
        .split(' ')
        .filter((n) => n !== '')
        .map((n) => Number(n))
      const playedNumbers = gameSplitted[1]
        .split('|')[1]
        .trim()
        .split(' ')
        .filter((n) => n !== '')
        .map((n) => Number(n))
      console.log(winningNumbers)
      console.log(playedNumbers)
      for (const n of playedNumbers) {
        if (winningNumbers.includes(n)) {
          validNumbers++
        }
      }
      const score = this.calculateScore(validNumbers)
      console.log('score', score)
      result += score
    }
    return result
  }

  private calculateScore(validNumbers: number): number {
    if (validNumbers === 0) {
      return 0
    }
    let result = 1
    for (let i = 1; i < validNumbers; i++) {
      result = result * 2
    }
    return result
  }

  async solvePart2(): Promise<number> {
    let result = 0
    const content = this.fileReadService.read('day4.txt')
    const allGames: string[] = content.split('\n')
    const gamesToPlay = {
      1: 0,
    }
    for (const game of allGames) {
      const gameSplitted = game.split(':')
      const gameId = Number(
        game
          .split(':')[0]
          .split(' ')
          .filter((n) => n !== '')[1]
      )
      console.log('')
      console.log('')
      console.log('')
      console.log('GameId : ', gameId)
      console.log('gamesToPlay', gamesToPlay[gameId] + 1 ?? 0)
      for (let i = 0; i < (gamesToPlay[gameId] ?? 0) + 1; i++) {
        result++
        let validNumbers = 0
        const winningNumbers = gameSplitted[1]
          .split('|')[0]
          .trim()
          .split(' ')
          .filter((n) => n !== '')
          .map((n) => Number(n))
        const playedNumbers = gameSplitted[1]
          .split('|')[1]
          .trim()
          .split(' ')
          .filter((n) => n !== '')
          .map((n) => Number(n))
        for (const n of playedNumbers) {
          if (winningNumbers.includes(n)) {
            validNumbers++
          }
        }
        if (i === 0) {
          console.log('validNumbers : ', validNumbers)
          console.log('adding 1 until game : ', gameId + validNumbers)
        }
        if (validNumbers > 0) {
          for (let j = gameId + 1; j <= gameId + validNumbers; j++) {
            if (!gamesToPlay[j]) {
              gamesToPlay[j] = 1
            } else {
              gamesToPlay[j]++
            }
          }
        }
      }

      // console.log(gameSplitted)

      //console.log(winningNumbers)
      // console.log(playedNumbers)

      // const score = this.calculateScore(validNumbers)
    }
    return result
  }
}

// 6420968
// 6420979
