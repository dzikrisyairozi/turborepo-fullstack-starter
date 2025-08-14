/* eslint-disable @typescript-eslint/require-await */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class UsersService {
  // Mock data for demonstration - replace with actual Prisma service calls
  private users: UserResponseDto[] = [
    {
      id: 1,
      email: 'admin@example.com',
      name: 'Admin User',
      role: UserRole.ADMIN,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: 2,
      email: 'user@example.com',
      name: 'Regular User',
      role: UserRole.USER,
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02'),
    },
  ];

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const newUser: UserResponseDto = {
      id: this.users.length + 1,
      ...createUserDto,
      role: createUserDto.role ?? UserRole.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10, skip } = paginationDto;
    const total = this.users.length;
    const data = this.users.slice(skip, skip + limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<UserResponseDto> {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserDto,
      updatedAt: new Date(),
    };

    return this.users[userIndex];
  }

  async remove(id: number) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.users.splice(userIndex, 1);
    return { message: 'User deleted successfully' };
  }
}
