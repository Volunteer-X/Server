import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { GraphQLCursor, InvalidInputError } from '@app/common';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ObjectIDResolver, PositiveIntResolver } from 'graphql-scalars';

import { ApolloServerErrorCode } from '@apollo/server/errors';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AuthModule } from '@app/auth';
import { ChannelController } from './channel.controller';
import { ChannelGateway } from './channel.gatway';
import { ChannelResolver } from './channel.resolver';
import { ChannelService } from './channel.service';
import { ForumRepository } from '../service/forum.service';
import { GraphQLModule } from '@nestjs/graphql';
import { MessageModule } from '../message/message.module';
import { MessageService } from '../message/message.service';
import { Module } from '@nestjs/common';
import { PayloadResolver } from './payload.resolver';

@Module({
  imports: [
    MessageModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['**/channel.gql', 'libs/common/src/graphql/*.gql'],
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
    ChannelGateway,
    MessageService,
    ForumRepository,
  ],
})
export class ChannelModule {}
