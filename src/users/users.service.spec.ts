import { DEFAULT_REDIS_CLIENT, RedisService } from '@liaoliaots/nestjs-redis'
import { EMPTY, empty, firstValueFrom } from 'rxjs'
import { Connection, DeleteResult, Repository, UpdateResult } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { ProviderType } from '~/common/enums/provider'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { UsersRepository } from './users.repository'
import { UsersService } from './users.service'

const testEmail = 'haha@gmail.com'
const testName = 'haha'
const testProviderUserId = 'hahaProviderUserId'
const testUuid = uuid()

const oneUser = User.createUser({
  email: testEmail,
  name: testName,
  provider: {
    type: ProviderType.KAKAO,
    userId: testProviderUserId,
  },
})

const users = [oneUser]

describe('UsersService', () => {
  let service: UsersService
  let repository: UsersRepository
  let connection: Connection

  const mockConnection = () => ({
    transaction: jest.fn(),
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: Connection,
          useFactory: mockConnection,
        },
        {
          provide: getRepositoryToken(User),
          useFactory: jest.fn(() => ({
            findOne: jest.fn((id: any) => Promise.resolve(oneUser)),
            insert: jest.fn((obj: any) => Promise.resolve()),
            create: jest.fn().mockReturnValue(oneUser),
            save: jest.fn((user: User) => user),
            update: jest.fn(
              (id: any, updateUserDto: UpdateUserDto): Promise<UpdateResult> =>
                Promise.resolve({
                  raw: null,
                  affected: 1,
                  generatedMaps: [],
                })
            ),
            delete: jest.fn(
              (id: any): Promise<DeleteResult> =>
                Promise.resolve({
                  raw: null,
                  affected: 1,
                })
            ),
            find: jest.fn(() => Promise.resolve([oneUser])),
          })),
        },
        {
          provide: RedisService,
          useFactory: jest.fn(() => ({ getClient: { set: jest.fn() } })),
        },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
    repository = module.get<Repository<User>>(getRepositoryToken(User))
    connection = module.get<Connection>(Connection)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('create User', () => {
    expect(
      service.create({
        email: testEmail,
        name: testName,
        provider: {
          type: ProviderType.KAKAO,
          userId: testProviderUserId,
        },
      })
    ).resolves.toBe(oneUser)
    expect(repository.create).toBeCalledTimes(1)
    expect(repository.create).toBeCalledWith({
      email: testEmail,
      name: testName,
      provider: {
        type: ProviderType.KAKAO,
        userId: testProviderUserId,
      },
    })
    expect(repository.save).toBeCalledTimes(1)
  })

  it('findOne User', () => {
    expect(service.findOne(testUuid)).resolves.toBe(oneUser)
    expect(repository.findOne).toBeCalledTimes(1)
    expect(repository.findOne).toBeCalledWith(testUuid)
  })

  it('update User', () => {
    expect(
      service.update(testUuid, {
        name: 'haha2',
      })
    )
    expect(repository.update).toBeCalledTimes(1)
    expect(repository.update).toBeCalledWith(testUuid, {
      name: 'haha2',
    })
  })

  it('update User then throw HttpException', () => {
    jest.spyOn(repository, 'update').mockResolvedValue({
      affected: 0,
      raw: undefined,
      generatedMaps: [],
    })

    expect(
      firstValueFrom(
        service.update(testUuid, {
          name: 'haha2',
        })
      )
    ).rejects.toThrowError()
    expect(repository.update).toBeCalledTimes(1)
  })

  it('remove User', () => {
    expect(service.remove(testUuid))
    expect(repository.delete).toBeCalledTimes(1)
    expect(repository.delete).toBeCalledWith(testUuid)
  })

  it('remove User then throw HttpException', () => {
    jest.spyOn(repository, 'delete').mockResolvedValue({
      affected: 0,
      raw: undefined,
    })

    expect(firstValueFrom(service.remove(testUuid))).rejects.toThrowError()
    expect(repository.delete).toBeCalledTimes(1)
  })

  it('findAll User', () => {
    expect(service.findAll()).resolves.toStrictEqual(users)
    expect(repository.find).toBeCalledTimes(1)
  })

  it('createWithTransaction', () => {
    expect(
      service.createWithTransaction({
        email: testEmail,
        name: testName,
        provider: {
          type: ProviderType.KAKAO,
          userId: testProviderUserId,
        },
      })
    ).resolves.not.toThrow()
    expect(connection.transaction).toBeCalledTimes(1)
  })
})
