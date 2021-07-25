import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({
    example: 'haha@gmail.com',
    description: 'OAuth Provider email',
  })
  @Length(5, 100)
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({
    example: 'haha',
    description: 'OAuth Provider name',
  })
  @Length(2, 10)
  @IsNotEmpty()
  @IsString()
  name: string
}
