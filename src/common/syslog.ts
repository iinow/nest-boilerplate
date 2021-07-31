import { FieldType } from 'influx'

export type SyslogLevel =
  | 'emerg'
  | 'alert'
  | 'crit'
  | 'err'
  | 'warning'
  | 'notice'
  | 'info'
  | 'debug'

export const SEVERITY_LEVEL_VALUES: { [key in SyslogLevel]: number } = {
  emerg: 0,
  alert: 1,
  crit: 2,
  err: 3,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7,
}

export const SYSLOG_SCHEMA = {
  measurement: 'syslog',
  fields: {
    version: FieldType.INTEGER,
    severity_code: FieldType.INTEGER,
    facility_code: FieldType.INTEGER,
    timestamp: FieldType.INTEGER,
    procid: FieldType.STRING,
    message: FieldType.STRING,
  },
  tags: ['severity', 'facility', 'host', 'hostname', 'appname'],
}

enum FacilityType {
  CONSOLE = 1,
  USER = 2,
}

const regexLogMessage = /^\[(.*)\](.*)$/

export function getFacility(message: string): string {
  const res = regexLogMessage.exec(message)
  if (res) {
    return res[1].toLowerCase()
  }
  return FacilityType[FacilityType.CONSOLE].toLowerCase()
}

export function getFacilityCode(message: string): number {
  const lowerCaseFacilityName = getFacility(message)
  return FacilityType[lowerCaseFacilityName.toUpperCase()]
}

export function getMessageWithoutFacility(
  message: string,
  context?: string
): string {
  const res = regexLogMessage.exec(message)
  if (res) {
    return context ? `[${context}] ${res[2].trim()}` : res[2].trim()
  }
  return context ? `[${context}] ${message.trim()}` : message.trim()
}
