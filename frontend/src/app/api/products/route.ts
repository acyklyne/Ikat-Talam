import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type');
    let backendBody;
    let backendHeaders = {};

    if (contentType && contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      backendBody = formData;
    } else {
      const body = await request.json();
      backendBody = JSON.stringify(body);
      backendHeaders = { 'Content-Type': 'application/json' };
    }

    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: backendHeaders,
      body: backendBody,
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}


