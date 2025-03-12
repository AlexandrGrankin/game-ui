import React from 'react';
import "./CardSection.css"
import InteractiveBorderCard from "../InteractiveBorderCard/InteractiveBorderCard";
import paper from "../../assets/icons/paper.png";
import stone from "../../assets/icons/stone.png";
import cut from "../../assets/icons/cut.png";

const CardSection = () => {

    return (
        <div className="card__section">
            <InteractiveBorderCard
                outerSize={26}
                backColorStartLiner={'#9AC9FF'}
                backColorEndLiner={'#4387D6'}
                icons={stone}
            ></InteractiveBorderCard>
            <InteractiveBorderCard
                outerSize={26}
                backColorStartLiner={'#EA8E8E'}
                backColorEndLiner={'#D64636'}
                icons={cut}
            ></InteractiveBorderCard>
            <InteractiveBorderCard
                outerSize={26}
                backColorStartLiner={'#EAC17E'}
                backColorEndLiner={'#D18B17'}
                icons={paper}
            >
            </InteractiveBorderCard>
        </div>
    );
};

export default CardSection;
