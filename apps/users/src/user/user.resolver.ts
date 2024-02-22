import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import {
  CreateUserInput,
  EmailAddress,
  UnauthorizedError,
  UnknownError,
  UpdateUserInput,
} from './graphql/user.schema';
import { GraphQLEmailAddress, GraphQLObjectID } from 'graphql-scalars';
import { TUser, User } from 'libs/utils/entities';
import { Logger, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '@app/auth';

@Resolver('User')
export class UserResolver {
  constructor(private readonly usersService: UserService) {}
  private readonly logger = new Logger(UserResolver.name);

  wrapPayload<T>(T: unknown) {
    switch (T.constructor) {
      case UnauthorizedError:
        const unAuthorized = new UnauthorizedError();
        unAuthorized.message = 'Unauthorized';
        return unAuthorized;
      case Object:
        return T;
      default:
        const unknownError = new UnknownError();
        unknownError.message = 'Unknown error';
        return unknownError;
    }
  }

  @Query('getUser')
  @UseGuards(GqlAuthGuard)
  getUser(@CurrentUser() user: TUser) {
    return this.wrapPayload(user);

    // switch (user.constructor) {
    //   case UnauthorizedError:
    //     const unAuthorized = new UnauthorizedError();
    //     unAuthorized.message = 'Unauthorized';
    //     return unAuthorized;
    //   case Object:
    //     return user;
    //   default:
    //     const unknownError = new UnknownError();
    //     unknownError.message = 'Unknown error';
    //     return unknownError;
    // }
  }

  @Query('isUsernameAvailable')
  isUsernameAvailable(@Args('username') username: string) {
    return this.usersService.isUsernameAvailable(username);
  }

  @Query('getUserById')
  getUserById(
    @Args({ name: 'id', type: () => GraphQLObjectID })
    id: typeof GraphQLObjectID,
  ) {
    return this.usersService.findOne(GraphQLObjectID.parseValue(id));
  }

  @Mutation('createUser')
  create(@Args('payload') payload: CreateUserInput) {
    console.log('payload', payload);

    return this.usersService.createUser(payload);
  }

  @Mutation('updateUser')
  updateUser(@Args('payload') payload: UpdateUserInput) {
    return this.usersService.update(payload);
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: typeof GraphQLObjectID;
  }) {
    console.log('reference', reference);

    return this.usersService.findOne(GraphQLObjectID.parseValue(reference.id));
  }

  // @ResolveField('ping')
  // pings(@Parent() user: User) {
  //   this.logger.log('user', user);
  //   return { __typename: 'User', id: user.id };
  // }
}
