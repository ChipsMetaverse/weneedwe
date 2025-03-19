
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { MediaInput } from '@/hooks/useMedia';
import { toast } from 'sonner';

interface MediaTabProps {
  media: any[];
  createMedia: (media: MediaInput) => void;
}

const MediaTab = ({ media, createMedia }: MediaTabProps) => {
  const [newMedia, setNewMedia] = useState({
    url: '',
    type: 'image',
    metadata: {
      title: '',
      description: '',
      category: 'Community'
    }
  });

  const handleMediaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedia.url || !newMedia.metadata.title) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const mediaInput: MediaInput = {
      url: newMedia.url,
      type: newMedia.type,
      metadata: newMedia.metadata
    };
    
    createMedia(mediaInput);
    setNewMedia({
      url: '',
      type: 'image',
      metadata: {
        title: '',
        description: '',
        category: 'Community'
      }
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New Media</CardTitle>
          <CardDescription>
            Upload photos and videos to the media gallery
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleMediaSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mediaTitle">Title *</Label>
                <Input 
                  id="mediaTitle" 
                  value={newMedia.metadata.title} 
                  onChange={e => setNewMedia({
                    ...newMedia, 
                    metadata: {...newMedia.metadata, title: e.target.value}
                  })}
                  placeholder="Community Gathering" 
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mediaCategory">Category</Label>
                <select 
                  id="mediaCategory"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={newMedia.metadata.category} 
                  onChange={e => setNewMedia({
                    ...newMedia, 
                    metadata: {...newMedia.metadata, category: e.target.value}
                  })}
                >
                  <option value="Community">Community</option>
                  <option value="Events">Events</option>
                  <option value="Projects">Projects</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mediaUrl">Image URL *</Label>
              <Input 
                id="mediaUrl" 
                value={newMedia.url} 
                onChange={e => setNewMedia({...newMedia, url: e.target.value})}
                placeholder="https://example.com/image.jpg" 
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mediaDescription">Description</Label>
              <Textarea 
                id="mediaDescription" 
                value={newMedia.metadata.description || ''} 
                onChange={e => setNewMedia({
                  ...newMedia, 
                  metadata: {...newMedia.metadata, description: e.target.value}
                })}
                placeholder="Description of the media..." 
                rows={3}
              />
            </div>
            <Button type="submit" className="mt-4">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Media
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Media</CardTitle>
          <CardDescription>
            Recently added photos and videos
          </CardDescription>
        </CardHeader>
        <CardContent>
          {media.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No media found</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {media.slice(0, 8).map(item => (
                <div key={item.id} className="group relative overflow-hidden rounded-md">
                  <img 
                    src={item.url} 
                    alt={item.metadata?.title || 'Media item'} 
                    className="object-cover w-full h-36"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                    <p className="text-white text-xs font-medium line-clamp-1">
                      {item.metadata?.title}
                    </p>
                    <p className="text-white/80 text-xs">
                      {item.metadata?.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaTab;
