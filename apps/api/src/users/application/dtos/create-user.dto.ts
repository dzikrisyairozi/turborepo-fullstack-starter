import { UserRoleEnum } from '../../domain/value-objects';

export interface CreateUserDto {
  email: string;
  name: string;
  role?: UserRoleEnum;
}
