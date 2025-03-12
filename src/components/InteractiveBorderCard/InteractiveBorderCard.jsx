import React from 'react';
import "./InteractiveBorderCard.css"

const InteractiveBorderCard = ({outerSize, backColorStartLiner, backColorEndLiner, icons}) => {

    return (
        <div className="interactive__border__card">
            <div style={{
                height: outerSize * 1.6 + 'vw',
                width: outerSize + 'vw',
            }}
                 className='interactive__border__card__outer'
            >
                <div style={{
                    height: (outerSize * 1.6 - (outerSize * 1.6 * 0.09)) + 'vw',
                    width: (outerSize - (outerSize * 0.14)) + 'vw',
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
