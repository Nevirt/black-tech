'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { dictionaries, Locale } from './dictionaries';
import { COMPANY_CONFIG as COMPANY_ES, PRODUCTS_CONFIG as PRODUCTS_ES, SEO_CONFIG as SEO_ES } from '@/config/company.es';
import { COMPANY_CONFIG as COMPANY_EN, PRODUCTS_CONFIG as PRODUCTS_EN, SEO_CONFIG as SEO_EN } from '@/config/company.en';

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  company: typeof COMPANY_EN;
  products: typeof PRODUCTS_EN;
  seo: typeof SEO_EN;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = 'app_locale';

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? (localStorage.getItem(STORAGE_KEY) as Locale | null) : null;
    if (saved === 'en' || saved === 'es') {
      setLocaleState(saved);
    } else {
      setLocaleState('en');
    }
  }, []);

  const setLocale = (loc: Locale) => {
    setLocaleState(loc);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, loc);
      const html = document.documentElement;
      html.setAttribute('lang', loc);
    }
  };

  const t = (key: string) => {
    const dict = dictionaries[locale] ?? {};
    return dict[key] ?? key;
  };

  const value = useMemo<I18nContextValue>(() => {
    const company = locale === 'es' ? COMPANY_ES : COMPANY_EN;
    const products = locale === 'es' ? PRODUCTS_ES : PRODUCTS_EN;
    const seo = locale === 'es' ? SEO_ES : SEO_EN;
    return { locale, setLocale, t, company, products, seo };
  }, [locale]);

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
};




