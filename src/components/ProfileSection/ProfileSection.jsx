import React, { useCallback } from 'react';
import './ProfileSection.css';
import InteractiveBorderCircle from "../InteractiveBorder/InteractiveBorderCircle/InteractiveBorderCircle";
import { GRADIENTS, SIZES, ICONS } from "../../constants/appConstants";
import { useAppState } from '../../context/AppContext';

const ProfileSection = React.memo(() => {
    // Получаем данные из контекста
    const { state, computed } = useAppState();
    const { progress, user, clickCoins } = state;

    // Обработчики событий для интерактивных элементов
    const handleWalletClick = useCallback(() => {
        console.log("Wallet clicked - Clickcoins:", clickCoins);
        // Здесь можно открыть модальное окно кошелька или перейти на страницу покупок
    }, [clickCoins]);

    const handleAvatarClick = useCallback(() => {
        console.log("Avatar clicked - User:", user.nickname);
        // Здесь можно открыть профиль пользователя или настройки
    }, [user.nickname]);

    const handleSocialClick = useCallback(() => {
        console.log("Social clicked");
        // Здесь можно открыть друзей, рейтинги или социальные функции
    }, []);

    // Мемоизируем вычисления прогресса
    const progressData = React.useMemo(() => ({
        level: progress?.level || 'Щегол',
        current: progress?.current || 23,
        max: progress?.max || 100,
        percentage: progress?.percentage || computed?.progressPercentage || 23
    }), [progress, computed]);

    return (
        <div className="profile-container">
            <div className="profile-menu">
                <InteractiveBorderCircle
                    size={SIZES.SMALL}
                    gradient={GRADIENTS.ORANGE}
                    iconName={ICONS.WALLET}
                    onClick={handleWalletClick}
                    ariaLabel={`Кошелек. Баланс: ${clickCoins.toLocaleString('ru-RU')} монет`}
                />
                <InteractiveBorderCircle
                    size={SIZES.AVATAR}
                    iconName={ICONS.AVATAR}
                    onClick={handleAvatarClick}
                    ariaLabel={`Профиль игрока: ${user.nickname || 'Игрок'}`}
                />
                <InteractiveBorderCircle
                    size={SIZES.SMALL}
                    gradient={GRADIENTS.RED}
                    iconName={ICONS.SOCIAL}
                    onClick={handleSocialClick}
                    ariaLabel="Социальные функции"
                />
            </div>
            <div className="progress-container">
                <span className="progress-label">{progressData.level}:</span>
                <div className="progress-bar">
                    <span className="progress-value">
                        {progressData.current}/{progressData.max}
                    </span>
                    <div
                        className="progress-fill"
                        style={{ width: `${progressData.percentage}%` }}
                        aria-label={`Прогресс: ${progressData.percentage}%`}
                    />
                </div>
            </div>
        </div>
    );
});

// Добавляем displayName для лучшей отладки
ProfileSection.displayName = 'ProfileSection';

export default ProfileSection;