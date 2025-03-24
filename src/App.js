// App.js
import React, { useState } from 'react';
import './styles/App.css';
import ScoreDisplay from "./components/ScoreDisplay/ScoreDisplay";
import ProfileDisplay from "./components/ProfileDisplay/ProfileDisplay";
import CardSection from "./components/CardSection/CardSection";
import GameControlsSection from "./components/GameControlsSection/GameControlsSection";

function App() {
    // Состояние для всего приложения
    const [appState, setAppState] = useState({
        clickcoins: 4000,
        battles: {
            won: 2,
            total: 10
        },
        progress: {
            current: 23,
            max: 100,
            level: 'Щегол'
        }
    });

    // Метод для обновления состояния
    const updateAppState = (newState) => {
        setAppState(prevState => ({
            ...prevState,
            ...newState
        }));
    };

    // Обработчик нажатия на основную кнопку
    const handleMainButtonClick = () => {
        updateAppState({
            clickcoins: appState.clickcoins + 1
        });
        console.log("Клик! Монет:", appState.clickcoins + 1);
    };

    return (
        <div className="app-container">
            <div className="app-top">
                <div className="app-content">
                    <div className="app-header">
                        <ScoreDisplay
                            clickcoins={appState.clickcoins}
                            battles={appState.battles}
                        />
                    </div>

                    <div className="app-main-top">
                        <ProfileDisplay
                            progress={appState.progress}
                        />
                    </div>
                </div>
            </div>

            <div className="app-bottom">
                <div className="app-content">
                    <div className="app-main-bottom">
                        <CardSection />
                    </div>

                    <div className="app-footer">
                        <GameControlsSection
                            onMainClick={handleMainButtonClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;