import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import './BattlePage.css';
import ScoreSection from "../../components/ScoreSection/ScoreSection";
import { SIZES, ICONS, GRADIENTS, BOX_SHADOW } from "../../constants/appConstants";
import Icon from "../../components/Icon/Icon";
import InteractiveBorderCircle from "../../components/InteractiveBorder/InteractiveBorderCircle/InteractiveBorderCircle";
import InteractiveBorderCard from "../../components/InteractiveBorder/InteractiveBorderCard/InteractiveBorderCard";
import useTimers from "../../hooks/useTimers";
import { useAppState } from '../../context/AppContext';

const BattlePage = () => {
    const history = useHistory();
    const { createTimer, clearAllTimers } = useTimers();
    const { actions } = useAppState();

    // Состояние игры с 5 раундами
    const [gameState, setGameState] = useState({
        // Карты соперника (изначально все перевернуты)
        enemyCards: [
            { id: 1, gradient: GRADIENTS.BLUE, icon: ICONS.STONE },
            { id: 2, gradient: GRADIENTS.RED, icon: ICONS.CUT },
            { id: 3, gradient: GRADIENTS.ORANGE, icon: ICONS.PAPER }
        ],
        // Карты игрока
        playerCards: [
            { id: 'p1', gradient: GRADIENTS.BLUE, icon: ICONS.STONE },
            { id: 'p2', gradient: GRADIENTS.RED, icon: ICONS.CUT },
            { id: 'p3', gradient: GRADIENTS.ORANGE, icon: ICONS.PAPER }
        ],
        // Выбранные карты текущего раунда
        selectedEnemyCard: null,
        selectedPlayerCard: null,
        // Карты в центре стола
        centerCards: { enemy: null, player: null },
        // Состояние переворачивания карт
        cardRevealed: { enemy: false, player: false },
        // Состояние анимации
        isFlipping: false,
        // Результат текущей партии
        roundResult: null, // 'win' | 'lose' | 'draw'
        // Счет игры (из 5 раундов)
        gameScore: { player: 0, enemy: 0 },
        // Результаты каждого раунда для индикаторов
        roundResults: [], // массив из 'win', 'lose', 'draw'
        // Текущий раунд (0-4)
        currentRound: 0,
        // Фазы игры
        phase: 'waiting', // 'waiting' | 'selection' | 'reveal' | 'roundResult' | 'gameComplete'
        // Показывать ли модальное окно
        showGameResultModal: false,
        // Финальный результат игры
        finalResult: null, // 'win' | 'lose' | 'draw'
        // ID таймера для автохода противника
        enemyTimerId: null
    });

    // Функция для определения победителя раунда
    const determineWinner = useCallback((playerCard, enemyCard) => {
        if (playerCard.icon === enemyCard.icon) {
            return 'draw';
        }

        const winConditions = {
            [ICONS.STONE]: ICONS.CUT,
            [ICONS.CUT]: ICONS.PAPER,
            [ICONS.PAPER]: ICONS.STONE
        };

        return winConditions[playerCard.icon] === enemyCard.icon ? 'win' : 'lose';
    }, []);

    // Функция выбора карты игроком
    const playerSelectCard = useCallback((cardId) => {
        if (gameState.selectedPlayerCard || gameState.phase !== 'selection') {
            console.log('Player card selection blocked:', {
                selectedCard: gameState.selectedPlayerCard,
                phase: gameState.phase
            });
            return;
        }

        const selectedCard = gameState.playerCards.find(card => card.id === cardId);
        if (!selectedCard) return;

        console.log('Player selected card:', selectedCard);

        setGameState(prev => ({
            ...prev,
            selectedPlayerCard: selectedCard,
            centerCards: { ...prev.centerCards, player: selectedCard },
            cardRevealed: { ...prev.cardRevealed, player: true }
        }));
    }, [gameState.selectedPlayerCard, gameState.playerCards, gameState.phase]);

    // Функция автоматического хода противника
    const enemyAutoMove = useCallback(() => {
        console.log('Enemy auto move triggered');

        setGameState(prev => {
            if (prev.selectedEnemyCard || prev.phase !== 'selection') {
                console.log('Enemy move blocked:', {
                    selectedCard: prev.selectedEnemyCard,
                    phase: prev.phase
                });
                return prev;
            }

            const availableCards = prev.enemyCards;
            if (availableCards.length === 0) {
                console.log('No available cards for enemy');
                return prev;
            }

            const randomIndex = Math.floor(Math.random() * availableCards.length);
            const selectedCard = availableCards[randomIndex];

            console.log('Enemy selected card:', selectedCard);

            return {
                ...prev,
                selectedEnemyCard: selectedCard,
                centerCards: { ...prev.centerCards, enemy: selectedCard },
                cardRevealed: { ...prev.cardRevealed, enemy: false }
            };
        });
    }, []);

    // Проверка готовности к раскрытию карт
    useEffect(() => {
        if (gameState.selectedEnemyCard && gameState.selectedPlayerCard && gameState.phase === 'selection') {
            console.log('Both cards selected, starting reveal phase');
            setGameState(prev => ({ ...prev, phase: 'reveal' }));
        }
    }, [gameState.selectedEnemyCard, gameState.selectedPlayerCard, gameState.phase]);

    // Основная логика анимации переворачивания
    useEffect(() => {
        if (gameState.phase === 'reveal' &&
            gameState.selectedEnemyCard &&
            gameState.selectedPlayerCard &&
            !gameState.isFlipping) {

            console.log('Starting card reveal animation');

            // Очищаем таймер автохода если он есть
            if (gameState.enemyTimerId) {
                clearTimeout(gameState.enemyTimerId);
                setGameState(prev => ({ ...prev, enemyTimerId: null }));
            }

            setGameState(prev => ({ ...prev, isFlipping: true }));

            // Открываем карту противника через 0.75 секунды
            createTimer(() => {
                console.log('Revealing enemy card');
                setGameState(prev => ({
                    ...prev,
                    cardRevealed: { ...prev.cardRevealed, enemy: true }
                }));
            }, 750);

            // Определяем результат через 1.75 секунды
            createTimer(() => {
                setGameState(prev => {
                    const result = determineWinner(prev.selectedPlayerCard, prev.selectedEnemyCard);
                    console.log('Round result:', result);

                    const newScore = { ...prev.gameScore };
                    if (result === 'win') newScore.player++;
                    if (result === 'lose') newScore.enemy++;

                    const newRoundResults = [...prev.roundResults, result];
                    const nextRound = prev.currentRound + 1;

                    return {
                        ...prev,
                        isFlipping: false,
                        roundResult: result,
                        gameScore: newScore,
                        roundResults: newRoundResults,
                        currentRound: nextRound,
                        phase: 'roundResult'
                    };
                });
            }, 1750);
        }
    }, [gameState.phase, gameState.selectedEnemyCard, gameState.selectedPlayerCard,
        gameState.isFlipping, gameState.enemyTimerId, createTimer, determineWinner]);

    // Обработка завершения раунда
    useEffect(() => {
        if (gameState.phase === 'roundResult') {
            console.log('Round completed, showing result for 3 seconds');

            createTimer(() => {
                if (gameState.currentRound >= 5) {
                    // Игра закончена
                    const finalResult = gameState.gameScore.player > gameState.gameScore.enemy ? 'win' :
                        gameState.gameScore.player < gameState.gameScore.enemy ? 'lose' : 'draw';

                    console.log('Game completed, final result:', finalResult);

                    setGameState(prev => ({
                        ...prev,
                        phase: 'gameComplete',
                        finalResult,
                        showGameResultModal: true
                    }));

                    // Обновляем статистику в контексте
                    if (finalResult === 'win') {
                        actions.handleBattleWin({ coinsWon: 1000, expGained: 50 });
                    } else if (finalResult === 'lose') {
                        actions.handleBattleLose({ expLost: 10 });
                    }
                } else {
                    // Следующий раунд
                    console.log('Starting next round');
                    startNewRound();
                }
            }, 3000);
        }
    }, [gameState.phase, gameState.currentRound, gameState.gameScore, createTimer, actions]);

    // Старт нового раунда
    const startNewRound = useCallback(() => {
        console.log('Starting new round');

        setGameState(prev => ({
            ...prev,
            selectedEnemyCard: null,
            selectedPlayerCard: null,
            centerCards: { enemy: null, player: null },
            cardRevealed: { enemy: false, player: false },
            isFlipping: false,
            roundResult: null,
            phase: 'selection',
            enemyTimerId: null
        }));

        // Запускаем таймер автохода противника через 5 секунд
        const timerId = createTimer(() => {
            console.log('Enemy timer triggered after 5 seconds');
            enemyAutoMove();
        }, 5000);

        setGameState(prev => ({
            ...prev,
            enemyTimerId: timerId
        }));
    }, [createTimer, enemyAutoMove]);

    // Инициализация игры при монтировании
    useEffect(() => {
        console.log('Game initialized');
        startNewRound();

        return () => {
            console.log('Cleaning up timers');
            clearAllTimers();
        };
    }, []);

    // Возврат в главное меню
    const handleBackToHome = useCallback(() => {
        clearAllTimers();
        history.push('/');
    }, [history, clearAllTimers]);

    // Сдаться
    const handleSurrender = useCallback(() => {
        clearAllTimers();
        actions.handleBattleLose({ expLost: 20 });
        history.push('/');
    }, [clearAllTimers, actions, history]);

    // Функция для получения стилей анимации карты противника
    const getEnemyAnimationStyles = useCallback((isFlipping, cardRevealed) => {
        if (isFlipping) {
            if (!cardRevealed) {
                return {
                    transform: 'rotateY(90deg)',
                    transition: 'transform 0.75s ease-in-out'
                };
            } else {
                return {
                    transform: 'rotateY(0deg)',
                    transition: 'transform 0.75s ease-in-out'
                };
            }
        }
        return { transform: 'rotateY(0deg)' };
    }, []);

    // Определение градиента для индикатора раунда
    const getRoundIndicatorGradient = useCallback((index) => {
        if (index >= gameState.roundResults.length) return GRADIENTS.WHITE;

        const result = gameState.roundResults[index];
        switch (result) {
            case 'win': return GRADIENTS.GREEN;
            case 'lose': return GRADIENTS.RED_LOSE;
            case 'draw': return GRADIENTS.ORANGE;
            default: return GRADIENTS.WHITE;
        }
    }, [gameState.roundResults]);

    // Определение класса анимации для карты-победителя
    const getWinnerCardClass = useCallback((cardType) => {
        if (gameState.phase !== 'roundResult' || !gameState.roundResult) return '';

        if (gameState.roundResult === 'win' && cardType === 'player') return 'winner-card-animation';
        if (gameState.roundResult === 'lose' && cardType === 'enemy') return 'winner-card-animation';
        return '';
    }, [gameState.phase, gameState.roundResult]);

    return (
        <>
            <div className="battle-top">
                <div className="battle-header">
                    <ScoreSection />
                </div>
                <div className="battle-bid">
                    Заряд<Icon name={ICONS.CLICKCOIN} className="battle-bid-icon" />
                    <span style={{ letterSpacing: '0.1rem' }}>1000</span>
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
                                <div className="value">Enemy</div>
                                <div className="value">{gameState.gameScore.enemy}/5</div>
                            </div>
                            <div className="lose-button">
                                <InteractiveBorderCircle
                                    size={SIZES.EXTRA_SMALL}
                                    iconName={ICONS.FLAG}
                                    gradient={GRADIENTS.BLUE}
                                    boxShadow={BOX_SHADOW.BLACK}
                                    onClick={handleSurrender}
                                />
                            </div>
                            <InteractiveBorderCircle
                                size={SIZES.MEDIUM}
                                iconName={ICONS.AVATAR}
                                boxShadow={BOX_SHADOW.BLACK}
                            />
                            <div>
                                <div className="value">Player</div>
                                <div className="value">{gameState.gameScore.player}/5</div>
                            </div>
                        </div>

                        <div className="battle-fight-card-section">
                            <div className="battle-enemy-card">
                                {gameState.enemyCards.map(card => (
                                    <div style={{ width: '32%' }} key={card.id}>
                                        <InteractiveBorderCard isClickable={false} />
                                    </div>
                                ))}
                            </div>

                            {/* Центр стола - выбранные карты */}
                            {(gameState.centerCards.enemy || gameState.centerCards.player) && (
                                <div className="battle-center">
                                    <div style={{ width: '50%' }}>
                                        {gameState.centerCards.enemy && (
                                            <InteractiveBorderCard
                                                gradient={gameState.cardRevealed.enemy ?
                                                    gameState.centerCards.enemy.gradient :
                                                    GRADIENTS.NONE}
                                                iconName={gameState.cardRevealed.enemy ?
                                                    gameState.centerCards.enemy.icon :
                                                    null}
                                                className={`card-appear-enemy ${getWinnerCardClass('enemy')}`}
                                                animationStyles={getEnemyAnimationStyles(
                                                    gameState.isFlipping,
                                                    gameState.cardRevealed.enemy
                                                )}
                                            />
                                        )}
                                    </div>
                                    <div className="vs-divider">VS</div>
                                    <div style={{ width: '50%' }}>
                                        {gameState.centerCards.player && (
                                            <InteractiveBorderCard
                                                gradient={gameState.centerCards.player.gradient}
                                                iconName={gameState.centerCards.player.icon}
                                                className={`card-appear-player ${getWinnerCardClass('player')}`}
                                            />
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Индикаторы раундов */}
                            <div className="battle-status-game">
                                {[0, 1, 2, 3, 4].map(index => (
                                    <InteractiveBorderCircle
                                        key={index}
                                        size={SIZES.EXTRA_EXTRA_SMALL}
                                        gradient={getRoundIndicatorGradient(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="battle-control">
                        {gameState.playerCards.map(card => {
                            const isClickable = !gameState.selectedPlayerCard && gameState.phase === 'selection';
                            const isSelected = gameState.selectedPlayerCard?.id === card.id;

                            return (
                                <InteractiveBorderCard
                                    key={card.id}
                                    gradient={card.gradient}
                                    iconName={card.icon}
                                    isClickable={isClickable}
                                    onClick={() => playerSelectCard(card.id)}
                                    className={isSelected ? 'card-selected' : ''}
                                />
                            );
                        })}
                    </div>

                    {/* Debug информация (можно убрать в продакшене) */}
                    {process.env.NODE_ENV === 'development' && (
                        <div style={{
                            position: 'fixed',
                            top: '10px',
                            right: '10px',
                            background: 'rgba(0,0,0,0.8)',
                            color: 'white',
                            padding: '10px',
                            borderRadius: '5px',
                            fontSize: '12px',
                            maxWidth: '200px'
                        }}>
                            <div>Phase: {gameState.phase}</div>
                            <div>Round: {gameState.currentRound}/5</div>
                            <div>Score: {gameState.gameScore.player}-{gameState.gameScore.enemy}</div>
                            <div>Player Card: {gameState.selectedPlayerCard?.icon || 'None'}</div>
                            <div>Enemy Card: {gameState.selectedEnemyCard?.icon || 'None'}</div>
                            <div>Results: {gameState.roundResults.join(', ')}</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Модальное окно результата игры */}
            {gameState.showGameResultModal && (
                <div className="game-result-modal">
                    <div className="game-result-content">
                        <h2 className="game-result-title">
                            {gameState.finalResult === 'win' ? '🎉 Победа!' :
                                gameState.finalResult === 'lose' ? '😞 Поражение!' :
                                    '🤝 Ничья!'}
                        </h2>
                        <div className="game-result-score">
                            Счет: {gameState.gameScore.player} - {gameState.gameScore.enemy}
                        </div>
                        <button
                            className="game-result-button"
                            onClick={handleBackToHome}
                        >
                            Принять
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default React.memo(BattlePage);