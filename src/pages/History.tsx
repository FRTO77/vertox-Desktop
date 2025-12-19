import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Clock, MoreVertical, Search, Filter, Calendar, Download, Mail, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';

const allHistory = [
  { id: 1, title: 'Client Meeting - Tokyo Office', languages: 'EN → JP', duration: '45 min', date: 'Dec 15, 2024', time: '2:30 PM', type: 'meeting' },
  { id: 2, title: 'Product Demo - Berlin', languages: 'EN → DE', duration: '32 min', date: 'Dec 15, 2024', time: '11:00 AM', type: 'demo' },
  { id: 3, title: 'Support Call - São Paulo', languages: 'EN → PT', duration: '18 min', date: 'Dec 14, 2024', time: '4:15 PM', type: 'call' },
  { id: 4, title: 'Board Meeting - Paris', languages: 'EN → FR', duration: '1h 12 min', date: 'Dec 14, 2024', time: '10:00 AM', type: 'meeting' },
  { id: 5, title: 'Sales Pitch - Madrid', languages: 'EN → ES', duration: '28 min', date: 'Dec 13, 2024', time: '3:00 PM', type: 'pitch' },
  { id: 6, title: 'Training Session - Seoul', languages: 'EN → KO', duration: '1h 30 min', date: 'Dec 13, 2024', time: '9:00 AM', type: 'training' },
  { id: 7, title: 'Investor Call - Shanghai', languages: 'EN → ZH', duration: '52 min', date: 'Dec 12, 2024', time: '2:00 PM', type: 'call' },
  { id: 8, title: 'Team Sync - Amsterdam', languages: 'EN → NL', duration: '25 min', date: 'Dec 12, 2024', time: '11:30 AM', type: 'meeting' },
  { id: 9, title: 'Customer Interview - Milan', languages: 'EN → IT', duration: '40 min', date: 'Dec 11, 2024', time: '4:00 PM', type: 'interview' },
  { id: 10, title: 'Webinar - Moscow', languages: 'EN → RU', duration: '1h 45 min', date: 'Dec 11, 2024', time: '1:00 PM', type: 'webinar' },
  { id: 11, title: 'Conference Call - Dubai', languages: 'EN → AR', duration: '55 min', date: 'Dec 10, 2024', time: '3:30 PM', type: 'call' },
  { id: 12, title: 'Product Launch - Mexico City', languages: 'EN → ES', duration: '2h 15 min', date: 'Dec 10, 2024', time: '10:00 AM', type: 'event' },
];

const History = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate('/auth');
      } else {
        setIsLoading(false);
      }
    };
    
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Full History</h1>
            <p className="text-muted-foreground mt-1">Complete archive of all your translation sessions</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search history..." className="pl-9 w-64" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Calendar className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-4">
            <p className="text-2xl font-bold text-primary">156</p>
            <p className="text-sm text-muted-foreground">Total Sessions</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-2xl font-bold text-accent">87h</p>
            <p className="text-sm text-muted-foreground">Total Duration</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">Languages Used</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-2xl font-bold">94%</p>
            <p className="text-sm text-muted-foreground">Avg. Accuracy</p>
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{allHistory.length} records found</span>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export All
            </Button>
          </div>
          <div className="divide-y divide-border">
            {allHistory.map((item) => (
              <div 
                key={item.id}
                className="p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary">{item.type}</span>
                      <span className="text-xs text-muted-foreground">{item.languages}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm">{item.date}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover border-border">
                      <DropdownMenuItem className="gap-2 cursor-pointer">
                        <Download className="w-4 h-4" />
                        Download Transcript
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 cursor-pointer">
                        <Mail className="w-4 h-4" />
                        Send via Email
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 cursor-pointer text-destructive">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;