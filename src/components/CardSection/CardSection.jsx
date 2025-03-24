// components/CardSection/CardSection.jsx
import React from 'react';
import "./CardSection.css";
import InteractiveBorderCard from "../InteractiveBorderCard/InteractiveBorderCard";
import {GRADIENTS, ICONS} from "../../constants/appConstants";

const CardSection = () => {
    return (
        <div className="card-section">
            <InteractiveBorderCard
                gradient={GRADIENTS.BLUE}
                iconName={ICONS.STONE}
                isClickable={false}
            />
            <InteractiveBorderCard
                gradient={GRADIENTS.RED}
                iconName={ICONS.CUT}
                isClickable={false}
            />
            <InteractiveBorderCard
                gradient={GRADIENTS.ORANGE}
                iconName={ICONS.PAPER}
                isClickable={false}
            />
        </div>
    );
};

export default CardSection;