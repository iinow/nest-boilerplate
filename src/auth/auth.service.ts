import { firstValueFrom, from } from 'rxjs'

import { Injectable } from '@nestjs/common'

import { ProviderType } from '~/common/enums/provider'
import { CreateUserDto } from '~/users/dto/create-user.dto'
import { User } from '~/users/entities/user.entity'
import { UsersService } from '~/users/users.service'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  validateUser(userDto: CreateUserDto): Promise<User> {
    return firstValueFrom(from(this.usersService.upsert(userDto)).pipe())
  }
}
