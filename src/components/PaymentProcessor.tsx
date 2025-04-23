import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { usePayment } from '@/hooks/usePayment';
import { useDonations, DonationInput } from '@/hooks/useDonations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, AlertCircle, Smartphone } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface PaymentProcessorProps {
  donationDetails: DonationInput;
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentProcessor: React.FC<PaymentProcessorProps> = ({
  donationDetails,
  onSuccess,
  onCancel
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('credit_card');
  const { createStripePayment, createPayPalOrder, isStripeProcessing, isPayPalProcessing, stripeError, paypalError } = usePayment();
  const { createDonation } = useDonations();

  const handlePayment = async () => {
    try {
      // In a real implementation, we would use different payment processors
      // For demo purposes, we'll just record the donation as successful with the selected method
      await processDonation(paymentMethod);
            onSuccess();
    } catch (error) {
      console.error("Payment processing error:", error);
    }
  };

  const processDonation = async (method: string) => {
    try {
      await createDonation({
        ...donationDetails,
        method
      });
    } catch (error) {
      console.error("Error recording donation:", error);
    }
  };

  // For demo, we'll just use the same error state for all payment methods
  const error = stripeError || paypalError;

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'credit_card':
        return <CreditCard className="h-5 w-5" />;
      case 'apple_pay':
      case 'google_pay':
        return <Smartphone className="h-5 w-5" />;
      case 'paypal':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 11l5-5 5 5M7 17l5-5 5 5"></path>
          </svg>
        );
      case 'zelle':
      case 'cash_app':
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Donation</CardTitle>
        <CardDescription>
          You're donating ${donationDetails.amount} to support our community efforts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <Button 
            variant={paymentMethod === 'credit_card' ? 'default' : 'outline'} 
            onClick={() => setPaymentMethod('credit_card')}
            className="flex flex-col gap-1 h-auto py-2"
          >
            <CreditCard className="h-5 w-5" />
            <span className="text-xs">Credit Card</span>
          </Button>
          <Button 
            variant={paymentMethod === 'paypal' ? 'default' : 'outline'} 
            onClick={() => setPaymentMethod('paypal')}
            className="flex flex-col gap-1 h-auto py-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 11l5-5 5 5M7 17l5-5 5 5"></path>
              </svg>
            <span className="text-xs">PayPal</span>
          </Button>
          <Button 
            variant={paymentMethod === 'apple_pay' ? 'default' : 'outline'} 
            onClick={() => setPaymentMethod('apple_pay')}
            className="flex flex-col gap-1 h-auto py-2"
          >
            <Smartphone className="h-5 w-5" />
            <span className="text-xs">Apple Pay</span>
          </Button>
          <Button 
            variant={paymentMethod === 'google_pay' ? 'default' : 'outline'} 
            onClick={() => setPaymentMethod('google_pay')}
            className="flex flex-col gap-1 h-auto py-2"
          >
            <Smartphone className="h-5 w-5" />
            <span className="text-xs">Google Pay</span>
          </Button>
          <Button 
            variant={paymentMethod === 'zelle' ? 'default' : 'outline'} 
            onClick={() => setPaymentMethod('zelle')}
            className="flex flex-col gap-1 h-auto py-2"
          >
            <CreditCard className="h-5 w-5" />
            <span className="text-xs">Zelle</span>
          </Button>
          <Button 
            variant={paymentMethod === 'cash_app' ? 'default' : 'outline'} 
            onClick={() => setPaymentMethod('cash_app')}
            className="flex flex-col gap-1 h-auto py-2"
          >
            <CreditCard className="h-5 w-5" />
            <span className="text-xs">Cash App</span>
          </Button>
        </div>

        <div className="flex items-center space-x-2 p-4 border rounded-md bg-muted/50">
          {getPaymentMethodIcon(paymentMethod)}
              <div className="text-sm">
            {paymentMethod.replace('_', ' ')} payment processing available in production
              </div>
            </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error instanceof Error ? error.message : "An error occurred processing your payment"}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={handlePayment}
          disabled={isStripeProcessing || isPayPalProcessing}
        >
          {isStripeProcessing || isPayPalProcessing ? "Processing..." : "Complete Payment"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentProcessor;
