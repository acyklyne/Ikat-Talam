import Link from 'next/link';
import { Logo } from './Logo';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/stories', label: 'Stories' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-muted-foreground text-sm">
              Preserving Cordillera's weaving traditions through technology and trade.
            </p>
          </div>
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-headline font-semibold mb-4">Explore</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
             <div>
              <h3 className="font-headline font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/contact?subject=Donation" className="text-sm text-muted-foreground hover:text-primary transition-colors">Donate</Link></li>
                <li><Link href="/contact?subject=Partnership" className="text-sm text-muted-foreground hover:text-primary transition-colors">Partnerships</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              </ul>
            </div>
             <div>
                <h3 className="font-headline font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></Link>
                  <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></Link>
                  <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></Link>
                </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Ikat Talam. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
