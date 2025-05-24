// components/CardSection/CardSection.jsx
import React from 'react';
import "./CardSection.css";
import InteractiveBorderCard from "../InteractiveBorder/InteractiveBorderCard/InteractiveBorderCard";
import { GRADIENTS, ICONS } from "../../constants/appConstants";

const CardSection = React.memo(() => {
    // Мемоизируем массив карт, чтобы избежать пересозданий
    const cards = React.useMemo(() => [
        {
            id: 'stone',
            gradient: GRADIENTS.BLUE,
            iconName: ICONS.STONE
        },
        {
            id: 'cut',
            gradient: GRADIENTS.RED,
            iconName: ICONS.CUT
        },
        {
            id: 'paper',
            gradient: GRADIENTS.ORANGE,
            iconName: ICONS.PAPER
        }
    ], []);

    return (
        <div className="card-section">
            {cards.map(card => (
                <InteractiveBorderCard
                    key={card.id}
                    gradient={card.gradient}
                    iconName={card.iconName}
                    isClickable={false}
                    data-testid={`display-card-${card.id}`}
                />
            ))}
        </div>
    );
});

// Добавляем displayName для лучшей отладки
CardSection.displayName = 'CardSection';

export default CardSection;