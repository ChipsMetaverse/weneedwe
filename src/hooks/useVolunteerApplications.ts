
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type VolunteerApplication = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
  status: string;
};

export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

export const useVolunteerApplications = () => {
  const queryClient = useQueryClient();

  const fetchApplications = async (): Promise<VolunteerApplication[]> => {
    const { data, error } = await supabase
      .from('volunteer_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching applications:", error);
      toast.error(`Error fetching applications: ${error.message}`);
      throw error;
    }

    return data || [];
  };

  const updateApplicationStatus = async ({ id, status }: { id: string; status: ApplicationStatus }): Promise<void> => {
    const { error } = await supabase
      .from('volunteer_applications')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error("Error updating application:", error);
      toast.error(`Error updating application: ${error.message}`);
      throw error;
    }
    
    toast.success(`Application ${status}`);
  };

  const applicationsQuery = useQuery({
    queryKey: ['volunteer-applications'],
    queryFn: fetchApplications,
  });

  const updateStatusMutation = useMutation({
    mutationFn: updateApplicationStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['volunteer-applications'] });
    },
  });

  return {
    applications: applicationsQuery.data || [],
    loading: applicationsQuery.isLoading,
    error: applicationsQuery.error,
    fetchApplications: () => queryClient.invalidateQueries({ queryKey: ['volunteer-applications'] }),
    updateApplicationStatus: (id: string, status: ApplicationStatus) => 
      updateStatusMutation.mutate({ id, status }),
  };
};
