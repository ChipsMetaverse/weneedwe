
import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const DashboardRouter = () => {
  const [showAdmin, setShowAdmin] = useState(false);

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
        onClick={() => setShowAdmin(true)}
      >
        Admin Dashboard
      </Button>
    </div>
  );
};

export default DashboardRouter;
