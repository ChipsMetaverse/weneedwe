import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { upcomingEvents as localEvents } from "@/data/siteData";

export interface Event {
  id: string;
  title: string;
  description: string | null;
  date: string;
  location: string | null;
  imageUrl?: string;
  created_at?: string | null;
  created_by?: string | null;
}

export interface EventInput {
  title: string;
  description?: string;
  date: string;
  location?: string;
  imageUrl?: string;
}

export const useEvents = () => {
  const queryClient = useQueryClient();

  const fetchEvents = async (): Promise<Event[]> => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) {
        console.error("Error fetching events from Supabase:", error);
        console.log("Using local events data instead");
        // Return local data if there's an error
        return localEvents;
      }

      // Use local data if no data is returned
      if (!data || data.length === 0) {
        console.log("No events found in Supabase. Using local data.");
        return localEvents;
      }

      return data;
    } catch (err) {
      console.error("Error in fetchEvents:", err);
      // Return local data as a fallback
      return localEvents;
    }
  };

  const createEvent = async (event: EventInput): Promise<Event> => {
    const { data, error } = await supabase
      .from('events')
      .insert(event)
      .select()
      .single();

    if (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event");
      throw error;
    }

    toast.success("Event created successfully!");
    return data;
  };

  const upcomingEvents = (limit?: number) => {
    const now = new Date().toISOString();
    const filtered = eventsQuery.data?.filter(event => event.date >= now) || [];
    return limit ? filtered.slice(0, limit) : filtered;
  };

  const eventsQuery = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  const createEventMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  return {
    events: eventsQuery.data || [],
    upcomingEvents,
    isLoading: eventsQuery.isLoading,
    error: eventsQuery.error,
    createEvent: createEventMutation.mutate,
    isPending: createEventMutation.isPending,
  };
};