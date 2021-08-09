import { InjectRedis, RedisService } from '@liaoliaots/nestjs-redis'
import { Redis } from 'ioredis'
import {
  filter,
  firstValueFrom,
  from,
  map,
  mergeMap,
  switchMap,
  throwError,
} from 'rxjs'
import { Connection, Repository } from 'typeorm'

import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Provider } from './entities/provider.embedded'
import { User } from './entities/user.entity'
import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: UsersRepository,
    private connection: Connection,
    private readonly redisService: RedisService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto)
    return this.usersRepository.save(user)
  }

  async createWithTransaction(createUserDto: CreateUserDto) {
    await this.connection.transaction(async (manager) => {
      await manager.save(this.usersRepository.create(createUserDto))
    })
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  findOne(id: string) {
    return this.usersRepository.findOne(id)
  }

  findOneByProvider(provider: Provider) {
    return this.usersRepository.findOne({
      where: {
        provider: {
          userId: provider.userId,
          type: provider.type,
        },
      },
    })
  }

  upsert(userDto: CreateUserDto) {
    return firstValueFrom(
      from(this.findOneByProvider(userDto.provider)).pipe(
        mergeMap((user) =>
          !user ? this.create(userDto) : Promise.resolve(user)
        )
      )
    )
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return from(this.usersRepository.update(id, updateUserDto)).pipe(
      filter((result) => result.affected !== 1),
      switchMap(() =>
        throwError(() => new HttpException(`id: ${id} not found`, 204))
      )
    )
  }

  remove(id: string) {
    return from(this.usersRepository.delete(id)).pipe(
      filter((result) => result.affected !== 1),
      switchMap(() =>
        throwError(() => new HttpException(`id: ${id} not found`, 204))
      )
    )
  }
}
