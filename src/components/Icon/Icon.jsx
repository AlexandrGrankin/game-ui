// components/Icon/Icon.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './Icon.css';
import clickcoin from "../../assets/icons/clickcoin.png";
import swords from "../../assets/icons/swords.png";
import shield from "../../assets/icons/shield.png";
import wallet from "../../assets/icons/wallet.png";
import social from "../../assets/icons/social.png";
import avatar from "../../assets/icons/avatar.png";
import paper from "../../assets/icons/paper.png";
import stone from "../../assets/icons/stone.png";
import cut from "../../assets/icons/cut.png";
import task from "../../assets/icons/task.png";
import flag from "../../assets/icons/flag.png";

// Реестр всех иконок
const iconRegistry = {
    clickcoin,
    flag,
    swords,
    shield,
    wallet,
    social,
    avatar,
    paper,
    stone,
    cut,
    task
};

// Компонент иконки
const Icon = React.memo(({ name, className = '', alt = '', ...rest }) => {
    if (!iconRegistry[name]) {
        console.warn(`Icon "${name}" not found in registry`);

        // В режиме разработки показываем placeholder
        if (process.env.NODE_ENV === 'development') {
            return (
                <div
                    className={`app-icon icon-placeholder ${className}`}
                    title={`Missing icon: ${name}`}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f0f0f0',
                        border: '2px dashed #ccc',
                        borderRadius: '4px',
                        color: '#999',
                        fontSize: '0.8rem',
                        minHeight: '24px',
                        minWidth: '24px'
                    }}
                    {...rest}
                >
                    ?
                </div>
            );
        }

        return null;
    }

    return (
        <img
            src={iconRegistry[name]}
            alt={alt || `Иконка ${name}`}
            className={`app-icon ${className} icon-${name}`}
            loading="lazy" // Ленивая загрузка для оптимизации
            {...rest}
        />
    );
});

// Добавляем displayName для лучшей отладки
Icon.displayName = 'Icon';

// PropTypes для валидации пропсов
Icon.propTypes = {
    /** Имя иконки из реестра */
    name: PropTypes.string.isRequired,
    /** Дополнительные CSS классы */
    className: PropTypes.string,
    /** Альтернативный текст для accessibility */
    alt: PropTypes.string
};

export default Icon;