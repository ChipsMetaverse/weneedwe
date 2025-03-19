
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { format } from 'date-fns';

interface DonationsTabProps {
  donations: any[];
}

const DonationsTab = ({ donations }: DonationsTabProps) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Donation History</CardTitle>
          <CardDescription>
            Recent donations and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {donations.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No donations found</p>
          ) : (
            <div className="space-y-4">
              {donations.map(donation => (
                <div key={donation.id} className="flex justify-between items-center border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">${donation.amount.toFixed(2)}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {donation.created_at ? format(new Date(donation.created_at), 'MMM dd, yyyy') : 'N/A'}
                    </div>
                    {donation.name && <p className="text-sm">{donation.name}</p>}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      donation.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : donation.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {donation.status}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      via {donation.method}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationsTab;
