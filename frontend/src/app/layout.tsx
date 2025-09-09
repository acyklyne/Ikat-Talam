import type { Metadata } from 'next';
import './globals.css';
import { cn } from '../lib/utils';
import { Toaster } from '../components/ui/toaster';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'Ikat Talam: Story of Weave and Ancestry',
  description: "A digital platform preserving Cordillera's indigenous weaving traditions through e-commerce and storytelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased bg-background text-foreground')}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
