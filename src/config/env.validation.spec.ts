import 'reflect-metadata'

import { validate } from './env.validation'
import config from './index'

describe('EnvValidation', () => {
  let ymlConfig

  beforeEach(() => {
    ymlConfig = config()
  })

  it('should be defined', () => {
    expect(ymlConfig).toBeDefined()
  })

  it('environment variables validate', () => {
    expect(validate(ymlConfig)).toBeDefined()
  })
})
