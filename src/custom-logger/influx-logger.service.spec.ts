import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

import { InfluxLogger } from './influx-logger.service'

describe('InfluxLogger', () => {
  let service: InfluxLogger

  beforeEach(async () => {
    const mockObject = jest.fn()

    service = new mockObject()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
