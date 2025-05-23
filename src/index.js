import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/global.css';

// Используем метод рендеринга для React 17 и ниже
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);