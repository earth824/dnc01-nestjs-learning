import { HttpStatus } from '@nestjs/common';
import { BaseException } from 'src/common/exceptions/base.exception';

export class EmailAlreadyExistException extends BaseException {
  constructor() {
    super({
      code: 'EMAIL_ALREADY_EXIST',
      message: 'The provided email address is already in use',
      statusCode: HttpStatus.CONFLICT
    });
  }
}
