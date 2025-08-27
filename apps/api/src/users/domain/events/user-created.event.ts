import { BaseDomainEvent } from './base/domain-event.interface';
import { UserRoleEnum } from '../value-objects';

export class UserCreatedEvent extends BaseDomainEvent {
  public readonly email: string;
  public readonly name: string;
  public readonly role: UserRoleEnum;

  constructor(
    aggregateId: string,
    email: string,
    name: string,
    role: UserRoleEnum,
  ) {
    super('UserCreated', aggregateId);
    this.email = email;
    this.name = name;
    this.role = role;
  }
}
