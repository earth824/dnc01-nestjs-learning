import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(
    public readonly error: {
      message: string;
      statusCode: HttpStatus;
      code: string;
      details?: Record<string, any>;
    }
  ) {
    const { statusCode, ...rest } = error;
    super(rest, statusCode);
  }
}

// new HttpException({ message, code, details  }, statusCode)
