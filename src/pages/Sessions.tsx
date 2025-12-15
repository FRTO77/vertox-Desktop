import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Clock, MoreVertical, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const allSessions = [
  { id: 1, title: 'Client Meeting - Tokyo Office', languages: 'EN → JP', duration: '45 min', date: 'Dec 15, 2024', time: '2:30 PM' },
  { id: 2, title: 'Product Demo - Berlin', languages: 'EN → DE', duration: '32 min', date: 'Dec 15, 2024', time: '11:00 AM' },
  { id: 3, title: 'Support Call - São Paulo', languages: 'EN → PT', duration: '18 min', date: 'Dec 14, 2024', time: '4:15 PM' },
  { id: 4, title: 'Board Meeting - Paris', languages: 'EN → FR', duration: '1h 12 min', date: 'Dec 14, 2024', time: '10:00 AM' },
  { id: 5, title: 'Sales Pitch - Madrid', languages: 'EN → ES', duration: '28 min', date: 'Dec 13, 2024', time: '3:00 PM' },
  { id: 6, title: 'Training Session - Seoul', languages: 'EN → KO', duration: '1h 30 min', date: 'Dec 13, 2024', time: '9:00 AM' },
  { id: 7, title: 'Investor Call - Shanghai', languages: 'EN → ZH', duration: '52 min', date: 'Dec 12, 2024', time: '2:00 PM' },
  { id: 8, title: 'Team Sync - Amsterdam', languages: 'EN → NL', duration: '25 min', date: 'Dec 12, 2024', time: '11:30 AM' },
  { id: 9, title: 'Customer Interview - Milan', languages: 'EN → IT', duration: '40 min', date: 'Dec 11, 2024', time: '4:00 PM' },
  { id: 10, title: 'Webinar - Moscow', languages: 'EN → RU', duration: '1h 45 min', date: 'Dec 11, 2024', time: '1:00 PM' },
];

const Sessions = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link to="/">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">All Sessions</h1>
            <p className="text-muted-foreground mt-1">View and manage your translation history</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search sessions..." className="pl-9 w-64" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="divide-y divide-border">
            {allSessions.map((session) => (
              <div 
                key={session.id}
                className="p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{session.title}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-muted-foreground">{session.languages}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {session.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm">{session.date}</p>
                    <p className="text-xs text-muted-foreground">{session.time}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sessions;
