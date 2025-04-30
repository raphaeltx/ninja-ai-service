import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * JwtStrategy is used to validate JWT tokens and extract user information.
 * It extends PassportStrategy to integrate with the Passport.js library.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('JWT_SECRETS') private readonly jwtSecret: string) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtStrategy.decodedSecret(jwtSecret),
      algorithms: ['HS512'],
    });
  }

  /**
   * @description Decodes the JWT secret from base64 to a buffer.
   * @returns The decoded JWT secret as a buffer.
   */
  private static decodedSecret(jwtSecret: string): Buffer {
    return Buffer.from(jwtSecret, 'base64');
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
