import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import "./InteractiveBorderCard.css";
import Icon from "../../Icon/Icon";
import { GRADIENTS } from "../../../constants/appConstants";

const InteractiveBorderCard = React.memo(({
                                              gradient = GRADIENTS.NONE,
                                              iconName,
                                              isClickable = false,
                                              onClick,
                                              className = '',
                                              animationStyles = {},
                                              'data-testid': testId
                                          }) => {
    const handleClick = useCallback(() => {
        if (isClickable && onClick) {
            onClick();
        }
    }, [isClickable, onClick]);

    const isCardBack = gradient === GRADIENTS.NONE && !iconName;

    // Мемоизируем стили для избежания пересоздания объекта
    const cursorStyle = React.useMemo(() => ({
        cursor: isClickable ? 'pointer' : 'default'
    }), [isClickable]);

    // Мемоизируем классы
    const cardClasses = React.useMemo(() => {
        const baseClass = 'interactive-border-card';
        const typeClass = `card-type-${iconName || 'default'}`;
        return `${baseClass} ${typeClass} ${className}`.trim();
    }, [iconName, className]);

    const innerClasses = React.useMemo(() => {
        const baseClass = 'interactive-border-card-inner';
        const gradientClass = isCardBack ? 'card-back-inner' : `gradient-${gradient}`;
        return `${baseClass} ${gradientClass}`;
    }, [isCardBack, gradient]);

    return (
        <div
            className={cardClasses}
            onClick={handleClick}
            style={cursorStyle}
            data-testid={testId}
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
            onKeyDown={isClickable ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClick();
                }
            } : undefined}
            aria-label={isClickable ? `Выбрать карту ${iconName || 'неизвестно'}` : undefined}
        >
            <div
                className="interactive-border-card-outer"
                style={animationStyles}
            >
                <div className={innerClasses}>
                    {!isCardBack && iconName && (
                        <Icon
                            name={iconName}
                            className="card-icon"
                            alt={`Карта ${iconName}`}
                        />
                    )}
                    {isCardBack && (
                        <div
                            className="card-back-pattern"
                            aria-label="Закрытая карта"
                        />
                    )}
                </div>
            </div>
        </div>
    );
});

// Добавляем displayName для лучшей отладки
InteractiveBorderCard.displayName = 'InteractiveBorderCard';

// PropTypes для валидации пропсов
InteractiveBorderCard.propTypes = {
    /** Градиент карты */
    gradient: PropTypes.oneOf(Object.values(GRADIENTS)),
    /** Имя иконки */
    iconName: PropTypes.string,
    /** Можно ли кликать по карте */
    isClickable: PropTypes.bool,
    /** Обработчик клика */
    onClick: PropTypes.func,
    /** Дополнительные CSS классы */
    className: PropTypes.string,
    /** Стили для анимации */
    animationStyles: PropTypes.object,
    /** Test ID для тестирования */
    'data-testid': PropTypes.string
};

export default InteractiveBorderCard;