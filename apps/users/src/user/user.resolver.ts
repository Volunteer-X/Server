import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import {
  CreateUserInput,
  IQuery,
  NotFoundError,
  UpdateUserInput,
  UserPayload,
} from './graphql/user.schema';
import { GraphQLObjectID } from 'graphql-scalars';
import { TUser } from '@app/common/utils/entities';
import { Logger, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '@app/auth';
import { WrappedPayload } from '../common';
import { User } from '@user/entity/user.entity';
import { GraphQLScalarType } from 'graphql';

@Resolver('User')
export class UserResolver {
  constructor(private readonly usersService: UserService) {}
  private readonly logger = new Logger(UserResolver.name);
  private readonly wrapPayload = new WrappedPayload();

  @Query('user')
  @UseGuards(GqlAuthGuard)
  getUser(@CurrentUser() user: TUser) {
    return this.wrapPayload.wrap(user);
  }

  @Query('isUsernameAvailable')
  isUsernameAvailable(@Args('username') username: string) {
    return this.usersService.isUsernameAvailable(username);
  }

  @Query('userById')
  async getUserById(
    @Args({ name: 'id' })
    id: typeof GraphQLObjectID,
  ) {
    const result = await this.usersService.getUserById(
      GraphQLObjectID.parseValue(id),
    );

    return this.wrapPayload.wrap(result);
  }

  @Mutation('createUser')
  async create(@Args('payload') payload: CreateUserInput) {
    const result = await this.usersService.createUser(
      User.ToEntityFromInput(payload),
    );
    return this.wrapPayload.wrap(result);
  }

  @Mutation('updateUser')
  updateUser(@Args('payload') payload: UpdateUserInput) {
    return this.usersService.update(User.ToEntityFromUpdate(payload));
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: typeof GraphQLObjectID;
  }) {
    return this.usersService.getUserById(
      GraphQLObjectID.parseValue(reference.id),
    );
  }

  // @ResolveField('ping')
  // pings(@Parent() user: User) {
  //   this.logger.log('user', user);
  //   return { __typename: 'User', id: user.id };
  // }
}
