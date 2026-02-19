import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  register(registerDto: RegisterDto) {
    // call userService
    this.userService.createUser(registerDto);
    // hashService
    // insert data into data base prisma service
  }
}
