import React from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import App from './App.jsx';
import i18n, { preloadSelectedLanguage } from './i18n';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

preloadSelectedLanguage().then(() => {
  root.render(
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </React.StrictMode>
  );
});
