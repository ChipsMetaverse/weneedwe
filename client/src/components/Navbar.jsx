import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { navigation } from '../data/siteData';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full py-4 bg-white shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-xl">
              W
            </div>
          </div>
          <span className="font-bold text-2xl bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
            WeneedWe
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navigation?.main?.map((item, index) => (
            <Link 
              key={index}
              to={item.path} 
              className="px-3 py-2 rounded-full text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all"
            >
              {item.title}
            </Link>
          ))}
          
          <div className="hiv-awareness-badge">
            <div className="hiv-ribbon-container">
              <div className="hiv-ribbon"></div>
            </div>
            <span>HIV Awareness</span>
          </div>
          
          {navigation?.actions?.map((action, index) => (
            <Button 
              key={index}
              variant="default"
              size="sm"
              asChild
            >
              <Link 
                to={action.path} 
                className={`px-4 py-2 rounded-full ${
                  action.isPrimary 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'border border-red-600 text-red-600 hover:bg-red-50'
                } transition-all`}
              >
                {action.title}
              </Link>
            </Button>
          ))}
        </nav>
        
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-2">
          <div className="container mx-auto px-4">
            {navigation?.main?.map((item, index) => (
              <Link 
                key={index}
                to={item.path} 
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <div className="mt-2 px-3">
              <Button variant="default" size="sm" className="w-full" asChild>
                <Link to="/donate" onClick={() => setIsMenuOpen(false)}>Donate</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar; 