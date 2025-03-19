
import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GalleryItem } from './types';

interface LightboxModalProps { 
  item: GalleryItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const LightboxModal: React.FC<LightboxModalProps> = ({ 
  item, 
  onClose, 
  onPrev, 
  onNext, 
  hasPrev, 
  hasNext 
}) => {
  // Close the modal when pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);
  
  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} image`}
    >
      <button 
        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        onClick={onClose}
        aria-label="Close gallery modal"
      >
        <X className="w-6 h-6" />
      </button>
      
      <div className="relative w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-auto max-h-[80vh] object-contain"
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/60 backdrop-blur-sm">
          <div className="flex justify-between items-start">
            <div>
              <span className="inline-block px-3 py-1 mb-2 text-xs font-medium rounded-full bg-white/20 backdrop-blur-sm text-white">
                {item.category}
              </span>
              <h3 className="text-xl font-medium text-white mb-2">{item.title}</h3>
              <p className="text-white/80">{item.description}</p>
            </div>
            {item.date && (
              <span className="text-sm text-white/60">{new Date(item.date).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      </div>
      
      {hasPrev && (
        <button 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          onClick={onPrev}
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      
      {hasNext && (
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          onClick={onNext}
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default LightboxModal;
