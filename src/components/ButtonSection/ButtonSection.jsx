import React from 'react';
import "./ButtonSection.css"
import InteractiveBorderClick from "../InteractiveBorderClick/InteractiveBorderClick";
import swords from "../../assets/icons/swords.png";
import task from "../../assets/icons/task.png";
import InteractiveBorder from "../InteractiveBorder/InteractiveBorder";

const ButtonSection = () => {

    return (
        <div className="button__container">
            <div className="button__section">
                <InteractiveBorder
                    outerSize={12}
                    backColorStartLiner={'#4A90E2'}
                    backColorEndLiner={'#357ABD'}
                    icons={swords}
                ></InteractiveBorder>
                <InteractiveBorderClick
                    outerSize={20}
                    backColorStartLiner={'#4A90E2'}
                    backColorEndLiner={'#357ABD'}
                ></InteractiveBorderClick>
                <InteractiveBorder
                    outerSize={12}
                    backColorStartLiner={'#4A90E2'}
                    backColorEndLiner={'#357ABD'}
                    icons={task}
                ></InteractiveBorder>
            </div>
        </div>
    );
};

export default ButtonSection;
