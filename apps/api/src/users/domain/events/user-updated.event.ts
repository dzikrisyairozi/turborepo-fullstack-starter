import { BaseDomainEvent } from './base/domain-event.interface';
import { UserRoleEnum } from '../value-objects';

export class UserUpdatedEvent extends BaseDomainEvent {
  public readonly previousEmail?: string;
  public readonly newEmail?: string;
  public readonly previousName?: string;
  public readonly newName?: string;
  public readonly previousRole?: UserRoleEnum;
  public readonly newRole?: UserRoleEnum;

  constructor(
    aggregateId: string,
    changes: {
      previousEmail?: string;
      newEmail?: string;
      previousName?: string;
      newName?: string;
      previousRole?: UserRoleEnum;
      newRole?: UserRoleEnum;
    },
  ) {
    super('UserUpdated', aggregateId);
    this.previousEmail = changes.previousEmail;
    this.newEmail = changes.newEmail;
    this.previousName = changes.previousName;
    this.newName = changes.newName;
    this.previousRole = changes.previousRole;
    this.newRole = changes.newRole;
  }
}
