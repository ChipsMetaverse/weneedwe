
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle, Calendar } from "lucide-react";
import { format } from 'date-fns';
import { toast } from 'sonner';

interface EventsTabProps {
  events: any[];
  createEvent: (event: any) => void;
}

const EventsTab = ({ events, createEvent }: EventsTabProps) => {
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: ''
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

  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default EventsTab;
