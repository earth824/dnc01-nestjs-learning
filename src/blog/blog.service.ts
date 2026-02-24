import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
  uploadImage(file: Express.Multer.File) {
    // upload file to cloudinary
    // update blog url in database
  }
}
