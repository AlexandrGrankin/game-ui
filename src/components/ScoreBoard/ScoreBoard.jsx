// components/ScoreBoard/ScoreBoard.jsx
import React from 'react';
import './ScoreBoard.css';
import Icon from '../Icon/Icon';

const ScoreBoard = ({label, value, iconStart, iconEnd}) => {
    return (
        <div className="scoreboard">
            <div className="label">{label}</div>
            <div className="scoreboard-counter">
                {iconStart && (<Icon name={iconStart} className="scoreboard-icon scoreboard-icon-start"/>)}
                <span className="value">{value}</span>
                {iconEnd && (<Icon name={iconEnd} className="scoreboard-icon scoreboard-icon-end"/>)}
            </div>
        </div>
    );
};

export default ScoreBoard;