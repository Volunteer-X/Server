import { GraphQLObjectID } from 'graphql-scalars';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Membership } from '@prisma/client';
import {
  Failure,
  ForbiddenError,
  InternalServerError,
  NEO4J_SERVICE,
  NotFoundError,
  Pattern,
  Success,
} from '@app/common';
import {
  PartialWithRequired,
  User,
  UserCreateInput,
} from '../entity/user.entity';

import { ClientProxy } from '@nestjs/microservices';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserRepository } from './service/prisma.service';
import { lastValueFrom } from 'rxjs';
import { Neo4jCreateUserDto } from './dto/neo4jCreateUser.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(NEO4J_SERVICE) private readonly neo4jClient: ClientProxy,
  ) {}

  /**
   * Creates a new user.
   *
   * @param input - The input data for creating the user.
   * @returns A Promise that resolves to the created user entity.
   * @throws {ForbiddenError} If there is a Prisma error.
   * @throws {InternalServerError} If there is an internal server error.
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
      device,
    } = input;

    try {
      const result = await this.userRepository.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            email,
            username,
            name,
            picture,
            picks,
            devices: [device],
          },
        });

        const { id, devices } = user;

        const neo4jPayload = await lastValueFrom(
          this.neo4jClient.send<
            { data: object | string; success: boolean },
            Neo4jCreateUserDto
          >(Pattern.userCreated, {
            id,
            picks,
            longitude,
            latitude,
            devices,
          }),
        );

        if (!neo4jPayload.success) {
          throw new Error(neo4jPayload.data as string);
        }

        return user;
      });

      return User.ToEntityFromPrisma(result);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        return new ForbiddenError(`Prisma Error: ${error}`);
      }
      this.logger.error(`Error creating user: ${error.message}`);
      return new InternalServerError('Internal server error');
    }
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

    try {
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
    } catch (error) {
      this.logger.error(`Error updating user: ${error.message}`);
      return new InternalServerError(`Error updating user: ${error.message}`);
    }
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
      return new NotFoundError(`Error getting user by ID ${id}`);
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
