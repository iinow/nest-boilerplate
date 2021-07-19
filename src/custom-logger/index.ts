import { ConfigService } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express'

import { Influx } from '~/config/types/env.types'

import { CustomLogger } from './custom-logger.service'
import { InfluxLogger } from './influx-logger.service'

export default function (app: NestExpressApplication) {
  const configService = app.get(ConfigService)
  const env = configService.get<Influx>(Influx.name.toLowerCase())

  if (env.enable) {
    app.useLogger(app.get(InfluxLogger))
    return
  }

  app.useLogger(app.get(CustomLogger))
}
