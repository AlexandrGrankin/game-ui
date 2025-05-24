import React from 'react';
import { useHistory } from 'react-router-dom';
import "./GameControlsSection.css";
import InteractiveBorderCircle from "../InteractiveBorder/InteractiveBorderCircle/InteractiveBorderCircle";
import {GRADIENTS, SIZES, ICONS, BOX_SHADOW} from "../../constants/appConstants";
import InteractiveBorderClick from "../InteractiveBorder/InteractiveBorderClick/InteractiveBorderClick";
import { useAppState } from '../../context/AppContext';

const GameControlsSection = () => {
    const history = useHistory();
    // Получаем данные и функции из контекста
    const { state, incrementCoins } = useAppState();
    const { battles } = state;

    const handleBattleClick = () => {
        // Переходим на страницу боя
        history.push('/battle');
    };

    const handleMainClick = () => {
        // Переходим на страницу боя при клике на центральную кнопку
        history.push('/battle');
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
                    boxShadow={BOX_SHADOW.BLACK}
                    onClick={handleBattleClick}
                />
                <InteractiveBorderClick
                    size={SIZES.LARGE}
                    gradient={GRADIENTS.BLUE}
                    battles={battles}
                    boxShadow={BOX_SHADOW.BLACK}
                    onClick={handleMainClick}
                />
                <InteractiveBorderCircle
                    size={SIZES.MEDIUM}
                    gradient={GRADIENTS.ORANGE}
                    iconName={ICONS.TASK}
                    boxShadow={BOX_SHADOW.BLACK}
                    onClick={handleTaskClick}
                />
            </div>
        </div>
    );
};

export default GameControlsSection;