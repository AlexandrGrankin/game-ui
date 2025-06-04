// utils/telegramUtils.js

/**
 * Утилиты для работы с Telegram WebApp
 */

// Определяем, запущено ли приложение в Telegram
export const isTelegramWebApp = () => {
    return !!(window.Telegram && window.Telegram.WebApp);
};

// Получаем доступную высоту viewport
export const getViewportHeight = () => {
    if (isTelegramWebApp()) {
        const tg = window.Telegram.WebApp;
        return tg.viewportHeight || window.innerHeight;
    }
    return window.innerHeight;
};

// Получаем доступную ширину viewport
export const getViewportWidth = () => {
    return window.innerWidth;
};

// Определяем коэффициент масштабирования на основе размеров экрана
export const calculateScaleFactor = () => {
    const height = getViewportHeight();
    const width = getViewportWidth();

    // МЕНЕЕ АГРЕССИВНАЯ ЛОГИКА: уменьшаем только действительно маленькие экраны

    // Экстремально маленькие экраны (оба измерения меньше 300)
    if (width <= 300 && height <= 300) {
        console.log(`Экстремально маленький экран: ${width}x${height}, scale: 0.5`);
        return 0.5;
    }

    // Очень маленькие экраны (оба измерения меньше 320)
    if (width <= 320 && height <= 320) {
        console.log(`Очень маленький экран: ${width}x${height}, scale: 0.6`);
        return 0.6;
    }

    // Маленькие экраны по высоте (но только если высота действительно маленькая)
    if (height <= 400) {
        console.log(`Маленький экран по высоте: ${width}x${height}, scale: 0.7`);
        return 0.7;
    }

    if (height <= 500) {
        console.log(`Средне-маленький экран: ${width}x${height}, scale: 0.8`);
        return 0.8;
    }

    if (height <= 600) {
        console.log(`Средний экран: ${width}x${height}, scale: 0.9`);
        return 0.9;
    }

    // ВСЕ ОСТАЛЬНЫЕ ЭКРАНЫ получают полный размер
    console.log(`Нормальный экран: ${width}x${height}, scale: 1.0`);
    return 1.0;
};

// Инициализация Telegram WebApp - только светлая тема
export const initTelegramWebApp = () => {
    if (!isTelegramWebApp()) return null;

    const tg = window.Telegram.WebApp;

    // Расширяем приложение на весь экран
    tg.expand();

    // Принудительно устанавливаем светлую тему
    try {
        tg.setHeaderColor('#4A90E2');
        tg.setBackgroundColor('#ffffff');
    } catch (error) {
        console.log('Не удалось установить цвета Telegram:', error);
    }

    // Отключаем вертикальные свайпы если доступно
    if (tg.disableVerticalSwipes) {
        tg.disableVerticalSwipes();
    }

    return tg;
};

// Устанавливаем CSS переменные для высоты и масштабирования
export const setViewportHeightCSS = () => {
    const height = getViewportHeight();
    const width = getViewportWidth();
    const scaleFactor = calculateScaleFactor();

    const safeAreaTop = isTelegramWebApp() ? 0 : 0;
    const safeAreaBottom = isTelegramWebApp() ? 0 : 0;

    // Устанавливаем основные переменные
    document.documentElement.style.setProperty('--app-height', `${height}px`);
    document.documentElement.style.setProperty('--tg-viewport-height', `${height}px`);
    document.documentElement.style.setProperty('--tg-safe-area-top', `${safeAreaTop}px`);
    document.documentElement.style.setProperty('--tg-safe-area-bottom', `${safeAreaBottom}px`);

    // Устанавливаем коэффициент масштабирования
    document.documentElement.style.setProperty('--scale-factor', scaleFactor);

    // Добавляем класс для Telegram WebApp
    if (isTelegramWebApp()) {
        document.body.classList.add('telegram-webapp');
    }

    // Добавляем классы для экстремально маленьких экранов
    // Удаляем все предыдущие классы размеров
    document.body.classList.remove(
        'screen-tiny',
        'screen-very-small',
        'screen-small',
        'screen-square',
        'screen-extreme-small'
    );

    // Добавляем классы ТОЛЬКО для действительно маленьких экранов
    if (width <= 300 && height <= 300) {
        document.body.classList.add('screen-extreme-small');
        document.body.classList.add('screen-square');
    } else if (width <= 320 && height <= 320) {
        document.body.classList.add('screen-very-small');
    } else if (height <= 400) {
        document.body.classList.add('screen-small');
    }

    console.log(`Viewport: ${width}x${height}, Scale Factor: ${scaleFactor}`);
};

// Обработчик изменения размера viewport
export const handleViewportResize = () => {
    if (isTelegramWebApp()) {
        const tg = window.Telegram.WebApp;

        // Обработчик изменения размера
        tg.onEvent('viewportChanged', () => {
            setTimeout(() => {
                setViewportHeightCSS();
            }, 100);
        });

        // Обработчик изменения темы
        tg.onEvent('themeChanged', () => {
            updateThemeColors();
        });
    }

    // Fallback для обычных браузеров
    window.addEventListener('resize', () => {
        setTimeout(() => {
            setViewportHeightCSS();
        }, 100);
    });

    // Обработчик orientation change для мобильных
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            setViewportHeightCSS();
        }, 300);
    });
};

// Обновляем цвета темы - только светлая тема
export const updateThemeColors = () => {
    if (!isTelegramWebApp()) return;

    const tg = window.Telegram.WebApp;

    // Принудительно устанавливаем светлую тему
    document.documentElement.style.setProperty('--tg-bg-color', '#ffffff');
    document.documentElement.style.setProperty('--tg-text-color', '#000000');
    document.documentElement.style.setProperty('--tg-hint-color', '#999999');
    document.documentElement.style.setProperty('--tg-button-color', '#4A90E2');
    document.documentElement.style.setProperty('--tg-button-text-color', '#ffffff');

    // Устанавливаем светлую тему в Telegram если возможно
    try {
        tg.setHeaderColor('#4A90E2');
        tg.setBackgroundColor('#ffffff');
    } catch (error) {
        console.log('Не удалось установить цвета темы Telegram:', error);
    }
};

// Показать кнопку "Назад" в Telegram
export const showBackButton = (callback) => {
    if (!isTelegramWebApp()) return;

    const tg = window.Telegram.WebApp;
    tg.BackButton.show();
    tg.BackButton.onClick(callback);
};

// Скрыть кнопку "Назад" в Telegram
export const hideBackButton = () => {
    if (!isTelegramWebApp()) return;

    const tg = window.Telegram.WebApp;
    tg.BackButton.hide();
};

// Показать главную кнопку в Telegram
export const showMainButton = (text, callback) => {
    if (!isTelegramWebApp()) return;

    const tg = window.Telegram.WebApp;
    tg.MainButton.setText(text);
    tg.MainButton.show();
    tg.MainButton.onClick(callback);
};

// Скрыть главную кнопку в Telegram
export const hideMainButton = () => {
    if (!isTelegramWebApp()) return;

    const tg = window.Telegram.WebApp;
    tg.MainButton.hide();
};

// Вибрация (если поддерживается)
export const hapticFeedback = (type = 'impact') => {
    if (!isTelegramWebApp()) return;

    const tg = window.Telegram.WebApp;

    if (tg.HapticFeedback) {
        switch (type) {
            case 'light':
                tg.HapticFeedback.impactOccurred('light');
                break;
            case 'medium':
                tg.HapticFeedback.impactOccurred('medium');
                break;
            case 'heavy':
                tg.HapticFeedback.impactOccurred('heavy');
                break;
            case 'success':
                tg.HapticFeedback.notificationOccurred('success');
                break;
            case 'warning':
                tg.HapticFeedback.notificationOccurred('warning');
                break;
            case 'error':
                tg.HapticFeedback.notificationOccurred('error');
                break;
            default:
                tg.HapticFeedback.impactOccurred('medium');
        }
    }
};

// Полная инициализация приложения для Telegram
export const initializeTelegramApp = () => {
    // Ждем загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setupTelegramApp();
        });
    } else {
        setupTelegramApp();
    }
};

const setupTelegramApp = () => {
    // Инициализируем Telegram WebApp
    initTelegramWebApp();

    // Устанавливаем высоту viewport и масштабирование
    setViewportHeightCSS();

    // Настраиваем обработчики изменения размеров
    handleViewportResize();

    // Обновляем цвета темы
    updateThemeColors();

    // Предотвращаем масштабирование на iOS Safari
    const metaViewport = document.querySelector('meta[name=viewport]');
    if (metaViewport) {
        metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
    }

    // Предотвращаем pull-to-refresh
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });

    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
};

// Экспортируем основную функцию инициализации
export default initializeTelegramApp;