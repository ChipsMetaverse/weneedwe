
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, MapPinIcon, ClockIcon } from 'lucide-react';
import { useEvents } from '@/hooks/useEvents';
import { format, parseISO } from 'date-fns';

interface EventsListProps {
  limit?: number;
  showViewAll?: boolean;
}

const EventsList: React.FC<EventsListProps> = ({ 
  limit = 3,
  showViewAll = true 
}) => {
  const { upcomingEvents, isLoading, error } = useEvents();
  const events = upcomingEvents(limit);

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        {[...Array(limit)].map((_, index) => (
          <Card key={index} className="w-full animate-pulse bg-muted">
            <CardHeader className="h-24"></CardHeader>
            <CardContent className="h-16"></CardContent>
            <CardFooter className="h-10"></CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Failed to load upcoming events. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  if (events.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>No Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <p>There are no upcoming events scheduled at this time. Check back later!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full space-y-6">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => {
          const eventDate = parseISO(event.date);
          return (
            <Card key={event.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold">{event.title}</CardTitle>
                <div className="flex items-center text-muted-foreground">
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  <span className="text-sm">{format(eventDate, 'MMMM d, yyyy')}</span>
                </div>
              </CardHeader>
              <CardContent>
                {event.description && (
                  <CardDescription className="line-clamp-2 mt-2">
                    {event.description}
                  </CardDescription>
                )}
                {event.location && (
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <MapPinIcon className="mr-1 h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                )}
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <ClockIcon className="mr-1 h-4 w-4" />
                  <span>{format(eventDate, 'h:mm a')}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      {showViewAll && events.length >= limit && (
        <div className="text-center mt-6">
          <Button variant="outline">View All Events</Button>
        </div>
      )}
    </div>
  );
};

export default EventsList;
