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
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { NEO4J_SERVICE, RmqModule } from '@app/common';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { UserController } from './user.controller';

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
        ObjectID: ObjectIDResolver,
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
    RmqModule,
    RmqModule.register({ name: [NEO4J_SERVICE] }),
  ],
  controllers: [UserController],
  providers: [UserResolver, UserService],
})
export class UserModule {}
