import { Module } from '@nestjs/common';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { ChannelResolver } from './channel.resolver';
import { ChannelGateway } from './channel.gatway';
import { ForumRepository } from '../service/prisma.service';
import { MessageModule } from '../message/message.module';
import { MessageService } from '../message/message.service';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ObjectIDResolver } from 'graphql-scalars';
import { AuthModule } from '@app/auth';

@Module({
  imports: [
    MessageModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['./**/channel.gql'],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      resolvers: {
        ObjectID: ObjectIDResolver,
      },
    }),
    AuthModule,
  ],
  controllers: [ChannelController],
  providers: [
    ChannelService,
    ChannelResolver,
    ChannelGateway,
    MessageService,
    ForumRepository,
  ],
})
export class ChannelModule {}
