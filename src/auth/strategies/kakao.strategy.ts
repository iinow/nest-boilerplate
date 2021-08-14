import { Profile, Strategy } from 'passport-kakao'

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'

import { getEnumName, ProviderType } from '~/common/enums/provider'
import { Provider } from '~/config/types/env.types'

import { AuthService } from '../auth.service'

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService
  ) {
    super({
      ...configService.get<Provider>(Provider.name.toLowerCase())[
        getEnumName(ProviderType, 'KAKAO').toLowerCase()
      ],
    })
  }

  validate(
    req: Express.Request,
    accessToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void
  ) {
    return this.authService.validateUser({
      name: profile.username,
      provider: {
        type: ProviderType.KAKAO,
        userId: profile.id,
      },
    })
  }
}
