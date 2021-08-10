import * as helmet from 'helmet'

import { INestApplication } from '@nestjs/common'

export default function (app: INestApplication) {
  app.use(helmet())
}
