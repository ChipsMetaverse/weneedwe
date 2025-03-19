import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDonations } from '@/hooks/useDonations';
import { useEvents } from '@/hooks/useEvents';
import { useMedia } from '@/hooks/useMedia';
import { useVolunteerApplications } from '@/hooks/useVolunteerApplications';
import { useGallery } from '@/hooks/useGallery';
import { GalleryItem } from '@/components/gallery/types';

// Import dashboard components
import DashboardMetrics from './dashboard/DashboardMetrics';
import EventsTab from './dashboard/EventsTab';
import MediaTab from './dashboard/MediaTab';
import DonationsTab from './dashboard/DonationsTab';
import VolunteersTab from './dashboard/VolunteersTab';
import GalleryTab from './dashboard/GalleryTab';

const AdminDashboard = () => {
  const { donations, totalDonationAmount } = useDonations();
  const { events, createEvent } = useEvents();
  const { media, createMedia } = useMedia();
  const { applications, updateApplicationStatus, loading: loadingApplications } = useVolunteerApplications();
  const { 
    galleryItems, 
    createGalleryItem, 
    updateGalleryItem, 
    deleteGalleryItem 
  } = useGallery();
  
  const pendingApplications = applications.filter(app => app.status === 'pending').length;
  const mediaEventPhotos = media.filter(item => item.metadata?.category === 'Events').length;

  // We need to wrap the functions in async functions to match the expected Promise<any> return type
  const handleCreateGalleryItem = async (item: Omit<GalleryItem, "id">) => {
    return createGalleryItem(item);
  };

  const handleUpdateGalleryItem = async (id: number, item: Partial<GalleryItem>) => {
    return updateGalleryItem(id, item);
  };

  const handleDeleteGalleryItem = async (id: number) => {
    return deleteGalleryItem(id);
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <DashboardMetrics 
        totalDonationAmount={totalDonationAmount}
        donationsCount={donations.length}
        events={events}
        mediaCount={media.length}
        mediaEventPhotosCount={mediaEventPhotos}
        applicationsCount={applications.length}
        pendingApplicationsCount={pendingApplications}
      />
      
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="events" className="space-y-4">
          <EventsTab events={events} createEvent={createEvent} />
        </TabsContent>
        
        <TabsContent value="media" className="space-y-4">
          <MediaTab media={media} createMedia={createMedia} />
        </TabsContent>
        
        <TabsContent value="gallery" className="space-y-4">
          <GalleryTab 
            galleryItems={galleryItems}
            createGalleryItem={handleCreateGalleryItem}
            updateGalleryItem={handleUpdateGalleryItem}
            deleteGalleryItem={handleDeleteGalleryItem}
          />
        </TabsContent>
        
        <TabsContent value="donations" className="space-y-4">
          <DonationsTab donations={donations} />
        </TabsContent>
        
        <TabsContent value="volunteers" className="space-y-4">
          <VolunteersTab 
            applications={applications} 
            updateApplicationStatus={updateApplicationStatus}
            loading={loadingApplications}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
