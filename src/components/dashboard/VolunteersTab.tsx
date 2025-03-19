
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from 'date-fns';
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from 'sonner';
import { ApplicationStatus } from '@/hooks/useVolunteerApplications';

interface VolunteersTabProps {
  applications: any[];
  updateApplicationStatus: (id: string, status: ApplicationStatus) => void;
  loading: boolean;
}

const VolunteersTab = ({ applications, updateApplicationStatus, loading }: VolunteersTabProps) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Volunteer Applications</CardTitle>
          <CardDescription>
            Manage volunteer applications and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : applications.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No applications found</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">{application.name}</TableCell>
                      <TableCell>
                        <div>{application.email}</div>
                        {application.phone && (
                          <div className="text-sm text-muted-foreground">{application.phone}</div>
                        )}
                      </TableCell>
                      <TableCell>
                        {format(new Date(application.created_at), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClass(application.status)}`}>
                          {application.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0" 
                            onClick={() => updateApplicationStatus(application.id, 'approved')}
                            disabled={application.status === 'approved'}
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="sr-only">Approve</span>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => updateApplicationStatus(application.id, 'rejected')}
                            disabled={application.status === 'rejected'}
                          >
                            <XCircle className="h-4 w-4 text-red-600" />
                            <span className="sr-only">Reject</span>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              toast.info("Message: " + application.message);
                            }}
                          >
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VolunteersTab;
