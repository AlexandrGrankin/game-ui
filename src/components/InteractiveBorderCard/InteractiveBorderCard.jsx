import React from 'react';
import "./InteractiveBorderCard.css"

const InteractiveBorderCard = ({outerSize, backColorStartLiner, backColorEndLiner, icons}) => {

    return (
        <div className="interactive__border__card">
            <div className='interactive__border__card__outer'>
                <div style={{
                    background: `linear-gradient(to bottom, ${backColorStartLiner}, ${backColorEndLiner})` // Линейный градиент от #0A4589 до #062A55
                }}
                     className='interactive__border__card__inner'
                >
                </div>
            </div>
        </div>
    );
};

export default InteractiveBorderCard;
