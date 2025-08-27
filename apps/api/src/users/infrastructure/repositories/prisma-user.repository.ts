import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { User } from '../../domain/entities';
import { UserId, Email, UserRoleEnum } from '../../domain/value-objects';
import {
  UserRepositoryInterface,
  PaginationOptions,
  PaginatedResult,
} from '../../domain/repositories';

@Injectable()
export class PrismaUserRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: User): Promise<User> {
    const userData = user.toPersistence();

    const createdUser = await this.prisma.user.create({
      data: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
      },
    });

    return User.reconstitute({
      id: createdUser.id,
      email: createdUser.email,
      name: createdUser.name ?? '',
      role: this.mapToUserRoleEnum(createdUser.role),
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    });
  }

  async findById(id: UserId): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: id.value },
    });

    if (!user) {
      return null;
    }

    return User.reconstitute({
      id: user.id,
      email: user.email,
      name: user.name ?? '',
      role: this.mapToUserRoleEnum(user.role),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async findByEmail(email: Email): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.value },
    });

    if (!user) {
      return null;
    }

    return User.reconstitute({
      id: user.id,
      email: user.email,
      name: user.name ?? '',
      role: this.mapToUserRoleEnum(user.role),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async findAll(options: PaginationOptions): Promise<PaginatedResult<User>> {
    const { page, limit } = options;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count(),
    ]);

    const domainUsers = users.map((user) =>
      User.reconstitute({
        id: user.id,
        email: user.email,
        name: user.name ?? '',
        role: this.mapToUserRoleEnum(user.role),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }),
    );

    return {
      data: domainUsers,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async update(user: User): Promise<User> {
    const userData = user.toPersistence();

    const updatedUser = await this.prisma.user.update({
      where: { id: userData.id },
      data: {
        email: userData.email,
        name: userData.name,
        role: userData.role,
        updatedAt: userData.updatedAt,
      },
    });

    return User.reconstitute({
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name ?? '',
      role: this.mapToUserRoleEnum(updatedUser.role),
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    });
  }

  async delete(id: UserId): Promise<void> {
    await this.prisma.user.delete({
      where: { id: id.value },
    });
  }

  async exists(id: UserId): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: id.value },
      select: { id: true },
    });
    return !!user;
  }

  async existsByEmail(email: Email): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.value },
      select: { id: true },
    });
    return !!user;
  }

  private mapToUserRoleEnum(role: any): UserRoleEnum {
    if (Object.values(UserRoleEnum).includes(role as UserRoleEnum)) {
      return role as UserRoleEnum;
    }
    // Default to USER role if invalid role is provided
    return UserRoleEnum.USER;
  }
}
