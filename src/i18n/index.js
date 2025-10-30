import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import hi from './hi.json';
import es from './es.json'; // ✅ Add Spanish file

// ✅ Add 'es' to your resources
const resources = {
    en: { translation: en },
    hi: { translation: hi },
    es: { translation: es },
};

i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
});

// ✅ Updated loadLanguage to include 'es'
export const loadLanguage = (lang) => {
    if (resources[lang]) {
        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang);
    } else {
        console.warn(`Language "${lang}" not found in resources`);
    }
};

export const preloadSelectedLanguage = () => {
    return new Promise((resolve) => {
        const lang = localStorage.getItem('language') || 'en';
        if (resources[lang]) i18n.changeLanguage(lang);
        resolve();
    });
};

export default i18n;
