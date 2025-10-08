// Shared in-memory user store for demo purposes
// In a real app, this would be a database
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  emailVerified: boolean;
  createdAt: string;
  verificationToken?: string;
}

let users: User[] = [
  {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: password
    role: 'user',
    emailVerified: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: password
    role: 'admin',
    emailVerified: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Backdoor User',
    email: 'backdoor@user.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: password
    role: 'user',
    emailVerified: true,
    createdAt: new Date().toISOString(),
  },
];

export const getUsers = (): User[] => users;
export const setUsers = (newUsers: User[]): void => {
  users = newUsers;
};

export const addUser = (user: User): void => {
  users.push(user);
};

export const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

export const findUserById = (id: number): User | undefined => {
  return users.find(user => user.id === id);
};

export const updateUser = (id: number, updates: Partial<User>): void => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
  }
};
