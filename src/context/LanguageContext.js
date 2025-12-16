import React, { createContext, useContext, useState, useEffect } from 'react';
import translationsEN from '../translations/en.json';
import translationsRU from '../translations/ru.json';

const LanguageContext = createContext();

const translations = {
  en: translationsEN,
  ru: translationsRU
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get saved language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('preferredLanguage');
    return savedLanguage || 'en';
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ru' : 'en');
  };

  const switchLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
