import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './public/transalations/en.json';
import translationES from './public/transalations/es.json';

const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Idioma por defecto
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
