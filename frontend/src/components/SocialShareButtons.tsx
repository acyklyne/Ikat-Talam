'use client';

import { Twitter, Facebook, Link as LinkIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '../hooks/use-toast';

type SocialShareButtonsProps = {
  url: string;
  title: string;
  className?: string;
};

export function SocialShareButtons({ url, title, className }: SocialShareButtonsProps) {
  const { toast } = useToast();

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Link Copied!",
      description: "The link has been copied to your clipboard.",
    });
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        asChild
      >
        <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
          <Twitter className="h-4 w-4" />
        </a>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        asChild
      >
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
          <Facebook className="h-4 w-4" />
        </a>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={copyToClipboard}
        aria-label="Copy link"
      >
        <LinkIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
