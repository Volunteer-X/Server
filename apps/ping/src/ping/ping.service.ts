import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreatePingInput, UPingInput } from './graphql/ping.schema';
import { PingRepository } from '../service/prisma.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import {
  GraphQLLatitude,
  GraphQLLongitude,
  GraphQLObjectID,
  GraphQLURL,
} from 'graphql-scalars';
import { BROADCAST_SERVICE, NEO4J_SERVICE } from '@app/common';
import { ObjectId } from 'bson';

@Injectable()
export class PingService {
  constructor(
    private readonly repository: PingRepository,
    @Inject(NEO4J_SERVICE) private neo4jClient: ClientProxy,
    @Inject(BROADCAST_SERVICE) private broadcastClient: ClientProxy,
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

    // try {
    //   await lastValueFrom(
    //     this.broadcastClient.emit<string, string>(
    //       'broadcastPing',
    //       JSON.stringify({
    //         id: result[0].id,
    //       }),
    //     ),
    //   );
    // } catch (error) {
    //   console.log('broadcast error', error);
    // }

    try {
      await lastValueFrom(
        this.neo4jClient.emit<string, string>(
          'pingCreated',
          JSON.stringify({
            id: result[0].id,
            userID: result[0].userID,
            picks: result[0].picks,
            point: [
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

    // try {
    //   await lastValueFrom(
    //     this.activityClient.emit<string, string>(
    //       'pingUpdated',
    //       JSON.stringify(result),
    //     ),
    //   );
    // } catch (error) {
    //   throw new Error(`Activity service error: ${error.message}`);
    // }

    const createdAt = new ObjectId(result.id).getTimestamp();

    const ping = {
      id: result.id,
      createdAt: createdAt,
      title: result.title,
      description: result.description,
      picks: result.picks,
      url: result.url && result.url,
      radius: result.radius,
      latitude: result.geometry.coordinates[0],
      longitude: result.geometry.coordinates[1],
      media: result.media,
      userID: result.userID,
      user: { __typename: 'User', id: result.userID },
    };

    return ping;
  }

  // Get Ping by ID
  async getPing(id: string, userID: string) {
    const result = await this.repository.ping.findUnique({
      where: {
        id,
        userID,
      },
    });

    const createdAt = new ObjectId(result.id).getTimestamp();

    const ping = {
      id: result.id,
      createdAt: createdAt,
      title: result.title,
      description: result.description,
      picks: result.picks,
      url: result.url && result.url,
      radius: result.radius,
      latitude: result.geometry.coordinates[0],
      longitude: result.geometry.coordinates[1],
      media: result.media,
      userID: result.userID,
      user: { __typename: 'User', id: result.userID },
    };

    return ping;
  }

  // Get all Pings
  async getAllPing(userID: string, first: number, after: string) {
    const cursor = after ? { id: after } : undefined;

    const result = await this.repository.ping.findMany({
      where: {
        userID,
      },
      take: first,
      cursor,
      orderBy: {
        id: 'asc',
      },
    });

    const pings = result.map((item) => ({
      id: item.id,
      createdAt: new ObjectId(item.id).getTimestamp(),
      title: item.title,
      description: item.description,
      picks: item.picks,
      url: item.url && item.url,
      radius: item.radius,
      latitude: item.geometry.coordinates[0],
      longitude: item.geometry.coordinates[1],
      media: item.media,
      userID: item.userID,
    }));

    return pings;
  }
}
