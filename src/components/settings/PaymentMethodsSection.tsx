import { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  Check,
  Building2,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank' | 'stripe';
  name: string;
  details: string;
  isDefault: boolean;
  icon: string;
}

export function PaymentMethodsSection() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: '1', type: 'card', name: 'Visa ending in 4242', details: 'Expires 12/26', isDefault: true, icon: '💳' },
  ]);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [paymentType, setPaymentType] = useState<string>('card');
  
  // Form states
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [stripeEmail, setStripeEmail] = useState('');

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

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const getCardType = (number: string): string => {
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.startsWith('4')) return 'Visa';
    if (/^5[1-5]/.test(cleanNumber)) return 'Mastercard';
    if (/^3[47]/.test(cleanNumber)) return 'American Express';
    if (/^6(?:011|5)/.test(cleanNumber)) return 'Discover';
    return 'Card';
  };

  const resetForm = () => {
    setCardNumber('');
    setCardName('');
    setExpiryDate('');
    setCvv('');
    setPaypalEmail('');
    setBankName('');
    setAccountNumber('');
    setRoutingNumber('');
    setStripeEmail('');
    setPaymentType('card');
  };

  const handleAddPayment = () => {
    let newMethod: PaymentMethod;
    
    if (paymentType === 'card') {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        toast.error('Please fill in all card details');
        return;
      }
      const lastFour = cardNumber.replace(/\s/g, '').slice(-4);
      const cardType = getCardType(cardNumber);
      newMethod = {
        id: Date.now().toString(),
        type: 'card',
        name: `${cardType} ending in ${lastFour}`,
        details: `Expires ${expiryDate}`,
        isDefault: paymentMethods.length === 0,
        icon: '💳'
      };
    } else if (paymentType === 'paypal') {
      if (!paypalEmail) {
        toast.error('Please enter your PayPal email');
        return;
      }
      newMethod = {
        id: Date.now().toString(),
        type: 'paypal',
        name: 'PayPal',
        details: paypalEmail,
        isDefault: paymentMethods.length === 0,
        icon: '🅿️'
      };
    } else if (paymentType === 'stripe') {
      if (!stripeEmail) {
        toast.error('Please enter your Stripe email');
        return;
      }
      newMethod = {
        id: Date.now().toString(),
        type: 'stripe',
        name: 'Stripe',
        details: stripeEmail,
        isDefault: paymentMethods.length === 0,
        icon: '💜'
      };
    } else {
      if (!bankName || !accountNumber || !routingNumber) {
        toast.error('Please fill in all bank details');
        return;
      }
      const lastFour = accountNumber.slice(-4);
      newMethod = {
        id: Date.now().toString(),
        type: 'bank',
        name: bankName,
        details: `Account ending in ${lastFour}`,
        isDefault: paymentMethods.length === 0,
        icon: '🏦'
      };
    }

    setPaymentMethods(prev => [...prev, newMethod]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success('Payment method added successfully');
  };

  const handleRemovePayment = (id: string) => {
    setPaymentMethods(prev => prev.filter(p => p.id !== id));
    toast.success('Payment method removed');
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(prev => prev.map(p => ({
      ...p,
      isDefault: p.id === id
    })));
    toast.success('Default payment method updated');
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Payment Methods</h2>
            <p className="text-sm text-muted-foreground">Manage your payment options</p>
          </div>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Payment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-background border-border">
            <DialogHeader>
              <DialogTitle>Add Payment Method</DialogTitle>
              <DialogDescription>
                Add a new payment method to your account.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Payment Type</Label>
                <Select value={paymentType} onValueChange={setPaymentType}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="card">
                      <span className="flex items-center gap-2">
                        💳 Credit/Debit Card
                      </span>
                    </SelectItem>
                    <SelectItem value="paypal">
                      <span className="flex items-center gap-2">
                        🅿️ PayPal
                      </span>
                    </SelectItem>
                    <SelectItem value="stripe">
                      <span className="flex items-center gap-2">
                        💜 Stripe
                      </span>
                    </SelectItem>
                    <SelectItem value="bank">
                      <span className="flex items-center gap-2">
                        🏦 Bank Account
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {paymentType === 'card' && (
                <>
                  <div className="space-y-2">
                    <Label>Card Number</Label>
                    <Input 
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      maxLength={19}
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Cardholder Name</Label>
                    <Input 
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="bg-background"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Expiry Date</Label>
                      <Input 
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                        maxLength={5}
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>CVV</Label>
                      <Input 
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        maxLength={4}
                        type="password"
                        className="bg-background"
                      />
                    </div>
                  </div>
                </>
              )}

              {paymentType === 'paypal' && (
                <div className="space-y-2">
                  <Label>PayPal Email</Label>
                  <Input 
                    type="email"
                    placeholder="your@email.com"
                    value={paypalEmail}
                    onChange={(e) => setPaypalEmail(e.target.value)}
                    className="bg-background"
                  />
                </div>
              )}

              {paymentType === 'stripe' && (
                <div className="space-y-2">
                  <Label>Stripe Email</Label>
                  <Input 
                    type="email"
                    placeholder="your@email.com"
                    value={stripeEmail}
                    onChange={(e) => setStripeEmail(e.target.value)}
                    className="bg-background"
                  />
                </div>
              )}

              {paymentType === 'bank' && (
                <>
                  <div className="space-y-2">
                    <Label>Bank Name</Label>
                    <Input 
                      placeholder="Bank of America"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Number</Label>
                    <Input 
                      placeholder="123456789012"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Routing Number</Label>
                    <Input 
                      placeholder="021000021"
                      value={routingNumber}
                      onChange={(e) => setRoutingNumber(e.target.value.replace(/\D/g, '').slice(0, 9))}
                      maxLength={9}
                      className="bg-background"
                    />
                  </div>
                </>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPayment}>
                Add Payment Method
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Payment Methods List */}
      <div className="space-y-3">
        {paymentMethods.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CreditCard className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No payment methods added yet</p>
            <p className="text-xs mt-1">Add a payment method to get started</p>
          </div>
        ) : (
          paymentMethods.map((method) => (
            <div 
              key={method.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                method.isDefault 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                  method.isDefault ? 'bg-primary/20' : 'bg-secondary'
                }`}>
                  {method.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{method.name}</p>
                    {method.isDefault && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{method.details}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {!method.isDefault && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleSetDefault(method.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Set Default
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => handleRemovePayment(method.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Security Note */}
      <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Building2 className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Secure Payments</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Your payment information is encrypted and stored securely. We never store your full card number or CVV.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
