import React from 'react';
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
                            <InteractiveBorderCard
                                gradient={GRADIENTS.BLUE}
                                iconName={ICONS.STONE}
                                isClickable={false}
                            />
                            <InteractiveBorderCard
                                gradient={GRADIENTS.RED}
                                iconName={ICONS.CUT}
                                isClickable={false}
                            />
                            <InteractiveBorderCard
                                gradient={GRADIENTS.ORANGE}
                                iconName={ICONS.PAPER}
                                isClickable={false}
                            />
                        </div>
                    </div>
                    <div className="battle-control">
                        <InteractiveBorderCard
                            gradient={GRADIENTS.BLUE}
                            iconName={ICONS.STONE}
                            isClickable={false}
                        />
                        <InteractiveBorderCard
                            gradient={GRADIENTS.RED}
                            iconName={ICONS.CUT}
                            isClickable={false}
                        />
                        <InteractiveBorderCard
                            gradient={GRADIENTS.ORANGE}
                            iconName={ICONS.PAPER}
                            isClickable={false}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BattlePage;