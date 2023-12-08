import { Logger, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ConfigModule } from '@nestjs/config';
import { portConfig } from '@app/common';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          logger: console,
          subgraphHealthCheck: true,
          subgraphs: [
            {
              name: 'users',
              url: 'http://localhost:3510/graphql',
            },
            // {
            //   name: 'ping',
            //   url: 'http://localhost:3520/graphql',
            // },
          ],
        }),
      },
    }),
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
