import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from '@nestjs/common';

import { Request, Response } from 'express';

import { BaseException } from 'src/common/exceptions/base.exception';

@Catch(BaseException)
export class GlobalFilter implements ExceptionFilter {
  catch(exception: BaseException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();
    const { statusCode, ...rest } = exception.error;
    response.status(statusCode).json({
      success: false,
      ...rest,
      timestamp: new Date().toISOString(),
      path: request.url
    });
  }
}

// res.status(400).json()
// { success: false, path: '/auth/me', timestamp: '2026-02-23T12:09:33', message: 'Invalid token', code: 'TOKEN_EXPIRED', details: {  } }

// ArgumentHost is parent of ExecutionContext
