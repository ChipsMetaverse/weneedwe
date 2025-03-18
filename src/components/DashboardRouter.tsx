
import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const DashboardRouter = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const { user, profile, loading } = useAuth();
  
  // Don't render anything if user is not loaded yet
  if (loading) {
    return null;
  }
  
  // Don't render the admin button if user is not logged in or not an admin
  if (!user || !profile || !profile.is_admin) {
    return null;
  }

  const handleAdminAccess = () => {
    if (!user) {
      toast.error("Please sign in to access the admin dashboard");
      return;
    }
    
    if (!profile.is_admin) {
      toast.error("You do not have admin privileges");
      return;
    }
    
    setShowAdmin(true);
  };

  if (showAdmin) {
    return (
      <div className="min-h-screen">
        <div className="container py-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="mb-4" 
            onClick={() => setShowAdmin(false)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to main site
          </Button>
        </div>
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <Button 
        variant="outline" 
        className="bg-background shadow-md"
        onClick={handleAdminAccess}
      >
        Admin Dashboard
      </Button>
    </div>
  );
};

export default DashboardRouter;
