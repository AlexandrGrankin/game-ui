// components/ScoreSection/ScoreSection.jsx
import React from 'react';
import './ScoreSection.css';
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import {ICONS} from "../../constants/appConstants";

const ScoreSection = ({clickCoins, statistics}) => {
    return (
        <div className="score-display">
            <ScoreBoard
                label="Clickcoin"
                value={clickCoins.toLocaleString('ru-RU')}
                iconStart={ICONS.CLICKCOIN}
            />
            <ScoreBoard
                label="Статистика боев"
                value={`${statistics.won}/${statistics.lose}`}
                iconStart={ICONS.SWORDS}
                iconEnd={ICONS.SHIELD}
            />
        </div>
    );
};

export default ScoreSection;