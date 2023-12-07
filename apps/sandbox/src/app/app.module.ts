import { Module } from '@nestjs/common'
import { Day1Service } from './days/day-1.service'
import { Day2Service } from './days/day-2.service'
import { Day3Service } from './days/day-3.service'
import { Day4Service } from './days/day-4.service'
import { Day5Service } from './days/day-5.service'
import { Day5P2Service } from './days/day-5p2.service'
import { Day6Service } from './days/day-6.service'
import { Day7Service } from './days/day-7.service'
import { Day7P2Service } from './days/day-7p2.service'
import { FileReadService } from './utils/file-read.service'

@Module({
  imports: [],
  controllers: [],
  providers: [
    FileReadService,
    Day1Service,
    Day2Service,
    Day3Service,
    Day4Service,
    Day5Service,
    Day5P2Service,
    Day6Service,
    Day7Service,
    Day7P2Service,
  ],
})
export class AppModule {}
