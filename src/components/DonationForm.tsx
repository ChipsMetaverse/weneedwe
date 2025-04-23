import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useDonations, DonationInput } from '@/hooks/useDonations';

const formSchema = z.object({
  amount: z.preprocess(
    (val) => (val === '' ? undefined : parseInt(String(val), 10)),
    z.number().min(1, 'Amount must be at least 1').max(10000, 'Amount must be less than 10,000')
  ),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  method: z.enum(['credit_card', 'paypal', 'apple_pay', 'google_pay', 'zelle', 'cash_app'], {
    required_error: 'Please select a payment method',
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface DonationFormProps {
  onSubmit?: (data: DonationInput) => void;
}

const DonationForm: React.FC<DonationFormProps> = ({ onSubmit }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { createDonation, isPending } = useDonations();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 25,
      method: 'credit_card',
    },
  });

  const onFormSubmit = (data: FormValues) => {
    const donationData: DonationInput = {
      amount: data.amount,
      method: data.method,
      name: data.name,
      email: data.email,
    };
    
    if (onSubmit) {
      onSubmit(donationData);
    } else {
      createDonation(donationData);
      setIsDialogOpen(false);
      toast.success("Thank you for your support!");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Support Our Mission</CardTitle>
          <CardDescription>Your support makes a difference in our community</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Your contribution helps us continue providing essential services to those who need it most.
          </p>
        </CardContent>
        <CardFooter>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">Support Our Work</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleSubmit(onFormSubmit)}>
                <DialogHeader>
                  <DialogTitle>Make a Contribution</DialogTitle>
                  <DialogDescription>
                    Your support helps us serve our community.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      {...register('amount')}
                      placeholder="Enter amount"
                    />
                    {errors.amount && (
                      <p className="text-sm text-destructive">{errors.amount.message}</p>
                    )}
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      {...register('name')}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>Payment Method</Label>
                    <RadioGroup defaultValue="credit_card" {...register('method')}>
                      <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="credit_card" id="credit_card" />
                        <Label htmlFor="credit_card">Credit Card</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal">PayPal</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="apple_pay" id="apple_pay" />
                          <Label htmlFor="apple_pay">Apple Pay</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="google_pay" id="google_pay" />
                          <Label htmlFor="google_pay">Google Pay</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="zelle" id="zelle" />
                          <Label htmlFor="zelle">Zelle</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cash_app" id="cash_app" />
                          <Label htmlFor="cash_app">Cash App</Label>
                        </div>
                      </div>
                    </RadioGroup>
                    {errors.method && (
                      <p className="text-sm text-destructive">{errors.method.message}</p>
                    )}
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Processing..." : "Complete"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DonationForm;
