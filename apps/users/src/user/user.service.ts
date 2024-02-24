import { GraphQLEmailAddress, GraphQLObjectID } from 'graphql-scalars';
import { Injectable, Logger } from '@nestjs/common';
import { NEO4J_SERVICE, Pattern } from '@app/common';
import { User, UserCreateInput } from '../entity/user.entity';

import { ClientProxy } from '@nestjs/microservices';
import { Membership } from '@prisma/client';
import { ObjectId } from 'bson';
import { UpdateUserInput } from './graphql/user.schema';
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
      // name: { firstName, middleName, lastName },
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
      this.logger.error('Error creating user', error);
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

  /* 
  ? Get user details by email
  */
  async getUserByEmail(email: string) {
    const result = await this.userRepository.user.findUnique({
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
  }

  async isUsernameAvailable(username: string) {
    const count = await this.userRepository.user.count({
      where: {
        username: username,
      },
    });

    return count > 0 ? false : true;
  }

  async update(payload: UpdateUserInput) {
    const {
      id,
      email,
      username,
      lastName,
      firstName,
      middleName,
      picks,
      picture,
      devices,
    } = payload;

    let dbResult;

    if (lastName || firstName || middleName) {
      dbResult = await this.userRepository.user.update({
        where: {
          id: GraphQLObjectID.parseValue(id),
        },
        data: {
          email: email ? GraphQLEmailAddress.parseValue(email) : undefined,
          username,
          name: {
            update: {
              firstName,
              lastName,
              middleName,
            },
          },
          picks,
          picture,
          devices,
        },
      });
    }

    dbResult = await this.userRepository.user.update({
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
  }

  async findOne(id: string) {
    console.log('id', id);

    const result = await this.userRepository.user.findUnique({
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
