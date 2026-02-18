import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('register')
  register() {
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
