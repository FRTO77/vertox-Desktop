import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Building2 } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
}

export function PaymentDialog({ open, onOpenChange, amount }: PaymentDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingCountry, setBillingCountry] = useState('');
  const [billingZip, setBillingZip] = useState('');
  const [email, setEmail] = useState('');

  const handlePayment = () => {
    if (paymentMethod === 'card') {
      if (!cardNumber || !cardExpiry || !cardCvc || !cardName) {
        toast.error('Please fill in all card details');
        return;
      }
    }
    if (!email || !billingAddress || !billingCity || !billingCountry || !billingZip) {
      toast.error('Please fill in all billing information');
      return;
    }
    
    toast.success('Payment processing... You will receive a confirmation email shortly.');
    onOpenChange(false);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Complete Payment</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Amount */}
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="text-3xl font-bold text-primary">${amount.toLocaleString()}</p>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-3 gap-3">
              <label
                className={`flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer transition-colors border-2 ${
                  paymentMethod === 'card'
                    ? 'bg-primary/10 border-primary/50'
                    : 'bg-secondary/50 hover:bg-secondary border-transparent'
                }`}
              >
                <RadioGroupItem value="card" id="card" className="sr-only" />
                <CreditCard className="w-6 h-6" />
                <span className="text-sm font-medium">Credit Card</span>
              </label>
              <label
                className={`flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer transition-colors border-2 ${
                  paymentMethod === 'stripe'
                    ? 'bg-primary/10 border-primary/50'
                    : 'bg-secondary/50 hover:bg-secondary border-transparent'
                }`}
              >
                <RadioGroupItem value="stripe" id="stripe" className="sr-only" />
                <div className="w-6 h-6 flex items-center justify-center font-bold text-[#635BFF]">S</div>
                <span className="text-sm font-medium">Stripe</span>
              </label>
              <label
                className={`flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer transition-colors border-2 ${
                  paymentMethod === 'paypal'
                    ? 'bg-primary/10 border-primary/50'
                    : 'bg-secondary/50 hover:bg-secondary border-transparent'
                }`}
              >
                <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
                <div className="w-6 h-6 flex items-center justify-center font-bold text-[#003087]">P</div>
                <span className="text-sm font-medium">PayPal</span>
              </label>
            </RadioGroup>
          </div>

          {/* Card Details */}
          {paymentMethod === 'card' && (
            <div className="space-y-4 p-4 rounded-lg bg-secondary/30 border border-border">
              <h4 className="font-medium flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Card Details
              </h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    id="cardName"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="cardExpiry">Expiry Date</Label>
                    <Input
                      id="cardExpiry"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardCvc">CVC</Label>
                    <Input
                      id="cardCvc"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'stripe' && (
            <div className="p-6 rounded-lg bg-secondary/30 border border-border text-center">
              <div className="w-12 h-12 rounded-full bg-[#635BFF]/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-[#635BFF]">S</span>
              </div>
              <p className="text-muted-foreground">You will be redirected to Stripe secure checkout</p>
            </div>
          )}

          {paymentMethod === 'paypal' && (
            <div className="p-6 rounded-lg bg-secondary/30 border border-border text-center">
              <div className="w-12 h-12 rounded-full bg-[#003087]/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-[#003087]">P</span>
              </div>
              <p className="text-muted-foreground">You will be redirected to PayPal secure checkout</p>
            </div>
          )}

          {/* Billing Information */}
          <div className="space-y-4 p-4 rounded-lg bg-secondary/30 border border-border">
            <h4 className="font-medium flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Billing Information
            </h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  placeholder="123 Business Street"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={billingCity}
                    onChange={(e) => setBillingCity(e.target.value)}
                    placeholder="New York"
                  />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP / Postal Code</Label>
                  <Input
                    id="zip"
                    value={billingZip}
                    onChange={(e) => setBillingZip(e.target.value)}
                    placeholder="10001"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={billingCountry}
                  onChange={(e) => setBillingCountry(e.target.value)}
                  placeholder="United States"
                />
              </div>
            </div>
          </div>

          {/* Pay Button */}
          <Button onClick={handlePayment} className="w-full" size="lg">
            {paymentMethod === 'paypal' 
              ? 'Continue to PayPal' 
              : paymentMethod === 'stripe' 
                ? 'Continue to Stripe' 
                : `Pay $${amount.toLocaleString()}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
