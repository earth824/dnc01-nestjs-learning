import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [BlogController]
})
export class BlogModule {}
