import { Module } from '@nestjs/common';
import { AuthController } from 'src/auth/auth.controller';
import { GoogleController } from './google.controller';
import { AuthService } from 'src/auth/auth.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController, GoogleController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
