import { Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onStartTranslation: () => void;
}

export function HeroSection({ onStartTranslation }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl gradient-hero p-8 md:p-12">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center">
        {/* Text content */}
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium">
            <span className="status-indicator active" />
            Real-time Translation
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
            Break language barriers
            <br />
            <span className="text-primary">in every meeting</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-lg">
            Professional voice translation for business communications. 
            Connect your mic, choose languages, and speak naturally.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button size="xl" variant="hero" onClick={onStartTranslation}>
              Start Translation
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="xl" variant="glass">
              <Play className="w-4 h-4" />
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Video preview */}
        <div className="flex-1 max-w-md w-full">
          <div className="relative aspect-video rounded-xl overflow-hidden glass-card group cursor-pointer hover-lift">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Play className="w-6 h-6 text-primary-foreground ml-1" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="glass-card px-4 py-2.5 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" />
                <span className="text-sm font-medium">How translation works in business</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
