import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/dashboard/HeroSection';
import { QuickActions, StatusWidget } from '@/components/dashboard/QuickActions';
import { CaseCarousel } from '@/components/dashboard/CaseCarousel';
import { Testimonials } from '@/components/dashboard/Testimonials';
import { Partners } from '@/components/dashboard/Partners';
import { RecentSessions } from '@/components/dashboard/RecentSessions';
import { HowItWorks } from '@/components/dashboard/HowItWorks';
import { LiveTranslation } from '@/components/translation/LiveTranslation';
import { PlansSection } from '@/components/plans/PlansSection';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigate} activeSection={activeSection} />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        {activeSection === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            <HeroSection onStartTranslation={() => handleNavigate('translate')} />
            
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <QuickActions onNavigate={handleNavigate} />
              </div>
              <StatusWidget />
            </div>

            <HowItWorks />
            
            <CaseCarousel />
            
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RecentSessions />
              </div>
              <div className="space-y-6">
                <Testimonials />
              </div>
            </div>

            <Partners />
          </div>
        )}

        {activeSection === 'translate' && <LiveTranslation />}
        
        {activeSection === 'plans' && <PlansSection />}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 VertoX. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
