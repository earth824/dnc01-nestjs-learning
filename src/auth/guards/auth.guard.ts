import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/auth/decorators/public.decorator';
import { AccessJwtPayload } from 'src/auth/types/jwt-payload.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // check is public key true or not ?
    // if publickey is true return true
    const isPublic = this.reflector.getAllAndOverride<boolean | undefined>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()]
    );
    if (isPublic) return true;
    // console.log('-----------------------------: getAll', [true, true]);
    // console.log('-----------------------------: getAllAndMerge', [true]);

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
