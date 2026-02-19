import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { BcryptService } from 'src/user/bcrypt.service';

@Injectable()
export class UserService {
  constructor(private readonly bcryptService: BcryptService) {}
  // SOLID Principle
  // OCP (Open Close Principle): Open for extension, Close for modification
  async createUser(registerDto: RegisterDto) {
    // hash
    registerDto.password = await this.bcryptService.hash(registerDto.password);
    // prisma.user.create
  }
}
