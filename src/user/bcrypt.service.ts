import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  hash(data: string): Promise<string> {
    return bcrypt.hash(data, 12);
  }
}
