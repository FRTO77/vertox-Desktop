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
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, Building2 } from 'lucide-react';
import { toast } from 'sonner';

interface ContactSalesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  configSummary: string;
}

export function ContactSalesDialog({ open, onOpenChange, configSummary }: ContactSalesDialogProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !company) {
      toast.error('Please fill in required fields');
      return;
    }
    
    toast.success('Your request has been sent. Our sales team will contact you within 24 hours.');
    onOpenChange(false);
    setName('');
    setEmail('');
    setCompany('');
    setPhone('');
    setMessage('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Contact Sales Team</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Contact Info */}
          <div className="p-4 rounded-lg bg-secondary/30 border border-border space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">sales@vertox.ai</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">+1 (555) 123-4567</span>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@company.com"
              />
            </div>
            <div>
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Your Company Inc."
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div>
              <Label htmlFor="message">Additional Message (optional)</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us more about your requirements..."
                rows={3}
              />
            </div>
          </div>

          {/* Configuration Summary Note */}
          <p className="text-xs text-muted-foreground">
            Your plan configuration will be included in the request.
          </p>

          <Button onClick={handleSubmit} className="w-full" size="lg">
            <Building2 className="w-4 h-4 mr-2" />
            Send Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
