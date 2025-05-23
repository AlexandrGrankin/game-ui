import React from 'react';
import './ScoreSection.css';
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import {ICONS} from "../../constants/appConstants";
import { useAppState } from '../../context/AppContext';

const ScoreSection = () => {
    // Получаем данные из контекста
    const { state } = useAppState();
    const { clickCoins, statistics } = state;

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