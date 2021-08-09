import { Module } from '@nestjs/common'

import { UsersModule } from '~/users/users.module'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { KakaoStrategy } from './kakao.strategy'

@Module({
  imports: [UsersModule],
  providers: [AuthService, KakaoStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
