import * as cookieParser from 'cookie-parser'

import { INestApplication } from '@nestjs/common'

export default function (app: INestApplication) {
  app.use(cookieParser())
}
