import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ObjectIDResolver, PositiveIntResolver } from 'graphql-scalars';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AuthModule } from '@app/auth';
import { ChannelController } from './channel.controller';
import { ChannelResolver } from './channel.resolver';
import { ChannelService } from './channel.service';
import { ForumRepository } from '../service/forum.service';
import { GraphQLCursor } from '@app/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { PayloadResolver } from './payload.resolver';

@Module({
  imports: [
    // MessageModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      path: 'channel',
      driver: ApolloFederationDriver,
      typePaths: [
        'apps/forum/src/channel/**/*.gql',
        'libs/common/src/graphql/*.gql',
      ],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      resolvers: {
        ObjectID: ObjectIDResolver,
        PositiveInt: PositiveIntResolver,
        Cursor: GraphQLCursor,
      },
      formatError: (error: GraphQLError) => {
        console.table({
          code: error.extensions?.code,
          error: error,
        });

        const graphQLFormattedError: GraphQLFormattedError = {
          message: error?.message,
        };
        return graphQLFormattedError;
      },
    }),
    AuthModule,
  ],
  controllers: [ChannelController],
  providers: [
    ChannelResolver,
    PayloadResolver,
    ChannelService,
    // ChannelGateway,
    // MessageService,
    ForumRepository,
  ],
})
export class ChannelModule {}
