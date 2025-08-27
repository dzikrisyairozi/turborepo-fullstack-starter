import { Module } from '@nestjs/common';
import { UsersController } from './presentation/users.controller';
import {
  UserApplicationService,
  UserCreatedHandler,
  UserUpdatedHandler,
  UserDeletedHandler,
} from './application';
import { MockUserRepository } from './infrastructure';
import { UserRepositoryInterface, UserDomainService } from './domain';

@Module({
  controllers: [UsersController],
  providers: [
    UserApplicationService,
    UserDomainService,
    UserCreatedHandler,
    UserUpdatedHandler,
    UserDeletedHandler,
    {
      provide: 'UserRepositoryInterface',
      useClass: MockUserRepository,
    },
  ],
  exports: [
    UserApplicationService,
    UserDomainService,
    UserCreatedHandler,
    UserUpdatedHandler,
    UserDeletedHandler,
  ],
})
export class UsersModule {}
