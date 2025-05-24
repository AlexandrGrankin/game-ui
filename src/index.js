import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';

// React 18 синтаксис с createRoot
const container = document.getElementById('root');

if (!container) {
    throw new Error('Root element not found! Make sure you have a div with id="root" in your HTML.');
}

const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);