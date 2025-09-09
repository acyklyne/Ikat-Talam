"use client"

import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Textarea } from '../../components/ui/textarea';
import { CreditCard, Banknote, DollarSign } from 'lucide-react';

export default function DonatePage() {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [message, setMessage] = useState('');

  const predefinedAmounts = [25, 50, 100, 250, 500];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const donationAmount = amount === 'custom' ? customAmount : amount;

    // Handle donation submission based on payment method
    switch (paymentMethod) {
      case 'paypal':
        // Redirect to PayPal
        window.location.href = `https://www.paypal.com/donate?hosted_button_id=YOUR_PAYPAL_BUTTON_ID&amount=${donationAmount}`;
        break;
      case 'credit-card':
        // Handle credit card payment (integrate with payment processor)
        alert(`Processing credit card donation of $${donationAmount}`);
        break;
      case 'bank-transfer':
        // Show bank transfer details
        alert(`Bank transfer details will be shown. Amount: $${donationAmount}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Support Our Cultural Heritage
          </h1>
          <p className="text-lg text-gray-600">
            Your donation helps preserve and promote traditional weaving techniques and cultural stories.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-6 w-6" />
              Make a Donation
            </CardTitle>
            <CardDescription>
              Choose your preferred payment method and donation amount
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Donor Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Your Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Donation Amount */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Donation Amount</h3>
                <div className="grid grid-cols-3 gap-2">
                  {predefinedAmounts.map((amt) => (
                    <Button
                      key={amt}
                      type="button"
                      variant={amount === amt.toString() ? "default" : "outline"}
                      onClick={() => setAmount(amt.toString())}
                      className="w-full"
                    >
                      ${amt}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="custom"
                    name="amount"
                    value="custom"
                    checked={amount === 'custom'}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="custom">Custom Amount</Label>
                  {amount === 'custom' && (
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-32"
                      min="1"
                      required
                    />
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Payment Method</h3>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Credit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      PayPal
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                    <Label htmlFor="bank-transfer" className="flex items-center gap-2">
                      <Banknote className="h-4 w-4" />
                      Bank Transfer
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Leave a message with your donation..."
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg">
                Donate Now
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Bank Transfer Details (shown when selected) */}
        {paymentMethod === 'bank-transfer' && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Bank Transfer Details</CardTitle>
              <CardDescription>
                Please use the following details to make your bank transfer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Bank Name:</strong> Example Bank
                </div>
                <div>
                  <strong>Account Name:</strong> Ikat Talam Foundation
                </div>
                <div>
                  <strong>Account Number:</strong> 1234567890
                </div>
                <div>
                  <strong>Routing Number:</strong> 123456789
                </div>
                <div>
                  <strong>SWIFT Code:</strong> EXMBUS33
                </div>
                <div>
                  <strong>Reference:</strong> Your Name + Donation
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Please include your name and "Donation" in the reference field.
                We'll send you a confirmation email once we receive your transfer.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
