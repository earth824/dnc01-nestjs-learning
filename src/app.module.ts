import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'src/config/env.validation';
import { databaseConfig, jwtConfig } from 'src/config/database.config';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BlogModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      load: [databaseConfig, jwtConfig]
    })
  ]
})
export class AppModule {}
