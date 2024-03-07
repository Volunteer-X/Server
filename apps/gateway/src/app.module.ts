import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { Logger, Module } from '@nestjs/common';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AppService } from './app.service';
import { AuthModule } from '@app/auth';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { portConfig } from '@app/common';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        path: '/api',
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
      },
      gateway: {
        buildService: ({ url }) => {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest: ({ request, context }) => {
              request.http.headers.set(
                'authorization',
                context?.req?.get('authorization'),
              );
            },
          });
        },
        supergraphSdl: new IntrospectAndCompose({
          subgraphHealthCheck: true,
          subgraphs: [
            {
              name: 'users',
              url: 'http://localhost:3510/user',
              // url: 'http://users:3510/graphql',
            },
            {
              name: 'ping',
              url: 'http://localhost:3520/ping',
              // url: 'http://ping:3520/graphql',
            },
          ],
        }),
      },
    }),
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [portConfig],
      envFilePath: './apps/gateway/.env',
      expandVariables: true,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
