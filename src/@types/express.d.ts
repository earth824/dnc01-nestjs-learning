import 'express';
import { AccessJwtPayload } from 'src/auth/types/jwt-payload.type';

declare module 'express' {
  interface Request {
    user?: AccessJwtPayload;
  }
}
