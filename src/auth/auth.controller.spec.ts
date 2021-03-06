import { RedisService } from '@liaoliaots/nestjs-redis'
import { Connection } from 'typeorm'

import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { Jwt } from '~/config/types/env.types'
import { User } from '~/users/entities/user.entity'
import { UsersService } from '~/users/users.service'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => {
            const jwt = configService.get<Jwt>(Jwt.name.toLowerCase())

            return {
              secret: jwt?.secret || 'TEST',
              signOptions: {
                expiresIn: jwt?.expiredSecond || 3600,
              },
            }
          },
          inject: [ConfigService],
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        ConfigService,
        {
          provide: getRepositoryToken(User),
          useFactory: jest.fn(() => ({})),
        },
        {
          provide: Connection,
          useFactory: () => ({ transaction: jest.fn() }),
        },
        {
          provide: RedisService,
          useFactory: jest.fn(() => ({ getClient: { set: jest.fn() } })),
        },
      ],
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
