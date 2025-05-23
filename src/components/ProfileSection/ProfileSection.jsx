import React from 'react';
import './ProfileSection.css';
import InteractiveBorderCircle from "../InteractiveBorder/InteractiveBorderCircle/InteractiveBorderCircle";
import {GRADIENTS, SIZES, ICONS} from "../../constants/appConstants";
import { useAppState } from '../../context/AppContext';

const ProfileSection = () => {
    // Получаем данные из контекста
    const { state } = useAppState();
    const { progress } = state;

    // Обработчики событий для интерактивных элементов
    const handleWalletClick = () => {
        console.log("Wallet clicked");
    };

    const handleAvatarClick = () => {
        console.log("Avatar clicked");
    };

    const handleSocialClick = () => {
        console.log("Social clicked");
    };

    return (
        <div className="profile-container">
            <div className="profile-menu">
                <InteractiveBorderCircle
                    size={SIZES.SMALL}
                    gradient={GRADIENTS.ORANGE}
                    iconName={ICONS.WALLET}
                    onClick={handleWalletClick}
                />
                <InteractiveBorderCircle
                    size={SIZES.AVATAR}
                    iconName={ICONS.AVATAR}
                    onClick={handleAvatarClick}
                />
                <InteractiveBorderCircle
                    size={SIZES.SMALL}
                    gradient={GRADIENTS.RED}
                    iconName={ICONS.SOCIAL}
                    onClick={handleSocialClick}
                />
            </div>
            <div className="progress-container">
                <span className="progress-label">{progress?.level || 'Щегол'}:</span>
                <div className="progress-bar">
                    <span className="progress-value">{progress?.current || 23}/{progress?.max || 100}</span>
                    <div className="progress-fill"
                         style={{width: `${(progress?.current / progress?.max) * 100 || 23}%`}}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;