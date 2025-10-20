import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {}, // start empty
    lng: localStorage.getItem('language') || 'en', // get saved language
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
});

// Helper to dynamically load JSON
export const loadLanguage = async (lang) => {
    try {
        const translations = await import(`./${lang}.json`);
        i18n.addResourceBundle(
            lang,
            'translation',
            translations.default || translations,
            true, // deep
            true  // overwrite if exists
        );
        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang);
    } catch (err) {
        console.error('Error loading language:', err);
    }
};

// Preload selected language JSON on app start
export const preloadSelectedLanguage = async () => {
    const lang = localStorage.getItem('language') || 'en';
    try {
        const translations = await import(`./${lang}.json`);
        i18n.addResourceBundle(lang, 'translation', translations.default || translations, true, true);
        i18n.changeLanguage(lang);
    } catch (err) {
        console.error('Failed to preload language:', err);
    }
};

export default i18n;
