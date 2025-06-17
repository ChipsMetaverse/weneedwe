import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Menu,
  Heart,
  ChevronDown,
  ChevronRight,
  BookOpen,
  HeartHandshake,
  Award,
  Info,
  Calendar,
  FileText,
  User,
  MapPin
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Logo with notification dot
const Logo = () => (
  <Link to="/" className="flex items-center gap-2 mr-auto">
    <div className="relative">
      <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
        W
      </div>
      <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-accent border-2 border-white animate-pulse" />
    </div>
    <span className="font-display font-bold text-2xl text-primary">
      WeneedWe
    </span>
  </Link>
);

// Desktop HIV Specialist info
const DesktopHIVInfo = () => (
  <div className="hidden lg:flex items-center bg-red-50 text-red-700 rounded-full px-3 py-1 mr-4 text-sm">
    <span className="font-semibold">Need an HIV Specialist?</span>
    <span className="mx-1">|</span>
    <a href="tel:7738811711" className="font-bold hover:underline cursor-pointer">773-881-1711</a>
  </div>
);

// Auth Buttons
const AuthButtons = ({ user, loading, signOut }) => {
  if (loading) return null;
  return user ? (
    <div className="flex items-center gap-2">
      <NavLink to="/admin">
        <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-1">
          Dashboard
        </Button>
      </NavLink>
      <Button variant="outline" size="sm" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Link to="/volunteer" className="hidden sm:flex items-center gap-1 button-outline px-6 py-2 rounded-full">
        <Heart className="h-4 w-4 text-primary" /> Volunteer
      </Link>
      <Link to="/donate" className="hidden sm:flex items-center gap-1 button-primary px-6 py-2 rounded-full">
        <span className="hiv-ribbon-container mr-1">
          <span className="hiv-ribbon scale-[0.4]" />
        </span>
        Support Us
      </Link>
    </div>
  );
};

// Generic Nav link for desktop
const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      clsx(
        'px-4 py-2 rounded-full transition-all',
        isActive ? 'text-foreground bg-foreground/10' : 'text-foreground/80 hover:text-foreground hover:bg-foreground/5'
      )
    }
  >
    {children}
  </NavLink>
);

// Programs dropdown
const ProgramDropdown = () => (
  <div className="relative group">
    <button
      className="px-4 py-2 rounded-full text-foreground/80 hover:text-foreground flex items-center gap-1 transition-all"
      aria-haspopup="menu"
      aria-expanded="false"
    >
      Programs <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
    </button>

    <div
      className="absolute top-full left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 glass p-2 rounded-xl shadow-lg min-w-48 flex flex-col transition-all duration-300 pt-2"
      role="menu"
    >

      <NavLink to="/programs/bw-self" className="menu-item flex items-center gap-2">
        <HeartHandshake className="h-4 w-4 text-primary" /> BW-SELF Advocacy
      </NavLink>
      <NavLink to="/webinars" className="menu-item flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-primary" /> Webinar Series
      </NavLink>
      <NavLink to="/resources" className="menu-item flex items-center gap-2">
        <Info className="h-4 w-4 text-primary" /> Resource Center
      </NavLink>    </div>
  </div>
);

// Mobile sheet navigation item
const MobileNavItem = ({ to, label, icon, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 text-base font-medium py-3 transition-colors hover:text-primary"
  >
    {icon || <ChevronRight className="h-4 w-4 text-primary" />} {label}
  </NavLink>
);

// Mobile HIV info
const MobileHIVInfo = () => (
  <div className="bg-red-50 text-red-700 rounded-lg p-3 mb-4 text-center">
    <p className="font-semibold">Need an HIV Specialist?</p>
    <p className="font-bold">Call: <a href="tel:7738811711" className="hover:underline cursor-pointer">773-881-1711</a></p>
  </div>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled ? 'py-3 glass shadow-md' : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 flex items-center">
        <Logo />
        <DesktopHIVInfo />

        <nav className="hidden md:flex items-center gap-4">
          <NavItem to="/about-us">Home</NavItem>
          <ProgramDropdown />
          <NavItem to="/blog">Blog</NavItem>
          <NavLink to="/just-the-facts" className="hiv-awareness-badge flex items-center gap-1 hover:opacity-80 transition-opacity">
            <span className="hiv-ribbon-container">
              <span className="hiv-ribbon scale-[0.3]" />
            </span>
            <span>Just The Facts</span>
          </NavLink>
          <NavItem to="/contact">Contact</NavItem>
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          <AuthButtons user={user} loading={loading} signOut={signOut} />

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[80vw] max-w-sm">
              <MobileHIVInfo />
              <MobileNavItem to="/about-us" label="Home" icon={<User className="h-4 w-4 text-primary" />} onClick={() => setMenuOpen(false)} />

              <MobileNavItem to="/programs/bw-self" label="BW-SELF Program" icon={<HeartHandshake className="h-4 w-4 text-primary" />} onClick={() => setMenuOpen(false)} />
              <MobileNavItem to="/webinars" label="Webinar Series" icon={<BookOpen className="h-4 w-4 text-primary" />} onClick={() => setMenuOpen(false)} />
              <MobileNavItem to="/resources" label="Resource Center" icon={<Info className="h-4 w-4 text-primary" />} onClick={() => setMenuOpen(false)} />
              <MobileNavItem to="/just-the-facts" label="Just The Facts" icon={<FileText className="h-4 w-4 text-primary" />} onClick={() => setMenuOpen(false)} />
              <MobileNavItem to="/blog" label="Blog" icon={<FileText className="h-4 w-4 text-primary" />} onClick={() => setMenuOpen(false)} />
              <MobileNavItem to="/contact" label="Contact" icon={<MapPin className="h-4 w-4 text-primary" />} onClick={() => setMenuOpen(false)} />

              <div className="border-t pt-6 flex flex-col gap-3">
                <Link to="/volunteer" onClick={() => setMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-start button-outline">
                    <Heart className="h-4 w-4 mr-2 text-primary" /> Volunteer
                  </Button>
                </Link>
                <Link to="/donate" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full justify-start button-primary">
                    <span className="hiv-ribbon-container mr-1"><span className="hiv-ribbon scale-[0.3]"/></span> Support Our Work
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
