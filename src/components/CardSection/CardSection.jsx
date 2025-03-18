import React from 'react';
import "./CardSection.css"
import InteractiveBorderCard from "../InteractiveBorderCard/InteractiveBorderCard";
import paper from "../../assets/icons/paper.png";
import stone from "../../assets/icons/stone.png";
import cut from "../../assets/icons/cut.png";

const CardSection = () => {
    return (
        <div className="card__section">
            <InteractiveBorderCard icon={stone} name="stone"></InteractiveBorderCard>
            <InteractiveBorderCard icon={cut} name="cut"></InteractiveBorderCard>
            <InteractiveBorderCard icon={paper} name="paper"></InteractiveBorderCard>
        </div>
    );
};

export default CardSection;
