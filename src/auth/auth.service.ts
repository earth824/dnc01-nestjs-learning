import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { BcryptService } from 'src/user/bcrypt.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptService: BcryptService
  ) {}

  async register(registerDto: RegisterDto) {
    // call userService
    await this.userService.createUser(registerDto);
    // hashService
    // insert data into data base prisma service
  }

  async login(loginDto: LoginDto) {
    // find user in database with provided username
    const user = await this.userService.findByUsername(loginDto.username);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    // compare password
    const isMatch = await this.bcryptService.compare(
      loginDto.password,
      user.password
    );
    if (!isMatch) {
      throw new UnauthorizedException('Invalid username or password');
    }
  }
}
