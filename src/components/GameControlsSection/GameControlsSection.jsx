import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import "./GameControlsSection.css";
import InteractiveBorderCircle from "../InteractiveBorder/InteractiveBorderCircle/InteractiveBorderCircle";
import { GRADIENTS, SIZES, ICONS, BOX_SHADOW } from "../../constants/appConstants";
import InteractiveBorderClick from "../InteractiveBorder/InteractiveBorderClick/InteractiveBorderClick";
import { useAppState } from '../../context/AppContext';

const GameControlsSection = React.memo(() => {
    const history = useHistory();

    // Получаем данные и функции из контекста
    const { state, computed } = useAppState();
    const { battles } = state;

    const handleBattleClick = useCallback(() => {
        // Проверяем, есть ли доступные бои
        if (battles.available > 0) {
            history.push('/battle');
        } else {
            // Можно показать уведомление о том, что бои закончились
            console.log('Нет доступных боев');
            // Здесь можно добавить toast уведомление
        }
    }, [history, battles.available]);

    const handleMainClick = useCallback(() => {
        // Переходим на страницу боя при клике на центральную кнопку
        if (battles.available > 0) {
            history.push('/battle');
        } else {
            console.log('Нет доступных боев');
        }
    }, [history, battles.available]);

    const handleTaskClick = useCallback(() => {
        console.log("Task clicked");
        // Здесь будет логика для заданий
        // history.push('/tasks');
    }, []);

    // Определяем, доступны ли бои
    const battlesAvailable = battles.available > 0;

    return (
        <div className="game-controls-container">
            <div className="game-controls-section">
                <InteractiveBorderCircle
                    size={SIZES.MEDIUM}
                    gradient={GRADIENTS.RED}
                    iconName={ICONS.SWORDS}
                    boxShadow={BOX_SHADOW.BLACK}
                    onClick={handleBattleClick}
                    disabled={!battlesAvailable}
                    ariaLabel={`Битва (${battles.available}/${battles.max})`}
                />
                <InteractiveBorderClick
                    size={SIZES.LARGE}
                    gradient={GRADIENTS.BLUE}
                    battles={battles}
                    boxShadow={BOX_SHADOW.BLACK}
                    onClick={handleMainClick}
                    disabled={!battlesAvailable}
                />
                <InteractiveBorderCircle
                    size={SIZES.MEDIUM}
                    gradient={GRADIENTS.ORANGE}
                    iconName={ICONS.TASK}
                    boxShadow={BOX_SHADOW.BLACK}
                    onClick={handleTaskClick}
                    ariaLabel="Задания"
                />
            </div>
        </div>
    );
});

GameControlsSection.displayName = 'GameControlsSection';

export default GameControlsSection;