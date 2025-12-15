import { useState } from 'react';
import { HelpCircle, MessageSquare, Book, ChevronDown, Send, ExternalLink, Mail, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const faqs = [
  {
    id: 1,
    question: 'How does real-time translation work?',
    answer: 'VertoX uses advanced AI models to capture your speech, translate it in real-time, and play back the translation through your headphones with minimal latency (typically under 500ms).',
  },
  {
    id: 2,
    question: 'Which languages are supported?',
    answer: 'We support over 40 languages including English, Spanish, French, German, Japanese, Chinese, Korean, Portuguese, Arabic, and many more. Premium plans unlock access to all languages.',
  },
  {
    id: 3,
    question: 'Can I use VertoX for recorded meetings?',
    answer: 'Yes! VertoX supports both real-time translation during live meetings and post-meeting translation of recorded audio files.',
  },
  {
    id: 4,
    question: 'How is my data protected?',
    answer: 'All audio is encrypted end-to-end. We do not store your conversations on our servers unless you explicitly enable session recording for your records.',
  },
  {
    id: 5,
    question: 'What hardware do I need?',
    answer: 'Just a microphone and headphones. VertoX works with any standard audio devices, including built-in laptop microphones and Bluetooth headsets.',
  },
  {
    id: 6,
    question: 'How do I upgrade or change my plan?',
    answer: 'Navigate to the Plans section from the main menu. You can upgrade, downgrade, or customize your plan at any time. Changes take effect at the start of your next billing cycle.',
  },
];

const docs = [
  { title: 'Getting Started Guide', icon: Book, url: '#' },
  { title: 'API Documentation', icon: ExternalLink, url: '#' },
  { title: 'Video Tutorials', icon: ExternalLink, url: '#' },
  { title: 'Troubleshooting', icon: HelpCircle, url: '#' },
];

export function HelpSection() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(1);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <HelpCircle className="w-4 h-4" />
          Help & Support
        </div>
        <h1 className="text-3xl font-bold mb-3">How can we help you?</h1>
        <p className="text-muted-foreground">
          Find answers to common questions or get in touch with our support team
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* FAQ Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
                <p className="text-sm text-muted-foreground">Quick answers to common questions</p>
              </div>
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <div 
                  key={faq.id}
                  className="border border-border rounded-xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors"
                  >
                    <span className="font-medium pr-4">{faq.question}</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                        expandedFaq === faq.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-200 ${
                      expandedFaq === faq.id ? 'max-h-40' : 'max-h-0'
                    }`}
                  >
                    <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Contact Support</h2>
                <p className="text-sm text-muted-foreground">Send us a message and we'll respond within 24 hours</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <Input 
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input 
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Input 
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea 
                  placeholder="Describe your issue or question..."
                  className="min-h-[120px]"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full gap-2">
                <Send className="w-4 h-4" />
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Documentation Links */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Book className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold">Documentation</h2>
            </div>

            <div className="space-y-2">
              {docs.map((doc, index) => (
                <a
                  key={index}
                  href={doc.url}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
                >
                  <doc.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-sm font-medium">{doc.title}</span>
                  <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Other Ways to Reach Us</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Email</p>
                  <p className="font-medium">support@vertox.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Phone</p>
                  <p className="font-medium">+1 (888) 555-0123</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Hours</p>
                  <p className="font-medium">Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
