import { notFound } from 'next/navigation';
import { stories } from '../../../lib/data';
import Image from 'next/image';
import { Button } from '../../../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface StoryPageProps {
  params: { id: string };
}

export default function StoryPage({ params }: StoryPageProps) {
  const storyId = parseInt(params.id);
  const story = stories.find(s => s.id === storyId);

  if (!story) {
    notFound();
  }

  return (
    <div className="bg-card min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/stories">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Stories
          </Link>
        </Button>

        <article className="max-w-4xl mx-auto">
          <div className="relative w-full aspect-video mb-8 overflow-hidden rounded-lg shadow-md">
            <Image
              src={story.imageUrl}
              alt={story.title}
              fill
              className="object-cover"
              data-ai-hint={story.aiHint || ''}
            />
          </div>

          <h1 className="font-headline text-3xl md:text-4xl font-bold mb-6">
            {story.title}
          </h1>

          {story.excerpt && (
            <p className="text-xl text-muted-foreground mb-8 italic">
              {story.excerpt}
            </p>
          )}

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: story.content }}
          />
        </article>
      </div>
    </div>
  );
}
