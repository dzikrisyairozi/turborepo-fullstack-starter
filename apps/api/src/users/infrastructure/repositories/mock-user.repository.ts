import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities';
import { UserId, Email, UserRoleEnum } from '../../domain/value-objects';
import {
  UserRepositoryInterface,
  PaginationOptions,
  PaginatedResult,
} from '../../domain/repositories';

@Injectable()
export class MockUserRepository implements UserRepositoryInterface {
  private users: Map<string, User> = new Map();
  private emailIndex: Map<string, string> = new Map(); // email -> userId mapping

  constructor() {
    // Initialize with some mock data
    this.initializeMockData();
  }

  private initializeMockData(): void {
    const adminUser = User.create({
      email: 'admin@example.com',
      name: 'Admin User',
      role: UserRoleEnum.ADMIN,
    });

    const regularUser = User.create({
      email: 'user@example.com',
      name: 'Regular User',
      role: UserRoleEnum.USER,
    });

    const dzikri = User.create({
      email: 'dzikrisyairozi@gmail.com',
      name: 'Dzikri Syairozi',
      role: UserRoleEnum.USER,
    });

    this.users.set(adminUser.id.value, adminUser);
    this.users.set(regularUser.id.value, regularUser);
    this.users.set(dzikri.id.value, dzikri);
    this.emailIndex.set(adminUser.email.value, adminUser.id.value);
    this.emailIndex.set(regularUser.email.value, regularUser.id.value);
    this.emailIndex.set(dzikri.email.value, dzikri.id.value);
  }

  save(user: User): Promise<User> {
    this.users.set(user.id.value, user);
    this.emailIndex.set(user.email.value, user.id.value);
    return Promise.resolve(user);
  }

  findById(id: UserId): Promise<User | null> {
    return Promise.resolve(this.users.get(id.value) || null);
  }

  findByEmail(email: Email): Promise<User | null> {
    const userId = this.emailIndex.get(email.value);
    if (!userId) return Promise.resolve(null);
    return Promise.resolve(this.users.get(userId) || null);
  }

  findAll(options: PaginationOptions): Promise<PaginatedResult<User>> {
    const allUsers = Array.from(this.users.values());
    const total = allUsers.length;
    const totalPages = Math.ceil(total / options.limit);
    const startIndex = (options.page - 1) * options.limit;
    const endIndex = startIndex + options.limit;
    const data = allUsers.slice(startIndex, endIndex);

    return Promise.resolve({
      data,
      meta: {
        total,
        page: options.page,
        limit: options.limit,
        totalPages,
      },
    });
  }

  update(user: User): Promise<User> {
    if (!this.users.has(user.id.value)) {
      throw new Error(`User with id ${user.id.value} not found`);
    }

    // Update email index if email changed
    const existingUser = this.users.get(user.id.value)!;
    if (existingUser.email.value !== user.email.value) {
      this.emailIndex.delete(existingUser.email.value);
      this.emailIndex.set(user.email.value, user.id.value);
    }

    this.users.set(user.id.value, user);
    return Promise.resolve(user);
  }

  delete(id: UserId): Promise<void> {
    const user = this.users.get(id.value);
    if (user) {
      this.emailIndex.delete(user.email.value);
      this.users.delete(id.value);
    }
    return Promise.resolve();
  }

  exists(id: UserId): Promise<boolean> {
    return Promise.resolve(this.users.has(id.value));
  }

  existsByEmail(email: Email): Promise<boolean> {
    return Promise.resolve(this.emailIndex.has(email.value));
  }
}
