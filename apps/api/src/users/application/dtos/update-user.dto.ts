import { UserRoleEnum } from '../../domain/value-objects';

export interface UpdateUserDto {
  email?: string;
  name?: string;
  role?: UserRoleEnum;
}
