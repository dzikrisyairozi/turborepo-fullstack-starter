export interface DomainEvent {
  readonly eventId: string;
  readonly eventType: string;
  readonly aggregateId: string;
  readonly occurredOn: Date;
  readonly eventVersion: number;
}

export abstract class BaseDomainEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly eventType: string;
  public readonly aggregateId: string;
  public readonly occurredOn: Date;
  public readonly eventVersion: number;

  constructor(
    eventType: string,
    aggregateId: string,
    eventVersion: number = 1,
  ) {
    this.eventId = this.generateEventId();
    this.eventType = eventType;
    this.aggregateId = aggregateId;
    this.occurredOn = new Date();
    this.eventVersion = eventVersion;
  }

  private generateEventId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
