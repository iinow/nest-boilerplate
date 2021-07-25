import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { CreateUserDto } from '../dto/create-user.dto'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @IsNotEmpty()
  @IsEmail()
  @Column()
  email: string

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string

  public static createUser(createUserDto: CreateUserDto): User {
    return {
      ...createUserDto,
    } as User
  }
}
