import {
  CreateUserInput as GraphQLCreateInput,
  UpdateUserInput,
} from '../user/graphql/user.schema';
import {
  GraphQLEmailAddress,
  GraphQLLatitude,
  GraphQLLongitude,
  GraphQLObjectID,
} from 'graphql-scalars';

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

export type UserCreateInput = Omit<
  User,
  'id' | 'createdAt' | 'activityCount' | 'ping'
> & {
  latitude: number;
  longitude: number;
};

/**
 * Represents a type that ensures at least one property of the given type is present.
 * @template T - The type to check for at least one property.
 * @template U - The intermediate type used for checking.
 */
type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

/**
 * Represents a type that makes all properties optional from type T, except for the properties specified by R.
 * At least one property from the remaining properties is required.
 * @template T - The original type.
 * @template R - The properties to exclude from the required properties.
 */
export type PartialWithRequired<T, R extends keyof T> = AtLeastOne<Omit<T, R>> &
  Required<Pick<T, R>>;

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
  static ToEntityFromInput(input: GraphQLCreateInput): UserCreateInput {
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

  /**
   * Maps update input data to a user entity.
   *
   * @param input The input data.
   * @returns The user entity.
   */
  static ToEntityFromUpdate(
    input: UpdateUserInput,
  ): PartialWithRequired<User, 'id'> {
    return {
      id: GraphQLObjectID.parseValue(input.id),
      name: {
        firstName: input.firstName,
        lastName: input.lastName,
        middleName: input.middleName,
      },
      email: input.email && GraphQLEmailAddress.parseValue(input.email),
      username: input.username,
      picture: input.picture,
      picks: input.picks,
      devices: input.devices,
      pings:
        input.pings &&
        input.pings.map((id) => ({
          __typename: 'Ping',
          id: id,
        })),
    };
  }

  /**
   * Maps a Prisma result to a user entity.
   *
   * @param result The Prisma result.
   * @returns The user entity.
   */
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
      pings:
        result.pings &&
        result.pings.map(
          (ping: Ping): Ping => ({
            __typename: ping.__typename,
            id: ping.id,
          }),
        ),
      activityCount: result.pings && result.pings.length,
    };
  }
}
