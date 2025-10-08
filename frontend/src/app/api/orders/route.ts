import { NextRequest, NextResponse } from 'next/server';
import { orders, addOrder } from '../../../lib/data';

export async function GET() {
  try {
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newOrder = {
      customerName: body.customerName,
      email: body.email,
      items: body.items,
      total: body.total,
      status: body.status,
      date: body.date,
    };

    addOrder(newOrder);
    return NextResponse.json({ message: 'Order created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
