'use client';

import Image from 'next/image';
import { IGalleryItem } from '../lib/data';
import { SocialShareButtons } from './SocialShareButtons';
import { useState, useEffect } from 'react';

type GalleryItemProps = {
  item: IGalleryItem;
};

export function GalleryItem({ item }: GalleryItemProps) {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.origin + `/gallery#${item.id}`);
  }, [item.id]);

  return (
    <div className="group relative w-full h-full overflow-hidden rounded-lg shadow-lg">
      <Image
        src={item.imageUrl}
        alt={item.title}
        width={400}
        height={400}
        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        data-ai-hint={item.aiHint}
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 p-4 flex flex-col justify-end text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="font-headline text-lg font-bold">{item.title}</h3>
        <p className="text-sm">{item.description}</p>
        <div className="mt-2">
          {currentUrl && <SocialShareButtons url={currentUrl} title={item.title} />}
        </div>
      </div>
    </div>
  );
}
