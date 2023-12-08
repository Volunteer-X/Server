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
import { PingRepository } from '../service/prisma.service';
import { ACTIVITY_SERVICE, NEO4J_SERVICE, RmqModule } from '@app/common';

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
    RmqModule.register({ name: [ACTIVITY_SERVICE, NEO4J_SERVICE] }),
  ],
  providers: [PingService, PingResolver, PingRepository],
})
export class PingModule {}
