import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import {
  DateTimeResolver,
  EmailAddressResolver,
  ObjectIDResolver,
} from 'graphql-scalars';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['./**/*.gql'],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      subscriptions: {
        'graphql-ws': true,
      },
      resolvers: {
        DataTime: DateTimeResolver,
        Email: EmailAddressResolver,
        ObjectID: ObjectIDResolver,
      },
    }),
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
