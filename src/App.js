// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/App.css';
import './styles/telegram-adaptive.css'; // Импортируем новые стили
import { AppProvider } from './context/AppContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import HomePage from './pages/HomePage/HomePage';
import BattlePage from './pages/BattlePage/BattlePage';
import initializeTelegramApp from './utils/telegramUtils';

function App() {
    useEffect(() => {
        // Инициализируем Telegram WebApp при монтировании
        initializeTelegramApp();

        // Обработчик изменения высоты окна для обычных браузеров
        const handleResize = () => {
            // Устанавливаем CSS переменную с текущей высотой
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        // Вызываем сразу и устанавливаем слушатель
        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', () => {
            // Небольшая задержка для корректного определения новых размеров
            setTimeout(handleResize, 100);
        });

        // Предотвращаем zoom на iOS при двойном тапе
        let lastTouchEnd = 0;
        const preventZoom = (e) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        };

        document.addEventListener('touchend', preventZoom, false);

        // Предотвращаем pull-to-refresh
        let startY = 0;
        const preventPullToRefresh = (e) => {
            const touch = e.touches[0];
            if (touch.clientY > startY && window.scrollY === 0) {
                e.preventDefault();
            }
        };

        document.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchmove', preventPullToRefresh, { passive: false });

        // Cleanup функция
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
            document.removeEventListener('touchend', preventZoom);
            document.removeEventListener('touchmove', preventPullToRefresh);
        };
    }, []);

    return (
        <ErrorBoundary>
            <AppProvider>
                <Router>
                    <div className="app-container">
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route path="/battle" component={BattlePage} />
                            {/* 404 страница */}
                            <Route path="*">
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 'var(--content-height, 100vh)',
                                    background: 'var(--gradient-background)',
                                    color: 'var(--white)',
                                    textAlign: 'center',
                                    padding: 'calc(2rem * var(--scale-factor, 1))',
                                    fontFamily: 'var(--font-family)'
                                }}>
                                    <h1 style={{
                                        fontSize: 'calc(4rem * var(--scale-factor, 1))',
                                        margin: '0 0 1rem 0'
                                    }}>404</h1>
                                    <p style={{
                                        fontSize: 'calc(var(--font-size-large) * var(--scale-factor, 1))',
                                        marginBottom: 'calc(2rem * var(--scale-factor, 1))'
                                    }}>
                                        Страница не найдена
                                    </p>
                                    <button
                                        onClick={() => window.location.href = '/'}
                                        style={{
                                            padding: 'calc(0.8rem * var(--scale-factor, 1)) calc(1.5rem * var(--scale-factor, 1))',
                                            background: 'var(--gradient-blue)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: 'var(--border-radius)',
                                            cursor: 'pointer',
                                            fontSize: 'calc(var(--font-size-medium) * var(--scale-factor, 1))',
                                            fontWeight: 'var(--font-weight-bold)',
                                            fontFamily: 'var(--font-family)',
                                            boxShadow: 'var(--shadow-card)',
                                            transition: 'transform 0.2s ease'
                                        }}
                                        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                    >
                                        На главную
                                    </button>
                                </div>
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </AppProvider>
        </ErrorBoundary>
    );
}

export default App;