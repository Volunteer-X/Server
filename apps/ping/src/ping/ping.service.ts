import { Injectable } from '@nestjs/common';
import { CreatePingInput } from './graphql/ping.schema';
import { PingPrismaService } from '../db/prisma.service';

@Injectable()
export class PingService {
  constructor(private readonly pingRepo: PingPrismaService['ping']) {}

  /* 
  ? Create new Ping
  */
  async createPing(input: CreatePingInput) {
    // this.pingRepo.findUnique({});
  }
}
