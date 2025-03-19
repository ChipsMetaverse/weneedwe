
import React from 'react';

const GalleryHeader: React.FC = () => {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium rounded-full bg-secondary text-primary">
        Our Community
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Making a Difference Together
      </h2>
      <p className="text-muted-foreground text-lg text-balance">
        Explore our community initiatives, programs, and services supporting those who need it most. 
        Our gallery showcases the real impact of our work and the stories of those we serve.
      </p>
    </div>
  );
};

export default GalleryHeader;
