// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import hi from './hi.json';

// All translations loaded statically
const resources = {
    en: { translation: en },
    hi: { translation: hi },
};

// Initialize i18next
i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem('language') || 'en', // default or saved language
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
});

// Helper to switch language
export const loadLanguage = (lang) => {
    if (resources[lang]) {
        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang);
    } else {
        console.warn(`Language "${lang}" not found in resources`);
    }
};

// Preload selected language on app start
// i18n.js
export const preloadSelectedLanguage = () => {
    return new Promise((resolve) => {
        const lang = localStorage.getItem('language') || 'en';
        if (resources[lang]) i18n.changeLanguage(lang);
        resolve();
    });
};

export default i18n;
