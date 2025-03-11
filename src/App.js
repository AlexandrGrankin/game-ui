import './styles/App.css';
import ScoreDisplay from "./components/ScoreDisplay/ScoreDisplay";

function App() {
    return (
        <div className="container">
            {/* Верхняя панель */}
            {/* Добавить пропсы*/}
            <ScoreDisplay></ScoreDisplay>

            {/* Аватар и прогресс */}
            <div className="profile">
                <img src="/avatar.png" alt="Avatar" className="avatar"/>
                <div className="progress-container">
                    <span className="progress-label">Щегол:</span>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{width: "23%"}}></div>
                    </div>
                    <span className="progress-value">23/100</span>
                </div>
            </div>

            {/* Кнопки выбора */}
            <div className="game-buttons">
                <button className="game-option rock">Камень</button>
                <button className="game-option scissors">Ножницы</button>
                <button className="game-option paper">Бумага</button>
            </div>

            {/* Кнопка клика */}
            <button className="click-button">Click<br/>9/10<br/>00:01:12</button>

            {/* Нижние кнопки */}
            <div className="bottom-buttons">
                <button className="battle-button">Бои</button>
                <button className="rules-button">Правила</button>
            </div>
        </div>
    );
}

export default App;
