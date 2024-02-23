import { ObjectId } from 'bson';

// type Ping = {
//   __typename: 'Ping';
//   id: string;
// };

type Name = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

/**
 * Maps user data between different representations.
 */
export class AuthEntity {
  id: string;
  createdAt: Date;
  name: Name;
  email: string;
  username: string;
  picture?: string;
  picks: string[];
  devices: string[];
  //   pings?: Ping[];
  activityCount: number;

  constructor(
    name: Name,
    email: string,
    username: string,
    picks: string[],
    devices: string[],
    picture?: string,
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
    this.activityCount = activityCount;
  }

  /**
   * Maps a Prisma result to a user entity.
   *
   * @param result The Prisma result.
   * @returns The user entity.
   */
  static ToEntityFromPrisma(result: any): AuthEntity {
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
      //   pings: result.pings.map(
      //     (ping: Ping): Ping => ({
      //       __typename: ping.__typename,
      //       id: ping.id,
      //     }),
      //   ),
      activityCount: result.pings.length,
    };
  }
}
