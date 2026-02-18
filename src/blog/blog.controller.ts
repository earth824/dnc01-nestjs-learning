import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Controller('blogs')
export class BlogController {
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
    @Param('id') id: string,
    @Body('title') title: any,
    @Headers('Authorization') authorization: string | undefined
  ) {
    console.log(params);
    console.log(id);
    console.log(title);
    console.log(authorization);
  }

  @Post()
  createPost(@Req() req: Request, @Res() res: Response) {
    console.log(req.body);
    res
      .status(HttpStatus.CREATED)
      .json({ message: 'created blog successfully' });
  }
}
