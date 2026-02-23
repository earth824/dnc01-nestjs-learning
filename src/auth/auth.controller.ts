import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  SetMetadata
  // UsePipes,
  // ValidationPipe
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { RegisterDto } from 'src/auth/dtos/register.dto';

// @UseGuards(AuthGuard)
// @UsePipes(new ValidationPipe({ stopAtFirstError: true }))

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  // @UsePipes(new ValidationPipe({ stopAtFirstError: true }))
  // @SetMetadata('IS_PUBLIC_KEY', true)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto);
    return 'registered successfully';
  }

  // @SetMetadata('IS_PUBLIC_KEY', true)
  @Public()
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
