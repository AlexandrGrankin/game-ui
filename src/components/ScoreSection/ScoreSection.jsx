import React from 'react';
import './ScoreSection.css';
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import { ICONS } from "../../constants/appConstants";
import { useAppState } from '../../context/AppContext';

const ScoreSection = React.memo(() => {
    // Получаем данные из контекста
    const { state, computed } = useAppState();
    const { clickCoins, statistics } = state;

    // Форматирование числа с разделителями
    const formatNumber = (num) => {
        return num.toLocaleString('ru-RU');
    };

    // Форматирование статистики боев
    const formatBattleStats = () => {
        const { won, lose, winRate } = statistics;
        return `${won}/${lose} (${winRate}%)`;
    };

    return (
        <div className="score-display">
            <ScoreBoard
                label="Clickcoin"
                value={formatNumber(clickCoins)}
                iconStart={ICONS.CLICKCOIN}
            />
            <ScoreBoard
                label="Статистика боев"
                value={formatBattleStats()}
                iconStart={ICONS.SWORDS}
                iconEnd={ICONS.SHIELD}
            />
        </div>
    );
});

ScoreSection.displayName = 'ScoreSection';

export default ScoreSection;