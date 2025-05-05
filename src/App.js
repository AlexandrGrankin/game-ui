// App.js
import React, {useState} from 'react';
import './styles/App.css';
import ScoreSection from "./components/ScoreSection/ScoreSection";
import ProfileSection from "./components/ProfileSection/ProfileSection";
import CardSection from "./components/CardSection/CardSection";
import GameControlsSection from "./components/GameControlsSection/GameControlsSection";

function App() {
    // Состояние для всего приложения
    const [appState, setAppState] = useState({
        clickCoins: 4000,
        statistics: {
            won: 2,
            lose: 10
        },
        progress: {
            current: 23,
            max: 100,
            level: 'Щегол'
        },
        battles: {
            available: 3,
            max: 10,
            nextBattleTime: '00:12:00'
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
            clickCoins: appState.clickCoins + 1
        });
        console.log("Клик! Монет:", appState.clickcoins + 1);
    };

    return (
        <div className="app-container">
            <div className="app-top">
                <div className="app-content">
                    <div className="app-header">
                        <ScoreSection
                            clickCoins={appState.clickCoins}
                            statistics={appState.statistics}
                        />
                    </div>

                    <div className="app-main-top">
                        <ProfileSection progress={appState.progress}/>
                    </div>
                </div>
            </div>

            <div className="app-bottom">
                <div className="app-content">
                    <div className="app-main-bottom">
                        <CardSection/>
                    </div>

                    <div className="app-footer">
                        <GameControlsSection battles={appState.battles} onMainClick={handleMainButtonClick}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;