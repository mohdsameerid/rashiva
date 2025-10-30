import { useTranslation } from "react-i18next";
import { loadLanguage } from "../i18n";
import { getlocalStorageSelectedLanguage } from "../utils/apphelper";

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const language = getlocalStorageSelectedLanguage() || "en";

    const handleLanguageChange = (e) => {
        const lang = e.target.value;
        i18n.changeLanguage(lang);
        loadLanguage(lang);
        window.location.reload();
    };

    return (
        <div className="flex items-center bg-gray-100 p-2 rounded-full w-max">
            <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-transparent text-gray-800 outline-none cursor-pointer px-2 py-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
            >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="es">Español</option>
            </select>
        </div>
    );
};

export default LanguageSelector;
