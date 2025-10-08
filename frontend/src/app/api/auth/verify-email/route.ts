import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { findUserByEmail, updateUser } from '../../../../lib/auth-data';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Verification token is required' }, { status: 400 });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { email: string };
    } catch (error) {
      return NextResponse.json({ error: 'Invalid or expired verification token' }, { status: 400 });
    }

    // Find user
    const user = findUserByEmail(decoded.email);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update user verification status
    updateUser(user.id, { emailVerified: true, verificationToken: undefined });

    // Redirect to login page with success message
    return NextResponse.redirect(new URL('/login?verified=true', request.url));
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
