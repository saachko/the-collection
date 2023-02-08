import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import languages from './languages.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: languages,
    fallbackLng: 'en',
    returnNull: false,
    debug: true,
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
      format: (value, format) => (format === 'lowercase' ? value.toLowerCase() : value),
    },
  });

export default i18n;
