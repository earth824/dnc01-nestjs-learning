import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/shared/upload/cloudinary.service';

@Injectable()
export class BlogService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadImage(file: Express.Multer.File) {
    // upload file to cloudinary
    const result = await this.cloudinaryService.upload(file);
    return result;
    // update blog url in database
  }
}
