import { RedisService } from '@liaoliaots/nestjs-redis'
import { Connection } from 'typeorm'

import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { ProviderType } from '~/common/enums/provider'
import { Jwt } from '~/config/types/env.types'
import { CreateUserDto } from '~/users/dto/create-user.dto'
import { User } from '~/users/entities/user.entity'
import { UsersService } from '~/users/users.service'

import { AuthService } from './auth.service'

describe('AuthService', () => {
  let service: AuthService
  let usersService: UsersService

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

    service = module.get<AuthService>(AuthService)
    usersService = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('validateUser', () => {
    const userDto: CreateUserDto = {
      name: 'haha',
      email: 'haha@gmail.com',
      provider: {
        type: ProviderType.GOOGLE,
        userId: 'h123123129',
      },
    }
    const user = User.createUser(userDto)

    jest
      .spyOn(usersService, 'upsert')
      .mockImplementation(() => Promise.resolve(user))

    expect(service.validateUser(userDto)).resolves.toBe(user)
    expect(usersService.upsert).toBeCalledTimes(1)
    expect(usersService.upsert).toBeCalledWith(userDto)
  })
})
