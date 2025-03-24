// components/GameControlsSection/GameControlsSection.jsx
import React from 'react';
import "./GameControlsSection.css";
import InteractiveBorderCircle from "../InteractiveBorderCircle/InteractiveBorderCircle";
import {GRADIENTS, SIZES, ICONS} from "../../constants/appConstants";

const GameControlsSection = ({onMainClick}) => {
    return (
        <div className="game-controls-container">
            <div className="game-controls-section">
                <InteractiveBorderCircle
                    size={SIZES.MEDIUM}
                    gradient={GRADIENTS.RED}
                    iconName={ICONS.SWORDS}
                    onClick={() => console.log("Battle clicked")}
                />
                <InteractiveBorderCircle
                    size={SIZES.LARGE}
                    gradient={GRADIENTS.BLUE}
                    onClick={onMainClick}
                />
                <InteractiveBorderCircle
                    size={SIZES.MEDIUM}
                    gradient={GRADIENTS.ORANGE}
                    iconName={ICONS.TASK}
                    onClick={() => console.log("Task clicked")}
                />
            </div>
        </div>
    );
};

export default GameControlsSection;