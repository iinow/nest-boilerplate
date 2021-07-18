/* eslint-disable prefer-rest-params */
import { ConsoleLogger, Injectable } from '@nestjs/common'

@Injectable()
export class CustomLogger extends ConsoleLogger {
  debug(message: any, context?: string): void {
    super.debug.apply(this, arguments)
  }
}
