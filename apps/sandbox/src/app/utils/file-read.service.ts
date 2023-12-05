import { Injectable } from '@nestjs/common'
import * as fs from 'fs'

@Injectable()
export class FileReadService {
  constructor() {}

  read(filePath: string): string {
    const dirName = __dirname.split('dist/')[0]
    return fs.readFileSync(
      dirName + 'apps/sandbox/src/assets/' + filePath,
      'utf8'
    )
  }
}
