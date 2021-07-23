import { ConfigService } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express'

import { RedisIoAdapter } from './adapters/redis-io.adapter'

export default function (app: NestExpressApplication) {
  const configService = app.get(ConfigService)

  app.useWebSocketAdapter(new RedisIoAdapter(configService, app))
}
