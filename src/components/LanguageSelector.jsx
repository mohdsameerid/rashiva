import { useTranslation } from "react-i18next";
import { loadLanguage } from "../i18n";
import { getlocalStorageSelectedLanguage } from "../utils/apphelper";

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const language = getlocalStorageSelectedLanguage();

    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang);
        loadLanguage(lang);

        // setTimeout(() => {
        //     const state = localStorage.getItem('activeState');
        //     setActiveSection(state);
        // }, 200);

        window.location.reload();

        // return clearTimeout(res);
    };

    return (
        <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-full w-max">
            <button
                className={`px-3 py-1 rounded-full transition-colors duration-200 ml-0  ${language === 'en' ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-700 hover:bg-gray-200 cursor-pointer'
                    }`}
                onClick={() => handleLanguageChange('en')}
            >
                Eng
            </button>
            <button
                className={`px-3 py-1 rounded-full transition-colors duration-200 ${language === 'hi' ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-700 hover:bg-gray-200 cursor-pointer'
                    }`}
                onClick={() => handleLanguageChange('hi')}
            >
                हिं
            </button>
        </div>
    );
};

export default LanguageSelector;
