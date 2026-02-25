import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { AuthModule } from 'src/auth/auth.module';
import { BlogService } from 'src/blog/blog.service';
import { UploadModule } from 'src/shared/upload/upload.module';

@Module({
  imports: [AuthModule, UploadModule],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
