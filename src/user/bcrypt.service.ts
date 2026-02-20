import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import { EnvConfig } from 'src/config/env.validation';

@Injectable()
export class BcryptService {
  constructor(private readonly configService: ConfigService<EnvConfig, true>) {}

  hash(data: string): Promise<string> {
    return bcrypt.hash(
      data,
      this.configService.get('SALT_ROUNDS', { infer: true })
    );
  }

  compare(data: string, digest: string) {
    return bcrypt.compare(data, digest);
  }
}
