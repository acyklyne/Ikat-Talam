import { NextRequest, NextResponse } from 'next/server';
import { products, updateProduct, deleteProduct, stories } from '../../../../lib/data';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = products.find(p => p.id === parseInt(params.id));
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const id = parseInt(params.id);
    updateProduct(id, body);
    return NextResponse.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const relatedStories = stories.filter(s => s.relatedProductId === id).map(s => s.id);
    deleteProduct(id);
    return NextResponse.json({ message: 'Product deleted successfully', relatedStories });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
