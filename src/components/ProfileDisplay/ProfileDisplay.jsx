import React from 'react';
import './ProfileDisplay.css';
import InteractiveBorder from "../InteractiveBorder/InteractiveBorder";
import wallet from "../../assets/icons/wallet.png";
import social from "../../assets/icons/social.png";
import avatar from "../../assets/icons/avatar.png";

const ProfileDisplay = () => {

    return (
        <div className="profile-container">
            <div className="profile-menu">
                <InteractiveBorder
                    outerSize={11}
                    backColorStartLiner={'#F5A623'}
                    backColorEndLiner={'#D18B17'}
                    icons={wallet}
                    size={6.5}
                >
                </InteractiveBorder>
                <InteractiveBorder
                    outerSize={22}
                    icons={avatar}
                    size={21}
                >
                </InteractiveBorder>
                <InteractiveBorder
                    outerSize={11}
                    backColorStartLiner={'#EA8E8E'}
                    backColorEndLiner={'#D64636'}
                    icons={social}
                    size={7}
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
