
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useDonations } from '@/hooks/useDonations';
import { useEvents } from '@/hooks/useEvents';
import { useMedia, MediaInput } from '@/hooks/useMedia';
import { PlusCircle, Calendar, Image, DollarSign, Clock } from "lucide-react";
import { format } from 'date-fns';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { donations, totalDonationAmount } = useDonations();
  const { events, createEvent } = useEvents();
  const { media, createMedia } = useMedia();
  
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: ''
  });
  
  const [newMedia, setNewMedia] = useState({
    url: '',
    type: 'image',
    metadata: {
      title: '',
      description: '',
      category: 'Community'
    }
  });

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    createEvent(newEvent);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      location: ''
    });
  };
  
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
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDonationAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {donations.length} donations received
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
            <p className="text-xs text-muted-foreground">
              Next event: {events[0]?.date ? format(new Date(events[0].date), 'MMM dd, yyyy') : 'None scheduled'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Media Items</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{media.length}</div>
            <p className="text-xs text-muted-foreground">
              {media.filter(item => item.metadata?.category === 'Events').length} event photos
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Event</CardTitle>
              <CardDescription>
                Create a new community event to be displayed on the website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEventSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title *</Label>
                    <Input 
                      id="title" 
                      value={newEvent.title} 
                      onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                      placeholder="Community Cleanup Day" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Event Date *</Label>
                    <Input 
                      id="date" 
                      type="datetime-local" 
                      value={newEvent.date} 
                      onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    value={newEvent.location} 
                    onChange={e => setNewEvent({...newEvent, location: e.target.value})}
                    placeholder="Community Center, 123 Main St" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    value={newEvent.description} 
                    onChange={e => setNewEvent({...newEvent, description: e.target.value})}
                    placeholder="Details about the event..." 
                    rows={4}
                  />
                </div>
                <Button type="submit" className="mt-4">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Events</CardTitle>
              <CardDescription>
                Manage your upcoming and past events
              </CardDescription>
            </CardHeader>
            <CardContent>
              {events.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No events found</p>
              ) : (
                <div className="space-y-4">
                  {events.map(event => (
                    <div key={event.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            {format(new Date(event.date), 'MMM dd, yyyy - h:mm a')}
                          </div>
                          {event.location && (
                            <div className="text-sm text-muted-foreground mt-1">
                              {event.location}
                            </div>
                          )}
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                      {event.description && (
                        <p className="text-sm mt-2">{event.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="media" className="space-y-4">
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
        </TabsContent>
        
        <TabsContent value="donations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Donation History</CardTitle>
              <CardDescription>
                Recent donations and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {donations.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No donations found</p>
              ) : (
                <div className="space-y-4">
                  {donations.map(donation => (
                    <div key={donation.id} className="flex justify-between items-center border-b pb-4 last:border-0">
                      <div>
                        <p className="font-medium">${donation.amount.toFixed(2)}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {donation.created_at ? format(new Date(donation.created_at), 'MMM dd, yyyy') : 'N/A'}
                        </div>
                        {donation.name && <p className="text-sm">{donation.name}</p>}
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          donation.status === 'completed' 
                            ? 'bg-green-100 text-green-800'
                            : donation.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {donation.status}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                          via {donation.method}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
