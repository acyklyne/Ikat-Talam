import { galleryItems } from '../../lib/data';
import { GalleryItem } from '../../components/GalleryItem';

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Gallery of Traditions</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A visual showcase of Cordillera textiles, traditions, and the artisans who keep them alive.
        </p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {galleryItems.map((item) => (
          <div key={item.id} id={String(item.id)} className="break-inside-avoid">
            <GalleryItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
