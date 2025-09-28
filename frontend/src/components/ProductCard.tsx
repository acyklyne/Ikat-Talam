'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IProduct } from '../lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../hooks/use-toast';
import { useAuth } from '../contexts/AuthContext';

type ProductCardProps = {
  product: IProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  return (
    <Card className="overflow-hidden flex flex-col h-full group">
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            data-ai-hint={product.ai_hint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <Badge variant="secondary" className="mb-2">{product.category}</Badge>
        <CardTitle className="font-headline text-xl mb-1">{product.name}</CardTitle>
        <CardDescription>{product.short_description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <p className="text-xl font-semibold text-primary">${Number(product.price).toFixed(2)}</p>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/products/${product.id}`}>View Details</Link>
          </Button>
          {user !== 'admin' && (
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
