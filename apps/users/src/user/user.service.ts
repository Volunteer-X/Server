import {
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UpdateUserInput,
} from './graphql/user.schema';
import { GraphQLEmailAddress, GraphQLObjectID } from 'graphql-scalars';
import { Injectable, Logger } from '@nestjs/common';
import { Membership, Prisma } from '@prisma/client';
import { NEO4J_SERVICE, Pattern } from '@app/common';
import {
  PartialWithRequired,
  User,
  UserCreateInput,
} from '../entity/user.entity';

import { ClientProxy } from '@nestjs/microservices';
import { ObjectId } from 'bson';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserRepository } from './service/prisma.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
<<<<<<< HEAD
    private readonly repository: UserRepository,
=======
    private readonly userRepository: UserRepository,
>>>>>>> 8af9ac5b04fea04a28945a2c943ff2d7a73b6132
    // @Inject(NEO4J_SERVICE) private readonly neo4jClient: ClientProxy,
  ) {}
  /*
   ? Create new user
   */
  async createUser(input: UserCreateInput) {
    const {
      email,
      username,
      name,
      picks,
      picture,
      latitude,
      longitude,
      devices,
    } = input;

<<<<<<< HEAD
    const result = await this.repository.user.create({
      data: {
        email,
        username,
        name,
        // name: {
        //   firstName,
        //   middleName,
        //   lastName,
        // },
        picture,
        picks,
        devices,
      },
    });
=======
    try {
      const result = await this.userRepository.user.create({
        data: {
          email,
          username,
          name,
          picture,
          picks,
          devices,
        },
      });
      return User.ToEntityFromPrisma(result);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return new ForbiddenError();
        }
      }
      // this.logger.error(`Error creating user: ${error.message}`);
      return new InternalServerError();
    }
>>>>>>> 8af9ac5b04fea04a28945a2c943ff2d7a73b6132

    // try {
    //   await lastValueFrom(
    //     this.neo4jClient.emit<string, string>(
    //       Pattern.userCreated,
    //       JSON.stringify({
    //         id: result.id,
    //         picks: picks,
    //         longitude,
    //         latitude,
    //         devices: [device],
    //       }),
    //     ),
    //   );
    // } catch (error) {
    //   console.log('Neo4J error', error);
    // }
<<<<<<< HEAD

    return User.ToEntityFromPrisma(result);

    // const user = {
    //   createdAt: new ObjectId(result.id).getTimestamp(),
    //   id: result.id,
    //   email: result.email,
    //   username: result.username,
    //   name: {
    //     firstName: result.name.firstName,
    //     middleName: result.name.middleName,
    //     lastName: result.name.lastName,
    //   },
    //   picture: result.picture,
    //   picks: result.picks,
    //   devices: result.devices,
    // };

    // return user;
  }

  /* 
  ? Get user details by email
  */
  async getUserByEmail(email: string) {
    const result = await this.repository.user.findUnique({
      where: { email: email },
    });

    const user: User = {
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
      pings: result.pings.map((ping) => ({
        __typename: 'Ping',
        id: ping.id,
      })),
      activityCount: result.pings.length,
    };

    return user;
=======
>>>>>>> 8af9ac5b04fea04a28945a2c943ff2d7a73b6132
  }

  /**
   * Checks if a username is available.
   * @param username - The username to check.
   * @returns A boolean indicating whether the username is available or not.
   */
  async isUsernameAvailable(username: string) {
<<<<<<< HEAD
    const count = await this.repository.user.count({
=======
    const count = await this.userRepository.user.count({
>>>>>>> 8af9ac5b04fea04a28945a2c943ff2d7a73b6132
      where: {
        username: username,
      },
    });

    return count > 0 ? false : true;
  }

  async update(payload: PartialWithRequired<User, 'id'>) {
    const { id, email, username, name, picks, picture, devices } = payload;

<<<<<<< HEAD
    let dbResult;

    if (lastName || firstName || middleName) {
      dbResult = await this.repository.user.update({
=======
    try {
      const result = await this.userRepository.user.update({
>>>>>>> 8af9ac5b04fea04a28945a2c943ff2d7a73b6132
        where: {
          id,
        },
        data: {
          email: email,
          username,
          name: {
            update: {
              firstName: name?.firstName,
              lastName: name?.lastName,
              middleName: name?.middleName,
            },
          },
          picks,
          picture,
          devices,
        },
      });

      return User.ToEntityFromPrisma(result);
    } catch (error) {
      this.logger.error(`Error updating user: ${error.message}`);
      return new InternalServerError();
    }
<<<<<<< HEAD

    dbResult = await this.repository.user.update({
      where: {
        id: GraphQLObjectID.parseValue(id),
      },
      data: {
        email: email ? GraphQLEmailAddress.parseValue(email) : undefined,
        username,
        picks,
        picture,
        devices,
      },
    });

    const updatedUser = {
      createdAt: new ObjectId(dbResult.id).getTimestamp(),
      id: dbResult.id,
      email: dbResult.email,
      username: dbResult.username,
      name: {
        firstName: dbResult.name.firstName,
        middleName: dbResult.name.middleName,
        lastName: dbResult.name.lastName,
      },
      picture: dbResult.picture,
      picks: dbResult.picks,
      devices: dbResult.devices,
    };

    return updatedUser;
=======
>>>>>>> 8af9ac5b04fea04a28945a2c943ff2d7a73b6132
  }

  async getUserById(id: string) {
    try {
      const result = await this.userRepository.user.findUniqueOrThrow({
        where: {
          id: GraphQLObjectID.parseValue(id),
        },
      });

<<<<<<< HEAD
    const result = await this.repository.user.findUnique({
      where: {
        id: GraphQLObjectID.parseValue(id),
      },
    });

    const { id: _id, email, username, name, picks, picture } = result;

    return {
      _id,
      email,
      username,
      name,
      picks,
      picture,
      createdAt: new ObjectId(id).getTimestamp(),
    };
=======
      return User.ToEntityFromPrisma(result);
    } catch (error) {
      this.logger.log(`Error getting user by ID: ${id}. ${error}`);
      return new NotFoundError();
    }
>>>>>>> 8af9ac5b04fea04a28945a2c943ff2d7a73b6132
  }

  async getUserDevices(users: string[]) {
    try {
<<<<<<< HEAD
      const result = await this.repository.user.findMany({
=======
      const result = await this.userRepository.user.findMany({
>>>>>>> 8af9ac5b04fea04a28945a2c943ff2d7a73b6132
        where: {
          id: {
            in: users,
          },
        },
        select: {
          devices: true,
        },
      });

      return result
        .filter((user) => user.devices.length > 0)
        .flatMap((user) => user.devices);
    } catch (error) {
      console.log('error', error);
    }
  }

  async addMembership(userID: string, id: string, membership: Membership) {
    try {
<<<<<<< HEAD
      await this.repository.user.update({
=======
      await this.userRepository.user.update({
>>>>>>> 8af9ac5b04fea04a28945a2c943ff2d7a73b6132
        where: {
          id: userID,
        },
        data: {
          pings: {
            push: [
              {
                id,
                membership,
              },
            ],
          },
        },
      });
    } catch (error) {
      console.log('Add membership', error);
    }
  }

  async removeMembership(userID: string, id: string) {
    try {
<<<<<<< HEAD
      const exisitngPings = await this.repository.user.findUnique({
=======
      const exisitngPings = await this.userRepository.user.findUnique({
>>>>>>> 8af9ac5b04fea04a28945a2c943ff2d7a73b6132
        where: {
          id: GraphQLObjectID.parseValue(userID),
        },
        select: {
          pings: true,
        },
      });

      const updatedPing = exisitngPings.pings.filter((ping) => ping.id !== id);

<<<<<<< HEAD
      await this.repository.user.update({
=======
      await this.userRepository.user.update({
>>>>>>> 8af9ac5b04fea04a28945a2c943ff2d7a73b6132
        where: {
          id: GraphQLObjectID.parseValue(userID),
        },
        data: {
          pings: updatedPing,
        },
      });
    } catch (error) {
      console.log('Remove membership', error);
    }
  }
}
