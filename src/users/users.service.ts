import { Connection, Repository } from 'typeorm'

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private connection: Connection
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.insert({
      firstName: 'haha',
      lastName: 'le',
      isActive: true,
    })
  }

  async createWithTransaction(createUserDto: CreateUserDto) {
    await this.connection.transaction(async (manager) => {
      await manager.save(new User())
    })
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
