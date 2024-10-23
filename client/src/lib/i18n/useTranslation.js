'use client';

import { useRouter } from 'next/navigation';
import { translations } from './tranlation';

export function useTranslation() {
  const router = useRouter();
  const locale = document.documentElement.lang || 'en';

  const t = (key) => {
    return translations[locale]?.[key] || translations.en[key];
  };

  const changeLanguage = (newLocale) => {
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    router.refresh();
  };

  return { t, changeLanguage, locale };
}
