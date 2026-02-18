import { Module } from '@nestjs/common';
import { AuthController } from 'src/auth/auth.controller';
import { GoogleController } from './google.controller';

@Module({
  controllers: [AuthController, GoogleController]
})
export class AuthModule {}
