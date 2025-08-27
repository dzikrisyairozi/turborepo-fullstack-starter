export enum UserRoleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class UserRole {
  private readonly _value: UserRoleEnum;

  constructor(value: UserRoleEnum) {
    this._value = value;
    this.validate();
  }

  private validate(): void {
    if (!Object.values(UserRoleEnum).includes(this._value)) {
      throw new Error(`Invalid user role: ${this._value}`);
    }
  }

  get value(): UserRoleEnum {
    return this._value;
  }

  isAdmin(): boolean {
    return this._value === UserRoleEnum.ADMIN;
  }

  isUser(): boolean {
    return this._value === UserRoleEnum.USER;
  }

  equals(other: UserRole): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }

  static create(value: UserRoleEnum): UserRole {
    return new UserRole(value);
  }

  static createUser(): UserRole {
    return new UserRole(UserRoleEnum.USER);
  }

  static createAdmin(): UserRole {
    return new UserRole(UserRoleEnum.ADMIN);
  }
}
