import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type InterfaceLanguage = 'en' | 'ru' | 'ja';

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
  ru: {
    // Navigation
    'nav.dashboard': 'Главная',
    'nav.liveTranslation': 'Живой перевод',
    'nav.plans': 'Тарифы',
    'nav.updates': 'Обновления',
    'nav.help': 'Помощь',
    'nav.settings': 'Настройки',
    
    // Header
    'header.connected': 'Подключено',
    'header.signIn': 'Войти',
    'header.profile': 'Профиль',
    'header.audioDevices': 'Аудиоустройства',
    'header.plansBilling': 'Тарифы и оплата',
    'header.checkUpdates': 'Проверить обновления',
    'header.signOut': 'Выйти',
    
    // Hero
    'hero.badge': 'Перевод в реальном времени',
    'hero.title1': 'Преодолейте языковые барьеры',
    'hero.title2': 'на каждой встрече',
    'hero.description': 'Профессиональный голосовой перевод для бизнес-коммуникаций. Подключите микрофон, выберите языки и говорите естественно.',
    'hero.startTranslation': 'Начать перевод',
    'hero.watchDemo': 'Смотреть демо',
    'hero.videoCaption': 'Как работает перевод в бизнесе',
    
    // Quick Actions
    'quickActions.title': 'Быстрые действия',
    'quickActions.startTranslation': 'Начать перевод',
    'quickActions.startTranslationDesc': 'Запустить голосовой перевод в реальном времени',
    'quickActions.createMeeting': 'Создать встречу',
    'quickActions.createMeetingDesc': 'Начать многоязычную конференцию',
    'quickActions.openChat': 'Открыть чат ИИ',
    'quickActions.openChatDesc': 'Переводчик с искусственным интеллектом',
    'quickActions.downloadUpdate': 'Скачать обновление',
    'quickActions.downloadUpdateDesc': 'Доступна версия 2.4.1',
    
    // System Status
    'status.title': 'Состояние системы',
    'status.microphone': 'Микрофон',
    'status.headphones': 'Наушники',
    'status.latency': 'Задержка',
    'status.languages': 'Языки',
    
    // How It Works
    'howItWorks.title': 'Как это работает',
    'howItWorks.step1Title': 'Подключите микрофон',
    'howItWorks.step1Desc': 'Подключите микрофон или гарнитуру и выберите в настройках',
    'howItWorks.step2Title': 'Выберите языки',
    'howItWorks.step2Desc': 'Выберите исходный и целевой языки для перевода',
    'howItWorks.step3Title': 'Получите перевод',
    'howItWorks.step3Desc': 'Слушайте перевод в реальном времени в наушниках',
    
    // Partners
    'partners.trusted': 'Доверие во всём мире',
    'partners.title': 'Глобальные коммуникации',
    'partners.description': 'Интеграция с платформами, которые вы уже используете',
    'partners.enterpriseClients': 'Корпоративных клиентов',
    'partners.uptimeSLA': 'Время работы SLA',
    'partners.translations': 'Переводов',
    
    // Footer
    'footer.rights': '© 2024 VertoX. Все права защищены.',
    'footer.privacy': 'Конфиденциальность',
    'footer.terms': 'Условия',
    'footer.support': 'Поддержка',
    
    // Settings
    'settings.language': 'Язык интерфейса',
    'settings.languageDesc': 'Выберите предпочтительный язык интерфейса',
  },
  ja: {
    // Navigation
    'nav.dashboard': 'ダッシュボード',
    'nav.liveTranslation': 'ライブ翻訳',
    'nav.plans': 'プラン',
    'nav.updates': 'アップデート',
    'nav.help': 'ヘルプ',
    'nav.settings': '設定',
    
    // Header
    'header.connected': '接続済み',
    'header.signIn': 'ログイン',
    'header.profile': 'プロフィール',
    'header.audioDevices': 'オーディオデバイス',
    'header.plansBilling': 'プランと請求',
    'header.checkUpdates': 'アップデートを確認',
    'header.signOut': 'ログアウト',
    
    // Hero
    'hero.badge': 'リアルタイム翻訳',
    'hero.title1': '言語の壁を越えて',
    'hero.title2': 'すべての会議で',
    'hero.description': 'ビジネスコミュニケーションのためのプロフェッショナルな音声翻訳。マイクを接続し、言語を選択して、自然に話しましょう。',
    'hero.startTranslation': '翻訳を開始',
    'hero.watchDemo': 'デモを見る',
    'hero.videoCaption': 'ビジネスでの翻訳の仕組み',
    
    // Quick Actions
    'quickActions.title': 'クイックアクション',
    'quickActions.startTranslation': '翻訳を開始',
    'quickActions.startTranslationDesc': 'リアルタイム音声翻訳を開始',
    'quickActions.createMeeting': 'ミーティングを作成',
    'quickActions.createMeetingDesc': '多言語ミーティングルームを開始',
    'quickActions.openChat': 'AIチャットを開く',
    'quickActions.openChatDesc': 'AI搭載の翻訳アシスタント',
    'quickActions.downloadUpdate': 'アップデートをダウンロード',
    'quickActions.downloadUpdateDesc': 'バージョン2.4.1が利用可能',
    
    // System Status
    'status.title': 'システム状態',
    'status.microphone': 'マイク',
    'status.headphones': 'ヘッドフォン',
    'status.latency': 'レイテンシ',
    'status.languages': '言語',
    
    // How It Works
    'howItWorks.title': '使い方',
    'howItWorks.step1Title': 'マイクを接続',
    'howItWorks.step1Desc': 'マイクまたはヘッドセットを接続し、設定で選択',
    'howItWorks.step2Title': '言語を選択',
    'howItWorks.step2Desc': '翻訳元と翻訳先の言語を選択',
    'howItWorks.step3Title': '翻訳を取得',
    'howItWorks.step3Desc': 'ヘッドフォンでリアルタイム翻訳を聞く',
    
    // Partners
    'partners.trusted': '世界中で信頼',
    'partners.title': 'グローバルコミュニケーションを支援',
    'partners.description': 'すでに使用しているプラットフォームと統合',
    'partners.enterpriseClients': '企業クライアント',
    'partners.uptimeSLA': '稼働率SLA',
    'partners.translations': '翻訳数',
    
    // Footer
    'footer.rights': '© 2024 VertoX. All rights reserved.',
    'footer.privacy': 'プライバシー',
    'footer.terms': '利用規約',
    'footer.support': 'サポート',
    
    // Settings
    'settings.language': 'インターフェース言語',
    'settings.languageDesc': '希望するインターフェース言語を選択',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<InterfaceLanguage>(() => {
    const saved = localStorage.getItem('interfaceLanguage');
    return (saved as InterfaceLanguage) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('interfaceLanguage', language);
  }, [language]);

  const setLanguage = (lang: InterfaceLanguage) => {
    setLanguageState(lang);
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
  { code: 'ru' as InterfaceLanguage, name: 'Русский', flag: '🇷🇺' },
  { code: 'ja' as InterfaceLanguage, name: '日本語', flag: '🇯🇵' },
];