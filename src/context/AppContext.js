import React, { createContext, useContext, useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';

// Начальное состояние приложения
const initialState = {
    clickCoins: 10000,
    statistics: {
        won: 2,
        lose: 10,
        total: 12,
        winRate: 16.7 // в процентах
    },
    progress: {
        current: 23,
        max: 100,
        level: 'Щегол',
        percentage: 23
    },
    battles: {
        available: 3,
        max: 10,
        nextBattleTime: '00:12:00',
        cooldownEndTime: null
    },
    user: {
        nickname: 'Player',
        avatar: null,
        level: 1,
        experience: 23
    },
    settings: {
        soundEnabled: true,
        animationsEnabled: true,
        language: 'ru'
    }
};

// Типы действий
const ActionTypes = {
    INCREMENT_COINS: 'INCREMENT_COINS',
    DECREMENT_COINS: 'DECREMENT_COINS',
    SET_COINS: 'SET_COINS',
    UPDATE_STATISTICS: 'UPDATE_STATISTICS',
    UPDATE_PROGRESS: 'UPDATE_PROGRESS',
    UPDATE_BATTLES: 'UPDATE_BATTLES',
    UPDATE_USER: 'UPDATE_USER',
    UPDATE_SETTINGS: 'UPDATE_SETTINGS',
    RESET_STATE: 'RESET_STATE',
    BATTLE_WIN: 'BATTLE_WIN',
    BATTLE_LOSE: 'BATTLE_LOSE'
};

// Редьюсер для обработки действий
function appReducer(state, action) {
    try {
        switch (action.type) {
            case ActionTypes.INCREMENT_COINS: {
                const amount = action.payload || 500;
                return {
                    ...state,
                    clickCoins: Math.max(0, state.clickCoins + amount)
                };
            }

            case ActionTypes.DECREMENT_COINS: {
                const amount = action.payload || 500;
                return {
                    ...state,
                    clickCoins: Math.max(0, state.clickCoins - amount)
                };
            }

            case ActionTypes.SET_COINS: {
                const amount = Math.max(0, action.payload || 0);
                return {
                    ...state,
                    clickCoins: amount
                };
            }

            case ActionTypes.UPDATE_STATISTICS: {
                const newStats = { ...state.statistics, ...action.payload };
                // Пересчитываем процент побед
                if (newStats.won !== undefined || newStats.total !== undefined) {
                    newStats.total = newStats.won + newStats.lose;
                    newStats.winRate = newStats.total > 0
                        ? Math.round((newStats.won / newStats.total) * 100 * 10) / 10
                        : 0;
                }
                return {
                    ...state,
                    statistics: newStats
                };
            }

            case ActionTypes.UPDATE_PROGRESS: {
                const newProgress = { ...state.progress, ...action.payload };
                // Пересчитываем процент прогресса
                if (newProgress.current !== undefined && newProgress.max !== undefined) {
                    newProgress.percentage = Math.round((newProgress.current / newProgress.max) * 100);
                }
                return {
                    ...state,
                    progress: newProgress
                };
            }

            case ActionTypes.UPDATE_BATTLES: {
                return {
                    ...state,
                    battles: {
                        ...state.battles,
                        ...action.payload
                    }
                };
            }

            case ActionTypes.UPDATE_USER: {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        ...action.payload
                    }
                };
            }

            case ActionTypes.UPDATE_SETTINGS: {
                return {
                    ...state,
                    settings: {
                        ...state.settings,
                        ...action.payload
                    }
                };
            }

            case ActionTypes.BATTLE_WIN: {
                const coinsWon = action.payload?.coinsWon || 1000;
                const expGained = action.payload?.expGained || 50;

                return {
                    ...state,
                    clickCoins: state.clickCoins + coinsWon,
                    statistics: {
                        ...state.statistics,
                        won: state.statistics.won + 1,
                        total: state.statistics.total + 1,
                        winRate: Math.round(((state.statistics.won + 1) / (state.statistics.total + 1)) * 100 * 10) / 10
                    },
                    progress: {
                        ...state.progress,
                        current: Math.min(state.progress.current + expGained, state.progress.max)
                    },
                    battles: {
                        ...state.battles,
                        available: Math.max(0, state.battles.available - 1)
                    }
                };
            }

            case ActionTypes.BATTLE_LOSE: {
                const expLost = action.payload?.expLost || 10;

                return {
                    ...state,
                    statistics: {
                        ...state.statistics,
                        lose: state.statistics.lose + 1,
                        total: state.statistics.total + 1,
                        winRate: Math.round((state.statistics.won / (state.statistics.total + 1)) * 100 * 10) / 10
                    },
                    progress: {
                        ...state.progress,
                        current: Math.max(0, state.progress.current - expLost)
                    },
                    battles: {
                        ...state.battles,
                        available: Math.max(0, state.battles.available - 1)
                    }
                };
            }

            case ActionTypes.RESET_STATE: {
                return { ...initialState };
            }

            default: {
                console.warn(`Unknown action type: ${action.type}`);
                return state;
            }
        }
    } catch (error) {
        console.error('Error in appReducer:', error, action);
        return state; // Возвращаем предыдущее состояние при ошибке
    }
}

// Создаем контекст
const AppContext = createContext(null);

// Провайдер контекста
export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Функции для взаимодействия с состоянием
    const incrementCoins = useCallback((amount) => {
        dispatch({ type: ActionTypes.INCREMENT_COINS, payload: amount });
    }, []);

    const decrementCoins = useCallback((amount) => {
        dispatch({ type: ActionTypes.DECREMENT_COINS, payload: amount });
    }, []);

    const setCoins = useCallback((amount) => {
        dispatch({ type: ActionTypes.SET_COINS, payload: amount });
    }, []);

    const updateStatistics = useCallback((statistics) => {
        dispatch({ type: ActionTypes.UPDATE_STATISTICS, payload: statistics });
    }, []);

    const updateProgress = useCallback((progress) => {
        dispatch({ type: ActionTypes.UPDATE_PROGRESS, payload: progress });
    }, []);

    const updateBattles = useCallback((battles) => {
        dispatch({ type: ActionTypes.UPDATE_BATTLES, payload: battles });
    }, []);

    const updateUser = useCallback((user) => {
        dispatch({ type: ActionTypes.UPDATE_USER, payload: user });
    }, []);

    const updateSettings = useCallback((settings) => {
        dispatch({ type: ActionTypes.UPDATE_SETTINGS, payload: settings });
    }, []);

    const handleBattleWin = useCallback((rewards = {}) => {
        dispatch({ type: ActionTypes.BATTLE_WIN, payload: rewards });
    }, []);

    const handleBattleLose = useCallback((penalties = {}) => {
        dispatch({ type: ActionTypes.BATTLE_LOSE, payload: penalties });
    }, []);

    const resetState = useCallback(() => {
        dispatch({ type: ActionTypes.RESET_STATE });
    }, []);

    // Вычисляемые значения
    const computedValues = React.useMemo(() => ({
        canAfford: (cost) => state.clickCoins >= cost,
        battlesProgress: `${state.battles.available}/${state.battles.max}`,
        progressPercentage: Math.round((state.progress.current / state.progress.max) * 100),
        nextLevelExp: state.progress.max - state.progress.current,
        totalGamesPlayed: state.statistics.won + state.statistics.lose
    }), [state.clickCoins, state.battles, state.progress, state.statistics]);

    // Значение контекста, доступное для всех компонентов
    const value = React.useMemo(() => ({
        state,
        actions: {
            incrementCoins,
            decrementCoins,
            setCoins,
            updateStatistics,
            updateProgress,
            updateBattles,
            updateUser,
            updateSettings,
            handleBattleWin,
            handleBattleLose,
            resetState
        },
        computed: computedValues
    }), [
        state,
        incrementCoins,
        decrementCoins,
        setCoins,
        updateStatistics,
        updateProgress,
        updateBattles,
        updateUser,
        updateSettings,
        handleBattleWin,
        handleBattleLose,
        resetState,
        computedValues
    ]);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

AppProvider.propTypes = {
    children: PropTypes.node.isRequired
};

// Хук для использования контекста в компонентах
export function useAppState() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('useAppState must be used within an AppProvider');
    }

    return context;
}

// Экспортируем типы действий для использования в компонентах
export { ActionTypes };