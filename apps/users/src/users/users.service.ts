import { Inject, Injectable } from '@nestjs/common';
import {
  CreateUserInput,
  EmailAddress,
  UpdateUserInput,
} from './graphql/user.schema';
import { GraphQLObjectID } from 'graphql-scalars';
import { InjectRepository, PrismaService } from '@app/prisma';
import { lastValueFrom } from 'rxjs';

import { ClientProxy } from '@nestjs/microservices';
import { NEO4J_SERVICE } from '@app/common';

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
  async createUser(createUserInput: CreateUserInput) {
    const user = await this.userRepo.create({
      data: {
        email: createUserInput.email.toString(),
        username: createUserInput.username,
        role: createUserInput.role,
        name: {
          firstName: createUserInput.firstName,
          lastName: createUserInput.lastName,
        },
        picture: createUserInput.picture,
        picks: createUserInput.picks,
      },
    });

    // this.neo4jService.createUserNode({
    //   id: user.id,
    //   picks: user.picks,
    // });

    try {
      await lastValueFrom(
        this.neo4jClient.emit<string, string>(
          'newUserCreated',
          JSON.stringify({ id: user.id, picks: user.picks }),
        ),
      );
    } catch (error) {}

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

  update(id: typeof GraphQLObjectID, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }
}
