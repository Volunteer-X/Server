import { Controller } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { PingNode, RMQService, UserNode } from '@app/common';

@Controller()
export class Neo4jController {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly rmqService: RMQService,
  ) {}

  @EventPattern('newUserCreated')
  async handleUserCreated(@Payload() user: string, @Ctx() context: RmqContext) {
    await this.neo4jService.createUser(JSON.parse(user) as UserNode);
    this.rmqService.ack(context);
  }

  @EventPattern('pingCreated')
  async handlePingCreated(@Payload() ping: string, @Ctx() context: RmqContext) {
    await this.neo4jService.createPing(JSON.parse(ping) as PingNode);
    this.rmqService.ack(context);
  }

  @MessagePattern('test')
  async test(@Payload() payload: string) {
    return `Test successful:: ${payload}`;
  }
}
