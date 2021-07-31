import {
  getFacility,
  getFacilityCode,
  getMessageWithoutFacility,
} from './syslog'

describe('Syslog', () => {
  it('get facility then default FacilityType', () => {
    const message = 'daemon process'

    expect(getFacility(message)).toStrictEqual('console')
  })

  it('get facility then message FacilityType', () => {
    const message = '[USER] request login'

    expect(getFacility(message)).toStrictEqual('user')
  })

  it('get facility code then default FacilityType code', () => {
    const message = 'daemon process'

    expect(getFacilityCode(message)).toEqual(1)
  })

  it('get facility code then FacilityType code', () => {
    const message = '[USER] request login'

    expect(getFacilityCode(message)).toEqual(2)
  })

  it('get message without facility', () => {
    const message = '[USER] request login'

    expect(getMessageWithoutFacility(message)).toStrictEqual('request login')
  })

  it('get context contain message without facility', () => {
    const message = '[USER] request login'
    const contextName = 'RoutesResolver'

    expect(getMessageWithoutFacility(message, contextName)).toStrictEqual(
      `[${contextName}] request login`
    )
  })

  it('get context contain none facility message without facility', () => {
    const message = 'request login'
    const contextName = 'RoutesResolver'

    expect(getMessageWithoutFacility(message, contextName)).toStrictEqual(
      `[${contextName}] request login`
    )
  })
})
