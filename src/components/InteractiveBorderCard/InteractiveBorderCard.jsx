// components/InteractiveBorderCard/InteractiveBorderCard.jsx
import React from 'react';
import "./InteractiveBorderCard.css";
import Icon from "../Icon/Icon";
import {GRADIENTS} from "../../constants/appConstants";

const InteractiveBorderCard = ({
                                   gradient = GRADIENTS.NONE,
                                   iconName,
                                   isClickable = false,
                                   onClick
                               }) => {
    const handleClick = isClickable && onClick ? onClick : undefined;

    return (
        <div className={`interactive-border-card card-type-${iconName || 'default'}`} onClick={handleClick}>
            <div className="interactive-border-card-outer">
                <div className={`interactive-border-card-inner gradient-${gradient}`}>
                    {iconName && (<Icon name={iconName} className="card-icon"/>)}
                </div>
            </div>
        </div>
    );
};

export default InteractiveBorderCard;