
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Calendar, Image, Users } from "lucide-react";
import { format } from 'date-fns';

interface MetricsProps {
  totalDonationAmount: number;
  donationsCount: number;
  events: any[];
  mediaCount: number;
  mediaEventPhotosCount: number;
  applicationsCount: number;
  pendingApplicationsCount: number;
}

const DashboardMetrics = ({
  totalDonationAmount,
  donationsCount,
  events,
  mediaCount,
  mediaEventPhotosCount,
  applicationsCount,
  pendingApplicationsCount
}: MetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalDonationAmount.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {donationsCount} donations received
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{events.length}</div>
          <p className="text-xs text-muted-foreground">
            Next event: {events[0]?.date ? format(new Date(events[0].date), 'MMM dd, yyyy') : 'None scheduled'}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Media Items</CardTitle>
          <Image className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mediaCount}</div>
          <p className="text-xs text-muted-foreground">
            {mediaEventPhotosCount} event photos
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Volunteer Applications</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{applicationsCount}</div>
          <p className="text-xs text-muted-foreground">
            {pendingApplicationsCount} pending applications
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardMetrics;
