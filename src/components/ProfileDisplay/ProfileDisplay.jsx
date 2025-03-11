import React from 'react';
import './ProfileDisplay.css';
import InteractiveBorder from "../InteractiveBorder/InteractiveBorder";

const ProfileDisplay = () => {

    return (
        <div className="profile-container">
            <div className="profile-menu">
                <InteractiveBorder
                    outerSize={70}
                    backColorStartLiner={'#F5A623'}
                    backColorEndLiner={'#D18B17'}
                >
                </InteractiveBorder>
                <InteractiveBorder
                    outerSize={140}
                >
                </InteractiveBorder>
                <InteractiveBorder
                    outerSize={70}
                    backColorStartLiner={'#EA8E8E'}
                    backColorEndLiner={'#D64636'}
                >
                </InteractiveBorder>
            </div>
            <div className="progress-container">
                <span className="progress-label">Щегол:</span>
                <div className="progress-bar">
                    <span className="progress-value">23/100</span>
                    <div className="progress-fill" style={{ width: "23%" }}></div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDisplay;
