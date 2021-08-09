import { IsEnum, IsNotEmpty, Length } from 'class-validator'
import { Column, Unique } from 'typeorm'

import { ApiProperty } from '@nestjs/swagger'

import { ProviderType } from '~/common/enums/provider'

export class Provider {
  @ApiProperty({
    example: ProviderType.KAKAO,
    description: `Provider types: ${Object.keys(ProviderType)}`,
  })
  @Length(2, 2)
  @IsNotEmpty()
  @IsEnum(ProviderType)
  @Column({
    length: 2,
    name: 'providerType',
  })
  type: ProviderType

  @ApiProperty({
    example: 123123123,
    description: `Provider 고유 사용자 식별 번호`,
  })
  @IsNotEmpty()
  @Column({
    name: 'providerUserId',
  })
  userId: string
}
