import { Controller, UseFilters } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Pattern } from '@app/common';
import { PingNode, RMQService } from '@app/common';
import { Neo4jErrorFilter } from '@app/neo4j';
import { CreateUserPayload } from '../dto/CreateUserPayload.dto';

@Controller()
export class Neo4jController {
  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly rmqService: RMQService,
  ) {}

  @UseFilters(new Neo4jErrorFilter())
  @MessagePattern(Pattern.userCreated)
  async handleUserCreated(
    @Payload() user: CreateUserPayload,
    @Ctx() context: RmqContext,
  ) {
    this.rmqService.ack(context);
    return await this.neo4jService.createUser(user);
  }

  @EventPattern(Pattern.pingCreated)
  async handlePingCreated(@Payload() ping: string, @Ctx() context: RmqContext) {
    await this.neo4jService.createPing(JSON.parse(ping) as PingNode);
    this.rmqService.ack(context);
  }

  @MessagePattern(Pattern.getPingsWithinRadius)
  async getPingsWithinRadius(
    @Payload() _payload: any,
    @Ctx() context: RmqContext,
  ) {
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

    this.rmqService.ack(context);

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
