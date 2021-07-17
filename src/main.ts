import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from '~/app.module'
import { Server } from '~/config/types/env.types'
import filters from '~/filters'
import middleware from '~/middleware'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const configService = app.get(ConfigService)

  const server = configService.get(Server.name.toLocaleLowerCase()) as Server

  filters(app)
  middleware(app)

  await app.listen(server.http.port)
}
bootstrap()
