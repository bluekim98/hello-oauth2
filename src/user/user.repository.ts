import { User } from './interface/user.interface';

export class UserRepository {
  readonly users: User[] = [];

  save(user: User) {
    this.users.push(user);
  }

  findOne(email: string): User {
    return this.users.find((user) => user.email === email);
  }
}
