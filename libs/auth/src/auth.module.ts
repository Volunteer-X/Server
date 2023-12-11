import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';
import * as Joi from 'joi';
import { PrismaModule } from '@app/prisma';
import { AuthService } from './service/auth.service';
import { GqlAuthGuard } from './guard/gql.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './libs/auth/.env',
      validationSchema: Joi.object({
        AUTH0_DOMAIN: Joi.string().required(),
        AUTH0_AUDIENCE: Joi.string().required(),
      }),
      isGlobal: true,
      expandVariables: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PrismaModule.register({ logQueries: false }),
  ],
  providers: [JwtStrategy, AuthService, GqlAuthGuard],

  exports: [PassportModule, GqlAuthGuard],
})
export class AuthModule {}
