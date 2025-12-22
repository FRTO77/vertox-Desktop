import { createContext, useContext, ReactNode } from 'react';

export type InterfaceLanguage = 'en';

interface LanguageContextType {
  language: InterfaceLanguage;
  setLanguage: (lang: InterfaceLanguage) => void;
  t: (key: string) => string;
}

const translations: Record<InterfaceLanguage, Record<string, string>> = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.liveTranslation': 'Live Translation',
    'nav.plans': 'Plans',
    'nav.updates': 'Updates',
    'nav.help': 'Help',
    'nav.settings': 'Settings',
    
    // Header
    'header.connected': 'Connected',
    'header.signIn': 'Sign In',
    'header.profile': 'Profile',
    'header.audioDevices': 'Audio Devices',
    'header.plansBilling': 'Plans & Billing',
    'header.checkUpdates': 'Check for Updates',
    'header.signOut': 'Sign Out',
    
    // Hero
    'hero.badge': 'Real-time Translation',
    'hero.title1': 'Break language barriers',
    'hero.title2': 'in every meeting',
    'hero.description': 'Professional voice translation for business communications. Connect your mic, choose languages, and speak naturally.',
    'hero.startTranslation': 'Start Translation',
    'hero.watchDemo': 'Watch Demo',
    'hero.videoCaption': 'How translation works in business',
    
    // Quick Actions
    'quickActions.title': 'Quick Actions',
    'quickActions.startTranslation': 'Start Translation',
    'quickActions.startTranslationDesc': 'Begin real-time voice translation',
    'quickActions.createMeeting': 'Create Meeting',
    'quickActions.createMeetingDesc': 'Start a multilingual meeting room',
    'quickActions.openChat': 'Open LLM Chat',
    'quickActions.openChatDesc': 'AI-powered translation assistant',
    'quickActions.downloadUpdate': 'Download Update',
    'quickActions.downloadUpdateDesc': 'Version 2.4.1 available',
    
    // System Status
    'status.title': 'System Status',
    'status.microphone': 'Microphone',
    'status.headphones': 'Headphones',
    'status.latency': 'Latency',
    'status.languages': 'Languages',
    
    // How It Works
    'howItWorks.title': 'How It Works',
    'howItWorks.step1Title': 'Connect Your Mic',
    'howItWorks.step1Desc': 'Plug in your microphone or headset and select it in settings',
    'howItWorks.step2Title': 'Choose Languages',
    'howItWorks.step2Desc': 'Select source and target languages for translation',
    'howItWorks.step3Title': 'Get Translation',
    'howItWorks.step3Desc': 'Hear real-time translated audio in your headphones',
    
    // Partners
    'partners.trusted': 'Trusted Worldwide',
    'partners.title': 'Powering Global Communication',
    'partners.description': 'Integrated with the platforms you already use',
    'partners.enterpriseClients': 'Enterprise Clients',
    'partners.uptimeSLA': 'Uptime SLA',
    'partners.translations': 'Translations',
    
    // Footer
    'footer.rights': '© 2024 VertoX. All rights reserved.',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.support': 'Support',
    
    // Settings
    'settings.language': 'Interface Language',
    'settings.languageDesc': 'Choose your preferred interface language',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language: InterfaceLanguage = 'en';

  const setLanguage = (_lang: InterfaceLanguage) => {
    // Only English is supported
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export const interfaceLanguages = [
  { code: 'en' as InterfaceLanguage, name: 'English', flag: '🇺🇸' },
];