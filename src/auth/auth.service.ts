import { RedisService } from '@liaoliaots/nestjs-redis'
import { createHash } from 'crypto'
import { Request, Response } from 'express'
import { firstValueFrom, from, tap } from 'rxjs'

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { COOKIE_SESSION_NAME } from '~/common/constants'
import { ProviderType } from '~/common/enums/provider'
import { Jwt } from '~/config/types/env.types'
import { CreateUserDto } from '~/users/dto/create-user.dto'
import { User } from '~/users/entities/user.entity'
import { UsersService } from '~/users/users.service'

@Injectable()
export class AuthService {
  private jwt: Jwt
  private sKey = (_, uuid: string) => `SESSION:${uuid}`

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    configService: ConfigService
  ) {
    this.jwt = configService.get<Jwt>(Jwt.name.toLowerCase())
  }

  validateUser(userDto: CreateUserDto): Promise<User> {
    return firstValueFrom(from(this.usersService.upsert(userDto)).pipe())
  }

  validateUserByUuid(uuid: string): Promise<User> {
    return this.usersService.findOne(uuid)
  }

  signIn(user: User, res: Response): Promise<string> {
    const hash = createHash('sha256')
      .update(String(new Date().getTime()))
      .digest('base64')

    return firstValueFrom(
      from(this.jwtService.signAsync({ uuid: user.id, hash })).pipe(
        tap((jwt: string) => {
          this.redisService
            .getClient()
            .set(this.sKey`${user.id}`, jwt, 'EX', this.jwt.expiredSecond)

          res.cookie(COOKIE_SESSION_NAME, jwt, {
            httpOnly: true,
            maxAge: new Date().getDate() + this.jwt.expiredSecond * 1000,
          })
        })
      )
    )
  }
}
