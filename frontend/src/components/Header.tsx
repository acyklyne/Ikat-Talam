'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { cn } from '../lib/utils';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/stories', label: 'Stories' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/donate', label: 'Donate' },
  { href: '/contact', label: 'Contact' },
  { href: '/admin', label: 'Admin' },
];

const aiToolsLinks = [
    { href: '/enhance-story', label: 'AI Story Enhancer' },
    { href: '/design-studio', label: 'AI Design Studio' },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const NavLink = ({ href, label, className }: { href: string; label: string; className?: string }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        onClick={() => setIsOpen(false)}
        className={cn(
          'transition-colors hover:text-primary',
          isActive ? 'text-primary font-semibold' : 'text-muted-foreground',
          className
        )}
      >
        {label}
      </Link>
    );
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
           <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus:outline-none">
              AI Tools
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {aiToolsLinks.map(link => (
                 <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href}>{link.label}</Link>
                 </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="p-4">
                <Link href="/" onClick={() => setIsOpen(false)} className="mb-8 block">
                  <Logo />
                </Link>
                <nav className="grid gap-6 text-lg font-medium">
                  {navLinks.map((link) => (
                    <NavLink key={link.href} href={link.href} label={link.label} className="text-xl" />
                  ))}
                  <div className="border-t pt-6">
                     <h3 className="text-muted-foreground text-base font-semibold mb-2">AI Tools</h3>
                     {aiToolsLinks.map(link => (
                        <NavLink key={link.href} href={link.href} label={link.label} className="text-xl" />
                     ))}
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
