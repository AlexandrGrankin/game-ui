import React from 'react';

const ScoreBoard = ({label, value, iconStart, iconEnd}) => {

    return (
        <div className="scoreboard">
            <span className="label">{label}</span>
            <div className="scoreboard-counter">
                <div className="icon-container">
                    {iconStart && <img className="icon" src={iconStart} alt="Icon"/>}
                </div>
                <span className="value">{value}</span>
                <div className="icon-container">
                    {iconEnd && <img className="icon" src={iconEnd} alt="Icon"/>}
                </div>
            </div>
        </div>
    );
};

export default ScoreBoard;
