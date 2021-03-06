import { NestExpressApplication } from '@nestjs/platform-express'

import CookieMiddleware from '~/middleware/cookie'
import HandlebarsMiddleware from '~/middleware/handlebars/index'
import HelmetMiddleware from '~/middleware/helmet'
import SwaggerMiddleware from '~/middleware/swagger'

export default function (app: NestExpressApplication) {
  SwaggerMiddleware(app)
  HandlebarsMiddleware(app)
  HelmetMiddleware(app)
  CookieMiddleware(app)
}
