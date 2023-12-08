import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { DateTimeResolver, EmailAddressResolver } from 'graphql-scalars';

import { PrismaModule } from '@app/prisma';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { NEO4J_SERVICE, RmqModule } from '@app/common';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['**/user.gql'],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      resolvers: {
        DataTime: DateTimeResolver,
        EmailAddress: EmailAddressResolver,
      },
      formatError: (error: GraphQLError) => {
        console.log(error);
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error?.message,
        };
        return graphQLFormattedError;
      },
    }),
    PrismaModule.register({ logQueries: false }),
    RmqModule.register({ name: [NEO4J_SERVICE] }),
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
