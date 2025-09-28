'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { CheckCircle, Package, Truck, Mail } from 'lucide-react';

export default function ConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderId] = useState(searchParams.get('orderId') || 'N/A');

  // Redirect if no order ID (user accessed page directly)
  useEffect(() => {
    if (!orderId || orderId === 'N/A') {
      router.push('/products');
    }
  }, [orderId, router]);

  const orderDetails = {
    id: orderId,
    customerName: 'John Doe', 
    email: 'john@example.com',
    total: 1250.00,
    items: [
      { name: 'Kalinga Woven Traditional Dress', quantity: 1, price: 859.00 },
      { name: 'Ifugao Woven Table Runner', quantity: 2, price: 599.00 },
    ],
    shippingAddress: {
      street: '123 Main Street',
      city: 'New York',
      postalCode: '10001',
      country: 'United States',
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        {/* Order Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Order #{orderId}</span>
              <Badge className={getStatusColor('pending')}>
                Pending
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Shipping Information</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>{orderDetails.customerName}</p>
                  <p>{orderDetails.shippingAddress.street}</p>
                  <p>
                    {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.postalCode}
                  </p>
                  <p>{orderDetails.shippingAddress.country}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Order Details</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Order ID: #{orderId}</p>
                  <p>Email: {orderDetails.email}</p>
                  <p>Date: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Items Ordered</h3>
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span>${orderDetails.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Email Confirmation</h4>
                <p className="text-sm text-muted-foreground">
                  You'll receive an email confirmation with your order details shortly.
                </p>
              </div>
              <div className="text-center">
                <Package className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Order Processing</h4>
                <p className="text-sm text-muted-foreground">
                  We'll process your order within 1-2 business days.
                </p>
              </div>
              <div className="text-center">
                <Truck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Shipping Updates</h4>
                <p className="text-sm text-muted-foreground">
                  You'll receive tracking information once your order ships.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/gallery">View Our Gallery</Link>
          </Button>
        </div>

        {/* Contact Information */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Questions about your order?</p>
          <p>Contact us at <a href="mailto:support@ikat-talam.com" className="text-primary hover:underline">support@ikat-talam.com</a></p>
        </div>
      </div>
    </div>
  );
}
