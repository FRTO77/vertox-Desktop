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
      return 'text-orange-500';
    case 'improvement':
      return 'text-emerald-500';
    case 'security':
      return 'text-violet-500';
    default:
      return 'text-muted-foreground';
  }
};

interface UpdatesSectionProps {
  onNavigate?: (section: string) => void;
}

export function UpdatesSection({ onNavigate }: UpdatesSectionProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const [showFullHistory, setShowFullHistory] = useState(false);

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

  const handleReleaseClick = (release: Release) => {
    setSelectedRelease(release);
    setShowFullHistory(true);
  };

  const handleBackToList = () => {
    setSelectedRelease(null);
    setShowFullHistory(false);
  };

  const handleViewFullHistory = () => {
    setShowFullHistory(true);
    setSelectedRelease(null);
  };

  // Full history view with selected release details
  if (showFullHistory) {
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Page Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBackToList}
              className="gap-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {selectedRelease ? `Version ${selectedRelease.version}` : 'Full Update History'}
              </h1>
              <p className="text-muted-foreground">
                {selectedRelease ? selectedRelease.date : 'Complete changelog and version history'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Release List Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-4 space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">All Versions</h3>
              {releases.map((release) => (
                <button
                  key={release.version}
                  onClick={() => setSelectedRelease(release)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedRelease?.version === release.version 
                      ? 'bg-primary/10 border border-primary/30' 
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">v{release.version}</span>
                    {release.status === 'current' && (
                      <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-xs">
                        Installed
                      </Badge>
                    )}
                    {release.status === 'available' && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{release.date}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Release Details */}
          <div className="lg:col-span-2">
            {selectedRelease ? (
              <div className="glass-card p-6 space-y-6 animate-fade-in">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold">v{selectedRelease.version}</h2>
                      {selectedRelease.status === 'current' && (
                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                          Currently Installed
                        </Badge>
                      )}
                      {selectedRelease.status === 'available' && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          Available for Install
                        </Badge>
                      )}
                      {selectedRelease.status === 'past' && (
                        <Badge variant="secondary">
                          Past Version
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold">{selectedRelease.title}</h3>
                    <p className="text-muted-foreground flex items-center gap-2 mt-2">
                      <Clock className="w-4 h-4" />
                      Released on {selectedRelease.date}
                    </p>
                  </div>
                  {selectedRelease.status === 'available' && (
                    <Button 
                      variant="accent" 
                      className="gap-2"
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
                          Install
                        </>
                      )}
                    </Button>
                  )}
                </div>

                <div className="border-t border-border pt-6">
                  <h4 className="text-lg font-semibold mb-4">What's New</h4>
                  <div className="space-y-4">
                    {selectedRelease.changes.map((change, index) => {
                      const Icon = getChangeIcon(change.type);
                      return (
                        <div 
                          key={index}
                          className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            change.type === 'feature' ? 'bg-primary/10' :
                            change.type === 'fix' ? 'bg-orange-500/10' :
                            change.type === 'improvement' ? 'bg-emerald-500/10' :
                            'bg-violet-500/10'
                          }`}>
                            <Icon className={`w-5 h-5 ${getChangeColor(change.type)}`} />
                          </div>
                          <div>
                            <span className={`text-xs font-semibold uppercase ${getChangeColor(change.type)}`}>
                              {change.type}
                            </span>
                            <p className="text-foreground mt-1">{change.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h4 className="text-lg font-semibold mb-2">Release Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Version Type</span>
                      <p className="font-medium capitalize">{selectedRelease.type} Release</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Changes</span>
                      <p className="font-medium">{selectedRelease.changes.length} updates</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Features</span>
                      <p className="font-medium">{selectedRelease.changes.filter(c => c.type === 'feature').length}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Bug Fixes</span>
                      <p className="font-medium">{selectedRelease.changes.filter(c => c.type === 'fix').length}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-card p-6 space-y-6">
                <div className="text-center py-12">
                  <Download className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold">Select a Version</h3>
                  <p className="text-muted-foreground">Choose a version from the list to view its details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

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
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-primary/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
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
                <button
                  key={release.version}
                  onClick={() => handleReleaseClick(release)}
                  className={`relative pl-6 pb-6 w-full text-left transition-all hover:bg-muted/30 rounded-lg p-4 -ml-4 ${index !== releases.length - 1 ? 'border-l-2 border-border ml-0 pl-6' : ''}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-[-5px] top-4 w-4 h-4 rounded-full border-2 ${
                    release.status === 'current' 
                      ? 'bg-emerald-500 border-emerald-500' 
                      : release.status === 'available'
                        ? 'bg-primary border-primary animate-pulse-soft'
                        : 'bg-background border-border'
                  }`} />

                  {/* Release Header */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-lg font-semibold">v{release.version}</span>
                    {release.status === 'current' && (
                      <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
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

                  {/* Changes Preview */}
                  <div className="space-y-2">
                    {release.changes.slice(0, 2).map((change, changeIndex) => {
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
                    {release.changes.length > 2 && (
                      <p className="text-xs text-primary ml-6">+{release.changes.length - 2} more changes</p>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <Button 
              variant="ghost" 
              className="w-full gap-2 text-muted-foreground"
              onClick={handleViewFullHistory}
            >
              View Full History
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
