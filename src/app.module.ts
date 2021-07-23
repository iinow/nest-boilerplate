import { RedisModule } from '@liaoliaots/nestjs-redis'
import { DiscordModule } from 'discord-nestjs'
import { join } from 'path'

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

import { AppController } from '~/app.controller'
import { AppService } from '~/app.service'
import configuration from '~/config'
import { validate } from '~/config/env.validation'
import { Discord, Redis, RelationDB } from '~/config/types/env.types'
import { CustomLoggerModule } from '~/custom-logger/custom-logger.module'
import { MessageModule } from '~/message/message.module'
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
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const option = configService.get<Redis>(Redis.name.toLowerCase())
        return {
          config: {
            ...option,
          },
        }
      },
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'public'),
    }),
    UsersModule,
    CustomLoggerModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
