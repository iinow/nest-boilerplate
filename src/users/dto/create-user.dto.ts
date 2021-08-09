import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

import { ProviderType } from '~/common/enums/provider'

import { Provider } from '../entities/provider.embedded'

export class CreateUserDto {
  @ApiProperty({
    example: 'haha@gmail.com',
    description: 'OAuth Provider email',
  })
  @Length(5, 100)
  @IsEmail()
  email?: string

  @ApiProperty({
    example: 'haha',
    description: 'OAuth Provider name',
  })
  @Length(2, 10)
  @IsNotEmpty()
  @IsString()
  name: string

  @ValidateNested()
  @ApiProperty({
    description: `Provider types: ${Object.keys(ProviderType)}`,
  })
  @IsNotEmpty()
  provider: Provider
}
