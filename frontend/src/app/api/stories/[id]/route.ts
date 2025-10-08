import { NextRequest, NextResponse } from 'next/server';
import { stories, updateStory, deleteStory } from '../../../../lib/data';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const story = stories.find(s => s.id === parseInt(params.id));
    if (!story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }
    return NextResponse.json(story);
  } catch (error) {
    console.error('Error fetching story:', error);
    return NextResponse.json({ error: 'Failed to fetch story' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const id = parseInt(params.id);
    updateStory(id, body);
    return NextResponse.json({ message: 'Story updated successfully' });
  } catch (error) {
    console.error('Error updating story:', error);
    return NextResponse.json({ error: 'Failed to update story' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    deleteStory(id);
    return NextResponse.json({ message: 'Story deleted successfully' });
  } catch (error) {
    console.error('Error deleting story:', error);
    return NextResponse.json({ error: 'Failed to delete story' }, { status: 500 });
  }
}
