import { User } from '../entities';
import { UserId, Email } from '../value-objects';

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface UserRepositoryInterface {
  save(user: User): Promise<User>;
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  findAll(options: PaginationOptions): Promise<PaginatedResult<User>>;
  update(user: User): Promise<User>;
  delete(id: UserId): Promise<void>;
  exists(id: UserId): Promise<boolean>;
  existsByEmail(email: Email): Promise<boolean>;
}
