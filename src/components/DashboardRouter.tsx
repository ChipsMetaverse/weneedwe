
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const DashboardRouter = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  
  // Don't render anything if user is not loaded yet or user is not admin
  if (loading || !user || !profile || !profile.is_admin) {
    return null;
  }

  const handleAdminAccess = () => {
    navigate('/admin');
  };

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
