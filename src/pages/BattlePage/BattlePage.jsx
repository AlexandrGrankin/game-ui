import React, {useState, useEffect, useRef} from 'react';
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
    const timersRef = useRef([]);

    // Функция для очистки всех таймеров
    const clearAllTimers = () => {
        timersRef.current.forEach(timer => clearTimeout(timer));
        timersRef.current = [];
    };

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
        },
        // Состояние переворачивания карт
        cardRevealed: {
            enemy: false,
            player: false
        },
        // Состояние анимации
        isFlipping: false
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
            phase: prev.selectedPlayerCard ? 'reveal' : 'waiting',
            // Сразу помещаем карту соперника в центр (но перевернутой)
            centerCards: {
                ...prev.centerCards,
                enemy: selectedCard
            },
            cardRevealed: {
                ...prev.cardRevealed,
                enemy: false // Карта остается перевернутой
            }
        }));
    };

    // Функция выбора карты игроком
    const playerSelectCard = (cardId) => {
        if (gameState.selectedPlayerCard) {
            return;
        }

        const selectedCard = gameState.playerCards.find(card => card.id === cardId);

        setGameState(prev => ({
            ...prev,
            selectedPlayerCard: selectedCard,
            firstToSelect: prev.firstToSelect || 'player',
            phase: prev.selectedEnemyCard ? 'reveal' : 'waiting',
            // Помещаем карту игрока в центр
            centerCards: {
                ...prev.centerCards,
                player: selectedCard
            },
            cardRevealed: {
                ...prev.cardRevealed,
                player: true // Карта игрока всегда открыта
            }
        }));

        // Если игрок выбрал первый, соперник выбирает через секунду
        if (!gameState.selectedEnemyCard) {
            setTimeout(() => {
                enemySelectCard();
            }, 1000);
        }
    };

    // Основная логика анимации переворачивания
    useEffect(() => {
        // Запускаем анимацию ТОЛЬКО если:
        // 1. Обе карты выбраны
        // 2. Карта соперника еще не открыта
        // 3. Анимация еще не запущена
        if (gameState.selectedEnemyCard &&
            gameState.selectedPlayerCard &&
            !gameState.cardRevealed.enemy &&
            !gameState.isFlipping) {

            // Очищаем предыдущие таймеры
            clearAllTimers();

            // Запускаем анимацию
            setGameState(prev => ({
                ...prev,
                isFlipping: true
            }));

            // Через 0.75 секунды открываем карту (точно в момент 90°)
            const timer1 = setTimeout(() => {
                setGameState(prev => ({
                    ...prev,
                    cardRevealed: { ...prev.cardRevealed, enemy: true }
                }));
            }, 750);

            // Через 1.75 секунды завершаем анимацию (даем время на полный второй поворот)
            const timer2 = setTimeout(() => {
                setGameState(prev => ({
                    ...prev,
                    isFlipping: false,
                    phase: 'result'
                }));
            }, 1750);

            // Сохраняем таймеры
            timersRef.current = [timer1, timer2];
        }
    }, [gameState.selectedEnemyCard, gameState.selectedPlayerCard, gameState.cardRevealed.enemy, gameState.isFlipping]);

    // Отдельный useEffect для очистки таймеров при размонтировании
    useEffect(() => {
        return () => {
            clearAllTimers();
        };
    }, []);

    // Сброс игры
    const resetGame = () => {
        // Очищаем все таймеры при сбросе
        clearAllTimers();

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
            centerCards: {enemy: null, player: null},
            cardRevealed: {enemy: false, player: false},
            isFlipping: false
        });
    };

    const handleBackClick = () => {
        history.push('/');
    };

    // Функция для получения простых стилей анимации
    const getEnemyAnimationStyles = (isFlipping, cardRevealed) => {
        if (isFlipping) {
            if (!cardRevealed) {
                // Первая половина: поворот до 90° (карта становится невидимой)
                return {
                    transform: 'rotateY(90deg)',
                    transition: 'transform 0.75s ease-in-out'
                };
            } else {
                // Вторая половина: поворот от 90° до 0° (карта появляется лицом)
                return {
                    transform: 'rotateY(0deg)',
                    transition: 'transform 0.75s ease-in-out'
                };
            }
        }
        return {
            transform: 'rotateY(0deg)'
        };
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
                                                gradient={gameState.cardRevealed.enemy ?
                                                    gameState.centerCards.enemy.gradient :
                                                    GRADIENTS.NONE}
                                                iconName={gameState.cardRevealed.enemy ?
                                                    gameState.centerCards.enemy.icon :
                                                    null}
                                                className="card-appear-enemy"
                                                animationStyles={getEnemyAnimationStyles(
                                                    gameState.isFlipping,
                                                    gameState.cardRevealed.enemy
                                                )}
                                            />
                                        )}
                                    </div>
                                    <div className="vs-divider">VS</div>
                                    <div style={{width: '50%'}}>
                                        {gameState.centerCards.player && (
                                            <InteractiveBorderCard
                                                gradient={gameState.centerCards.player.gradient}
                                                iconName={gameState.centerCards.player.icon}
                                                className="card-appear-player"
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
    );
};

export default BattlePage;