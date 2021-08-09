import { Controller, Get, Render } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { AppService } from '~/app.service'

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @ApiOperation({
  //   summary: '홈',
  //   description: '루트',
  // })
  // @Get()
  // @Render('index')
  getHello() {
    return { message: 'hell' }
  }
}
