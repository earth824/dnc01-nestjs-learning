import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards
  // UsePipes,
  // ValidationPipe
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
// @UsePipes(new ValidationPipe({ stopAtFirstError: true }))
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UsePipes(new ValidationPipe({ stopAtFirstError: true }))
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto);
    return 'registered successfully';
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // @UseGuards(AuthGuard)
  @Get('me')
  getMe() {
    return 'AUTH USER PROFILE TTTT';
  }

  @Patch('me/password')
  updatePassword() {
    return { message: 'password has been changed' };
  }

  // @Put()
  // @Delete()
}
