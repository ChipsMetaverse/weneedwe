import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Donation {
  id: string;
  amount: number;
  currency: string;
  method: string;
  status: string;
  name: string | null;
  email: string | null;
  created_at: string | null;
  user_id: string | null;
}

export interface DonationInput {
  amount: number;
  currency?: string;
  method: string;
  name?: string;
  email?: string;
}

export const useDonations = () => {
  const queryClient = useQueryClient();

  const fetchDonations = async (): Promise<Donation[]> => {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching donations:", error);
      toast.error("Failed to load donations");
      throw error;
    }

    return data || [];
  };

  const createDonation = async (donation: DonationInput): Promise<Donation> => {
    const { data, error } = await supabase
      .from('donations')
      .insert({
        ...donation,
        status: 'completed', // Mark as completed for demo purposes
        currency: donation.currency || 'USD',
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating donation:", error);
      toast.error("Failed to process donation");
      throw error;
    }

    toast.success("Thank you for your support!");
    return data;
  };

  const donationsQuery = useQuery({
    queryKey: ['donations'],
    queryFn: fetchDonations,
  });

  const createDonationMutation = useMutation({
    mutationFn: createDonation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donations'] });
    },
  });

  // Calculate total donations for admin reporting purposes
  const totalDonationAmount = donationsQuery.data
    ?.reduce((total, donation) => total + donation.amount, 0) || 0;

  return {
    donations: donationsQuery.data || [],
    isLoading: donationsQuery.isLoading,
    error: donationsQuery.error,
    createDonation: createDonationMutation.mutate,
    isPending: createDonationMutation.isPending,
    totalDonationAmount,
  };
};
