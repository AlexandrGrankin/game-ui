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
    const { actions, state } = useAppState();
    const { battles } = state;

    // Изначальные наборы карт (константы)
    const INITIAL_CARDS = {
        enemy: [
            { id: 'e1', gradient: GRADIENTS.BLUE, icon: ICONS.STONE },
            { id: 'e2', gradient: GRADIENTS.RED, icon: ICONS.CUT },
            { id: 'e3', gradient: GRADIENTS.ORANGE, icon: ICONS.PAPER }
        ],
        player: [
            { id: 'p1', gradient: GRADIENTS.BLUE, icon: ICONS.STONE },
            { id: 'p2', gradient: GRADIENTS.RED, icon: ICONS.CUT },
            { id: 'p3', gradient: GRADIENTS.ORANGE, icon: ICONS.PAPER }
        ]
    };

    // Состояние игры с 5 раундами
    const [gameState, setGameState] = useState({
        // Карты соперника (изначально все доступны)
        enemyCards: [...INITIAL_CARDS.enemy],
        // Карты игрока
        playerCards: [...INITIAL_CARDS.player],
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
            return;
        }

        const selectedCard = gameState.playerCards.find(card => card.id === cardId);
        if (!selectedCard) return;

        setGameState(prev => ({
            ...prev,
            selectedPlayerCard: selectedCard,
            centerCards: { ...prev.centerCards, player: selectedCard },
            cardRevealed: { ...prev.cardRevealed, player: true }
            // Не удаляем карту игрока из массива - оставляем эффект затенения
        }));
    }, [gameState.selectedPlayerCard, gameState.playerCards, gameState.phase]);

    // Функция автоматического хода противника
    const enemyAutoMove = useCallback(() => {
        setGameState(prev => {
            if (prev.selectedEnemyCard || prev.phase !== 'selection') {
                return prev;
            }

            const availableCards = prev.enemyCards;
            if (availableCards.length === 0) {
                return prev;
            }

            const randomIndex = Math.floor(Math.random() * availableCards.length);
            const selectedCard = availableCards[randomIndex];

            return {
                ...prev,
                selectedEnemyCard: selectedCard,
                centerCards: { ...prev.centerCards, enemy: selectedCard },
                cardRevealed: { ...prev.cardRevealed, enemy: false },
                // Удаляем выбранную карту из руки противника
                enemyCards: prev.enemyCards.filter(card => card.id !== selectedCard.id)
            };
        });
    }, []);

    // Старт нового раунда
    const startNewRound = useCallback(() => {
        setGameState(prev => ({
            ...prev,
            // Восстанавливаем карты противника, карты игрока остаются как есть
            enemyCards: [...INITIAL_CARDS.enemy],
            selectedEnemyCard: null,
            selectedPlayerCard: null,
            centerCards: {enemy: null, player: null},
            cardRevealed: {enemy: false, player: false},
            isFlipping: false,
            roundResult: null,
            phase: 'selection',
            enemyTimerId: null
        }));

        // Запускаем таймер автохода противника через 2 секунды
        const timerId = createTimer(() => {
            enemyAutoMove();
        }, 2000);

        setGameState(prev => ({
            ...prev,
            enemyTimerId: timerId
        }));
    }, [INITIAL_CARDS.enemy, createTimer, enemyAutoMove]);

    // Проверка готовности к раскрытию карт
    useEffect(() => {
        if (gameState.selectedEnemyCard && gameState.selectedPlayerCard && gameState.phase === 'selection') {
            setGameState(prev => ({ ...prev, phase: 'reveal' }));
        }
    }, [gameState.selectedEnemyCard, gameState.selectedPlayerCard, gameState.phase]);

    // Основная логика анимации переворачивания
    useEffect(() => {
        if (gameState.phase === 'reveal' &&
            gameState.selectedEnemyCard &&
            gameState.selectedPlayerCard &&
            !gameState.isFlipping) {

            // Очищаем таймер автохода если он есть
            if (gameState.enemyTimerId) {
                clearTimeout(gameState.enemyTimerId);
                setGameState(prev => ({ ...prev, enemyTimerId: null }));
            }

            setGameState(prev => ({ ...prev, isFlipping: true }));

            // Открываем карту противника через 0.75 секунды
            createTimer(() => {
                setGameState(prev => ({
                    ...prev,
                    cardRevealed: { ...prev.cardRevealed, enemy: true }
                }));
            }, 750);

            // Определяем результат через 1.75 секунды
            createTimer(() => {
                setGameState(prev => {
                    const result = determineWinner(prev.selectedPlayerCard, prev.selectedEnemyCard);

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
                createTimer(() => {
                    if (gameState.currentRound >= 5) {
                        // Игра закончена
                        const finalResult = gameState.gameScore.player > gameState.gameScore.enemy ? 'win' :
                            gameState.gameScore.player < gameState.gameScore.enemy ? 'lose' : 'draw';

                        setGameState(prev => ({
                            ...prev,
                            phase: 'gameComplete',
                            finalResult,
                            showGameResultModal: true
                        }));

                        // Обновляем статистику и ВСЕГДА списываем бой
                        if (finalResult === 'win') {
                            actions.handleBattleWin({coinsWon: 1000, expGained: 50});
                        } else if (finalResult === 'lose') {
                            actions.handleBattleLose({expLost: 10});
                        } else {
                            // При ничьей просто списываем бой без изменения статистики
                            actions.updateBattles({
                                available: Math.max(0, battles.available - 1)
                            });
                        }
                    } else {
                        // Следующий раунд
                        startNewRound();
                    }
                }, 3000);
            }
        },
        [gameState.phase, gameState.currentRound, gameState.gameScore, createTimer, actions, battles.available, startNewRound]);

    // Инициализация игры при монтировании
    useEffect(() => {
        startNewRound();
        return () => clearAllTimers();
    }, [startNewRound, clearAllTimers]);

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
                                <div className="value">4/15</div>
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
                        </div>

                        <div className="battle-fight-card-section">
                            {/* Карты противника - показываем только оставшиеся в руке */}
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

                    {/* Карты игрока - показываем все карты с эффектом затенения для выбранной */}
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