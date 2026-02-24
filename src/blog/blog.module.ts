import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { AuthModule } from 'src/auth/auth.module';
import { BlogsService } from 'src/blog/blog.service';

@Module({
  imports: [AuthModule],
  controllers: [BlogController],
  providers: [BlogsService]
})
export class BlogModule {}
