import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BcryptService } from './bcrypt.service';

@Module({
  controllers: [UserController],
  providers: [UserService, BcryptService],
  exports: [UserService]
})
export class UserModule {}
