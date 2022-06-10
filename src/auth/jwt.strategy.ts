import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExpressJwtOptions, passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret(
        configService.get<ExpressJwtOptions>('jwt'),
      ),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.get<string>('auth0.audience'),
      issuer: configService.get<string>('auth0.issuerUrl'),
      algorithms: configService.get<string[]>('auth0.issuerUrl'),
    });
  }

  validate(payload: unknown): unknown {
    return payload;
  }
}
