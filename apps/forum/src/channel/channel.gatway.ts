import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateMessage } from '../common/dto/message.dto';
import { MessageService } from '../message/message.service';

@WebSocketGateway(88, {
  namespace: 'chat',
  transports: ['websocket'],
  cors: { origin: '*' },
})
export class ChannelGateway {
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chat')
  handleMessage(@MessageBody() message: CreateMessage) {
    this.server.emit('chat', message);
    this.messageService.addMessage(message);
    // this.messageService
  }
}
