import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
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

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    const users = await readUsers();

    // Find user
    const user = users.find(u => u.id === decoded.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
