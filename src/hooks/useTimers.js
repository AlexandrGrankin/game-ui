import { useRef, useCallback, useEffect } from 'react';

/**
 * Custom hook для безопасного управления таймерами
 * Автоматически очищает все таймеры при размонтировании компонента
 */
const useTimers = () => {
    const timersRef = useRef(new Set());

    // Добавление таймера в список отслеживаемых
    const addTimer = useCallback((timerId) => {
        timersRef.current.add(timerId);
    }, []);

    // Очистка конкретного таймера
    const clearTimer = useCallback((timerId) => {
        if (timerId) {
            clearTimeout(timerId);
            timersRef.current.delete(timerId);
        }
    }, []);

    // Очистка всех таймеров
    const clearAllTimers = useCallback(() => {
        timersRef.current.forEach(timerId => {
            clearTimeout(timerId);
        });
        timersRef.current.clear();
    }, []);

    // Создание нового таймера с автоматическим добавлением в список
    const createTimer = useCallback((callback, delay) => {
        const timerId = setTimeout(() => {
            try {
                callback();
            } catch (error) {
                console.error('Error in timer callback:', error);
            } finally {
                // Удаляем таймер из списка после выполнения
                timersRef.current.delete(timerId);
            }
        }, delay);

        addTimer(timerId);
        return timerId;
    }, [addTimer]);

    // Создание интервала с автоматическим добавлением в список
    const createInterval = useCallback((callback, delay) => {
        const intervalId = setInterval(() => {
            try {
                callback();
            } catch (error) {
                console.error('Error in interval callback:', error);
            }
        }, delay);

        // Для интервалов используем clearInterval
        const clearIntervalTimer = () => {
            clearInterval(intervalId);
            timersRef.current.delete(clearIntervalTimer);
        };

        timersRef.current.add(clearIntervalTimer);
        return clearIntervalTimer;
    }, []);

    // Проверка активности таймеров (для отладки)
    const getActiveTimersCount = useCallback(() => {
        return timersRef.current.size;
    }, []);

    // Очистка при размонтировании компонента
    useEffect(() => {
        return () => {
            clearAllTimers();
        };
    }, [clearAllTimers]);

    return {
        createTimer,
        createInterval,
        clearTimer,
        clearAllTimers,
        getActiveTimersCount
    };
};

export default useTimers;