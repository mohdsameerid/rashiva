export const getlocalStorageSelectedLanguage = () => {
    return localStorage.getItem('language') || 'en';
}