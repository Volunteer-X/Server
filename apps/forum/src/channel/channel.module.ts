import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

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
import { ObjectIDResolver } from 'graphql-scalars';
import { PayloadResolver } from './payload.resolver';

@Module({
  imports: [
    MessageModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['**/channel.gql', 'libs/common/src/graphql/error.gql'],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      resolvers: {
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
