import {
  Controller,
  Get,
  Injectable,
  Param,
  Redirect,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'

import { ProviderType } from '~/common/enums/provider'

import { AuthService } from './auth.service'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth(@Req() req) {}

  @Get(':provider/callback')
  @Redirect('/')
  @UseGuards(AuthGuard('kakao'))
  redirect(@Param('provider') provider: ProviderType, @Req() req) {
    return req.user
  }
}
