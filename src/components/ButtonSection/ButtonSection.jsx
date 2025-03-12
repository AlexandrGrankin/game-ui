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
                    outerSize={14}
                    backColorStartLiner={'#EA8E8E'}
                    backColorEndLiner={'#D64636'}
                    icons={swords}
                    size={9}
                ></InteractiveBorder>
                <InteractiveBorderClick
                    outerSize={22}
                    backColorStartLiner={'#4A90E2'}
                    backColorEndLiner={'#357ABD'}
                ></InteractiveBorderClick>
                <InteractiveBorder
                    outerSize={14}
                    backColorStartLiner={'#F5A623'}
                    backColorEndLiner={'#D18B17'}
                    icons={task}
                    size={11}
                ></InteractiveBorder>
            </div>
        </div>
    );
};

export default ButtonSection;
