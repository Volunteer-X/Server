import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreatePingInput, Media, UpdatePingInput } from './graphql/ping.schema';
import { PingRepository } from '../prisma/prisma.service';
import { ACTIVITY_SERVICE, NEO4J_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { TwitterSnowflake as Snowflake } from '@sapphire/snowflake';
import { number } from 'joi';
import { GraphQLLatitude, GraphQLLongitude } from 'graphql-scalars';

@Injectable()
export class PingService {
  constructor(
    private readonly repository: PingRepository,
    @Inject(ACTIVITY_SERVICE) private activityClient: ClientProxy,
    @Inject(NEO4J_SERVICE) private neo4jClient: ClientProxy,
  ) {}

  private readonly logger = new Logger(PingService.name);

  /* 
  ? Create new Ping
  * @param {CreatePingInput} input
  * @returns {Ping}
  */
  async createPing(input: CreatePingInput) {
    const {
      title,
      description,
      userID,
      picks,
      latitude,
      longitude,
      url,
      radius,
    } = input;

    const result = await this.repository.$transaction([
      this.repository.ping.create({
        data: {
          id: Snowflake.generate().toString(),
          title,
          description,
          picks,
          url: url?.toString(),
          userID: userID.toString(),
          radius,
          geometry: {
            type: 'Point',
            coordinates: [
              GraphQLLatitude.parseValue(latitude),
              GraphQLLongitude.parseValue(longitude),
            ],
          },
        },
      }),
    ]);

    // await lastValueFrom(
    //   this.activityClient.emit<string, string>(
    //     'pingCreated',
    //     JSON.stringify(result[0]),
    //   ),
    // );

    // await lastValueFrom(
    //   this.neo4jClient.emit<string, string>(
    //     'pingCreated',
    //     JSON.stringify({
    //       id: result[0].id,
    //       userID: result[0].userID,
    //       picks: result[0].picks,
    //       location: [
    //         result[0].geometry.coordinates[0],
    //         result[0].geometry.coordinates[1],
    //       ],
    //       radius: result[0].radius,
    //     }),
    //   ),
    // );

    return result[0].id;
  }

  async updatePing(input: UpdatePingInput) {
    const { latitude, longitude } = input;

    const result = await this.repository.ping.update({
      where: {
        id: input.id,
      },
      data: {
        title: input.title,
        description: input.description,
        picks: input.picks,
        url: input.url.toString(),
        geometry: {
          type: 'Point',
          coordinates: [
            GraphQLLatitude.parseValue(latitude),
            GraphQLLongitude.parseValue(longitude),
          ],
        },
        radius: input.radius,
        media: input.media,
      },
    });

    // update activity

    return result;
  }
}
