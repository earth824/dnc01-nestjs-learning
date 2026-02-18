import { Transform, Type } from 'class-transformer';
import {
  IsAlphanumeric,
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength
} from 'class-validator';

export class RegisterDto {
  @Transform(({ value }) => {
    if (typeof value === 'string') value.trim();
    return value as unknown;
  })
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsAlphanumeric()
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsIn(['USER', 'ADMIN'])
  @IsOptional()
  role: 'USER' | 'ADMIN' = 'USER';

  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @IsNumber()
  @Type(() => Number)
  point: number;
}
