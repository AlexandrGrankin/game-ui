import React from 'react';

const ScoreBoard = ({label, value, iconStart, iconEnd}) => {

    return (
        <div className="scoreboard">
            <span className="label">{label}</span>
            <div className="scoreboard-counter">
                <div className="icon-container">
                    {iconStart && <img src={iconStart} alt="Icon" width="36" height="36"/>}
                </div>
                <span className="value">{value}</span>
                <div className="icon-container">
                    {iconEnd && <img src={iconEnd} alt="Icon" width="36" height="36"/>}
                </div>
            </div>
        </div>
    );
};

export default ScoreBoard;
