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

type ProductCardProps = {
  product: IProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full group">
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            data-ai-hint={product.aiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <Badge variant="secondary" className="mb-2">{product.category}</Badge>
        <CardTitle className="font-headline text-xl mb-1">{product.name}</CardTitle>
        <CardDescription>{product.shortDescription}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <p className="text-xl font-semibold text-primary">${product.price.toFixed(2)}</p>
        <Button asChild>
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
