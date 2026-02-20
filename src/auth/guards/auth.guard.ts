import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
      throw new BadRequestException('Invalid authorization scheme');
    }

    // verify token
    const payload = await this.jwtService.verifyAsync<AccessJwtPayload>(token);
    // request.user = payload;

    return false;
  }
}
