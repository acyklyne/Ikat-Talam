import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { ProductCard } from '../components/ProductCard';
import { StoryCard } from '../components/StoryCard';
import { products, stories, galleryItems } from '../lib/data';
import { GalleryItem } from '../components/GalleryItem';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredProducts = products.slice(0, 3);
  const featuredStories = stories.slice(0, 2);
  const featuredGalleryItems = galleryItems.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full">
        <Image
          src="/images/bg.png"
          alt="Traditional weaving loom"
          fill
          className="object-cover"
          priority
          data-ai-hint="weaving loom"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold !leading-tight">
            Ikat Talam: The Story of <br /> Weave and Ancestry
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            Discover the rich heritage of Cordillera weaving traditions. Support local artisans and bring home a piece of history.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/products">Shop Collections</Link>
          </Button>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-semibold mb-4">Our Mission</h2>
          <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
            We are dedicated to preserving and promoting the indigenous weaving traditions of the Cordillera region. Through e-commerce, digital storytelling, and cultural archiving, we provide sustainable livelihood opportunities for local weavers while keeping their priceless cultural heritage alive for generations to come.
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-headline text-3xl md:text-4xl font-semibold">Featured Products</h2>
            <Button variant="link" asChild>
              <Link href="/products">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Cultural Stories */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-headline text-3xl md:text-4xl font-semibold">Cultural Stories</h2>
            <Button variant="link" asChild>
              <Link href="/stories">Read More <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {featuredStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-headline text-3xl md:text-4xl font-semibold">Gallery of Traditions</h2>
            <Button variant="link" asChild>
              <Link href="/gallery">Explore Gallery <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {featuredGalleryItems.map((item) => (
                <div key={item.id} className="w-full h-64">
                    <GalleryItem item={item} />
                </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-semibold mb-4">Support Our Weavers</h2>
            <p className="max-w-2xl mx-auto text-lg mb-8">
                Your support helps us sustain these ancient traditions. Make a donation or send an inquiry to learn more about our cause.
            </p>
            <div className="flex justify-center gap-4">
                <Button variant="outline" size="lg" asChild>
                    <Link href="/donate">Donate Now</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                    <Link href="/contact">Contact Us</Link>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}
