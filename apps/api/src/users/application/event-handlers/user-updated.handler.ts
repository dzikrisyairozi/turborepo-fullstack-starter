import { Injectable, Logger } from '@nestjs/common';
import { UserUpdatedEvent } from '../../domain/events';

@Injectable()
export class UserUpdatedHandler {
  private readonly logger = new Logger(UserUpdatedHandler.name);

  handle(event: UserUpdatedEvent): void {
    const changes = this.buildChangeDescription(event);

    this.logger.log(`User updated: ${event.aggregateId} - ${changes}`, {
      eventId: event.eventId,
      aggregateId: event.aggregateId,
      eventType: event.eventType,
      occurredOn: event.occurredOn,
    });

    // Handle specific change types
    if (event.newEmail && event.previousEmail !== event.newEmail) {
      this.handleEmailChange(
        event.aggregateId,
        event.previousEmail!,
        event.newEmail,
      );
    }

    if (event.newRole && event.previousRole !== event.newRole) {
      this.handleRoleChange(
        event.aggregateId,
        event.previousRole!,
        event.newRole,
      );
    }

    if (event.newName && event.previousName !== event.newName) {
      this.handleNameChange(
        event.aggregateId,
        event.previousName!,
        event.newName,
      );
    }
  }

  private buildChangeDescription(event: UserUpdatedEvent): string {
    const changes: string[] = [];

    if (event.newEmail && event.previousEmail !== event.newEmail) {
      changes.push(`email: ${event.previousEmail} → ${event.newEmail}`);
    }

    if (event.newName && event.previousName !== event.newName) {
      changes.push(`name: ${event.previousName} → ${event.newName}`);
    }

    if (event.newRole && event.previousRole !== event.newRole) {
      changes.push(`role: ${event.previousRole} → ${event.newRole}`);
    }

    return changes.join(', ');
  }

  private handleEmailChange(
    userId: string,
    oldEmail: string,
    newEmail: string,
  ): void {
    // Placeholder for email change notifications
    this.logger.log(
      `Email change notification: ${oldEmail} → ${newEmail} for user ${userId}`,
    );

    // Here you could:
    // - Send confirmation emails to both old and new addresses
    // - Update external systems with new email
    // - Invalidate email-based sessions
  }

  private handleRoleChange(
    userId: string,
    oldRole: string,
    newRole: string,
  ): void {
    // Placeholder for role change handling
    this.logger.log(`Role change: ${oldRole} → ${newRole} for user ${userId}`);

    // Here you could:
    // - Update permissions in external systems
    // - Send role change notifications
    // - Audit role changes for compliance
  }

  private handleNameChange(
    userId: string,
    oldName: string,
    newName: string,
  ): void {
    // Placeholder for name change handling
    this.logger.log(`Name change: ${oldName} → ${newName} for user ${userId}`);

    // Here you could:
    // - Update display names in other services
    // - Refresh cached user data
  }
}
