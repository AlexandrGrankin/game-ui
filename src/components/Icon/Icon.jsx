// components/Icon/Icon.jsx
import React from 'react';
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

// Реестр всех иконок
const iconRegistry = {
    clickcoin,
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
const Icon = ({ name, className = '', alt = '', ...rest }) => {
    if (!iconRegistry[name]) {
        console.warn(`Icon "${name}" not found in registry`);
        return null;
    }

    return (
        <img
            src={iconRegistry[name]}
            alt={alt || name}
            className={`app-icon ${className} icon-${name}`}
            {...rest}
        />
    );
};

export default Icon;