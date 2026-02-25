import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { EnvConfig } from 'src/config/env.validation';
import streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  private readonly logger: Logger = new Logger(CloudinaryService.name);

  constructor(private readonly configService: ConfigService<EnvConfig, true>) {
    cloudinary.config({
      cloud_name: configService.get('CLOUDINARY_CLOUD_NAME', { infer: true }),
      api_key: configService.get('CLOUDINARY_API_KEY', { infer: true }),
      api_secret: configService.get('CLOUDINARY_API_SECRET', { infer: true })
    });
  }

  upload(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error || !result) {
            this.logger.error(error);
            reject(new Error('Cloudinary upload failed'));
            return;
          }
          resolve(result);
        }
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
