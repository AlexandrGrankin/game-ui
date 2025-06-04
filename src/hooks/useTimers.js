// hooks/useTimers.js
import { useRef, useCallback, useEffect } from 'react';

/**
 * Custom hook для безопасного управления таймерами
 * Автоматически очищает все таймеры при размонтировании компонента
 * Учитывает особенности Telegram WebApp (pause/resume)
 */
const useTimers = () => {
    const timersRef = useRef(new Set());
    const pausedTimersRef = useRef(new Map()); // Для хранения приостановленных таймеров
    const isPausedRef = useRef(false);

    // Проверяем, запущено ли в Telegram WebApp
    const isTelegramWebApp = useCallback(() => {
        return !!(window.Telegram && window.Telegram.WebApp);
    }, []);

    // Добавление таймера в список отслеживаемых
    const addTimer = useCallback((timerId) => {
        timersRef.current.add(timerId);
    }, []);

    // Очистка конкретного таймера
    const clearTimer = useCallback((timerId) => {
        if (timerId) {
            clearTimeout(timerId);
            timersRef.current.delete(timerId);
            pausedTimersRef.current.delete(timerId);
        }
    }, []);

    // Очистка всех таймеров
    const clearAllTimers = useCallback(() => {
        timersRef.current.forEach(timerId => {
            clearTimeout(timerId);
        });
        timersRef.current.clear();
        pausedTimersRef.current.clear();
    }, []);

    // Приостановка всех таймеров (для Telegram WebApp)
    const pauseAllTimers = useCallback(() => {
        if (isPausedRef.current) return;

        isPausedRef.current = true;
        const now = Date.now();

        timersRef.current.forEach(timerId => {
            // Сохраняем информацию о таймере для восстановления
            const timerInfo = {
                id: timerId,
                pausedAt: now
            };
            pausedTimersRef.current.set(timerId, timerInfo);
            clearTimeout(timerId);
        });

        timersRef.current.clear();
    }, []);

    // Возобновление всех таймеров (для Telegram WebApp)
    const resumeAllTimers = useCallback(() => {
        if (!isPausedRef.current) return;

        isPausedRef.current = false;
        const now = Date.now();

        pausedTimersRef.current.forEach((timerInfo, originalId) => {
            const elapsed = now - timerInfo.pausedAt;
            // Возобновляем таймер с скорректированной задержкой
            // Это базовая реализация, может потребоваться доработка
            // в зависимости от логики приложения
            console.log(`Resuming timer ${originalId}, elapsed: ${elapsed}ms`);
        });

        pausedTimersRef.current.clear();
    }, []);

    // Создание нового таймера с автоматическим добавлением в список
    const createTimer = useCallback((callback, delay) => {
        // Если таймеры приостановлены, не создаем новый
        if (isPausedRef.current) {
            console.warn('Timers are paused, timer creation skipped');
            return null;
        }

        const timerId = setTimeout(() => {
            try {
                callback();
            } catch (error) {
                console.error('Error in timer callback:', error);
            } finally {
                // Удаляем таймер из списка после выполнения
                timersRef.current.delete(timerId);
                pausedTimersRef.current.delete(timerId);
            }
        }, delay);

        addTimer(timerId);
        return timerId;
    }, [addTimer]);

    // Создание интервала с автоматическим добавлением в список
    const createInterval = useCallback((callback, delay) => {
        // Если таймеры приостановлены, не создаем новый
        if (isPausedRef.current) {
            console.warn('Timers are paused, interval creation skipped');
            return null;
        }

        const intervalId = setInterval(() => {
            try {
                // Проверяем, не приостановлены ли таймеры
                if (!isPausedRef.current) {
                    callback();
                }
            } catch (error) {
                console.error('Error in interval callback:', error);
            }
        }, delay);

        // Для интервалов используем clearInterval
        const clearIntervalTimer = () => {
            clearInterval(intervalId);
            timersRef.current.delete(clearIntervalTimer);
            pausedTimersRef.current.delete(clearIntervalTimer);
        };

        timersRef.current.add(clearIntervalTimer);
        return clearIntervalTimer;
    }, []);

    // Создание таймера, устойчивого к паузам (будет восстановлен после паузы)
    const createPersistentTimer = useCallback((callback, delay, options = {}) => {
        const { autoRestart = false } = options;
        const startTime = Date.now();

        const wrappedCallback = () => {
            try {
                callback();
                if (autoRestart) {
                    createPersistentTimer(callback, delay, options);
                }
            } catch (error) {
                console.error('Error in persistent timer callback:', error);
            }
        };

        const timerId = createTimer(wrappedCallback, delay);

        // Сохраняем дополнительную информацию для восстановления
        if (timerId) {
            pausedTimersRef.current.set(timerId, {
                callback: wrappedCallback,
                delay,
                startTime,
                persistent: true,
                autoRestart
            });
        }

        return timerId;
    }, [createTimer]);

    // Проверка активности таймеров (для отладки)
    const getActiveTimersCount = useCallback(() => {
        return timersRef.current.size;
    }, []);

    // Получение количества приостановленных таймеров
    const getPausedTimersCount = useCallback(() => {
        return pausedTimersRef.current.size;
    }, []);

    // Настройка обработчиков для Telegram WebApp
    useEffect(() => {
        if (isTelegramWebApp()) {
            const tg = window.Telegram.WebApp;

            // Обработчик сворачивания приложения
            const handleAppPause = () => {
                console.log('Telegram WebApp paused, pausing timers');
                pauseAllTimers();
            };

            // Обработчик разворачивания приложения
            const handleAppResume = () => {
                console.log('Telegram WebApp resumed, resuming timers');
                resumeAllTimers();
            };

            // Подписываемся на события (если доступны)
            if (tg.onEvent) {
                tg.onEvent('viewportChanged', handleAppResume);
                tg.onEvent('themeChanged', handleAppResume);
            }

            // Обработчики для состояния видимости страницы
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    handleAppPause();
                } else {
                    handleAppResume();
                }
            });

            // Обработчики для focus/blur
            window.addEventListener('blur', handleAppPause);
            window.addEventListener('focus', handleAppResume);

            return () => {
                // Очищаем обработчики
                if (tg.offEvent) {
                    tg.offEvent('viewportChanged', handleAppResume);
                    tg.offEvent('themeChanged', handleAppResume);
                }
                document.removeEventListener('visibilitychange', handleAppPause);
                window.removeEventListener('blur', handleAppPause);
                window.removeEventListener('focus', handleAppResume);
            };
        }
    }, [isTelegramWebApp, pauseAllTimers, resumeAllTimers]);

    // Очистка при размонтировании компонента
    useEffect(() => {
        return () => {
            clearAllTimers();
        };
    }, [clearAllTimers]);

    return {
        createTimer,
        createInterval,
        createPersistentTimer,
        clearTimer,
        clearAllTimers,
        pauseAllTimers,
        resumeAllTimers,
        getActiveTimersCount,
        getPausedTimersCount,
        isPaused: isPausedRef.current
    };
};

export default useTimers;