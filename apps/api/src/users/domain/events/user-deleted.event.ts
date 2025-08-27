import { BaseDomainEvent } from './base/domain-event.interface';
import { UserRoleEnum } from '../value-objects';

export class UserDeletedEvent extends BaseDomainEvent {
  public readonly email: string;
  public readonly name: string;
  public readonly role: UserRoleEnum;
  public readonly deletedAt: Date;

  constructor(
    aggregateId: string,
    email: string,
    name: string,
    role: UserRoleEnum,
  ) {
    super('UserDeleted', aggregateId);
    this.email = email;
    this.name = name;
    this.role = role;
    this.deletedAt = new Date();
  }
}
