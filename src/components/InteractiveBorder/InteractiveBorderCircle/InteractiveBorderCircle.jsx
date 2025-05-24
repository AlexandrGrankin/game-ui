import React from 'react';
import "./InteractiveBorderCircle.css";
import Icon from "../../Icon/Icon";
import {BOX_SHADOW, GRADIENTS, SIZES} from "../../../constants/appConstants";

const InteractiveBorderCircle = ({
                                     size = SIZES.MEDIUM,
                                     gradient = GRADIENTS.NONE,
                                     boxShadow = BOX_SHADOW.WHITE,
                                     iconName,
                                     onClick
                                 }) => {
    return (<div className={`interactive-border-circle-${size}`} onClick={onClick}>
        <div className={`interactive-border-circle-outer box-shadow-${boxShadow}`}>
            <div className={`interactive-border-circle-inner gradient-${gradient}`}>
                {iconName && (<Icon name={iconName} className="circle-icon"/>)}
            </div>
        </div>
    </div>);
};

export default InteractiveBorderCircle;