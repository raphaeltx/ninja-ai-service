import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JwtAuthGuard protects routes by validating JWT tokens.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
