import React from 'react';
import ScoreBoard from "../ScoreBoard";
import './ScoreDisplay.css';

import clickcoin from "../../assets/icons/clickcoin.png";
import swords from "../../assets/icons/swords.png";
import shield from "../../assets/icons/shield.png";

const ScoreDisplay = () => {

    return (
        <div className="score-display">
            <ScoreBoard label={'Clickcoin'} value={(4000).toLocaleString('ru-RU')} iconStart={clickcoin}>
            </ScoreBoard>
            <ScoreBoard label={'Статистика боев'} value={'2/10'} iconStart={swords} iconEnd={shield}>
            </ScoreBoard>
        </div>
    );
};

export default ScoreDisplay;
