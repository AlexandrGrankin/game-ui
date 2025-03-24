// components/ScoreDisplay/ScoreDisplay.jsx
import React from 'react';
import './ScoreDisplay.css';
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import {ICONS} from "../../constants/appConstants";

const ScoreDisplay = ({clickcoins, battles}) => {
    return (
        <div className="score-display">
            <ScoreBoard
                label="Clickcoin"
                value={clickcoins.toLocaleString('ru-RU')}
                iconStart={ICONS.CLICKCOIN}
            />
            <ScoreBoard
                label="Статистика боев"
                value={`${battles.won}/${battles.total}`}
                iconStart={ICONS.SWORDS}
                iconEnd={ICONS.SHIELD}
            />
        </div>
    );
};

export default ScoreDisplay;