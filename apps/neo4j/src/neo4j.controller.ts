import { Controller } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Pattern } from '@app/common';
import { PingNode, RMQService, UserNode } from '@app/common';

@Controller()
export class Neo4jController {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly rmqService: RMQService,
  ) {}

  @EventPattern(Pattern.userCreated)
  async handleUserCreated(@Payload() user: string, @Ctx() context: RmqContext) {
    await this.neo4jService.createUser(JSON.parse(user) as UserNode);
    this.rmqService.ack(context);
  }

  @EventPattern(Pattern.pingCreated)
  async handlePingCreated(@Payload() ping: string, @Ctx() context: RmqContext) {
    await this.neo4jService.createPing(JSON.parse(ping) as PingNode);
    this.rmqService.ack(context);
  }

  @MessagePattern(Pattern.getPingsWithinRadius)
  async getPingsWithinRadius(@Payload() _payload: any) {
    const { payload, first, after, picks, userID } = _payload as {
      payload: any;
      first: number;
      after: string;
      picks: string[];
      userID: string;
    };

    const result = await this.neo4jService.getPingsWithinRadius(
      payload,
      first,
      after,
      picks,
      userID,
    );

    return result;
  }

  @EventPattern(Pattern.participantAdded)
  async handleParticipantAdded(
    @Payload() payload: { userID: string; id: string },
  ) {
    const { userID, id } = payload;

    await this.neo4jService.addParticipant(userID, id);
  }

  @EventPattern(Pattern.participantRemoved)
  async handleParticipantRemoved(
    @Payload() payload: { userID: string; id: string },
  ) {
    const { userID, id } = payload;

    await this.neo4jService.removeParticipant(userID, id);
  }

  @MessagePattern('test')
  async test(@Payload() payload: string) {
    return `Test successful:: ${payload}`;
  }
}
