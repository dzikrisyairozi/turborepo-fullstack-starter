import {
  Injectable,
  Inject,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { User } from '../../domain/entities';
import {
  UserId,
  Email,
  UserName,
  UserRole,
  UserRoleEnum,
} from '../../domain/value-objects';
import { UserRepositoryInterface } from '../../domain/repositories';
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
  PaginationDto,
  PaginatedResponseDto,
} from '../dtos';

@Injectable()
export class UserApplicationService {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // Check if user with email already exists
    const email = Email.create(createUserDto.email);
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Create new user
    const user = User.create({
      email: createUserDto.email,
      name: createUserDto.name,
      role: createUserDto.role || UserRoleEnum.USER,
    });

    const savedUser = await this.userRepository.save(user);
    return this.toResponseDto(savedUser);
  }

  async findAllUsers(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponseDto<UserResponseDto>> {
    const page = paginationDto.page || 1;
    const limit = paginationDto.limit || 10;

    const result = await this.userRepository.findAll({ page, limit });

    return {
      data: result.data.map((user) => this.toResponseDto(user)),
      meta: result.meta,
    };
  }

  async findUserById(id: string): Promise<UserResponseDto> {
    const userId = UserId.create(id);
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.toResponseDto(user);
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const userId = UserId.create(id);
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Check if email is being updated and if it's already taken
    if (updateUserDto.email && updateUserDto.email !== user.email.value) {
      const newEmail = Email.create(updateUserDto.email);
      const existingUser = await this.userRepository.findByEmail(newEmail);

      if (existingUser && !existingUser.id.equals(userId)) {
        throw new ConflictException('Email is already taken by another user');
      }

      user.updateEmail(newEmail);
    }

    // Update name if provided
    if (updateUserDto.name) {
      const newName = UserName.create(updateUserDto.name);
      user.updateName(newName);
    }

    // Update role if provided
    if (updateUserDto.role) {
      const newRole = UserRole.create(updateUserDto.role);
      user.updateRole(newRole);
    }

    const updatedUser = await this.userRepository.update(user);
    return this.toResponseDto(updatedUser);
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    const userId = UserId.create(id);
    const exists = await this.userRepository.exists(userId);

    if (!exists) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.delete(userId);
    return { message: 'User deleted successfully' };
  }

  private toResponseDto(user: User): UserResponseDto {
    return {
      id: user.id.value,
      email: user.email.value,
      name: user.name.value,
      role: user.role.value,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
