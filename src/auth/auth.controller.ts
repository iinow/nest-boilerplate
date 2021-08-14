import { Request, Response } from 'express'

import {
  Controller,
  Get,
  Injectable,
  Param,
  Redirect,
  Req,
  Res,
  UseGuards,
  VERSION_NEUTRAL,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiHeader, ApiTags } from '@nestjs/swagger'

import { ProviderType } from '~/common/enums/provider'
import { User } from '~/users/entities/user.entity'

import { AuthService } from './auth.service'
import { CurrentUser } from './decorators/current-user.decorator'
import { JwtAuthGuard } from './guards/jwt-auth.guard'

@ApiTags('auth')
@Controller({
  path: 'auth',
  version: VERSION_NEUTRAL,
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth(@Req() req) {}

  @Get(':provider/callback')
  @Redirect('/')
  @UseGuards(AuthGuard('kakao'))
  redirect(
    @Param('provider') provider: ProviderType,
    @Req() req: Request,
    @Res() res: Response
  ) {
    return this.authService.signIn(req.user as User, res)
  }

  @ApiHeader({
    name: 'authorization',
    description: 'jwt value',
  })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user) {
    return user
  }
}
