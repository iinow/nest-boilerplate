/* eslint-disable prefer-rest-params */
import { ConsoleLogger, Injectable } from '@nestjs/common'

@Injectable()
export class CustomLogger extends ConsoleLogger {}
