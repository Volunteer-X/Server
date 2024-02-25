import { GraphQLEmailAddress, GraphQLObjectID } from 'graphql-scalars';
import { Injectable, Logger } from '@nestjs/common';
import {
  InternalServerError,
  NotFoundError,
  UpdateUserInput,
} from './graphql/user.schema';
import { Membership, Prisma } from '@prisma/client';
import { NEO4J_SERVICE, Pattern } from '@app/common';
import {
  PartialWithRequired,
  User,
  UserCreateInput,
} from '../entity/user.entity';

import { ClientProxy } from '@nestjs/microservices';
import { ObjectId } from 'bson';
import { UserRepository } from './service/prisma.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly userRepository: UserRepository,
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
      this.logger.error(`Error creating user: ${error.message}`);
      return new InternalServerError();
    }

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
  }

  /**
   * Checks if a username is available.
   * @param username - The username to check.
   * @returns A boolean indicating whether the username is available or not.
   */
  async isUsernameAvailable(username: string) {
    const count = await this.userRepository.user.count({
      where: {
        username: username,
      },
    });

    return count > 0 ? false : true;
  }

  async update(payload: PartialWithRequired<User, 'id'>) {
    const { id, email, username, name, picks, picture, devices } = payload;

    const result = await this.userRepository.user.update({
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
  }

  async getUserById(id: string) {
    try {
      const result = await this.userRepository.user.findUniqueOrThrow({
        where: {
          id: GraphQLObjectID.parseValue(id),
        },
      });

      return User.ToEntityFromPrisma(result);
    } catch (error) {
      this.logger.log(`Error getting user by ID: ${id}. ${error}`);
      return new NotFoundError();
    }
  }

  async getUserDevices(users: string[]) {
    try {
      const result = await this.userRepository.user.findMany({
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
      await this.userRepository.user.update({
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
      const exisitngPings = await this.userRepository.user.findUnique({
        where: {
          id: GraphQLObjectID.parseValue(userID),
        },
        select: {
          pings: true,
        },
      });

      const updatedPing = exisitngPings.pings.filter((ping) => ping.id !== id);

      await this.userRepository.user.update({
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
