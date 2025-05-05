// components/GameControlsSection/GameControlsSection.jsx
import React from 'react';
import "./GameControlsSection.css";
import InteractiveBorderCircle from "../InteractiveBorderCircle/InteractiveBorderCircle";
import {GRADIENTS, SIZES, ICONS} from "../../constants/appConstants";
import InteractiveBorderClick from "../InteractiveBorderClick/InteractiveBorderClick";

const GameControlsSection = ({onMainClick, battles}) => {
    return (
        <div className="game-controls-container">
            <div className="game-controls-section">
                <InteractiveBorderCircle
                    size={SIZES.MEDIUM}
                    gradient={GRADIENTS.RED}
                    iconName={ICONS.SWORDS}
                    onClick={() => console.log("Battle clicked")}
                />
                <InteractiveBorderClick
                    size={SIZES.LARGE}
                    gradient={GRADIENTS.BLUE}
                    battles={battles}
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