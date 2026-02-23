import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { AccessJwtPayload } from 'src/auth/types/jwt-payload.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('AUTH_GUARD');
    const type = context.getType();
    console.log(type);
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.headers.authorization ?? '';
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer' || !token) {
      // throw new InvalidAuthorizationHeader()
      throw new BadRequestException('Invalid authorization scheme');
    }

    // verify token
    try {
      const payload =
        await this.jwtService.verifyAsync<AccessJwtPayload>(token);
      request.user = payload;
    } catch (error) {
      if (error instanceof JsonWebTokenError)
        // throw new UnauthorizedException('Invalid token');
        throw new HttpException(
          { a: 20, m: 'azazazazaz' },
          HttpStatus.UNAUTHORIZED
        );
      if (error instanceof TokenExpiredError)
        // throw new TokenExpireException()
        throw new UnauthorizedException('Token has expired');
      throw error;
    }

    return true;
  }
}
