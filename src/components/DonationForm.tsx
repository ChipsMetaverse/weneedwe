import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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
  method: z.enum(['credit_card', 'paypal'], {
    required_error: 'Please select a payment method',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const predefinedAmounts = [10, 25, 50, 100, 250, 500];

interface DonationFormProps {
  goalAmount?: number;
  onSubmit?: (data: DonationInput) => void;
}

const DonationForm: React.FC<DonationFormProps> = ({ goalAmount = 10000, onSubmit }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const { createDonation, totalDonationAmount, isPending } = useDonations();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 25,
      method: 'credit_card',
    },
  });

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setValue('amount', amount);
  };

  const progress = Math.min(Math.round((totalDonationAmount / goalAmount) * 100), 100);

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
      toast.success("Thank you for your donation!");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Support Our Mission</CardTitle>
          <CardDescription>Help us reach our donation goal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>${totalDonationAmount.toLocaleString()}</span>
              <span>${goalAmount.toLocaleString()}</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1 text-center">
              {progress}% of our ${goalAmount.toLocaleString()} goal
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-2 my-4">
            {predefinedAmounts.map((amount) => (
              <Button
                key={amount}
                variant={selectedAmount === amount ? "default" : "outline"}
                className="font-semibold"
                onClick={() => handleAmountSelect(amount)}
              >
                ${amount}
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">Donate Now</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleSubmit(onFormSubmit)}>
                <DialogHeader>
                  <DialogTitle>Make a Donation</DialogTitle>
                  <DialogDescription>
                    Your support helps us continue our community work.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Donation Amount ($)</Label>
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
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="credit_card" id="credit_card" />
                        <Label htmlFor="credit_card">Credit Card</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal">PayPal</Label>
                      </div>
                    </RadioGroup>
                    {errors.method && (
                      <p className="text-sm text-destructive">{errors.method.message}</p>
                    )}
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Processing..." : "Complete Donation"}
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
