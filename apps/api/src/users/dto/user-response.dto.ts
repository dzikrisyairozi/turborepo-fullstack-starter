import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from './create-user.dto';

export class UserResponseDto {
  @ApiProperty({
    description: 'Unique user identifier',
    example: 1,
  })
  id: number;

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
    enum: UserRole,
    example: UserRole.USER,
  })
  role: UserRole;

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
