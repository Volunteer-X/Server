import { Strategy as BaseStrategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthEntity } from '@app/auth/entity/auth.entity';
import { AuthService } from '@app/auth/service/auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './jwt-payload.interface';
import { NotFoundError } from '@app/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(BaseStrategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${configService.get<string>(
          'AUTH0_DOMAIN',
        )}/.well-known/jwks.json`,
        handleSigningKeyError(err, cb) {
          if (err instanceof Error) {
            console.log('err', err);
            return cb(err);
          }
          return cb(new UnauthorizedException('Signing key error'));
        },
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // audience: configService.get<string>('AUTH0_AUDIENCE'),
      issuer: `https://${configService.get<string>('AUTH0_DOMAIN')}/`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: JwtPayload): Promise<AuthEntity | NotFoundError> {
    // get user info from payload

    const minimumScope = ['openid', 'profile', 'email'];

    if (
      payload?.scope
        ?.split(' ')
        .filter((scope) => minimumScope.indexOf(scope) > -1).length !== 3
    ) {
      throw new UnauthorizedException(
        'JWT does not possess the required scope (`openid profile email`).',
      );
    }

    const email = payload['api.volunteerx/email'];

    // ! if error, use an api based on the auth0 user email to get the user info, eg: http://localhost:3510/users?email=${email}

    const user = await this.authService.findUser(email.toString());

    return user;
  }
}
