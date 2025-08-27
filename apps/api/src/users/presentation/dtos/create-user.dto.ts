import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { UserRoleEnum } from '../../domain/value-objects';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'dzikri@syairozi.com',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User full name',
    example: 'Dzikri Syairozi',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'User role in the system',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
    example: UserRoleEnum.USER,
  })
  @IsOptional()
  @IsEnum(UserRoleEnum)
  role?: UserRoleEnum = UserRoleEnum.USER;
}
