import { products } from '../../lib/data';
import { ProductCard } from '../../components/ProductCard';

export default function ProductsPage() {
  return (
    <div className="bg-card">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Collections</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Browse our curated collection of handwoven textiles from the Cordillera region. Each piece tells a story.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
