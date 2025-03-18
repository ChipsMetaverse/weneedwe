import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import DataInitializer from './DataInitializer';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <Link
      to={href}
      className="text-sm font-medium transition-colors hover:text-primary"
    >
      {children}
    </Link>
  );
};

interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, children, onClick }) => {
  return (
    <Link
      to={href}
      className="text-lg font-medium transition-colors hover:text-primary"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm transition-all ${
      scrolled ? 'border-border/40 py-2' : 'border-transparent py-4'
    }`}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="text-primary">WeneedWe</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="#features">Services</NavLink>
          <NavLink href="#events">Events</NavLink>
          <NavLink href="#media">Gallery</NavLink>
          <NavLink href="#blog">News</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <DataInitializer />
          <Button size={scrolled ? 'default' : 'lg'}>Donate</Button>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-8">
                <MobileNavLink href="#features" onClick={closeMenu}>Services</MobileNavLink>
                <MobileNavLink href="#events" onClick={closeMenu}>Events</MobileNavLink>
                <MobileNavLink href="#media" onClick={closeMenu}>Gallery</MobileNavLink>
                <MobileNavLink href="#blog" onClick={closeMenu}>News</MobileNavLink>
                <MobileNavLink href="#contact" onClick={closeMenu}>Contact</MobileNavLink>
                <Button className="mt-4">Donate</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
