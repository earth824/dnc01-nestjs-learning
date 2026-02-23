import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { AccessJwtPayload } from 'src/auth/types/jwt-payload.type';

// @CurrentUser()
export const CurrentUser = createParamDecorator(
  (data: keyof AccessJwtPayload, context) => {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;
    if (!user)
      throw new Error('Current user cannot apply without authentication');
    return data ? user[data] : user;
  }
);

// getMe(@CurrentUser('email') user: JwtPayload) {} ==> user.email
