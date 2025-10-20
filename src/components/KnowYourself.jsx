import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getZodiacInsights } from '../utils/gemini';

const KnowYourself = ({ apiKey }) => {
    const { t } = useTranslation();
    const [selectedSign, setSelectedSign] = useState('');
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Get all zodiac signs from translation JSON
    const zodiacSigns = Object.keys(t('zodiac', { returnObjects: true })).map((key) => ({
        key,
        label: t(`zodiac.${key}.label`),
        emoji: t(`zodiac.${key}.emoji`),
        dates: t(`zodiac.${key}.dates`)
    }));

    const handleSignSelect = async (signKey) => {
        if (!apiKey) return alert(t('knowYourself.errors.apiKeyMissing'));

        setSelectedSign(signKey);
        setIsLoading(true);
        setResult(null);

        try {
            const insights = await getZodiacInsights(signKey);
            setResult(insights);
        } catch (error) {
            console.error(error);
            alert(t('knowYourself.errors.unknown'));
            setSelectedSign('');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                    {t('knowYourself.title')}
                </h2>
                <p className="text-purple-200">{t('knowYourself.subtitle')}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                {zodiacSigns.map((sign) => (
                    <button
                        key={sign.key}
                        onClick={() => handleSignSelect(sign.key)}
                        disabled={isLoading}
                        className={`bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${selectedSign === sign.key ? 'ring-2 ring-yellow-400 bg-white/20' : ''
                            }`}
                    >
                        <div className="text-4xl mb-2">{sign.emoji}</div>
                        <div className="font-bold text-white text-sm">{sign.label}</div>
                        <div className="text-purple-200 text-xs mt-1">{sign.dates}</div>
                    </button>
                ))}
            </div>

            {isLoading && (
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-purple-200">{t('knowYourself.loading', { sign: zodiacSigns.find(s => s.key === selectedSign)?.label })}</p>
                </div>
            )}

            {result && (
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 animate-fade-in">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-4xl">{zodiacSigns.find(s => s.key === selectedSign)?.emoji}</span>
                        <div>
                            <h3 className="text-2xl font-bold text-yellow-200">
                                {t('knowYourself.insightsTitle', { sign: zodiacSigns.find(s => s.key === selectedSign)?.label })}
                            </h3>
                            <p className="text-purple-200 text-sm">{zodiacSigns.find(s => s.key === selectedSign)?.dates}</p>
                        </div>
                    </div>
                    <div className="prose prose-invert max-w-none">
                        <p className="text-purple-50 leading-relaxed whitespace-pre-wrap">{result}</p>
                    </div>
                    <button
                        onClick={() => {
                            setSelectedSign('');
                            setResult(null);
                        }}
                        className="mt-6 px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all"
                    >
                        {t('knowYourself.exploreAnother')}
                    </button>
                </div>
            )}

            {!selectedSign && !isLoading && (
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
                    <span className="text-6xl mb-4 inline-block">✨</span>
                    <h3 className="text-xl font-bold text-white mb-2">{t('knowYourself.chooseSign')}</h3>
                    <p className="text-purple-200">{t('knowYourself.selectSignDescription')}</p>
                </div>
            )}
        </div>
    );
};

export default KnowYourself;
