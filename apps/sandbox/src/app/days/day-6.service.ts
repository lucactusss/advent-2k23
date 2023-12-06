import { Injectable } from '@nestjs/common'
import { FileReadService } from '../utils/file-read.service'

// USAGE :
// await get(Day6Service).solvePart1()

// const PUZZLE_INPUT = [
//   {
//     time: 44,
//     distance: 277,
//   },
//   {
//     time: 89,
//     distance: 1136,
//   },
//   {
//     time: 96,
//     distance: 1890,
//   },
//   {
//     time: 91,
//     distance: 1768,
//   },
// ]

const PUZZLE_INPUT = [
  {
    time: 44899691,
    distance: 277113618901768,
  },
]

@Injectable()
export class Day6Service {
  constructor(private readonly fileReadService: FileReadService) {}

  async solvePart1(): Promise<number> {
    const possibilities: number[] = []
    for (const input of PUZZLE_INPUT) {
      let possibleCases = 0
      // Check all possible cases
      for (let speed = 0; speed < input.time; speed++) {
        const remainingTime = input.time - speed
        const distance = speed * remainingTime
        // console.log(
        //   'speed',
        //   speed,
        //   'remainingTime',
        //   remainingTime,
        //   'distance',
        //   distance,
        //   'distance to beat',
        //   input.distance,
        //   'beat :',
        //   distance > input.distance ? 'yes' : 'no'
        // )
        if (distance > input.distance) {
          possibleCases++
        }
      }
      possibilities.push(possibleCases)
    }
    return possibilities.reduce((acc, curr) => acc * curr, 1)
  }
}
