import {
  UserId,
  Email,
  UserName,
  UserRole,
  UserRoleEnum,
} from '../value-objects';

export interface UserProps {
  id: UserId;
  email: Email;
  name: UserName;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private constructor(private readonly props: UserProps) {}

  get id(): UserId {
    return this.props.id;
  }

  get email(): Email {
    return this.props.email;
  }

  get name(): UserName {
    return this.props.name;
  }

  get role(): UserRole {
    return this.props.role;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Business methods
  updateName(newName: UserName): void {
    this.props.name = newName;
    this.props.updatedAt = new Date();
  }

  updateEmail(newEmail: Email): void {
    this.props.email = newEmail;
    this.props.updatedAt = new Date();
  }

  updateRole(newRole: UserRole): void {
    this.props.role = newRole;
    this.props.updatedAt = new Date();
  }

  isAdmin(): boolean {
    return this.props.role.isAdmin();
  }

  canManageUsers(): boolean {
    return this.isAdmin();
  }

  equals(other: User): boolean {
    return this.props.id.equals(other.props.id);
  }

  // Factory methods
  static create(props: {
    email: string;
    name: string;
    role?: UserRoleEnum;
    id?: string;
  }): User {
    const now = new Date();

    return new User({
      id: UserId.create(props.id),
      email: Email.create(props.email),
      name: UserName.create(props.name),
      role: UserRole.create(props.role || UserRoleEnum.USER),
      createdAt: now,
      updatedAt: now,
    });
  }

  static reconstitute(props: {
    id: string;
    email: string;
    name: string;
    role: UserRoleEnum;
    createdAt: Date;
    updatedAt: Date;
  }): User {
    return new User({
      id: UserId.create(props.id),
      email: Email.create(props.email),
      name: UserName.create(props.name),
      role: UserRole.create(props.role),
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    });
  }

  // For persistence
  toPersistence(): {
    id: string;
    email: string;
    name: string;
    role: UserRoleEnum;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.props.id.value,
      email: this.props.email.value,
      name: this.props.name.value,
      role: this.props.role.value,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}
