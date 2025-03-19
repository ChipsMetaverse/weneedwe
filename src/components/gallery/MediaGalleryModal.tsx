
import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface MediaGalleryModalProps {
  selectedMedia: string | null;
  onOpenChange: (open: boolean) => void;
  mediaItems: Array<{
    id?: string;
    url?: string;
    metadata?: {
      title?: string;
      description?: string;
    };
  } | null> | undefined;
}

const MediaGalleryModal: React.FC<MediaGalleryModalProps> = ({ 
  selectedMedia, 
  onOpenChange,
  mediaItems
}) => {
  if (!selectedMedia) return null;
  
  // Find the selected item to display metadata
  const selectedItem = mediaItems?.find(item => item?.url === selectedMedia);
  
  return (
    <Dialog open={!!selectedMedia} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-background/95 backdrop-blur-sm">
        <DialogClose className="absolute right-4 top-4 z-10 bg-background/80 rounded-full p-2 hover:bg-background">
          <X className="h-4 w-4" />
        </DialogClose>
        
        <div className="w-full h-[70vh] bg-muted/20 flex items-center justify-center">
          {selectedMedia && (
            <img
              src={selectedMedia}
              alt={selectedItem?.metadata?.title || "Selected media"}
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
                console.log("Modal image failed to load:", selectedMedia);
              }}
            />
          )}
        </div>
        
        <div className="p-6">
          <DialogTitle className="text-xl">
            {selectedItem?.metadata?.title || "Media Item"}
          </DialogTitle>
          <DialogDescription className="mt-2 text-muted-foreground">
            {selectedItem?.metadata?.description || ""}
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaGalleryModal;
