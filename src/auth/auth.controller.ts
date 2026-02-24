import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  SerializeOptions,
  SetMetadata,
  UseInterceptors
  // UsePipes,
  // ValidationPipe
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { SerializeInterceptor } from 'src/common/interceptors/serialize.interceptor';
import { UserResponseDto } from 'src/user/dtos/user-reponse.dto';

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
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: UserResponseDto })
  @Get('me')
  async getMe(@CurrentUser('sub') userId: number) {
    // return new UserResponseDto({
    //   id: 1,
    //   username: 'jim',
    //   password: '123456',
    //   role: 'ADMIN'
    // });
    // return {
    //   id: 1,
    //   username: 'jim',
    //   password: '123456',
    //   role: 'ADMIN'
    // };
    const user = await this.authService.getCurrentUser(userId);
    return user;
    // return new UserResponseDto(user);
  }

  @Patch('me/password')
  updatePassword() {
    return { message: 'password has been changed' };
  }

  // @Put()
  // @Delete()
  @UseInterceptors(SerializeInterceptor)
  @Public()
  @Get('test')
  test() {
    console.log('AUTH CONTROLLER TEST');
    return 'RESPONSE FROM TEST';
    // return { success: true, data: 'RESPONSE FROM TEST', timestam: new Date() };
  }
}
