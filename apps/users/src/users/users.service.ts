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
import { ObjectId } from 'bson';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository('user')
    private readonly userRepo: PrismaService['user'],
    @Inject(NEO4J_SERVICE) private readonly neo4jClient: ClientProxy,
  ) {}
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

    const result = await this.userRepo.create({
      data: {
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

    try {
      await lastValueFrom(
        this.neo4jClient.emit<string, string>(
          'newUserCreated',
          JSON.stringify({
            id: result.id,
            picks: picks,
            longitude,
            latitude,
          }),
        ),
      );
    } catch (error) {
      console.log('error', error);
    }

    const user = {
      createdAt: new ObjectId(result.id).getTimestamp(),
      id: result.id,
      email: result.email,
      username: result.username,
      name: {
        firstName: result.name.firstName,
        lastName: result.name.lastName,
      },
      picture: result.picture,
      picks: result.picks,
    };

    return user;
  }

  /* 
  ? Get user details by email
  */
  async getUserByEmail(email: string) {
    console.log('email', email);

    const user = await this.userRepo.findUnique({
      where: { email: email },
    });

    console.log('user', user);

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

    const result = await this.userRepo.findUnique({
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
}
