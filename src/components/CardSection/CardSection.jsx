import React from 'react';
import "./CardSection.css"
import InteractiveBorderCard from "../InteractiveBorderCard/InteractiveBorderCard";

const CardSection = () => {

    return (
        <div className="card__section">
            <InteractiveBorderCard
                outerSize={28}
                backColorStartLiner={'#9AC9FF'}
                backColorEndLiner={'#4387D6'}
            ></InteractiveBorderCard>
            <InteractiveBorderCard
                outerSize={28}
                backColorStartLiner={'#EA8E8E'}
                backColorEndLiner={'#D64636'}
            ></InteractiveBorderCard>
            <InteractiveBorderCard
                outerSize={28}
                backColorStartLiner={'#EAC17E'}
                backColorEndLiner={'#D18B17'}></InteractiveBorderCard>
        </div>
    );
};

export default CardSection;
