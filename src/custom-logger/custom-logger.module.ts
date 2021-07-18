import { DiscordModule } from 'discord-nestjs'

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { Discord } from '@/config/types/env.types'

import { CustomLogger } from './custom-logger.service'

@Module({
  imports: [
    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const discord = configService.get<Discord>(Discord.name.toLowerCase())

        return {
          token: discord.token,
          commandPrefix: '!',
          webhook: discord.webhook as any,
        }
      },
    }),
  ],
  providers: [CustomLogger],
})
export class CustomLoggerModule {}
