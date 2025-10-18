import React, { useState } from 'react';
import { getZodiacInsights } from '../utils/gemini';

const KnowYourself = ({ apiKey }) => {
    const [selectedSign, setSelectedSign] = useState('');
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const zodiacSigns = [
        { name: 'Aries', emoji: '♈', dates: 'Mar 21 - Apr 19' },
        { name: 'Taurus', emoji: '♉', dates: 'Apr 20 - May 20' },
        { name: 'Gemini', emoji: '♊', dates: 'May 21 - Jun 20' },
        { name: 'Cancer', emoji: '♋', dates: 'Jun 21 - Jul 22' },
        { name: 'Leo', emoji: '♌', dates: 'Jul 23 - Aug 22' },
        { name: 'Virgo', emoji: '♍', dates: 'Aug 23 - Sep 22' },
        { name: 'Libra', emoji: '♎', dates: 'Sep 23 - Oct 22' },
        { name: 'Scorpio', emoji: '♏', dates: 'Oct 23 - Nov 21' },
        { name: 'Sagittarius', emoji: '♐', dates: 'Nov 22 - Dec 21' },
        { name: 'Capricorn', emoji: '♑', dates: 'Dec 22 - Jan 19' },
        { name: 'Aquarius', emoji: '♒', dates: 'Jan 20 - Feb 18' },
        { name: 'Pisces', emoji: '♓', dates: 'Feb 19 - Mar 20' }
    ];

    const handleSignSelect = async (sign) => {
        if (!apiKey) {
            alert('Please set your Gemini API key in the settings first!');
            return;
        }

        setSelectedSign(sign);
        setIsLoading(true);
        setResult(null);

        try {
            const insights = await getZodiacInsights(sign);
            setResult(insights);
        } catch (error) {
            console.error('Error generating zodiac insights:', error);
            alert('Error generating zodiac insights. Please check your connection and try again.');
            setSelectedSign('');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                    🌟 Know Yourself
                </h2>
                <p className="text-purple-200">Explore the secrets of your zodiac sign</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                {zodiacSigns.map((sign) => (
                    <button
                        key={sign.name}
                        onClick={() => handleSignSelect(sign.name)}
                        disabled={isLoading}
                        className={`bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${selectedSign === sign.name ? 'ring-2 ring-yellow-400 bg-white/20' : ''
                            }`}
                    >
                        <div className="text-4xl mb-2">{sign.emoji}</div>
                        <div className="font-bold text-white text-sm">{sign.name}</div>
                        <div className="text-purple-200 text-xs mt-1">{sign.dates}</div>
                    </button>
                ))}
            </div>

            {isLoading && (
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-purple-200">Gathering cosmic insights about {selectedSign}...</p>
                </div>
            )}

            {result && (
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 animate-fade-in">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-4xl">
                            {zodiacSigns.find(s => s.name === selectedSign)?.emoji}
                        </span>
                        <div>
                            <h3 className="text-2xl font-bold text-yellow-200">{selectedSign} Insights</h3>
                            <p className="text-purple-200 text-sm">
                                {zodiacSigns.find(s => s.name === selectedSign)?.dates}
                            </p>
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
                        Explore Another Sign
                    </button>
                </div>
            )}

            {!selectedSign && !isLoading && (
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
                    <span className="text-6xl mb-4 inline-block">✨</span>
                    <h3 className="text-xl font-bold text-white mb-2">Choose Your Zodiac Sign</h3>
                    <p className="text-purple-200">Select a sign above to discover deep insights about personality, strengths, and life guidance</p>
                </div>
            )}
        </div>
    );
};

export default KnowYourself;
