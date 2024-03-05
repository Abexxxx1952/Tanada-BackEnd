import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/jwtPayload';
import { AttachedUserWithRt } from '../types/attachedUserWithRt';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh',
) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication?.refresh_token;
        },
      ]),
      secretOrKey: config.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  validate(request: Request, payload: JwtPayload): AttachedUserWithRt {
    const refreshToken = request?.cookies?.Authentication?.refresh_token;

    return {
      id: payload.sub,
      email: payload.email,
      permissions: payload.permissions,
      refreshToken,
    };
  }
}
