import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  DateTimeResolver,
  LatitudeResolver,
  LongitudeResolver,
  ObjectIDResolver,
  URLResolver,
} from 'graphql-scalars';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { PingService } from './ping.service';
import { PingResolver } from './ping.resolver';
import { PingRepository } from 'apps/ping/src/service/prisma.service';
import {
  BROADCAST_SERVICE,
  NEO4J_SERVICE,
  RmqModule,
  USER_SERVICE,
} from '@app/common';
import { AuthModule } from '@app/auth';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['./**/ping.gql'],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      resolvers: {
        ObjectID: ObjectIDResolver,
        DateTime: DateTimeResolver,
        URL: URLResolver,
        Longitude: LongitudeResolver,
        Latitude: LatitudeResolver,
      },
    }),
    AuthModule,
    RmqModule.register({
      name: [BROADCAST_SERVICE, NEO4J_SERVICE, USER_SERVICE],
    }),
  ],
  providers: [PingService, PingResolver, PingRepository],
})
export class PingModule {}
