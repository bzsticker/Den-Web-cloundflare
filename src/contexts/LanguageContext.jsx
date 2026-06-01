import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../data/translations.js';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('den-language') || 'th');

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const switchLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    localStorage.setItem('den-language', nextLanguage);
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage: switchLanguage,
      t: translations[language],
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return value;
}
