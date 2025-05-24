import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import "./InteractiveBorderCircle.css";
import Icon from "../../Icon/Icon";
import { BOX_SHADOW, GRADIENTS, SIZES } from "../../../constants/appConstants";

const InteractiveBorderCircle = React.memo(({
                                                size = SIZES.MEDIUM,
                                                gradient = GRADIENTS.NONE,
                                                boxShadow = BOX_SHADOW.WHITE,
                                                iconName,
                                                onClick,
                                                disabled = false,
                                                'data-testid': testId,
                                                ariaLabel
                                            }) => {
    const handleClick = useCallback((event) => {
        if (!disabled && onClick) {
            onClick(event);
        }
    }, [disabled, onClick]);

    const handleKeyDown = useCallback((event) => {
        if (!disabled && onClick && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            handleClick(event);
        }
    }, [disabled, onClick, handleClick]);

    // Мемоизируем классы
    const containerClasses = React.useMemo(() =>
        `interactive-border-circle-${size}`, [size]
    );

    const outerClasses = React.useMemo(() =>
        `interactive-border-circle-outer box-shadow-${boxShadow}`, [boxShadow]
    );

    const innerClasses = React.useMemo(() =>
        `interactive-border-circle-inner gradient-${gradient}`, [gradient]
    );

    // Определяем является ли компонент интерактивным
    const isInteractive = onClick && !disabled;

    return (
        <div
            className={containerClasses}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role={isInteractive ? 'button' : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            data-testid={testId}
            aria-label={ariaLabel || (iconName ? `Кнопка ${iconName}` : 'Кнопка')}
            aria-disabled={disabled}
            style={{
                cursor: isInteractive ? 'pointer' : 'default',
                opacity: disabled ? 0.6 : 1,
                pointerEvents: disabled ? 'none' : 'auto'
            }}
        >
            <div className={outerClasses}>
                <div className={innerClasses}>
                    {iconName && (
                        <Icon
                            name={iconName}
                            className="circle-icon"
                            alt={`Иконка ${iconName}`}
                        />
                    )}
                </div>
            </div>
        </div>
    );
});

// Добавляем displayName для лучшей отладки
InteractiveBorderCircle.displayName = 'InteractiveBorderCircle';

// PropTypes для валидации пропсов
InteractiveBorderCircle.propTypes = {
    /** Размер кнопки */
    size: PropTypes.oneOf(Object.values(SIZES)),
    /** Градиент кнопки */
    gradient: PropTypes.oneOf(Object.values(GRADIENTS)),
    /** Тень кнопки */
    boxShadow: PropTypes.oneOf(Object.values(BOX_SHADOW)),
    /** Имя иконки */
    iconName: PropTypes.string,
    /** Обработчик клика */
    onClick: PropTypes.func,
    /** Отключена ли кнопка */
    disabled: PropTypes.bool,
    /** Test ID для тестирования */
    'data-testid': PropTypes.string,
    /** Aria-label для доступности */
    ariaLabel: PropTypes.string
};

export default InteractiveBorderCircle;