import { v4 as uuidv4 } from 'uuid';

export class UserId {
  private readonly _value: string;

  constructor(value?: string) {
    this._value = value ?? uuidv4();
    this.validate();
  }

  private validate(): void {
    if (!this._value || this._value.trim().length === 0) {
      throw new Error('UserId cannot be empty');
    }
  }

  get value(): string {
    return this._value;
  }

  equals(other: UserId): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }

  static create(value?: string): UserId {
    return new UserId(value);
  }
}
