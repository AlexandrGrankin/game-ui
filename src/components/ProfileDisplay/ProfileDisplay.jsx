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
                    outerSize={20}
                    backColorStartLiner={'#F5A623'}
                    backColorEndLiner={'#D18B17'}
                    icons={wallet}
                    size={12}
                    name="wallet"
                >
                </InteractiveBorder>
                <InteractiveBorder
                    outerSize={38}
                    icons={avatar}
                    size={36}
                    name="avatar"
                >
                </InteractiveBorder>
                <InteractiveBorder
                    outerSize={20}
                    backColorStartLiner={'#EA8E8E'}
                    backColorEndLiner={'#D64636'}
                    icons={social}
                    size={14}
                    name="social"
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
