
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Event {
  id: string;
  title: string;
  description: string | null;
  date: string;
  location: string | null;
  created_at: string | null;
  created_by: string | null;
}

export interface EventInput {
  title: string;
  description?: string;
  date: string;
  location?: string;
}

export const useEvents = () => {
  const queryClient = useQueryClient();

  const fetchEvents = async (): Promise<Event[]> => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to load events");
      throw error;
    }

    return data || [];
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
