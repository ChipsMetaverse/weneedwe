
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const DataInitializer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const initializeData = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('init-test-data');
      
      if (error) {
        throw new Error(`Error initializing data: ${error.message}`);
      }
      
      toast.success("Test data initialized successfully!");
      setIsDialogOpen(false);
      // Force reload to show the new data
      window.location.reload();
    } catch (error) {
      console.error("Error initializing data:", error);
      toast.error("Failed to initialize test data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Initialize Test Data
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Initialize Test Data</DialogTitle>
          <DialogDescription>
            This will populate the database with sample data for donations, events, media gallery, and blog posts. This action is meant for demonstration purposes.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={initializeData} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Initializing...
              </>
            ) : (
              "Initialize Data"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DataInitializer;
