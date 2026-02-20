import { Role } from 'src/database/generated/prisma/enums';

export type AccessJwtPayload = {
  sub: number;
  username: string;
  role: Role;
};
