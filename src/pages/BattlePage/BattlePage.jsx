import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import './BattlePage.css';
import ScoreSection from "../../components/ScoreSection/ScoreSection";
import {SIZES, ICONS, GRADIENTS, BOX_SHADOW} from "../../constants/appConstants";
import Icon from "../../components/Icon/Icon";
import InteractiveBorderCircle
    from "../../components/InteractiveBorder/InteractiveBorderCircle/InteractiveBorderCircle";
import InteractiveBorderCard from "../../components/InteractiveBorder/InteractiveBorderCard/InteractiveBorderCard";

const BattlePage = () => {
    const history = useHistory();

    // Состояние игры
    const [gameState, setGameState] = useState({
        // Карты соперника (изначально все перевернуты)
        enemyCards: [
            {id: 1, gradient: GRADIENTS.BLUE, icon: ICONS.STONE},
            {id: 2, gradient: GRADIENTS.RED, icon: ICONS.CUT},
            {id: 3, gradient: GRADIENTS.ORANGE, icon: ICONS.PAPER}
        ],
        // Карты игрока
        playerCards: [
            {id: 'p1', gradient: GRADIENTS.BLUE, icon: ICONS.STONE},
            {id: 'p2', gradient: GRADIENTS.RED, icon: ICONS.CUT},
            {id: 'p3', gradient: GRADIENTS.ORANGE, icon: ICONS.PAPER}
        ],
        // Выбранные карты
        selectedEnemyCard: null,
        selectedPlayerCard: null,
        // Фазы игры
        phase: 'selection', // 'selection' | 'waiting' | 'reveal' | 'result'
        // Кто выбрал первый
        firstToSelect: null,
        // Карты в центре стола
        centerCards: {
            enemy: null,
            player: null
        }
    });

    // Функция выбора карты соперником
    const enemySelectCard = () => {
        if (gameState.selectedEnemyCard) return;

        const randomIndex = Math.floor(Math.random() * gameState.enemyCards.length);
        const selectedCard = gameState.enemyCards[randomIndex];

        setGameState(prev => ({
            ...prev,
            selectedEnemyCard: selectedCard,
            enemyCards: prev.enemyCards.filter(card => card.id !== selectedCard.id),
            firstToSelect: prev.firstToSelect || 'enemy',
            phase: prev.selectedPlayerCard ? 'reveal' : 'waiting'
        }));

        console.log('Соперник выбрал карту:', selectedCard);
    };

    // Функция выбора карты игроком
    const playerSelectCard = (cardId) => {
        console.log('playerSelectCard called with cardId:', cardId);
        console.log('Current gameState:', gameState);

        if (gameState.selectedPlayerCard) {
            console.log('Player already selected a card');
            return;
        }

        const selectedCard = gameState.playerCards.find(card => card.id === cardId);
        console.log('Selected card:', selectedCard);

        setGameState(prev => {
            const newState = {
                ...prev,
                selectedPlayerCard: selectedCard,
                firstToSelect: prev.firstToSelect || 'player',
                phase: prev.selectedEnemyCard ? 'reveal' : 'waiting'
            };
            console.log('New game state:', newState);
            return newState;
        });

        // Если игрок выбрал первый, соперник выбирает через секунду
        if (!gameState.selectedEnemyCard) {
            console.log('Enemy will select in 1 second...');
            setTimeout(() => {
                enemySelectCard();
            }, 1000);
        }
    };

    // Функция размещения карт в центре
    const placeCardsOnTable = () => {
        if (gameState.selectedEnemyCard && gameState.selectedPlayerCard && gameState.phase === 'reveal') {
            console.log("work")
            setGameState(prev => ({
                ...prev,
                phase: 'result'
            }))
        }

        setGameState(prev => ({
            ...prev,
            centerCards: {
                enemy: prev.selectedEnemyCard,
                player: prev.selectedPlayerCard
            }
        }));
    };

    // Сброс игры
    const resetGame = () => {
        setGameState({
            enemyCards: [
                {id: 1, gradient: GRADIENTS.BLUE, icon: ICONS.STONE},
                {id: 2, gradient: GRADIENTS.RED, icon: ICONS.CUT},
                {id: 3, gradient: GRADIENTS.ORANGE, icon: ICONS.PAPER}
            ],
            playerCards: [
                {id: 'p1', gradient: GRADIENTS.BLUE, icon: ICONS.STONE},
                {id: 'p2', gradient: GRADIENTS.RED, icon: ICONS.CUT},
                {id: 'p3', gradient: GRADIENTS.ORANGE, icon: ICONS.PAPER}
            ],
            selectedEnemyCard: null,
            selectedPlayerCard: null,
            phase: 'selection',
            firstToSelect: null,
            centerCards: {enemy: null, player: null}
        });
    };

    // Автоматическое размещение карт когда обе выбраны
    useEffect(() => {
        if (gameState.selectedEnemyCard && gameState.selectedPlayerCard && gameState.phase === 'reveal') {
            console.log("оба выбрали")
            setTimeout(() => {
                placeCardsOnTable();
            }, 1000);
        }
    }, [gameState.selectedEnemyCard, gameState.selectedPlayerCard, gameState.phase]);

    useEffect(() => {
        if (gameState.selectedEnemyCard && gameState.phase === 'waiting') {
            console.log("выбрал соперник")
            setTimeout(() => {
                placeCardsOnTable();
            }, 1000);
        }
    }, [gameState.selectedEnemyCard, gameState.phase]);


    const handleBackClick = () => {
        history.push('/'); // Возвращаемся на главную страницу
    };

    return (
        <>
            <div className="battle-top">
                <div className="battle-header">
                    <ScoreSection/>
                </div>
                <div className="battle-bid">
                    Заряд<Icon name={ICONS.CLICKCOIN} className="battle-bid-icon"/>
                    <span style={{letterSpacing: '0.1rem'}}>1000</span>
                </div>
            </div>

            <div className="battle-bottom">
                <div className="battle-content">
                    <div className="battle-main">
                        <div className="battle-avatar-section">
                            <InteractiveBorderCircle
                                size={SIZES.MEDIUM}
                                iconName={ICONS.AVATAR}
                                boxShadow={BOX_SHADOW.BLACK}
                            />
                            <div>
                                <div className="value">Nickname</div>
                                <div className="value">2/10</div>
                            </div>
                            <div className="lose-button">
                                <InteractiveBorderCircle
                                    size={SIZES.EXTRA_SMALL}
                                    iconName={ICONS.FLAG}
                                    gradient={GRADIENTS.BLUE}
                                    boxShadow={BOX_SHADOW.BLACK}
                                    onClick={handleBackClick}
                                />
                            </div>
                            <InteractiveBorderCircle
                                size={SIZES.MEDIUM}
                                iconName={ICONS.AVATAR}
                                boxShadow={BOX_SHADOW.BLACK}
                            />
                        </div>
                        <div className="battle-fight-card-section">
                            <div className="battle-enemy-card">
                                {gameState.enemyCards.map(card => (
                                    <div style={{width: '32%'}} key={card.id}>
                                        <InteractiveBorderCard
                                            // Не передаем градиент и иконку = рубашка
                                            isClickable={false}
                                        />
                                    </div>
                                ))}
                            </div>
                            {/* Центр стола - выбранные карты */}
                            {(gameState.centerCards.enemy || gameState.centerCards.player) && (
                                <div className="battle-center">
                                    <div style={{width: '50%'}}>
                                        {gameState.centerCards.enemy && (
                                            <InteractiveBorderCard
                                                gradient={gameState.centerCards.enemy.gradient}
                                                iconName={gameState.centerCards.enemy.icon}
                                                className="card-appear"
                                            />
                                        )}
                                    </div>
                                    <div style={{width: '50%'}}>

                                        {gameState.centerCards.player && (
                                            <InteractiveBorderCard
                                                gradient={gameState.centerCards.player.gradient}
                                                iconName={gameState.centerCards.player.icon}
                                                className="card-appear"
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="battle-control">
                        {gameState.playerCards.map(card => {
                            const isClickable = !gameState.selectedPlayerCard && gameState.phase !== 'result';

                            return (
                                <InteractiveBorderCard
                                    key={card.id}
                                    gradient={card.gradient}
                                    iconName={card.icon}
                                    isClickable={isClickable}
                                    onClick={() => {
                                        playerSelectCard(card.id);
                                    }}
                                    className={gameState.selectedPlayerCard?.id === card.id ? 'card-selected' : ''}
                                />
                            );
                        })}
                    </div>

                    {/* Статус игры и кнопки */}
                    <div className="battle-status">
                        {gameState.phase === 'selection' && (
                            <>
                                <p>Выберите карту</p>
                                <button className="battle-button" onClick={enemySelectCard}>
                                    Тест: Соперник выбирает
                                </button>
                            </>
                        )}
                        {gameState.phase === 'waiting' && <p>Ожидание выбора...</p>}
                        {gameState.phase === 'reveal' && <p>Раскрываем карты...</p>}
                        {gameState.phase === 'result' && (
                            <>
                                <p>Результат боя!</p>
                                <button className="battle-button" onClick={resetGame}>
                                    Новый раунд
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
        ;
};

export default BattlePage;