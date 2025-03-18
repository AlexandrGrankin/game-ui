import React from 'react';
import "./InteractiveBorderCard.css"

const InteractiveBorderCard = ({icon, name}) => {
    const iconName = `${name}__icon`;
    const iconBackground = `${name}__background`;
    return (
        <div className="interactive__border__card">
            <div className='interactive__border__card__outer'>
                <div className={`interactive__border__card__inner ${iconBackground}`}>
                    {icon && <img className={iconName} src={icon} alt={name}/>}
                </div>
            </div>
        </div>
    );
};

export default InteractiveBorderCard;
