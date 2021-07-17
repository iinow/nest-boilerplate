import * as exphbs from 'express-handlebars'
import { join } from 'path'

import { NestExpressApplication } from '@nestjs/platform-express'

import helpers from '~/middleware/handlebars/helpers'

export default function (app: NestExpressApplication) {
  app.useStaticAssets(join(__dirname, '../../../../', 'public'))
  app.setBaseViewsDir(join(__dirname, '../../../../', 'views'))

  const hbs = exphbs.create({
    defaultLayout: 'default',
    layoutsDir: join(__dirname, '../../../../views/layouts'),
    extname: 'hbs',
    helpers,
  })

  app.engine('hbs', hbs.engine)
  app.setViewEngine('hbs')
}
