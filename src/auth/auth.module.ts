import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { Jwt } from '~/config/types/env.types'
import { UsersModule } from '~/users/users.module'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { KakaoStrategy } from './strategies/kakao.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const jwt = configService.get<Jwt>(Jwt.name.toLowerCase())

        return {
          secret: jwt.secret,
          signOptions: {
            expiresIn: jwt.expiredSecond,
          },
        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, KakaoStrategy, LocalStrategy, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
