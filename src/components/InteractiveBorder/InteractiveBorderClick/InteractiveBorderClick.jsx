import React from 'react';
import "./InteractiveBorderClick.css"
import {GRADIENTS, SIZES} from "../../../constants/appConstants";
import { useAppState } from '../../../context/AppContext';

const InteractiveBorderClick = ({size = SIZES.MEDIUM, gradient = GRADIENTS.NONE, onClick}) => {
    // Получаем battles из контекста
    const { state } = useAppState();
    const { battles } = state;

    return (<div className={`interactive__border__click__outer interactive__border__click__${size}`} onClick={onClick}>
        <div className="interactive__border__click__outer">
            <div className={`interactive__border__click__inner gradient-${gradient} interactive__border__click__value__text`}>
                <div className='interactive__border__click__value'>Click</div>
                <div>{battles.available}/{battles.max}</div>
                <div className='interactive__border__time__value'>{battles.nextBattleTime}</div>
            </div>
        </div>
    </div>);
};

export default InteractiveBorderClick;
