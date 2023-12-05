import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import {
  CreateUserInput,
  EmailAddress,
  UpdateUserInput,
} from './graphql/user.schema';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.createUser(createUserInput);
  }

  @Query('getUserByEmail')
  getUserByEmail(@Args('email') email: EmailAddress) {
    return this.usersService.getUserByEmail(email);
  }

  @Query('isUsernameAvailable')
  isUsernameAvailable(@Args('username') username: string) {
    return this.usersService.isUsernameAvailable(username);
  }

  @Mutation('updateUser')
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }
}
