
import React, { useState, useEffect, useRef } from 'react';

const Chat = ({ apiKey }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const savedMessages = localStorage.getItem('astro-chat-history');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        } else {
            setMessages([
                {
                    role: 'assistant',
                    content: 'Namaste! I am Astro Guru, your spiritual guide through the cosmic realm. How may I illuminate your path today?'
                }
            ]);
        }
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('astro-chat-history', JSON.stringify(messages));
        }
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        if (!apiKey) {
            alert('Please set your Gemini API key in the settings first!');
            return;
        }

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = true; // call api
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        } catch (error) {
            console.error('Error generating response:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'I apologize, but I am having trouble connecting to the cosmic energies right now. Please check your API key and try again.'
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const clearHistory = () => {
        if (window.confirm('Are you sure you want to clear all chat history?')) {
            setMessages([
                {
                    role: 'assistant',
                    content: 'Namaste! I am Astro Guru, your spiritual guide through the cosmic realm. How may I illuminate your path today?'
                }
            ]);
            localStorage.removeItem('astro-chat-history');
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto animate-fade-in">
            <div className="bg-white/10 backdrop-blur-lg rounded-t-2xl p-4 border border-white/20 border-b-0 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <span>💫</span> Chat with Astro Guru
                    </h2>
                    <p className="text-purple-200 text-sm">Your spiritual AI guide</p>
                </div>
                <button
                    onClick={clearHistory}
                    className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm transition-all border border-red-500/30"
                >
                    Clear History
                </button>
            </div>

            <div className="flex-1 bg-white/5 backdrop-blur-lg overflow-y-auto p-6 space-y-4 border-l border-r border-white/20">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl p-4 ${message.role === 'user'
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                : 'bg-white/10 text-purple-50 border border-white/20'
                                }`}
                        >
                            {message.role === 'assistant' && (
                                <div className="flex items-center gap-2 mb-2 text-yellow-200">
                                    <span className="text-xl">🔮</span>
                                    <span className="font-semibold text-sm">Astro Guru</span>
                                </div>
                            )}
                            <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start animate-fade-in">
                        <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                            <div className="flex items-center gap-2 mb-2 text-yellow-200">
                                <span className="text-xl">🔮</span>
                                <span className="font-semibold text-sm">Astro Guru</span>
                            </div>
                            <div className="flex gap-2 items-center text-purple-200">
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                <span className="ml-2 text-sm">Astrologer is typing...</span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-b-2xl p-4 border border-white/20 border-t-0">
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything about astrology, life, or the cosmos..."
                        className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        disabled={isTyping}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isTyping || !input.trim()}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
