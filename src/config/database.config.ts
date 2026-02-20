import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  url: process.env.DATABASE_URL
}));

export const jwtConfig = registerAs('jwt', () => ({
  accessJwtSecret: process.env.ACCESS_JWT_SECRET,
  accessJwtExpiresIn: process.env.ACCESS_JWT_EXPIRES_IN
}));
