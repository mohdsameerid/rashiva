
import { t } from 'i18next';
import React from 'react';

const Home = ({ setActiveSection }) => {
    const features = [
        {
            id: 'chat',
            title: 'Chat with AI Astrologer',
            description: 'Have a one-on-one conversation with our spiritual AI guide. Ask questions, seek guidance, and explore the cosmos.',
            icon: '💬',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            id: 'make-kundali',
            title: 'Make Your Kundali',
            description: 'Generate your personalized birth chart and receive deep insights about your personality and life path.',
            icon: '⭐',
            gradient: 'from-blue-500 to-purple-500'
        },
        {
            id: 'match-kundali',
            title: 'Match Kundali',
            description: 'Discover your compatibility with someone special. Get detailed relationship insights and guidance.',
            icon: '💕',
            gradient: 'from-pink-500 to-red-500'
        },
        {
            id: 'know-yourself',
            title: 'Know Yourself',
            description: 'Explore your zodiac sign and uncover the secrets of your cosmic identity.',
            icon: '🌟',
            gradient: 'from-yellow-500 to-orange-500'
        }
    ];

    return (
        <div className="animate-fade-in">
            <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
                    {t("welcome")}
                </h1>
                <p className="text-xl text-purple-200 max-w-2xl mx-auto">
                    {t("subtitle")}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {features.map((feature) => (
                    <div
                        key={feature.id}
                        onClick={() => setActiveSection(feature.id)}
                        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 border border-white/20"
                    >
                        <div className={`text-6xl mb-4 inline-block bg-gradient-to-br ${feature.gradient} p-4 rounded-xl`}>
                            {feature.icon}
                        </div>
                        <h2 className="text-2xl font-bold mb-3 text-white">
                            {t(`features.${feature.id}.title`)}
                        </h2>
                        <p className="text-purple-100 leading-relaxed">
                            {t(`features.${feature.id}.description`)}

                        </p>
                        <button className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all">
                            {t("exploreNow")}
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Home;
