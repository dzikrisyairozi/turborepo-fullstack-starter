import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEnum } from '../../domain/value-objects';

export class UserResponseDto {
  @ApiProperty({
    description: 'Unique user identifier',
    example: 'cuid-example-123',
  })
  id: string;

  @ApiProperty({
    description: 'User email address',
    example: 'dzikri@syairozi.com',
  })
  email: string;

  @ApiProperty({
    description: 'User full name',
    example: 'Dzikri Syairozi',
  })
  name: string;

  @ApiProperty({
    description: 'User role in the system',
    enum: UserRoleEnum,
    example: UserRoleEnum.USER,
  })
  role: UserRoleEnum;

  @ApiProperty({
    description: 'When the user was created',
    example: '2024-01-15T10:30:00Z',
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'When the user was last updated',
    example: '2024-01-15T10:30:00Z',
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
}
