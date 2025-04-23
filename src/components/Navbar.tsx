import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Heart, ChevronDown, ChevronRight, BookOpen, HeartHandshake, Award, Info } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderAuthButtons = () => {
    if (loading) return null;
    
    if (user) {
      return (
        <>
          <Link to="/admin">
            <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-1">
              Dashboard
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={signOut}>
            Sign Out
          </Button>
        </>
      );
    }
    
    return (
      <>
        <Link to="/volunteer" className="hidden sm:block">
          <div className="button-outline flex items-center gap-1">
            <Heart className="h-4 w-4 text-primary" />
            Volunteer
          </div>
        </Link>
        
        <Link to="/donate" className="hidden sm:block">
          <div className="button-primary flex items-center gap-1 px-6 py-2 rounded-full">
            <div className="hiv-ribbon-container mr-1">
              <div className="hiv-ribbon scale-[0.4]"></div>
            </div>
            <span className="relative z-10">Support Us</span>
          </div>
        </Link>
      </>
    );
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'py-3 glass shadow-md' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
              W
            </div>
            <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-accent border-2 border-white animate-pulse"></div>
          </div>
          <span className="font-display font-bold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            WeneedWe
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-4">
          <NavItem href="/about-us" label="About Us" />
          
          {/* Programs Dropdown - Simplified */}
          <div className="relative group">
            <button className="px-4 py-2 rounded-full text-foreground/80 hover:text-foreground flex items-center gap-1 transition-all">
              Programs
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            
            <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 top-full left-1/2 -translate-x-1/2 transition-all duration-300 pt-2">
              <div className="glass p-2 rounded-xl shadow-lg min-w-48 flex flex-col">
                <Link to="/programs/hiv-awareness" className="px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors flex items-center gap-2 ribbon-shine">
                  <div className="hiv-ribbon-container">
                    <div className="hiv-ribbon scale-[0.4]"></div>
                  </div>
                  HIV Awareness
                </Link>
                <Link to="/programs/bw-self" className="px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors flex items-center gap-2">
                  <HeartHandshake className="h-4 w-4 text-primary" />
                  BW-SELF Advocacy
                </Link>
                <Link to="/webinars" className="px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  Webinar Series
                </Link>
                <Link to="/resources" className="px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Resource Center
                </Link>
              </div>
            </div>
          </div>
          
          <NavItem href="/events" label="Events" />
          <Link to="/blog" className="px-4 py-2 rounded-full text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-all">
            Blog
          </Link>
          <div className="hiv-awareness-badge">
            <div className="hiv-ribbon-container">
              <div className="hiv-ribbon scale-[0.3]"></div>
            </div>
            <span>HIV Awareness</span>
          </div>
          <NavItem href="/contact" label="Contact" />
        </nav>

        <div className="flex items-center gap-3">
          {renderAuthButtons()}
          
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[80vw] max-w-sm">
              <div className="flex flex-col gap-4 mt-8">
                <MobileNavItem href="/about-us" label="About Us" onClick={() => setIsMenuOpen(false)} />
                <div className="ribbon-card py-2 px-3 my-2">
                  <MobileNavItem href="/programs/hiv-awareness" label="HIV Awareness" onClick={() => setIsMenuOpen(false)} 
                    icon={<div className="hiv-ribbon-container mr-1"><div className="hiv-ribbon scale-[0.3]"></div></div>} />
                </div>
                <MobileNavItem href="/programs/bw-self" label="BW-SELF Program" onClick={() => setIsMenuOpen(false)} />
                <MobileNavItem href="/webinars" label="Webinar Series" onClick={() => setIsMenuOpen(false)} />
                <MobileNavItem href="/resources" label="Resource Center" onClick={() => setIsMenuOpen(false)} />
                <MobileNavItem href="/events" label="Events" onClick={() => setIsMenuOpen(false)} />
                <MobileNavItem href="/blog" label="Blog" onClick={() => setIsMenuOpen(false)} />
                <MobileNavItem href="/contact" label="Contact" onClick={() => setIsMenuOpen(false)} />
                
                <div className="border-t pt-6 flex flex-col gap-3 mt-2">
                  <Link to="/volunteer" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start button-outline">
                      <Heart className="h-4 w-4 mr-2 text-primary" />
                      Volunteer
                    </Button>
                  </Link>
                  <Link to="/donate" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full justify-start button-primary">
                      <div className="hiv-ribbon-container mr-1">
                        <div className="hiv-ribbon scale-[0.3]"></div>
                      </div>
                      Support Our Work
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

const NavItem = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    className="px-4 py-2 rounded-full text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-all"
  >
    {label}
  </a>
);

const MobileNavItem = ({ 
  href, 
  label, 
  onClick, 
  icon 
}: { 
  href: string; 
  label: string; 
  onClick: () => void; 
  icon?: React.ReactNode 
}) => (
  <a
    href={href}
    className="text-base font-medium py-3 transition-colors hover:text-primary flex items-center"
    onClick={onClick}
  >
    {icon || <ChevronRight className="h-4 w-4 mr-2 text-primary" />}
    {label}
  </a>
);

export default Navbar;
