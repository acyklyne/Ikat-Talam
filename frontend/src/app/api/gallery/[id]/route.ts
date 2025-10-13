import { NextRequest, NextResponse } from 'next/server';
import { galleryItems, updateGalleryItem, deleteGalleryItem, stories } from '../../../../lib/data';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const galleryItem = galleryItems.find(g => g.id === parseInt(params.id));
    if (!galleryItem) {
      return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
    }
    return NextResponse.json(galleryItem);
  } catch (error) {
    console.error('Error fetching gallery item:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery item' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const id = parseInt(params.id);
    updateGalleryItem(id, body);
    return NextResponse.json({ message: 'Gallery item updated successfully' });
  } catch (error) {
    console.error('Error updating gallery item:', error);
    return NextResponse.json({ error: 'Failed to update gallery item' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const relatedStories = stories.filter(s => s.relatedGalleryId === id).map(s => s.id);
    deleteGalleryItem(id);
    return NextResponse.json({ message: 'Gallery item deleted successfully', relatedStories });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 });
  }
}
