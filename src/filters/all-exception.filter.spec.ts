import { ArgumentsHost, HttpException } from '@nestjs/common'

import { AllExceptionFilter } from './all-exception.filter'

describe('HttpExceptionFilter', () => {
  let allExceptionFilter: AllExceptionFilter

  beforeEach(async () => {
    allExceptionFilter = new AllExceptionFilter()
  })

  it('should be defined', () => {
    expect(allExceptionFilter).toBeDefined()
  })
})
