import { Inject, Injectable } from '@nestjs/common';
import {
  CreateUserInput,
  EmailAddress,
  UpdateUserInput,
} from './graphql/user.schema';
import { GraphQLEmailAddress, GraphQLObjectID } from 'graphql-scalars';
import { InjectRepository, PrismaService } from '@app/prisma';
import { lastValueFrom } from 'rxjs';

import { ClientProxy } from '@nestjs/microservices';
import { NEO4J_SERVICE } from '@app/common';
import { TwitterSnowflake } from '@sapphire/snowflake';
import { ID } from '@nestjs/graphql';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository('user')
    private readonly userRepo: PrismaService['user'],
    @Inject(NEO4J_SERVICE) private readonly neo4jClient: ClientProxy,
  ) {}

  /* 
  ? Get user details by email
  */
  async getUserByEmail(email: EmailAddress) {
    console.log('email', email);

    const user = await this.userRepo.findUnique({
      where: { email: email.toString() },
    });

    console.log('user', user);

    return user;
  }

  /*
   ? Create new user
   */
  async createUser(input: CreateUserInput) {
    const {
      email,
      username,
      firstName,
      lastName,
      picks,
      picture,
      latitude,
      longitude,
    } = input;

    const user = await this.userRepo.create({
      data: {
        id: TwitterSnowflake.generate().toString(),
        email: GraphQLEmailAddress.parseValue(email),
        username,
        name: {
          firstName,
          lastName,
        },
        picture,
        picks,
      },
    });

    // try {
    //   await lastValueFrom(
    //     this.neo4jClient.emit<string, string>(
    //       'newUserCreated',
    //       JSON.stringify({
    //         id: user.id,
    //         picks: picks,
    //         longitude,
    //         latitude,
    //       }),
    //     ),
    //   );
    // } catch (error) {}

    return user;
  }

  async isUsernameAvailable(username: string) {
    const count = await this.userRepo.count({
      where: {
        username: username,
      },
    });

    return count > 0 ? false : true;
  }

  update(id: string, payload: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  async findOne(id: string) {
    console.log('id', id);

    return this.userRepo.findUnique({
      where: {
        id: id,
      },
    });
  }
}
