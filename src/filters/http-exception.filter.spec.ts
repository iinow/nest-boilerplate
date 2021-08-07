import { HttpExceptionFilter } from './http-exception.filter'

describe('HttpExceptionFilter', () => {
  let httpExceptionFilter: HttpExceptionFilter

  beforeEach(async () => {
    httpExceptionFilter = new HttpExceptionFilter()
  })

  it('should be defined', () => {
    expect(httpExceptionFilter).toBeDefined()
  })
})
