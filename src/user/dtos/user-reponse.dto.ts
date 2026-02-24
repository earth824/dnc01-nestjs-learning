import { Exclude, Expose } from 'class-transformer';
import { Role } from 'src/database/generated/prisma/enums';

@Exclude()
export class UserResponseDto {
  @Expose()
  id: number;

  username: string;

  password: string;

  role: Role;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}

//
// const a = { name: 'john' };
// const b = { age: 20 };
// const c = { name: 'jane' };
// Object.assign(a, b, c);
// // b and c: value is the same before assign
// // a ==>  { name: 'jane', age: 20 }

// const u = new UserResponseDto({ id: 5, username: 'jim' });
// UserResponseDto { id: 5, username: 'jim' }
