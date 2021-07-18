/* eslint-disable prefer-rest-params */
import { DiscordClientProvider } from 'discord-nestjs'

import { ConsoleLogger, Injectable } from '@nestjs/common'

@Injectable()
export class CustomLogger extends ConsoleLogger {
  constructor(private readonly discordClient: DiscordClientProvider) {
    super()
  }

  debug(message: any, context?: string): void {
    super.debug.apply(this, arguments)
  }
}
