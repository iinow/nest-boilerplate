/* eslint-disable prefer-rest-params */
import { InfluxDB } from 'influx'
import { hostname, networkInterfaces } from 'os'

import { ConsoleLogger, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import {
  getFacility,
  getFacilityCode,
  getMessageWithoutFacility,
  SEVERITY_LEVEL_VALUES,
  SyslogLevel,
  SYSLOG_SCHEMA,
} from '~/common/syslog'
import { Influx } from '~/config/types/env.types'

@Injectable()
export class InfluxLogger extends ConsoleLogger {
  private influx: InfluxDB

  constructor(configService: ConfigService) {
    super()
    const option = configService.get<Influx>(Influx.name.toLowerCase())
    this.influx = new InfluxDB({
      ...option,
      schema: [SYSLOG_SCHEMA],
    })
  }

  influxLog(level: SyslogLevel, message: string, context?: string) {
    const now = new Date().getTime() * 1000 * 1000

    const ipAddrs = networkInterfaces()['en0']?.filter(
      (net) => net.family === 'IPv4'
    )

    this.influx.writePoints([
      {
        measurement: 'syslog',
        timestamp: now,
        fields: {
          version: 1,
          severity_code: SEVERITY_LEVEL_VALUES[level],
          facility_code: getFacilityCode(message),
          timestamp: now,
          procid: process.ppid,
          message: getMessageWithoutFacility(message, context),
        },
        tags: {
          appname: process.env['npm_package_name'],
          facility: getFacility(message),
          host: ipAddrs.map((net) => net.address)[0],
          hostname: hostname(),
          severity: level,
        },
      },
    ])
  }

  debug(message: any, context?: string): void {
    this.influxLog('debug', message, context)
    super.debug.apply(this, arguments)
  }

  log(message: any, context?: string): void {
    this.influxLog('notice', message, context)
    super.log.apply(this, arguments)
  }

  warn(message: any, context?: string): void {
    this.influxLog('warning', message, context)
    super.warn.apply(this, arguments)
  }

  error(message: any, stack?: string, context?: string): void {
    this.influxLog('err', message, context)
    super.error.apply(this, arguments)
  }

  verbose(message: any, context?: string): void {
    this.influxLog('debug', message, context)
    super.verbose.apply(this, arguments)
  }
}
