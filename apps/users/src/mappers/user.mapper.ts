import {
  GraphQLEmailAddress,
  GraphQLLatitude,
  GraphQLLongitude,
} from 'graphql-scalars';

import { CreateUserInput } from '../user/graphql/user.schema';
import { ObjectId } from 'bson';

type Ping = {
  __typename: 'Ping';
  id: string;
};

type Name = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

/**
 * Maps user data between different representations.
 */
export class User {
  id: string;
  createdAt: Date;
  name: Name;
  email: string;
  username: string;
  picture?: string;
  picks: string[];
  devices: string[];
  pings?: Ping[];
  activityCount: number;

  constructor(
    name: Name,
    email: string,
    username: string,
    picks: string[],
    devices: string[],
    picture?: string,
    pings?: Ping[],
    id?: string,
    createdAt?: Date,
    activityCount?: number,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.name = name;
    this.email = email;
    this.username = username;
    this.picture = picture;
    this.picks = picks;
    this.devices = devices;
    this.pings = pings;
    this.activityCount = activityCount;
  }

  /**
   * Maps input data to a user entity.
   *
   * @param input The input data.
   * @returns The user entity.
   */
  static ToEntityFromInput(input: CreateUserInput): Omit<
    User,
    'id' | 'createdAt' | 'activityCount' | 'ping'
  > & {
    latitude: number;
    longitude: number;
  } {
    const user = new User(
      {
        firstName: input.firstName,
        lastName: input.lastName,
        middleName: input.middleName,
      },
      GraphQLEmailAddress.parseValue(input.email),
      input.username,
      input.picks,
      [input.device],
      input.picture,
    );

    return {
      ...user,
      latitude: GraphQLLatitude.parseValue(input.latitude),
      longitude: GraphQLLongitude.parseValue(input.longitude),
    };
  }

  static ToEntityFromPrisma(result: any): User {
    return {
      createdAt: new ObjectId(result.id).getTimestamp(),
      id: result.id,
      email: result.email,
      username: result.username,
      name: {
        firstName: result.name.firstName,
        middleName: result.name.middleName,
        lastName: result.name.lastName,
      },
      picture: result.picture,
      picks: result.picks,
      devices: result.devices,
      pings: result.pings.map(
        (ping: Ping): Ping => ({
          __typename: ping.__typename,
          id: ping.id,
        }),
      ),
      activityCount: result.pings.length,
    };
  }
}
