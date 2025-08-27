import { Injectable, Inject } from '@nestjs/common';
import { User } from '../entities';
import {
  Email,
  UserName,
  UserRole,
  UserRoleEnum,
  UserId,
} from '../value-objects';
import { UserRepositoryInterface } from '../repositories';

@Injectable()
export class UserDomainService {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  /**
   * Checks if an email is unique across the system
   * Business rule: Email addresses must be unique
   */
  async isEmailUnique(email: Email, excludeUserId?: string): Promise<boolean> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (!existingUser) {
      return true;
    }

    // If we're updating a user, exclude their current email from uniqueness check
    if (excludeUserId && existingUser.id.value === excludeUserId) {
      return true;
    }

    return false;
  }

  /**
   * Validates user creation business rules
   * Business rule: Email must be unique, name must be valid
   */
  async validateUserCreation(
    email: string,
    name: string,
  ): Promise<{
    isValid: boolean;
    errors: string[];
  }> {
    const errors: string[] = [];

    try {
      const emailVO = Email.create(email);
      const isEmailUnique = await this.isEmailUnique(emailVO);

      if (!isEmailUnique) {
        errors.push('Email address is already in use');
      }
    } catch (error) {
      errors.push('Invalid email format');
    }

    try {
      UserName.create(name);
    } catch (error) {
      errors.push('Invalid name format');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validates user update business rules
   * Business rule: If email is being changed, it must be unique
   */
  async validateUserUpdate(
    userId: string,
    email?: string,
    name?: string,
  ): Promise<{
    isValid: boolean;
    errors: string[];
  }> {
    const errors: string[] = [];

    if (email) {
      try {
        const emailVO = Email.create(email);
        const isEmailUnique = await this.isEmailUnique(emailVO, userId);

        if (!isEmailUnique) {
          errors.push('Email address is already in use');
        }
      } catch (error) {
        errors.push('Invalid email format');
      }
    }

    if (name) {
      try {
        UserName.create(name);
      } catch (error) {
        errors.push('Invalid name format');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Determines if a user can manage another user
   * Business rule: Only admins can manage other users
   */
  async canManageUser(
    managerId: string,
    targetUserId: string,
  ): Promise<boolean> {
    if (managerId === targetUserId) {
      return true; // Users can always manage themselves
    }

    const managerIdVO = UserId.create(managerId);
    const manager = await this.userRepository.findById(managerIdVO);
    if (!manager) {
      return false;
    }

    return manager.role.isAdmin();
  }

  /**
   * Calculates user statistics for business intelligence
   * Business rule: Provides insights into user distribution
   */
  async calculateUserStatistics(): Promise<{
    totalUsers: number;
    adminCount: number;
    regularUserCount: number;
    adminPercentage: number;
  }> {
    const allUsers = await this.userRepository.findAll({
      page: 1,
      limit: 1000,
    });
    const totalUsers = allUsers.data.length;

    const adminCount = allUsers.data.filter((user) =>
      user.role.isAdmin(),
    ).length;
    const regularUserCount = totalUsers - adminCount;
    const adminPercentage =
      totalUsers > 0 ? (adminCount / totalUsers) * 100 : 0;

    return {
      totalUsers,
      adminCount,
      regularUserCount,
      adminPercentage: Math.round(adminPercentage * 100) / 100, // Round to 2 decimal places
    };
  }
}
