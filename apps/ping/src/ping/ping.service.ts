import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreatePingInput, Media, UpdatePingInput } from './graphql/ping.schema';
import { PingRepository } from '../prisma/prisma.service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { TwitterSnowflake as Snowflake } from '@sapphire/snowflake';
import { GraphQLLatitude, GraphQLLongitude, GraphQLURL } from 'graphql-scalars';
import { ACTIVITY_SERVICE, NEO4J_SERVICE } from '@app/common';

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
          radius: radius ? radius : 200,
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

    try {
      await lastValueFrom(
        this.neo4jClient.emit<string, string>(
          'pingCreated',
          JSON.stringify({
            id: result[0].id,
            userID: result[0].userID,
            picks: result[0].picks,
            location: [
              result[0].geometry.coordinates[0],
              result[0].geometry.coordinates[1],
            ],
            radius: result[0].radius,
          }),
        ),
      );
    } catch (error) {
      throw new Error('Neo4j error');
    }

    return result[0].id;
  }

  async updatePing(input: UpdatePingInput) {
    const {
      id,
      url,
      title,
      description,
      picks,
      radius,
      media,
      latitude,
      longitude,
    } = input;

    const result = await this.repository.ping.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        picks,
        url: url && GraphQLURL.parseValue(url),
        geometry: latitude &&
          longitude && {
            type: 'Point',
            coordinates: [
              GraphQLLatitude.parseValue(latitude),
              GraphQLLongitude.parseValue(longitude),
            ],
          },
        radius,
        media,
      },
    });

    // update activity

    try {
      await lastValueFrom(
        this.activityClient.emit<string, string>(
          'pingUpdated',
          JSON.stringify(result),
        ),
      );
    } catch (error) {
      throw new Error(`Activity service error: ${error.message}`);
    }

    return result.id;
  }
}
