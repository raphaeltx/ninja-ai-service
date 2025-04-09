import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * JwtStrategy is used to validate JWT tokens and extract user information.
 * It extends PassportStrategy to integrate with the Passport.js library.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your-secret-key',
    });
  }

  /**
   * @description Validate the payload of the JWT token.
   * @param payload - The decoded JWT payload.
   * @returns An object containing user information.
   */
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
