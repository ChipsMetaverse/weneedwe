
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { usePayment } from '@/hooks/usePayment';
import { useDonations, DonationInput } from '@/hooks/useDonations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, AlertCircle } from "lucide-react";
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
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const { createStripePayment, createPayPalOrder, isStripeProcessing, isPayPalProcessing, stripeError, paypalError } = usePayment();
  const { createDonation } = useDonations();

  const handlePayment = async () => {
    try {
      if (paymentMethod === 'card') {
        createStripePayment({
          ...donationDetails,
          method: 'credit_card'
        }, {
          onSuccess: async () => {
            // In a real implementation, we would process the payment with Stripe.js
            // For demo purposes, we'll just record the donation as successful
            await processDonation('credit_card');
            onSuccess();
          }
        });
      } else {
        createPayPalOrder(donationDetails, {
          onSuccess: async () => {
            // In a real implementation, we would redirect to PayPal
            // For demo purposes, we'll just record the donation as successful
            await processDonation('paypal');
            onSuccess();
          }
        });
      }
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

  const error = paymentMethod === 'card' ? stripeError : paypalError;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Donation</CardTitle>
        <CardDescription>
          You're donating ${donationDetails.amount} to support our community efforts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="card" onValueChange={(value) => setPaymentMethod(value as 'card' | 'paypal')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="card">Credit Card</TabsTrigger>
            <TabsTrigger value="paypal">PayPal</TabsTrigger>
          </TabsList>
          <TabsContent value="card" className="space-y-4 mt-4">
            <div className="flex items-center space-x-2 p-4 border rounded-md bg-muted/50">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                Credit card payment processing available in production
              </div>
            </div>
          </TabsContent>
          <TabsContent value="paypal" className="space-y-4 mt-4">
            <div className="flex items-center space-x-2 p-4 border rounded-md bg-muted/50">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                <path d="M7 11l5-5 5 5M7 17l5-5 5 5"></path>
              </svg>
              <div className="text-sm">
                PayPal payment processing available in production
              </div>
            </div>
          </TabsContent>
        </Tabs>

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
          {isStripeProcessing || isPayPalProcessing ? "Processing..." : "Complete Donation"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentProcessor;
