import React, { createContext, useContext, useState, useCallback } from 'react';

type Language = 'en' | 'es' | 'hi' | 'pt' | 'zh' | 'fr';

interface LanguageContextType {
  currentLanguage: Language;
  translations: Record<string, string>;
  switchLanguage: (lang: Language) => Promise<void>;
  translate: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Record<string, string>>({});

  const loadTranslations = useCallback(async (lang: Language) => {
    try {
      // In production, this would load from your backend or CDN
      const module = await import(`../translations/${lang}.json`);
      setTranslations(module.default);
    } catch (error) {
      console.error(`Failed to load translations for ${lang}`, error);
    }
  }, []);

  const switchLanguage = useCallback(async (lang: Language) => {
    try {
      // In production, this would verify with your backend
      await loadTranslations(lang);
      setCurrentLanguage(lang);
      document.documentElement.lang = lang;
    } catch (error) {
      console.error('Failed to switch language', error);
      throw error;
    }
  }, [loadTranslations]);

  const translate = useCallback((key: string) => {
    return translations[key] || key;
  }, [translations]);

  const value = {
    currentLanguage,
    translations,
    switchLanguage,
    translate
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
