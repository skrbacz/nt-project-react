import i18n, { changeLanguage } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translationPL from './locales/pl.json';
import translationEN from './locales/en.json';

const resources = {
  pl: {
    translation: translationPL,
  },
  en: {
    translation: translationEN,
  },
};

i18n.use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: 'en',
  resources,
});

i18n.changeLanguage('pl');

export default i18n;
