import type { User } from '../types';

// Mock data - replace with database calls
const users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
];

export class UserService {
  static getAllUsers(): User[] {
    return users;
  }

  static getUserById(id: string): User | undefined {
    return users.find((user) => user.id === id);
  }

  static createUser(name: string, email: string): User {
    const newUser: User = {
      id: String(users.length + 1),
      name,
      email,
    };
    users.push(newUser);
    return newUser;
  }
}
