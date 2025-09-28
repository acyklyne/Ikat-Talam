import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const response = await fetch(`${API_BASE_URL}/gallery/${params.id}`, {
      method: 'PUT',
      headers: backendHeaders,
      body: backendBody,
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error updating gallery item:', error);
    return NextResponse.json({ error: 'Failed to update gallery item' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery/${params.id}`, {
      method: 'DELETE',
    });
    return NextResponse.json({ success: true }, { status: response.status });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 });
  }
}
