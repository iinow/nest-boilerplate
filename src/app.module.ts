import { DiscordModule } from 'discord-nestjs'

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import { AppController } from '~/app.controller'
import { AppService } from '~/app.service'
import configuration from '~/config'
import { validate } from '~/config/env.validation'
import { Discord, RelationDB } from '~/config/types/env.types'
import { CustomLoggerModule } from '~/custom-logger/custom-logger.module'
import { UsersModule } from '~/users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      cache: true,
      isGlobal: true,
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const option = configService.get<RelationDB>('rdb')
        return option as TypeOrmModuleOptions
      },
    }),
    UsersModule,
    CustomLoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
