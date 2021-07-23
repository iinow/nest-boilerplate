import { RedisClient } from 'redis'
import { ServerOptions } from 'socket.io'
import { createAdapter } from 'socket.io-redis'

import { INestApplicationContext } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IoAdapter } from '@nestjs/platform-socket.io'

import { Redis } from '~/config/types/env.types'

export class RedisIoAdapter extends IoAdapter {
  private redisAdapter: any

  constructor(
    configService: ConfigService,
    appOrHttpServer?: INestApplicationContext | any
  ) {
    super(appOrHttpServer)

    const redisConfig = configService.get<Redis>(Redis.name.toLowerCase())
    const pubClient = new RedisClient({
      host: redisConfig.host,
      port: redisConfig.port,
    })
    const subClient = pubClient.duplicate()
    this.redisAdapter = createAdapter({ pubClient, subClient })
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options)
    server.adapter(this.redisAdapter)
    return server
  }
}
