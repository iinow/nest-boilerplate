import { HttpAdapterHost } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

import { AllExceptionFilter } from './all-exception.filter'
import { HttpExceptionFilter } from './http-exception.filter'

export default function (app: NestExpressApplication) {
  const { httpAdapter } = app.get(HttpAdapterHost)

  //큰 순부터 추가해줘야한다.
  app.useGlobalFilters(new AllExceptionFilter())
  app.useGlobalFilters(new HttpExceptionFilter())
}
