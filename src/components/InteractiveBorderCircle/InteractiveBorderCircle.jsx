// components/InteractiveBorderCircle/InteractiveBorderCircle.jsx
import React from 'react';
import "./InteractiveBorderCircle.css";
import Icon from "../Icon/Icon";
import {GRADIENTS, SIZES} from "../../constants/appConstants";

const InteractiveBorderCircle = ({size = SIZES.MEDIUM, gradient = GRADIENTS.NONE, iconName, onClick}) => {
    return (<div className={`interactive-border-circle interactive-border-circle-${size}`} onClick={onClick}>
        <div className="interactive-border-circle-outer">
            <div className={`interactive-border-circle-inner gradient-${gradient}`}>
                {iconName && (<Icon name={iconName} className="circle-icon"/>)}
            </div>
        </div>
    </div>);
};

export default InteractiveBorderCircle;