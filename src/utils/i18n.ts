import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'search.placeholder': 'Search for news...',
      'filters.title': 'Filters',
      'filters.date': 'Date',
      'filters.source': 'Source',
      'filters.category': 'Category',
      'button.search': 'Search',
      'button.readMore': 'Read More',
      'button.apply': 'Apply Filters',
    },
  },
  // Add more languages as needed
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 