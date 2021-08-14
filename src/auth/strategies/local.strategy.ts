import { Request } from 'express'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { firstValueFrom, from, tap } from 'rxjs'

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'

import { COOKIE_SESSION_NAME } from '~/common/constants'
import { Jwt } from '~/config/types/env.types'
import { User } from '~/users/entities/user.entity'

import { AuthService } from '../auth.service'
import { JwtPayload } from '../dto/jwt-payload.dto'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: (req: Request) => req.cookies[COOKIE_SESSION_NAME],
      ignoreExpiration: false,
      secretOrKey: configService.get<Jwt>(Jwt.name.toLowerCase()).secret,
    })
  }

  validate(payload: JwtPayload): Promise<User> {
    return firstValueFrom(
      from(this.authService.validateUserByUuid(payload.uuid)).pipe()
    )
  }

  authenticate(promiseRequest: any, options) {
    super.authenticate(promiseRequest, options)
  }
}
