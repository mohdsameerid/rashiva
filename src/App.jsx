import React, { useState, useEffect } from 'react';
import { initializeGemini } from './utils/gemini';
import Home from './components/Home';
import Chat from './components/Chat';
import MakeKundali from './components/MakeKundali';
import MatchKundali from './components/MatchKundali';
import KnowYourself from './components/KnowYourself';
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const apikey = import.meta.env.VITE_KEY;

  useEffect(() => {
    const savedApiKey = apikey;
    if (savedApiKey) {
      setApiKey(savedApiKey);
      initializeGemini(savedApiKey);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (tempApiKey.trim()) {
      localStorage.setItem('gemini-api-key', tempApiKey);
      setApiKey(tempApiKey);
      initializeGemini(tempApiKey);
      setShowApiKeyModal(false);
      setTempApiKey('');
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    // { id: 'chat', label: 'Chat', icon: '💬' },
    { id: 'make-kundali', label: 'Make Kundali', icon: '⭐' },
    // { id: 'match-kundali', label: 'Match Kundali', icon: '💕' },
    { id: 'know-yourself', label: 'Know Yourself', icon: '🌟' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <Home setActiveSection={setActiveSection} />;
      case 'chat':
        return <Chat apiKey={apiKey} />;
      case 'make-kundali':
        return <MakeKundali apiKey={apiKey} />;
      case 'match-kundali':
        return <MatchKundali apiKey={apiKey} />;
      case 'know-yourself':
        return <KnowYourself apiKey={apiKey} />;
      default:
        return <Home setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen">
      <nav className="bg-black/30 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔮</span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-200 to-purple-200 bg-clip-text text-transparent">
                Rashiva
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${activeSection === item.id
                    ? 'bg-purple-500 text-white'
                    : 'text-purple-200 hover:bg-white/10'
                    }`}
                >
                  <span>{item.icon}</span>
                  <span className="font-semibold">{item.label}</span>
                </button>
              ))}
              {/* <button
                onClick={() => setShowApiKeyModal(true)}
                className="ml-2 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg transition-all border border-yellow-500/30 flex items-center gap-2"
                title={apiKey ? 'API Key Set' : 'Set API Key'}
              >
                <span>{apiKey ? '✓' : '⚙️'}</span>
                <span className="font-semibold">Settings</span>
              </button> */}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-lg transition-all flex items-center gap-2 ${activeSection === item.id
                    ? 'bg-purple-500 text-white'
                    : 'text-purple-200 hover:bg-white/10'
                    }`}
                >
                  <span>{item.icon}</span>
                  <span className="font-semibold">{item.label}</span>
                </button>
              ))}
              {/* <button
                onClick={() => {
                  setShowApiKeyModal(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full px-4 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg transition-all border border-yellow-500/30 flex items-center gap-2"
              >
                <span>{apiKey ? '✓' : '⚙️'}</span>
                <span className="font-semibold">Settings</span>
              </button> */}
            </div>
          )}
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>

      <footer className="mt-16 py-6 text-center text-purple-200 border-t border-white/10">
        <p className="text-sm">Made by Samir 🌙</p>
      </footer>

      {showApiKeyModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl p-8 max-w-md w-full border border-white/20 animate-fade-in">
            <h3 className="text-2xl font-bold mb-4 text-yellow-200 flex items-center gap-2">
              <span>⚙️</span> Settings
            </h3>
            <p className="text-purple-100 mb-4 text-sm">
              Enter your Google Gemini API key to unlock all features. Don't have one? Get it for free from Google AI Studio.
            </p>
            <input
              type="password"
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowApiKeyModal(false);
                  setTempApiKey('');
                }}
                className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/20"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveApiKey}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                Save
              </button>
            </div>
            {apiKey && (
              <p className="mt-4 text-green-300 text-sm text-center">✓ API Key is currently set</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
