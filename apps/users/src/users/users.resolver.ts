import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import {
  CreateUserInput,
  EmailAddress,
  UpdateUserInput,
} from './graphql/user.schema';
import { GraphQLEmailAddress, GraphQLObjectID } from 'graphql-scalars';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

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
    return this.usersService.update(
      GraphQLObjectID.parseValue(payload.id),
      payload,
    );
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: typeof GraphQLObjectID;
  }) {
    console.log('reference', reference);

    return this.usersService.findOne(GraphQLObjectID.parseValue(reference.id));
  }

  // @ResolveField('Ping')
  // getPing(@Parent() user: User) {
  //   return { __typename: 'User', id: user.pings. };
  // }
}
