import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'

export default function (app: NestExpressApplication) {
  app.useGlobalPipes(new ValidationPipe())
}
