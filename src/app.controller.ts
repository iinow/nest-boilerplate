import { Controller, Get, Render } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { AppService } from '~/app.service'

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
