import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/dist/esm/plugin/landingPage/default';
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
  ],
  providers: [],
})
export class PingModule {}
