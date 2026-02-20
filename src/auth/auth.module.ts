import { Module } from '@nestjs/common';
import { AuthController } from 'src/auth/auth.controller';
import { GoogleController } from './google.controller';
import { AuthService } from 'src/auth/auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from 'src/config/env.validation';

@Module({
  imports: [
    UserModule,
    // JwtModule.register({})
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvConfig, true>) => ({
        secret: configService.get('ACCESS_JWT_SECRET', { infer: true }),
        signOptions: {
          expiresIn: configService.get('ACCESS_JWT_EXPIRES_IN', { infer: true })
        }
      })
    })
  ],
  controllers: [AuthController, GoogleController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
