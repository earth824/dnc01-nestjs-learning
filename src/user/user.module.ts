import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BcryptService } from './bcrypt.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    BcryptService,
    { provide: 'HASH', useClass: BcryptService }
  ],
  exports: [UserService, BcryptService]
})
export class UserModule {}

// class ArgonService {
//   hash(data: string): Promise<string> {
//     return argon.hash()
//   }

//   compare(data: string, digest: string): Promise<boolean> {}
// }

// class ScryptService {}
