import React from 'react';
import "./GameControlsSection.css";
import InteractiveBorderCircle from "../InteractiveBorder/InteractiveBorderCircle/InteractiveBorderCircle";
import {GRADIENTS, SIZES, ICONS} from "../../constants/appConstants";
import InteractiveBorderClick from "../InteractiveBorder/InteractiveBorderClick/InteractiveBorderClick";
import { useAppState } from '../../context/AppContext';

const GameControlsSection = () => {
    // Получаем данные и функции из контекста
    const { state, incrementCoins } = useAppState();
    const { battles } = state;

    const handleBattleClick = () => {
        console.log("Battle clicked");
    };

    const handleTaskClick = () => {
        console.log("Task clicked");
    };

    return (
        <div className="game-controls-container">
            <div className="game-controls-section">
                <InteractiveBorderCircle
                    size={SIZES.MEDIUM}
                    gradient={GRADIENTS.RED}
                    iconName={ICONS.SWORDS}
                    onClick={handleBattleClick}
                />
                <InteractiveBorderClick
                    size={SIZES.LARGE}
                    gradient={GRADIENTS.BLUE}
                    battles={battles}
                    onClick={incrementCoins}
                />
                <InteractiveBorderCircle
                    size={SIZES.MEDIUM}
                    gradient={GRADIENTS.ORANGE}
                    iconName={ICONS.TASK}
                    onClick={handleTaskClick}
                />
            </div>
        </div>
    );
};

export default GameControlsSection;