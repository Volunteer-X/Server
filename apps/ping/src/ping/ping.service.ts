import { Injectable } from '@nestjs/common';
import { CreatePingInput } from './graphql/ping.schema';
import { InjectRepository } from '@app/prisma';

@Injectable()
export class PingService {
  constructor(
    @InjectRepository('ping')
  ) {}

  /* 
  ? Create new Ping
  */
  async createPing(input: CreatePingInput) {}
}
