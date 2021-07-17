import { NestExpressApplication } from '@nestjs/platform-express'

import HandlebarsMiddleware from '~/middleware/handlebars/index'
import SwaggerMiddleware from '~/middleware/swagger'

export default function (app: NestExpressApplication) {
  SwaggerMiddleware(app)
  HandlebarsMiddleware(app)
}
