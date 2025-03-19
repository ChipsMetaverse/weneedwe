
import { useState, useEffect } from 'react';
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
  const [applications, setApplications] = useState<VolunteerApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('volunteer_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error: any) {
      toast.error(`Error fetching applications: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id: string, status: ApplicationStatus) => {
    try {
      const { error } = await supabase
        .from('volunteer_applications')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      // Update local state to reflect the change
      setApplications(prevApplications =>
        prevApplications.map(app =>
          app.id === id ? { ...app, status } : app
        )
      );
      
      toast.success(`Application ${status}`);
    } catch (error: any) {
      toast.error(`Error updating application: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return {
    applications,
    loading,
    fetchApplications,
    updateApplicationStatus
  };
};
