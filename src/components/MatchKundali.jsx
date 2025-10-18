import React, { useState } from 'react';
import { matchKundali } from '../utils/gemini';

const MatchKundali = ({ apiKey }) => {
    const [person1, setPerson1] = useState({
        name: '',
        dob: '',
        tob: '',
        pob: ''
    });

    const [person2, setPerson2] = useState({
        name: '',
        dob: '',
        tob: '',
        pob: ''
    });

    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (person, field, value) => {
        if (person === 1) {
            setPerson1({ ...person1, [field]: value });
        } else {
            setPerson2({ ...person2, [field]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!apiKey) {
            alert('Please set your Gemini API key in the settings first!');
            return;
        }

        if (!person1.name || !person1.dob || !person1.tob || !person1.pob ||
            !person2.name || !person2.dob || !person2.tob || !person2.pob) {
            alert('Please fill in all fields for both persons');
            return;
        }

        setIsLoading(true);
        setResult(null);

        try {
            const compatibility = await matchKundali(person1, person2);
            setResult(compatibility);
        } catch (error) {
            console.error('Error generating compatibility report:', error);
            alert('Error generating compatibility report. Please check your API key and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const renderForm = (personNum, personData) => (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-yellow-200 mb-4 flex items-center gap-2">
                <span>{personNum === 1 ? '👤' : '👥'}</span> Person {personNum === 1 ? 'A' : 'B'}
            </h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-purple-100 mb-2 text-sm font-semibold">Full Name</label>
                    <input
                        type="text"
                        value={personData.name}
                        onChange={(e) => handleChange(personNum, 'name', e.target.value)}
                        placeholder="Enter full name"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div>
                    <label className="block text-purple-100 mb-2 text-sm font-semibold">Date of Birth</label>
                    <input
                        type="date"
                        value={personData.dob}
                        onChange={(e) => handleChange(personNum, 'dob', e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div>
                    <label className="block text-purple-100 mb-2 text-sm font-semibold">Time of Birth</label>
                    <input
                        type="time"
                        value={personData.tob}
                        onChange={(e) => handleChange(personNum, 'tob', e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div>
                    <label className="block text-purple-100 mb-2 text-sm font-semibold">Place of Birth</label>
                    <input
                        type="text"
                        value={personData.pob}
                        onChange={(e) => handleChange(personNum, 'pob', e.target.value)}
                        placeholder="City, Country"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-pink-200 to-red-200 bg-clip-text text-transparent">
                    💕 Match Kundali
                </h2>
                <p className="text-purple-200">Discover your cosmic compatibility</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {renderForm(1, person1)}
                    {renderForm(2, person2)}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl font-bold text-lg hover:from-pink-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Analyzing Compatibility...' : 'Check Compatibility'}
                </button>
            </form>

            {isLoading && (
                <div className="mt-6 bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-purple-200">Consulting the stars about your connection...</p>
                </div>
            )}

            {result && (
                <div className="mt-6 bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 animate-fade-in">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-4xl">💝</span>
                        <div>
                            <h3 className="text-2xl font-bold text-pink-200">Compatibility Report</h3>
                            <p className="text-purple-200 text-sm">{person1.name} & {person2.name}</p>
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

export default MatchKundali;
