import React, { createContext, useContext, useReducer } from 'react';

// Начальное состояние приложения
const initialState = {
    clickCoins: 10000,
    statistics: {
        won: 2,
        lose: 10
    },
    progress: {
        current: 23,
        max: 100,
        level: 'Щегол'
    },
    battles: {
        available: 3,
        max: 10,
        nextBattleTime: '00:12:00'
    }
};

// Редьюсер для обработки действий
function appReducer(state, action) {
    switch (action.type) {
        case 'INCREMENT_COINS':
            return {
                ...state,
                clickCoins: state.clickCoins + 500
            };
        case 'UPDATE_STATISTICS':
            return {
                ...state,
                statistics: {
                    ...state.statistics,
                    ...action.payload
                }
            };
        case 'UPDATE_PROGRESS':
            return {
                ...state,
                progress: {
                    ...state.progress,
                    ...action.payload
                }
            };
        case 'UPDATE_BATTLES':
            return {
                ...state,
                battles: {
                    ...state.battles,
                    ...action.payload
                }
            };
        default:
            return state;
    }
}

// Создаем контекст
const AppContext = createContext();

// Провайдер контекста
export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Функции для взаимодействия с состоянием
    const incrementCoins = () => dispatch({ type: 'INCREMENT_COINS' });

    const updateStatistics = (statistics) => dispatch({
        type: 'UPDATE_STATISTICS',
        payload: statistics
    });

    const updateProgress = (progress) => dispatch({
        type: 'UPDATE_PROGRESS',
        payload: progress
    });

    const updateBattles = (battles) => dispatch({
        type: 'UPDATE_BATTLES',
        payload: battles
    });

    // Значение контекста, доступное для всех компонентов
    const value = {
        state,
        incrementCoins,
        updateStatistics,
        updateProgress,
        updateBattles
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

// Хук для использования контекста в компонентах
export function useAppState() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppState must be used within an AppProvider');
    }
    return context;
}