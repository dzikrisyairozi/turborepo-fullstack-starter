export class Email {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
    this.validate();
  }

  private validate(): void {
    if (!this._value || this._value.trim().length === 0) {
      throw new Error('Email cannot be empty');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this._value)) {
      throw new Error('Invalid email format');
    }

    if (this._value.length > 254) {
      throw new Error('Email is too long');
    }
  }

  get value(): string {
    return this._value;
  }

  equals(other: Email): boolean {
    return this._value.toLowerCase() === other._value.toLowerCase();
  }

  toString(): string {
    return this._value;
  }

  static create(value: string): Email {
    return new Email(value);
  }
}
