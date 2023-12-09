import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreatePingInput, Ping, UPingInput } from './graphql/ping.schema';
import { PingRepository } from '../service/prisma.service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { TwitterSnowflake as Snowflake } from '@sapphire/snowflake';
import {
  GraphQLLatitude,
  GraphQLLongitude,
  GraphQLObjectID,
  GraphQLURL,
} from 'graphql-scalars';
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
  async createPing(payload: CreatePingInput) {
    const {
      title,
      description,
      userID,
      picks,
      latitude,
      longitude,
      url,
      radius,
    } = payload;

    const result = await this.repository.$transaction([
      this.repository.ping.create({
        data: {
          title,
          description,
          picks,
          url: url && url.toString(),
          userID: GraphQLObjectID.parseValue(userID),
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

    // try {
    //   await lastValueFrom(
    //     this.neo4jClient.emit<string, string>(
    //       'pingCreated',
    //       JSON.stringify({
    //         id: result[0].id,
    //         userID: result[0].userID,
    //         picks: result[0].picks,
    //         location: [
    //           result[0].geometry.coordinates[0],
    //           result[0].geometry.coordinates[1],
    //         ],
    //         radius: result[0].radius,
    //       }),
    //     ),
    //   );
    // } catch (error) {
    //   throw new Error('Neo4j error');
    // }

    const ping = {
      id: result[0].id,
      title: result[0].title,
      description: result[0].description,
      picks: result[0].picks,
      url: result[0].url,
      radius: result[0].radius,
      latitude: result[0].geometry.coordinates[0],
      longitude: result[0].geometry.coordinates[1],
      media: result[0].media,
      userID: result[0].userID,
      user: { __typename: 'User', id: result[0].userID },
    };

    return ping;
  }

  async updatePing(id: string, payload: UPingInput) {
    const {
      url,
      title,
      description,
      picks,
      radius,
      media,
      latitude,
      longitude,
    } = payload;

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
