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
  UpdateUserInput,
} from './graphql/user.schema';
import { GraphQLEmailAddress, GraphQLObjectID } from 'graphql-scalars';
import { User } from 'libs/utils/entities';
import { Logger } from '@nestjs/common';

@Resolver('User')
export class UserResolver {
  constructor(private readonly usersService: UserService) {}
  private readonly logger = new Logger(UserResolver.name);

  @Mutation('createUser')
  create(@Args('payload') payload: CreateUserInput) {
    console.log('payload', payload);

    return this.usersService.createUser(payload);
  }

  @Query('getUserByEmail')
  getUserByEmail(@Args('email') email: EmailAddress) {
    return this.usersService.getUserByEmail(
      GraphQLEmailAddress.parseValue(email),
    );
  }

  @Query('isUsernameAvailable')
  isUsernameAvailable(@Args('username') username: string) {
    return this.usersService.isUsernameAvailable(username);
  }

  @Query('getUser')
  findOne(
    @Args({ name: 'id', type: () => GraphQLObjectID })
    id: typeof GraphQLObjectID,
  ) {
    return this.usersService.findOne(GraphQLObjectID.parseValue(id));
  }

  @Mutation('updateUser')
  update(@Args('payload') payload: UpdateUserInput) {
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

  @ResolveField('ping')
  pings(@Parent() user: User) {
    this.logger.log('user', user);
    return { __typename: 'User', id: user.id };
  }

  // @ResolveField('user')
  // user(@Parent() ping: Ping) {
  //   this.logger.log('ping', ping.userID);
  //   return { __typename: 'User', id: ping.userID };
  // }
}
