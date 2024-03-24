import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import {
  DateTimeResolver,
  EmailAddressResolver,
  LatitudeResolver,
  LongitudeResolver,
  ObjectIDResolver,
} from 'graphql-scalars';
import { NEO4J_SERVICE, RmqModule } from '@app/common';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AuthModule } from '@app/auth';
import { GraphQLError } from 'graphql';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { PayloadResolver } from './payload.resolver';
import { UserController } from './user.controller';
import { UserRepository } from './service/prisma.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['**/user.gql', 'libs/common/src/graphql/error.gql'],
      playground: false,
      path: 'user',
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      resolvers: {
        DateTime: DateTimeResolver,
        EmailAddress: EmailAddressResolver,
        ObjectID: ObjectIDResolver,
        Latitude: LatitudeResolver,
        Longitude: LongitudeResolver,
      },
      formatError: (error: GraphQLError) => {
        console.error(error);
        const originalError = error.extensions?.originalError as
          | { message: string; code: string }
          | undefined;

        if (!originalError) {
          return {
            message: error.message,
            code: error.extensions?.code,
          };
        }
        return {
          message: originalError.message,
          code: error.extensions?.code,
        };
      },
    }),
    AuthModule,
    // RmqModule,
    RmqModule.register({ name: [NEO4J_SERVICE] }),
  ],
  // controllers: [UserController],
  providers: [UserResolver, PayloadResolver, UserService, UserRepository],
})
export class UserModule {}
