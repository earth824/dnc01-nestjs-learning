import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post
  // UsePipes,
  // ValidationPipe
} from '@nestjs/common';
import { RegisterDto } from 'src/auth/dtos/register.dto';

// @UsePipes(new ValidationPipe({ stopAtFirstError: true }))
@Controller('auth')
export class AuthController {
  // @UsePipes(new ValidationPipe({ stopAtFirstError: true }))
  @Post('register')
  register(@Body() body: RegisterDto) {
    console.log(body);
    return 'REGISTER';
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body: any) {
    console.log(body);
    return { accessToken: 'abcdefghijklmnopqrstuvwxyz' };
  }

  @Get('me')
  getMe() {
    return 'AUTH USER PROFILE';
  }

  @Patch('me/password')
  updatePassword() {
    return { message: 'password has been changed' };
  }

  // @Put()
  // @Delete()
}
