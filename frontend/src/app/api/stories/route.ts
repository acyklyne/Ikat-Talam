import { NextRequest, NextResponse } from 'next/server';
import { stories, addStory } from '../../../lib/data';

export async function GET() {
  try {
    return NextResponse.json(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newStory = {
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      imageUrl: body.imageUrl,
      relatedProductId: body.relatedProductId,
      aiHint: body.aiHint,
    };

    addStory(newStory);
    return NextResponse.json({ message: 'Story created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating story:', error);
    return NextResponse.json({ error: 'Failed to create story' }, { status: 500 });
  }
}


