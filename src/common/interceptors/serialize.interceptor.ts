import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable, of, tap } from 'rxjs';
import { success } from 'zod';

const cacheData = { products: [{ id: 1, name: 'Pepsi', price: 50 }] };

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const response = context.switchToHttp().getResponse<Response>();
    // BEFORE PIPE
    console.log('BEFORE');
    // CACHE
    // PRODUCT_DATA
    // if (cacheData.products) {
    //   return of(cacheData.products);
    //   // response.status(200).json(cacheData.products);
    // }
    // MULTER UPLOAD
    // request.file or request.files
    return next
      .handle()
      .pipe(map((data: unknown) => ({ success: true, data })));
  }
}

// { success: true, data: 'RESPONSE FROM TEST'  }
