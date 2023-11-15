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
import { PingRepository } from '../prisma/prisma.service';
import { RMQModule } from '@app/common';
import { ACTIVITY_SERVICE } from '../constants/services';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['./**/*.gql'],
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
    RMQModule.register({ name: ACTIVITY_SERVICE }),
  ],
  providers: [PingService, PingResolver, PingRepository],
})
export class PingModule {}
