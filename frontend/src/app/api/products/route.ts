import { NextRequest, NextResponse } from 'next/server';
import { products, addProduct } from '../../../lib/data';

export async function GET() {
  try {
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newProduct = {
      name: body.name,
      category: body.category,
      price: body.price,
      short_description: body.short_description,
      description: body.description,
      image_url: body.image_url,
      ai_hint: body.ai_hint,
    };

    addProduct(newProduct);
    return NextResponse.json({ message: 'Product created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}


