import { Languages, Users, MessageSquare, Download, Mic, Headphones, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuickActionsProps {
  onNavigate: (section: string) => void;
  activeSection?: string;
}

export function QuickActions({ onNavigate, activeSection }: QuickActionsProps) {
  const actions = [
    {
      id: 'translate',
      icon: Languages,
      title: 'Start Translation',
      description: 'Begin real-time voice translation',
      onClick: () => onNavigate('translate'),
    },
    {
      id: 'meeting',
      icon: Users,
      title: 'Create Meeting',
      description: 'Start a multilingual meeting room',
      onClick: () => {},
    },
    {
      id: 'chat',
      icon: MessageSquare,
      title: 'Open LLM Chat',
      description: 'AI-powered translation assistant',
      onClick: () => {},
    },
    {
      id: 'update',
      icon: Download,
      title: 'Download Update',
      description: 'Version 2.4.1 available',
      onClick: () => onNavigate('updates'),
    },
  ];

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Quick Actions</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => {
          const isActive = activeSection === action.id;
          const isHighlighted = action.id === 'translate';
          
          return (
            <button
              key={action.title}
              onClick={action.onClick}
              className={`glass-card p-5 text-left hover-lift group relative ${
                isHighlighted || isActive
                  ? 'bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20' 
                  : ''
              }`}
            >
              {isActive && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                  <Check className="w-3 h-3 text-accent-foreground" />
                </div>
              )}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors duration-200 ${
                isHighlighted || isActive
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary'
              }`}>
                <action.icon className="w-5 h-5" />
              </div>
              <h3 className="font-medium mb-1">{action.title}</h3>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function StatusWidget() {
  return (
    <section className="glass-card p-5 space-y-4">
      <h2 className="text-lg font-semibold">System Status</h2>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Mic className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium">Microphone</p>
              <p className="text-xs text-muted-foreground">Blue Yeti Pro</p>
            </div>
          </div>
          <span className="status-indicator active" />
        </div>
        
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Headphones className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Headphones</p>
              <p className="text-xs text-muted-foreground">AirPods Pro</p>
            </div>
          </div>
          <span className="status-indicator active" />
        </div>

        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Latency</span>
            <span className="font-medium text-primary">42ms</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-muted-foreground">Languages</span>
            <span className="font-medium">EN → ES</span>
          </div>
        </div>
      </div>
    </section>
  );
}
