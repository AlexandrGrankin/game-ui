import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/App.css';
import { AppProvider } from './context/AppContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import HomePage from './pages/HomePage/HomePage';
import BattlePage from './pages/BattlePage/BattlePage';

function App() {
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
                                    minHeight: '100vh',
                                    background: 'var(--gradient-background)',
                                    color: 'var(--white)',
                                    textAlign: 'center',
                                    padding: '2rem',
                                    fontFamily: 'var(--font-family)'
                                }}>
                                    <h1 style={{ fontSize: '4rem', margin: '0 0 1rem 0' }}>404</h1>
                                    <p style={{ fontSize: 'var(--font-size-large)', marginBottom: '2rem' }}>
                                        Страница не найдена
                                    </p>
                                    <button
                                        onClick={() => window.location.href = '/'}
                                        style={{
                                            padding: '0.8rem 1.5rem',
                                            background: 'var(--gradient-blue)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: 'var(--border-radius)',
                                            cursor: 'pointer',
                                            fontSize: 'var(--font-size-medium)',
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