import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Heart, ChevronDown, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'py-3 glass bg-opacity-80 backdrop-blur-lg shadow-md' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="relative">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
              W
            </div>
            <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-accent border-2 border-white animate-pulse"></div>
          </div>
          <span className="font-display font-bold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            WeneedWe
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavItem href="/about-us" label="About Us" />
          <NavItem href="#features" label="Services" />
          
          <div className="relative group">
            <button 
              className="px-4 py-2 rounded-full text-foreground/80 hover:text-foreground flex items-center gap-1 transition-all"
              onClick={() => toggleDropdown('events')}
            >
              Events
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            
            <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 top-full left-1/2 -translate-x-1/2 transition-all duration-300 pt-2">
              <div className="glass p-2 rounded-xl shadow-lg min-w-48 flex flex-col">
                <a href="#upcoming" className="px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  Upcoming Events
                </a>
                <a href="#past" className="px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  Past Events
                </a>
                <a href="#calendar" className="px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  Calendar
                </a>
              </div>
            </div>
          </div>
          
          <NavItem href="#gallery" label="Gallery" />
          <NavItem href="#blog" label="News" />
          <NavItem href="#contact" label="Contact" />
        </nav>

        {/* Call to Action Buttons */}
        <div className="flex items-center gap-3">
          {!loading && (
            user ? (
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
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="hidden sm:flex items-center gap-1"
                >
                  <Heart className="h-4 w-4 text-primary" />
                  Volunteer
                </Button>
                
                <Link to="/auth">
                  <Button className="shadow-lg relative overflow-hidden group">
                    <span className="relative z-10">Support Us</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  </Button>
                </Link>
              </>
            )
          )}
          
          {/* Mobile Menu Button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[80vw] max-w-md">
              <div className="flex flex-col gap-6 mt-8">
                <MobileNavItem href="/about-us" label="About Us" onClick={() => setIsMenuOpen(false)} />
                <MobileNavItem href="#features" label="Services" onClick={() => setIsMenuOpen(false)} />
                <MobileNavItem href="#events" label="Events" onClick={() => setIsMenuOpen(false)} />
                <MobileNavItem href="#gallery" label="Gallery" onClick={() => setIsMenuOpen(false)} />
                <MobileNavItem href="#blog" label="News" onClick={() => setIsMenuOpen(false)} />
                <MobileNavItem href="#contact" label="Contact" onClick={() => setIsMenuOpen(false)} />
                
                <div className="border-t pt-6 flex flex-col gap-3">
                  {!loading && (
                    user ? (
                      <>
                        <Link to="/admin">
                          <Button variant="outline" className="w-full justify-start">
                            Dashboard
                          </Button>
                        </Link>
                        <Button variant="default" className="w-full justify-start" onClick={signOut}>
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" className="w-full justify-start">
                          <Heart className="h-4 w-4 mr-2" />
                          Volunteer
                        </Button>
                        <Link to="/auth">
                          <Button className="w-full justify-start">
                            Support Our Work
                          </Button>
                        </Link>
                      </>
                    )
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

// Desktop Navigation Item
const NavItem = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    className="px-4 py-2 rounded-full text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-all"
  >
    {label}
  </a>
);

// Mobile Navigation Item
const MobileNavItem = ({ href, label, onClick }: { href: string; label: string; onClick: () => void }) => (
  <a
    href={href}
    className="text-lg font-medium py-2 transition-colors hover:text-primary flex items-center"
    onClick={onClick}
  >
    <ChevronRight className="h-5 w-5 mr-2 text-primary" />
    {label}
  </a>
);

export default Navbar;