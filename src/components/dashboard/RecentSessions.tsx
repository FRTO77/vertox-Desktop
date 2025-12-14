import { Clock, FileText, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

const sessions = [
  {
    id: 1,
    title: 'Client Meeting - Tokyo Office',
    languages: 'EN → JP',
    duration: '45 min',
    date: 'Today, 2:30 PM',
    status: 'completed',
  },
  {
    id: 2,
    title: 'Product Demo - Berlin',
    languages: 'EN → DE',
    duration: '32 min',
    date: 'Today, 11:00 AM',
    status: 'completed',
  },
  {
    id: 3,
    title: 'Support Call - São Paulo',
    languages: 'EN → PT',
    duration: '18 min',
    date: 'Yesterday, 4:15 PM',
    status: 'completed',
  },
  {
    id: 4,
    title: 'Board Meeting - Paris',
    languages: 'EN → FR',
    duration: '1h 12 min',
    date: 'Yesterday, 10:00 AM',
    status: 'completed',
  },
];

export function RecentSessions() {
  return (
    <section className="glass-card overflow-hidden">
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Sessions</h2>
          <Button variant="ghost" size="sm" className="text-primary">
            View All
          </Button>
        </div>
      </div>
      
      <div className="divide-y divide-border">
        {sessions.map((session) => (
          <div 
            key={session.id}
            className="p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <FileText className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">{session.title}</p>
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
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground hidden sm:block">{session.date}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
