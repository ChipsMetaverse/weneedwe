
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { user, signOut, loading } = useAuth();

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-primary">WeneedWe</a>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#features" className="text-gray-600 hover:text-primary">Features</a>
          <a href="#events" className="text-gray-600 hover:text-primary">Events</a>
          <a href="#gallery" className="text-gray-600 hover:text-primary">Gallery</a>
          <a href="#blog" className="text-gray-600 hover:text-primary">Blog</a>
          <a href="#contact" className="text-gray-600 hover:text-primary">Contact</a>
        </div>
        <div className="flex items-center space-x-3">
          {!loading && (
            user ? (
              <Button variant="outline" onClick={signOut}>Sign Out</Button>
            ) : (
              <a href="/auth">
                <Button>Sign In</Button>
              </a>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
