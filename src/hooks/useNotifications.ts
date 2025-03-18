import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export interface NotificationInput {
  to: string; 
  subject: string;
  body: string;
  template?: string;
  data?: Record<string, any>;
}

export interface NotificationResponse {
  id: string;
  status: 'sent' | 'failed' | 'pending';
  timestamp: string;
}

export const useNotifications = () => {
  // Mock function to simulate sending an email
  const sendEmail = async (notification: NotificationInput): Promise<NotificationResponse> => {
    console.log("Sending email notification:", notification);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validate email format (basic validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(notification.to)) {
      throw new Error("Invalid email address");
    }
    
    // In a real implementation, this would call a serverless function to send an email
    // using Mailgun, SendGrid, or another email service
    
    // Mock successful email sending
    const response: NotificationResponse = {
      id: `email_${Math.random().toString(36).substring(2, 10)}`,
      status: 'sent',
      timestamp: new Date().toISOString()
    };
    
    return response;
  };

  // Mock function to simulate sending SMS
  const sendSMS = async (notification: NotificationInput): Promise<NotificationResponse> => {
    console.log("Sending SMS notification:", notification);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real implementation, this would call a serverless function to send an SMS
    // using Twilio, Vonage, or another SMS service
    
    // Mock successful SMS sending
    const response: NotificationResponse = {
      id: `sms_${Math.random().toString(36).substring(2, 10)}`,
      status: 'sent',
      timestamp: new Date().toISOString()
    };
    
    return response;
  };

  const emailMutation = useMutation({
    mutationFn: sendEmail,
    onSuccess: () => {
      toast.success("Email notification sent successfully");
    },
    onError: (error) => {
      toast.error(`Failed to send email: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  });

  const smsMutation = useMutation({
    mutationFn: sendSMS,
    onSuccess: () => {
      toast.success("SMS notification sent successfully");
    },
    onError: (error) => {
      toast.error(`Failed to send SMS: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  });

  return {
    sendEmail: emailMutation.mutate,
    sendSMS: smsMutation.mutate,
    isEmailSending: emailMutation.isPending,
    isSMSSending: smsMutation.isPending,
    emailError: emailMutation.error,
    smsError: smsMutation.error,
  };
};