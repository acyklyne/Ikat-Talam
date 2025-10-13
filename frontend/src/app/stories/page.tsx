import Link from 'next/link';
import { stories } from '../../lib/data';
import { StoryCard } from '../../components/StoryCard';
import { Button } from '../../components/ui/button';
import { Wand2 } from 'lucide-react';

export default function StoriesPage() {
  return (
    <div className="bg-card">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Cultural Stories</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Discover the rich histories, myths, and traditions woven into every textile.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-16">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>


      </div>
    </div>
  );
}
