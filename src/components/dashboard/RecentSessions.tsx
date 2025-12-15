import { useState, useRef } from 'react';
import { Clock, FileText, MoreVertical, Play, Pause, Volume2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const sessions = [
  {
    id: 1,
    title: 'Client Meeting - Tokyo Office',
    languages: 'EN → JP',
    duration: '45 min',
    date: 'Today, 2:30 PM',
    status: 'completed',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    audioDuration: 45,
  },
  {
    id: 2,
    title: 'Product Demo - Berlin',
    languages: 'EN → DE',
    duration: '32 min',
    date: 'Today, 11:00 AM',
    status: 'completed',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    audioDuration: 32,
  },
  {
    id: 3,
    title: 'Support Call - São Paulo',
    languages: 'EN → PT',
    duration: '18 min',
    date: 'Yesterday, 4:15 PM',
    status: 'completed',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    audioDuration: 18,
  },
  {
    id: 4,
    title: 'Board Meeting - Paris',
    languages: 'EN → FR',
    duration: '1h 12 min',
    date: 'Yesterday, 10:00 AM',
    status: 'completed',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    audioDuration: 72,
  },
];

export function RecentSessions() {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [progress, setProgress] = useState<Record<number, number>>({});
  const audioRefs = useRef<Record<number, HTMLAudioElement>>({});

  const togglePlay = (sessionId: number, audioUrl: string) => {
    // Pause all other audio
    Object.entries(audioRefs.current).forEach(([id, audio]) => {
      if (parseInt(id) !== sessionId && audio) {
        audio.pause();
      }
    });

    if (!audioRefs.current[sessionId]) {
      const audio = new Audio(audioUrl);
      audio.addEventListener('timeupdate', () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        setProgress(prev => ({ ...prev, [sessionId]: percent }));
      });
      audio.addEventListener('ended', () => {
        setPlayingId(null);
        setProgress(prev => ({ ...prev, [sessionId]: 0 }));
      });
      audioRefs.current[sessionId] = audio;
    }

    const audio = audioRefs.current[sessionId];
    
    if (playingId === sessionId) {
      audio.pause();
      setPlayingId(null);
    } else {
      audio.play();
      setPlayingId(sessionId);
    }
  };

  return (
    <section className="glass-card overflow-hidden">
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <h2 className="text-lg font-semibold">Recent Sessions</h2>
          </div>
          <Button variant="ghost" size="sm" className="text-primary">
            View All
          </Button>
        </div>
      </div>
      
      <div className="divide-y divide-border">
        {sessions.map((session) => (
          <div 
            key={session.id}
            className="p-4 hover:bg-secondary/30 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-primary" />
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
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground hidden sm:block">{session.date}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Audio Player */}
            <div className="flex items-center gap-3 bg-secondary/50 rounded-lg p-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9 rounded-full bg-primary/10 hover:bg-primary/20"
                onClick={() => togglePlay(session.id, session.audioUrl)}
              >
                {playingId === session.id ? (
                  <Pause className="w-4 h-4 text-primary" />
                ) : (
                  <Play className="w-4 h-4 text-primary ml-0.5" />
                )}
              </Button>
              
              {/* Progress Bar */}
              <div className="flex-1 relative">
                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-100"
                    style={{ width: `${progress[session.id] || 0}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-muted-foreground">
                    {playingId === session.id ? formatTime((progress[session.id] || 0) / 100 * session.audioDuration * 60) : '0:00'}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{session.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Volume2 className="w-4 h-4 text-muted-foreground" />
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Download className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
