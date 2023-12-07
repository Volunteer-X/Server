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

import { PrismaModule } from '@app/prisma';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { NEO4J_SERVICE, RmqModule } from '@app/common';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['./**/*.gql'],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      resolvers: {
        DataTime: DateTimeResolver,
        EmailAddress: EmailAddressResolver,
        ObjectID: ObjectIDResolver,
      },
    }),
    PrismaModule.register({ logQueries: false }),
    RmqModule.register({ name: [NEO4J_SERVICE] }),
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
