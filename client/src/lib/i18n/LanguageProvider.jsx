'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations } from './tranlation';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'en';
    setLocale(savedLocale);
    document.documentElement.lang = savedLocale;
    document.documentElement.dir = savedLocale === 'ar' ? 'rtl' : 'ltr';
    setMounted(true);
  }, []);

  const t = (key) => {
    return translations[locale]?.[key] || translations.en[key] || key;
  };

  const changeLanguage = (newLocale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    window.location.reload(); // Force reload to update all components
  };

  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ locale, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
