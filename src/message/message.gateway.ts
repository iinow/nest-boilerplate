import { firstValueFrom, from, lastValueFrom, Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Server } from 'socket.io'

import { Logger } from '@nestjs/common'
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets'

@WebSocketGateway({
  allowEIO3: true,
})
export class MessageGateway {
  private readonly logger = new Logger(MessageGateway.name)

  @WebSocketServer()
  server: Server

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any) {
    this.logger.debug(`events message: ${JSON.stringify(data)}`)

    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item }))
    )
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    this.logger.debug(`identity message: ${data}`)

    return data
  }
}
