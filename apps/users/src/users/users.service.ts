import { Injectable } from '@nestjs/common';
import {
  CreateUserInput,
  EmailAddress,
  UpdateUserInput,
} from './graphql/user.schema';
import { GraphQLObjectID } from 'graphql-scalars';
import { InjectRepository, PrismaService } from '@app/prisma';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository('user')
    private readonly userRepo: PrismaService['user'],
  ) {}

  /* 
  ? Get user details by email
  */
  async getUserByEmail(email: EmailAddress) {
    return await this.userRepo.findUnique({
      where: { email: email.toString() },
    });
  }

  /*
   ? Create new user
   */
  async createUser(createUserInput: CreateUserInput) {
    return await this.userRepo.create({
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
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
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

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
