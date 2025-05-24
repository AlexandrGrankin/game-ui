import React from 'react';
import "./InteractiveBorderCard.css";
import Icon from "../../Icon/Icon";
import {GRADIENTS} from "../../../constants/appConstants";

const InteractiveBorderCard = ({
                                   gradient = GRADIENTS.NONE,
                                   iconName,
                                   isClickable = false,
                                   onClick
                               }) => {

    const handleClick = () => {
        console.log('Card clicked!', { isClickable, onClick, gradient, iconName }); // Отладка
        if (isClickable && onClick) {
            onClick();
        }
    };
    const isCardBack = gradient === GRADIENTS.NONE && !iconName;

    return (
        <div className={`interactive-border-card card-type-${iconName || 'default'}`} onClick={handleClick}>
            <div className="interactive-border-card-outer">
                <div className={`interactive-border-card-inner 
                ${isCardBack ? 'card-back-inner' : `gradient-${gradient}`}`}>
                    {!isCardBack && iconName && (
                        <Icon name={iconName} className="card-icon"/>
                    )}
                    {isCardBack && (
                        <div className="card-back-pattern"></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InteractiveBorderCard;