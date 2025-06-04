// pages/HomePage/HomePage.jsx
import React from 'react';
import './HomePage.css';
import ScoreSection from "../../components/ScoreSection/ScoreSection";
import ProfileSection from "../../components/ProfileSection/ProfileSection";
import CardSection from "../../components/CardSection/CardSection";
import GameControlsSection from "../../components/GameControlsSection/GameControlsSection";

const HomePage = () => {
    return (
        <>
            <div className="app-top">
                <div className="app-content">
                    <div className="app-header">
                        <ScoreSection />
                    </div>
                    <div className="app-main-top">
                        <ProfileSection />
                    </div>
                </div>
            </div>

            <div className="app-bottom">
                <div className="app-content">
                    <div className="app-main-bottom">
                        <CardSection />
                    </div>
                    <div className="app-footer">
                        <GameControlsSection />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;