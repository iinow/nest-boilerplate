import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator'
import {
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { v4 as uuid } from 'uuid'

import { CreateUserDto } from '../dto/create-user.dto'
import { Provider } from './provider.embedded'

@Unique('USER_PROVIDER_KEY', ['provider.type', 'provider.userId'])
@Entity()
export class User {
  @PrimaryColumn({
    insert: true,
    length: 36,
  })
  id: string = uuid()

  @IsEmail()
  @Column({
    nullable: true,
  })
  email?: string

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string

  @ValidateNested()
  @IsNotEmpty()
  @Column(() => Provider, { prefix: false })
  provider: Provider

  public static createUser(createUserDto: CreateUserDto): User {
    return {
      ...createUserDto,
    } as User
  }
}
