import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common';

import { RegisterDto } from 'src/auth/dtos/register.dto';
import { PrismaClientKnownRequestError } from 'src/database/generated/prisma/internal/prismaNamespace';
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
    // throw new HttpException('error naja', HttpStatus.BAD_REQUEST);
    // throw new HttpException(
    //   { code: 'EMAIL_EXIST', message: 'email in use' },
    //   HttpStatus.CONFLICT
    // );

    // throw new BadRequestException('error wa');
    // throw new BadRequestException({
    //   message: 'Error yor jung wa',
    //   CODE: 'ALWAYS',
    //   details: 'NEST IS EASY'
    // });
    // throw new BadRequestException({
    //   success: false,
    //   message: '',
    //   code: 'INVALID_CREDENTIALS',
    //   timestamp: new Date()
    // });
    try {
      await this.prisma.user.create({ data: registerDto });
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        throw new ConflictException('email already in use');
      }
      throw err;
    }
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }
}

// ERROR RESPONSE: { success: false, message: string, code: string, timestamp: string, path: string, details: any }
// process.env.
