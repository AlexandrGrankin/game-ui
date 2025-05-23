// components/ScoreBoard/ScoreBoard.jsx
import React from 'react';
import './ScoreBoard.css';
import Icon from '../Icon/Icon';
import PropTypes from 'prop-types';

const ScoreBoard = React.memo(({label, value, iconStart, iconEnd}) => {
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
});

ScoreBoard.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    iconStart: PropTypes.string,
    iconEnd: PropTypes.string
};

export default ScoreBoard;