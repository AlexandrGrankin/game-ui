import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import "./InteractiveBorderClick.css";
import {BOX_SHADOW, GRADIENTS, SIZES} from "../../../constants/appConstants";
import {useAppState} from '../../../context/AppContext';

const InteractiveBorderClick = React.memo(({
                                               size = SIZES.MEDIUM,
                                               gradient = GRADIENTS.NONE,
                                               boxShadow = BOX_SHADOW.WHITE,
                                               onClick,
                                               disabled = false,
                                               'data-testid': testId
                                           }) => {
    // Получаем battles из контекста
    const {state} = useAppState();
    const {battles} = state;

    const handleClick = useCallback((event) => {
        if (!disabled && onClick && battles.available > 0) {
            onClick(event);
        }
    }, [disabled, onClick, battles.available]);

    const handleKeyDown = useCallback((event) => {
        if (!disabled && onClick && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            handleClick(event);
        }
    }, [disabled, onClick, handleClick]);

    // Мемоизируем классы
    const containerClasses = React.useMemo(() =>
        `interactive__border__click__${size}`, [size]
    );

    const outerClasses = React.useMemo(() =>
        `interactive__border__click__outer box-shadow-${boxShadow}`, [boxShadow]
    );

    const innerClasses = React.useMemo(() =>
            `interactive__border__click__inner gradient-${gradient} interactive__border__click__value__text`,
        [gradient]
    );

    // Определяем доступность
    const isInteractive = onClick && !disabled && battles.available > 0;
    const isDisabled = disabled || battles.available === 0;

    return (
        <div
            className={containerClasses}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role={onClick ? 'button' : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            data-testid={testId}
            aria-label={`Начать битву. Доступно битв: ${battles.available} из ${battles.max}`}
            aria-disabled={isDisabled}
            style={{
                cursor: isInteractive ? 'pointer' : 'default',
                opacity: isDisabled ? 0.6 : 1,
                pointerEvents: isDisabled ? 'none' : 'auto'
            }}
        >
            <div className={outerClasses}>
                <div className={innerClasses}>
                    <div className='interactive__border__click__value'>
                        {battles.available > 0 ? 'Click' : 'Wait'}
                    </div>
                    <div>
                        {battles.available}/{battles.max}
                    </div>
                    <div className='interactive__border__time__value'>
                        {battles.nextBattleTime}
                    </div>
                </div>
            </div>
        </div>
    );
});

// Добавляем displayName для лучшей отладки
InteractiveBorderClick.displayName = 'InteractiveBorderClick';

// PropTypes для валидации пропсов
InteractiveBorderClick.propTypes = {
    /** Размер компонента */
    size: PropTypes.oneOf(Object.values(SIZES)),
    /** Градиент */
    gradient: PropTypes.oneOf(Object.values(GRADIENTS)),
    /** Тень */
    boxShadow: PropTypes.oneOf(Object.values(BOX_SHADOW)),
    /** Обработчик клика */
    onClick: PropTypes.func,
    /** Отключен ли компонент */
    disabled: PropTypes.bool,
    /** Test ID для тестирования */
    'data-testid': PropTypes.string
};

export default InteractiveBorderClick;