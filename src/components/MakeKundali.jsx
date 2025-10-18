import React, { useState } from 'react';
import { interpretKundali } from '../utils/gemini';

const MakeKundali = ({ apiKey }) => {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        tob: '',
        pob: ''
    });
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!apiKey) {
            alert('Please set your Gemini API key in the settings first!');
            return;
        }

        if (!formData.name || !formData.dob || !formData.tob || !formData.pob) {
            alert('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        setResult(null);

        try {
            const interpretation = await interpretKundali(
                formData.name,
                formData.dob,
                formData.tob,
                formData.pob
            );
            setResult(interpretation);
        } catch (error) {
            console.error('Error generating Kundali interpretation:', error);
            alert('Error generating Kundali interpretation. Please check your API key and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const getZodiacSign = (dob) => {
        if (!dob) return '';
        const date = new Date(dob);
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const signs = [
            { sign: 'Capricorn', start: [12, 22], end: [1, 19] },
            { sign: 'Aquarius', start: [1, 20], end: [2, 18] },
            { sign: 'Pisces', start: [2, 19], end: [3, 20] },
            { sign: 'Aries', start: [3, 21], end: [4, 19] },
            { sign: 'Taurus', start: [4, 20], end: [5, 20] },
            { sign: 'Gemini', start: [5, 21], end: [6, 20] },
            { sign: 'Cancer', start: [6, 21], end: [7, 22] },
            { sign: 'Leo', start: [7, 23], end: [8, 22] },
            { sign: 'Virgo', start: [8, 23], end: [9, 22] },
            { sign: 'Libra', start: [9, 23], end: [10, 22] },
            { sign: 'Scorpio', start: [10, 23], end: [11, 21] },
            { sign: 'Sagittarius', start: [11, 22], end: [12, 21] },
        ];

        for (const { sign, start, end } of signs) {
            if (
                (month === start[0] && day >= start[1]) ||
                (month === end[0] && day <= end[1])
            ) {
                return sign;
            }
        }

        return 'Capricorn';
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                    ⭐ Make Your Kundali
                </h2>
                <p className="text-purple-200">Discover your cosmic blueprint and life path</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-purple-100 mb-2 font-semibold">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-purple-100 mb-2 font-semibold">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-purple-100 mb-2 font-semibold">Time of Birth</label>
                            <input
                                type="time"
                                name="tob"
                                value={formData.tob}
                                onChange={handleChange}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-purple-100 mb-2 font-semibold">Place of Birth</label>
                        <input
                            type="text"
                            name="pob"
                            value={formData.pob}
                            onChange={handleChange}
                            placeholder="City, Country"
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {formData.dob && (
                        <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-500/30">
                            <p className="text-center text-purple-100">
                                <span className="font-semibold">Your Zodiac Sign:</span>{' '}
                                <span className="text-yellow-200 text-lg">{getZodiacSign(formData.dob)}</span>
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Interpreting Kundali...' : 'Interpret Kundali'}
                    </button>
                </form>
            </div>

            {isLoading && (
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-purple-200">Reading the cosmic energies...</p>
                </div>
            )}

            {result && (
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 animate-fade-in">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-4xl">🔮</span>
                        <div>
                            <h3 className="text-2xl font-bold text-yellow-200">Your Kundali Interpretation</h3>
                            <p className="text-purple-200 text-sm">For {formData.name}</p>
                        </div>
                    </div>
                    <div className="prose prose-invert max-w-none">
                        <p className="text-purple-50 leading-relaxed whitespace-pre-wrap">{result}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MakeKundali;
