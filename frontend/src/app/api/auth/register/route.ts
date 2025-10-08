import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { promises as fs } from 'fs';
import path from 'path';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  emailVerified: boolean;
  createdAt: string;
}

const usersFilePath = path.resolve('./users.json');

const readUsers = async (): Promise<User[]> => {
  const data = await fs.readFile(usersFilePath, 'utf-8');
  return JSON.parse(data) as User[];
};

const writeUsers = async (users: User[]): Promise<void> => {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    const users = await readUsers();

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: Date.now(), // Simple ID generation for demo
      name,
      email,
      password: hashedPassword,
      role: 'user' as const,
      emailVerified: false,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    await writeUsers(users);

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Create response with token in cookie
    const response = NextResponse.json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        emailVerified: newUser.emailVerified,
        createdAt: newUser.createdAt,
      },
      token,
    });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
