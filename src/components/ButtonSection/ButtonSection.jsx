import React from 'react';
import "./ButtonSection.css"
import InteractiveBorderClick from "../InteractiveBorderClick/InteractiveBorderClick";

const ButtonSection = () => {

    return (
        <div className="button__container">
            <div className="button__section">
                <InteractiveBorderClick
                    outerSize={20}
                    backColorStartLiner={'#4A90E2'}
                    backColorEndLiner={'#357ABD'}
                ></InteractiveBorderClick>
                <InteractiveBorderClick
                    outerSize={30}
                    backColorStartLiner={'#4A90E2'}
                    backColorEndLiner={'#357ABD'}
                ></InteractiveBorderClick>
                <InteractiveBorderClick
                    outerSize={20}
                    backColorStartLiner={'#4A90E2'}
                    backColorEndLiner={'#357ABD'}
                ></InteractiveBorderClick>
            </div>
        </div>
    );
};

export default ButtonSection;
