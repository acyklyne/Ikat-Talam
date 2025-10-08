'use client';

import { useState, useMemo } from 'react';
import { galleryItems } from '../../lib/data';
import { GalleryItem } from '../../components/GalleryItem';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Get unique categories from gallery items
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(galleryItems.map(item => item.category)));
    return ['All', ...uniqueCategories.sort()];
  }, []);

  // Filter items based on selected category
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') {
      return galleryItems;
    }
    return galleryItems.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Gallery of Traditions</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A visual showcase of Cordillera textiles, traditions, and the artisans who keep them alive.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {filteredItems.map((item) => (
          <div key={item.id} id={String(item.id)} className="break-inside-avoid">
            <GalleryItem item={item} />
          </div>
        ))}
      </div>

      {/* No items message */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No items found in this category.</p>
        </div>
      )}
    </div>
  );
}
