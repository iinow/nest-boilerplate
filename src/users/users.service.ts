import { InjectRedis, RedisService } from '@liaoliaots/nestjs-redis'
import { Redis } from 'ioredis'
import { filter, firstValueFrom, from, map, switchMap, throwError } from 'rxjs'
import { Connection, Repository } from 'typeorm'

import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
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

  findOne(id: number) {
    return this.usersRepository.findOne(id)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return from(this.usersRepository.update(id, updateUserDto)).pipe(
      filter((result) => result.affected !== 1),
      switchMap(() =>
        throwError(() => new HttpException(`id: ${id} not found`, 204))
      )
    )
  }

  remove(id: number) {
    return from(this.usersRepository.delete(id)).pipe(
      filter((result) => result.affected !== 1),
      switchMap(() =>
        throwError(() => new HttpException(`id: ${id} not found`, 204))
      )
    )
  }
}
