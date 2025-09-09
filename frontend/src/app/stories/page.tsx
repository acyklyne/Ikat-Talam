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

        <div className="mt-20 text-center p-8 border-2 border-dashed border-primary/50 rounded-lg max-w-3xl mx-auto">
            <Wand2 className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="font-headline text-2xl font-semibold mb-2">Enhance a Story with AI</h2>
            <p className="text-muted-foreground mb-4">
                Use our GenAI tool to add rich, contextual details to your own cultural story drafts.
            </p>
            <Button asChild>
                <Link href="/enhance-story">Try the AI Story Enhancer</Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
