import { RedisService } from '@liaoliaots/nestjs-redis'
import { EMPTY } from 'rxjs'
import { Connection, getConnection, getRepository } from 'typeorm'

import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

const testEmail = 'haha@gmail.com'
const testName = 'haha'

const oneUser = User.createUser({
  email: testEmail,
  name: testName,
})

const users = [oneUser]

describe('UsersController', () => {
  let controller: UsersController
  let service: UsersService

  const mockConnection = () => ({
    transaction: jest.fn(),
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: Connection,
          useFactory: mockConnection,
        },
        {
          provide: getRepositoryToken(User),
          useFactory: jest.fn(() => ({
            findOne: jest.fn((entity) => entity),
          })),
        },
        {
          provide: RedisService,
          useFactory: jest.fn(() => ({ getClient: { set: jest.fn() } })),
        },
      ],
    }).compile()

    controller = module.get<UsersController>(UsersController)
    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('create User', () => {
    jest.spyOn(service, 'create').mockResolvedValue(oneUser)

    expect(
      controller.create({
        email: testEmail,
        name: testName,
      })
    ).resolves.toBe(oneUser)
  })

  it('findAll Users', () => {
    jest.spyOn(service, 'findAll').mockResolvedValue(users)

    expect(controller.findAll()).resolves.toStrictEqual(users)
  })

  it('findOne User', () => {
    const userId = '2'
    jest.spyOn(service, 'findOne').mockResolvedValue(oneUser)

    expect(controller.findOne(userId)).resolves.toBe(oneUser)
    expect(service.findOne).toBeCalledTimes(1)
    expect(service.findOne).toBeCalledWith(+userId)
  })

  it('update User', () => {
    const userId = '2'
    const updateUserDto: UpdateUserDto = {
      name: testName,
    }

    jest.spyOn(service, 'update').mockReturnValue(EMPTY)

    expect(controller.update(userId, updateUserDto))
    expect(service.update).toBeCalledTimes(1)
    expect(service.update).toBeCalledWith(+userId, updateUserDto)
  })

  it('delete User', () => {
    const userId = '2'

    jest.spyOn(service, 'remove').mockReturnValue(EMPTY)

    expect(controller.remove(userId))
    expect(service.remove).toBeCalledTimes(1)
    expect(service.remove).toBeCalledWith(+userId)
  })
})
