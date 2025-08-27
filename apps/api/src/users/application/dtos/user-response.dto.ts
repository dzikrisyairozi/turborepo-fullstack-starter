import { UserRoleEnum } from '../../domain/value-objects';

export interface UserResponseDto {
  id: string;
  email: string;
  name: string;
  role: UserRoleEnum;
  createdAt: Date;
  updatedAt: Date;
}
