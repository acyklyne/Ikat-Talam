'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, User, LogOut, ShoppingCart } from 'lucide-react';
import { Badge } from './ui/badge';
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
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/stories', label: 'Stories' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/donate', label: 'Donate' },
  { href: '/contact', label: 'Contact' },
];

const aiToolsLinks = [
    { href: '/enhance-story', label: 'AI Story Enhancer' },
    { href: '/design-studio', label: 'AI Design Studio' },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, login } = useAuth();
  const { getItemCount } = useCart();

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

  const adminLink = user === 'admin' ? [{ href: '/admin', label: 'Admin' }] : [];

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
          {adminLink.map((link) => (
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

        <div className="hidden md:flex items-center gap-4">
          {/* Cart Icon */}
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-4 w-4" />
              {getItemCount() > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {getItemCount()}
                </Badge>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-4 w-4" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm">
                  Logged in as {user}
                </div>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  if (user === 'admin') {
                    login('user');
                  } else {
                    login('admin');
                  }
                }} className="bg-gray-100 dark:bg-gray-700">
                  {user === 'admin' ? 'Switch to User' : 'Switch to Admin'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>

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
                  {adminLink.map((link) => (
                    <NavLink key={link.href} href={link.href} label={link.label} className="text-xl" />
                  ))}
                  <div className="border-t pt-6">
                     <h3 className="text-muted-foreground text-base font-semibold mb-2">AI Tools</h3>
                     {aiToolsLinks.map(link => (
                        <NavLink key={link.href} href={link.href} label={link.label} className="text-xl" />
                     ))}
                  </div>
                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted-foreground">Cart</span>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href="/cart">
                          <ShoppingCart className="h-4 w-4" />
                          {getItemCount() > 0 && (
                            <Badge
                              variant="destructive"
                              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                            >
                              {getItemCount()}
                            </Badge>
                          )}
                        </Link>
                      </Button>
                    </div>
                    {user ? (
                      <div>
                        <p className="text-muted-foreground">Logged in as {user}</p>
                        <Button onClick={logout} variant="outline" className="w-full mt-2">
                          Logout
                        </Button>
                        <Button onClick={() => {
                          if (user === 'admin') {
                            login('user');
                          } else {
                            login('admin');
                          }
                        }} variant="outline" className="w-full mt-2">
                          {user === 'admin' ? 'Switch to User' : 'Switch to Admin'}
                        </Button>
                      </div>
                    ) : (
                      <Button asChild className="w-full">
                        <Link href="/login">Login</Link>
                      </Button>
                    )}
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
