import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessage } from '../message/dto/createMessage.dto';
import { MessageService } from '../message/message.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  // namespace: 'chat',
  transports: ['websocket'],
  cors: { origin: '*' },
})
export class ChannelGateway implements OnGatewayConnection, OnGatewayInit {
  private readonly connectionClients: Map<string, Socket> = new Map();
  private readonly logger = new Logger(ChannelGateway.name);

  constructor(private readonly messageService: MessageService) {}
  afterInit(server: any) {
    this.logger.log('Gateway Init');
  }
  handleConnection(client: Socket, ...args: any[]) {
    const clientID = client.id;
    this.connectionClients.set(clientID, client);

    this.logger.log(`Client connected: ${clientID}`);

    this.logger.log(client.connected);

    // client.on('disconnect', () => {
    //   this.connectionClients.delete(clientID);
    // });
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string) {
    console.log('message', message);

    this.server.emit('message', `Recieved message:: ${message}`);
    // this.messageService.addMessage(message);
    // this.messageService
  }
}
