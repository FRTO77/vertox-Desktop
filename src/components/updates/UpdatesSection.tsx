import { useState } from 'react';
import { 
  Download, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Bug,
  Zap,
  Shield,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Release {
  version: string;
  date: string;
  type: 'major' | 'minor' | 'patch';
  status: 'current' | 'available' | 'past';
  title: string;
  changes: {
    type: 'feature' | 'fix' | 'improvement' | 'security';
    description: string;
  }[];
}

const releases: Release[] = [
  {
    version: '2.4.0',
    date: 'December 10, 2024',
    type: 'minor',
    status: 'available',
    title: 'Enhanced AI Translation Engine',
    changes: [
      { type: 'feature', description: 'New neural translation model with 40% faster processing' },
      { type: 'feature', description: 'Added support for 12 new regional dialects' },
      { type: 'improvement', description: 'Improved noise cancellation algorithms' },
      { type: 'fix', description: 'Fixed audio sync issues on Windows devices' },
    ],
  },
  {
    version: '2.3.2',
    date: 'November 28, 2024',
    type: 'patch',
    status: 'current',
    title: 'Stability Update',
    changes: [
      { type: 'fix', description: 'Resolved memory leak during long sessions' },
      { type: 'security', description: 'Updated encryption protocols to TLS 1.3' },
      { type: 'improvement', description: 'Better handling of network interruptions' },
    ],
  },
  {
    version: '2.3.0',
    date: 'November 15, 2024',
    type: 'minor',
    status: 'past',
    title: 'Meeting Integration',
    changes: [
      { type: 'feature', description: 'Native Zoom and Teams integration' },
      { type: 'feature', description: 'Real-time transcript export to PDF' },
      { type: 'improvement', description: 'Redesigned settings panel' },
    ],
  },
  {
    version: '2.2.0',
    date: 'October 20, 2024',
    type: 'minor',
    status: 'past',
    title: 'Custom Voice Profiles',
    changes: [
      { type: 'feature', description: 'Create and save custom voice tone profiles' },
      { type: 'feature', description: 'Speaker identification in group calls' },
      { type: 'fix', description: 'Fixed Bluetooth audio device detection' },
    ],
  },
];

const getChangeIcon = (type: string) => {
  switch (type) {
    case 'feature':
      return Sparkles;
    case 'fix':
      return Bug;
    case 'improvement':
      return Zap;
    case 'security':
      return Shield;
    default:
      return Sparkles;
  }
};

const getChangeColor = (type: string) => {
  switch (type) {
    case 'feature':
      return 'text-primary';
    case 'fix':
      return 'text-amber-500';
    case 'improvement':
      return 'text-accent';
    case 'security':
      return 'text-violet-500';
    default:
      return 'text-muted-foreground';
  }
};

export function UpdatesSection() {
  const [isChecking, setIsChecking] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleCheckUpdate = () => {
    setIsChecking(true);
    setTimeout(() => setIsChecking(false), 2000);
  };

  const handleUpdate = () => {
    setIsUpdating(true);
    setTimeout(() => setIsUpdating(false), 3000);
  };

  const currentVersion = releases.find(r => r.status === 'current');
  const availableUpdate = releases.find(r => r.status === 'available');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Updates</h1>
        <p className="text-muted-foreground">Manage app versions and view changelog</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Update Status Card */}
        <div className="lg:col-span-1 space-y-6">
          {/* Current Version */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Version</p>
                <p className="text-2xl font-bold">v{currentVersion?.version}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Installed on {currentVersion?.date}
            </p>
          </div>

          {/* Available Update */}
          {availableUpdate && (
            <div className="glass-card p-6 space-y-4 border-primary/30 bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center animate-pulse-soft">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Update Available</p>
                  <p className="text-2xl font-bold">v{availableUpdate.version}</p>
                </div>
              </div>
              <p className="text-sm font-medium">{availableUpdate.title}</p>
              <Button 
                variant="accent" 
                className="w-full gap-2"
                onClick={handleUpdate}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Install Update
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Check for Updates */}
          <Button 
            variant="outline" 
            className="w-full gap-2"
            onClick={handleCheckUpdate}
            disabled={isChecking}
          >
            {isChecking ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Check for Updates
              </>
            )}
          </Button>
        </div>

        {/* Changelog */}
        <div className="lg:col-span-2">
          <div className="glass-card p-6 space-y-6">
            <h2 className="text-lg font-semibold">Changelog</h2>
            
            <div className="space-y-6">
              {releases.map((release, index) => (
                <div 
                  key={release.version}
                  className={`relative pl-6 pb-6 ${index !== releases.length - 1 ? 'border-l-2 border-border' : ''}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Timeline dot */}
                  <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${
                    release.status === 'current' 
                      ? 'bg-accent border-accent' 
                      : release.status === 'available'
                        ? 'bg-primary border-primary animate-pulse-soft'
                        : 'bg-background border-border'
                  }`} />

                  {/* Release Header */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-lg font-semibold">v{release.version}</span>
                    {release.status === 'current' && (
                      <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                        Installed
                      </Badge>
                    )}
                    {release.status === 'available' && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        New
                      </Badge>
                    )}
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {release.date}
                    </span>
                  </div>

                  <p className="text-sm font-medium mb-3">{release.title}</p>

                  {/* Changes */}
                  <div className="space-y-2">
                    {release.changes.map((change, changeIndex) => {
                      const Icon = getChangeIcon(change.type);
                      return (
                        <div 
                          key={changeIndex}
                          className="flex items-start gap-2 text-sm group"
                        >
                          <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${getChangeColor(change.type)}`} />
                          <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                            {change.description}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <Button variant="ghost" className="w-full gap-2 text-muted-foreground">
              View Full History
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
