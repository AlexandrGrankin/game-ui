import './styles/App.css';
import ScoreDisplay from "./components/ScoreDisplay/ScoreDisplay";
import ProfileDisplay from "./components/ProfileDisplay/ProfileDisplay";

function App() {
    return (
        <div className="container">
            {/* Верхняя панель */}
            {/* Добавить пропсы*/}
            <ScoreDisplay></ScoreDisplay>

            {/* Аватар и прогресс */}
            <ProfileDisplay></ProfileDisplay>

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
                <button className="rules-button">Задания</button>
            </div>
        </div>
    );
}

export default App;
