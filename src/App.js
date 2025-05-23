import React from 'react';
import './styles/App.css';
import ScoreSection from "./components/ScoreSection/ScoreSection";
import ProfileSection from "./components/ProfileSection/ProfileSection";
import CardSection from "./components/CardSection/CardSection";
import GameControlsSection from "./components/GameControlsSection/GameControlsSection";
import {AppProvider} from './context/AppContext';

function App() {
    return (
        <AppProvider>
            <div className="app-container">
                <div className="app-top">
                    <div className="app-content">
                        <div className="app-header">
                            <ScoreSection/>
                        </div>

                        <div className="app-main-top">
                            <ProfileSection/>
                        </div>
                    </div>
                </div>

                <div className="app-bottom">
                    <div className="app-content">
                        <div className="app-main-bottom">
                            <CardSection/>
                        </div>

                        <div className="app-footer">
                            <GameControlsSection/>
                        </div>
                    </div>
                </div>
            </div>
        </AppProvider>
    );
}

export default App;