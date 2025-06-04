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

// Инициализация Telegram WebApp
export const initTelegramWebApp = () => {
    if (!isTelegramWebApp()) return null;

    const tg = window.Telegram.WebApp;

    // Расширяем приложение на весь экран
    tg.expand();

    // Настраиваем цвета темы
    tg.setHeaderColor('#0A4589');
    tg.setBackgroundColor('#062A55');

    // Отключаем вертикальные свайпы если доступно
    if (tg.disableVerticalSwipes) {
        tg.disableVerticalSwipes();
    }

    return tg;
};

// Устанавливаем CSS переменные для высоты
export const setViewportHeightCSS = () => {
    const height = getViewportHeight();
    const safeAreaTop = isTelegramWebApp() ? 0 : 0; // Telegram обычно не имеет status bar
    const safeAreaBottom = isTelegramWebApp() ? 0 : 0;

    document.documentElement.style.setProperty('--app-height', `${height}px`);
    document.documentElement.style.setProperty('--tg-viewport-height', `${height}px`);
    document.documentElement.style.setProperty('--tg-safe-area-top', `${safeAreaTop}px`);
    document.documentElement.style.setProperty('--tg-safe-area-bottom', `${safeAreaBottom}px`);

    // Добавляем класс для Telegram WebApp
    if (isTelegramWebApp()) {
        document.body.classList.add('telegram-webapp');
    }

    // Определяем коэффициент масштабирования на основе высоты
    let scaleFactor = 1;
    if (height <= 400) scaleFactor = 0.55;
    else if (height <= 500) scaleFactor = 0.65;
    else if (height <= 600) scaleFactor = 0.75;
    else if (height <= 700) scaleFactor = 0.85;

    document.documentElement.style.setProperty('--scale-factor', scaleFactor);
};

// Обработчик изменения размера viewport
export const handleViewportResize = () => {
    if (isTelegramWebApp()) {
        const tg = window.Telegram.WebApp;

        // Обработчик изменения размера
        tg.onEvent('viewportChanged', () => {
            setViewportHeightCSS();
        });

        // Обработчик изменения темы
        tg.onEvent('themeChanged', () => {
            updateThemeColors();
        });
    }

    // Fallback для обычных браузеров
    window.addEventListener('resize', () => {
        setViewportHeightCSS();
    });

    // Обработчик orientation change для мобильных
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            setViewportHeightCSS();
        }, 100);
    });
};

// Обновляем цвета темы
export const updateThemeColors = () => {
    if (!isTelegramWebApp()) return;

    const tg = window.Telegram.WebApp;
    const themeParams = tg.themeParams;

    if (themeParams.bg_color) {
        document.documentElement.style.setProperty('--tg-bg-color', themeParams.bg_color);
    }

    if (themeParams.text_color) {
        document.documentElement.style.setProperty('--tg-text-color', themeParams.text_color);
    }

    if (themeParams.hint_color) {
        document.documentElement.style.setProperty('--tg-hint-color', themeParams.hint_color);
    }

    if (themeParams.button_color) {
        document.documentElement.style.setProperty('--tg-button-color', themeParams.button_color);
    }

    if (themeParams.button_text_color) {
        document.documentElement.style.setProperty('--tg-button-text-color', themeParams.button_text_color);
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

    // Устанавливаем высоту viewport
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