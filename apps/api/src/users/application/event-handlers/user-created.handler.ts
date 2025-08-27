import { Injectable, Logger } from '@nestjs/common';
import { UserCreatedEvent } from '../../domain/events';

@Injectable()
export class UserCreatedHandler {
  private readonly logger = new Logger(UserCreatedHandler.name);

  handle(event: UserCreatedEvent): void {
    this.logger.log(
      `User created: ${event.email} (${event.name}) with role ${event.role}`,
      {
        eventId: event.eventId,
        aggregateId: event.aggregateId,
        eventType: event.eventType,
        occurredOn: event.occurredOn,
      },
    );

    // Here you can add additional logic such as:
    // - Sending welcome emails
    // - Creating user profiles in other services
    // - Updating analytics
    // - Triggering notifications

    // Example: Send welcome email (placeholder)
    this.sendWelcomeEmail(event.email, event.name);

    // Example: Update user statistics (placeholder)
    this.updateUserStatistics(event.role);
  }

  private sendWelcomeEmail(email: string, name: string): void {
    // Placeholder for email service integration
    this.logger.log(`Welcome email would be sent to ${email} (${name})`);
  }

  private updateUserStatistics(role: string): void {
    // Placeholder for analytics service integration
    this.logger.log(`User statistics updated for new ${role} user`);
  }
}
