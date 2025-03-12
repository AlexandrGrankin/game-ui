import './styles/App.css';
import ScoreDisplay from "./components/ScoreDisplay/ScoreDisplay";
import ProfileDisplay from "./components/ProfileDisplay/ProfileDisplay";
import CardSection from "./components/CardSection/CardSection";
import ButtonSection from "./components/ButtonSection/ButtonSection";

function App() {
    return (
        <div className="container">
            {/* Верхняя панель */}
            {/* Добавить пропсы*/}
            <ScoreDisplay></ScoreDisplay>

            {/* Аватар и прогресс */}
            <ProfileDisplay></ProfileDisplay>

            {/* Кнопки выбора */}
            <CardSection></CardSection>

            {/* Кнопка клика */}
            <ButtonSection style={{marginTop: 'auto'}}></ButtonSection>
        </div>
    );
}

export default App;
