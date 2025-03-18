import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const DataInitializer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("test-data");

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

  const importWeneedweData = async (resetData = false) => {
    setIsLoading(true);
    try {
      const url = resetData ? 'import-weneedwe-data?reset=true' : 'import-weneedwe-data';
      const { data, error } = await supabase.functions.invoke(url);
      
      if (error) {
        throw new Error(`Error importing data: ${error.message}`);
      }
      
      toast.success("Website content imported successfully!");
      setIsDialogOpen(false);
      // Force reload to show the new data
      window.location.reload();
    } catch (error) {
      console.error("Error importing website data:", error);
      toast.error("Failed to import website content");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Initialize Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Initialize Data</DialogTitle>
          <DialogDescription>
            Choose the type of data you want to import into your application.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="test-data">Test Data</TabsTrigger>
            <TabsTrigger value="weneedwe-org">WeNeedWe.org</TabsTrigger>
          </TabsList>
          
          <TabsContent value="test-data" className="pt-4 pb-2">
            <p className="text-sm text-muted-foreground mb-6">
              This will populate the database with generic sample data for donations, events, media gallery, and blog posts. 
              This is meant for demonstration purposes only.
            </p>
          </TabsContent>
          
          <TabsContent value="weneedwe-org" className="pt-4 pb-2">
            <p className="text-sm text-muted-foreground mb-6">
              This will import content scraped from weneedwe.org including blog posts, events, and media gallery content.
              You can choose to clear existing data before importing.
            </p>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          
          {activeTab === "test-data" ? (
            <Button onClick={initializeData} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Initializing...
                </>
              ) : (
                "Initialize Test Data"
              )}
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={() => importWeneedweData(true)} disabled={isLoading} variant="destructive">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Importing...
                  </>
                ) : (
                  "Replace All Data"
                )}
              </Button>
              <Button onClick={() => importWeneedweData(false)} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Importing...
                  </>
                ) : (
                  "Import Content"
                )}
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DataInitializer;