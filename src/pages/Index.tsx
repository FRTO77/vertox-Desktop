import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/dashboard/HeroSection';
import { QuickActions, StatusWidget } from '@/components/dashboard/QuickActions';
import { CaseCarousel } from '@/components/dashboard/CaseCarousel';
import { Testimonials } from '@/components/dashboard/Testimonials';
import { Partners } from '@/components/dashboard/Partners';

import { HowItWorks } from '@/components/dashboard/HowItWorks';
import { LiveTranslation } from '@/components/translation/LiveTranslation';
import { PlansSection } from '@/components/plans/PlansSection';
import { SettingsSection } from '@/components/settings/SettingsSection';
import { UpdatesSection } from '@/components/updates/UpdatesSection';
import { HelpSection } from '@/components/help/HelpSection';

const Index = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        navigate('/');
      }
      setIsLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate('/');
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
                <QuickActions onNavigate={handleNavigate} activeSection={activeSection} />
              </div>
              <StatusWidget />
            </div>

            <HowItWorks />
            
            <CaseCarousel />

            <Testimonials />
            
            

            <Partners />
          </div>
        )}

        {activeSection === 'translate' && <LiveTranslation />}
        
        {activeSection === 'plans' && <PlansSection />}

        {activeSection === 'updates' && <UpdatesSection onNavigate={handleNavigate} />}

        {activeSection === 'help' && <HelpSection />}

        {activeSection === 'settings' && <SettingsSection />}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2025 VertoX. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
            <a href="/support" className="hover:text-foreground transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
