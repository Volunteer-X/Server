import {
  ApolloDriver,
  ApolloDriverConfig,
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ChannelModule } from './channel/channel.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MessageModule } from './message/message.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      path: 'message',
      typePaths: [
        'apps/forum/src/message/**/*.gql',
        'libs/common/src/graphql/*.gql',
      ],
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      include: [MessageModule],
    }),
    ChannelModule,
    // MessageModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/forum/.env',
      expandVariables: true,
    }),
  ],
})
export class AppModule {}
