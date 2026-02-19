import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { PrismaService } from 'src/database/prisma.service';
import { BcryptService } from 'src/user/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly prisma: PrismaService
  ) {}
  // SOLID Principle
  // OCP (Open Close Principle): Open for extension, Close for modification
  async createUser(registerDto: RegisterDto) {
    // hash
    registerDto.password = await this.bcryptService.hash(registerDto.password);
    // prisma.user.create
    await this.prisma.user.create({ data: registerDto });
  }
}
