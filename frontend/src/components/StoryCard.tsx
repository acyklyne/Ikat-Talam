import Image from 'next/image';
import Link from 'next/link';
import { IStory } from '../lib/data';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

type StoryCardProps = {
  story: IStory;
};

export function StoryCard({ story }: StoryCardProps) {
  return (
    <div className="group flex flex-col sm:flex-row items-center gap-6">
      <div className="relative w-full sm:w-1/3 aspect-square overflow-hidden rounded-lg shadow-md">
        <Image
          src={story.imageUrl}
          alt={story.title}
          fill
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          data-ai-hint={story.aiHint}
        />
      </div>
      <div className="w-full sm:w-2/3">
        <h3 className="font-headline text-2xl font-semibold mb-2">{story.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">{story.excerpt}</p>
        <Button variant="link" asChild className="p-0 h-auto">
          <Link href={`/stories/${story.id}`}>
            Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
