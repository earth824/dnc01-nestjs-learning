import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  SetMetadata,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { BlogService } from 'src/blog/blog.service';

@Controller('blogs')
export class BlogController {
  constructor(
    private readonly authService: AuthService,
    private readonly blogService: BlogService
  ) {}

  @Public()
  @UseInterceptors(FileInterceptor('blogImage'))
  @Patch()
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.blogService.uploadImage(file);
  }

  @Get()
  getAllBlog(
    @Query('search') search: string | string[] | undefined,
    @Query() query: Record<string, string | string[] | undefined>
  ) {
    console.log(query);
    console.log(search);
  }

  @Put(':id')
  updateBlog(
    @Param() params: any,
    @Param('id', ParseIntPipe) id: number,
    @Body('title') title: any,
    @Headers('Authorization') authorization: string | undefined
  ) {
    console.log(id);
    console.log('tesssss');
    console.log(params);
    console.log(title);
    console.log(authorization);
  }

  // @Roles('ADMIN', 'SUPER_ADMIN')
  // @SetMetadata('ROLES_KEY', ['ADMIN', 'SUPER_ADMIN'])
  @Post('')
  createBlog(@Req() req: Request, @Res() res: Response) {
    console.log(req.body);
    res
      .status(HttpStatus.CREATED)
      .json({ message: 'created blog successfully' });
  }
}
