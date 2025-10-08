import { NextRequest, NextResponse } from 'next/server';
import { galleryItems, addGalleryItem } from '../../../lib/data';

export async function GET() {
  try {
    return NextResponse.json(galleryItems);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery items' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newGalleryItem = {
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
      category: body.category,
      aiHint: body.aiHint,
    };

    addGalleryItem(newGalleryItem);
    return NextResponse.json({ message: 'Gallery item created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 });
  }
}


