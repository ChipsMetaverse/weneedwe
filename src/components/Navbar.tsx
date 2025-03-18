
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Heart, ChevronDown } from 'lucide-react';

// Navigation items
const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#about' },
  { name: 'Gallery', href: '#gallery' },
  { 
    name: 'Get Involved', 
    href: '#',
    children: [
      { name: 'Volunteer', href: '#volunteer' },
      { name: 'Donate', href: '#donate' },
      { name: 'Events', href: '#events' }
    ]
  },
  { name: 'Contact', href: '#contact' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownToggle = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 lg:px-10',
        isScrolled ? 'py-3 bg-white/80 backdrop-blur-lg shadow-sm' : 'py-5 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a 
          href="#home" 
          className="text-xl font-display font-medium tracking-tight flex items-center"
        >
          <span className="text-primary mr-1">
            <Heart className="h-5 w-5 inline-block" />
          </span>
          WeneedWe
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              {item.children ? (
                <div className="relative">
                  <button
                    onClick={() => handleDropdownToggle(item.name)}
                    className="flex items-center text-sm font-medium opacity-80 hover:opacity-100 transition-opacity"
                    aria-expanded={activeDropdown === item.name}
                  >
                    {item.name}
                    <ChevronDown className={cn(
                      "ml-1 h-4 w-4 transition-transform",
                      activeDropdown === item.name && "transform rotate-180"
                    )} />
                  </button>
                  
                  {activeDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        {item.children.map((child) => (
                          <a
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary/50 hover:text-primary transition-colors"
                            role="menuitem"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {child.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href={item.href}
                  className="text-sm font-medium opacity-80 hover:opacity-100 transition-opacity"
                >
                  {item.name}
                </a>
              )}
            </div>
          ))}
          <a 
            href="#donate" 
            className="button-primary flex items-center gap-2"
          >
            <Heart className="w-4 h-4" />
            Donate
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-secondary/50 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-0 top-[57px] z-40 bg-white/90 backdrop-blur-lg md:hidden transition-transform duration-300 ease-in-out',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="flex flex-col h-full p-8 overflow-y-auto">
          {navItems.map((item, index) => (
            <div key={item.name} className="mb-4">
              {item.children ? (
                <div>
                  <button
                    onClick={() => handleDropdownToggle(item.name)}
                    className="flex items-center justify-between w-full text-lg font-medium py-3 rounded-lg transition-all hover:bg-secondary/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    aria-expanded={activeDropdown === item.name}
                  >
                    {item.name}
                    <ChevronDown className={cn(
                      "ml-1.5 h-5 w-5 transition-transform",
                      activeDropdown === item.name && "transform rotate-180"
                    )} />
                  </button>
                  
                  {activeDropdown === item.name && (
                    <div className="mt-1 ml-4 pl-4 border-l-2 border-secondary">
                      {item.children.map((child) => (
                        <a
                          key={child.name}
                          href={child.href}
                          className="block py-2.5 text-base text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => {
                            setActiveDropdown(null);
                            setIsMenuOpen(false);
                          }}
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href={item.href}
                  className="block text-lg font-medium w-full py-3 rounded-lg transition-all hover:bg-secondary/50"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              )}
            </div>
          ))}
          
          <div className="mt-auto pt-6">
            <a 
              href="#donate" 
              className="button-primary w-full flex items-center justify-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Heart className="w-4 h-4" />
              Donate Now
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
